import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultExercises } from "@/constants/exercises";
import { checkMilestones } from "@/utils/milestone-utils";
import { checkAchievements } from "@/hooks/use-achievement-store";

// Types
export interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  instructions: string[];
  muscles: string[];
  equipment: string[];
  isCustom?: boolean;
}

export interface ExerciseSet {
  id: string;
  exerciseId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  reps: number;
  weight: number;
  timestamp: number; // Unix timestamp
  notes?: string;
}

export interface ExerciseState {
  exercises: Exercise[];
  sets: ExerciseSet[];
  
  // Exercise actions
  addExercise: (exercise: Omit<Exercise, "id">) => string;
  updateExercise: (id: string, updates: Partial<Omit<Exercise, "id">>) => void;
  deleteExercise: (id: string) => void;
  getExerciseById: (id: string) => Exercise | undefined;
  getExercisesByCategory: (category: string) => Exercise[];
  
  // Set actions
  addSet: (setData: Omit<ExerciseSet, "id" | "timestamp">) => string;
  updateSet: (id: string, updates: Partial<Omit<ExerciseSet, "id" | "exerciseId">>) => void;
  deleteSet: (id: string) => void;
  getSetById: (id: string) => ExerciseSet | undefined;
  getSetsByExercise: (exerciseId: string) => ExerciseSet[];
  getSetsByDate: (date: string) => ExerciseSet[];
  getSetsByExerciseAndDate: (exerciseId: string, date: string) => ExerciseSet[];
  getExerciseDates: (exerciseId: string) => string[];
  getUniqueDates: () => string[];
  getExercisesForDate: (date: string) => string[];
  
  // Data management
  resetAllData: () => void;
}

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Create the store
export const useExerciseStore = create<ExerciseState>()(
  persist(
    (set, get) => ({
      exercises: [...defaultExercises],
      sets: [],
      
      // Exercise actions
      addExercise: (exercise) => {
        const id = generateId();
        set((state) => ({
          exercises: [...state.exercises, { ...exercise, id }],
        }));
        return id;
      },
      
      updateExercise: (id, updates) => {
        set((state) => ({
          exercises: state.exercises.map((exercise) =>
            exercise.id === id ? { ...exercise, ...updates } : exercise
          ),
        }));
      },
      
      deleteExercise: (id) => {
        set((state) => ({
          exercises: state.exercises.filter((exercise) => exercise.id !== id),
          sets: state.sets.filter((set) => set.exerciseId !== id),
        }));
      },
      
      getExerciseById: (id) => {
        return get().exercises.find((exercise) => exercise.id === id);
      },
      
      getExercisesByCategory: (category) => {
        return get().exercises.filter((exercise) => exercise.category === category);
      },
      
      // Set actions
      addSet: (setData) => {
        const id = generateId();
        const timestamp = Date.now();
        const newSet = { ...setData, id, timestamp };
        
        set((state) => ({
          sets: [...state.sets, newSet],
        }));
        
        // Check for milestones and achievements after adding a set
        setTimeout(() => {
          checkMilestones();
          checkAchievements();
        }, 100);
        
        return id;
      },
      
      updateSet: (id, updates) => {
        set((state) => ({
          sets: state.sets.map((set) =>
            set.id === id ? { ...set, ...updates } : set
          ),
        }));
        
        // Check for milestones and achievements after updating a set
        setTimeout(() => {
          checkMilestones();
          checkAchievements();
        }, 100);
      },
      
      deleteSet: (id) => {
        set((state) => ({
          sets: state.sets.filter((set) => set.id !== id),
        }));
        
        // Check for milestones and achievements after deleting a set
        setTimeout(() => {
          checkMilestones();
          checkAchievements();
        }, 100);
      },
      
      getSetById: (id) => {
        return get().sets.find((set) => set.id === id);
      },
      
      getSetsByExercise: (exerciseId) => {
        return get().sets
          .filter((set) => set.exerciseId === exerciseId)
          .sort((a, b) => b.timestamp - a.timestamp);
      },
      
      getSetsByDate: (date) => {
        return get().sets
          .filter((set) => set.date === date)
          .sort((a, b) => b.timestamp - a.timestamp);
      },
      
      getSetsByExerciseAndDate: (exerciseId, date) => {
        return get().sets
          .filter((set) => set.exerciseId === exerciseId && set.date === date)
          .sort((a, b) => b.timestamp - a.timestamp);
      },
      
      getExerciseDates: (exerciseId) => {
        const dates = get().sets
          .filter((set) => set.exerciseId === exerciseId)
          .map((set) => set.date);
        
        return [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      },
      
      getUniqueDates: () => {
        const dates = get().sets.map((set) => set.date);
        return [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      },
      
      getExercisesForDate: (date) => {
        const exerciseIds = get().sets
          .filter((set) => set.date === date)
          .map((set) => set.exerciseId);
        
        return [...new Set(exerciseIds)];
      },
      
      // Data management
      resetAllData: () => {
        set((state) => ({
          exercises: state.exercises.filter((exercise) => !exercise.isCustom),
          sets: [],
        }));
      },
    }),
    {
      name: "fitness-tracker",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);