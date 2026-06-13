import { describe, expect, it } from 'vitest';
import { calculateInductionState } from './induction';

describe('electromagnetic induction model', () => {
  it('returns near-zero emf when the magnet is static', () => {
    const state = calculateInductionState({ position: -60, velocity: 0, turns: 80, fieldStrength: 1.2 });

    expect(Math.abs(state.emf)).toBeLessThan(0.001);
    expect(state.currentDirection).toBe('none');
  });

  it('increases emf magnitude when speed increases', () => {
    const slow = calculateInductionState({ position: -60, velocity: 0.6, turns: 80, fieldStrength: 1.2 });
    const fast = calculateInductionState({ position: -60, velocity: 1.8, turns: 80, fieldStrength: 1.2 });

    expect(Math.abs(fast.emf)).toBeGreaterThan(Math.abs(slow.emf) * 2);
  });

  it('increases emf magnitude when coil turns increase', () => {
    const few = calculateInductionState({ position: -60, velocity: 1.2, turns: 50, fieldStrength: 1.2 });
    const many = calculateInductionState({ position: -60, velocity: 1.2, turns: 150, fieldStrength: 1.2 });

    expect(Math.abs(many.emf)).toBeGreaterThan(Math.abs(few.emf) * 2);
  });

  it('reverses current direction when motion reverses', () => {
    const forward = calculateInductionState({ position: -60, velocity: 1.2, turns: 80, fieldStrength: 1.2 });
    const backward = calculateInductionState({ position: -60, velocity: -1.2, turns: 80, fieldStrength: 1.2 });

    expect(forward.currentDirection).not.toBe(backward.currentDirection);
  });
});
