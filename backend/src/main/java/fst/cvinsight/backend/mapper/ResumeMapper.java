package fst.cvinsight.backend.mapper;

import fst.cvinsight.backend.dto.ResumeDto;
import fst.cvinsight.backend.entity.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResumeMapper {
    @Mapping(source = "uploadedBy.id", target = "uploadedById")
    ResumeDto toDto(Resume resume);

    List<ResumeDto> toDtoList(List<Resume> resumes);

}
