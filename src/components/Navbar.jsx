// src/components/Navbar.jsx

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const sections = [
  "home",
  "about",
  "skills",
  "projects",
  "devops",
  "experience",
  "contact",
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else if (!menuOpen) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;

      const scrollPosition = currentScrollY + 180;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);

        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < bottom
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navItems = [
    ["home", "Home"],
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["devops", "DevOps Lab"],
    ["experience", "Experience"],
    ["contact", "Contact"],
  ];

  return (
    <motion.nav
      className="navbar"
      animate={{
        y: visible ? 0 : -100,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <a
        href="#home"
        className="logo"
        onClick={closeMenu}
      >
        TM<span>.</span>
      </a>

      <ul
        className={`nav-links ${
          menuOpen ? "nav-open" : ""
        }`}
      >
        {navItems.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={closeMenu}
              className={
                activeSection === id
                  ? "active"
                  : ""
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className="menu-button"
        onClick={() =>
          setMenuOpen((current) => !current)
        }
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </motion.nav>
  );
};

export default Navbar;