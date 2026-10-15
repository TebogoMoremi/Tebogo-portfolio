import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const moods = {
  about: { color: "#bca0ff", opacity: 0.65 },
  experience: { color: "#86c5ff", opacity: 0.6, network: true },
  skills: { color: "#52e2f4", opacity: 0.62 },
  projects: { color: "#82d9f8", opacity: 0.55, grid: true },
  devops: { color: "#67dfed", opacity: 0.6, network: true },
  contact: { color: "#a6bbef", opacity: 0.4 },
};

function FloatingForm({ index, width, height, color, active, network }) {
  const object = useRef();
  const time = useRef(index * 2.3);
  const side = index % 2 ? 1 : -1;
  useFrame((_, delta) => {
    if (!active || !object.current) return;
    time.current += Math.min(delta, 0.05);
    const t = time.current;
    object.current.position.set(side * width * 0.39 + Math.sin(t * 0.3) * 0.35, (index / 3 - 0.5) * height * 0.8 + Math.cos(t * 0.4) * 0.35, -1 + Math.sin(t * 0.2) * 0.6);
    object.current.rotation.set(t * 0.13, t * 0.19, t * 0.08);
  });
  return <mesh ref={object} position={[side * width * 0.39, (index / 3 - 0.5) * height * 0.8, -1]}>
    {network ? <icosahedronGeometry args={[0.55, 0]} /> : <torusGeometry args={[0.65 + index * 0.13, 0.018, 6, 48]} />}
    <meshBasicMaterial color={color} wireframe={network} transparent opacity={0.36} depthWrite={false} />
  </mesh>;
}

export default function AmbientScene({ section, compact, active }) {
  const group = useRef();
  const grid = useRef();
  const elapsed = useRef(0);
  const { viewport } = useThree();
  const width = viewport.width * 1.3;
  const height = viewport.height * 1.3;
  const mood = moods[section] || moods.about;
  const positions = useMemo(() => {
    const count = compact ? 40 : 110;
    let seed = 42;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < values.length; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      values[i] = (seed / 4294967296 - 0.5) * (i % 3 === 2 ? 5 : i % 3 === 0 ? width * 1.25 : height * 1.25);
    }
    return values;
  }, [compact, width, height]);
  const connections = useMemo(() => {
    const edges = [];
    // At most three neighbors per point keeps connection work linear.
    for (let i = 0; i < positions.length; i += 3) {
      for (let j = i + 3; j < Math.min(i + 12, positions.length); j += 3) {
        if (Math.hypot(positions[i] - positions[j], positions[i + 1] - positions[j + 1]) < 3) {
          edges.push(...positions.slice(i, i + 3), ...positions.slice(j, j + 3));
        }
      }
    }
    return new Float32Array(edges);
  }, [positions]);
  useFrame((_, delta) => {
    if (!active) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    group.current.rotation.set(Math.sin(t * 0.12) * 0.13, Math.sin(t * 0.09) * 0.18, t * 0.025);
    group.current.position.y = Math.sin(t * 0.25) * 0.3;
    if (grid.current) grid.current.position.y = -height * 0.25 + Math.sin(t * 0.3) * 0.2;
  });
  return <group position={[0, 0, -3]}>
    <group ref={group}>
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={mood.color} size={compact ? 0.065 : 0.055} transparent opacity={mood.opacity} depthWrite={false} /></points>
      {mood.network && <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[connections, 3]} /></bufferGeometry><lineBasicMaterial color={mood.color} transparent opacity={0.24} depthWrite={false} /></lineSegments>}
    </group>
    {section !== "contact" && Array.from({ length: compact ? 2 : 4 }, (_, index) => <FloatingForm key={index} index={index} width={width} height={height} color={mood.color} active={active} network={mood.network || mood.grid} />)}
    {mood.grid && <gridHelper ref={grid} args={[Math.max(width, height) * 2, compact ? 16 : 28, "#479cc8", "#285d80"]} rotation={[Math.PI / 2.4, 0, 0]} position={[0, -height * 0.25, -2]} material-transparent material-opacity={0.3} material-depthWrite={false} />}
  </group>;
}
