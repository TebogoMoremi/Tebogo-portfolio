import { motion } from "framer-motion";

import {
  FaCloud,
  FaLaptopCode,
  FaTools,
  FaCode,
} from "react-icons/fa";

const experiences = [
  {
    role: "Junior DevOps Engineer",
    company: "CherryOlive",
    type: "Professional Experience",
    period: "2026 - Present",
    icon: <FaCloud />,
    description:
      "Supporting software development, system integration, troubleshooting, and DevOps activities while working with cloud infrastructure, containerization, CI/CD, APIs, and enterprise integration technologies.",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Java",
      "Talend",
      "SoapUI",
      "Git",
    ],
  },

 {
  role: "Web Developer",
  company: "Umuzi.org",
  type: "Learnership / Development Experience",
  period: "2023 - 2024",
  icon: <FaCode />,
  description:
    "Built practical web development experience through hands-on projects focused on frontend and backend development, APIs, databases, automated testing, Git workflows, and software development fundamentals.",
  skills: [
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "React",
    "PostgreSQL",
    "Git",
    "Jest",
  ],
},

  {
    role: "Software Developer",
    company: "Personal & Portfolio Projects",
    type: "Project Experience",
    period: "Ongoing",
    icon: <FaLaptopCode />,
    description:
      "Designing and developing frontend, backend, integration, and cloud-ready applications while applying modern software engineering and DevOps practices.",
    skills: [
      "React",
      "Java",
      "C#",
      "ASP.NET Core",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "Docker",
    ],
  },

  {
    role: "IT Support / Technical Support",
    company: "Technical Support Experience",
    type: "Support Experience",
    period: "Previous Experience",
    icon: <FaTools />,
    description:
      "Provided technical support, troubleshooting, user assistance, system setup, and issue investigation while developing a strong foundation in IT operations and problem solving.",
    skills: [
      "Troubleshooting",
      "Windows",
      "Networking",
      "Technical Support",
      "System Support",
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
          Career Journey
        </p>

        <h2>
          My <span>Experience</span>
        </h2>

        <p className="experience-intro">
          My experience combines software development,
          web development, technical support, enterprise
          integration, DevOps, and cloud engineering.
        </p>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map(
          (experience, index) => (
            <motion.article
              className="experience-card"
              key={`${experience.company}-${experience.role}`}
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