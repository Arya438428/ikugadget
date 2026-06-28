import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GalaxySpiral() {
  const count = 4000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const hues = [0.58, 0.72, 0.44, 0.13, 0.95];
    for (let i = 0; i < count; i++) {
      const arm = i % 3;
      const t = Math.pow(Math.random(), 0.65);
      const r = t * 68 + 3;
      const base = (arm / 3) * Math.PI * 2;
      const theta = base + t * Math.PI * 2.8;
      const sc = (1 - t) * 7 + 1.5;
      pos[i * 3]     = r * Math.cos(theta) + (Math.random() - 0.5) * sc;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (3 + t * 5);
      pos[i * 3 + 2] = r * Math.sin(theta) + (Math.random() - 0.5) * sc;
      const h = hues[Math.floor(Math.random() * hues.length)];
      const brightness = 0.52 + t * 0.32 + Math.random() * 0.16;
      const c = new THREE.Color().setHSL(h, 0.85, brightness);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.014;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.38}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

function CoreGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[5, 16, 16]} />
      <meshBasicMaterial color="#a0ffe0" transparent opacity={0.09} />
    </mesh>
  );
}

function NebulaBlob({ pos, hue, size }: { pos: [number, number, number]; hue: number; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.18 + offset;
      ref.current.position.set(pos[0] + Math.sin(t) * 3, pos[1] + Math.cos(t * 0.7) * 2, pos[2]);
    }
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial
        color={new THREE.Color().setHSL(hue / 360, 0.75, 0.55)}
        transparent
        opacity={0.045}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function SpaceBg3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 40, 70], fov: 62 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#04040a"]} />

        {/* HD star sphere */}
        <Stars
          radius={145}
          depth={70}
          count={6000}
          factor={5.2}
          saturation={0.65}
          fade
          speed={0.3}
        />

        {/* Galaxy spiral arms */}
        <GalaxySpiral />

        {/* Pulsing core */}
        <CoreGlow />

        {/* Nebula blobs drift slowly */}
        <NebulaBlob pos={[-30, 8, -40]}  hue={220} size={26} />
        <NebulaBlob pos={[38, -12, -45]} hue={270} size={32} />
        <NebulaBlob pos={[12, 22, -30]}  hue={160} size={18} />
        <NebulaBlob pos={[-20, -20, -25]} hue={40} size={14} />

        {/* Colored point lights for depth */}
        <pointLight position={[0, 25, 0]}    intensity={3.5} color="#50e8ff" distance={65}  decay={2} />
        <pointLight position={[-45, 12, 35]} intensity={2.2} color="#7c3aed" distance={90}  decay={2} />
        <pointLight position={[45, -12, -20]} intensity={1.8} color="#10b981" distance={75} decay={2} />
        <pointLight position={[0, -30, 20]}  intensity={1.2} color="#f59e0b" distance={60}  decay={2} />
      </Canvas>
    </div>
  );
}
