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
  };
  bodyWeight?: number;
  distance?: number; // in meters or km, for cardio exercises
  speed?: number; // in km/h or mph, for cardio exercises
}

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
}: JoulesCalculationParams): number {
  // Convert weight to kg if needed
  const weightInKg = useMetricUnits ? weight : weight * 0.453592;
  
  // Convert body weight to kg if needed
  const bodyWeightInKg = useMetricUnits ? bodyWeight : bodyWeight * 0.453592;
  
  // Gravity constant (m/s²)
  const gravity = 9.8;
  
  // Calculate joules based on exercise type
  let joules: number;
  
  // For cardio exercises, use distance and speed-based calculation
  if (exercise?.isCardio) {
    // Ensure we have valid inputs for calculation
    if (bodyWeightInKg <= 0) {
      console.warn("Body weight is required for cardio calculations");
      return 0;
    }
    
    if (distance <= 0 || speed <= 0) {
      console.warn("Distance and speed are required for cardio calculations");
      return 0;
    }
    
    // Convert distance to meters if needed (assuming distance is in km for metric, miles for imperial)
    const distanceInMeters = useMetricUnits ? distance * 1000 : distance * 1609.34;
    
    // Convert speed to m/s
    const speedInMps = useMetricUnits ? speed / 3.6 : speed * 0.44704;
    
    // Calculate work done = force * distance
    // Force = mass * acceleration
    // For horizontal movement: force = mass * gravity * coefficient of friction (approx 0.1)
    const horizontalForce = bodyWeightInKg * gravity * 0.1;
    
    // Work done horizontally
    let workDone = horizontalForce * distanceInMeters;
    
    // Add work done against gravity for incline (if displacement is provided)
    if (displacement > 0) {
      const heightChange = distanceInMeters * displacement; // Total vertical displacement
      const verticalWork = bodyWeightInKg * gravity * heightChange;
      workDone += verticalWork;
    }
    
    // Adjust for intensity based on speed
    // Higher speeds require more energy per distance
    const speedFactor = Math.max(1.0, speedInMps / 1.4); // 1.4 m/s is average walking speed
    workDone *= speedFactor;
    
    joules = workDone;
    
    // If reps are provided (e.g., for interval training), multiply by reps
    if (reps > 0) {
      joules *= reps;
    }
  }
  // For isometric exercises (like planks)
  else if (exercise?.isIsometric) {
    // For isometric exercises, use a simplified model based on body weight
    // This is a simplified model: joules = bodyWeight * gravity * 0.1 * 60 (standard duration)
    
    // Ensure we have valid inputs
    if (bodyWeightInKg <= 0) {
      console.warn("Body weight is required for isometric calculations");
      return 0;
    }
    
    // Use a standard duration of 60 seconds if not provided
    const standardDuration = 60;
    
    joules = bodyWeightInKg * gravity * 0.1 * standardDuration;
    
    // If reps are provided (e.g., for multiple sets), multiply by reps
    if (reps > 0) {
      joules *= reps;
    }
  }
  // For body weight exercises
  else if (exercise?.requiresBodyWeight) {
    // For body weight exercises, use body weight as the resistance
    // Often only a percentage of body weight is actually moved
    
    // Ensure we have valid body weight
    if (bodyWeightInKg <= 0) {
      console.warn("Body weight is required for body weight exercises");
      return 0;
    }
    
    let effectiveWeight: number;
    
    // Different percentages of body weight for different exercises
    // These are approximate values and could be refined
    switch (true) {
      case /push-up|diamond-push-up/.test(weight.toString()):
        effectiveWeight = bodyWeightInKg * 0.65; // ~65% of body weight for push-ups
        break;
      case /pull-up|chin-up/.test(weight.toString()):
        effectiveWeight = bodyWeightInKg * 0.95; // ~95% of body weight for pull-ups
        break;
      case /dip/.test(weight.toString()):
        effectiveWeight = bodyWeightInKg * 0.75; // ~75% of body weight for dips
        break;
      case /crunch|sit-up|v-up/.test(weight.toString()):
        effectiveWeight = bodyWeightInKg * 0.3; // ~30% of body weight for ab exercises
        break;
      case /leg-raise|hanging-leg-raise/.test(weight.toString()):
        effectiveWeight = bodyWeightInKg * 0.35; // ~35% of body weight for leg raises
        break;
      case /burpee|jumping-jack|mountain-climber/.test(weight.toString()):
        effectiveWeight = bodyWeightInKg * 0.7; // ~70% of body weight for dynamic exercises
        break;
      default:
        effectiveWeight = bodyWeightInKg * 0.5; // Default to 50% if not specified
    }
    
    // Add any additional weight being used
    effectiveWeight += weightInKg;
    
    if (usePseudoJoules) {
      // Simplified calculation (ignoring displacement)
      joules = effectiveWeight * gravity * reps;
    } else {
      // Standard calculation with displacement
      joules = effectiveWeight * gravity * displacement * reps;
    }
  }
  // For standard weight exercises
  else {
    if (usePseudoJoules) {
      // Simplified calculation (ignoring displacement)
      joules = weightInKg * gravity * reps;
    } else {
      // Standard calculation with displacement
      joules = weightInKg * gravity * displacement * reps;
    }
  }
  
  return Math.round(joules);
}

export function formatEnergy(joules: number): { abbreviated: string; full: string } {
  if (joules === 0) {
    return { abbreviated: "0 J", full: "0 Joules" };
  }
  
  // Define energy units and their thresholds
  const units = [
    { symbol: "J", name: "Joules", threshold: 1 },
    { symbol: "kJ", name: "Kilojoules", threshold: 1e3 },
    { symbol: "MJ", name: "Megajoules", threshold: 1e6 },
    { symbol: "GJ", name: "Gigajoules", threshold: 1e9 },
    { symbol: "TJ", name: "Terajoules", threshold: 1e12 },
    { symbol: "PJ", name: "Petajoules", threshold: 1e15 },
    { symbol: "EJ", name: "Exajoules", threshold: 1e18 },
  ];
  
  // Find the appropriate unit
  let unitIndex = 0;
  for (let i = units.length - 1; i >= 0; i--) {
    if (joules >= units[i].threshold) {
      unitIndex = i;
      break;
    }
  }
  
  const unit = units[unitIndex];
  const value = joules / unit.threshold;
  
  // Format the abbreviated value with 1 decimal place if needed
  const abbreviated = value >= 10 || unitIndex === 0
    ? `${Math.round(value)} ${unit.symbol}`
    : `${value.toFixed(1)} ${unit.symbol}`;
  
  // Format the full value with commas
  const full = `${joules.toLocaleString()} ${units[0].name}`;
  
  return { abbreviated, full };
}

export function getMilestoneLevel(joules: number): string | null {
  if (joules >= 1e18) return "1 EJ";
  if (joules >= 1e15) return "1 PJ";
  if (joules >= 1e12) return "1 TJ";
  if (joules >= 1e9) return "1 GJ";
  if (joules >= 1e6) return "1 MJ";
  if (joules >= 1e3) return "1 kJ";
  return null;
}