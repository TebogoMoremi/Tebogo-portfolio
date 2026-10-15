import { motion } from "framer-motion";
import { useState } from "react";
import SceneViewport from "../three/SceneViewport";
import { skillDescriptions } from "../data/skillDescriptions";
import { FaReact, FaServer, FaDatabase, FaCloud, FaExchangeAlt, FaTools } from "react-icons/fa";
import GlassCard from "./GlassCard";
const categoryIcons = [FaReact, FaServer, FaDatabase, FaCloud, FaExchangeAlt, FaTools];

const skillGroups = [
  {
    title: "Frontend Engineering",
    skills: [
      "React",
      "Angular",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
    ],
  },

  {
    title: "Backend Engineering",
    skills: [
      "C#",
      "ASP.NET Core",
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
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
    title: "Cloud & DevOps",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "ECS",
      "ECR",
      "CloudFront",
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
      "REST APIs",
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
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState("React");
  const selectSkill = (name, groupIndex = category) => { setCategory(groupIndex); setSelected(name); };
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

      <div className="skills-explorer">
        <div className="skills-explorer-copy">
          <p className="section-label">A CONNECTED TOOLKIT</p>
          <h3>Explore my<br /><span>technology universe.</span></h3>
          <p>From the first component to the final deployment. Choose a discipline to explore its tools.</p>
          <div className="category-controls" aria-label="Technology categories">{skillGroups.map((group, index) => <button key={group.title} aria-pressed={category === index} onClick={() => selectSkill(group.skills[0], index)}><span>0{index + 1}</span>{group.title}<span>↗</span></button>)}</div>
          <div className="skill-description" aria-live="polite"><strong>{selected}</strong><p>{skillDescriptions[selected]}</p></div>
        </div>
        <SceneViewport kind="skills" label={`${skillGroups[category].title} technology constellation. All technologies are also listed below.`} nodes={skillGroups[category].skills} selected={selected} onSelect={selectSkill} />
      </div>
      <p className="skills-list-label">THE COMPLETE STACK <span>Every skill, at a glance.</span></p>
      <div className="skills-grid">
        {skillGroups.map((group, groupIndex) => (
          <GlassCard as="article"
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
            <h3><span className="card-icon">{(() => { const Icon = categoryIcons[groupIndex]; return <Icon />; })()}</span>{group.title}</h3>

            <div className="skill-tags">
              {group.skills.map((skill) => (
                <button key={skill} aria-pressed={selected === skill && category === groupIndex} onClick={() => selectSkill(skill, groupIndex)}>
                  {skill}
                </button>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Skills;
