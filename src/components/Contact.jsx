import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-content">
          <span className="section-label">CONTACT</span>

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

        <div className="contact-links">

          {/* Email */}
          <a
            href="mailto:herroldmoremi@hotmail.com"
            className="contact-card contact-card-primary"
          >
            <div className="contact-icon">
              <FaEnvelope />
            </div>

            <div className="contact-card-content">
              <span className="contact-label">
                Email
              </span>

              <span className="contact-value">
                herroldmoremi@hotmail.com
              </span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <FaLinkedin />
            </div>

            <div className="contact-card-content">
              <span className="contact-label">
                LinkedIn
              </span>

              <span className="contact-value">
                Connect with me
              </span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/TebogoMoremi"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <FaGithub />
            </div>

            <div className="contact-card-content">
              <span className="contact-label">
                GitHub
              </span>

              <span className="contact-value">
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