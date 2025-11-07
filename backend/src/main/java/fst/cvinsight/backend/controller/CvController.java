package fst.cvinsight.backend.controller;

import fst.cvinsight.backend.exception.CVProcessingException;
import fst.cvinsight.backend.service.CVService;
import fst.cvinsight.backend.util.DocumentUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/cv")
public class CvController {

    private final DocumentUtils documentUtils;
    private final CVService cvService;

    @Autowired
    public CvController(DocumentUtils documentUtils, CVService cvService) {
        this.documentUtils = documentUtils;
        this.cvService = cvService;
    }

    @PostMapping(value = "/extract", consumes = {"multipart/form-data"})
    public ResponseEntity<?> extractText(
            @RequestPart("cv") MultipartFile cv,
            @RequestParam("name") String name,
            @RequestParam("email") String email) {

        try {
            String originalFilename = cv.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            File tempFile = File.createTempFile("uploaded-" + cv.getName() + "-", extension);
            cv.transferTo(tempFile);

            String extractedText = documentUtils.extractText(tempFile);

            tempFile.delete();
            return ResponseEntity.ok(extractedText);

        } catch (IOException e) {
            return ResponseEntity
                    .status(422) // Unprocessable Entity
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ErrorResponse("Unexpected error: " + e.getMessage()));
        }
    }

    @PostMapping(value = "/analyze", consumes = {"multipart/form-data"})
    public ResponseEntity<?> analyzeCv(@RequestPart("file") MultipartFile file) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            File tempFile = File.createTempFile("uploaded-" + file.getName() + "-", extension);
            file.transferTo(tempFile);

            String jsonResponse = cvService.extractAndParseCV(tempFile);
            tempFile.delete();

            return ResponseEntity.ok(jsonResponse);
        } catch (CVProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "File upload error", "details", e.getMessage()));
        }
    }

    private record ErrorResponse(String message) {}
}
