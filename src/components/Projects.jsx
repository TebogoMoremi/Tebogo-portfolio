import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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
          <motion.article
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
            <div className="project-number">
              0{index + 1}
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

            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub repository`}
              >
                <FaGithub />
                Code
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
              >
                <FaExternalLinkAlt />
                Live
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;