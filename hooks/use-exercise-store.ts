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
}

interface ExerciseState {
  exercises: Exercise[];
  sets: Set[];
  isLoading: boolean;
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
      exercises: defaultExercises,
      sets: [],
      isLoading: true,
      
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
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    }
  )
);