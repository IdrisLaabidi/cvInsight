package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserInfo;
import fst.cvinsight.backend.model.AuthProvider;
import fst.cvinsight.backend.model.RegisterRequest;
import fst.cvinsight.backend.repo.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    private final UserInfoRepository repository;
    private final PasswordEncoder encoder;

    @Autowired
    public UserInfoService(UserInfoRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userInfo = repository.findByEmail(username);

        if (userInfo.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        UserInfo user = userInfo.get();
        return new UserInfoDetails(user);
    }

    public String addUser(UserInfo userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User added successfully!";
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
                    return repository.save(newUser);
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

        return repository.save(newUser);
    }
}
