package fst.cvinsight.backend.dto;

import com.fasterxml.jackson.databind.JsonNode;
import fst.cvinsight.backend.model.ResumeOrigin;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for {@link fst.cvinsight.backend.entity.Resume}
 */
@Value
public class ResumeDto implements Serializable {
    UUID id;
    String filename;
    String contentType;
    long size;
    UUID uploadedById;
    LocalDateTime uploadedAt;
    JsonNode jsonContent;
    ResumeOrigin origin;
}