export interface JoulesCalculationParams {
  reps: number;
  weight: number;
  useMetricUnits: boolean;
  displacement: number;
  usePseudoJoules: boolean;
}

export function calculateJoules({
  reps,
  weight,
  useMetricUnits,
  displacement,
  usePseudoJoules,
}: JoulesCalculationParams): number {
  // Convert weight to kg if needed
  const weightInKg = useMetricUnits ? weight : weight * 0.453592;
  
  // Gravity constant (m/s²)
  const gravity = 9.8;
  
  // Calculate joules
  let joules: number;
  
  if (usePseudoJoules) {
    // Simplified calculation (ignoring displacement)
    joules = weightInKg * gravity * reps;
  } else {
    // Standard calculation with displacement
    joules = weightInKg * gravity * displacement * reps;
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