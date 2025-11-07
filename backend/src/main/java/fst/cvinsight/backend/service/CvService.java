package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UploadedCV;
import fst.cvinsight.backend.repo.UploadedCVRepository;
import fst.cvinsight.backend.util.DocumentUtils;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.template.st.StTemplateRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CvService {

    private final ChatClient chatClient;
    private final DocumentUtils documentUtils;
    private final UploadedCVRepository uploadedCVRepository;
    private final UserInfoService userInfoService;

    @Autowired
    public CvService(ChatClient chatClient, DocumentUtils documentUtils, UploadedCVRepository uploadedCVRepository, UserInfoService userInfoService) {
        this.chatClient = chatClient;
        this.documentUtils = documentUtils;
        this.uploadedCVRepository = uploadedCVRepository;
        this.userInfoService = userInfoService;
    }

    public String extractAndParseCv(File cv) throws IOException {
        String cvContent = documentUtils.extractText(cv);

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

        String prompt = promptTemplate.render(Map.of("cvContent", cvContent));

        String result =  chatClient.prompt(prompt)
                .call()
                .content();

        saveCV(cv);

        return result;
    }

    public List<UploadedCV> getUploadedCVsByUserId(UUID userId) {
        return uploadedCVRepository.findAllByUserId(userId);
    }

    private void saveCV(File cv) throws IOException {
        UploadedCV uploadedCV = new UploadedCV();
        uploadedCV.setFilename(cv.getName());
        uploadedCV.setContentType(Files.probeContentType(cv.toPath()));
        uploadedCV.setSize(cv.length());
        uploadedCV.setUploadedBy(userInfoService.getCurrentUser());
        uploadedCV.setFileData(Files.readAllBytes(cv.toPath()));
        uploadedCVRepository.save(uploadedCV);
    }

}
