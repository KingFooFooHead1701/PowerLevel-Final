import { formatEnergy } from "@/utils/energy-utils";

// Step size between milestone levels in joules
export const MILESTONE_STEP_J = 150000; // 150 kJ

// Materials in ascending order
const MATERIALS = [
  "Dust",
  "Sand",
  "Gravel",
  "Pebble",
  "Stone",
  "Iron",
  "Bronze",
  "Steel",
  "Titanium",
  "Adamantium",
  "Mythril",
  "Orichalcum",
  "Drakonium",
  "Celestium",
  "Aetherium"
];

// Ranks in ascending order
const RANKS = [
  "Initiate",
  "Adept",
  "Warrior",
  "Soldier",
  "Gladiator",
  "Champion",
  "Overlord",
  "Warlord",
  "Conqueror",
  "Vanquisher",
  "Juggernaut",
  "Colossus",
  "Leviathan",
  "Titan",
  "Behemoth",
  "Battlemaster",
  "Warbringer",
  "Ravager",
  "Supreme",
  "Apex"
];

export interface Milestone {
  id: number;
  name: string;
  threshold_j: number;
  material: string;
  rank: string;
}

// Generate all 300 milestones
export const milestones: Milestone[] = [];

let id = 1;
for (let materialIndex = 0; materialIndex < MATERIALS.length; materialIndex++) {
  const material = MATERIALS[materialIndex];
  
  for (let rankIndex = 0; rankIndex < RANKS.length; rankIndex++) {
    const rank = RANKS[rankIndex];
    const threshold_j = id * MILESTONE_STEP_J;
    
    milestones.push({
      id,
      name: `${material} ${rank}`,
      threshold_j,
      material,
      rank
    });
    
    id++;
  }
}

// Get the current milestone based on total joules
export function getCurrentMilestone(totalJoules: number): Milestone | null {
  if (totalJoules < milestones[0].threshold_j) {
    return null; // Not reached first milestone yet
  }
  
  // Find the highest milestone that has been reached
  for (let i = milestones.length - 1; i >= 0; i--) {
    if (totalJoules >= milestones[i].threshold_j) {
      return milestones[i];
    }
  }
  
  return null;
}

// Get the next milestone based on total joules
export function getNextMilestone(totalJoules: number): Milestone | null {
  // Find the next milestone that has not been reached
  for (let i = 0; i < milestones.length; i++) {
    if (totalJoules < milestones[i].threshold_j) {
      return milestones[i];
    }
  }
  
  return null; // Already at max milestone
}

// Get progress percentage toward the next milestone
export function getMilestoneProgress(totalJoules: number): number {
  const currentMilestone = getCurrentMilestone(totalJoules);
  const nextMilestone = getNextMilestone(totalJoules);
  
  if (!nextMilestone) {
    return 100; // Already at max milestone
  }
  
  const currentThreshold = currentMilestone ? currentMilestone.threshold_j : 0;
  const nextThreshold = nextMilestone.threshold_j;
  
  // Calculate progress percentage
  const progress = ((totalJoules - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  
  return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
}

// Format the remaining joules to next milestone
export function getRemainingToNextMilestone(totalJoules: number): string {
  const nextMilestone = getNextMilestone(totalJoules);
  
  if (!nextMilestone) {
    return "Max level reached";
  }
  
  const remaining = nextMilestone.threshold_j - totalJoules;
  return formatEnergy(remaining).abbreviated;
}