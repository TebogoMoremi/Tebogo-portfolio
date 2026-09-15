package com.tebogo.portfolioai.controller;

import com.tebogo.portfolioai.dto.ChatRequest;
import com.tebogo.portfolioai.dto.ChatResponse;
import com.tebogo.portfolioai.service.PortfolioKnowledgeService;
import com.tebogo.portfolioai.service.RateLimitService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(
    originPatterns = {
        "http://localhost:*",
        "http://127.0.0.1:*",
        "https://d2axaeq2znzcoy.cloudfront.net"
    },
    allowedHeaders = "*",
    methods = {
        org.springframework.web.bind.annotation.RequestMethod.POST,
        org.springframework.web.bind.annotation.RequestMethod.OPTIONS
    }
)
public class ChatController {

    private final PortfolioKnowledgeService knowledgeService;
    private final RateLimitService rateLimitService;

    public ChatController(
        PortfolioKnowledgeService knowledgeService,
        RateLimitService rateLimitService
    ) {
        this.knowledgeService = knowledgeService;
        this.rateLimitService = rateLimitService;
    }

    @PostMapping
    public ChatResponse chat(
        @Valid @RequestBody ChatRequest request,
        HttpServletRequest httpRequest
    ) {

        String clientIp =
            getClientIp(httpRequest);

        if (!rateLimitService.isAllowed(clientIp)) {

            throw new ResponseStatusException(
                HttpStatus.TOO_MANY_REQUESTS,
                "Too many requests. Please try again in a minute."
            );
        }

        String answer =
            knowledgeService.answer(
                request.message()
            );

        return new ChatResponse(answer);
    }

    private String getClientIp(
        HttpServletRequest request
    ) {

        String forwardedFor =
            request.getHeader(
                "X-Forwarded-For"
            );

        if (
            forwardedFor != null &&
            !forwardedFor.isBlank()
        ) {

            return forwardedFor
                .split(",")[0]
                .trim();
        }

        return request.getRemoteAddr();
    }
}