import { RoundedBox } from "@react-three/drei";

// Small, locally modelled objects keep the scene recognisable without model downloads.
export function CloudObject({ color = "#c2dfeb", ...props }) {
  return <group {...props}>
    {[[-0.48, 0, 0, 0.37], [0, 0.18, 0, 0.52], [0.48, 0, 0, 0.34]].map(([x, y, z, r]) =>
      <mesh key={x} position={[x, y, z]}><sphereGeometry args={[r, 24, 16]} /><meshStandardMaterial color={color} roughness={0.5} metalness={0.05} /></mesh>
    )}
    <RoundedBox args={[1.1, 0.42, 0.6]} radius={0.19} smoothness={3} position={[0, -0.12, 0]}><meshStandardMaterial color={color} roughness={0.5} /></RoundedBox>
  </group>;
}

export function LaptopObject(props) {
  return <group {...props}>
    <RoundedBox args={[2.55, 1.7, 0.13]} radius={0.09} smoothness={3} position={[0, 0.25, 0]}>
      <meshStandardMaterial color="#8ba8bc" metalness={0.65} roughness={0.32} />
    </RoundedBox>
    <RoundedBox args={[2.34, 1.46, 0.025]} radius={0.055} smoothness={3} position={[0, 0.25, 0.08]}>
      <meshStandardMaterial color="#0d2031" emissive="#0b263b" emissiveIntensity={0.6} roughness={0.35} />
    </RoundedBox>
    {[0, 1, 2].map(i => <mesh key={i} position={[-0.98 + i * 0.12, 0.83, 0.106]}><circleGeometry args={[0.027, 12]} /><meshBasicMaterial color={["#ecab9a", "#e1c38e", "#8fd2b9"][i]} /></mesh>)}
    {[0.8, 1.15, 0.62, 1.32, 0.92, 0.58].map((width, i) => <mesh key={i} position={[-0.88 + width / 2 + (i % 3 === 1 ? 0.15 : 0), 0.55 - i * 0.18, 0.107]}>
      <planeGeometry args={[width, 0.045]} /><meshBasicMaterial color={["#88cbe2", "#b8a3df", "#9cd4c5"][i % 3]} />
    </mesh>)}
    <RoundedBox args={[2.7, 0.12, 1.35]} radius={0.055} smoothness={3} position={[0, -0.65, 0.58]}>
      <meshStandardMaterial color="#9eb5c5" metalness={0.7} roughness={0.3} />
    </RoundedBox>
    <mesh position={[0, -0.581, 0.4]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.13, 0.5]} /><meshStandardMaterial color="#243e51" roughness={0.7} /></mesh>
    {[0, 1, 2].map(row => Array.from({ length: 9 }, (_, col) => <mesh key={`${row}-${col}`} position={[-0.9 + col * 0.225, -0.577, 0.23 + row * 0.16]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.16, 0.09]} /><meshStandardMaterial color="#8aabbe" roughness={0.8} /></mesh>))}
    <mesh position={[0, -0.578, 0.91]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.65, 0.28]} /><meshStandardMaterial color="#708fa4" metalness={0.5} roughness={0.4} /></mesh>
  </group>;
}

export function ServerObject({ color = "#91b3cb", ...props }) {
  return <group {...props}>
    <RoundedBox args={[0.7, 0.82, 0.48]} radius={0.06} smoothness={2}><meshStandardMaterial color={color} metalness={0.35} roughness={0.4} /></RoundedBox>
    {[-0.24, 0, 0.24].map(y => <group key={y} position={[0, y, 0.25]}><mesh><boxGeometry args={[0.53, 0.13, 0.02]} /><meshStandardMaterial color="#223b50" /></mesh><mesh position={[0.19, 0, 0.02]}><sphereGeometry args={[0.025, 8, 8]} /><meshBasicMaterial color="#a5f2cd" /></mesh></group>)}
  </group>;
}
