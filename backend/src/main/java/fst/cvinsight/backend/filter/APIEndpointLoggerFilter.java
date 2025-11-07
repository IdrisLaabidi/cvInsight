package fst.cvinsight.backend.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.Enumeration;
import java.util.stream.Collectors;

@Component
public class APIEndpointLoggerFilter extends OncePerRequestFilter {

    private final Logger log= LoggerFactory.getLogger(APIEndpointLoggerFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        Instant start = Instant.now();
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String query = request.getQueryString() != null ? "?" + request.getQueryString() : "";
        String clientIp = request.getRemoteAddr();
        String headers = getHeadersAsString(request);

        log.info("[API REQUEST] {} {}{} | IP: {} | Headers: {}", method, uri, query, clientIp, headers);

        filterChain.doFilter(request, response);

        Instant end = Instant.now();
        long durationMs = Duration.between(start, end).toMillis();
        int status = response.getStatus();
        log.info("[API RESPONSE] {} {}{} -> Status: {} | IP: {} | Duration: {} ms | Headers: {}", method, uri, query, status, clientIp, durationMs, headers);
    }

    private String getHeadersAsString(HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames == null) return "{}";

        return "{" +
                java.util.Collections.list(headerNames).stream()
                        .map(name -> name + ": " + request.getHeader(name))
                        .collect(Collectors.joining(", ")) +
                "}";
    }
}
