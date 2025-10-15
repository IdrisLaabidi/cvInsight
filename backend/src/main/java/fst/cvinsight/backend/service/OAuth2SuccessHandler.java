package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserInfoService userInfoService;
    private final String frontendUrl;

    public OAuth2SuccessHandler(
            JwtService jwtService,
            UserInfoService userInfoService,
            @Value("${frontend.url}") String frontendUrl
    ) {
        this.jwtService = jwtService;
        this.userInfoService = userInfoService;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = (String) oauthUser.getAttributes().get("email");
        String name = (String) oauthUser.getAttributes().get("name");

        UserInfo user = userInfoService.findOrCreateGoogleUser(email, name);

        String jwt = jwtService.generateToken(user.getEmail());

        String redirectUrl = frontendUrl + "/login/success?token=" + jwt;
        response.sendRedirect(redirectUrl);
    }
}
