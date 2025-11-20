package fst.cvinsight.backend.controller;

import fst.cvinsight.backend.entity.Resume;
import fst.cvinsight.backend.exception.ResumeProcessingException;
import fst.cvinsight.backend.service.ResumeService;
import fst.cvinsight.backend.util.DocumentUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/resume")
public class ResumeController {

    private final DocumentUtils documentUtils;
    private final ResumeService cvService;

    @PostMapping(value = "/extract", consumes = {"multipart/form-data"})
    public ResponseEntity<?> extractText(@RequestPart("file") MultipartFile file) {

        try {
            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            File tempFile = File.createTempFile("uploaded-" + file.getName() + "-", extension);
            file.transferTo(tempFile);

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

            String jsonResponse = cvService.extractAndParseResume(tempFile);
            tempFile.delete();

            return ResponseEntity.ok(jsonResponse);
        } catch (ResumeProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "File upload error", "details", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCV(@PathVariable UUID id) {
        cvService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Resume>> getAllCVsForUser() {
        return ResponseEntity.ok(cvService.getAllCVsForCurrentUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getCVById(@PathVariable UUID id) {
        return ResponseEntity.ok(cvService.getResumeById(id));
    }

    private record ErrorResponse(String message) {}
}
