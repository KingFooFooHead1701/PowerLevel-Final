import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise, defaultExercises } from "@/constants/exercises";

// Current schema version - increment this when making breaking changes to data structure
const SCHEMA_VERSION = 2;

export interface Set {
  id: string;
  exerciseId: string;
  date: string;
  reps: number;
  weight: number;
  joules: number;
  duration?: number; // in seconds, for isometric exercises
  distance?: number; // in km or miles, for cardio exercises
  speed?: number; // in km/h or mph, for cardio exercises
  incline?: number; // in percent, for treadmill exercises
}

interface ExerciseState {
  exercises: Exercise[];
  sets: Set[];
  isLoading: boolean;
  schemaVersion: number;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  removeExercise: (id: string) => void;
  addSet: (set: Set) => void;
  removeSet: (id: string) => void;
  getTotalJoules: () => number;
}

export const useExerciseStore = create<ExerciseState>()(
  persist(
    (set, get) => ({
      exercises: [],
      sets: [],
      isLoading: true,
      schemaVersion: SCHEMA_VERSION,
      
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
    }),
    {
      name: "power-level-data",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => async (state) => {
        if (state) {
          // Check if schema version has changed
          if (!state.schemaVersion || state.schemaVersion !== SCHEMA_VERSION) {
            // Schema version has changed, seed with default exercises
            state.exercises = defaultExercises;
            state.schemaVersion = SCHEMA_VERSION;
            
            // Store the current schema version in AsyncStorage
            await AsyncStorage.setItem('exVersion', SCHEMA_VERSION.toString());
          }
          
          state.isLoading = false;
        } else {
          // First time initialization (no state)
          const storedVersion = await AsyncStorage.getItem('exVersion');
          
          if (storedVersion !== SCHEMA_VERSION.toString()) {
            // Either first run or schema version changed
            await AsyncStorage.setItem('exVersion', SCHEMA_VERSION.toString());
          }
        }
      },
    }
  )
);