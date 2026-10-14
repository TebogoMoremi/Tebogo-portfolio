import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FaReact, FaAngular, FaJava, FaDocker, FaAws, FaCode, FaDatabase, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiKubernetes, SiDotnet, SiTypescript, SiJavascript, SiPostgresql } from "react-icons/si";
import { CloudObject, LaptopObject } from "./Objects";

const heroNodes = ["React", "Java", "AWS", "Docker", "C#", "SQL", "Angular", "Kubernetes", "CI/CD"];
const identities = {
  React: [FaReact, "#78d9ed"], Angular: [FaAngular, "#ee839b"], Java: [FaJava, "#e9ba86"],
  Docker: [FaDocker, "#7fbdf3"], AWS: [FaAws, "#efc487"], "C#": [SiDotnet, "#b8a1ec"],
  "ASP.NET Core": [SiDotnet, "#b8a1ec"], SQL: [FaDatabase, "#9abde0"], MSSQL: [FaDatabase, "#9abde0"],
  PostgreSQL: [SiPostgresql, "#9abde0"], Kubernetes: [SiKubernetes, "#91aaf4"],
  "CI/CD": [FaGithub, "#c1d3e4"], GitHub: [FaGithub, "#c1d3e4"], "GitHub Actions": [FaGithub, "#c1d3e4"],
  "Node.js": [FaNodeJs, "#add6a1"], TypeScript: [SiTypescript, "#92bff0"], JavaScript: [SiJavascript, "#e5d68c"],
};

function TechnologyNode({ name, index, count, active, selected, onSelect }) {
  const node = useRef();
  const time = useRef(0);
  const angle = index / count * Math.PI * 2;
  const [Icon, color] = identities[name] || [FaCode, "#a6c7d9"];
  useFrame((_, delta) => {
    if (!active) return;
    time.current += Math.min(delta, 0.05);
    const orbit = angle + time.current * 0.018;
    node.current.position.set(Math.cos(orbit) * 2.95, Math.sin(orbit) * 2.12, Math.sin(orbit) * 0.25);
  });
  const content = <><Icon /><span>{name}</span></>;
  return <group ref={node} position={[Math.cos(angle) * 2.95, Math.sin(angle) * 2.12, Math.sin(angle) * 0.25]}>
    <Html center zIndexRange={[20, 0]}>
      {onSelect ? <button tabIndex={-1} aria-hidden="true" style={{ "--tech-color": color }} className={`technology-object ${selected ? "selected" : ""}`} onClick={() => onSelect(name)}>{content}</button> : <div style={{ "--tech-color": color }} className="technology-object">{content}</div>}
    </Html>
  </group>;
}

export default function HeroScene({ compact, active, nodes = heroNodes, selected, onSelect, kind }) {
  const centerpiece = useRef();
  const elapsed = useRef(0);
  const positions = useMemo(() => Float32Array.from({ length: (compact ? 12 : 28) * 3 }, (_, i) => Math.sin(i * 127.1 + 3.7) * (i % 3 === 2 ? 2 : 4.8)), [compact]);
  useFrame((_, delta) => {
    if (!active) return;
    elapsed.current += Math.min(delta, 0.05);
    centerpiece.current.position.y = Math.sin(elapsed.current * 0.65) * 0.07;
    centerpiece.current.rotation.y = -0.22 + Math.sin(elapsed.current * 0.25) * 0.12;
  });
  const displayed = compact && kind === "hero" ? nodes.slice(0, 5) : nodes;
  return <group scale={compact ? 0.88 : 1}>
    <group ref={centerpiece} rotation={[0.12, -0.22, 0]}>
      <LaptopObject position={[-0.12, -0.1, 0.2]} />
      <CloudObject position={[0.88, 1.23, -0.55]} scale={0.7} />
    </group>
    {[0, 1].map(i => <mesh key={i} rotation={[0, 0, i ? -0.27 : 0.27]} scale={[1, 0.72, 1]}>
      <torusGeometry args={[2.95 + i * 0.16, 0.009, 6, 100]} /><meshBasicMaterial color={i ? "#a698ce" : "#74bdcf"} transparent opacity={i ? 0.22 : 0.35} />
    </mesh>)}
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#bed7e5" size={0.018} transparent opacity={0.4} /></points>
    {displayed.map((name, index) => <TechnologyNode key={name} name={name} index={index} count={displayed.length} active={active} selected={selected === name} onSelect={onSelect} />)}
  </group>;
}
