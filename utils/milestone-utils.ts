import { useExerciseStore } from "@/hooks/use-exercise-store";
import { milestones } from "@/constants/milestones";
import { useAchievementStore } from "@/hooks/use-achievement-store";

// Function to check if a milestone has been reached
export function checkMilestone(milestoneId: string): boolean {
  const { sets } = useExerciseStore.getState();
  const { exercises } = useExerciseStore.getState();
  
  // Find the milestone
  const milestone = milestones.find(m => m.id === milestoneId);
  if (!milestone) return false;
  
  // Check milestone conditions
  switch (milestone.type) {
    case "total_sets": {
      const totalSets = sets.length;
      return totalSets >= milestone.threshold;
    }
    
    case "total_weight": {
      const totalWeight = sets.reduce((sum, set) => sum + set.weight, 0);
      return totalWeight >= milestone.threshold;
    }
    
    case "total_reps": {
      const totalReps = sets.reduce((sum, set) => sum + set.reps, 0);
      return totalReps >= milestone.threshold;
    }
    
    case "exercise_count": {
      // Count unique exercises that have been logged
      const uniqueExercises = new Set(sets.map(set => set.exerciseId));
      return uniqueExercises.size >= milestone.threshold;
    }
    
    case "consecutive_days": {
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
      
      return maxConsecutive >= milestone.threshold;
    }
    
    case "specific_exercise": {
      if (!milestone.exerciseId) return false;
      
      // Count sets for the specific exercise
      const exerciseSets = sets.filter(set => set.exerciseId === milestone.exerciseId);
      return exerciseSets.length >= milestone.threshold;
    }
    
    case "category_sets": {
      if (!milestone.category) return false;
      
      // Get all exercise IDs in the category
      const categoryExerciseIds = exercises
        .filter(exercise => exercise.category === milestone.category)
        .map(exercise => exercise.id);
      
      // Count sets for exercises in the category
      const categorySets = sets.filter(set => categoryExerciseIds.includes(set.exerciseId));
      return categorySets.length >= milestone.threshold;
    }
    
    case "max_weight": {
      if (!milestone.exerciseId) return false;
      
      // Find the maximum weight for the specific exercise
      const exerciseSets = sets.filter(set => set.exerciseId === milestone.exerciseId);
      if (exerciseSets.length === 0) return false;
      
      const maxWeight = Math.max(...exerciseSets.map(set => set.weight));
      return maxWeight >= milestone.threshold;
    }
    
    default:
      return false;
  }
}

// Function to check all milestones and update achievements
export function checkMilestones() {
  const { unlockAchievement } = useAchievementStore.getState();
  
  // Check each milestone
  milestones.forEach(milestone => {
    const isReached = checkMilestone(milestone.id);
    
    // If milestone is reached, unlock the corresponding achievement
    if (isReached) {
      unlockAchievement(milestone.id);
    }
  });
}