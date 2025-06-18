import { Exercise } from "./exercises";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  hidden: boolean; // If true, name and description are hidden until unlocked
  category: AchievementCategory;
  condition: AchievementCondition;
  points: number; // Achievement points value
  hint?: string; // Optional hint for hidden achievements
}

export type AchievementCategory = 
  | "milestone" 
  | "exercise" 
  | "consistency" 
  | "special";

export type AchievementCondition = 
  | { type: "totalJoules"; threshold: number }
  | { type: "exerciseCount"; exerciseType?: string; count: number }
  | { type: "exerciseStreak"; days: number }
  | { type: "specificExercise"; exerciseId: string; count: number }
  | { type: "categoryComplete"; category: string }
  | { type: "timeOfDay"; hour: number }
  | { type: "weekendWarrior"; count: number }
  | { type: "heavyLifter"; weight: number; useMetric: boolean }
  | { type: "perfectSet"; reps: number }
  | { type: "allCategories"; count: number };

export const achievements: Achievement[] = [
  // Milestone Achievements
  {
    id: "first_power",
    name: "Power Initiate",
    description: "Generate your first joule of power",
    icon: "zap",
    hidden: false,
    category: "milestone",
    condition: { type: "totalJoules", threshold: 1 },
    points: 5
  },
  {
    id: "power_level_1000",
    name: "Kilowatt Kid",
    description: "Reach 1,000 joules of total power",
    icon: "zap",
    hidden: false,
    category: "milestone",
    condition: { type: "totalJoules", threshold: 1000 },
    points: 10
  },
  {
    id: "power_level_10000",
    name: "Megawatt Master",
    description: "Reach 10,000 joules of total power",
    icon: "zap",
    hidden: false,
    category: "milestone",
    condition: { type: "totalJoules", threshold: 10000 },
    points: 25
  },
  {
    id: "power_level_100000",
    name: "Gigawatt Guru",
    description: "Reach 100,000 joules of total power",
    icon: "zap",
    hidden: false,
    category: "milestone",
    condition: { type: "totalJoules", threshold: 100000 },
    points: 50
  },
  {
    id: "power_level_1000000",
    name: "Terawatt Titan",
    description: "Reach 1,000,000 joules of total power",
    icon: "zap",
    hidden: false,
    category: "milestone",
    condition: { type: "totalJoules", threshold: 1000000 },
    points: 100
  },
  
  // Exercise Achievements
  {
    id: "first_exercise",
    name: "First Steps",
    description: "Complete your first exercise set",
    icon: "dumbbell",
    hidden: false,
    category: "exercise",
    condition: { type: "exerciseCount", count: 1 },
    points: 5
  },
  {
    id: "exercise_variety",
    name: "Jack of All Trades",
    description: "Try 5 different exercises",
    icon: "list",
    hidden: false,
    category: "exercise",
    condition: { type: "exerciseCount", count: 5 },
    points: 15
  },
  {
    id: "deadlift_master",
    name: "Deadlift Devotee",
    description: "Complete 10 sets of deadlifts",
    icon: "weight",
    hidden: false,
    category: "exercise",
    condition: { type: "specificExercise", exerciseId: "deadlift", count: 10 },
    points: 20
  },
  {
    id: "squat_master",
    name: "Squat Specialist",
    description: "Complete 10 sets of squats",
    icon: "chevrons-down",
    hidden: false,
    category: "exercise",
    condition: { type: "specificExercise", exerciseId: "squat", count: 10 },
    points: 20
  },
  {
    id: "bench_master",
    name: "Bench Boss",
    description: "Complete 10 sets of bench press",
    icon: "trending-up",
    hidden: false,
    category: "exercise",
    condition: { type: "specificExercise", exerciseId: "bench_press", count: 10 },
    points: 20
  },
  
  // Consistency Achievements
  {
    id: "three_day_streak",
    name: "Habit Forming",
    description: "Log exercises on 3 consecutive days",
    icon: "calendar",
    hidden: false,
    category: "consistency",
    condition: { type: "exerciseStreak", days: 3 },
    points: 15
  },
  {
    id: "seven_day_streak",
    name: "Week Warrior",
    description: "Log exercises on 7 consecutive days",
    icon: "calendar-check",
    hidden: false,
    category: "consistency",
    condition: { type: "exerciseStreak", days: 7 },
    points: 30
  },
  {
    id: "thirty_day_streak",
    name: "Monthly Motivator",
    description: "Log exercises on 30 consecutive days",
    icon: "calendar-clock",
    hidden: false,
    category: "consistency",
    condition: { type: "exerciseStreak", days: 30 },
    points: 100
  },
  
  // Special Achievements
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Log an exercise before 6 AM",
    icon: "sunrise",
    hidden: false,
    category: "special",
    condition: { type: "timeOfDay", hour: 6 },
    points: 15
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Log an exercise after 10 PM",
    icon: "moon",
    hidden: false,
    category: "special",
    condition: { type: "timeOfDay", hour: 22 },
    points: 15
  },
  {
    id: "weekend_warrior",
    name: "Weekend Warrior",
    description: "Log exercises on 5 different weekends",
    icon: "calendar-heart",
    hidden: false,
    category: "special",
    condition: { type: "weekendWarrior", count: 5 },
    points: 25
  },
  
  // Hidden Achievements
  {
    id: "heavy_lifter",
    name: "???",
    description: "???",
    icon: "award",
    hidden: true,
    category: "special",
    condition: { type: "heavyLifter", weight: 100, useMetric: true }, // 100kg or 225lbs
    points: 50,
    hint: "Lift something impressively heavy"
  },
  {
    id: "perfect_ten",
    name: "???",
    description: "???",
    icon: "check-circle",
    hidden: true,
    category: "special",
    condition: { type: "perfectSet", reps: 10 },
    points: 20,
    hint: "The perfect number of repetitions"
  },
  {
    id: "category_complete",
    name: "???",
    description: "???",
    icon: "check-square",
    hidden: true,
    category: "special",
    condition: { type: "categoryComplete", category: "Chest" },
    points: 30,
    hint: "Master a specific muscle group"
  },
  {
    id: "all_categories",
    name: "???",
    description: "???",
    icon: "trophy",
    hidden: true,
    category: "special",
    condition: { type: "allCategories", count: 5 },
    points: 100,
    hint: "Try everything at least once"
  }
];

// Get achievement by ID
export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find(achievement => achievement.id === id);
}

// Get achievements by category
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return achievements.filter(achievement => achievement.category === category);
}

// Format achievement name and description based on unlock status
export function formatAchievement(achievement: Achievement, isUnlocked: boolean): { name: string, description: string } {
  if (!achievement.hidden || isUnlocked) {
    return {
      name: achievement.name,
      description: achievement.description
    };
  }
  
  return {
    name: "???",
    description: achievement.hint || "Keep working out to unlock this achievement"
  };
}