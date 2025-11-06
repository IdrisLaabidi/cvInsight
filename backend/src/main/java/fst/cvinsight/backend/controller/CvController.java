package fst.cvinsight.backend.controller;

import fst.cvinsight.backend.util.DocumentUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/cv")
class CvController {

    private final DocumentUtils documentUtils;

    @Autowired
    CvController(DocumentUtils documentUtils) {
        this.documentUtils = documentUtils;
    }

    @PostMapping(value = "/extract", consumes = {"multipart/form-data"})
    ResponseEntity<?> extractText(
            @RequestPart("cv") MultipartFile cv,
            @RequestParam("name") String name,
            @RequestParam("email") String email) {
        try{
            String originalFilename = cv.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            File tempFile = File.createTempFile("uploaded-" + cv.getName() + "-", extension);
            cv.transferTo(tempFile);

            return ResponseEntity.ok(documentUtils.extractText(tempFile));
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
