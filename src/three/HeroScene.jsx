import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";

function TechObject() {
  const object = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    object.current.rotation.x = time * 0.15;
    object.current.rotation.y = time * 0.25;
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={object}>
        <icosahedronGeometry args={[1.8, 1]} />

        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.6}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={1.5} />

      <pointLight position={[5, 5, 5]} intensity={40} />

      <pointLight
        position={[-5, -5, 2]}
        intensity={25}
        color="#06b6d4"
      />

      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
      />

      <TechObject />
    </Canvas>
  );
};

export default HeroScene;