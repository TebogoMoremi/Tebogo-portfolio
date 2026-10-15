// Verified against README.md, cloudfront-config-ai.json, the ECS task definition,
// and PortfolioKnowledgeService.java. This is a topology, not live telemetry.
export const services = [
  { id: "user", name: "User", position: [-4.3, 2.4, 0], description: "A visitor requests the portfolio or asks the portfolio assistant a question." },
  { id: "cdn", name: "CloudFront", position: [-1.9, 2.4, 0], description: "Delivers the React frontend from S3 and routes /api/* requests to the Application Load Balancer." },
  { id: "s3", name: "S3 · React", position: [1.1, 2.4, 0], description: "A private S3 bucket stores the production React frontend. CloudFront delivers these static assets over HTTPS." },
  { id: "alb", name: "Load Balancer", position: [-1.9, 0.6, 0], description: "Routes API requests to healthy backend targets and provides health and error metrics." },
  { id: "ecs", name: "ECS / Fargate", position: [0.8, 0.6, 0], description: "Runs the containerized Spring Boot backend using AWS Fargate. Container images are stored in Amazon ECR." },
  { id: "api", name: "Spring Boot", position: [3.5, 0.6, 0], description: "Handles chat requests, enforces rate limiting and tries local portfolio knowledge before calling Gemini." },
  { id: "local", name: "Local Knowledge", position: [2, -1.3, 0], description: "Answers recognized portfolio questions locally, before any Gemini request. Also provides a fallback if Gemini is unavailable." },
  { id: "gemini", name: "Gemini API", position: [4.1, -1.3, 0], description: "Generates portfolio-grounded responses when a question is not answered by local knowledge." },
  { id: "watch", name: "CloudWatch", position: [-2.4, -1.6, 0], description: "Collects container logs and monitors ALB target health, errors, ECS CPU and memory. Alarms notify SNS." },
  { id: "sns", name: "SNS Alerts", position: [-0.1, -2.8, 0], description: "Delivers email notifications when the configured CloudWatch alarms trigger." },
];
export const connections = [["user", "cdn"], ["cdn", "s3"], ["cdn", "alb"], ["alb", "ecs"], ["ecs", "api"], ["api", "local"], ["api", "gemini"], ["alb", "watch"], ["ecs", "watch"], ["watch", "sns"]];
