import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SpeechBubble } from '../../SpeechBubble';

describe('SpeechBubble', () => {
  it('[P3-05] renders typewriter animation text', () => {
    const { container } = render(
      <SpeechBubble show text="Hello World" />
    );
    expect(container.textContent).toContain('Hello World');
  });

  it('[P3-06] has aria-live="polite" for screen readers', () => {
    const { container } = render(
      <SpeechBubble show text="Accessibility test" />
    );
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion?.getAttribute('role')).toBe('status');
    expect(liveRegion?.textContent).toBe('Accessibility test');
  });

  it('[P3-05] shows blinking cursor while typing incomplete', () => {
    const { container } = render(
      <SpeechBubble show text="A long text that will not finish immediately" charsPerSecond={1} />
    );
    const cursor = container.querySelector('.animate-pulse');
    expect(cursor).toBeTruthy();
  });

  it('renders children directly when no text prop', () => {
    const { container } = render(
      <SpeechBubble show>
        <span>Plain children</span>
      </SpeechBubble>
    );
    expect(container.textContent).toContain('Plain children');
    const liveRegion = container.querySelector('[aria-live]');
    expect(liveRegion).toBeFalsy();
  });
});
