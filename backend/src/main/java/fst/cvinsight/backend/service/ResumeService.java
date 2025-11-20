package fst.cvinsight.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import fst.cvinsight.backend.entity.Resume;
import fst.cvinsight.backend.exception.ResumeAnalysisException;
import fst.cvinsight.backend.exception.ResumeExtractionException;
import fst.cvinsight.backend.exception.ResumeProcessingException;
import fst.cvinsight.backend.exception.ResumeStorageException;
import fst.cvinsight.backend.model.ResumeOrigin;
import fst.cvinsight.backend.repo.ResumeRepository;
import fst.cvinsight.backend.util.DocumentUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.template.st.StTemplateRenderer;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ChatClient chatClient;
    private final DocumentUtils documentUtils;
    private final ResumeRepository resumeRepository;
    private final UserInfoService userInfoService;
    private final ObjectMapper objectMapper;

    public String extractAndParseResume(File file) throws IOException {
        String resumeContent;
        try{
            resumeContent = documentUtils.extractText(file);
        } catch (IOException e) {
            throw new ResumeExtractionException(e);
        }

        String result;
        try {
            String prompt = buildAnalysisPrompt(resumeContent);
            result =  chatClient.prompt(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            throw new ResumeAnalysisException(e);
        }

        saveResume(file, result, Optional.of(ResumeOrigin.USER_UPLOADED));

        return result;
    }

    public void saveResume(File file, String jsonContent, Optional<ResumeOrigin> origin) throws ResumeStorageException {
        try {
            Resume resume = new Resume();

            JsonNode parsed = objectMapper.readTree(jsonContent);

            resume.setFilename(file.getName());
            resume.setContentType(Files.probeContentType(file.toPath()));
            resume.setSize(file.length());
            resume.setUploadedBy(userInfoService.getCurrentUser());
            resume.setFileData(Files.readAllBytes(file.toPath()));
            resume.setJsonContent(parsed);
            origin.ifPresent(resume::setOrigin);
            resumeRepository.save(resume);
        }catch (JsonProcessingException e){
            throw new ResumeAnalysisException(e);
        } catch (IOException e) {
            throw new ResumeStorageException(e);
        }
    }

    private String buildAnalysisPrompt(String resumeContent) {
        PromptTemplate promptTemplate = PromptTemplate.builder()
                .renderer(StTemplateRenderer.builder().startDelimiterToken('<').endDelimiterToken('>').build())
                .template("""
                    You are an expert CV analyzer and information extractor.
                    Your task is to read the provided resume text and produce a clean, valid JSON object
                    that captures all relevant information about the candidate.
        
                    Guidelines:
                    - Focus on **completeness**: include education, experience, internships, projects,
                      certifications, skills, spoken languages, and social or community involvement.
                    - Use **null** for missing data (do not skip fields).
                    - Dates should be in ISO format: YYYY-MM if available.
                    - Ensure the output is **strictly valid JSON**, no explanations or comments.
        
                    Resume text:
                    ---
                    <cvContent>
                    ---
        
                    Return JSON in the following structure:
                    {
                      "personal": {
                        "fullName": "",
                        "email": "",
                        "phone": "",
                        "address": "",
                        "linkedin": "",
                        "github": "",
                        "otherProfiles": []
                      },
                      "summary": "",
                      "education": [
                        {
                          "degree": "",
                          "institution": "",
                          "startDate": "",
                          "endDate": "",
                          "description": ""
                        }
                      ],
                      "experience": [
                        {
                          "title": "",
                          "company": "",
                          "startDate": "",
                          "endDate": "",
                          "description": "",
                          "type": "job|internship"
                        }
                      ],
                      "projects": [
                        {
                          "name": "",
                          "description": "",
                          "technologies": [],
                          "link": ""
                        }
                      ],
                      "skills": ["", "", ""],
                      "languages": [
                        {"name": "", "level": ""}
                      ],
                      "certifications": [
                        {"title": "", "issuer": "", "year": ""}
                      ],
                      "socialActivities": [
                        {"role": "", "organization": "", "description": ""}
                      ]
                    }
        
                    Output only JSON, without any surrounding text.
                    """)
                .build();

        return promptTemplate.render(Map.of("cvContent", resumeContent));
    }

    public Resume getResumeById(UUID id) {
        UUID userId = userInfoService.getCurrentUser().getId();
        Resume cv = resumeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CV not found"));
        if (!cv.getUploadedBy().getId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to access this CV");
        }
        return cv;
    }

    public void deleteResume(UUID id) {
        Resume existing = getResumeById(id);
        resumeRepository.delete(existing);
    }

    public List<Resume> getAllCVsForCurrentUser() {
        UUID userId = userInfoService.getCurrentUser().getId();
        return resumeRepository.findAllByUserId(userId);
    }

    public JsonNode analyzeResume(UUID resumeId) {
        Resume resume = getResumeById(resumeId);

        String resumeJson = resume.getJsonContent().toString();

        String prompt = """
            You are an expert resume reviewer with 20+ years of experience in HR, technical hiring, and career development.
        
            Your task:
            - Analyze the following resume JSON and extract weaknesses, improvements, mistakes, and missing sections.
            - Provide clear, actionable, and practical feedback.
            - Evaluate the overall quality and assign a numerical score from 0 to 100.
        
            ----------------------------
            Guidelines (IMPORTANT):
            ----------------------------
            1. **Do NOT generate or invent experience, skills, or data that are not present.**
            2. Base ALL analysis strictly on the provided resume JSON.
            3. If a section is empty or missing, list it under `missingSections`.
            4. Weaknesses must be directly supported by the resume contents (e.g., vague descriptions, missing dates).
            5. Improvements must be actionable steps (e.g., "Add metrics", "Expand project descriptions").
            6. Mistakes should include formatting issues, typos, inconsistencies, or missing date ranges if applicable.
            7. Score evaluation rules:
               - 0–39: Very weak resume
               - 40–59: Needs significant improvement
               - 60–79: Decent but missing important elements
               - 80–89: Strong resume with minor issues
               - 90–100: Excellent resume
            8. **Return strictly valid JSON**.
            9. **Do NOT include explanations outside of the JSON**.
            10. Do NOT include the prompt, reasoning, or any extra commentary.
            11. No markdown, no backticks — only raw JSON.
        
            ----------------------------
            Resume JSON:
            %s
            ----------------------------
        
            The output MUST follow exactly this JSON schema:
            {
              "weaknesses": ["", ""],
              "improvements": ["", ""],
              "missingSections": ["", ""],
              "mistakes": ["", ""],
              "score": 0,
              "overallFeedback": ""
            }
        
            Output ONLY the JSON object.
        """.formatted(resumeJson);


        try {
            String response = chatClient.prompt(prompt).call().content();
            return objectMapper.readTree(response);
        } catch (JsonProcessingException ex) {
            throw new ResumeProcessingException(ex.getMessage(),ex);
        } catch (Exception e) {
            throw new ResumeAnalysisException(e);
        }
    }

    public JsonNode careerRecommendations() {

        UUID userId = userInfoService.getCurrentUser().getId();
        List<Resume> resumes = resumeRepository.findAllByUserId(userId);

        ArrayNode resumeArray = objectMapper.createArrayNode();
        for (Resume r : resumes) {
            resumeArray.add(r.getJsonContent());
        }

        String prompt = """
            You are a professional career advisor.

            Below are all resumes for a user (in JSON format):
            %s

            Based on ALL skills, certifications, education and experience:
            Recommend:
            - missing skills to learn
            - suggested certifications
            - suggested online courses
            - job roles the user is suited for
            - skill gaps
            - a personalized career growth plan

            Return strictly valid JSON with this structure:
            {
              "recommendedCertifications": ["", ""],
              "recommendedCourses": ["", ""],
              "recommendedJobRoles": ["", ""],
              "skillsToImprove": ["", ""],
              "careerPlan": ["step1", "step2", "step3"]
            }

            Output only JSON.
        """.formatted(resumeArray.toPrettyString());

        try {
            String response = chatClient.prompt(prompt).call().content();
            return objectMapper.readTree(response);
        } catch (Exception e) {
            throw new ResumeAnalysisException(e);
        }
    }
}
