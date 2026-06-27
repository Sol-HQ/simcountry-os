'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';

function Building({
  position,
  height,
  color,
}: {
  position: [number, number, number];
  height: number;
  color: string;
}) {
  return (
    <mesh position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
    </mesh>
  );
}

const BUILDINGS = [
  { position: [-3, 0, -3] as [number, number, number], height: 2.5, color: '#3b82f6' },
  { position: [-1.5, 0, -3] as [number, number, number], height: 1.8, color: '#6366f1' },
  { position: [0, 0, -3] as [number, number, number], height: 3.2, color: '#3b82f6' },
  { position: [1.5, 0, -3] as [number, number, number], height: 1.5, color: '#8b5cf6' },
  { position: [3, 0, -3] as [number, number, number], height: 2.8, color: '#3b82f6' },
  { position: [-3, 0, 0] as [number, number, number], height: 1.6, color: '#6366f1' },
  { position: [0, 0, 0] as [number, number, number], height: 4.0, color: '#f59e0b' },
  { position: [3, 0, 0] as [number, number, number], height: 2.0, color: '#3b82f6' },
  { position: [-3, 0, 3] as [number, number, number], height: 1.4, color: '#8b5cf6' },
  { position: [0, 0, 3] as [number, number, number], height: 2.2, color: '#6366f1' },
  { position: [3, 0, 3] as [number, number, number], height: 1.9, color: '#3b82f6' },
];

export default function WorldCanvas() {
  return (
    <Canvas
      camera={{ position: [8, 8, 8], fov: 50 }}
      style={{ background: '#0a0a0f' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 5, 0]} color="#3b82f6" intensity={0.5} />

      {BUILDINGS.map((b, i) => (
        <Building key={i} position={b.position} height={b.height} color={b.color} />
      ))}

      <Grid
        args={[20, 20]}
        cellColor="rgba(59,130,246,0.2)"
        sectionColor="rgba(59,130,246,0.4)"
        fadeDistance={30}
        infiniteGrid
      />

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.4}
      />

      <Environment preset="night" />
    </Canvas>
  );
}
