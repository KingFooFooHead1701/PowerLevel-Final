import { useExerciseStore } from "@/hooks/use-exercise-store";
import { milestones } from "@/constants/milestones";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { calculateSetEnergy } from "@/utils/energy-utils";

// Function to calculate total energy from all sets
export function calculateTotalEnergy(): number {
  const { sets } = useExerciseStore.getState();
  
  // Calculate total energy in joules
  return sets.reduce((totalEnergy, set) => {
    return totalEnergy + calculateSetEnergy(set.weight, set.reps);
  }, 0);
}

// Function to check if a milestone has been reached
export function checkMilestone(milestoneId: string): boolean {
  const totalEnergy = calculateTotalEnergy();
  
  // Find the milestone
  const milestone = milestones.find(m => m.id === milestoneId);
  if (!milestone) return false;
  
  // Check if total energy exceeds the milestone threshold
  return totalEnergy >= milestone.threshold_j;
}

// Function to check all milestones and update achievements
export function checkMilestones(): void {
  const { unlockAchievement } = useAchievementStore.getState();
  const totalEnergy = calculateTotalEnergy();
  
  // Check each milestone
  milestones.forEach(milestone => {
    // If total energy exceeds the milestone threshold, unlock the achievement
    if (totalEnergy >= milestone.threshold_j) {
      unlockAchievement(milestone.id);
    }
  });
}

// Function to get consecutive workout days
export function getConsecutiveDays(): number {
  const { sets } = useExerciseStore.getState();
  
  if (sets.length === 0) return 0;
  
  // Get all unique dates
  const dates = [...new Set(sets.map(set => set.date))];
  
  // Sort dates in ascending order
  dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  // Check for consecutive days
  let maxConsecutive = 1;
  let currentConsecutive = 1;
  
  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);
    
    // Check if dates are consecutive
    const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentConsecutive++;
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
    } else {
      currentConsecutive = 1;
    }
  }
  
  return maxConsecutive;
}

// Function to get total number of unique exercises performed
export function getUniqueExercisesCount(): number {
  const { sets } = useExerciseStore.getState();
  
  if (sets.length === 0) return 0;
  
  // Count unique exercises
  const uniqueExercises = new Set(sets.map(set => set.exerciseId));
  return uniqueExercises.size;
}

// Function to get total weight lifted
export function getTotalWeight(): number {
  const { sets } = useExerciseStore.getState();
  
  return sets.reduce((total, set) => total + (set.weight * set.reps), 0);
}

// Function to get total number of reps
export function getTotalReps(): number {
  const { sets } = useExerciseStore.getState();
  
  return sets.reduce((total, set) => total + set.reps, 0);
}

// Power tier names and thresholds
const powerTiers = [
  { name: "Novice", threshold: 0 },
  { name: "Beginner", threshold: 5000 },
  { name: "Intermediate", threshold: 20000 },
  { name: "Advanced", threshold: 50000 },
  { name: "Expert", threshold: 100000 },
  { name: "Master", threshold: 250000 },
  { name: "Elite", threshold: 500000 },
  { name: "Legendary", threshold: 1000000 },
  { name: "Mythical", threshold: 2000000 },
  { name: "Godlike", threshold: 5000000 }
];

// Function to get power tier name based on total energy
export function getPowerTierName(totalJoules: number): string {
  // Find the highest tier that the user has reached
  for (let i = powerTiers.length - 1; i >= 0; i--) {
    if (totalJoules >= powerTiers[i].threshold) {
      return powerTiers[i].name;
    }
  }
  
  // Default to the lowest tier
  return powerTiers[0].name;
}

// Function to get the next power tier
export function getNextPowerTier(totalJoules: number): { name: string; threshold: number; progress: number } {
  // Find the next tier that the user hasn't reached yet
  for (let i = 0; i < powerTiers.length; i++) {
    if (totalJoules < powerTiers[i].threshold) {
      const prevThreshold = i > 0 ? powerTiers[i - 1].threshold : 0;
      const progress = (totalJoules - prevThreshold) / (powerTiers[i].threshold - prevThreshold);
      
      return {
        name: powerTiers[i].name,
        threshold: powerTiers[i].threshold,
        progress: Math.min(Math.max(progress, 0), 1) // Ensure progress is between 0 and 1
      };
    }
  }
  
  // If user has reached the highest tier
  const lastTier = powerTiers[powerTiers.length - 1];
  return {
    name: "Beyond " + lastTier.name,
    threshold: lastTier.threshold,
    progress: 1
  };
}