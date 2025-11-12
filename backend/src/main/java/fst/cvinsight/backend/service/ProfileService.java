package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserAddress;
import fst.cvinsight.backend.entity.UserProfile;
import fst.cvinsight.backend.entity.UserSocialLinks;
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

        UserProfile profile = userProfileRepository.findByUser(currentUser)
                .orElseGet(() -> {
                    UserProfile p = new UserProfile();
                    p.setUser(currentUser);
                    return p;
                });

        profile.setFirstName(profileData.getFirstName());
        profile.setLastName(profileData.getLastName());
        profile.setPhone(profileData.getPhone());
        profile.setBirthDate(profileData.getBirthDate());
        profile.setGender(profileData.getGender());
        profile.setBio(profileData.getBio());

        if (profile.getAddress() == null) {
            profile.setAddress(new UserAddress());
        }
        UserAddress newAddress = profileData.getAddress();
        if (newAddress != null) {
            profile.getAddress().setPostalCode(newAddress.getPostalCode());
            profile.getAddress().setCity(newAddress.getCity());
            profile.getAddress().setCountry(newAddress.getCountry());
        }

        if (profile.getSocialLinks() == null) {
            profile.setSocialLinks(new UserSocialLinks());
        }
        UserSocialLinks newSocialLinks = profileData.getSocialLinks();
        if (newSocialLinks != null) {
            profile.getSocialLinks().setFacebook(newSocialLinks.getFacebook());
            profile.getSocialLinks().setLinkedin(newSocialLinks.getLinkedin());
            profile.getSocialLinks().setTwitter(newSocialLinks.getTwitter());
            profile.getSocialLinks().setGithub(newSocialLinks.getGithub());
            profile.getSocialLinks().setInstagram(newSocialLinks.getInstagram());
        }

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

