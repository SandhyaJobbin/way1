import { useState, useEffect } from 'react';
import {
  EffectComposer,
  ToneMapping,
  Bloom,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

type GpuTier = 'high' | 'low';

function useDetectGPU(): GpuTier {
  const [tier, setTier] = useState<GpuTier>('high');

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    setTier(cores < 4 ? 'low' : 'high');
  }, []);

  return tier;
}

export function PostProcessing() {
  const tier = useDetectGPU();

  return (
    <EffectComposer
      multisampling={0}
      resolutionScale={tier === 'low' ? 0.5 : undefined}
    >
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      {tier === 'high' && (
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.4}
          mipmapBlur
        />
      )}
      <Vignette eskil={false} offset={0.15} darkness={0.6} />
      <Noise opacity={0.015} />
    </EffectComposer>
  );
}
