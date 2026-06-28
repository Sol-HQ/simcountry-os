'use client';

import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SIMCOUNTRY_LORE } from '@/lib/lore/canon';
import type { District, DistrictType } from '@/lib/lore/types';
import { MapDistrictCard, TYPE_COLORS } from './DistrictCard';
import styles from './WorldMap.module.css';

const DISTRICTS = SIMCOUNTRY_LORE.genesisDistricts;

function HexGrid() {
  const lines = useMemo(() => {
    const radius = 0.55;
    const cols = 14;
    const rows = 10;
    const verts: number[] = [];
    const hexHeight = radius * Math.sqrt(3);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = row % 2 === 0 ? 0 : radius * 1.5;
        const cx = col * radius * 3 + offsetX - cols * 1.5;
        const cz = row * hexHeight - rows * 0.5;

        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i + Math.PI / 6;
          const a2 = (Math.PI / 3) * (i + 1) + Math.PI / 6;
          verts.push(
            cx + radius * Math.cos(a1),
            0,
            cz + radius * Math.sin(a1),
            cx + radius * Math.cos(a2),
            0,
            cz + radius * Math.sin(a2)
          );
        }
      }
    }
    return new Float32Array(verts);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lines.length / 3}
          array={lines}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#06b6d4" transparent opacity={0.35} />
    </lineSegments>
  );
}

function StarField() {
  const count = 800;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 25 + 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#67e8f9"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function SolSymbol() {
  const groupRef = useRef<THREE.Group>(null);
  const lineCount = 12;
  const radius = 1.2;

  const lines = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < lineCount; i++) {
      const angle = (Math.PI * 2 * i) / lineCount;
      verts.push(0, 0.35, 0, radius * Math.cos(angle), 0.35, radius * Math.sin(angle));
    }
    return new Float32Array(verts);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.35, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 1.0, 64]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.75, 64]} />
        <meshBasicMaterial color="#0a0a0f" />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lines.length / 3}
            array={lines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.85} />
      </lineSegments>
      <pointLight color="#fbbf24" intensity={1.2} distance={6} />
    </group>
  );
}

interface DistrictNodeProps {
  district: District;
  onHover: (district: District | null, screenPos?: { x: number; y: number }) => void;
}

function DistrictNode({ district, onHover }: DistrictNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = TYPE_COLORS[district.type as DistrictType];
  const { x, y, z } = district.coordinates;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.y = y + Math.sin(t * 2 + x) * 0.08;
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(district, { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(null);
  };

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[0.35, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function Scene({
  onDistrictHover,
}: {
  onDistrictHover: (
    district: District | null,
    screenPos?: { x: number; y: number }
  ) => void;
}) {
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 12, 6]} intensity={0.6} color="#e0f2fe" />
      <StarField />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#0a0a0f" />
      </mesh>
      <HexGrid />
      <SolSymbol />
      {DISTRICTS.map((district) => (
        <DistrictNode
          key={district.id}
          district={district}
          onHover={onDistrictHover}
        />
      ))}
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={(80 * Math.PI) / 180}
        target={[0, 0, 0]}
      />
    </>
  );
}

export function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{
    district: District;
    x: number;
    y: number;
  } | null>(null);

  const handleHover = (
    district: District | null,
    screenPos?: { x: number; y: number }
  ) => {
    if (district && screenPos && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHovered({
        district,
        x: screenPos.x - rect.left,
        y: screenPos.y - rect.top,
      });
    } else {
      setHovered(null);
    }
  };

  return (
    <div ref={containerRef} className={styles.canvasWrap}>
      <Canvas camera={{ position: [12, 14, 12], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene onDistrictHover={handleHover} />
        </Suspense>
      </Canvas>
      <div className={styles.vignette} />
      <div className={styles.legend}>
        {(
          [
            ['capital', 'Capital'],
            ['trade', 'Trade'],
            ['culture', 'Culture'],
            ['defense', 'Defense'],
            ['wilderness', 'Wilderness'],
          ] as const
        ).map(([type, label]) => (
          <div key={type} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: TYPE_COLORS[type], color: TYPE_COLORS[type] }}
            />
            {label}
          </div>
        ))}
      </div>
      {hovered && (
        <div
          className={styles.overlay}
          aria-hidden={!hovered}
        >
          <div
            className={styles.cardAnchor}
            style={{ left: hovered.x, top: hovered.y - 12 }}
          >
            <MapDistrictCard
              name={hovered.district.name}
              type={hovered.district.type}
              population={hovered.district.population}
              lore={hovered.district.lore}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WorldMap;
