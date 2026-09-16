package com.tebogo.portfolioai.service;

import com.tebogo.portfolioai.knowledge.LocalAnswerService;
import com.tebogo.portfolioai.knowledge.PortfolioProfile;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PortfolioKnowledgeService {

    private final GeminiService geminiService;
    private final LocalAnswerService localAnswerService;
    private final PortfolioProfile portfolioProfile;

    public PortfolioKnowledgeService(
        GeminiService geminiService,
        LocalAnswerService localAnswerService,
        PortfolioProfile portfolioProfile
    ) {
        this.geminiService = geminiService;
        this.localAnswerService = localAnswerService;
        this.portfolioProfile = portfolioProfile;
    }

    public String answer(String question) {

        // ---------------------------------------------------------
        // 1. TRY LOCAL KNOWLEDGE FIRST
        // ---------------------------------------------------------

        Optional<String> localAnswer =
            localAnswerService.findAnswer(question);

        if (localAnswer.isPresent()) {
            System.out.println(
                "AI ROUTE -> LOCAL KNOWLEDGE"
            );

            return localAnswer.get();
        }


        // ---------------------------------------------------------
        // 2. BUILD GEMINI PROMPT
        // ---------------------------------------------------------

        String prompt = buildPrompt(question);


        // ---------------------------------------------------------
        // 3. TRY GEMINI
        // ---------------------------------------------------------

        Optional<String> geminiAnswer =
            geminiService.ask(prompt);

        if (geminiAnswer.isPresent()) {
            System.out.println(
                "AI ROUTE -> GEMINI"
            );

            return geminiAnswer.get();
        }


        // ---------------------------------------------------------
        // 4. GEMINI UNAVAILABLE / QUOTA EXHAUSTED
        // ---------------------------------------------------------

        System.out.println(
            "AI ROUTE -> LOCAL FALLBACK"
        );

        return getLocalFallback();
    }


    private String buildPrompt(String question) {

        return """
            You are Tebogo Moremi's portfolio AI assistant.

            Your audience includes recruiters, hiring managers
            and software engineers.

            Answer the user's question using ONLY the portfolio
            information provided below.

            RULES:

            - Never invent skills, experience, qualifications,
              employers, projects or technologies.

            - If the portfolio information does not contain enough
              information to answer, clearly say so.

            - Keep answers concise and professional.

            - Refer to Tebogo in the third person.

            - Highlight relevant technical skills when useful.

            - Do not claim Tebogo has experience that is not
              explicitly listed.

            - Focus on information useful to recruiters and
              hiring managers.

            PORTFOLIO INFORMATION:

            %s

            QUESTION:

            %s
            """.formatted(
                portfolioProfile.getFullProfile(),
                question
            );
    }


    private String getLocalFallback() {

        return """
            I don't have enough portfolio information to answer
            that specific question right now.

            I can still help with questions about:

            - Tebogo's technical skills
            - Java and backend development
            - React and frontend development
            - AWS and cloud experience
            - Docker and Kubernetes
            - DevOps and CI/CD
            - Software development projects
            - Work experience
            - Talend and system integration
            - Databases

            Try asking something like:
            **"What AWS experience does Tebogo have?"**
            """;
    }
}