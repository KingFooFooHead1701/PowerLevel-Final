import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise, defaultExercises } from "@/constants/exercises";
import type { DistanceUnit } from "@/utils/distance-utils";

export interface Set {
  id: string;
  exerciseId: string;
  date: string;
  reps: number;
  weight: number;
  joules: number;
  duration?: number; // in seconds, for isometric exercises
  distance?: number; // in km or miles, for cardio exercises
  distanceUnit?: DistanceUnit; // preserves the unit used when cardio was logged
  speed?: number; // in km/h or mph, for cardio exercises
  incline?: number; // in percent, for treadmill exercises
}

interface ExerciseState {
  exercises: Exercise[];
  sets: Set[];
  isLoading: boolean;
  version: number; // Add version tracking
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  removeExercise: (id: string) => void;
  addSet: (set: Set) => void;
  removeSet: (id: string) => void;
  getTotalJoules: () => number;
  resetToDefaults: () => void; // Add reset function
}

// Current version of the store schema. Older persisted data is upgraded in place.
const CURRENT_VERSION = 5;

export const useExerciseStore = create<ExerciseState>()(
  persist(
    (set, get) => ({
      exercises: defaultExercises,
      sets: [],
      isLoading: true,
      version: CURRENT_VERSION,
      
      addExercise: (exercise) => 
        set((state) => ({
          exercises: [...state.exercises, exercise],
        })),
      
      updateExercise: (id, updatedExercise) =>
        set((state) => ({
          exercises: state.exercises.map((exercise) =>
            exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
          ),
        })),
      
      removeExercise: (id) =>
        set((state) => ({
          exercises: state.exercises.filter((exercise) => exercise.id !== id),
          sets: state.sets.filter((set) => set.exerciseId !== id),
        })),
      
      addSet: (newSet) =>
        set((state) => ({
          sets: [newSet, ...state.sets],
        })),
      
      removeSet: (id) =>
        set((state) => ({
          sets: state.sets.filter((set) => set.id !== id),
        })),
      
      getTotalJoules: () => {
        const { sets } = get();
        return sets.reduce((total, set) => total + set.joules, 0);
      },
      
      resetToDefaults: () => 
        set({
          exercises: defaultExercises,
          sets: [],
          version: CURRENT_VERSION,
        }),
    }),
    {
      name: "power-level-data",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Keep saved workouts and custom exercises when upgrading older data.
          if (!state.version || state.version < CURRENT_VERSION) {
            console.log("Upgrading persisted workout data");
            state.version = CURRENT_VERSION;
          }
          state.isLoading = false;
        }
      },
    }
  )
);

// Add a function to clear all app data (for development/testing)
export const clearAllAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All app data cleared successfully");
  } catch (error) {
    console.error("Error clearing app data:", error);
  }
};
