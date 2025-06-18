import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement, achievements } from "@/constants/achievements";
import { useExerciseStore } from "./use-exercise-store";
import { useSettingsStore } from "./use-settings-store";

export interface UnlockedAchievement {
  id: string;
  unlockedAt: string; // ISO date string
  viewed: boolean;
}

interface AchievementProgress {
  id: string;
  progress: number;
  total: number;
}

interface AchievementState {
  unlockedAchievements: UnlockedAchievement[];
  achievementProgress: AchievementProgress[];
  streakDays: string[]; // ISO date strings of days with logged exercises
  lastCheckedDate: string | null;
  version: number;
  
  // Actions
  unlockAchievement: (id: string) => void;
  markAchievementViewed: (id: string) => void;
  updateProgress: (id: string, progress: number, total: number) => void;
  addStreakDay: (date: string) => void;
  setLastCheckedDate: (date: string) => void;
  resetAchievements: () => void;
  
  // Getters
  isAchievementUnlocked: (id: string) => boolean;
  getUnviewedAchievements: () => UnlockedAchievement[];
  getAchievementProgress: (id: string) => AchievementProgress | undefined;
  getCurrentStreak: () => number;
  getTotalPoints: () => number;
}

// Current version of the store schema
const CURRENT_VERSION = 1;

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],
      achievementProgress: [],
      streakDays: [],
      lastCheckedDate: null,
      version: CURRENT_VERSION,
      
      unlockAchievement: (id: string) => {
        const { unlockedAchievements } = get();
        
        // Check if already unlocked
        if (unlockedAchievements.some(a => a.id === id)) {
          return;
        }
        
        set((state) => ({
          unlockedAchievements: [
            ...state.unlockedAchievements,
            {
              id,
              unlockedAt: new Date().toISOString(),
              viewed: false
            }
          ]
        }));
      },
      
      markAchievementViewed: (id: string) => {
        set((state) => ({
          unlockedAchievements: state.unlockedAchievements.map(a => 
            a.id === id ? { ...a, viewed: true } : a
          )
        }));
      },
      
      updateProgress: (id: string, progress: number, total: number) => {
        const { achievementProgress } = get();
        const existingProgress = achievementProgress.find(p => p.id === id);
        
        if (existingProgress) {
          set((state) => ({
            achievementProgress: state.achievementProgress.map(p => 
              p.id === id ? { ...p, progress, total } : p
            )
          }));
        } else {
          set((state) => ({
            achievementProgress: [
              ...state.achievementProgress,
              { id, progress, total }
            ]
          }));
        }
      },
      
      addStreakDay: (date: string) => {
        const { streakDays } = get();
        
        // Only add if not already in the list
        if (!streakDays.includes(date)) {
          const newStreakDays = [...streakDays, date].sort();
          set({ streakDays: newStreakDays });
        }
      },
      
      setLastCheckedDate: (date: string) => {
        set({ lastCheckedDate: date });
      },
      
      resetAchievements: () => {
        set({
          unlockedAchievements: [],
          achievementProgress: [],
          streakDays: [],
          lastCheckedDate: null,
          version: CURRENT_VERSION
        });
      },
      
      isAchievementUnlocked: (id: string) => {
        return get().unlockedAchievements.some(a => a.id === id);
      },
      
      getUnviewedAchievements: () => {
        return get().unlockedAchievements.filter(a => !a.viewed);
      },
      
      getAchievementProgress: (id: string) => {
        return get().achievementProgress.find(p => p.id === id);
      },
      
      getCurrentStreak: () => {
        const { streakDays } = get();
        if (streakDays.length === 0) return 0;
        
        // Sort dates in ascending order
        const sortedDays = [...streakDays].sort();
        
        // Get today and yesterday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Check if today or yesterday is in the streak
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const hasTodayOrYesterday = sortedDays.includes(todayStr) || sortedDays.includes(yesterdayStr);
        if (!hasTodayOrYesterday) return 0;
        
        // Count consecutive days
        let streak = 1;
        let currentDate = new Date(sortedDays[sortedDays.length - 1]);
        
        for (let i = sortedDays.length - 2; i >= 0; i--) {
          const prevDate = new Date(sortedDays[i]);
          const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            streak++;
            currentDate = prevDate;
          } else if (diffDays > 1) {
            break;
          }
        }
        
        return streak;
      },
      
      getTotalPoints: () => {
        const { unlockedAchievements } = get();
        return unlockedAchievements.reduce((total, { id }) => {
          const achievement = achievements.find(a => a.id === id);
          return total + (achievement?.points || 0);
        }, 0);
      }
    }),
    {
      name: "power-level-achievements",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Check if we need to update from an older version
          if (!state.version || state.version < CURRENT_VERSION) {
            // Reset to defaults if version mismatch
            console.log("Achievement store version mismatch, resetting");
            state.unlockedAchievements = [];
            state.achievementProgress = [];
            state.streakDays = [];
            state.lastCheckedDate = null;
            state.version = CURRENT_VERSION;
          }
        }
      },
    }
  )
);

