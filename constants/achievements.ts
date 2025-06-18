export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: "energy" | "consecutive_days" | "unique_exercises" | "total_weight" | "total_reps" | "special";
  threshold: number;
  points: number;
  icon: string;
  isHidden?: boolean;
}

export const achievements: Achievement[] = [
  // Energy-based achievements
  {
    id: "first-steps",
    name: "First Steps",
    description: "Generate 1,000 joules of energy",
    type: "energy",
    threshold: 1000,
    points: 10,
    icon: "zap"
  },
  {
    id: "power-surge",
    name: "Power Surge",
    description: "Generate 10,000 joules of energy",
    type: "energy",
    threshold: 10000,
    points: 25,
    icon: "zap"
  },
  {
    id: "energy-master",
    name: "Energy Master",
    description: "Generate 50,000 joules of energy",
    type: "energy",
    threshold: 50000,
    points: 50,
    icon: "zap"
  },
  {
    id: "force-of-nature",
    name: "Force of Nature",
    description: "Generate 100,000 joules of energy",
    type: "energy",
    threshold: 100000,
    points: 100,
    icon: "zap"
  },
  {
    id: "human-dynamo",
    name: "Human Dynamo",
    description: "Generate 500,000 joules of energy",
    type: "energy",
    threshold: 500000,
    points: 250,
    icon: "zap"
  },
  {
    id: "power-overwhelming",
    name: "Power Overwhelming",
    description: "Generate 1,000,000 joules of energy",
    type: "energy",
    threshold: 1000000,
    points: 500,
    icon: "zap"
  },
  
  // Consecutive days achievements
  {
    id: "habit-forming",
    name: "Habit Forming",
    description: "Work out for 3 consecutive days",
    type: "consecutive_days",
    threshold: 3,
    points: 15,
    icon: "calendar"
  },
  {
    id: "consistency-is-key",
    name: "Consistency is Key",
    description: "Work out for 7 consecutive days",
    type: "consecutive_days",
    threshold: 7,
    points: 30,
    icon: "calendar"
  },
  {
    id: "unwavering-dedication",
    name: "Unwavering Dedication",
    description: "Work out for 14 consecutive days",
    type: "consecutive_days",
    threshold: 14,
    points: 75,
    icon: "calendar"
  },
  {
    id: "iron-discipline",
    name: "Iron Discipline",
    description: "Work out for 30 consecutive days",
    type: "consecutive_days",
    threshold: 30,
    points: 150,
    icon: "calendar"
  },
  
  // Unique exercises achievements
  {
    id: "explorer",
    name: "Explorer",
    description: "Try 5 different exercises",
    type: "unique_exercises",
    threshold: 5,
    points: 20,
    icon: "compass"
  },
  {
    id: "variety-seeker",
    name: "Variety Seeker",
    description: "Try 10 different exercises",
    type: "unique_exercises",
    threshold: 10,
    points: 40,
    icon: "compass"
  },
  {
    id: "jack-of-all-trades",
    name: "Jack of All Trades",
    description: "Try 20 different exercises",
    type: "unique_exercises",
    threshold: 20,
    points: 80,
    icon: "compass"
  },
  {
    id: "master-of-many",
    name: "Master of Many",
    description: "Try 30 different exercises",
    type: "unique_exercises",
    threshold: 30,
    points: 150,
    icon: "compass"
  },
  
  // Total weight achievements
  {
    id: "weight-lifter",
    name: "Weight Lifter",
    description: "Lift a total of 1,000 kg",
    type: "total_weight",
    threshold: 1000,
    points: 20,
    icon: "dumbbell"
  },
  {
    id: "heavy-hitter",
    name: "Heavy Hitter",
    description: "Lift a total of 5,000 kg",
    type: "total_weight",
    threshold: 5000,
    points: 40,
    icon: "dumbbell"
  },
  {
    id: "iron-pusher",
    name: "Iron Pusher",
    description: "Lift a total of 10,000 kg",
    type: "total_weight",
    threshold: 10000,
    points: 60,
    icon: "dumbbell"
  },
  {
    id: "hercules",
    name: "Hercules",
    description: "Lift a total of 50,000 kg",
    type: "total_weight",
    threshold: 50000,
    points: 120,
    icon: "dumbbell"
  },
  {
    id: "atlas",
    name: "Atlas",
    description: "Lift a total of 100,000 kg",
    type: "total_weight",
    threshold: 100000,
    points: 200,
    icon: "dumbbell"
  },
  
  // Total reps achievements
  {
    id: "rep-counter",
    name: "Rep Counter",
    description: "Complete 100 total reps",
    type: "total_reps",
    threshold: 100,
    points: 10,
    icon: "repeat"
  },
  {
    id: "rep-machine",
    name: "Rep Machine",
    description: "Complete 500 total reps",
    type: "total_reps",
    threshold: 500,
    points: 25,
    icon: "repeat"
  },
  {
    id: "rep-master",
    name: "Rep Master",
    description: "Complete 1,000 total reps",
    type: "total_reps",
    threshold: 1000,
    points: 50,
    icon: "repeat"
  },
  {
    id: "rep-champion",
    name: "Rep Champion",
    description: "Complete 5,000 total reps",
    type: "total_reps",
    threshold: 5000,
    points: 100,
    icon: "repeat"
  },
  {
    id: "rep-legend",
    name: "Rep Legend",
    description: "Complete 10,000 total reps",
    type: "total_reps",
    threshold: 10000,
    points: 200,
    icon: "repeat"
  },
  
  // Hidden achievements
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Complete a workout between midnight and 4 AM",
    type: "special",
    threshold: 1,
    points: 50,
    icon: "moon",
    isHidden: true
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Complete a workout between 5 AM and 7 AM",
    type: "special",
    threshold: 1,
    points: 50,
    icon: "sunrise",
    isHidden: true
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior",
    description: "Work out on 5 consecutive weekends",
    type: "special",
    threshold: 5,
    points: 75,
    icon: "calendar",
    isHidden: true
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "View your workout summary 10 times",
    type: "special",
    threshold: 10,
    points: 25,
    icon: "bar-chart-2",
    isHidden: true
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Edit a workout set after completing it",
    type: "special",
    threshold: 1,
    points: 15,
    icon: "edit",
    isHidden: true
  }
];