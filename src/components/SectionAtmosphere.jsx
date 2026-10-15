import { useEffect, useState } from "react";
import SceneViewport from "../three/SceneViewport";

// One shared renderer changes atmosphere as sections enter the reading area.
export default function SectionAtmosphere() {
  const [section, setSection] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setSection(entry.target.id === "home" ? null : entry.target.id);
      }
    }, { rootMargin: "-20% 0px -55% 0px" });
    document.querySelectorAll("main > section").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return section ? <div className={`section-atmosphere atmosphere-${section}`}>
    <SceneViewport kind="ambient" section={section} label="Decorative section atmosphere" />
  </div> : null;
}
