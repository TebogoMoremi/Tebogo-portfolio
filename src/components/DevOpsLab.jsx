import { motion } from "framer-motion";

import {
  FaGithub,
  FaDocker,
  FaAws,
  FaCloud,
  FaServer,
  FaLock,
} from "react-icons/fa";

import { SiGithubactions } from "react-icons/si";

const pipelineSteps = [
  {
    number: "01",
    title: "GitHub",
    description:
      "Source code is version controlled in GitHub and changes are pushed through the main branch.",
    icon: <FaGithub />,
  },
  {
    number: "02",
    title: "GitHub Actions",
    description:
      "CI/CD automatically installs dependencies, builds the React application and starts the deployment workflow.",
    icon: <SiGithubactions />,
  },
  {
    number: "03",
    title: "AWS OIDC",
    description:
      "GitHub Actions authenticates securely with AWS using OIDC and IAM roles without storing long-lived AWS access keys.",
    icon: <FaLock />,
  },
  {
    number: "04",
    title: "Docker & ECR",
    description:
      "The application is containerized with Docker and versioned images are automatically published to Amazon ECR.",
    icon: <FaDocker />,
  },
  {
    number: "05",
    title: "Amazon S3",
    description:
      "The optimized Vite production build is synchronized to a private Amazon S3 bucket.",
    icon: <FaAws />,
  },
  {
    number: "06",
    title: "CloudFront",
    description:
      "Amazon CloudFront distributes the portfolio globally over HTTPS and cache invalidation publishes updates immediately.",
    icon: <FaCloud />,
  },
];

const technologies = [
  "GitHub Actions",
  "Docker",
  "Amazon ECR",
  "Amazon ECS",
  "AWS Fargate",
  "Amazon S3",
  "CloudFront",
  "AWS IAM",
  "OIDC",
  "CloudWatch",
  "Nginx",
];

const achievements = [
  {
    title: "Automated CI/CD",
    description:
      "Every push to main automatically builds, packages and deploys the latest version of the portfolio.",
  },
  {
    title: "Secure AWS Authentication",
    description:
      "Implemented GitHub OIDC authentication with AWS IAM instead of storing permanent AWS credentials.",
  },
  {
    title: "Container Deployment",
    description:
      "Built and deployed the portfolio as a Docker container through Amazon ECR and ECS Fargate.",
  },
  {
    title: "Cost-Optimized Hosting",
    description:
      "Moved the production frontend to private S3 and CloudFront while scaling Fargate down when not required.",
  },
];

const DevOpsLab = () => {
  return (
    <section id="devops" className="devops-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">DevOps & Cloud</p>

        <h2>
          From code to
          <span> production.</span>
        </h2>

        <p className="devops-intro">
          A production CI/CD workflow built with GitHub Actions, Docker and AWS.
          The pipeline securely authenticates through OIDC, publishes container
          images to Amazon ECR and deploys the production frontend through S3
          and CloudFront.
        </p>
      </motion.div>

      {/* Architecture */}
      <motion.div
        className="devops-architecture"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="architecture-header">
          <div>
            <span className="architecture-label">PRODUCTION ARCHITECTURE</span>

            <h3>Automated AWS Deployment Pipeline</h3>
          </div>

          <div className="architecture-status">
            <span className="status-dot" />
            LIVE
          </div>
        </div>

        <div className="architecture-flow">
          <div className="architecture-node">
            <FaGithub />
            <span>GitHub</span>
          </div>

          <span className="architecture-arrow">→</span>

          <div className="architecture-node">
            <SiGithubactions />
            <span>Actions</span>
          </div>

          <span className="architecture-arrow">→</span>

          <div className="architecture-node">
            <FaLock />
            <span>OIDC</span>
          </div>

          <span className="architecture-arrow">→</span>

          <div className="architecture-node">
            <FaAws />
            <span>AWS</span>
          </div>

          <span className="architecture-arrow">→</span>

          <div className="architecture-node">
            <FaServer />
            <span>S3</span>
          </div>

          <span className="architecture-arrow">→</span>

          <div className="architecture-node">
            <FaCloud />
            <span>CloudFront</span>
          </div>
        </div>

        <div className="architecture-secondary">
          <FaDocker />

          <span>
            Docker images are also built and published to Amazon ECR as part of
            the CI/CD pipeline.
          </span>
        </div>
      </motion.div>

      {/* Pipeline */}
      <div className="pipeline">
        {pipelineSteps.map((step, index) => (
          <motion.div
            className="pipeline-step"
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
          >
            <div className="pipeline-icon">{step.icon}</div>

            <div className="pipeline-content">
              <span>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>

            {index !== pipelineSteps.length - 1 && (
              <div className="pipeline-line">
                <span />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Implementation */}
      <motion.div
        className="devops-implementation"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="devops-subheading">
          <p className="section-label">IMPLEMENTATION</p>
          <h3>What I built</h3>
        </div>

        <div className="devops-achievements">
          {achievements.map((item, index) => (
            <motion.div
              className="devops-achievement-card"
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
            >
              <span className="achievement-number">0{index + 1}</span>

              <h4>{item.title}</h4>

              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technology stack */}
      <motion.div
        className="devops-stack"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="devops-stack-title">
          <FaCloud />
          <span>DevOps & Cloud Stack</span>
        </div>

        <div className="devops-tech-list">
          {technologies.map((technology) => (
            <span className="devops-tech" key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DevOpsLab;
