import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { services, connections } from "../data/architecture";

function Service({ service, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const highlighted = hovered || selected === service.id;
  return <group position={service.position}>
    <mesh rotation={[0.35, 0.25, 0]} onPointerOver={event => { event.stopPropagation(); setHovered(true); }} onPointerOut={() => setHovered(false)} onClick={() => onSelect(service.id)} scale={highlighted ? 1.12 : 1}>
      <boxGeometry args={[0.75, 0.5, 0.5]} /><meshStandardMaterial color={highlighted ? "#4dcdeb" : "#183d56"} emissive="#0b6378" emissiveIntensity={highlighted ? 0.6 : 0.1} metalness={0.65} roughness={0.28} />
    </mesh>
    <Html center position={[0, -0.48, 0.2]} zIndexRange={[20, 0]}><button tabIndex={-1} aria-hidden="true" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onSelect(service.id)} className={`orbit-label ${highlighted ? "selected" : ""}`}>{service.name}</button></Html>
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
