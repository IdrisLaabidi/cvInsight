package fst.cvinsight.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import fst.cvinsight.backend.entity.Resume;
import fst.cvinsight.backend.exception.ResumeAnalysisException;
import fst.cvinsight.backend.exception.ResumeExtractionException;
import fst.cvinsight.backend.exception.ResumeStorageException;
import fst.cvinsight.backend.repo.ResumeRepository;
import fst.cvinsight.backend.util.DocumentUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.template.st.StTemplateRenderer;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final ResumeRepository uploadedCVRepository;
    private final UserInfoService userInfoService;
    private final ObjectMapper objectMapper;

    public String extractAndParseCV(File cv) throws IOException {
        String cvContent;
        try{
            cvContent = documentUtils.extractText(cv);
        } catch (IOException e) {
            throw new ResumeExtractionException(e);
        }

        String result;
        try {
            String prompt = buildAnalysisPrompt(cvContent);
            result =  chatClient.prompt(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            throw new ResumeAnalysisException(e);
        }

        saveCV(cv, result);

        return result;
    }

    public void saveCV(File cv, String jsonContent) throws ResumeStorageException {
        try {
            Resume uploadedCV = new Resume();

            JsonNode parsed = objectMapper.readTree(jsonContent);

            uploadedCV.setFilename(cv.getName());
            uploadedCV.setContentType(Files.probeContentType(cv.toPath()));
            uploadedCV.setSize(cv.length());
            uploadedCV.setUploadedBy(userInfoService.getCurrentUser());
            uploadedCV.setFileData(Files.readAllBytes(cv.toPath()));
            uploadedCV.setJsonContent(parsed);
            uploadedCVRepository.save(uploadedCV);
        }catch (JsonProcessingException e){
            throw new ResumeAnalysisException(e);
        } catch (IOException e) {
            throw new ResumeStorageException(e);
        }
    }

    private String buildAnalysisPrompt(String cvContent) {
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

        return promptTemplate.render(Map.of("cvContent", cvContent));
    }

    public Resume getCVById(UUID id) {
        UUID userId = userInfoService.getCurrentUser().getId();
        Resume cv = uploadedCVRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CV not found"));
        if (!cv.getUploadedBy().getId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to access this CV");
        }
        return cv;
    }

    public void deleteCV(UUID id) {
        Resume existing = getCVById(id);
        uploadedCVRepository.delete(existing);
    }

    public List<Resume> getAllCVsForCurrentUser() {
        UUID userId = userInfoService.getCurrentUser().getId();
        return uploadedCVRepository.findAllByUserId(userId);
    }

}
