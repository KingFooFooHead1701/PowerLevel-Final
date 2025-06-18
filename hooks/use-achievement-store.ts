import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement, achievements } from "@/constants/achievements";
import { useExerciseStore } from "./use-exercise-store";
import { useSettingsStore } from "./use-settings-store";
import { getPowerTierName } from "@/utils/milestone-utils";

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
  scanCount: number; // Track number of power level scans
  lastUnitSetting: boolean | null; // Track last unit setting (metric or imperial)
  customExerciseCount: number; // Track number of custom exercises added
  lastThemeName: string | null; // Track last theme name
  soundToggled: boolean; // Track if sound has been toggled
  dataReset: boolean; // Track if data has been reset
  displayTapCount: number; // Track number of taps on joules display
  lastTapTime: number; // Track time of last tap
  lastTierName: string | null; // Track last power tier name
  version: number;
  
  // Actions
  unlockAchievement: (id: string) => void;
  markAchievementViewed: (id: string) => void;
  updateProgress: (id: string, progress: number, total: number) => void;
  addStreakDay: (date: string) => void;
  setLastCheckedDate: (date: string) => void;
  incrementScanCount: () => void;
  setLastUnitSetting: (useMetric: boolean) => void;
  incrementCustomExerciseCount: () => void;
  setLastThemeName: (themeName: string) => void;
  setSoundToggled: (toggled: boolean) => void;
  setDataReset: (reset: boolean) => void;
  incrementDisplayTapCount: () => void;
  resetDisplayTapCount: () => void;
  setLastTierName: (tierName: string) => void;
  resetAchievements: () => void;
  
  // Getters
  isAchievementUnlocked: (id: string) => boolean;
  getUnviewedAchievements: () => UnlockedAchievement[];
  getAchievementProgress: (id: string) => AchievementProgress | undefined;
  getCurrentStreak: () => number;
  getTotalPoints: () => number;
}

