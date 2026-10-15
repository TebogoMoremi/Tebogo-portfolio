import { useState } from "react";
import SceneViewport from "../three/SceneViewport";
import { services } from "../data/architecture";

export default function ArchitectureExplorer() {
  const [selected, setSelected] = useState("cdn");
  const service = services.find(item => item.id === selected);
  return <div className="architecture-explorer">
    <div className="explorer-header"><span className="section-label">INSIDE THIS PORTFOLIO</span><span className="technical-note">AWS architecture · not live telemetry</span></div>
    <div className="architecture-layout">
      <SceneViewport kind="architecture" label="CloudFront branches to S3 and the load balancer, then ECS, Spring Boot, local knowledge and Gemini. CloudWatch sends alerts through SNS." selected={selected} onSelect={setSelected} />
      <aside className="service-detail"><span className="section-label">EXPLORE A SERVICE</span><div className="service-controls">{services.map(item => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.name}</button>)}</div><div className="service-description" aria-live="polite"><h3>{service.name}</h3><p>{service.description}</p></div></aside>
    </div>
    <p className="architecture-status">Deployment note: the current workflow publishes the frontend to S3 and CloudFront and images to ECR. Automatic ECS/Fargate deployment is disabled; this diagram describes the configured backend architecture, not its live availability.</p>
    <div className="architecture-readable" aria-label="Readable architecture diagram">
      <h3>Follow a request</h3>
      <p className="request-entry">User <span>→</span> CloudFront</p>
      <div className="request-branches"><p><small>STATIC ASSETS</small>S3 <span>→</span> React frontend</p><p><small>API REQUESTS · /api/*</small>Load Balancer <span>→</span> ECS / Fargate <span>→</span> Spring Boot<br /><span>↳</span> Local Knowledge first · Gemini API when needed</p></div>
      <p className="monitoring-path"><small>MONITORING</small>ALB + ECS <span>→</span> CloudWatch <span>→</span> SNS <span>→</span> Email alerts</p>
    </div>
  </div>;
}
