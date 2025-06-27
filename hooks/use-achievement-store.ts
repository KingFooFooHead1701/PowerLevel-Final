// hooks/use-achievement-store.ts

import { create } from 'zustand';
import { achievements } from '@/constants/achievements';
import { useExerciseStore } from '@/hooks/use-exercise-store';
import { calculateJoules } from '@/utils/energy-utils';

interface AchievementState {
  unlockedIds: string[];
  firstEval: boolean;
  evaluateAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  unlockedIds: [],
  firstEval: true,

  evaluateAchievements: () => {
    const { unlockedIds, firstEval } = get();
    const {
      sets,
      exercises,
      getTotalJoules,
      useMetricUnits,
      usePseudoJoules,
      bodyWeight,
    } = useExerciseStore.getState();

    const totalJoules = getTotalJoules();
    const totalLiftedUnits = sets.reduce(
      (sum, s) => sum + (s.weight || 0) * (s.reps || 0),
      0
    );
    const totalIsometricSeconds = sets.reduce(
      (sum, s) => sum + (s.duration || 0),
      0
    );

    const totalPushups = sets
      .filter(s => s.exerciseId === 'push-up')
      .reduce((sum, s) => sum + (s.reps || 0), 0);
    const totalSquats = sets
      .filter(s => s.exerciseId === 'squat')
      .reduce((sum, s) => sum + (s.reps || 0), 0);
    const totalCrunches = sets
      .filter(s => s.exerciseId === 'crunch')
      .reduce((sum, s) => sum + (s.reps || 0), 0);

    const newlyUnlocked: string[] = [];

    achievements.forEach(a => {
      if (unlockedIds.includes(a.id)) return;

      switch (a.id) {
        case 'first_workout':
          if (sets.length > 0) newlyUnlocked.push(a.id);
          break;

        case 'first_strength':
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex != null && !ex.isCardio && !ex.isIsometric;
          })) newlyUnlocked.push(a.id);
          break;

        case 'first_cardio':
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex != null && ex.isCardio;
          })) newlyUnlocked.push(a.id);
          break;

        case 'first_isometric':
          if (sets.some(s => (s.duration || 0) > 0)) newlyUnlocked.push(a.id);
          break;

        case 'ten_sets':
          if (sets.length >= 10) newlyUnlocked.push(a.id);
          break;

        case 'fifty_sets':
          if (sets.length >= 50) newlyUnlocked.push(a.id);
          break;

        case 'hundred_sets':
          if (sets.length >= 100) newlyUnlocked.push(a.id);
          break;

        case 'total_reps_500':
          if (sets.reduce((sum, s) => sum + (s.reps || 0), 0) >= 500)
            newlyUnlocked.push(a.id);
          break;

        case 'total_reps_1000':
          if (sets.reduce((sum, s) => sum + (s.reps || 0), 0) >= 1000)
            newlyUnlocked.push(a.id);
          break;

        case 'total_isometric_600':
          if (totalIsometricSeconds >= 600) newlyUnlocked.push(a.id);
          break;

        case 'treadmill_incline_10':
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio
              && ex.name.toLowerCase().includes('treadmill')
              && (s.incline || 0) >= 10;
          })) newlyUnlocked.push(a.id);
          break;

        case 'total_cardio_5k': {
          const totalDistance = sets
            .filter(s => {
              const ex = exercises.find(e => e.id === s.exerciseId);
              return ex?.isCardio;
            })
            .reduce((sum, s) => sum + (s.distance || 0), 0);
          const threshold = useMetricUnits ? 5 : 3.1;
          if (totalDistance >= threshold) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_5k': {
          const threshold = useMetricUnits ? 5 : 3.1;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_half_marathon': {
          const threshold = useMetricUnits ? 21.0975 : 13.1;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_marathon': {
          const threshold = useMetricUnits ? 42.195 : 26.2;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_50k': {
          const threshold = useMetricUnits ? 50 : 31;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_50mi': {
          const threshold = useMetricUnits ? 80.5 : 50;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_100k': {
          const threshold = useMetricUnits ? 100 : 62;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        case 'single_cardio_100mi': {
          const threshold = useMetricUnits ? 161 : 100;
          if (sets.some(s => {
            const ex = exercises.find(e => e.id === s.exerciseId);
            return ex?.isCardio && (s.distance || 0) >= threshold;
          })) newlyUnlocked.push(a.id);
          break;
        }

        // squat tiers
        case 'total_reps_squat_100':
          if (totalSquats >= 100) newlyUnlocked.push(a.id);
          break;
        case 'total_reps_squat_250':
          if (totalSquats >= 250) newlyUnlocked.push(a.id);
          break;
        case 'total_reps_squat_500':
          if (totalSquats >= 500) newlyUnlocked.push(a.id);
          break;
        case 'total_reps_squat_1000':
          if (totalSquats >= 1000) newlyUnlocked.push(a.id);
          break;
        case 'total_reps_squat_2500':
          if (totalSquats >= 2500) newlyUnlocked.push(a.id);
          break;
        case 'total_reps_squat_5000':
          if (totalSquats >= 5000) newlyUnlocked.push(a.id);
          break;

        // push-up tiers
        case 'total_pushups_100':
          if (totalPushups >= 100) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_250':
          if (totalPushups >= 250) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_500':
          if (totalPushups >= 500) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_1000':
          if (totalPushups >= 1000) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_2500':
          if (totalPushups >= 2500) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_5000':
          if (totalPushups >= 5000) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_10000':
          if (totalPushups >= 10000) newlyUnlocked.push(a.id);
          break;
        case 'total_pushups_50000':
          if (totalPushups >= 50000) newlyUnlocked.push(a.id);
          break;

        // crunch tiers
        case 'total_crunches_100':
          if (totalCrunches >= 100) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_250':
          if (totalCrunches >= 250) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_500':
          if (totalCrunches >= 500) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_1000':
          if (totalCrunches >= 1000) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_2500':
          if (totalCrunches >= 2500) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_5000':
          if (totalCrunches >= 5000) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_10000':
          if (totalCrunches >= 10000) newlyUnlocked.push(a.id);
          break;
        case 'total_crunches_50000':
          if (totalCrunches >= 50000) newlyUnlocked.push(a.id);
          break;

        default:
          if (a.id.startsWith('total_weight_')) {
            const thresholdUnits = parseInt(a.id.split('_')[2], 10);
            if (totalLiftedUnits >= thresholdUnits) {
              newlyUnlocked.push(a.id);
            }
          }
      }
    });

    // mark that we've now run once
    if (firstEval) {
      set({ firstEval: false });
    }

    if (newlyUnlocked.length > 0) {
      set({ unlockedIds: [...unlockedIds, ...newlyUnlocked] });
    }
  },
}));
