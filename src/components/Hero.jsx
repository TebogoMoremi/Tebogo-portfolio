import { whatsappUrl } from "./WhatsAppButton";
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import SceneViewport from "../three/SceneViewport";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef();
  const visualRef = useRef();
  const pointerRef = useRef({ point: { x: 0, y: 0 }, inside: false });
  const trackPointer = event => {
    if (event.pointerType !== "mouse") return;
    const rect = heroRef.current.getBoundingClientRect();
    pointerRef.current.point.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    pointerRef.current.point.y = 1 - (event.clientY - rect.top) / rect.height * 2;
    pointerRef.current.inside = true;
  };
  return (
    <section id="home" className="hero" ref={heroRef} onPointerMove={trackPointer} onPointerLeave={() => { pointerRef.current.inside = false; }}>
      <SceneViewport kind="hero" label="A calm starfield surrounding a floating laptop, cloud and technology icons" heroRef={heroRef} visualRef={visualRef} pointerRef={pointerRef} />
      <div className="hero-content">
        <div className="hero-status"><span className="status-dot" /> Full-stack development · Backend · Cloud</div>
        <p className="hero-intro">Hi, I’m</p>
        <h1>Tebogo<br /><span>Moremi.</span></h1>
        <h2>Software Developer<span>Full-Stack & Cloud Engineering</span></h2>
        <p className="hero-statement">I build software that works<br />beyond the browser.</p>
        <p className="hero-description">I enjoy turning ideas into working applications—building interfaces and APIs, connecting systems, and getting them running with Docker and AWS.</p>
        <div className="hero-tech-stack">{["React", "Angular", "Java", "C#", "SQL", "Docker", "AWS", "CI/CD"].map(skill => <span key={skill}>{skill}</span>)}</div>
        <div className="hero-buttons">
          <a href="#projects" className="primary-button">Explore Projects <FaArrowRight /></a>
          <a href="/Tebogo-Moremi-CV.pdf" className="secondary-button" download><FaDownload /> Download CV</a>
        </div>
        <div className="hero-social-row">
          <a href="#contact" className="text-link">Let's Talk <span>↗</span></a><span className="social-divider" />
          <a href="https://github.com/TebogoMoremi" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Tebogo on WhatsApp"><FaWhatsapp /></a>
        </div>
      </div>
      <div className="hero-visual" ref={visualRef}>
        <div className="visual-caption"><span className="tiny-cross">+</span> A little code. A world of possibilities.</div>
        <div className="visual-footer">Frontend · Backend · Cloud</div>
      </div>
      <div className="hero-bottom"><a href="#about">SCROLL TO EXPLORE <span>↓</span></a><span>BUILT WITH PURPOSE. ENGINEERED TO EVOLVE.</span></div>
    </section>
  );
}
