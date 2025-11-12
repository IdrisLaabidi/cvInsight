package fst.cvinsight.backend.controller;

import fst.cvinsight.backend.entity.UserProfile;
import fst.cvinsight.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<?> getMyProfile() {
        return profileService.getCurrentUserProfile()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProfileByUserId(@PathVariable UUID userId) {
        return profileService.getProfileByUserId(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserProfile> createOrUpdateProfile(@RequestBody UserProfile profileData) {
        UserProfile savedProfile = profileService.saveOrUpdateProfile(profileData);
        return ResponseEntity.ok(savedProfile);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMyProfile() {
        profileService.deleteCurrentUserProfile();
        return ResponseEntity.noContent().build();
    }
}

