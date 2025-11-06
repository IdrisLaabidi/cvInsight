package fst.cvinsight.backend.controller;

import fst.cvinsight.backend.util.DocumentUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/cv")
public class CvController {

    private final DocumentUtils documentUtils;

    @Autowired
    public CvController(DocumentUtils documentUtils) {
        this.documentUtils = documentUtils;
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

    private record ErrorResponse(String message) {}
}