// Helper function to check achievements and unlock if conditions are met
export function checkAchievements() {
  const { 
    exercises, 
    sets, 
    getTotalJoules 
  } = useExerciseStore.getState();
  
  const { 
    useMetricUnits 
  } = useSettingsStore.getState();
  
  const {
    unlockAchievement,
    isAchievementUnlocked,
    updateProgress,
    addStreakDay,
    getCurrentStreak
  } = useAchievementStore.getState();
  
  const totalJoules = getTotalJoules();
  
  // Add today to streak days if there are sets from today
  const today = new Date().toISOString().split('T')[0];
  const hasExercisesToday = sets.some(set => {
    const setDate = new Date(set.date).toISOString().split('T')[0];
    return setDate === today;
  });
  
  if (hasExercisesToday) {
    addStreakDay(today);
  }
  
  // Get unique exercise IDs from sets
  const uniqueExerciseIds = new Set(sets.map(set => set.exerciseId));
  
  // Get unique categories from exercises
  const uniqueCategories = new Set(
    Array.from(uniqueExerciseIds).map(id => {
      const exercise = exercises.find(e => e.id === id);
      return exercise?.category || "";
    }).filter(Boolean)
  );
  
  // Check each achievement
  achievements.forEach(achievement => {
    // Skip if already unlocked
    if (isAchievementUnlocked(achievement.id)) return;
    
    const { condition } = achievement;
    
    switch (condition.type) {
      case "totalJoules":
        if (totalJoules >= condition.threshold) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, totalJoules, condition.threshold);
        }
        break;
        
      case "exerciseCount":
        const count = condition.exerciseType
          ? sets.filter(set => {
              const exercise = exercises.find(e => e.id === set.exerciseId);
              return exercise?.category === condition.exerciseType;
            }).length
          : uniqueExerciseIds.size;
          
        if (count >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, count, condition.count);
        }
        break;
        
      case "exerciseStreak":
        const streak = getCurrentStreak();
        if (streak >= condition.days) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, streak, condition.days);
        }
        break;
        
      case "specificExercise":
        const exerciseSets = sets.filter(set => set.exerciseId === condition.exerciseId);
        if (exerciseSets.length >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, exerciseSets.length, condition.count);
        }
        break;
        
      case "categoryComplete":
        const categoryExercises = exercises.filter(e => e.category === condition.category);
        const completedCategoryExercises = categoryExercises.filter(e => 
          sets.some(set => set.exerciseId === e.id)
        );
        
        if (categoryExercises.length > 0 && 
            completedCategoryExercises.length === categoryExercises.length) {
          unlockAchievement(achievement.id);
        } else if (categoryExercises.length > 0) {
          updateProgress(
            achievement.id, 
            completedCategoryExercises.length, 
            categoryExercises.length
          );
        }
        break;
        
      case "timeOfDay":
        const hasExerciseAtHour = sets.some(set => {
          const setDate = new Date(set.date);
          return setDate.getHours() < condition.hour;
        });
        
        if (hasExerciseAtHour) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "weekendWarrior":
        const weekendDays = new Set(
          sets.map(set => {
            const setDate = new Date(set.date);
            const day = setDate.getDay();
            // 0 is Sunday, 6 is Saturday
            return day === 0 || day === 6 ? setDate.toISOString().split('T')[0] : null;
          }).filter(Boolean)
        );
        
        if (weekendDays.size >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, weekendDays.size, condition.count);
        }
        break;
        
      case "heavyLifter":
        const heavySet = sets.some(set => {
          const weight = set.weight;
          // Convert if needed
          const adjustedWeight = useMetricUnits === condition.useMetric 
            ? weight 
            : useMetricUnits 
              ? weight * 2.20462 // kg to lbs
              : weight / 2.20462; // lbs to kg
              
          return adjustedWeight >= condition.weight;
        });
        
        if (heavySet) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "perfectSet":
        const perfectSet = sets.some(set => set.reps === condition.reps);
        if (perfectSet) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "allCategories":
        if (uniqueCategories.size >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, uniqueCategories.size, condition.count);
        }
        break;
    }
  });
}