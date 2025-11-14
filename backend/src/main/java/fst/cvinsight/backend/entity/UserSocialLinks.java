package fst.cvinsight.backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSocialLinks {
    private String facebook;
    private String linkedin;
    private String twitter;
    private String github;
    private String instagram;
}
