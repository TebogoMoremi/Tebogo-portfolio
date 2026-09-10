package com.tebogo.portfolioai.controller;

import com.tebogo.portfolioai.dto.ChatRequest;
import com.tebogo.portfolioai.dto.ChatResponse;
import com.tebogo.portfolioai.service.PortfolioKnowledgeService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    }
)
public class ChatController {

    private final PortfolioKnowledgeService knowledgeService;

    public ChatController(
        PortfolioKnowledgeService knowledgeService
    ) {
        this.knowledgeService = knowledgeService;
    }

    @PostMapping
    public ChatResponse chat(
        @Valid @RequestBody ChatRequest request
    ) {

        String answer =
            knowledgeService.answer(
                request.message()
            );

        return new ChatResponse(answer);
    }
}
