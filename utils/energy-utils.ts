// utils/energy-utils.ts
import type { Exercise, CalculationFamily } from "@/constants/exercises";

export interface CalculateParams {
  reps: number;
  weight: number;
  useMetricUnits: boolean;
  displacement: number;
  usePseudoJoules: boolean;
  exercise: Pick<
    Exercise,
    | "name"
    | "calculationFamily"
    | "metValue"
    | "bodyWeightCoefficient"
    | "requiresBodyWeight"
    | "isCardio"
    | "isIsometric"
  >;
  bodyWeight: number;
  duration?: number; // seconds
  distance?: number; // km or miles
  speed?: number; // km/h or mph
  incline?: number; // percent grade
  watts?: number;
  assistance?: number; // kg or lb
  verticalDistance?: number; // meters or feet
}

const G = 9.81;
const KCAL_TO_JOULES = 4184;

const toKg = (value: number, metric: boolean) =>
  Math.max(0, metric ? value : value * 0.45359237);

const speedToMph = (speed: number, metric: boolean) =>
  Math.max(0, metric ? speed * 0.621371 : speed);

const verticalToMeters = (value: number, metric: boolean) =>
  Math.max(0, metric ? value : value * 0.3048);

const durationHours = (seconds: number) => Math.max(0, seconds) / 3600;

const metEnergyJoules = (met: number, massKg: number, seconds: number) => {
  if (met <= 0 || massKg <= 0 || seconds <= 0) return 0;
  return met * massKg * durationHours(seconds) * KCAL_TO_JOULES;
};

function estimateSpeedMet(
  exerciseName: string,
  fallbackMet: number,
  speed: number,
  incline: number,
  metric: boolean,
): number {
  const name = exerciseName.toLowerCase();
  const mph = speedToMph(speed, metric);
  let met = fallbackMet > 0 ? fallbackMet : 5;

  if (name.includes("walk") || name.includes("hiking")) {
    if (mph > 0 && mph < 2) met = 2.5;
    else if (mph < 2.5) met = 3.0;
    else if (mph < 3.0) met = 3.5;
    else if (mph < 3.5) met = 4.0;
    else if (mph < 4.0) met = 4.8;
    else if (mph > 0) met = 5.5;
  } else if (
    name.includes("run") ||
    name.includes("jog") ||
    name.includes("sprint") ||
    name.includes("trail")
  ) {
    if (mph > 0 && mph < 5) met = 6.0;
    else if (mph < 6) met = 8.3;
    else if (mph < 7) met = 9.8;
    else if (mph < 8) met = 11.0;
    else if (mph < 9) met = 11.8;
    else if (mph < 10) met = 12.8;
    else if (mph > 0) met = 14.5;
  } else if (
    name.includes("cycling") ||
    name.includes("biking") ||
    name.includes("skating")
  ) {
    if (mph > 0 && mph < 10) met = 4.0;
    else if (mph < 12) met = 6.8;
    else if (mph < 14) met = 8.0;
    else if (mph < 16) met = 10.0;
    else if (mph < 20) met = 12.0;
    else if (mph > 0) met = 16.0;
  }

  // A practical grade adjustment for consumer logging. The catalog MET remains
  // the baseline, while positive grade increases estimated metabolic demand.
  if (incline > 0) {
    met *= 1 + Math.min(incline, 25) * 0.04;
  }

  return Math.max(1, met);
}

function inferLegacyFamily(exercise: CalculateParams["exercise"]): CalculationFamily {
  if (exercise.calculationFamily) return exercise.calculationFamily;
  if (exercise.isIsometric) return "ISO_MET";
  if (exercise.isCardio) return "CARDIO_MET";
  return exercise.requiresBodyWeight ? "BW_REPS" : "EXT_LOAD_REPS";
}

/**
 * Power Level energy engine v2.
 *
 * Mechanical-work families return mechanical joules.
 * MET families return estimated metabolic joules.
 * Machine watts use directly measured mechanical joules when watts are entered.
 *
 * `usePseudoJoules` is retained for compatibility with existing settings, but
 * no longer silently applies the old blanket 30%-of-bodyweight strength rule.
 */
