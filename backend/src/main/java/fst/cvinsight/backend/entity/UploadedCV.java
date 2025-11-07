package fst.cvinsight.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadedCV {
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
}
