package com.tebogo.portfolioai.knowledge;

import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class LocalAnswerService {

    public Optional<String> findAnswer(String question) {

        if (question == null || question.isBlank()) {
            return Optional.of("""
                Please ask a question about Tebogo's skills,
                experience, projects, DevOps work or technologies.
                """);
        }

        String normalized = question
            .toLowerCase(Locale.ROOT)
            .trim();


        // ---------------------------------------------------------
        // ABOUT TEBOGO
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "tell me about tebogo",
            "who is tebogo",
            "about tebogo",
            "introduce tebogo",
            "describe tebogo",
            "what kind of developer"
        )) {
            return Optional.of("""
                Tebogo Moremi is a **Software Developer with a growing
                focus on DevOps and cloud technologies**.

                His development stack includes React, Angular, Java,
                C#, ASP.NET Core, Node.js, Express.js and SQL databases.

                He also has hands-on experience with **Docker,
                Kubernetes, AWS, GitHub Actions and CI/CD**, as well as
                integration technologies including Talend, SoapUI,
                SOAP and REST APIs.

                His portfolio demonstrates both application development
                and the deployment of cloud-ready systems.
                """);
        }


        // ---------------------------------------------------------
        // RECRUITER / SUITABILITY
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "why should we hire",
            "why hire tebogo",
            "why should i hire",
            "suitable for",
            "good candidate",
            "what makes tebogo",
            "junior developer role",
            "software developer role"
        )) {
            return Optional.of("""
                Tebogo brings a combination of **software development,
                system integration and DevOps exposure**.

                His experience includes frontend and backend development
                using React, Angular, Java, C#, Node.js and SQL databases.

                He has also worked with Docker, Kubernetes, AWS,
                GitHub Actions and CI/CD, giving him practical exposure
                beyond application code.

                His portfolio demonstrates this through projects involving
                APIs, databases, automated testing, containers and
                cloud deployment.
                """);
        }


        // ---------------------------------------------------------
        // BACKEND PROJECTS
        // Keep before generic "projects"
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "backend project",
            "backend projects",
            "server side project",
            "server-side project"
        )) {
            return Optional.of("""
                Tebogo's backend-oriented projects include:

                - **AWS EKS Transactions Service** — Java, REST APIs,
                  JPA/Hibernate, PostgreSQL, Docker, Kubernetes and AWS.

                - **Visitor Management API** — Node.js, Express.js
                  and PostgreSQL with automated testing.

                - **Log Cruncher** — Python tooling for analysing
                  application logs and identifying CPS errors.

                These projects demonstrate experience with APIs,
                databases, backend logic, testing and cloud-oriented
                development.
                """);
        }


        // ---------------------------------------------------------
        // FRONTEND PROJECTS
        // Keep before generic "projects"
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "frontend project",
            "frontend projects",
            "front-end project",
            "react project",
            "react projects"
        )) {
            return Optional.of("""
                Tebogo's frontend work includes:

                - **Personal Portfolio** — built with React and Three.js
                  and deployed using an automated AWS CI/CD workflow.

                - **Banking Application** — React-based banking
                  application.

                His frontend technology stack includes React, Angular,
                JavaScript, HTML and CSS.
                """);
        }


        // ---------------------------------------------------------
        // API EXPERIENCE
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "api",
            "apis",
            "rest api",
            "restful",
            "web service",
            "web services"
        )) {
            return Optional.of("""
                Tebogo has experience working with **REST APIs and
                web-service integrations**.

                His AWS EKS Transactions Service involves Java backend
                development and REST APIs.

                His Visitor Management API demonstrates Node.js,
                Express.js and PostgreSQL backend development.

                He also has integration experience involving SOAP,
                WSDL, SoapUI and Talend.
                """);
        }


        // ---------------------------------------------------------
        // TESTING
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "testing",
            "automated testing",
            "tests",
            "test automation",
            "api testing"
        )) {
            return Optional.of("""
                Tebogo has experience with **automated testing and
                API testing**.

                His Umuzi development work included automated testing,
                while the Visitor Management API also includes automated
                tests.

                For integration testing, he has worked with **SoapUI**
                for SOAP and API testing.
                """);
        }


        // ---------------------------------------------------------
        // CURRENT OPPORTUNITIES
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "looking for",
            "career goal",
            "career goals",
            "career direction",
            "opportunities",
            "opportunity",
            "type of role",
            "roles interested"
        )) {
            return Optional.of("""
                Tebogo's portfolio is positioned toward **software
                development and DevOps/cloud opportunities**.

                His technical background spans frontend development,
                backend development, databases, system integration,
                Docker, Kubernetes, AWS and CI/CD.

                His projects demonstrate an interest in building
                applications as well as understanding how those
                applications are tested, containerized and deployed.
                """);
        }


        // ---------------------------------------------------------
        // CONTACT
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "contact tebogo",
            "contact him",
            "get in touch",
            "reach tebogo",
            "reach him",
            "email tebogo",
            "linkedin",
            "github profile"
        )) {
            return Optional.of("""
                Tebogo can be contacted through the **Contact section**
                of this portfolio.

                His portfolio also provides links to his **LinkedIn**
                and **GitHub** profiles where recruiters and developers
                can view his professional profile and technical work.
                """);
        }


        // ---------------------------------------------------------
        // SKILLS
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "skill",
            "skills",
            "technology",
            "technologies",
            "tech stack",
            "stack",
            "strongest"
        )) {
            return Optional.of("""
                Tebogo's technical skills include:

                **Frontend:** React, Angular, JavaScript, HTML and CSS.

                **Backend:** Java, C#, ASP.NET Core, Node.js and Express.js.

                **Databases:** SQL, PostgreSQL, MySQL and MSSQL.

                **DevOps & Cloud:** Docker, Kubernetes, AWS,
                GitHub Actions, CI/CD, ECR, ECS/Fargate,
                S3, CloudFront, IAM and OIDC.

                **Integration & Testing:** Talend, ETL, SoapUI,
                SOAP, WSDL and REST APIs.
                """);
        }


        // ---------------------------------------------------------
        // JAVA
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "java",
            "spring",
            "eks transaction",
            "eks project"
        )) {
            return Optional.of("""
                Tebogo has Java experience demonstrated through the
                **AWS EKS Transactions Service**.

                The project involves Java backend development,
                REST APIs, JPA/Hibernate, PostgreSQL, Docker,
                Kubernetes and AWS technologies.

                Java is also part of Tebogo's backend development
                skill set.
                """);
        }


        // ---------------------------------------------------------
        // AWS / CLOUD
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "aws",
            "cloud",
            "amazon web services",
            "ecs",
            "ecr",
            "fargate",
            "cloudfront",
            "s3",
            "iam",
            "oidc"
        )) {
            return Optional.of("""
                Tebogo has hands-on AWS and cloud experience.

                His portfolio uses AWS services including **S3,
                CloudFront, ECR, ECS/Fargate and IAM**.

                He has also worked with Docker, Kubernetes,
                GitHub Actions, CI/CD and OIDC.

                His AWS EKS Transactions Service further demonstrates
                experience with containerized Java applications and
                Kubernetes-oriented cloud deployment.
                """);
        }


        // ---------------------------------------------------------
        // DEVOPS / CI-CD
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "devops",
            "docker",
            "kubernetes",
            "ci/cd",
            "ci cd",
            "pipeline",
            "github actions",
            "deployment",
            "continuous integration",
            "continuous deployment",
            "automated deployment"
        )) {
            return Optional.of("""
                Tebogo has hands-on DevOps experience with **Docker,
                Kubernetes, AWS and GitHub Actions**.

                His portfolio uses automated CI/CD and AWS services
                including S3, CloudFront, ECR, ECS/Fargate,
                IAM and OIDC.

                He has also worked with containerized applications
                and Kubernetes-based deployment concepts.
                """);
        }


        // ---------------------------------------------------------
        // PROJECTS
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "project",
            "projects",
            "portfolio work",
            "built",
            "applications"
        )) {
            return Optional.of("""
                Tebogo's portfolio includes several technical projects:

                - **AWS EKS Transactions Service** — Java, REST APIs,
                  JPA/Hibernate, PostgreSQL, Docker, Kubernetes and AWS.

                - **Banking Application** — React-based banking
                  application.

                - **Log Cruncher** — Python tool for analysing
                  application logs, identifying CPS errors and
                  producing reports.

                - **Visitor Management API** — Node.js and PostgreSQL
                  backend application with automated tests.

                - **Personal Portfolio** — React and Three.js application
                  with automated CI/CD using GitHub Actions and AWS.
                """);
        }


        // ---------------------------------------------------------
        // EXPERIENCE
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "experience",
            "work experience",
            "employment",
            "worked",
            "company",
            "companies",
            "cherryolive",
            "umuzi",
            "wopl"
        )) {
            return Optional.of("""
                Tebogo's software development experience includes:

                **CherryOlive — Software Engineer**
                January 2026 to May 2026.
                Worked with software development, Angular, Express.js,
                SoapUI and Talend ETL integration workflows.

                **Umuzi.org — Web Developer Recruit**
                August 2023 to August 2024.
                Worked on practical web development projects,
                JavaScript, backend development, databases and
                automated testing.

                **WOPL — Full-Stack Developer**
                June 2022 to August 2023.
                """);
        }


        // ---------------------------------------------------------
        // TALEND / INTEGRATION
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "talend",
            "etl",
            "soap",
            "soapui",
            "wsdl",
            "integration"
        )) {
            return Optional.of("""
                Tebogo has experience with system integration and
                testing technologies including **Talend, ETL,
                SoapUI, SOAP, WSDL and REST APIs**.

                At CherryOlive, his experience included API testing
                with SoapUI and Talend ETL integration workflows.
                """);
        }


        // ---------------------------------------------------------
        // DATABASES
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "database",
            "databases",
            "sql",
            "postgres",
            "postgresql",
            "mysql",
            "mssql"
        )) {
            return Optional.of("""
                Tebogo works with **SQL, PostgreSQL, MySQL and MSSQL**.

                PostgreSQL is also used in projects such as the
                AWS EKS Transactions Service and Visitor Management API.
                """);
        }


        // ---------------------------------------------------------
        // FRONTEND
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "react",
            "frontend",
            "front-end",
            "angular",
            "javascript",
            "html",
            "css"
        )) {
            return Optional.of("""
                Tebogo's frontend skills include **React, Angular,
                JavaScript, HTML and CSS**.

                His Personal Portfolio is built with React and Three.js,
                while his Banking Application also demonstrates
                React development.
                """);
        }


        // ---------------------------------------------------------
        // BACKEND
        // ---------------------------------------------------------

        if (containsAny(
            normalized,
            "backend",
            "back-end",
            "c#",
            "asp.net",
            "node",
            "express"
        )) {
            return Optional.of("""
                Tebogo's backend technologies include **Java, C#,
                ASP.NET Core, Node.js and Express.js**.

                His projects include Java-based backend development
                as well as Node.js and PostgreSQL API development.
                """);
        }


        // No local answer matched.
        // PortfolioKnowledgeService can now decide whether to use Gemini.

        return Optional.empty();
    }


    private boolean containsAny(
        String text,
        String... keywords
    ) {

        for (String keyword : keywords) {
            if (text.contains(keyword)) {
                return true;
            }
        }

        return false;
    }
}