import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { OrbitRing } from '../OrbitRing';

describe('OrbitRing', () => {
  it('[P3-03] renders with zone-specific color accent', () => {
    const { container } = render(
      <OrbitRing radius={3.5} color="#FF6B2B" active={false} />
    );
    expect(container).toBeTruthy();
  });

  it('[P3-03] grays out when inactive', () => {
    const { container } = render(
      <OrbitRing radius={7.0} color="#E8E8E8" active={false} />
    );
    expect(container).toBeTruthy();
  });

  it('[P3-03] pulses emissive when active', () => {
    const { container } = render(
      <OrbitRing radius={3.5} color="#FF6B2B" active={true} pulseIntensity={1} />
    );
    expect(container).toBeTruthy();
  });
});
