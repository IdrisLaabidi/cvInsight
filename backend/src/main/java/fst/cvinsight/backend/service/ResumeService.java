package fst.cvinsight.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import fst.cvinsight.backend.dto.ResumeDto;
import fst.cvinsight.backend.entity.Resume;
import fst.cvinsight.backend.entity.UserInfo;
import fst.cvinsight.backend.exception.ResumeAnalysisException;
import fst.cvinsight.backend.exception.ResumeExtractionException;
import fst.cvinsight.backend.exception.ResumeProcessingException;
import fst.cvinsight.backend.exception.ResumeStorageException;
import fst.cvinsight.backend.mapper.ResumeMapper;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ChatClient chatClient;
    private final DocumentUtils documentUtils;
    private final ResumeRepository resumeRepository;
    private final UserInfoService userInfoService;
    private final ObjectMapper objectMapper;
    private final ResumeMapper resumeMapper;

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

        saveResume(file, result, ResumeOrigin.USER_UPLOADED);

        return result;
    }

    public void saveResume(File file, String jsonContent, ResumeOrigin origin) throws ResumeStorageException {
        try {
            Resume resume = new Resume();

            JsonNode parsed = objectMapper.readTree(jsonContent);

            resume.setFilename(file.getName());
            resume.setContentType(Files.probeContentType(file.toPath()));
            resume.setSize(file.length());
            resume.setUploadedBy(userInfoService.getCurrentUser());
            resume.setFileData(Files.readAllBytes(file.toPath()));
            resume.setJsonContent(parsed);

            resume.setOrigin(origin != null ? origin : ResumeOrigin.SYSTEM_GENERATED);

            resumeRepository.save(resume);

        } catch (JsonProcessingException e) {
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

    public ResumeDto getResumeDtoById(UUID id) {
        UUID userId = userInfoService.getCurrentUser().getId();
        Resume cv = resumeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CV not found"));
        if (!cv.getUploadedBy().getId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to access this CV");
        }
        return resumeMapper.toDto(cv);
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
        UUID userId = userInfoService.getCurrentUser().getId();
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CV not found"));
        if (!resume.getUploadedBy().getId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to access this CV");
        }
        resumeRepository.delete(resume);
    }

    public List<ResumeDto> getAllCVsForCurrentUser() {
        UserInfo user = userInfoService.getCurrentUser();
        return resumeMapper.toDtoList(resumeRepository.findAllByUploadedBy(user));
    }

    public JsonNode analyzeResume(UUID resumeId) {
        ResumeDto resume = getResumeDtoById(resumeId);

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

        UserInfo user= userInfoService.getCurrentUser();
        List<Resume> resumes = resumeRepository.findAllByUploadedBy(user);

        ArrayNode resumeArray = objectMapper.createArrayNode();
        for (Resume r : resumes) {
            resumeArray.add(r.getJsonContent());
        }

        String prompt = """
            You are a professional career advisor. Your task is to analyze all user resumes and produce career guidance.
        
            BELOW IS IMPORTANT — FOLLOW STRICTLY:
        
            ### INPUT
            The following is an array of resumes in JSON format:
            %s
        
            ### YOUR TASK
            Based on ALL extracted skills, certifications, education, and work experience across *all* provided resumes:
              - Identify missing or in-demand skills the user should learn.
              - Recommend relevant certifications.
              - Recommend online courses (well-known platforms only).
              - Suggest job roles suitable for the user.
              - Identify skill gaps.
              - Create a clear, step-by-step personalized career growth plan.
        
            ### STRICT OUTPUT RULES — DO NOT BREAK THESE:
            1. **Output ONLY valid JSON. No explanations, no extra text, no markdown.**
            2. **The JSON MUST be syntactically valid and must follow the exact schema below.**
            3. **Every field MUST be present; empty fields must be empty arrays.**
            4. **Do NOT include comments or trailing commas.**
            5. **All strings should be plain strings (no line breaks inside).**
        
            ### REQUIRED JSON SCHEMA (OUTPUT MUST MATCH EXACTLY):
            {
              "recommendedCertifications": ["", ""],
              "recommendedCourses": ["", ""],
              "recommendedJobRoles": ["", ""],
              "skillsToImprove": ["", ""],
              "careerPlan": ["step1", "step2", "step3"]
            }
        
            ### FINAL INSTRUCTION
            Respond with **ONLY** the JSON object defined above. If unsure, output empty arrays.
        """.formatted(resumeArray.toPrettyString());


        try {
            String response = chatClient.prompt(prompt).call().content();
            return objectMapper.readTree(response);
        } catch (Exception e) {
            throw new ResumeAnalysisException(e);
        }
    }
}
