import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { achievements } from "@/constants/achievements";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { 
  getConsecutiveDays, 
  getUniqueExercisesCount, 
  getTotalWeight, 
  getTotalReps,
  calculateTotalEnergy
} from "@/utils/milestone-utils";

export interface AchievementState {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
  isAchievementUnlocked: (id: string) => boolean;
  resetAchievements: () => void;
  getTotalPoints: () => number;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],
      
      unlockAchievement: (id) => {
        // Only add if not already unlocked
        if (!get().unlockedAchievements.includes(id)) {
          set((state) => ({
            unlockedAchievements: [...state.unlockedAchievements, id],
          }));
        }
      },
      
      isAchievementUnlocked: (id) => {
        return get().unlockedAchievements.includes(id);
      },
      
      resetAchievements: () => {
        set({ unlockedAchievements: [] });
      },
      
      getTotalPoints: () => {
        const { unlockedAchievements } = get();
        
        return unlockedAchievements.reduce((total, id) => {
          const achievement = achievements.find(a => a.id === id);
          return total + (achievement?.points || 0);
        }, 0);
      },
    }),
    {
      name: "achievements",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Function to check all achievements and unlock them if conditions are met
export function checkAchievements(): void {
  const { unlockAchievement } = useAchievementStore.getState();
  
  // Get necessary data
  const totalEnergy = calculateTotalEnergy();
  const consecutiveDays = getConsecutiveDays();
  const uniqueExercises = getUniqueExercisesCount();
  const totalWeight = getTotalWeight();
  const totalReps = getTotalReps();
  
  // Check each achievement
  achievements.forEach(achievement => {
    let isUnlocked = false;
    
    switch (achievement.type) {
      case "energy":
        isUnlocked = totalEnergy >= achievement.threshold;
        break;
      case "consecutive_days":
        isUnlocked = consecutiveDays >= achievement.threshold;
        break;
      case "unique_exercises":
        isUnlocked = uniqueExercises >= achievement.threshold;
        break;
      case "total_weight":
        isUnlocked = totalWeight >= achievement.threshold;
        break;
      case "total_reps":
        isUnlocked = totalReps >= achievement.threshold;
        break;
      // Add more achievement types as needed
    }
    
    if (isUnlocked) {
      unlockAchievement(achievement.id);
    }
  });
}