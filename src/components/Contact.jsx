import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-content">
          <p className="section-label">
            Contact
          </p>

          <h2>
            Let&apos;s build something
            <span> meaningful.</span>
          </h2>

          <p>
            I&apos;m open to junior software development,
            DevOps, cloud and integration opportunities.
            Feel free to reach out through email, LinkedIn
            or GitHub.
          </p>
        </div>

        <div className="contact-actions">
          <a
            href="mailto:herroldmoremi@hotmail.com"
            className="contact-primary"
          >
            <FaEnvelope />

            <div>
              <span>Email</span>
              <small>
                herroldmoremi@hotmail.com
              </small>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />

            <div>
              <span>LinkedIn</span>
              <small>
                Connect with me
              </small>
            </div>
          </a>

          <a
            href="https://github.com/TebogoMoremi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />

            <div>
              <span>GitHub</span>
              <small>
                View my repositories
              </small>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;