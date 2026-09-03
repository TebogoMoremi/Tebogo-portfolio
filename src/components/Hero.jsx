import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import HeroScene from "../three/HeroScene";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Tebogo <span>Moremi</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Software Developer
          <br />
          <span>& DevOps / Cloud Enthusiast</span>
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          I build modern web applications, backend systems and cloud-ready
          solutions using technologies such as React, Angular, C#, Java,
          Docker, AWS and Kubernetes.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <a href="#projects" className="primary-button">
            View Projects
          </a>

          <a href="#contact" className="secondary-button">
            Contact Me
          </a>
        </motion.div>

        <div className="social-links">
          <a href="#" aria-label="GitHub">
            <FaGithub />
          </a>

          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="hero-3d">
        <HeroScene />
      </div>
    </section>
  );
};

export default Hero;