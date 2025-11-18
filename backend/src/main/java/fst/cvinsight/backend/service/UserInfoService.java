package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserInfo;
import fst.cvinsight.backend.entity.UserProfile;
import fst.cvinsight.backend.model.AuthProvider;
import fst.cvinsight.backend.model.RegisterRequest;
import fst.cvinsight.backend.repo.UserInfoRepository;
import fst.cvinsight.backend.repo.UserProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserInfoService implements UserDetailsService {

    private final UserInfoRepository repository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userInfo = repository.findByEmail(username);

        if (userInfo.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        UserInfo user = userInfo.get();
        return new UserInfoDetails(user);
    }

    @Transactional
    public UserInfo findOrCreateOAuthUser(String email, String name,AuthProvider authProvider) {
        return repository.findByEmail(email)
                .orElseGet(() -> {
                    UserInfo newUser = new UserInfo();
                    newUser.setEmail(email);
                    newUser.setUsername(name);
                    newUser.setProvider(authProvider);
                    newUser.setEnabled(true);
                    newUser.setRoles("ROLE_USER");
                    UserInfo savedUser = repository.save(newUser);
                    initProfile(savedUser);
                    return savedUser;
                });
    }

    @Transactional
    public UserInfo registerUser(RegisterRequest request) {

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        UserInfo newUser = new UserInfo();
        newUser.setEmail(request.getEmail());
        newUser.setUsername(request.getUsername());
        newUser.setPassword(encoder.encode(request.getPassword()));
        newUser.setProvider(AuthProvider.LOCAL);
        newUser.setEnabled(true);
        newUser.setRoles("ROLE_USER");

        UserInfo savedUser = repository.save(newUser);
        initProfile(savedUser);

        return savedUser;
    }

    public UserInfo getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return repository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + authentication.getName()));
    }

    public UserInfo getUserByEmail(String email){
        return repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public UserInfo save(UserInfo user){
        return repository.save(user);
    }

    private void initProfile(UserInfo user){
        String[] splitName = user.getUsername().split(" ",2);
        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setFirstName(splitName[0]);
        profile.setLastName(splitName[1]);
        userProfileRepository.save(profile);
    }
}
