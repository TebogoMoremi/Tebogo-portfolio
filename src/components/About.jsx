import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">About Me</p>

        <h2>
          Building software that is
          <span> practical, scalable and cloud-ready.</span>
        </h2>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            I am a software developer focused on building modern web
            applications, backend services and cloud-ready systems.
          </p>

          <p>
            My experience includes frontend development, backend APIs,, relational and non-relational
            databases, system integration, testing and DevOps technologies.
          </p>

          <p>
            I enjoy working with technologies such as React, Angular,
            C#, Java, Docker, Kubernetes, AWS, Talend and SoapUI.
          </p>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="stat-card">
            <span>01</span>
            <h3>Software Development</h3>
            <p>Frontend, backend and database development.</p>
          </div>

          <div className="stat-card">
            <span>02</span>
            <h3>DevOps & Cloud</h3>
            <p>Docker, Kubernetes, AWS, EKS and CI/CD.</p>
          </div>

          <div className="stat-card">
            <span>03</span>
            <h3>Integration</h3>
            <p>Talend, ETL, SOAP, REST APIs and SoapUI.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;