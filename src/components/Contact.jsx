// src/components/Contact.jsx

import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <div className="contact-actions">

          {/* EMAIL */}
          <a
            href="mailto:herroldmoremi@hotmail.com"
            className="contact-primary"
          >
            <div className="contact-action-icon">
              <FaEnvelope />
            </div>

            <div className="contact-action-content">
              <span className="contact-action-label">
                Email
              </span>

              <span className="contact-action-value">
                herroldmoremi@hotmail.com
              </span>
            </div>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-action-icon">
              <FaLinkedin />
            </div>

            <div className="contact-action-content">
              <span className="contact-action-label">
                LinkedIn
              </span>

              <span className="contact-action-value">
                Connect with me
              </span>
            </div>
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/TebogoMoremi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-action-icon">
              <FaGithub />
            </div>

            <div className="contact-action-content">
              <span className="contact-action-label">
                GitHub
              </span>

              <span className="contact-action-value">
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