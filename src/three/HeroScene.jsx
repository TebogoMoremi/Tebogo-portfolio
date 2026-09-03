import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, Float } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaAngular,
  FaJava,
  FaDocker,
  FaAws,
  FaGithub,
} from "react-icons/fa";

import {
  SiJavascript,
  SiKubernetes,
  SiPostgresql,
  SiDotnet,
} from "react-icons/si";
/* ========================================
   MOBILE CHECK
======================================== */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return isMobile;
}

/* ========================================
   MOVING STARS
======================================== */

function MovingStars({ isMobile }) {
  const stars = useRef();

  useFrame((state, delta) => {
    if (!stars.current) return;

    stars.current.rotation.y +=
      delta * 0.01;
  });

  return (
    <group ref={stars}>
      <Stars
        radius={80}
        depth={50}
        count={isMobile ? 900 : 3000}
        factor={4}
        saturation={0}
        fade
        speed={isMobile ? 0.5 : 1.5}
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

    core.current.rotation.x +=
      delta * 0.15;

    core.current.rotation.y +=
      delta * 0.25;

    core.current.position.y =
      Math.sin(
        state.clock.elapsedTime * 0.8
      ) * 0.08;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.6}
    >
      <mesh ref={core}>
        <icosahedronGeometry
          args={[2, 2]}
        />

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
   SKILL LABEL
======================================== */

function SkillLabel({
  position,
  skill,
}) {
  return (
    <group position={position}>
      <Html
        center
        transform
        distanceFactor={6}
        zIndexRange={[10, 0]}
      >
        <div className="skill-icon-wrapper">

          <div className="three-skill-icon">
            {skill.icon}
          </div>

          <div className="skill-tooltip">
            {skill.name}
          </div>

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
    {
      name: "React",
      icon: <FaReact />,
    },
    {
      name: "Angular",
      icon: <FaAngular />,
    },
    {
      name: "Java",
      icon: <FaJava />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
    },
    {
      name: "Docker",
      icon: <FaDocker />,
    },
    {
      name: "AWS",
      icon: <FaAws />,
    },
    {
      name: "Kubernetes",
      icon: <SiKubernetes />,
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
    },
    {
      name: "ASP.NET Core",
      icon: <SiDotnet />,
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql />,
    },
  ];

  const radiusX = 3.7;
  const radiusZ = 2.1;

  useFrame((state, delta) => {
    if (!orbit.current) return;

    orbit.current.rotation.y +=
      delta * 0.08;
  });

  return (
    <group ref={orbit}>
      {skills.map((skill, index) => {
        const angle =
          (index / skills.length) *
          Math.PI *
          2;

        const x =
          Math.cos(angle) *
          radiusX;

        const z =
          Math.sin(angle) *
          radiusZ;

        const y =
          Math.sin(angle * 2) *
          0.45;

        return (
          <SkillLabel
            key={skill.name}
            position={[x, y, z]}
            skill={skill}
          />
        );
      })}
    </group>
  );
}

/* ========================================
   VISIBLE ORBIT RINGS
======================================== */

function OrbitRings() {
  const orbit1 = useRef();
  const orbit2 = useRef();

  useFrame((state, delta) => {
    if (orbit1.current) {
      orbit1.current.rotation.z +=
        delta * 0.03;
    }

    if (orbit2.current) {
      orbit2.current.rotation.z -=
        delta * 0.02;
    }
  });

  return (
    <>
      {/* Main cyan orbit */}

      <mesh
        ref={orbit1}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        scale={[1, 0.58, 1]}
      >
        <torusGeometry
          args={[
            3.2,
            0.018,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Cyan glow */}

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        scale={[1, 0.58, 1]}
      >
        <torusGeometry
          args={[
            3.2,
            0.055,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Purple orbit */}

      <mesh
        ref={orbit2}
        rotation={[
          Math.PI / 2.08,
          0.1,
          0.15,
        ]}
        scale={[
          1,
          0.62,
          1,
        ]}
      >
        <torusGeometry
          args={[
            3.4,
            0.012,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.55}
        />
      </mesh>
    </>
  );
}

/* ========================================
   ORBIT PARTICLES
======================================== */

function OrbitParticles() {
  const particles = useRef();

  const particleCount = 45;

  const positions =
    new Float32Array(
      particleCount * 3
    );

  for (
    let i = 0;
    i < particleCount;
    i++
  ) {
    const angle =
      (i /
        particleCount) *
      Math.PI *
      2;

    const radiusX = 3.2;
    const radiusZ = 1.8;

    positions[i * 3] =
      Math.cos(angle) *
      radiusX;

    positions[
      i * 3 + 1
    ] =
      Math.sin(
        angle * 2
      ) * 0.08;

    positions[
      i * 3 + 2
    ] =
      Math.sin(angle) *
      radiusZ;
  }

  useFrame((state, delta) => {
    if (!particles.current) {
      return;
    }

    particles.current.rotation.y +=
      delta * 0.08;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            positions,
            3,
          ]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#67e8f9"
        size={0.055}
        transparent
        opacity={1}
        sizeAttenuation
      />
    </points>
  );
}

/* ========================================
   CAMERA MOVEMENT
======================================== */

function CameraMovement() {
  useFrame((state) => {
    const targetX =
      state.pointer.x *
      0.3;

    const targetY =
      state.pointer.y *
      0.2;

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
  const isMobile =
    useIsMobile();

  return (
    <Canvas
      camera={{
        position: [
          0,
          0.3,
          isMobile
            ? 11
            : 10.5,
        ],

        fov:
          isMobile
            ? 58
            : 52,
      }}
      dpr={
        isMobile
          ? 1
          : [1, 1.5]
      }
      gl={{
        antialias:
          !isMobile,

        powerPreference:
          "high-performance",
      }}
    >
      <ambientLight
        intensity={
          isMobile
            ? 1
            : 1.5
        }
      />

      {!isMobile && (
        <>
          <pointLight
            position={[
              5,
              5,
              5,
            ]}
            intensity={25}
            color="#8b5cf6"
          />

          <pointLight
            position={[
              -5,
              -3,
              4,
            ]}
            intensity={20}
            color="#22d3ee"
          />
        </>
      )}

      <MovingStars
        isMobile={
          isMobile
        }
      />

      <OrbitRings />

      <OrbitParticles />

      <WireframeCore />

      <OrbitingSkills />

      {!isMobile && (
        <CameraMovement />
      )}
    </Canvas>
  );
}