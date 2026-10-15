import { stepStars } from "./starfieldMotion";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, Vector2 } from "three";

const vertexShader = `
  attribute float starSize;
  attribute float brightness;
  varying vec3 tint;
  varying float alpha;
  uniform float pixelRatio;
  void main() {
    tint = color;
    alpha = brightness;
    gl_Position = vec4(position.xy, 0.999, 1.0);
    gl_PointSize = starSize * pixelRatio;
  }
`;
const fragmentShader = `
  varying vec3 tint;
  varying float alpha;
  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5) * 2.0;
    float core = 1.0 - smoothstep(0.08, 0.45, distanceToCenter);
    float halo = pow(max(0.0, 1.0 - distanceToCenter), 3.0) * 0.35;
    gl_FragColor = vec4(tint, (core + halo) * alpha);
  }
`;

// One draw call, three depth populations; all frame data is reused in typed arrays.
export default function Starfield({ compact, active, pointerRef }) {
  const { size, viewport } = useThree();
  const geometry = useRef();
  const time = useRef(0);
  const cursor = useRef(new Vector2());
  const data = useMemo(() => {
    let seed = 6271;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const count = compact ? 130 : 480;
    const base = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightness = new Float32Array(count);
    const resting = new Float32Array(count);
    const heat = new Float32Array(count);
    const palette = ["#F8FAFC", "#BAE6FD", "#67E8F9", "#C4B5FD"].map(value => new Color(value));
    for (let i = 0; i < count; i++) {
      const layer = i < count * 0.7 ? 0 : i < count * 0.95 ? 1 : 2;
      base.set([random() * 2 - 1, random() * 2 - 1, layer], i * 3);
      positions.set([base[i * 3], base[i * 3 + 1], 0], i * 3);
      palette[Math.floor(random() * palette.length)].toArray(colors, i * 3);
      sizes[i] = [2, 3.2, 5][layer] + random() * 1.7;
      resting[i] = [0.24, 0.4, 0.55][layer] + random() * 0.15;
      brightness[i] = resting[i];
    }
    return { count, base, positions, colors, sizes, brightness, resting, heat };
  }, [compact]);
  const uniforms = useMemo(() => ({ pixelRatio: { value: viewport.dpr } }), [viewport.dpr]);
  useFrame((_, delta) => {
    if (!active || !geometry.current) return;
    const dt = Math.min(delta, 0.05);
    time.current += dt;
    const pointer = pointerRef?.current;
    const interactive = !compact && pointer?.inside;
    const damping = 1 - Math.exp(-dt * 4);
    cursor.current.x += ((interactive ? pointer.point.x : 0) - cursor.current.x) * damping;
    cursor.current.y += ((interactive ? pointer.point.y : 0) - cursor.current.y) * damping;
    stepStars(data, time.current, dt, cursor.current, size.width, size.height, interactive, compact);
    geometry.current.attributes.position.needsUpdate = true;
    geometry.current.attributes.brightness.needsUpdate = true;
  });
  return <points frustumCulled={false} renderOrder={-1}>
    <bufferGeometry ref={geometry}>
      <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      <bufferAttribute attach="attributes-starSize" args={[data.sizes, 1]} />
      <bufferAttribute attach="attributes-brightness" args={[data.brightness, 1]} />
    </bufferGeometry>
    <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} vertexColors transparent depthWrite={false} depthTest={false} />
  </points>;
}
