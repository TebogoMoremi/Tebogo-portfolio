import { motion } from "framer-motion";
import { FaCode, FaCloud, FaExchangeAlt, FaBookOpen } from "react-icons/fa";
import GlassCard from "./GlassCard";

const strengths = [
  { title: "Software Development", icon: FaCode, text: "Frontend interfaces, backend services and database-driven applications." },
  { title: "Cloud & DevOps", icon: FaCloud, text: "Docker, AWS, Kubernetes and CI/CD—from a local build to a deployed service." },
  { title: "Backend & Integrations", icon: FaExchangeAlt, text: "Connecting REST and SOAP services, working with data, and testing API contracts." },
  { title: "Continuous Learning", icon: FaBookOpen, text: "Continuing to develop my engineering practice across cloud, automation and secure software delivery." },
];

export default function About() {
  return <section id="about" className="about-section">
    <motion.div className="section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <p className="section-label">About me</p>
      <h2>More than just<br /><span>writing code.</span></h2>
    </motion.div>
    <div className="about-grid">
      <div className="about-story">
        <p className="about-lead">I like understanding how the pieces fit together.</p>
        <p>The interface someone uses. The API behind it. The infrastructure that keeps it running. Working across those layers is what draws me to software engineering.</p>
        <p>My experience spans frontend and backend development, relational and non-relational databases, system integration, testing and DevOps.</p>
        <p>I work with React, Angular, C#, Java, Docker and AWS, alongside integration tools like Talend and SoapUI. Each project is a chance to sharpen how I build, test and troubleshoot software.</p>
        <a className="text-link about-link" href="#experience">Follow my experience <span>↗</span></a>
      </div>
      <div className="about-strengths">
        {strengths.map(({ title, icon: Icon, text }, index) => <GlassCard as="article" className="strength-card" key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}>
          <span className="card-icon"><Icon /></span><h3>{title}</h3><p>{text}</p>
        </GlassCard>)}
      </div>
    </div>
  </section>;
}
