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
 * Calculate MET value for walking based on speed and incline
 * @param speedMph Speed in miles per hour
 * @param inclinePercent Incline percentage (0-15)
 * @returns MET value
 */
export function getWalkingMET(speedMph: number, inclinePercent: number): number {
  // Clamp incline to 0-15 range
  inclinePercent = Math.max(0, Math.min(15, inclinePercent));
  
  // Reference data for 2 mph walking
  const reference2mph = {
    base: 2.3, // 0% grade
    mid: 3.0,  // 5% grade
    top: 3.8   // 10% grade
  };
  
  // If speed is close to 2 mph, use the reference data
  if (Math.abs(speedMph - 2) < 0.2) {
    if (inclinePercent <= 5) {
      return reference2mph.base + (reference2mph.mid - reference2mph.base) * (inclinePercent / 5);
    } else {
      return reference2mph.mid + (reference2mph.top - reference2mph.mid) * ((inclinePercent - 5) / 5);
    }
  }
  
  // For other speeds, use a more general formula
  // Base MET for walking on flat ground varies with speed
  let baseMET: number;
  
  if (speedMph < 2) {
    // Slow walking (< 2 mph)
    baseMET = 2.0 + (speedMph / 2);
  } else if (speedMph <= 3.5) {
    // Normal walking (2-3.5 mph)
    baseMET = 2.5 + (speedMph - 2) * 0.8;
  } else if (speedMph <= 4.5) {
    // Brisk walking (3.5-4.5 mph)
    baseMET = 3.5 + (speedMph - 3.5) * 1.0;
  } else {
    // Very brisk walking / light jogging (> 4.5 mph)
    baseMET = 4.5 + (speedMph - 4.5) * 1.5;
  }
  
  // Incline factor increases with speed
  const inclineFactor = 0.1 + (speedMph / 10);
  
  // Calculate MET with incline adjustment
  return baseMET + (inclinePercent * inclineFactor);
}

/**
 * Calculate MET value for running based on speed and incline
 * @param speedMph Speed in miles per hour
 * @param inclinePercent Incline percentage (0-15)
 * @returns MET value
 */
export function getRunningMET(speedMph: number, inclinePercent: number): number {
  // Clamp incline to 0-15 range
  inclinePercent = Math.max(0, Math.min(15, inclinePercent));
  
  // Base MET for running on flat ground varies with speed
  let baseMET: number;
  
  if (speedMph < 5) {
    // Light jogging (< 5 mph)
    baseMET = 6.0 + (speedMph - 4) * 1.0;
  } else if (speedMph <= 7) {
    // Moderate running (5-7 mph)
    baseMET = 8.0 + (speedMph - 5) * 1.0;
  } else if (speedMph <= 10) {
    // Fast running (7-10 mph)
    baseMET = 10.0 + (speedMph - 7) * 1.0;
  } else {
    // Very fast running (> 10 mph)
    baseMET = 13.0 + (speedMph - 10) * 0.5;
  }
  
  // Incline factor increases with speed
  const inclineFactor = 0.2 + (speedMph / 20);
  
  // Calculate MET with incline adjustment
  return baseMET + (inclinePercent * inclineFactor);
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
  incline = 0,
}: JoulesCalculationParams): number {
  // Convert weight to kg if needed
  const weightInKg = useMetricUnits ? weight : weight * 0.453592;
  
  // Convert body weight to kg if needed
  const bodyWeightInKg = useMetricUnits ? bodyWeight : bodyWeight * 0.453592;
  
  // Gravity constant (m/s²)
  const gravity = 9.8;
  
  // Calculate joules based on exercise type
  let joules: number;
  
  // For cardio exercises, use distance, speed, and MET-based calculation
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
    
    // Convert speed to m/s for duration calculation
    const speedInMps = useMetricUnits ? speed / 3.6 : speed * 0.44704;
    
    // Calculate duration in minutes
    const durationMinutes = distanceInMeters / (speedInMps * 60);
    
    // Convert speed to mph for MET calculation
    const speedInMph = useMetricUnits ? speed * 0.621371 : speed;
    
    // Determine MET value based on exercise type and parameters
    let metValue: number;
    
    // Check if this is a treadmill exercise
    const exerciseName = exercise.name || "";
    const isTreadmill = exerciseName.toLowerCase().includes("treadmill");
    const isWalking = isTreadmill && exerciseName.toLowerCase().includes("walk");
    const isRunning = isTreadmill && exerciseName.toLowerCase().includes("run");
    
    if (isTreadmill) {
      // For treadmill exercises, calculate MET dynamically based on speed and incline
      if (isWalking) {
        metValue = getWalkingMET(speedInMph, incline);
      } else if (isRunning) {
        metValue = getRunningMET(speedInMph, incline);
      } else {
        // Fallback to provided MET value or estimate
        metValue = exercise.metValue || 5.0;
      }
    } else {
      // Use MET value if available, or estimate based on speed and incline
      metValue = exercise.metValue || 3.5; // Default MET value if not specified
      
      // Adjust MET value based on speed if not explicitly set
      if (!exercise.metValue) {
        // Walking
        if (speedInMps < 2.2) { // ~5 mph or 8 km/h
          metValue = 3.0 + (speedInMps * 0.8) + (displacement * 15);
        } 
        // Running
        else {
          metValue = 7.0 + (speedInMps * 0.8) + (displacement * 15);
        }
      }
    }
    
    // Calculate energy expenditure using MET formula
    // 1 MET = 3.5 ml O2/kg/min
    // 1 L O2 = 20 kJ (kilojoules) of energy
    
    // VO2 (L/min) = MET * 3.5 * bodyWeightInKg / 1000
    const vo2LMin = (metValue * 3.5 * bodyWeightInKg) / 1000;
    
    // Total O2 consumption (L) = VO2 (L/min) * duration (min)
    const totalO2Consumption = vo2LMin * durationMinutes;
    
    // Energy (kJ) = Total O2 consumption (L) * 20 kJ/L
    const energyKJ = totalO2Consumption * 20;
    
    // Convert kJ to J
    joules = energyKJ * 1000;
    
    // If reps are provided (e.g., for interval training), multiply by reps
    if (reps > 0) {
      joules *= reps;
    }
    
    // Apply additional adjustment for incline if displacement > 0
    if (displacement > 0) {
      // Add work done against gravity for incline
      const heightChange = distanceInMeters * displacement; // Total vertical displacement
      const verticalWork = bodyWeightInKg * gravity * heightChange;
      joules += verticalWork;
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