package fst.cvinsight.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserInfo user;

    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate birthDate;
    private String gender;
    private String bio;
    @Embedded
    private UserAddress address;
    @Embedded
    private UserSocialLinks socialLinks;
}

