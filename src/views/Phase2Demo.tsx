import { JogDial } from '../components/JogDial';
import { CanvasSequence } from '../components/CanvasSequence';
import { LidarCloud } from '../components/LidarCloud';
import { Wayo } from '../components/Wayo';
import { useStore } from '../store/useStore';

export function Phase2Demo() {
  const { jogPos, wayoState } = useStore((s) => ({ jogPos: s.jogPos, wayoState: s.wayoState }));
  return (
    <div
      style={{
        background: '#050810',
        minHeight: '100vh',
        color: '#e0e8ff',
        fontFamily: 'monospace',
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 13, letterSpacing: 4, color: '#4db8ff', marginBottom: 24 }}>
        PHASE 2 SMOKE TEST — jogPos: {jogPos.toFixed(3)}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, color: '#4db8ff', marginBottom: 8 }}>
              JOG DIAL — drag horizontally
            </p>
            <JogDial size={160} detents={10} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: '#4db8ff', marginBottom: 8 }}>CANVAS SEQUENCE</p>
            <CanvasSequence width={320} height={180} frameCount={30} />
          </div>
        </div>
        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              height: 280,
              position: 'relative',
              background: '#0a0e1a',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <p style={{ fontSize: 11, color: '#4db8ff', padding: 8 }}>LIDAR CLOUD (R3F)</p>
            <div style={{ height: 240 }}>
              <LidarCloud className="w-full" />
            </div>
          </div>
          <div
            style={{
              height: 280,
              position: 'relative',
              background: '#0a0e1a',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <p style={{ fontSize: 11, color: '#4db8ff', padding: 8 }}>
              WAYO RIG — state: {wayoState}
            </p>
            <Wayo state={wayoState} size={200} position="center" />
          </div>
        </div>
      </div>
    </div>
  );
}