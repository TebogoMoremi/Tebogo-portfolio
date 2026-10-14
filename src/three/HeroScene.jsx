import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const heroNodes = ["React", "Java", "AWS", "Docker", "C#", "SQL", "Angular", "Kubernetes", "CI/CD"];
function TechnologyNode({ name, index, count, active, selected, onSelect }) {
  const node = useRef();
  const time = useRef(0);
  const angle = index / count * Math.PI * 2;
  const position = [Math.cos(angle) * 2.8, Math.sin(angle) * 2.15, Math.sin(angle * 2) * 0.6];
  useFrame((_, delta) => {
    if (!active) return;
    time.current += Math.min(delta, 0.05);
    const orbit = angle + time.current * 0.025;
    node.current.position.set(Math.cos(orbit) * 2.8, Math.sin(orbit) * 2.15, Math.sin(orbit * 2) * 0.6);
  });
  return <group ref={node} position={position}>
    <mesh><sphereGeometry args={[0.055, 10, 10]} /><meshBasicMaterial color={selected ? "#b6a9ff" : "#6de3ff"} /></mesh>
    <Html center zIndexRange={[20, 0]} position={[0, 0.18, 0]}>
      {onSelect ? <button tabIndex={-1} aria-hidden="true" className={`orbit-label ${selected ? "selected" : ""}`} onClick={() => onSelect(name)}>{name}</button> : <span className="orbit-label">{name}</span>}
    </Html>
  </group>;
}
export default function HeroScene({ compact, active, nodes = heroNodes, selected, onSelect, kind }) {
  const core = useRef();
  const ring = useRef();
  const particles = useRef();
  const positions = useMemo(() => {
    const count = compact ? 35 : 100;
    return Float32Array.from({ length: count * 3 }, (_, i) => Math.sin(i * 127.1 + 3.7) * (i % 3 === 2 ? 2 : 4.8));
  }, [compact]);
  useFrame((_, delta) => {
    if (!active) return;
    const step = Math.min(delta, 0.05);
    core.current.rotation.y += step * 0.12;
    core.current.rotation.x += step * 0.035;
    ring.current.rotation.z += step * 0.025;
    particles.current.rotation.z -= step * 0.009;
  });
  const displayed = compact && kind === "hero" ? nodes.slice(0, 5) : nodes;
  return <group scale={compact ? 0.88 : 1}>
    <group ref={core} rotation={[0.25, 0.35, 0]}>
      <mesh><icosahedronGeometry args={[1.24, 0]} /><meshStandardMaterial color="#24718d" emissive="#0c4260" emissiveIntensity={0.3} metalness={0.65} roughness={0.25} transparent opacity={0.78} flatShading /></mesh>
      <mesh scale={1.008}><icosahedronGeometry args={[1.24, 0]} /><meshBasicMaterial wireframe color="#74ddff" transparent opacity={0.75} /></mesh>
      <mesh scale={0.7}><octahedronGeometry /><meshStandardMaterial color="#76eaff" emissive="#158aaa" emissiveIntensity={1.5} /></mesh>
      <mesh scale={1.35}><icosahedronGeometry args={[1.24, 1]} /><meshBasicMaterial wireframe color="#388fb7" transparent opacity={0.12} /></mesh>
    </group>
    <group ref={ring} rotation={[0.55, -0.28, -0.2]}>
      {[2.1, 2.65, ...(compact ? [] : [3.15])].map((radius, i) => <mesh key={radius} rotation={[i * 0.45, i * 0.3, 0]}><torusGeometry args={[radius, 0.009, 6, 100]} /><meshBasicMaterial color={i === 1 ? "#8875db" : "#5cd5fa"} transparent opacity={0.5} /></mesh>)}
    </group>
    <points ref={particles}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#8fdcff" size={0.018} transparent opacity={0.65} /></points>
    {displayed.map((name, index) => <TechnologyNode key={name} name={name} index={index} count={displayed.length} active={active} selected={selected === name} onSelect={onSelect} />)}
  </group>;
}
