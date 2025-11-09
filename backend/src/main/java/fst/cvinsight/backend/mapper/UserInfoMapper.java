package fst.cvinsight.backend.mapper;

import fst.cvinsight.backend.dto.UserInfoDto;
import fst.cvinsight.backend.entity.UserInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserInfoMapper {
    UserInfoDto toUserInfoDto(UserInfo userInfo);
}
