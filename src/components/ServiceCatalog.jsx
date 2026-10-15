import { useState } from "react";
import { FaArchive, FaCloud, FaDocker, FaServer, FaRandom, FaChartLine, FaBell, FaGithub, FaBox } from "react-icons/fa";
import GlassCard from "./GlassCard";

const catalog = [
  { name: "Amazon S3", icon: FaArchive, summary: "The frontend's home.", detail: "Stores the React production build in a private bucket. CloudFront serves its assets to visitors." },
  { name: "CloudFront", icon: FaCloud, summary: "One entry point.", detail: "Delivers frontend assets and sends /api/* requests to the Application Load Balancer." },
  { name: "Amazon ECR", icon: FaBox, summary: "Versioned containers.", detail: "Stores Docker images used by the container deployment. The ECS task definition points to the backend container image." },
  { name: "ECS / Fargate", icon: FaServer, summary: "The running backend.", detail: "Runs the Spring Boot application as a containerized service using AWS Fargate." },
  { name: "Load Balancer", icon: FaRandom, summary: "Traffic to healthy tasks.", detail: "Routes incoming API traffic to healthy backend tasks and exposes target health and error metrics." },
  { name: "CloudWatch", icon: FaChartLine, summary: "Logs and health signals.", detail: "Collects container logs and monitors target health, request errors, CPU and memory. Configured alarms notify SNS." },
  { name: "Amazon SNS", icon: FaBell, summary: "Alerts that reach me.", detail: "Delivers email notifications from the configured CloudWatch alarms." },
  { name: "GitHub Actions", icon: FaGithub, summary: "Repeatable delivery.", detail: "Builds the frontend, authenticates to AWS using OIDC, publishes container images, syncs assets to S3 and invalidates CloudFront." },
  { name: "Docker", icon: FaDocker, summary: "A consistent runtime.", detail: "Packages the backend application into a container image for deployment. Existing Docker configuration is preserved." },
];

export default function ServiceCatalog() {
  const [selected, setSelected] = useState(0);
  return <div className="service-catalog">
    <div className="devops-subheading"><p className="section-label">The building blocks</p><h3>What each service does.</h3><p>Select a service to explore its role in this portfolio.</p></div>
    <div className="service-card-grid">
      {catalog.map(({ name, icon: Icon, summary }, index) => <GlassCard as="button" type="button" className="service-card" key={name} aria-pressed={selected === index} aria-controls="service-catalog-detail" onClick={() => setSelected(index)}>
        <span className="card-icon"><Icon /></span><span className="service-card-title">{name}</span><span className="service-card-summary">{summary}</span>
      </GlassCard>)}
    </div>
    <div id="service-catalog-detail" className="catalog-detail" aria-live="polite"><h4>{catalog[selected].name}</h4><p>{catalog[selected].detail}</p></div>
  </div>;
}
