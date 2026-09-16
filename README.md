# 🚀 Tebogo Moremi — Developer Portfolio

Personal software development and DevOps portfolio built with React, Three.js and AWS.

The portfolio showcases my experience in full-stack development, backend APIs, cloud infrastructure, DevOps, CI/CD, system integration and containerized application deployment.

It also includes an interactive **Ask Tebogo AI** assistant that allows recruiters and visitors to ask questions about my technical skills, experience and projects.

---

## 👨‍💻 About Me

I'm **Tebogo Moremi**, a Software Developer with an interest in DevOps, cloud engineering and system integration.

I enjoy building applications and APIs, containerizing services, automating deployments and working with cloud infrastructure.

My technical experience includes:

- React and Angular
- Java and Spring Boot
- C# and ASP.NET Core
- JavaScript and Node.js
- SQL, PostgreSQL, MySQL and MSSQL
- REST APIs
- SOAP and WSDL
- Talend and ETL
- Docker and Kubernetes
- AWS
- GitHub Actions and CI/CD
- Git and GitHub
- Linux

---

## ✨ Portfolio Features

### 🎨 Interactive Frontend

The portfolio is built using:

- React
- Vite
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- React Icons

It includes an interactive 3D hero section, animated skill visualizations, responsive layouts and dedicated sections for my experience, skills, projects and DevOps work.

---

## 🤖 Ask Tebogo AI

The portfolio includes an AI-powered assistant designed specifically for recruiters and visitors.

Visitors can ask questions such as:

> What are Tebogo's strongest skills?

> What AWS experience does Tebogo have?

> Which projects demonstrate Java?

> What DevOps experience does Tebogo have?

The assistant uses a **local-first knowledge architecture**.

```text
Visitor
   │
   ▼
React Portfolio
   │
   ▼
Ask Tebogo AI
   │
   ▼
Spring Boot REST API
   │
   ├── Local Knowledge Base
   │       │
   │       └── Known portfolio question → Immediate response
   │
   └── Unknown question
           │
           ▼
        Gemini API
           │
           ▼
       AI Response
```

Common portfolio questions are answered locally without calling the external AI API.

Gemini is used only when the local knowledge service cannot answer the question.

This reduces:

- API usage
- external AI requests
- latency
- dependency on AI availability

If Gemini is unavailable or its quota is reached, the application falls back gracefully instead of failing.

---

## 🛡️ API Rate Limiting

The AI backend includes rate limiting to protect the service from excessive requests.

The backend tracks requests per visitor and limits the number of requests allowed during a configured time window.

This helps protect:

- AI API quota
- backend resources
- application availability

When the limit is exceeded, the API returns:

```text
HTTP 429 — Too Many Requests
```

The frontend then displays a countdown before another request can be submitted.

---

## ☁️ AWS Architecture

The portfolio is deployed using AWS infrastructure.

```text
                         Internet
                            │
                            ▼
                       CloudFront
                            │
               ┌────────────┴────────────┐
               │                         │
               ▼                         ▼
          React Frontend             /api/*
               │                         │
               ▼                         ▼
              S3                       ALB
                                         │
                                         ▼
                                   ECS / Fargate
                                         │
                                         ▼
                                  Spring Boot API
                                         │
                              ┌──────────┴──────────┐
                              │                     │
                              ▼                     ▼
                      Local Knowledge           Gemini API
```

### AWS Services

The project uses:

- Amazon S3
- Amazon CloudFront
- Amazon ECS
- AWS Fargate
- Application Load Balancer
- Amazon ECR
- AWS Secrets Manager
- Amazon CloudWatch
- Amazon SNS
- IAM

---

## 📊 Monitoring & Alerting

The Portfolio AI backend includes production monitoring using **Amazon CloudWatch**.

Five CloudWatch alarms monitor the service:

| Alarm | Purpose |
|---|---|
| `Portfolio-AI-Unhealthy-Target` | Detects unhealthy backend targets |
| `Portfolio-AI-HTTP-5XX` | Detects ALB infrastructure 5XX errors |
| `Portfolio-AI-Backend-5XX` | Detects backend application 5XX responses |
| `Portfolio-AI-High-CPU` | Detects sustained high ECS CPU utilization |
| `Portfolio-AI-High-Memory` | Detects sustained high ECS memory utilization |

Alerts are sent through Amazon SNS.

```text
ECS / Application Load Balancer
              │
              ▼
       CloudWatch Metrics
              │
              ▼
       CloudWatch Alarms
              │
              ▼
             SNS
              │
              ▼
      Email Notification
```

