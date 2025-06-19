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
  popupMessage?: string; // Message to show when achievement is unlocked
}

export type AchievementCategory = 
  | "milestone" 
  | "exercise" 
  | "consistency" 
  | "special"
  | "hidden";

export type AchievementCondition = 
  | { type: "totalJoules"; threshold: number }
  | { type: "exerciseCount"; exerciseType?: string; count: number }
  | { type: "exerciseStreak"; days: number }
  | { type: "specificExercise"; exerciseId: string; count: number }
  | { type: "categoryComplete"; category: string }
  | { type: "timeOfDay"; hour: number; endHour?: number }
  | { type: "weekendWarrior"; count: number }
  | { type: "heavyLifter"; weight: number; useMetric: boolean }
  | { type: "perfectSet"; reps: number }
  | { type: "allCategories"; count: number }
  | { type: "scanCount"; count: number }
  | { type: "dailyJoules"; threshold: number }
  | { type: "unitSwitch" }
  | { type: "customExercises"; count: number }
  | { type: "bodyWeightExercises"; count: number }
  | { type: "liftHeavier"; ratio: number }
  | { type: "isometricExercises"; count: number }
  | { type: "treadmillIncline"; threshold: number }
  | { type: "cardioVariety"; count: number; sameDay: boolean }
  | { type: "tierJump"; tiers: number }
  | { type: "tapDisplay"; count: number }
  | { type: "allExerciseCategories"; sameDay: boolean }
  | { type: "weekendWorkout" }
  | { type: "dataReset" }
  | { type: "soundToggle" }
  | { type: "themeSwitch" }
  | { type: "maxTier" }
  | { type: "allDefaultExercises" };

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
    icon: "bench",
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
  },
  
  // New Hidden Achievements
  {
    id: "midnight_warrior",
    name: "Midnight Warrior",
    description: "Perform a scan between 12 AM and 4 AM",
    icon: "moon-star",
    hidden: true,
    category: "hidden",
    condition: { type: "timeOfDay", hour: 0, endHour: 4 },
    points: 25,
    hint: "Train when others sleep",
    popupMessage: "You're training when the rest of the world sleeps—true dedication!"
  },
  {
    id: "early_bird_special",
    name: "Early Bird",
    description: "First scan before 6 AM",
    icon: "sunrise",
    hidden: true,
    category: "hidden",
    condition: { type: "timeOfDay", hour: 0, endHour: 6 },
    points: 20,
    hint: "The early bird gets the gains",
    popupMessage: "Sunrise squat squad—nice hustle!"
  },
  {
    id: "streak_master",
    name: "Streak Master",
    description: "Log at least one set every day for 7 consecutive days",
    icon: "flame",
    hidden: true,
    category: "hidden",
    condition: { type: "exerciseStreak", days: 7 },
    points: 40,
    hint: "Consistency is key",
    popupMessage: "7-day streak! Your power level's consistency is off the charts."
  },
  {
    id: "century_club",
    name: "Century Club",
    description: "Accumulate 100 kJ in a single day",
    icon: "hundred-points",
    hidden: true,
    category: "hidden",
    condition: { type: "dailyJoules", threshold: 100000 },
    points: 50,
    hint: "Triple digits in a day",
    popupMessage: "100 kJ smashed! You're officially bench-pressing small planets."
  },
  {
    id: "metric_maverick",
    name: "Metric Maverick",
    description: "Switch your units from lbs to kg (or vice versa) and complete an entry",
    icon: "ruler",
    hidden: true,
    category: "hidden",
    condition: { type: "unitSwitch" },
    points: 15,
    hint: "Try a different measurement system",
    popupMessage: "Unit switch complete—globetrotting gains!"
  },
  {
    id: "custom_creator",
    name: "Custom Creator",
    description: "Add 5 or more custom exercises",
    icon: "pencil",
    hidden: true,
    category: "hidden",
    condition: { type: "customExercises", count: 5 },
    points: 30,
    hint: "Create your own workout routine",
    popupMessage: "You've created your own moves—innovation unlocked!"
  },
  {
    id: "shadow_lifter",
    name: "Shadow Lifter",
    description: "Complete a body-weight exercise 50 times total",
    icon: "user",
    hidden: true,
    category: "hidden",
    condition: { type: "bodyWeightExercises", count: 50 },
    points: 35,
    hint: "Your body is the best equipment",
    popupMessage: "You're so strong—gravity itself is your barbell."
  },
  {
    id: "heavy_hitter",
    name: "Heavy Hitter",
    description: "Log a single set lifting more than your body weight",
    icon: "dumbbell",
    hidden: true,
    category: "hidden",
    condition: { type: "liftHeavier", ratio: 1.0 },
    points: 45,
    hint: "Lift more than yourself",
    popupMessage: "You just defied physics—congrats!"
  },
  {
    id: "marathon_scanner",
    name: "Marathon Scanner",
    description: "Perform 50 scans (power-level reveals)",
    icon: "scan-line",
    hidden: true,
    category: "hidden",
    condition: { type: "scanCount", count: 50 },
    points: 25,
    hint: "Check your progress often",
    popupMessage: "50 scans deep—you're not just lifting, you're scanning history."
  },
  {
    id: "silent_but_deadly",
    name: "Silent but Deadly",
    description: "Complete a set of isometric exercises 20 times",
    icon: "mountain",
    hidden: true,
    category: "hidden",
    condition: { type: "isometricExercises", count: 20 },
    points: 30,
    hint: "Hold still for strength",
    popupMessage: "Still as a statue, powerful as a storm."
  },
  {
    id: "incline_innovator",
    name: "Incline Innovator",
    description: "Log a treadmill workout at ≥ 10% incline",
    icon: "trending-up",
    hidden: true,
    category: "hidden",
    condition: { type: "treadmillIncline", threshold: 10 },
    points: 25,
    hint: "Take your cardio to new heights",
    popupMessage: "Climbing Mount Gains—impressive!"
  },
  {
    id: "surprise_sprint",
    name: "Surprise Sprint",
    description: "Do 3 distinct cardio workouts in one day",
    icon: "heart",
    hidden: true,
    category: "hidden",
    condition: { type: "cardioVariety", count: 3, sameDay: true },
    points: 35,
    hint: "Mix up your cardio routine",
    popupMessage: "Triple cardio day—your heart says hello!"
  },
  {
    id: "tier_jump",
    name: "Tier Jump",
    description: "Advance two power-tiers in a single workout session",
    icon: "rocket",
    hidden: true,
    category: "hidden",
    condition: { type: "tierJump", tiers: 2 },
    points: 50,
    hint: "Massive power increase",
    popupMessage: "Leveled up twice—boss difficulty engaged!"
  },
  {
    id: "glitch_in_the_matrix",
    name: "Glitch in the Matrix",
    description: "Tap the total joules display 5 times in rapid succession",
    icon: "bug",
    hidden: true,
    category: "hidden",
    condition: { type: "tapDisplay", count: 5 },
    points: 15,
    hint: "Try interacting with the UI",
    popupMessage: "Whoa—did you just hack the system?"
  },
  {
    id: "renaissance_lifter",
    name: "Renaissance Lifter",
    description: "Complete one exercise in every category in a single day",
    icon: "palette",
    hidden: true,
    category: "hidden",
    condition: { type: "allExerciseCategories", sameDay: true },
    points: 40,
    hint: "Be well-rounded in your training",
    popupMessage: "All-rounder unlocked—master of every realm!"
  },
  {
    id: "weekend_warrior_hidden",
    name: "Weekend Warrior",
    description: "Log a workout on a Saturday or Sunday",
    icon: "calendar-weekend",
    hidden: true,
    category: "hidden",
    condition: { type: "weekendWorkout" },
    points: 20,
    hint: "Don't skip weekend workouts",
    popupMessage: "Rest days are for the weak—weekends belong to you!"
  },
  {
    id: "data_cleanup_crew",
    name: "Data Cleanup Crew",
    description: "Clear your app's local data and then log a new workout",
    icon: "trash",
    hidden: true,
    category: "hidden",
    condition: { type: "dataReset" },
    points: 20,
    hint: "Sometimes you need a fresh start",
    popupMessage: "Fresh start—like a phoenix from the ashes."
  },
  {
    id: "audio_aficionado",
    name: "Audio Aficionado",
    description: "Mute and unmute sounds, then complete a scan",
    icon: "volume-2",
    hidden: true,
    category: "hidden",
    condition: { type: "soundToggle" },
    points: 15,
    hint: "Experiment with app settings",
    popupMessage: "Sound toggled—your ears approve."
  },
  {
    id: "theme_chameleon",
    name: "Theme Chameleon",
    description: "Switch between themes and log a workout",
    icon: "palette",
    hidden: true,
    category: "hidden",
    condition: { type: "themeSwitch" },
    points: 15,
    hint: "Try a different look",
    popupMessage: "You adapt like true training chameleon."
  },
  {
    id: "legendary_status",
    name: "Legendary Status",
    description: "Reach the maximum designed milestone",
    icon: "crown",
    hidden: true,
    category: "hidden",
    condition: { type: "maxTier" },
    points: 100,
    hint: "Reach the pinnacle of power",
    popupMessage: "Legend achieved—your power level defies description!"
  },
  {
    id: "all_default_exercises",
    name: "You Had to Do Them All!",
    description: "Completed at least one set of each and every default exercise in Power Level",
    icon: "check-circle-2",
    hidden: true,
    category: "hidden",
    condition: { type: "allDefaultExercises" },
    points: 150,
    hint: "Try every exercise at least once",
    popupMessage: "Legendary achievement— You balance determination and composure with obsession!"
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