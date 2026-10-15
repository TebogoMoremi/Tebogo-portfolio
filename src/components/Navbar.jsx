import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const items = [["home", "Home"], ["about", "About"], ["experience", "Experience"], ["skills", "Skills"], ["projects", "Projects"], ["devops", "DevOps Lab"], ["contact", "Contact"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    items.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    const resize = () => { if (window.innerWidth > 900) setOpen(false); };
    window.addEventListener("resize", resize);
    return () => { observer.disconnect(); window.removeEventListener("resize", resize); };
  }, []);
  return <nav className="navbar" aria-label="Main navigation" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>
    <a href="#home" className="logo" onClick={() => setOpen(false)} aria-label="Tebogo Moremi home">TM<span>.</span><small>DEVELOPER PORTFOLIO</small></a>
    <ul id="main-navigation" className={`nav-links ${open ? "nav-open" : ""}`}>
      {items.map(([id, label]) => <li key={id}><a href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}{id === "contact" && <span> ↗</span>}</a></li>)}
    </ul>
    <button ref={toggle} className="menu-button" onClick={() => setOpen(value => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation">{open ? <FaTimes /> : <FaBars />}</button>
  </nav>;
}
