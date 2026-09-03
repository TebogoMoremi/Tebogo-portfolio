import { motion } from "framer-motion";

import {
  FaGithub,
  FaDocker,
  FaCloud,
  FaCodeBranch,
  FaAws,
} from "react-icons/fa";

import {
  SiKubernetes,
  SiGithubactions,
} from "react-icons/si";

const pipelineSteps = [
  {
    title: "Code",
    description:
      "Application development and version control.",
    icon: <FaCodeBranch />,
  },

  {
    title: "GitHub",
    description:
      "Source code management and collaboration.",
    icon: <FaGithub />,
  },

  {
    title: "CI / CD",
    description:
      "Automated build and deployment workflows.",
    icon: <SiGithubactions />,
  },

  {
    title: "Docker",
    description:
      "Containerized applications for consistent deployment.",
    icon: <FaDocker />,
  },

  {
    title: "Kubernetes",
    description:
      "Container orchestration and workload management.",
    icon: <SiKubernetes />,
  },

  {
    title: "AWS EKS",
    description:
      "Managed Kubernetes deployment on AWS.",
    icon: <FaAws />,
  },

  {
    title: "Production",
    description:
      "Cloud-ready application deployment.",
    icon: <FaCloud />,
  },
];

const DevOpsLab = () => {
  return (
    <section
      id="devops"
      className="devops-section"
    >
      <motion.div
        className="section-heading"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <p className="section-label">
          DevOps Lab
        </p>

        <h2>
          From code to
          <span> cloud deployment.</span>
        </h2>

        <p className="devops-intro">
          Building practical experience with
          containerization, CI/CD pipelines,
          Kubernetes and AWS cloud infrastructure.
        </p>
      </motion.div>

      <div className="pipeline">
        {pipelineSteps.map(
          (step, index) => (
            <motion.div
              className="pipeline-step"
              key={step.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
            >
              <div className="pipeline-icon">
                {step.icon}
              </div>

              <div className="pipeline-content">
                <span>
                  0{index + 1}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>
              </div>

              {index !==
                pipelineSteps.length - 1 && (
                <div className="pipeline-line">
                  <span />
                </div>
              )}
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default DevOpsLab;