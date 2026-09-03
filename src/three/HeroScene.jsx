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

function SkillLabel({ skill }) {
  return (
    <Html
      center
      transform
      distanceFactor={6}
      zIndexRange={[10, 0]}
    >
      <div className="skill-icon-wrapper">
        <div
          className="three-skill-icon"
          style={{
            color: skill.color,
            borderColor:
              `${skill.color}55`,
            boxShadow:
              `0 0 15px ${skill.color}30`,
          }}
        >
          {skill.icon}
        </div>

        <div
          className="skill-tooltip"
          style={{
            color: skill.color,
            borderColor:
              `${skill.color}55`,
          }}
        >
          {skill.name}
        </div>
      </div>
    </Html>
  );
}

/* ========================================
   ORBITING SKILLS
======================================== */

function OrbitingSkills() {
  const innerRefs = useRef([]);
  const outerRefs = useRef([]);

  const innerSkills = [
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "Angular", icon: <FaAngular />, color: "#DD0031" },
    { name: "Java", icon: <FaJava />, color: "#F89820" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "ASP.NET Core", icon: <SiDotnet />, color: "#512BD4" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
  ];

  const outerSkills = [
    { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
    { name: "AWS", icon: <FaAws />, color: "#FF9900" },
    { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
    { name: "GitHub", icon: <FaGithub />, color: "#FFFFFF" },
  ];

  // Bigger orbit
  const innerRadiusX = 4.0;
  const innerRadiusZ = 2.25;

  const outerRadiusX = 5.0;
  const outerRadiusZ = 2.8;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // INNER ORBIT
    innerSkills.forEach((skill, index) => {
      const item = innerRefs.current[index];

      if (!item) return;

      const offset =
        (index / innerSkills.length) *
        Math.PI *
        2;

      const angle =
        time * 0.18 + offset;

      const x =
        Math.cos(angle) *
        innerRadiusX;

      const z =
        Math.sin(angle) *
        innerRadiusZ;

      const y =
        Math.sin(angle * 2) *
        0.45;

      item.position.set(
        x,
        y,
        z
      );
    });

    // OUTER ORBIT
    outerSkills.forEach((skill, index) => {
      const item = outerRefs.current[index];

      if (!item) return;

      const offset =
        (index / outerSkills.length) *
        Math.PI *
        2;

      // Negative = opposite direction
      const angle =
        -time * 0.11 + offset;

      const x =
        Math.cos(angle) *
        outerRadiusX;

      const z =
        Math.sin(angle) *
        outerRadiusZ;

      const y =
        Math.cos(angle * 2) *
        0.6;

      item.position.set(
        x,
        y,
        z
      );
    });
  });

  return (
    <>
      {/* INNER SKILLS */}
      {innerSkills.map(
        (skill, index) => (
          <group
            key={skill.name}
            ref={(element) => {
              innerRefs.current[index] =
                element;
            }}
          >
            <SkillLabel
              skill={skill}
            />
          </group>
        )
      )}

      {/* OUTER SKILLS */}
      {outerSkills.map(
        (skill, index) => (
          <group
            key={skill.name}
            ref={(element) => {
              outerRefs.current[index] =
                element;
            }}
          >
            <SkillLabel
              skill={skill}
            />
          </group>
        )
      )}
    </>
  );
}
/* ========================================
   VISIBLE ORBIT RINGS
======================================== */

function OrbitRings() {
  const innerRing = useRef();
  const outerRing = useRef();

  useFrame((state, delta) => {
    if (innerRing.current) {
      innerRing.current.rotation.z +=
        delta * 0.025;
    }

    if (outerRing.current) {
      outerRing.current.rotation.z -=
        delta * 0.018;
    }
  });

  return (
    <group>

      {/* =========================
          INNER CYAN ORBIT
      ========================== */}

      {/* Main cyan line */}
      <mesh
        ref={innerRing}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        scale={[
          1,
          0.56,
          1,
        ]}
      >
        <torusGeometry
          args={[
            4.0,
            0.025,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Cyan glow */}
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        scale={[
          1,
          0.56,
          1,
        ]}
      >
        <torusGeometry
          args={[
            4.0,
            0.08,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>


      {/* =========================
          OUTER PURPLE ORBIT
      ========================== */}

      {/* Main purple line */}
      <mesh
        ref={outerRing}
        rotation={[
          Math.PI / 2.05,
          0.05,
          0.08,
        ]}
        scale={[
          1,
          0.56,
          1,
        ]}
      >
        <torusGeometry
          args={[
            5.0,
            0.025,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Purple glow */}
      <mesh
        rotation={[
          Math.PI / 2.05,
          0.05,
          0.08,
        ]}
        scale={[
          1,
          0.56,
          1,
        ]}
      >
        <torusGeometry
          args={[
            5.0,
            0.09,
            16,
            200,
          ]}
        />

        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>


      {/* =========================
          SMALL ACCENT ORBIT
      ========================== */}

      <mesh
        rotation={[
          Math.PI / 2.25,
          0.2,
          -0.18,
        ]}
        scale={[
          1,
          0.62,
          1,
        ]}
      >
        <torusGeometry
          args={[
            4.55,
            0.012,
            12,
            180,
          ]}
        />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.35}
        />
      </mesh>

    </group>
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