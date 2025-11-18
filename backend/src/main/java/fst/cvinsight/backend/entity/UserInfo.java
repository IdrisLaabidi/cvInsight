package fst.cvinsight.backend.entity;

import fst.cvinsight.backend.model.AuthProvider;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String username;
    private String email;
    private String password;
    private String roles;
    private Boolean enabled;
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
}
