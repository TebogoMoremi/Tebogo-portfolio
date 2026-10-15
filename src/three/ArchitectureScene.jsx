import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { services, connections } from "../data/architecture";
import { CloudObject, LaptopObject, ServerObject } from "./Objects";

function ServiceObject({ id, highlighted }) {
  const color = highlighted ? "#b3e7ef" : "#91b3cb";
  if (id === "user") return <LaptopObject scale={0.32} />;
  if (id === "cdn" || id === "gemini") return <CloudObject scale={0.52} color={color} />;
  if (id === "s3" || id === "local") return <group>{[-0.22, 0, 0.22].map(y => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.34, 0.34, 0.18, 24]} /><meshStandardMaterial color={color} metalness={0.3} roughness={0.4} /></mesh>)}</group>;
  if (id === "sns") return <group><mesh><boxGeometry args={[0.75, 0.46, 0.08]} /><meshStandardMaterial color="#dbcfb9" roughness={0.6} /></mesh><Line points={[[-0.35, 0.2, 0.05], [0, -0.04, 0.05], [0.35, 0.2, 0.05]]} color="#766c65" lineWidth={1} /></group>;
  return <ServerObject color={color} scale={0.85} />;
}

function Service({ service, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const highlighted = hovered || selected === service.id;
  return <group position={service.position}>
    <group rotation={[0.12, -0.2, 0]} onPointerOver={event => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)} onClick={() => onSelect(service.id)} scale={highlighted ? 1.08 : 1}>
      <ServiceObject id={service.id} highlighted={highlighted} />
    </group>
    <Html center position={[0, -0.57, 0.2]} zIndexRange={[20, 0]}><button tabIndex={-1} aria-hidden="true" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onSelect(service.id)} className={`orbit-label ${highlighted ? "selected" : ""}`}>{service.name}</button></Html>
  </group>;
}
function Connection({ from, to, index, active }) {
  const packet = useRef();
  const progress = useRef(index / connections.length);
  const start = services.find(item => item.id === from).position;
  const end = services.find(item => item.id === to).position;
  useFrame((_, delta) => {
    if (!active) return;
    progress.current = (progress.current + Math.min(delta, 0.05) * 0.18) % 1;
    packet.current.position.set(...start.map((value, axis) => value + (end[axis] - value) * progress.current));
  });
  return <><Line points={[start, end]} color={to === "watch" || to === "sns" ? "#7866ad" : "#287f9e"} lineWidth={1} /><mesh ref={packet} position={start}><sphereGeometry args={[0.045, 8, 8]} /><meshBasicMaterial color="#9aecff" /></mesh></>;
}
export default function ArchitectureScene({ selected, onSelect, active }) {
  return <group>{connections.map(([from, to], index) => <Connection key={`${from}-${to}`} from={from} to={to} index={index} active={active} />)}{services.map(service => <Service key={service.id} service={service} selected={selected} onSelect={onSelect} />)}</group>;
}
