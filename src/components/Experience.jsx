import { motion } from "framer-motion";
import {
  FaCloud,
  FaLaptopCode,
  FaTools,
} from "react-icons/fa";

const experiences = [
  {
    role: "Junior DevOps Engineer",
    company: "Duranki",
    type: "Freelance",
    period: "2026 - Present",
    icon: <FaCloud />,
    description:
      "Supporting software delivery and DevOps activities while building practical experience with containers, cloud technologies, automation, deployments, and application troubleshooting.",
    skills: [
      "Docker",
      "Linux",
      "Git",
      "CI/CD",
      "AWS",
      "Kubernetes",
    ],
  },

  {
    role: "Software Developer",
    company: "Personal & Portfolio Projects",
    type: "Project Experience",
    period: "Ongoing",
    icon: <FaLaptopCode />,
    description:
      "Designing and developing frontend, backend, integration, and cloud-ready applications using modern development practices.",
    skills: [
      "React",
      "Java",
      "C#",
      "ASP.NET Core",
      "Node.js",
      "PostgreSQL",
    ],
  },

  {
    role: "IT Support / Technical Support",
    company: "Technical Support Experience",
    type: "Support",
    period: "Previous Experience",
    icon: <FaTools />,
    description:
      "Provided technical support, troubleshooting, user assistance, system setup, and issue investigation while developing a strong foundation in IT operations.",
    skills: [
      "Troubleshooting",
      "Windows",
      "Networking",
      "Technical Support",
      "Problem Solving",
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="experience-section"
    >
      <div className="section-heading">
        <p className="section-label">
          Career Journey
        </p>

        <h2>
          My <span>Experience</span>
        </h2>

        <p className="experience-intro">
          My experience combines software development,
          technical support, system integration, and an
          increasing focus on DevOps and cloud engineering.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map(
          (experience, index) => (
            <motion.article
              className="experience-card"
              key={`${experience.role}-${index}`}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <div className="experience-marker">
                <div className="experience-icon">
                  {experience.icon}
                </div>
              </div>

              <div className="experience-content">
                <div className="experience-header">
                  <div>
                    <span className="experience-type">
                      {experience.type}
                    </span>

                    <h3>
                      {experience.role}
                    </h3>

                    <h4>
                      {experience.company}
                    </h4>
                  </div>

                  <span className="experience-period">
                    {experience.period}
                  </span>
                </div>

                <p>
                  {experience.description}
                </p>

                <div className="experience-skills">
                  {experience.skills.map(
                    (skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.article>
          )
        )}
      </div>
    </section>
  );
};

export default Experience;