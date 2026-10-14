import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SceneCanvas = lazy(() => import("./SceneCanvas"));
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function StaticCore() {
  return <div className="static-core" aria-hidden="true"><i /><i /><i /><div>TM<span>CODE / CLOUD</span></div></div>;
}

// Load the renderer on approach and release offscreen WebGL contexts.
export default function SceneViewport({ kind, label, ...props }) {
  const host = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  const [limited] = useState(() => Boolean(navigator.connection?.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)));
  const reduced = useReducedMotion();
  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const resize = () => setCompact(query.matches);
    query.addEventListener("change", resize);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(host.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); query.removeEventListener("change", resize); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const fallback = <StaticCore />;
  return <div className={`scene-viewport scene-${kind}`} ref={host}>
    <div className="scene-art" role="img" aria-label={label}>
      {visible && !reduced && !limited ? <SceneBoundary fallback={fallback}><Suspense fallback={fallback}><SceneCanvas kind={kind} compact={compact} active={pageVisible && !paused} {...props} /></Suspense></SceneBoundary> : fallback}
    </div>
    {!reduced && !limited && <button className="scene-pause" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? "▶ Resume motion" : "Ⅱ Pause motion"}</button>}
    {(reduced || limited) && <span className="scene-mode">Static view · reduced motion</span>}
  </div>;
}
