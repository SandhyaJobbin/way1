import { describe, it, expect } from 'vitest';
import { useStore } from './useStore';

describe('useStore cameraTarget', () => {
  it('default cameraTarget is hub', () => {
    const state = useStore.getState();
    expect(state.cameraTarget).toBe('hub');
    expect(state.transitionPhase).toBe('idle');
  });

  it('setCameraTarget("zone1") sets both fields', () => {
    useStore.getState().setCameraTarget('zone1');
    const state = useStore.getState();
    expect(state.cameraTarget).toBe('zone1');
    expect(state.transitionPhase).toBe('transitioning');
  });

  it('setTransitionPhase("idle") only changes phase', () => {
    useStore.getState().setCameraTarget('zone2');
    useStore.getState().setTransitionPhase('complete');
    useStore.getState().setTransitionPhase('idle');
    const state = useStore.getState();
    expect(state.transitionPhase).toBe('idle');
    expect(state.cameraTarget).toBe('zone2');
  });
});
