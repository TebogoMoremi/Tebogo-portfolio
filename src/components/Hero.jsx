import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";

import HeroScene from "../three/HeroScene";

const Hero = () => {
  return (
    <section id="home" className="hero">

      {/* 3D BACKGROUND */}
      <div className="hero-background">
        <HeroScene />
      </div>

      {/* DARK OVERLAY FOR TEXT READABILITY */}
      <div className="hero-overlay" />

      {/* HERO CONTENT */}
      <div className="hero-content">
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-status-dot" />
          Open to software development & DevOps opportunities
        </motion.div>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.1,
          }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.18,
          }}
        >
          Tebogo <span>Moremi</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.28,
          }}
        >
          Software Developer
          <span>
            {" "}
            & DevOps / Cloud Enthusiast
          </span>
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.38,
          }}
        >
          I build reliable web applications, backend systems
          and cloud-ready solutions, with a focus on modern
          development, automation and system integration.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.48,
          }}
        >
          <a
            href="#projects"
            className="primary-button"
          >
            View Projects
            <FaArrowRight />
          </a>

          <a
            href="/Tebogo-Moremi-CV.pdf"
            className="secondary-button"
            download
          >
            <FaDownload />
            Download CV
          </a>
        </motion.div>

        <motion.div
          className="hero-social-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.58,
          }}
        >
          <span className="hero-social-label">
            Find me online
          </span>

          <div className="social-links">
            <a
              href="https://github.com/TebogoMoremi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/tebogo-herrold-moremi-782746157/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="hero-scroll"
        aria-label="Scroll to About"
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </a>
    </section>
  );
};

export default Hero;