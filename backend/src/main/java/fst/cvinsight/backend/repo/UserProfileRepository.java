package fst.cvinsight.backend.repo;

import fst.cvinsight.backend.entity.UserInfo;
import fst.cvinsight.backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {

    Optional<UserProfile> findByUser(UserInfo user);
    Optional<UserProfile> findByUserId(UUID userId);
}