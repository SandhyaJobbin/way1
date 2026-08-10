import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import type { Mesh } from 'three';

interface IncidentTokenProps {
  activeRing: 1 | 2 | 3;
}

const angles = [0, Math.PI * 0.66, Math.PI * 1.33];
const radii = [3.5, 7.0, 10.5];

export function IncidentToken({ activeRing }: IncidentTokenProps) {
  const meshRef = useRef<Mesh>(null);
  const angleRef = useRef(angles[activeRing - 1]);

  const idx = activeRing - 1;

  angleRef.current = angles[idx];

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    angleRef.current += delta * 0.3;
    const r = radii[idx];
    meshRef.current.position.set(
      Math.cos(angleRef.current) * r,
      0.3,
      Math.sin(angleRef.current) * r,
    );
  });

  const { scale } = useSpring({
    scale: 1.0,
    from: { scale: 1.2 },
    key: activeRing,
    config: { tension: 170, friction: 14 },
  });

  return (
    <animated.mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color="#FF6B2B"
        emissive="#FF6B2B"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
      <pointLight intensity={2} distance={3} color="#FF6B2B" />
    </animated.mesh>
  );
}
