package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserAddress;
import fst.cvinsight.backend.entity.UserProfile;
import fst.cvinsight.backend.entity.UserSocialLinks;
import fst.cvinsight.backend.repo.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

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

        updateIfNotNull(profile::setFirstName, profileData.getFirstName());
        updateIfNotNull(profile::setLastName, profileData.getLastName());
        updateIfNotNull(profile::setPhone, profileData.getPhone());
        updateIfNotNull(profile::setBirthDate, profileData.getBirthDate());
        updateIfNotNull(profile::setGender, profileData.getGender());
        updateIfNotNull(profile::setBio, profileData.getBio());

        if (profile.getAddress() == null) profile.setAddress(new UserAddress());
        UserAddress addressData = profileData.getAddress();
        if (addressData != null) {
            updateIfNotNull(profile.getAddress()::setPostalCode, addressData.getPostalCode());
            updateIfNotNull(profile.getAddress()::setCity, addressData.getCity());
            updateIfNotNull(profile.getAddress()::setCountry, addressData.getCountry());
        }

        if (profile.getSocialLinks() == null) profile.setSocialLinks(new UserSocialLinks());
        UserSocialLinks socialLinksData = profileData.getSocialLinks();
        if (socialLinksData != null) {
            updateIfNotNull(profile.getSocialLinks()::setFacebook, socialLinksData.getFacebook());
            updateIfNotNull(profile.getSocialLinks()::setLinkedin, socialLinksData.getLinkedin());
            updateIfNotNull(profile.getSocialLinks()::setTwitter, socialLinksData.getTwitter());
            updateIfNotNull(profile.getSocialLinks()::setGithub, socialLinksData.getGithub());
            updateIfNotNull(profile.getSocialLinks()::setInstagram, socialLinksData.getInstagram());
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

    private <T> void updateIfNotNull(Consumer<T> setter, T value) {
        if (value != null) setter.accept(value);
    }
}

