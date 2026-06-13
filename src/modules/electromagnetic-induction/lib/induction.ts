export type CurrentDirection = 'clockwise' | 'counterclockwise' | 'none';

export interface InductionParams {
  position: number;
  velocity: number;
  turns: number;
  fieldStrength: number;
}

export interface InductionState {
  flux: number;
  fluxRate: number;
  emf: number;
  currentDirection: CurrentDirection;
  coupling: number;
  lenzExplanation: string;
}

const COIL_WIDTH = 72;
const EMF_SCALE = 0.08;
const EPSILON = 0.015;

export function calculateFlux(position: number, fieldStrength: number): number {
  return fieldStrength * calculateCoupling(position);
}

export function calculateCoupling(position: number): number {
  return Math.exp(-(position * position) / (2 * COIL_WIDTH * COIL_WIDTH));
}

export function calculateFluxRate(position: number, velocity: number, fieldStrength: number): number {
  const flux = calculateFlux(position, fieldStrength);
  return flux * (-position / (COIL_WIDTH * COIL_WIDTH)) * velocity;
}

export function calculateInductionState(params: InductionParams): InductionState {
  const flux = calculateFlux(params.position, params.fieldStrength);
  const fluxRate = calculateFluxRate(params.position, params.velocity, params.fieldStrength);
  const emf = -params.turns * fluxRate * EMF_SCALE;
  const currentDirection = getCurrentDirection(emf);
  const trend = fluxRate > EPSILON ? '增大' : fluxRate < -EPSILON ? '减小' : '几乎不变';

  return {
    flux,
    fluxRate,
    emf,
    currentDirection,
    coupling: calculateCoupling(params.position),
    lenzExplanation:
      currentDirection === 'none'
        ? '磁通量几乎不变，线圈中没有明显感应电流。'
        : `磁通量正在${trend}，感应电流产生的磁场会阻碍这种变化，这就是楞次定律。`,
  };
}

export function getCurrentDirection(emf: number): CurrentDirection {
  if (Math.abs(emf) < EPSILON) return 'none';
  return emf > 0 ? 'counterclockwise' : 'clockwise';
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
