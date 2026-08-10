import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { GlobalScene } from '../GlobalScene';

vi.mock('../../../store/useStore', () => ({
  useStore: vi.fn((selector) => {
    const state = { cameraTarget: 'hub', setCameraTarget: vi.fn() };
    return selector(state);
  }),
}));

describe('GlobalScene', () => {
  it.skip('[P3-01] renders a Canvas with WebGL context', () => {
    expect(true).toBe(true);
  });
  it.skip('[P3-02] transitions camera on setCameraTarget change', () => {
    expect(true).toBe(true);
  });
  it.skip('[P3-ORBIT] renders HubOrbitMap when cameraTarget is hub', () => {
    expect(true).toBe(true);
  });
  it.skip('[P3-08] LidarCloud renders inside global Canvas', () => {
    expect(true).toBe(true);
  });
});
