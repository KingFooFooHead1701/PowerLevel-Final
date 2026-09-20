import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise, defaultExercises } from "@/constants/exercises";

export interface Set {
  id: string;
  exerciseId: string;
  date: string;
  reps: number;
  weight: number;
  joules: number;
  duration?: number; // seconds
  distance?: number; // km or miles
  distanceUnit?: "km" | "mi";
  speed?: number; // km/h or mph
  speedUnit?: "kmh" | "mph";
  incline?: number; // percent
  watts?: number;
  assistance?: number; // kg or lb, matching user's unit setting at log time
  verticalDistance?: number; // meters or feet
  verticalDistanceUnit?: "m" | "ft";
}

interface ExerciseState {
  exercises: Exercise[];
  sets: Set[];
  isLoading: boolean;
  version: number;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  removeExercise: (id: string) => void;
  addSet: (set: Set) => void;
  removeSet: (id: string) => void;
  getTotalJoules: () => number;
  resetToDefaults: () => void;
}

// v6 = comprehensive catalog + calculation-family metadata.
// Unlike earlier migrations, v6 preserves workout history.
const CURRENT_VERSION = 6;

const isCustomExercise = (exercise: Exercise) =>
  exercise.category === "Custom" || exercise.id.startsWith("custom-");

const mergeCatalogPreservingCustom = (persisted: Exercise[] | undefined) => {
  const custom = (persisted ?? []).filter(isCustomExercise);
  const customIds = new Set(custom.map((exercise) => exercise.id));

  return [
    ...defaultExercises.filter((exercise) => !customIds.has(exercise.id)),
    ...custom,
  ];
};

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
          sets: state.sets.filter((loggedSet) => loggedSet.exerciseId !== id),
        })),

      addSet: (newSet) =>
        set((state) => ({
          sets: [newSet, ...state.sets],
        })),

      removeSet: (id) =>
        set((state) => ({
          sets: state.sets.filter((loggedSet) => loggedSet.id !== id),
        })),

      getTotalJoules: () =>
        get().sets.reduce((total, loggedSet) => total + loggedSet.joules, 0),

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
        if (!state) return;

        // Refresh built-ins and aliases while preserving custom exercises and
        // every historical set. Old releases reset sets on schema mismatch;
        // this migration intentionally does not.
        state.exercises = mergeCatalogPreservingCustom(state.exercises);
        state.version = CURRENT_VERSION;
        state.isLoading = false;
      },
    }
  )
);

export const clearAllAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All app data cleared successfully");
  } catch (error) {
    console.error("Error clearing app data:", error);
  }
};
