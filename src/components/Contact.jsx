// src/components/Contact.jsx

import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-content">
          <p className="section-label">
            CONTACT
          </p>

          <h2>
            Let&apos;s build something{" "}
            <span>meaningful.</span>
          </h2>

          <p>
            I&apos;m open to junior software development,
            DevOps, cloud and integration opportunities.
            <br />
            Feel free to reach out through email, LinkedIn
            or GitHub.
          </p>
        </div>

        {/* RIGHT */}
        <div className="contact-links">

          <a
            href="mailto:herroldmoremi@hotmail.com"
            className="contact-link-card contact-link-primary"
          >
            <div className="contact-link-icon">
              <FaEnvelope />
            </div>

            <div className="contact-link-content">
              <span className="contact-link-label">
                Email
              </span>

              <span className="contact-link-value">
                herroldmoremi@hotmail.com
              </span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-card"
          >
            <div className="contact-link-icon">
              <FaLinkedin />
            </div>

            <div className="contact-link-content">
              <span className="contact-link-label">
                LinkedIn
              </span>

              <span className="contact-link-value">
                Connect with me
              </span>
            </div>
          </a>

          <a
            href="https://github.com/TebogoMoremi"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link-card"
          >
            <div className="contact-link-icon">
              <FaGithub />
            </div>

            <div className="contact-link-content">
              <span className="contact-link-label">
                GitHub
              </span>

              <span className="contact-link-value">
                View my repositories
              </span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Contact;