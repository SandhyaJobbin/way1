import { animated, useSpring } from '@react-spring/three';
import { useEffect } from 'react';

interface OrbitRingProps {
  radius: number;
  color: string;
  active: boolean;
  pulseIntensity?: number;
}

export function OrbitRing({ radius, color, active, pulseIntensity = 1 }: OrbitRingProps) {
  const [spring, api] = useSpring(() => ({
    emissiveIntensity: 0.15,
    scale: 1,
    config: { tension: 80, friction: 14 },
  }));

  useEffect(() => {
    if (active) {
      api.start({
        emissiveIntensity: 0.6 * pulseIntensity,
        scale: 1.02,
        loop: { reverse: true },
      });
    } else {
      api.start({ emissiveIntensity: 0.15, scale: 1 });
    }
  }, [active, pulseIntensity, api]);

  return (
    <animated.mesh rotation={[Math.PI / 2, 0, 0]} scale={spring.scale}>
      <torusGeometry args={[radius, 0.08, 16, 100]} />
      <animated.meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={spring.emissiveIntensity}
        transparent
        opacity={0.85}
        toneMapped={false}
      />
    </animated.mesh>
  );
}
