// Constants for energy calculations
const GRAVITY = 9.81; // m/s²
const AVERAGE_LIFT_HEIGHT = 0.5; // meters
const EFFICIENCY_FACTOR = 0.8; // 80% efficiency

// Convert weight from kg to newtons
export function kgToNewtons(weightKg: number): number {
  return weightKg * GRAVITY;
}

// Calculate work done for a single rep in joules (W = F × d)
export function calculateWorkPerRep(weightKg: number): number {
  const force = kgToNewtons(weightKg);
  return force * AVERAGE_LIFT_HEIGHT * EFFICIENCY_FACTOR;
}

// Calculate total energy for a set in joules
export function calculateSetEnergy(weightKg: number, reps: number): number {
  const workPerRep = calculateWorkPerRep(weightKg);
  return workPerRep * reps;
}

// Format energy values for display
export function formatEnergy(joules: number): { full: string; abbreviated: string } {
  if (joules < 1000) {
    return {
      full: `${joules.toFixed(0)} J`,
      abbreviated: `${joules.toFixed(0)} J`
    };
  } else if (joules < 1000000) {
    const kJ = joules / 1000;
    return {
      full: `${kJ.toFixed(1)} kilojoules`,
      abbreviated: `${kJ.toFixed(1)} kJ`
    };
  } else {
    const MJ = joules / 1000000;
    return {
      full: `${MJ.toFixed(2)} megajoules`,
      abbreviated: `${MJ.toFixed(2)} MJ`
    };
  }
}

// Calculate calories from joules (1 calorie = 4.184 joules)
export function joulesToCalories(joules: number): number {
  return joules / 4.184;
}

// Format calories for display
export function formatCalories(calories: number): string {
  if (calories < 1000) {
    return `${calories.toFixed(0)} cal`;
  } else {
    return `${(calories / 1000).toFixed(1)} kcal`;
  }
}