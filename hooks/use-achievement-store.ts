// hooks/use-achievement-store.ts
import { create } from 'zustand'
import { achievements } from '@/constants/achievements'
import { useExerciseStore } from '@/hooks/use-exercise-store'
import { useSettingsStore } from '@/hooks/use-settings-store'

interface AchievementState {
  unlockedIds: string[]
  evaluateAchievements: () => void
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  unlockedIds: [],

  evaluateAchievements: () => {
    const { unlockedIds } = get()
    const { sets } = useExerciseStore.getState()
    const { useMetricUnits } = useSettingsStore.getState()

    const newlyUnlocked = achievements.reduce<string[]>((acc, a) => {
      if (acc.includes(a.id)) return acc

      // 🎯 Your real logic for each achievement goes here. 
      // Example for first_workout:
      if (a.id === 'first_workout' && sets.length > 0) {
        acc.push(a.id)
      }

      // …and so on for each a.id…

      return acc
    }, [...unlockedIds])

    if (newlyUnlocked.length !== unlockedIds.length) {
      set({ unlockedIds: newlyUnlocked })
    }
  },
}))
