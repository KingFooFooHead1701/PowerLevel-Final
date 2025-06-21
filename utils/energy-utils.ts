export interface JoulesCalculationParams {
  reps: number;
  weight: number;
  useMetricUnits: boolean;
  displacement: number;
  usePseudoJoules: boolean;
  exercise?: {
    requiresBodyWeight?: boolean;
    isCardio?: boolean;
    isIsometric?: boolean;
    metValue?: number;
    name?: string; // Added name property to fix TypeScript errors
  };
  bodyWeight?: number;
  distance?: number; // in meters or km, for cardio exercises
  speed?: number; // in km/h or mph, for cardio exercises
  incline?: number; // in percent, for treadmill exercises
}

/**
 * Calculate MET value for walking based on speed and incline using ACSM and empirical data.
 * @param speedMph Speed in miles per hour
 * @param inclinePercent Incline percentage (0-15)
 * @returns MET value
 */
export function getWalkingMET(speedMph: number, inclinePercent: number): number {
  // Clamp incline to physiological range 0-15%
  inclinePercent = Math.max(0, Math.min(15, inclinePercent));
  
  // Reference MET values at 2 mph for 0%, 5%, 10% grades
  const reference2mph = {
    base: 2.3, // MET for flat walking at 2 mph
    mid: 3.0,  // MET at 5% incline
    top: 3.8   // MET at 10% incline
  };
  
  // If near 2 mph, interpolate between reference points for incline effect
  if (Math.abs(speedMph - 2) < 0.2) {
    if (inclinePercent <= 5) {
      return reference2mph.base + 
             (reference2mph.mid - reference2mph.base) * (inclinePercent / 5);
    } else {
      return reference2mph.mid + 
             (reference2mph.top - reference2mph.mid) * ((inclinePercent - 5) / 5);
    }
  }
  
  // For other speeds, approximate base MET via linear segments
  let baseMET: number;
  if (speedMph < 2) {
    // Slow walking (<2 mph): baseline of 2.0 + fraction of speed
    baseMET = 2.0 + (speedMph / 2);
  } else if (speedMph <= 3.5) {
    // Normal walking (2-3.5 mph)
    baseMET = 2.5 + (speedMph - 2) * 0.8;
  } else if (speedMph <= 4.5) {
    // Brisk walking (3.5-4.5 mph)
    baseMET = 3.5 + (speedMph - 3.5) * 1.0;
  } else {
    // Very brisk / light jogging (>4.5 mph)
    baseMET = 4.5 + (speedMph - 4.5) * 1.5;
  }
  
  // Incline adds additional metabolic cost proportional to speed
  const inclineFactor = 0.1 + (speedMph / 10);
  
  // Final walking MET includes incline adjustment
  return baseMET + (inclinePercent * inclineFactor);
}

/**
 * Calculate MET value for running based on speed and incline using ACSM guidelines.
 * @param speedMph Speed in miles per hour
 * @param inclinePercent Incline percentage (0-15)
 * @returns MET value
 */
export function getRunningMET(speedMph: number, inclinePercent: number): number {
  inclinePercent = Math.max(0, Math.min(15, inclinePercent));
  
  // Base MET segments for running speeds
  let baseMET: number;
  if (speedMph < 5) {
    // Light jogging (<5 mph): start at 6 METs
    baseMET = 6.0 + (speedMph - 4) * 1.0;
  } else if (speedMph <= 7) {
    // Moderate running (5-7 mph)
    baseMET = 8.0 + (speedMph - 5) * 1.0;
  } else if (speedMph <= 10) {
    // Fast running (7-10 mph)
    baseMET = 10.0 + (speedMph - 7) * 1.0;
  } else {
    // Very fast running (>10 mph)
    baseMET = 13.0 + (speedMph - 10) * 0.5;
  }
  
  // Incline adds metabolic cost; factor scaled by speed
  const inclineFactor = 0.2 + (speedMph / 20);
  return baseMET + (inclinePercent * inclineFactor);
}

/**
 * Main function to convert exercise parameters into joules of energy expended.
 * Applies physics-based work calculations or MET-based formulas depending on type.
 */
