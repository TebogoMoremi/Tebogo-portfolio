import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const moods = {
  about: { color: "#a78bfa", opacity: 0.28 },
  experience: { color: "#77b8f4", opacity: 0.25, network: true },
  skills: { color: "#22d3ee", opacity: 0.24 },
  projects: { color: "#67c9e8", opacity: 0.2, grid: true },
  devops: { color: "#78d8de", opacity: 0.22, network: true },
  contact: { color: "#9ebaf1", opacity: 0.15 },
};

export default function AmbientScene({ section, compact, active }) {
  const group = useRef();
  const mood = moods[section] || moods.about;
  const positions = useMemo(() => {
    const count = compact ? 24 : 72;
    let seed = 42;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < values.length; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      values[i] = (seed / 4294967296 - 0.5) * (i % 3 === 2 ? 3 : 24);
    }
    return values;
  }, [compact]);
  const connections = useMemo(() => {
    const edges = [];
    // Fixed adjacent candidates, not an all-to-all distance search.
    for (let i = 0; i < positions.length - 3; i += 3) {
      if (Math.hypot(positions[i] - positions[i + 3], positions[i + 1] - positions[i + 4]) < 6) {
        edges.push(...positions.slice(i, i + 3), ...positions.slice(i + 3, i + 6));
      }
    }
    return new Float32Array(edges);
  }, [positions]);
  useFrame((_, delta) => {
    if (!active) return;
    group.current.rotation.z += Math.min(delta, 0.05) * 0.006;
  });
  return <group position={[0, 0, -3]}>
    <group ref={group}>
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={mood.color} size={compact ? 0.045 : 0.035} transparent opacity={mood.opacity} depthWrite={false} /></points>
      {mood.network && <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[connections, 3]} /></bufferGeometry><lineBasicMaterial color={mood.color} transparent opacity={0.1} depthWrite={false} /></lineSegments>}
      {section === "about" && [0, 1].map(i => <mesh key={i} position={[i ? 5 : -6, i ? 1 : -2, -1]} rotation={[0.4, 0.6, i]}><torusGeometry args={[1.5 + i, 0.012, 4, 64]} /><meshBasicMaterial color={mood.color} transparent opacity={0.13} /></mesh>)}
    </group>
    {mood.grid && <gridHelper args={[30, compact ? 12 : 24, "#255677", "#1c344f"]} rotation={[Math.PI / 2.4, 0, 0]} position={[0, -2, -2]} material-transparent material-opacity={0.16} material-depthWrite={false} />}
  </group>;
}
