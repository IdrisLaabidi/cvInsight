package fst.cvinsight.backend.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserSocialLinks {
    private String facebook;
    private String linkedin;
    private String twitter;
    private String github;
    private String instagram;
}
