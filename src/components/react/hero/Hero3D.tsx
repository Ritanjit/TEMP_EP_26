/**
 * Hero3D.tsx - React Three Fiber 3D Hero Component
 * 
 * This is a REACT ISLAND - it only loads on the homepage.
 * 
 * USAGE in Astro:
 * ---
 * import Hero3D from '@components/react/hero/Hero3D';
 * ---
 * <Hero3D client:load />
 * 
 * The client:load directive makes it hydrate immediately.
 * 
 * DEPENDENCIES:
 * - @react-three/fiber
 * - @react-three/drei
 * - three
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';

// 3D Model Component
function Model() {
  // TODO: Replace with actual model path
  // const { scene } = useGLTF('/models/hero-model.glb');
  // return <primitive object={scene} />;

  // Placeholder - rotating box
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  );
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

// Main Hero3D Component
export default function Hero3D() {
  return (
    <div className="hero-3d w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* 3D Model */}
          <Model />

          {/* Camera Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
          />

          {/* Environment for reflections */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