The monitoring pipeline has been tested end-to-end by triggering a CloudWatch alarm and confirming successful SNS email delivery.

---

## 🔄 CI/CD Pipeline

Deployment is automated using **GitHub Actions**.

The frontend deployment pipeline follows:

```text
Developer
    │
    ▼
git push
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Install dependencies
    ├── Build React application
    ├── Authenticate with AWS
    ├── Deploy build to S3
    └── Invalidate CloudFront cache
            │
            ▼
       Production
```

AWS authentication is configured using GitHub Actions and AWS IAM/OIDC rather than storing permanent AWS credentials directly in the repository.

---

## 🔐 Security

The project follows several security practices:

- AI API credentials are not stored in frontend code
- Gemini API credentials are stored in AWS Secrets Manager
- ECS receives secrets at runtime
- Environment files containing secrets are excluded from Git
- GitHub Actions uses AWS IAM/OIDC
- Backend traffic is routed through an Application Load Balancer
- API rate limiting protects the AI service
- CloudWatch monitors backend health and failures

---

## 🛠️ Tech Stack

### Frontend

```text
React
JavaScript
Vite
Three.js
React Three Fiber
Drei
Framer Motion
React Icons
HTML
CSS
```

### Backend

```text
Java 21
Spring Boot
REST API
Maven
```

### AI

```text
Google Gemini
Local-first portfolio knowledge service
Fallback architecture
```

### DevOps & Cloud

```text
Docker
AWS
ECS
Fargate
ECR
S3
CloudFront
Application Load Balancer
CloudWatch
SNS
Secrets Manager
IAM
GitHub Actions
CI/CD
```

---

## 📂 Project Structure

```text
tebogo-portfolio/
│
├── src/
│   ├── components/
│   ├── assets/
│   └── ...
│
├── public/
│   └── Tebogo-Moremi-CV.pdf
│
├── ai-service/
│   ├── Dockerfile
│   ├── pom.xml
│   │
│   └── src/main/
│       ├── java/com/tebogo/portfolioai/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── knowledge/
│       │   └── service/
│       │
│       └── resources/
│           └── application.properties
│
├── .github/
│   └── workflows/
│
├── package.json
└── README.md
```

---

## 💻 Running the Frontend Locally

Clone the repository:

```bash
git clone https://github.com/TebogoMoremi/Tebogo-portfolio.git
```

Enter the project:

```bash
cd Tebogo-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL.

---

## ☕ Running the AI Backend

Enter the backend:

```bash
cd ai-service
```

Build it:

```bash
mvn clean package
```

Run it:

```bash
mvn spring-boot:run
```

The API runs locally on:

```text
http://localhost:8080
```

Health endpoint:

```text
GET /api/health
```

Chat endpoint:

```text
POST /api/chat
```

Example request:

```json
{
  "question": "What AWS experience does Tebogo have?"
}
```

---

## 🐳 Running the Backend with Docker

Build the image:

```bash
docker build -t tebogo-portfolio-ai ./ai-service
```

Run the container:

```bash
docker run -p 8080:8080 tebogo-portfolio-ai
```

For Gemini-powered fallback responses, provide the required API credential securely through the runtime environment rather than adding it to the repository.

---

## 📌 Projects Highlighted

The portfolio includes projects demonstrating experience across software development, integration and DevOps, including:

### AWS EKS Transactions Service

Java-based backend work focused on cloud-native transaction processing and AWS/Kubernetes technologies.

### Banking Application

Full-stack banking application demonstrating application architecture, frontend development and backend integration.

### Log Cruncher

Python-based log analysis tool developed to analyze large application logs and identify CPS error patterns, affected commands and potentially missing request fields.

### Visitor Management API

Backend application using Express.js and PostgreSQL with CRUD operations, database integration and automated testing.

### Portfolio AI

React + Spring Boot + AWS application combining frontend development, backend API development, AI integration, Docker, CI/CD, cloud deployment, monitoring and alerting.

---

## 🎯 Current Focus

I'm currently focused on opportunities involving:

- Junior Software Development
- Backend Development
- Full-Stack Development
- DevOps
- Cloud Engineering
- System Integration

I'm particularly interested in environments where I can continue developing my skills while contributing to real production systems.

---

## 📬 Contact

**Tebogo Moremi**

Email: `herroldmoremi@hotmail.com`

LinkedIn:  
`linkedin.com/in/tebogo-herrold-moremi-782746157`

GitHub:  
`github.com/TebogoMoremi`

---

## 📄 License

This repository contains the source code for my personal developer portfolio.

© 2026 Tebogo Moremi.