import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export function generateCloud(count = 3000): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    if (Math.random() < 0.2) pos[i * 3] *= 2.5;
  }
  return pos;
}

export const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  void main() {
    vec3 pos = position;
    float reveal = step(length(pos.xz) * 0.05, uProgress);
    pos.y += sin(uTime * 1.2 + pos.x * 0.5) * 0.05 * reveal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = max(1.0, 3.0 - length(pos) * 0.04) * reveal;
  }
`;

export const fragmentShader = `
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(0.31, 0.76, 0.97, (1.0 - d * 2.0) * 0.8);
  }
`;

export function CloudScene({ jogPos }: { jogPos: number }) {
  const positions = useMemo(() => generateCloud(3000), []);
  const uniforms = useRef({ uTime: { value: 0 }, uProgress: { value: 0 } });

  useFrame(({ clock }) => {
    uniforms.current.uTime.value = clock.elapsedTime;
    uniforms.current.uProgress.value = jogPos;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
