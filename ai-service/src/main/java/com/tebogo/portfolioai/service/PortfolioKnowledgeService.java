package com.tebogo.portfolioai.service;

import org.springframework.stereotype.Service;

@Service
public class PortfolioKnowledgeService {

    private final GeminiService geminiService;

    public PortfolioKnowledgeService(
        GeminiService geminiService
    ) {
        this.geminiService = geminiService;
    }

    public String answer(String question) {

        String portfolioContext = """
            NAME
            Tebogo Moremi

            ROLE
            Software Developer
            DevOps and Cloud Enthusiast

            TECHNICAL SKILLS

            Frontend:
            React, Angular, JavaScript, HTML and CSS.

            Backend:
            Java, C#, ASP.NET Core, Node.js and Express.js.

            Databases:
            SQL, PostgreSQL, MySQL and MSSQL.

            DevOps and Cloud:
            Docker, Kubernetes, AWS, GitHub Actions,
            CI/CD, ECR, ECS/Fargate, S3, CloudFront,
            IAM, OIDC and Nginx.

            Integration and Testing:
            Talend, ETL, SoapUI, SOAP, WSDL and REST APIs.

            EXPERIENCE

            CherryOlive
            Software Engineer
            January 2026 - May 2026.

            Experience included software development,
            Angular, Express.js, API testing with SoapUI
            and Talend ETL integration workflows.

            Umuzi.org
            Web Developer Recruit
            August 2023 - August 2024.

            Worked on practical web development projects,
            JavaScript, backend development, databases
            and automated testing.

            WOPL
            Full-Stack Developer
            June 2022 - August 2023.

            PROJECTS

            AWS EKS Transactions Service:
            Java backend service involving REST APIs,
            JPA/Hibernate, PostgreSQL, Docker,
            Kubernetes and AWS technologies.

            Banking Application:
            React-based banking application.

            Log Cruncher:
            Python tool for analysing application logs,
            identifying CPS errors and producing reports.

            Visitor Management API:
            Node.js and PostgreSQL backend application
            with automated tests.

            Personal Portfolio:
            React and Three.js portfolio with automated
            CI/CD using GitHub Actions and AWS services
            including S3, CloudFront, Docker, ECR,
            IAM and OIDC.
            """;

        String prompt = """
            You are Tebogo Moremi's portfolio AI assistant.

            Your audience includes recruiters,
            hiring managers and software engineers.

            Answer the recruiter's question using ONLY
            the portfolio information provided below.

            RULES:
            - Never invent skills, experience, qualifications,
              employers, projects or technologies.
            - If the portfolio information does not contain
              enough information to answer the question,
              clearly say so.
            - Keep answers concise and professional.
            - Refer to Tebogo in the third person.
            - Highlight relevant technical skills when useful.
            - Do not claim Tebogo has experience that is not
              explicitly listed in the portfolio information.
            - Focus on information useful to recruiters
              and hiring managers.

            PORTFOLIO INFORMATION:

            %s

            RECRUITER QUESTION:

            %s
            """.formatted(
                portfolioContext,
                question
            );

        return geminiService.ask(prompt);
    }
}