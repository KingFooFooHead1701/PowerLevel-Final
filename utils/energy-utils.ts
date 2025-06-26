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
  distance?: number;
  speed?: number;
  incline?: number;
}

/**
 * calculateJoules computes energy expended in joules.
 * - For isometric: uses MET × bodyWeight × time (seconds → hours).
 * - For cardio: uses distance, speed, and MET value.
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
  distance,
  speed,
  incline,
}: CalculateParams): number {
  // 1) Isometric holds
  if (exercise.isIsometric) {
    if (!duration || duration <= 0) return 0;
  // convert body weight to kg if user is in imperial
  const weightKg = useMetricUnits
    ? bodyWeight
    : bodyWeight * 0.453592;
  const met = exercise.metValue ?? 1.5;      // default MET for isometrics
  const hours = duration / 3600;              // seconds → hours
  const calories = met * weightKg * hours;    // MET × kg × hours
  return calories * 4184;                     // kcal → joules
}

  // 2) Cardio
  if (exercise.isCardio) {
    const isTreadmill = exercise.name.toLowerCase().includes("treadmill");
    if (!distance || !speed || (isTreadmill && incline == null)) {
      return 0;
    }
    const durationHours = distance / speed;
    const met = exercise.metValue ?? 1;
    const calories = met * bodyWeight * durationHours;
    return calories * 4184;
  }

  // 3) Strength / dynamic resistance
  const massKg = useMetricUnits ? weight : weight * 0.453592;
  const heightM = displacement;
  const g = 9.81; // m/s²
  const workPerRep = massKg * g * heightM;
  const totalWork = workPerRep * reps;

  // simplified pseudo‐joules mode
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
