package fst.cvinsight.backend.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserAddress {
    private String postalCode;
    private String city;
    private String country;
}
