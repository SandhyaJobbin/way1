import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { useRef } from 'react';
import { useStore } from '../store/useStore';

const MAX_DRAG_PX = 320;
const MAX_DEGREES = 270;

export function JogDial({
  size = 160,
  detents = 10,
  className,
}: {
  size?: number;
  detents?: number;
  className?: string;
}) {
  const setJogPos = useStore((s) => s.setJogPos);
  const posRef = useRef(0);
  const [{ rotate }, api] = useSpring(() => ({ rotate: 0 }));

  const bind = useDrag(
    ({ offset: [ox], velocity: [vx], last }) => {
      const clamped = Math.max(0, Math.min(MAX_DRAG_PX, ox));
      const pos = clamped / MAX_DRAG_PX;
      const deg = pos * MAX_DEGREES;
      posRef.current = pos;
      setJogPos(pos);
      if (last) {
        const snapped = Math.round(pos * detents) / detents;
        posRef.current = snapped;
        setJogPos(snapped);
        const target = snapped * MAX_DEGREES + vx * 40;
        api.start({ rotate: target, config: { decay: true } });
        api.start({ rotate: snapped * MAX_DEGREES, config: { tension: 200, friction: 26 } });
      } else {
        api.start({ rotate: deg, config: { tension: 120, friction: 18 } });
      }
    },
    { axis: 'x', bounds: { left: 0, right: MAX_DRAG_PX }, rubberband: true }
  );

  return (
    <div
      {...bind()}
      className={className}
      style={{ touchAction: 'none', width: size, height: size, cursor: 'grab' }}
    >
      <animated.div
        style={{
          rotate,
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #3a3a3a, #111)',
          border: '2px solid #444',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 3,
            height: 16,
            background: '#4db8ff',
            borderRadius: 2,
          }}
        />
      </animated.div>
    </div>
  );
}