export function calculateJoules({
  reps,
  weight,
  useMetricUnits,
  displacement,
  usePseudoJoules,
  exercise,
  bodyWeight = 0,
  distance = 0,
  speed = 0,
  incline = 0,
}: JoulesCalculationParams): number {
  // Convert input weights to kilograms
  const weightInKg = useMetricUnits ? weight : weight * 0.453592;
  const bodyWeightInKg = useMetricUnits ? bodyWeight : bodyWeight * 0.453592;
  
  // Standard gravity constant (m/s²)
  const gravity = 9.8;
  let joules: number;

  // --- CARDIO BRANCH: MET-based oxygen uptake ---
  if (exercise?.isCardio) {
    if (bodyWeightInKg <= 0 || distance <= 0 || speed <= 0) {
      console.warn("Missing inputs for cardio calculation");
      return 0;
    }
    // Convert distance to meters, speed to m/s
    const distanceM = useMetricUnits ? distance * 1000 : distance * 1609.34;
    const speedMs = useMetricUnits ? speed / 3.6 : speed * 0.44704;
    // Duration in minutes
    const durationMin = (distanceM / speedMs) / 60;
    // Speed for MET tables in mph
    const speedMph = useMetricUnits ? speed * 0.621371 : speed;

    // Determine MET value
    let metValue: number;
    const nameLower = exercise.name?.toLowerCase() || '';
    const isTreadmill = nameLower.includes('treadmill');
    const isWalk = isTreadmill && nameLower.includes('walk');
    const isRun = isTreadmill && nameLower.includes('run');
    if (isTreadmill) {
      metValue = isWalk ? getWalkingMET(speedMph, incline)
               : isRun ? getRunningMET(speedMph, incline)
               : exercise.metValue || 5;
    } else {
      metValue = exercise.metValue || 3.5;
      // simple adjust if no explicit MET
      if (!exercise.metValue) {
        metValue = speedMs < 2.2
          ? 3.0 + speedMs * 0.8 + displacement * 15
          : 7.0 + speedMs * 0.8 + displacement * 15;
      }
    }
    // VO2 (L/min) = MET * 3.5 ml/kg/min * weight / 1000
    const vo2Lpm = (metValue * 3.5 * bodyWeightInKg) / 1000;
    const totalO2 = vo2Lpm * durationMin;      // total O2 in L
    const energyKJ = totalO2 * 20;            // 20 kJ per L O2
    joules = energyKJ * 1000;                 // convert kJ to J
    // scale by reps if interval style
    if (reps > 0) joules *= reps;
    // add vertical work against gravity for incline
    if (displacement > 0) {
      const verticalM = distanceM * displacement;
      joules += bodyWeightInKg * gravity * verticalM;
    }
  }
  // --- ISOMETRIC BRANCH: static hold work model ---
  else if (exercise?.isIsometric) {
    if (bodyWeightInKg <= 0) return 0;
    const duration = 60; // default 60s hold
    joules = bodyWeightInKg * gravity * 0.1 * duration;
    if (reps > 0) joules *= reps;
  }
  // --- BODYWEIGHT BRANCH: % of bodyweight * work against gravity ---
  else if (exercise?.requiresBodyWeight) {
    if (bodyWeightInKg <= 0) return 0;
    let effWeight: number;
    // approximate % of BW moved per exercise pattern
    switch (true) {
      case /push-up/.test(exercise.name || ''): effWeight = bodyWeightInKg * 0.65; break;
      case /pull-up/.test(exercise.name || ''): effWeight = bodyWeightInKg * 0.95; break;
      case /dip/.test(exercise.name || ''):     effWeight = bodyWeightInKg * 0.75; break;
      default: effWeight = bodyWeightInKg * 0.5; break;
    }
    effWeight += weightInKg; // add external load
    if (usePseudoJoules) {
      joules = effWeight * gravity * reps;
    } else {
      joules = effWeight * gravity * displacement * reps;
    }
  }
  // --- STANDARD WEIGHTED LIFT: mgh or pseudo ---
  else {
    if (usePseudoJoules) {
      joules = weightInKg * gravity * reps;
    } else {
      joules = weightInKg * gravity * displacement * reps;
    }
  }

  return Math.round(joules);
}

export function formatEnergy(joules: number): { abbreviated: string; full: string } {
  if (joules === 0) return { abbreviated: '0 J', full: '0 Joules' };
  const units = [
    { symbol: 'J', threshold: 1 },
    { symbol: 'kJ', threshold: 1e3 },
    { symbol: 'MJ', threshold: 1e6 },
    { symbol: 'GJ', threshold: 1e9 },
    { symbol: 'TJ', threshold: 1e12 },
  ];
  let idx = 0;
  for (let i = units.length - 1; i >= 0; i--) {
    if (joules >= units[i].threshold) { idx = i; break; }
  }
  const unit = units[idx];
  const value = joules / unit.threshold;
  const abbreviated = value >= 10 || idx === 0
    ? `${Math.round(value)} ${unit.symbol}`
    : `${value.toFixed(1)} ${unit.symbol}`;
  return { abbreviated, full: `${joules.toLocaleString()} Joules` };
}

export function getMilestoneLevel(joules: number): string | null {
  if (joules >= 1e18) return '1 EJ';
  if (joules >= 1e15) return '1 PJ';
  if (joules >= 1e12) return '1 TJ';
  if (joules >= 1e9) return '1 GJ';
  if (joules >= 1e6) return '1 MJ';
  if (joules >= 1e3) return '1 kJ';
  return null;
}
