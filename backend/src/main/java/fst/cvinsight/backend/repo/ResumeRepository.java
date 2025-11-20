package fst.cvinsight.backend.repo;

import fst.cvinsight.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<Resume, UUID> {
    @Query("SELECT u FROM Resume u WHERE u.uploadedBy = :userId")
    List<Resume> findAllByUserId(@Param("userId") UUID userId);
}
