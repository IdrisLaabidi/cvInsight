package fst.cvinsight.backend.repo;

import fst.cvinsight.backend.entity.Resume;
import fst.cvinsight.backend.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<Resume, UUID> {
    List<Resume> findAllByUploadedBy(UserInfo uploadedBy);
}
