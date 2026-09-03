import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="contact-section"
    >
      <motion.div
        className="contact-card"
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
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <div className="contact-content">
          <p className="section-label">
            Contact
          </p>

          <h2>
            Let's build something
            <span> great together.</span>
          </h2>

          <p>
            I'm interested in software development,
            backend, integration, DevOps and cloud
            opportunities where I can continue
            growing while contributing to real
            projects.
          </p>
        </div>

        <div className="contact-actions">
          <a
            href="mailto:YOUR_EMAIL@example.com"
            className="contact-primary"
          >
            <FaEnvelope />
            Send Email
          </a>

          <a
            href="YOUR_GITHUB_URL"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href="YOUR_LINKEDIN_URL"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;