// utils/energy-utils.ts

export interface CalculateParams {
  reps: number;
  weight: number;
  useMetricUnits: boolean;
  displacement: number;
  usePseudoJoules: boolean;
  exercise: {
    isCardio: boolean;
    isIsometric?: boolean;
    name: string;
    metValue?: number;
  };
  bodyWeight: number;
  duration?: number;   // seconds for isometric holds
  distance?: number;   // km or miles
  speed?: number;      // km/h or mph, no longer used for work calc
  incline?: number;    // percent, for treadmill
}

/**
 * calculateJoules computes energy expended in joules.
 * - For isometric: uses MET × bodyWeight × time (seconds → hours).
 * - For cardio: uses work = force × distance (vertical + rolling).
 * - For strength: uses force × displacement × reps.
 * Returns 0 if required inputs are missing.
 */
export function calculateJoules({
  reps,
  weight,
  useMetricUnits,
  displacement,
  usePseudoJoules,
  exercise,
  bodyWeight,
  duration,
  distance = 0,
  incline = 0,
}: CalculateParams): number {
  // convert user body weight to kilograms
  const massKg = useMetricUnits
    ? bodyWeight
    : bodyWeight * 0.453592;

  // 1) Isometric holds
  if (exercise.isIsometric) {
    if (!duration || duration <= 0) return 0;
    const met = exercise.metValue ?? 1.5;      // default MET for isometrics
    const hours = duration / 3600;              // seconds → hours
    const calories = met * massKg * hours;      // MET × kg × hours
    return calories * 4184;                     // kcal → joules
  }

  // 2) Cardio (incl. treadmill)
  if (exercise.isCardio) {
    if (distance <= 0) return 0;

    // convert horizontal distance to meters
    const distanceMeters = useMetricUnits
      ? distance * 1000
      : distance * 1609.34;

    // incline percentage → decimal (e.g. 5% = 0.05)
    const inclineDecimal = incline / 100;

    // vertical meters climbed
    const verticalMeters = distanceMeters * inclineDecimal;

    // work against gravity: m * g * h
    const g = 9.81; // m/s²
    const gravityWork = massKg * g * verticalMeters;

    // approximate rolling resistance on flat: ~1% of gravity × distance
    const rollingCoeff = 0.01;
    const horizontalWork = massKg * g * distanceMeters * rollingCoeff;

    // total mechanical work
    const totalWork = gravityWork + horizontalWork;

    // pseudo-joules = mechanical work (already in joules)
    return totalWork;
  }

  // 3) Strength / dynamic resistance
  // — always include 30% of your body weight plus any additional weight entered
  const bodyWeightPortion = 0.30;
  const baseMassKg = massKg * bodyWeightPortion;
  const externalMassKg = weight > 0
    ? (useMetricUnits ? weight : weight * 0.453592)
    : 0;
  const lifterMassKg = baseMassKg + externalMassKg;

  const heightM = displacement;
  const g = 9.81; // m/s²
  const workPerRep = lifterMassKg * g * heightM;
  const totalWork = workPerRep * reps;

  // simplified pseudo-joules mode
  if (usePseudoJoules) {
    return totalWork;
  }

  // already in joules
  return totalWork;
}

/**
 * formatEnergy converts joules into a human-readable format.
 */
export interface FormatResult {
  value: number;
  unit: string;
  abbreviated: string;
}

export function formatEnergy(joules: number): FormatResult {
  if (joules >= 1_000_000) {
    const value = +(joules / 1_000_000).toFixed(2);
    return { value, unit: "MJ", abbreviated: `${value} MJ` };
  } else if (joules >= 1_000) {
    const value = +(joules / 1_000).toFixed(1);
    return { value, unit: "kJ", abbreviated: `${value} kJ` };
  } else {
    const value = +joules.toFixed(0);
    return { value, unit: "J", abbreviated: `${value} J` };
  }
}