export function calculateJoules({
  reps,
  weight,
  useMetricUnits,
  displacement,
  exercise,
  bodyWeight,
  duration = 0,
  distance = 0,
  speed = 0,
  incline = 0,
  watts = 0,
  assistance = 0,
  verticalDistance = 0,
}: CalculateParams): number {
  const family = inferLegacyFamily(exercise);
  const bodyMassKg = toKg(bodyWeight, useMetricUnits);
  const externalMassKg = toKg(weight, useMetricUnits);
  const assistanceKg = toKg(assistance, useMetricUnits);
  const repCount = Math.max(0, reps);
  const travelM = Math.max(0, displacement);
  const coefficient = Math.max(0, exercise.bodyWeightCoefficient ?? 0.7);
  const met = Math.max(1, exercise.metValue ?? 5);

  switch (family) {
    case "EXT_LOAD_REPS":
      return externalMassKg * G * travelM * repCount;

    case "BW_REPS":
      return bodyMassKg * coefficient * G * travelM * repCount;

    case "COMBINED_REPS":
      return (
        (bodyMassKg * coefficient + externalMassKg) *
        G *
        travelM *
        repCount
      );

    case "ASSISTED_BW_REPS": {
      const effectiveMass = Math.max(
        bodyMassKg * coefficient - assistanceKg,
        0,
      );
      return effectiveMass * G * travelM * repCount;
    }

    case "PLYO_REPS":
      return (
        (bodyMassKg * coefficient + externalMassKg) *
        G *
        travelM *
        repCount
      );

    case "COMPLEX_REPS": {
      const bodyComponent = exercise.bodyWeightCoefficient
        ? bodyMassKg * exercise.bodyWeightCoefficient
        : 0;
      return (
        (externalMassKg + bodyComponent) * G * travelM * repCount
      );
    }

    case "ISO_MET":
      return metEnergyJoules(met, bodyMassKg, duration);

    case "CARDIO_MET":
    case "SWIM_MET":
      return metEnergyJoules(met, bodyMassKg, duration);

    case "CARDIO_SPEED_MET": {
      const dynamicMet = estimateSpeedMet(
        exercise.name,
        met,
        speed,
        incline,
        useMetricUnits,
      );
      return metEnergyJoules(dynamicMet, bodyMassKg, duration);
    }

    case "MACHINE_WATT":
      if (watts > 0 && duration > 0) {
        return watts * duration;
      }
      return metEnergyJoules(met, bodyMassKg, duration);

    case "LOADED_LOCOMOTION": {
      // Horizontal loaded movement cannot be represented honestly as m*g*d.
      // Use the activity MET and scale modestly for carried/pushed load.
      const loadRatio =
        bodyMassKg > 0 ? Math.min(externalMassKg / bodyMassKg, 1) : 0;
      const loadAdjustedMet = met * (1 + loadRatio * 0.5);
      return metEnergyJoules(loadAdjustedMet, bodyMassKg, duration);
    }

    case "VERTICAL_DISTANCE": {
      if (verticalDistance > 0 && bodyMassKg > 0) {
        const verticalM = verticalToMeters(verticalDistance, useMetricUnits);
        return (bodyMassKg + externalMassKg) * G * verticalM;
      }
      return metEnergyJoules(met, bodyMassKg, duration);
    }

    default:
      return 0;
  }
}

export interface FormatResult {
  value: number;
  unit: string;
  abbreviated: string;
  full: string;
}

export function formatEnergy(joules: number): FormatResult {
  const safe = Number.isFinite(joules) && joules > 0 ? joules : 0;
  const full = `${Math.round(safe).toLocaleString()} joules`;

  if (safe >= 1_000_000) {
    const value = +(safe / 1_000_000).toFixed(2);
    return { value, unit: "MJ", abbreviated: `${value} MJ`, full };
  }

  if (safe >= 1_000) {
    const value = +(safe / 1_000).toFixed(1);
    return { value, unit: "kJ", abbreviated: `${value} kJ`, full };
  }

  const value = +safe.toFixed(0);
  return { value, unit: "J", abbreviated: `${value} J`, full };
}
