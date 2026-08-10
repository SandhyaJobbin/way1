import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from '../useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty string initially', () => {
    const { result } = renderHook(() => useTypewriter('Hello'));
    expect(result.current.displayedText).toBe('');
    expect(result.current.isComplete).toBe(false);
  });

  it('reveals characters over time', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 2));
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.displayedText).toBe('H');
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.displayedText).toBe('Hi');
    expect(result.current.isComplete).toBe(true);
  });

  it('resets on text change', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useTypewriter(text, 100),
      { initialProps: { text: 'First' } }
    );
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(result.current.displayedText).toBe('F');
    rerender({ text: 'Second' });
    expect(result.current.displayedText).toBe('');
    expect(result.current.isComplete).toBe(false);
  });

  it('handles empty text', () => {
    const { result } = renderHook(() => useTypewriter(''));
    expect(result.current.displayedText).toBe('');
    expect(result.current.isComplete).toBe(true);
  });
});
