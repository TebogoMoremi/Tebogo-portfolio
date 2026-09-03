import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Angular",
      "JavaScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
    ],
  },

  {
    title: "Backend",
    skills: [
      "C#",
      "ASP.NET Core",
      "Java",
      "Node.js",
      "REST APIs",
    ],
  },

  {
    title: "Databases",
    skills: [
      "SQL",
      "PostgreSQL",
      "MySQL",
      "MSSQL",
    ],
  },

  {
    title: "DevOps & Cloud",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "EKS",
      "GitHub Actions",
      "CI/CD",
      "Linux",
    ],
  },

  {
    title: "Integration & Testing",
    skills: [
      "Talend",
      "ETL",
      "SoapUI",
      "SOAP",
      "WSDL",
      "XML",
    ],
  },

  {
    title: "Tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-label">Skills</p>

        <h2>
          Technologies I use to
          <span> build and deploy.</span>
        </h2>
      </motion.div>

      <div className="skills-grid">
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            className="skill-category"
            key={group.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: groupIndex * 0.08,
            }}
          >
            <h3>{group.title}</h3>

            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;