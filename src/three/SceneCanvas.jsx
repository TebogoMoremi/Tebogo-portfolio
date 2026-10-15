import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import HeroScene from "./HeroScene";
import ArchitectureScene from "./ArchitectureScene";
import HeroComposition from "./HeroComposition";

function CameraRig({ compact }) {
  useFrame(({ camera, pointer }, delta) => {
    const damping = 1 - Math.exp(-delta * 2);
    camera.position.x += ((compact ? 0 : pointer.x * 0.32) - camera.position.x) * damping;
    camera.position.y += ((compact ? 0 : pointer.y * 0.2) - camera.position.y) * damping;
    camera.lookAt(0, 0, 0);
  });
  return null;
}
function ContextGuard({ canvas, onLost }) {
  useEffect(() => {
    if (!canvas) return;
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas, onLost]);
  return null;
}
export default function SceneCanvas({ kind, compact, active, ...props }) {
  const [canvas, setCanvas] = useState(null);
  const [lost, setLost] = useState(false);
  if (lost) throw new Error("WebGL context unavailable");
  return <>
    <ContextGuard canvas={canvas} onLost={() => setLost(true)} />
    <Canvas camera={{ position: [0, 0, kind === "architecture" ? 13.5 : 10.5], fov: compact ? 52 : 44 }}
      dpr={compact ? 1 : [1, 1.5]} frameloop={active ? "always" : "demand"}
      gl={{ antialias: !compact, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => setCanvas(gl.domElement)}>
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#e6f4ff", "#30425c", 1.8]} />
      <directionalLight position={[-3, 5, 5]} intensity={3} color="#fff1df" />
      <directionalLight position={[4, 1, 3]} intensity={1.6} color="#a8dcf4" />
      {kind === "architecture" ? <ArchitectureScene {...props} active={active} /> : kind === "hero" ? <HeroComposition {...props} compact={compact} active={active} /> : <HeroScene {...props} compact={compact} active={active} kind={kind} />}
      {active && kind !== "hero" && <CameraRig compact={compact} />}
    </Canvas>
  </>;
}
