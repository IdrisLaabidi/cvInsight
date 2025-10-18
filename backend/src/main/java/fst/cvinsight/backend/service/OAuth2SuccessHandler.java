package fst.cvinsight.backend.service;

import fst.cvinsight.backend.entity.UserInfo;
import fst.cvinsight.backend.model.AuthProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
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

        String provider = null;
        if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
            provider = oauthToken.getAuthorizedClientRegistrationId();
        }

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = (String) oauthUser.getAttributes().get("email");
        if (email == null) {
            email = (String) oauthUser.getAttributes().get("preferred_username");
        }

        String name = (String) oauthUser.getAttributes().get("name");

        UserInfo user;
        if ("google".equals(provider)) {
            user = userInfoService.findOrCreateOAuthUser(email, name, AuthProvider.GOOGLE);
        } else if ("azure-dev".equals(provider)) {
            user = userInfoService.findOrCreateOAuthUser(email, name, AuthProvider.MICROSOFT);
        } else {
            throw new IllegalStateException("Unknown OAuth provider: " + provider);
        }

        String jwt = jwtService.generateToken(user.getEmail());
        String redirectUrl = frontendUrl + "/login/success?token=" + jwt;

        response.sendRedirect(redirectUrl);
    }
}
