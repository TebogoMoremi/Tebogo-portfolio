import { motion, useReducedMotion } from "framer-motion";

const elements = { article: motion.article, div: motion.div, button: motion.button };

// Shared pointer treatment; keyboard focus receives the same border emphasis in CSS.
export default function GlassCard({ as = "div", className = "", children, ...props }) {
  const Element = elements[as];
  const reduced = useReducedMotion();
  const reset = event => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };
  const track = event => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const style = event.currentTarget.style;
    style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
    style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
    style.setProperty("--light-x", `${x * 100}%`);
    style.setProperty("--light-y", `${y * 100}%`);
  };
  return <Element {...props} className={`glass-card ${className}`}
    onPointerMove={track} onPointerLeave={reset} onBlur={reset}
    transformTemplate={(_, transform) => reduced ? transform : `${transform === "none" ? "" : transform} perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`}>
    {children}
  </Element>;
}
