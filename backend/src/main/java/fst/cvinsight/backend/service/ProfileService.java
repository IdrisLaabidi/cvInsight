package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserProfile;
import fst.cvinsight.backend.repo.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserInfoService userInfoService; // service to get current user

    /**
     * Get current user's profile
     */
    public Optional<UserProfile> getCurrentUserProfile() {
        var currentUser = userInfoService.getCurrentUser();
        System.out.println("Current user: " + currentUser);
        return userProfileRepository.findByUser(currentUser);
    }

    /**
     * Get profile by user ID
     */
    public Optional<UserProfile> getProfileByUserId(UUID userId) {
        return userProfileRepository.findByUserId(userId);
    }

    /**
     * Create or update current user's profile
     */
    public UserProfile saveOrUpdateProfile(UserProfile profileData) {
        var currentUser = userInfoService.getCurrentUser();

        // Fetch existing profile or create new
        UserProfile profile = userProfileRepository.findByUser(currentUser)
                .orElseGet(() -> {
                    UserProfile p = new UserProfile();
                    p.setUser(currentUser);
                    return p;
                });

        // Update fields
        profile.setFirstName(profileData.getFirstName());
        profile.setLastName(profileData.getLastName());
        profile.setPhone(profileData.getPhone());
        profile.setBirthDate(profileData.getBirthDate());
        profile.setGender(profileData.getGender());
        profile.setBio(profileData.getBio());

        // Update embedded objects
        profile.setAddress(profileData.getAddress());
        profile.setSocialLinks(profileData.getSocialLinks());

        return userProfileRepository.save(profile);
    }

    /**
     * Delete current user's profile
     */
    public void deleteCurrentUserProfile() {
        var currentUser = userInfoService.getCurrentUser();
        userProfileRepository.findByUser(currentUser).ifPresent(userProfileRepository::delete);
    }
}

