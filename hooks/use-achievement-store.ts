// hooks/use-achievement-store.ts

import { create } from 'zustand'
import { achievements } from '@/constants/achievements'
import { useExerciseStore } from '@/hooks/use-exercise-store'
import { calculateJoules } from '@/utils/energy-utils'

interface AchievementState {
  unlockedIds: string[]
  evaluateAchievements: () => void
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  unlockedIds: [],

  evaluateAchievements: () => {
    const { unlockedIds } = get()
    const {
      sets,
      exercises,
      getTotalJoules,
      useMetricUnits,
      usePseudoJoules,
      bodyWeight
    } = useExerciseStore.getState()

    const totalJoules = getTotalJoules()
    const totalLiftedUnits = sets.reduce(
      (sum, s) => sum + (s.weight || 0) * (s.reps || 0),
      0
    )
    const totalIsometricSeconds = sets.reduce(
      (sum, s) => sum + (s.duration || 0),
      0
    )

    const newlyUnlocked: string[] = []

    achievements.forEach(a => {
      if (unlockedIds.includes(a.id)) return

      switch (a.id) {
        case 'first_workout':
          if (sets.length > 0) newlyUnlocked.push(a.id)
          break

        case 'first_strength':
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex != null && !ex.isCardio && !ex.isIsometric
            })
          ) newlyUnlocked.push(a.id)
          break

        case 'first_cardio':
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex != null && ex.isCardio
            })
          ) newlyUnlocked.push(a.id)
          break

        case 'first_isometric':
          if (sets.some(s => (s.duration || 0) > 0)) newlyUnlocked.push(a.id)
          break

        case 'ten_sets':
          if (sets.length >= 10) newlyUnlocked.push(a.id)
          break

        case 'fifty_sets':
          if (sets.length >= 50) newlyUnlocked.push(a.id)
          break

        case 'hundred_sets':
          if (sets.length >= 100) newlyUnlocked.push(a.id)
          break

        case 'total_reps_500':
          if (
            sets.reduce((sum, s) => sum + (s.reps || 0), 0) >= 500
          ) newlyUnlocked.push(a.id)
          break

        case 'total_reps_1000':
          if (
            sets.reduce((sum, s) => sum + (s.reps || 0), 0) >= 1000
          ) newlyUnlocked.push(a.id)
          break

        case 'total_isometric_600':
          if (totalIsometricSeconds >= 600) newlyUnlocked.push(a.id)
          break

        case 'single_set_high_joule': {
          const hit = sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId)
            if (!ex) return false
            const joules = calculateJoules({
              reps: s.reps || 0,
              weight: s.weight || 0,
              useMetricUnits,
              displacement: ex.displacement,
              usePseudoJoules,
              exercise: ex,
              bodyWeight,
              distance: s.distance || 0,
              speed: s.speed || 0,
              incline: s.incline || 0,
              duration: s.duration || 0
            })
            return joules >= 10000
          })
          if (hit) newlyUnlocked.push(a.id)
          break
        }

        case 'single_set_ultra_joule': {
          const hit = sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId)
            if (!ex) return false
            const joules = calculateJoules({
              reps: s.reps || 0,
              weight: s.weight || 0,
              useMetricUnits,
              displacement: ex.displacement,
              usePseudoJoules,
              exercise: ex,
              bodyWeight,
              distance: s.distance || 0,
              speed: s.speed || 0,
              incline: s.incline || 0,
              duration: s.duration || 0
            })
            return joules >= 50000
          })
          if (hit) newlyUnlocked.push(a.id)
          break
        }

        case 'treadmill_incline_10':
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return (
                ex?.isCardio &&
                ex.name.toLowerCase().includes('treadmill') &&
                (s.incline || 0) >= 10
              )
            })
          ) newlyUnlocked.push(a.id)
          break

        // cumulative 5K
        case 'total_cardio_5k': {
          const totalDistance = sets
            .filter(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio
            })
            .reduce((sum, s) => sum + (s.distance || 0), 0)
          const threshold = useMetricUnits ? 5 : 3.1
          if (totalDistance >= threshold) newlyUnlocked.push(a.id)
          break
        }

        // single 5K
        case 'single_cardio_5k': {
          const threshold = useMetricUnits ? 5 : 3.1
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        // Half-Marathon Hero
        case 'single_cardio_half_marathon': {
          const threshold = useMetricUnits ? 21.0975 : 13.1
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        // Marathon Master
        case 'single_cardio_marathon': {
          const threshold = useMetricUnits ? 42.195 : 26.2
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        // 50K Ultramarathon Runner
        case 'single_cardio_50k': {
          const threshold = useMetricUnits ? 50 : 31
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        // 50-Mile Ultramarathon Runner
        case 'single_cardio_50mi': {
          // 50 mi ≈ 80.5 km
          const threshold = useMetricUnits ? 80.5 : 50
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        // 100K Ultramarathon Runner
        case 'single_cardio_100k': {
          const threshold = useMetricUnits ? 100 : 62
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        // 100-Mile Ultramarathon Runner
        case 'single_cardio_100mi': {
          // 100 mi ≈ 161 km
          const threshold = useMetricUnits ? 161 : 100
          if (
            sets.some(s => {
              const ex = exercises.find(e => e.id === s.exerciseId)
              return ex?.isCardio && (s.distance || 0) >= threshold
            })
          ) newlyUnlocked.push(a.id)
          break
        }

        default:
          if (a.id.startsWith('total_weight_')) {
            const thresholdUnits = parseInt(a.id.split('_')[2], 10)
            if (totalLiftedUnits >= thresholdUnits) {
              newlyUnlocked.push(a.id)
            }
          }
          break
      }
    })

    if (newlyUnlocked.length > 0) {
      set({ unlockedIds: [...unlockedIds, ...newlyUnlocked] })
    }
  },
}))
