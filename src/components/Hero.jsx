import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import SceneViewport from "../three/SceneViewport";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-status"><span className="status-dot" /> Open to development & DevOps opportunities</div>
        <p className="hero-intro">HELLO, I'M</p>
        <h1>Tebogo<br /><span>Moremi.</span></h1>
        <h2>Software Developer<span>Full-Stack & Cloud Engineering</span></h2>
        <p className="hero-description">From thoughtful interfaces to reliable infrastructure. I build applications, integrate systems, test APIs and deploy cloud-ready services.</p>
        <div className="hero-tech-stack">{["React", "Angular", "Java", "C#", "SQL", "Docker", "AWS", "CI/CD"].map(skill => <span key={skill}>{skill}</span>)}</div>
        <div className="hero-buttons">
          <a href="#projects" className="primary-button">Explore My Work <FaArrowRight /></a>
          <a href="/Tebogo-Moremi-CV.pdf" className="secondary-button" download><FaDownload /> Download CV</a>
        </div>
        <div className="hero-social-row">
          <a href="#contact" className="text-link">Contact me <span>↗</span></a><span className="social-divider" />
          <a href="https://github.com/TebogoMoremi" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-caption"><span className="tiny-cross">+</span> CONNECTING CODE & CLOUD <span>01 / 03</span></div>
        <SceneViewport kind="hero" label="An illuminated engineering core surrounded by technology orbits" />
        <div className="visual-footer"><span className="status-dot" /> SOFTWARE · SYSTEMS · INFRASTRUCTURE</div>
      </div>
      <div className="hero-bottom"><a href="#about">SCROLL TO EXPLORE <span>↓</span></a><span>BUILT WITH PURPOSE. ENGINEERED TO EVOLVE.</span></div>
    </section>
  );
}
