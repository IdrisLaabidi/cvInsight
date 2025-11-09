package fst.cvinsight.backend.controller;

import fst.cvinsight.backend.mapper.UserInfoMapper;
import fst.cvinsight.backend.model.AuthRequest;
import fst.cvinsight.backend.entity.UserInfo;
import fst.cvinsight.backend.model.RegisterRequest;
import fst.cvinsight.backend.service.JwtService;
import fst.cvinsight.backend.util.DocumentUtils;
import fst.cvinsight.backend.service.UserInfoService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserInfoService service;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final UserInfoMapper userInfoMapper;

    @Autowired
    AuthController(
            UserInfoService service,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            UserInfoMapper userInfoMapper) {
        this.service = service;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userInfoMapper = userInfoMapper;
    }

    @GetMapping(value = "/welcome")
    public String welcome() {
        return "Welcome to CV Insight Backend!";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try{
            UserInfo user = service.registerUser(request);
            return ResponseEntity.ok("User registered successfully: " + user.getEmail());
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.getEmail());
                UserInfo user = service.getUserByEmail(authRequest.getEmail());

                return ResponseEntity.ok(Map.of("token", token, "user", userInfoMapper.toUserInfoDto(user) ));
            } else {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        }catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (AuthenticationException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }

    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshJWT(HttpServletRequest request){
        try {
            String authorization = request.getHeader("Authorization");

            if (authorization == null || !authorization.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Missing or invalid Authorization header"));
            }

            String refreshToken = authorization.substring(7);

            String email = jwtService.extractUsernameAllowExpired(refreshToken);
            if (email == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid refresh token"));
            }

            String newToken = jwtService.generateToken(email);

            return ResponseEntity.ok(Map.of("token", newToken));
        }catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request){
        try {
            String authorization = request.getHeader("Authorization");

            if (authorization == null || !authorization.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Missing or invalid Authorization header"));
            }

            String token = authorization.substring(7);
            String email = jwtService.extractUsername(token);
            UserInfo user = service.getUserByEmail(email);
            return ResponseEntity.ok(Map.of("user",userInfoMapper.toUserInfoDto(user)));
        }catch (UsernameNotFoundException | JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
