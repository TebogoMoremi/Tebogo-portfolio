package com.tebogo.portfolioai.knowledge;

import org.springframework.stereotype.Component;

@Component
public class PortfolioProfile {

    public String getName() {
        return "Tebogo Moremi";
    }

    public String getRole() {
        return """
            Software Developer
            DevOps and Cloud Enthusiast
            """;
    }

    public String getFrontendSkills() {
        return """
            React, Angular, JavaScript, HTML and CSS.
            """;
    }

    public String getBackendSkills() {
        return """
            Java, C#, ASP.NET Core, Node.js and Express.js.
            """;
    }

    public String getDatabaseSkills() {
        return """
            SQL, PostgreSQL, MySQL and MSSQL.
            """;
    }

    public String getDevOpsSkills() {
        return """
            Docker, Kubernetes, AWS, GitHub Actions, CI/CD,
            ECR, ECS/Fargate, S3, CloudFront, IAM, OIDC and Nginx.
            """;
    }

    public String getIntegrationSkills() {
        return """
            Talend, ETL, SoapUI, SOAP, WSDL and REST APIs.
            """;
    }

    public String getExperience() {
        return """
            CherryOlive
            Software Engineer
            January 2026 - May 2026.

            Experience included software development, Angular,
            Express.js, API testing with SoapUI and Talend ETL
            integration workflows.

            Umuzi.org
            Web Developer Recruit
            August 2023 - August 2024.

            Worked on practical web development projects,
            JavaScript, backend development, databases and
            automated testing.

            WOPL
            Full-Stack Developer
            June 2022 - August 2023.
            """;
    }

    public String getProjects() {
        return """
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
            React and Three.js portfolio with automated CI/CD
            using GitHub Actions and AWS services including
            S3, CloudFront, Docker, ECR, IAM and OIDC.
            """;
    }

    public String getFullProfile() {
        return """
            NAME
            %s

            ROLE
            %s

            TECHNICAL SKILLS

            Frontend:
            %s

            Backend:
            %s

            Databases:
            %s

            DevOps and Cloud:
            %s

            Integration and Testing:
            %s

            EXPERIENCE

            %s

            PROJECTS

            %s
            """.formatted(
                getName(),
                getRole(),
                getFrontendSkills(),
                getBackendSkills(),
                getDatabaseSkills(),
                getDevOpsSkills(),
                getIntegrationSkills(),
                getExperience(),
                getProjects()
            );
    }
}