package fst.cvinsight.backend.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.vladmihalcea.hibernate.type.json.JsonType;
import fst.cvinsight.backend.model.ResumeOrigin;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String filename;
    private String contentType;
    private long size;
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private UserInfo uploadedBy;
    private LocalDateTime uploadedAt = LocalDateTime.now();
    private byte[] fileData;
    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private JsonNode jsonContent;
    @Enumerated(EnumType.STRING)
    private ResumeOrigin origin;
    private Double score;
}
