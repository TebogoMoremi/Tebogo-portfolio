import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import DevOpsLab from "./components/DevOpsLab";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ContactDock from "./components/ContactDock";
import SectionAtmosphere from "./components/SectionAtmosphere";
import { MotionConfig } from "framer-motion";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <SectionAtmosphere />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <DevOpsLab />
        <Contact />
      </main>

      <Footer />
      <ContactDock />
    </MotionConfig>
  );
}

export default App;
