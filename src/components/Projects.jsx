import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCreditCard, FaCloud, FaTerminal, FaDatabase } from "react-icons/fa";
import GlassCard from "./GlassCard";
const projectIcons = [FaCreditCard, FaCloud, FaTerminal, FaDatabase];

const projectFocus = [
  ["Account management", "A responsive React interface for accounts and transactions, connected through a REST API."],
  ["Containerized transactions", "A Java backend designed for Docker, Kubernetes and AWS EKS deployment."],
  ["Troubleshooting logs", "Python automation searches large log files for CPS errors and produces readable reports."],
  ["Managing visitor records", "A Node.js API for creating, updating and retrieving visitor data in PostgreSQL. Jest is included in the project stack."],
];

const projects = [
  {
    title: "Banking Application",
    description:
      "A modern banking application focused on account management, transactions and a clean responsive user interface.",
    stack: ["React", "JavaScript", "CSS", "REST API"],
    github: "#",
    live: "#",
  },
  {
    title: "AWS EKS Transactions Service",
    description:
      "A backend transaction service designed for containerized deployment using Docker, Kubernetes and AWS EKS.",
    stack: ["Java", "Docker", "Kubernetes", "AWS", "EKS"],
    github: "#",
    live: "#",
  },
  {
    title: "Log Cruncher",
    description:
      "A log analysis tool that searches large log files, identifies CPS errors and generates readable reports for troubleshooting.",
    stack: ["Python", "Log Analysis", "Automation", "Reporting"],
    github: "#",
    live: "#",
  },
  {
    title: "Visitor Management API",
    description:
      "A backend application for creating, updating, retrieving and managing visitor information using PostgreSQL.",
    stack: ["Node.js", "PostgreSQL", "JavaScript", "Jest"],
    github: "#",
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-label">Projects</p>

        <h2>
          Selected work and
          <span> real-world builds.</span>
        </h2>

        <p className="projects-intro">
          A selection of applications, backend services and DevOps projects
          demonstrating how I build, test, containerize and deploy software.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <GlassCard as="article"
            className="project-card"
            key={project.title}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
          >
            <div className={`project-cover project-cover-${index}`} aria-hidden="true">
              {(() => { const Icon = projectIcons[index]; return <Icon />; })()}
              <span className="project-visual-label">PROJECT CONCEPT</span>
              <span className="project-number">0{index + 1}</span>
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-stack">
                {project.stack.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <details className="project-details">
              <summary>Engineering overview</summary>
              <h4>{projectFocus[index][0]}</h4>
              <p>{projectFocus[index][1]}</p>
              <p className="technical-note">Repository and demo links are not yet published here.</p>
            </details>

            <div className="project-links">
              {project.github !== "#" ? <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub repository`}
              >
                <FaGithub />
                Code
              </a> : <span className="unavailable-link">Code not linked</span>}

              {project.live !== "#" ? <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
              >
                <FaExternalLinkAlt />
                Live
              </a> : <span className="unavailable-link">Demo not linked</span>}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Projects;
