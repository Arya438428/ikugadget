import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Float, ContactShadows, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Preload device umum biar swap mulus
useTexture.preload("/products/1.png");
useTexture.preload("/products/7.jpg");
useTexture.preload("/products/11.jpg");

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

function Model({ src }: { src: string }) {
  const tex = useTexture(src);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;

  const { W, H } = useMemo(() => {
    const img = tex.image as HTMLImageElement | undefined;
    const a = img && img.height ? img.width / img.height : 0.49;
    const Hh = 2.3;
    return { W: Hh * a, H: Hh };
  }, [tex]);

  return (
    <PresentationControls global snap
      config={{ mass: 1, tension: 160, friction: 18 }}
      rotation={[0, 0, 0]}
      polar={[-0.35, 0.35]}
      azimuth={[-0.7, 0.7]}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
        <group>
          {/* Body device */}
          <RoundedBox args={[W * 1.04, H * 1.04, 0.16]} radius={0.08} smoothness={5} castShadow>
            <meshStandardMaterial color="#1b1b24" metalness={0.45} roughness={0.35} />
          </RoundedBox>
          {/* Layar = foto produk */}
          <mesh position={[0, 0, 0.084]}>
            <planeGeometry args={[W, H]} />
            <meshStandardMaterial map={tex} transparent toneMapped={false} roughness={0.5} metalness={0.05} />
          </mesh>
          {/* Kilau tepi */}
          <mesh position={[0, 0, 0.085]}>
            <planeGeometry args={[W, H]} />
            <meshBasicMaterial transparent opacity={0.05} color="#ffffff" blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      </Float>
    </PresentationControls>
  );
}

export default function Device3D({ src, className = "" }: { src: string; className?: string }) {
  const [ok] = useState(hasWebGL);

  if (!ok) {
    return <img src={src} alt="" draggable={false} className={`object-contain ${className}`} />;
  }

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 5], fov: 32 }}
      style={{ touchAction: "none" }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#6699ff" />
      <spotLight position={[0, 6, 3]} angle={0.5} penumbra={1} intensity={0.6} />
      <Suspense fallback={null}>
        <Model key={src} src={src} />
        <ContactShadows position={[0, -1.25, 0]} opacity={0.45} scale={7} blur={2.8} far={3.5} />
      </Suspense>
    </Canvas>
  );
}
