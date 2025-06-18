import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Achievement, achievements } from "@/constants/achievements";

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
  // Implementation will depend on your achievement logic
  console.log("Checking achievements...");
}