package fst.cvinsight.backend.repo;

import fst.cvinsight.backend.entity.UploadedCV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UploadedCVRepository extends JpaRepository<UploadedCV, UUID> {
    @Query("SELECT u FROM UploadedCV u WHERE u.uploadedBy = :userId")
    List<UploadedCV> findAllByUserId(@Param("userId") UUID userId);
}
