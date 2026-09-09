// src/components/Hero.jsx

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight, FaDownload } from "react-icons/fa";

import HeroScene from "../three/HeroScene";

const heroSkills = ["React / Angular", "Java / C#", "Docker / AWS", "CI/CD"];

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* 3D BACKGROUND */}
      <div className="hero-background">
        <HeroScene />
      </div>

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

          <span>Open to Software Development & DevOps Opportunities</span>
        </motion.div>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          Tebogo <span>Moremi</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          Software Developer
          <span> | DevOps & Cloud</span>
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
        >
          I build full-stack applications, APIs and cloud-ready systems using
          React, Java, C#, SQL and AWS, with hands-on experience in Docker,
          CI/CD and system integration.
        </motion.p>

        {/* QUICK TECH STACK */}
        <motion.div
          className="hero-tech-stack"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44 }}
        >
          {heroSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#projects" className="primary-button">
            Explore My Work
            <FaArrowRight />
          </a>

          <a href="/Tebogo-Moremi-CV.pdf" className="secondary-button" download>
            <FaDownload />
            Download CV
          </a>
        </motion.div>

        {/* SOCIAL LINKS */}
        <motion.div
          className="hero-social-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="hero-social-label">Find me online</span>

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

      {/* SCROLL INDICATOR */}
      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </a>
    </section>
  );
};

export default Hero;
