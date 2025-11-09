package fst.cvinsight.backend.dto;

import fst.cvinsight.backend.entity.UserInfo;
import lombok.Value;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link UserInfo}
 */
@Value
public class UserInfoDto implements Serializable {
    UUID id;
    String username;
    String email;
    String roles;
}