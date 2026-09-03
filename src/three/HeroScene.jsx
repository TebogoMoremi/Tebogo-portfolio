import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, Float } from "@react-three/drei";
import { useRef } from "react";

/* ========================================
   MOVING BACKGROUND STARS
======================================== */

function MovingStars() {
  const stars = useRef();

  useFrame((state, delta) => {
    if (!stars.current) return;

    stars.current.rotation.y += delta * 0.015;
    stars.current.rotation.x += delta * 0.003;
  });

  return (
    <group ref={stars}>
      <Stars
        radius={100}
        depth={60}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
    </group>
  );
}

/* ========================================
   CENTRAL WIREFRAME
======================================== */

function WireframeCore() {
  const core = useRef();

  useFrame((state, delta) => {
    if (!core.current) return;

    core.current.rotation.x += delta * 0.15;
    core.current.rotation.y += delta * 0.25;

    core.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.6}
    >
      <mesh ref={core}>
        <icosahedronGeometry args={[1.5, 2]} />

        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          metalness={0.9}
          roughness={0.1}
          emissive="#6d28d9"
          emissiveIntensity={1.8}
        />
      </mesh>
    </Float>
  );
}

/* ========================================
   INDIVIDUAL SKILL
======================================== */

function SkillLabel({ position, children }) {
  return (
    <group position={position}>
      <Html
        center
        transform
        distanceFactor={6}
      >
        <div className="three-skill-label">
          <span className="skill-dot" />

          <span>{children}</span>
        </div>
      </Html>
    </group>
  );
}

/* ========================================
   ORBITING SKILLS
======================================== */

function OrbitingSkills() {
  const orbit = useRef();

  const skills = [
    "React",
    "Angular",
    "C#",
    "Java",
    "JavaScript",
    "Docker",
    "AWS",
    "Kubernetes",
    "Talend",
    "SoapUI",
    "SQL",
    "ASP.NET Core",
    "Git / GitHub",
    "CI / CD",
  ];

  // Smaller orbit so everything stays visible
  const radiusX = 3.2;
  const radiusZ = 1.8;

  useFrame((state, delta) => {
    if (!orbit.current) return;

    // Smooth and slow rotation
    orbit.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={orbit}>
      {skills.map((skill, index) => {
        const angle =
          (index / skills.length) *
          Math.PI *
          2;

        /*
         * Elliptical orbit
         *
         * X = horizontal position
         * Z = depth
         *
         * We deliberately keep Z smaller
         * so labels don't disappear too
         * far behind the wireframe.
         */

        const x =
          Math.cos(angle) * radiusX;

        const z =
          Math.sin(angle) * radiusZ;

        // Small vertical wave
        const y =
          Math.sin(angle * 2) * 0.45;

        return (
          <SkillLabel
            key={skill}
            position={[x, y, z]}
          >
            {skill}
          </SkillLabel>
        );
      })}
    </group>
  );
}

/* ========================================
   ORBIT RING
======================================== */

function OrbitRing() {
  const ring = useRef();

  useFrame((state, delta) => {
    if (!ring.current) return;

    ring.current.rotation.z += delta * 0.02;
  });

  return (
    <mesh
      ref={ring}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[1, 0.56, 1]}
    >
      <torusGeometry
        args={[
          3.2,
          0.006,
          16,
          150,
        ]}
      />

      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

/* ========================================
   SECOND ORBIT RING
======================================== */

function SecondOrbitRing() {
  return (
    <mesh
      rotation={[
        Math.PI / 2.15,
        0.15,
        0.2,
      ]}
    >
      <torusGeometry
        args={[
          4.4,
          0.005,
          16,
          150,
        ]}
      />

      <meshBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

/* ========================================
   CAMERA MOVEMENT
======================================== */

function CameraMovement() {
  useFrame((state) => {
    const targetX =
      state.pointer.x * 0.3;

    const targetY =
      state.pointer.y * 0.2;

    state.camera.position.x +=
      (targetX -
        state.camera.position.x) *
      0.02;

    state.camera.position.y +=
      (targetY -
        state.camera.position.y) *
      0.02;

    state.camera.lookAt(
      0,
      0,
      0
    );
  });

  return null;
}

/* ========================================
   MAIN SCENE
======================================== */

export default function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 1, 9],
        fov: 50,
      }}
      dpr={[1, 2]}
    >
      <ambientLight
        intensity={1.5}
      />

      <pointLight
        position={[5, 5, 5]}
        intensity={40}
        color="#8b5cf6"
      />

      <pointLight
        position={[-5, -3, 4]}
        intensity={30}
        color="#22d3ee"
      />

      {/* Background */}
      <MovingStars />

      {/* Orbit paths */}
      <OrbitRing />
      <SecondOrbitRing />

      {/* Central object */}
      <WireframeCore />

      {/* Circulating technologies */}
      <OrbitingSkills />

      {/* Mouse movement */}
      <CameraMovement />
    </Canvas>
  );
}