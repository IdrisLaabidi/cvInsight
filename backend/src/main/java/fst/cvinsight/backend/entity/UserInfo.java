package fst.cvinsight.backend.entity;

import fst.cvinsight.backend.model.AuthProvider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
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