// Current version of the store schema
const CURRENT_VERSION = 2;

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],
      achievementProgress: [],
      streakDays: [],
      lastCheckedDate: null,
      scanCount: 0,
      lastUnitSetting: null,
      customExerciseCount: 0,
      lastThemeName: null,
      soundToggled: false,
      dataReset: false,
      displayTapCount: 0,
      lastTapTime: 0,
      lastTierName: null,
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
      
      incrementScanCount: () => {
        set((state) => ({
          scanCount: state.scanCount + 1
        }));
      },
      
      setLastUnitSetting: (useMetric: boolean) => {
        set({ lastUnitSetting: useMetric });
      },
      
      incrementCustomExerciseCount: () => {
        set((state) => ({
          customExerciseCount: state.customExerciseCount + 1
        }));
      },
      
      setLastThemeName: (themeName: string) => {
        set({ lastThemeName: themeName });
      },
      
      setSoundToggled: (toggled: boolean) => {
        set({ soundToggled: toggled });
      },
      
      setDataReset: (reset: boolean) => {
        set({ dataReset: reset });
      },
      
      incrementDisplayTapCount: () => {
        const now = Date.now();
        const { lastTapTime, displayTapCount } = get();
        
        // If last tap was more than 2 seconds ago, reset counter
        if (now - lastTapTime > 2000) {
          set({ displayTapCount: 1, lastTapTime: now });
        } else {
          set({ 
            displayTapCount: displayTapCount + 1,
            lastTapTime: now
          });
        }
      },
      
      resetDisplayTapCount: () => {
        set({ displayTapCount: 0, lastTapTime: 0 });
      },
      
      setLastTierName: (tierName: string) => {
        set({ lastTierName: tierName });
      },
      
      resetAchievements: () => {
        set({
          unlockedAchievements: [],
          achievementProgress: [],
          streakDays: [],
          lastCheckedDate: null,
          scanCount: 0,
          lastUnitSetting: null,
          customExerciseCount: 0,
          lastThemeName: null,
          soundToggled: false,
          dataReset: false,
          displayTapCount: 0,
          lastTapTime: 0,
          lastTierName: null,
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
            state.scanCount = 0;
            state.lastUnitSetting = null;
            state.customExerciseCount = 0;
            state.lastThemeName = null;
            state.soundToggled = false;
            state.dataReset = false;
            state.displayTapCount = 0;
            state.lastTapTime = 0;
            state.lastTierName = null;
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
    getTotalJoules,
    isCustomExercise
  } = useExerciseStore.getState();
  
  const { 
    useMetricUnits,
    bodyWeight
  } = useSettingsStore.getState();
  
  const {
    unlockAchievement,
    isAchievementUnlocked,
    updateProgress,
    addStreakDay,
    getCurrentStreak,
    scanCount,
    lastUnitSetting,
    customExerciseCount,
    displayTapCount,
    lastTierName,
    dataReset
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
  
  // Get today's joules
  const todayJoules = sets
    .filter(set => new Date(set.date).toISOString().split('T')[0] === today)
    .reduce((total, set) => total + set.joules, 0);
  
  // Check for body weight exercises
  const bodyWeightExercisesCount = sets.filter(set => {
    const exercise = exercises.find(e => e.id === set.exerciseId);
    return exercise?.requiresBodyWeight;
  }).length;
  
  // Check for isometric exercises
  const isometricExercisesCount = sets.filter(set => {
    const exercise = exercises.find(e => e.id === set.exerciseId);
    return exercise?.isIsometric;
  }).length;
  
  // Check for treadmill exercises with high incline
  const highInclineTreadmill = sets.some(set => {
    const exercise = exercises.find(e => e.id === set.exerciseId);
    return exercise?.name?.toLowerCase().includes("treadmill") && set.incline && set.incline >= 10;
  });
  
  // Check for cardio variety in a single day
  const cardioExercisesToday = new Set();
  sets.forEach(set => {
    const setDate = new Date(set.date).toISOString().split('T')[0];
    if (setDate === today) {
      const exercise = exercises.find(e => e.id === set.exerciseId);
      if (exercise?.isCardio) {
        cardioExercisesToday.add(set.exerciseId);
      }
    }
  });
  
  // Check for all exercise categories in a single day
  const categoriesCompletedToday = new Set();
  sets.forEach(set => {
    const setDate = new Date(set.date).toISOString().split('T')[0];
    if (setDate === today) {
      const exercise = exercises.find(e => e.id === set.exerciseId);
      if (exercise?.category) {
        categoriesCompletedToday.add(exercise.category);
      }
    }
  });
  
  // Check for weekend workout
  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };
  
  // Check for heavy lifter (lifting more than body weight)
  const liftedMoreThanBodyWeight = bodyWeight > 0 && sets.some(set => {
    // Convert weights to same unit if needed
    const setWeightInUserUnits = set.weight;
    const bodyWeightInUserUnits = bodyWeight;
    
    return setWeightInUserUnits > bodyWeightInUserUnits;
  });
  
  // Check for all default exercises completed
  const defaultExerciseIds = exercises
    .filter(e => !isCustomExercise(e.id))
    .map(e => e.id);
  
  const completedDefaultExercises = new Set(
    sets.filter(set => defaultExerciseIds.includes(set.exerciseId))
      .map(set => set.exerciseId)
  );
  
  const allDefaultExercisesCompleted = 
    completedDefaultExercises.size === defaultExerciseIds.length;
  
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
        const currentHour = new Date().getHours();
        const isInTimeRange = condition.endHour 
          ? currentHour >= condition.hour && currentHour < condition.endHour
          : currentHour < condition.hour;
        
        if (isInTimeRange) {
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
        
      case "scanCount":
        if (scanCount >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, scanCount, condition.count);
        }
        break;
        
      case "dailyJoules":
        if (todayJoules >= condition.threshold) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, todayJoules, condition.threshold);
        }
        break;
        
      case "unitSwitch":
        if (lastUnitSetting !== null && lastUnitSetting !== useMetricUnits) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "customExercises":
        if (customExerciseCount >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, customExerciseCount, condition.count);
        }
        break;
        
      case "bodyWeightExercises":
        if (bodyWeightExercisesCount >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, bodyWeightExercisesCount, condition.count);
        }
        break;
        
      case "liftHeavier":
        if (liftedMoreThanBodyWeight) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "isometricExercises":
        if (isometricExercisesCount >= condition.count) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, isometricExercisesCount, condition.count);
        }
        break;
        
      case "treadmillIncline":
        if (highInclineTreadmill) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "cardioVariety":
        if (condition.sameDay) {
          if (cardioExercisesToday.size >= condition.count) {
            unlockAchievement(achievement.id);
          } else {
            updateProgress(achievement.id, cardioExercisesToday.size, condition.count);
          }
        } else {
          // Implementation for non-same-day variety would go here
        }
        break;
        
      case "tierJump":
        // This is checked in the power-level.tsx component
        break;
        
      case "tapDisplay":
        if (displayTapCount >= condition.count) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "allExerciseCategories":
        const allCategories = new Set(exercises.map(e => e.category).filter(Boolean));
        
        if (condition.sameDay) {
          if (categoriesCompletedToday.size === allCategories.size) {
            unlockAchievement(achievement.id);
          } else {
            updateProgress(achievement.id, categoriesCompletedToday.size, allCategories.size);
          }
        } else {
          if (uniqueCategories.size === allCategories.size) {
            unlockAchievement(achievement.id);
          } else {
            updateProgress(achievement.id, uniqueCategories.size, allCategories.size);
          }
        }
        break;
        
      case "weekendWorkout":
        if (isWeekend() && hasExercisesToday) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "dataReset":
        if (dataReset && hasExercisesToday) {
          unlockAchievement(achievement.id);
        }
        break;
        
      case "soundToggle":
        // This is checked in the settings component
        break;
        
      case "themeSwitch":
        // This is checked in the settings component
        break;
        
      case "maxTier":
        // This is checked in the power-level.tsx component
        break;
        
      case "allDefaultExercises":
        if (allDefaultExercisesCompleted) {
          unlockAchievement(achievement.id);
        } else {
          updateProgress(achievement.id, completedDefaultExercises.size, defaultExerciseIds.length);
        }
        break;
    }
  });
}