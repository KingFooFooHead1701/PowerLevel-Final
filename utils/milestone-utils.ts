import { milestones, getCurrentMilestone, getNextMilestone } from "@/constants/milestones";

// Check if a new milestone has been reached
export function checkMilestone(totalJoules: number, previousJoules: number = 0): string | null {
  // Get the milestone before adding the set
  const previousMilestone = getCurrentMilestone(previousJoules);
  const previousMilestoneId = previousMilestone?.id || 0;
  
  // Get the milestone after adding the set
  const currentMilestone = getCurrentMilestone(totalJoules);
  const currentMilestoneId = currentMilestone?.id || 0;
  
  // If we've crossed a milestone boundary
  if (currentMilestoneId > previousMilestoneId && currentMilestone) {
    return currentMilestone.name;
  }
  
  return null;
}

// Get the current power tier name
export function getPowerTierName(totalJoules: number): string {
  const milestone = getCurrentMilestone(totalJoules);
  
  if (!milestone) {
    return "Untrained"; // Not reached first milestone yet
  }
  
  return milestone.name;
}