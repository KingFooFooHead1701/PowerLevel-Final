// constants/achievements.ts

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockCondition: string;
  repeatable?: boolean;
  count?: number;
}

export const achievements: Achievement[] = [
  {
    id: "first_workout",
    title: "Completed First Workout",
    description: "Congratulations! A journey of a thousand miles begins with one step.",
    unlockCondition: "Log your first set"
  },
  {
    id: "threshold_1000_kj",
    title: "Kilojoule Crusher",
    description: "You’ve shattered the 1,000 kJ barrier—feel the burn!",
    unlockCondition: "Earn over 1,000 kJ of total energy"
  },
  {
    id: "threshold_1_mj",
    title: "Megajoule Master",
    description: "A full megajoule! Your workouts are on another level.",
    unlockCondition: "Earn over 1 MJ of total energy"
  },
  {
    id: "threshold_1_gj",
    title: "Gigajoule Giant",
    description: "Crossed the gigajoule threshold—your power is enormous!",
    unlockCondition: "Earn over 1 GJ of total energy"
  },
  {
    id: "threshold_1_tj",
    title: "Terajoule Titan",
    description: "A terajoule titan indeed—this is workout supremacy.",
    unlockCondition: "Earn over 1 TJ of total energy"
  },
  {
    id: "streak_7_days",
    title: "One-Week Warrior",
    description: "Seven days of logging sets in a row—your dedication is unstoppable!",
    unlockCondition: "Log at least one set per day for 7 consecutive days"
  },
  {
    id: "streak_30_days",
    title: "Month-Long Maverick",
    description: "You’ve logged at least one set every day for 30 straight days—unstoppable dedication!",
    unlockCondition: "Log at least one set per day for 30 consecutive days"
  },
  {
    id: "hundred_sets",
    title: "Century Sets",
    description: "You’ve smashed through 100 sets—your consistency is legendary!",
    unlockCondition: "Log 100 sets in total"
  },
  {
    id: "set_collector",
    title: "Set Collector",
    description: "You’ve completed 500 total sets—consistency pays off!",
    unlockCondition: "Accumulate a total of 500 logged sets across all exercises"
  },
  {
    id: "rep_master",
    title: "Repetition Ruler",
    description: "You’ve performed 1,000 total reps across all exercises—reps galore!",
    unlockCondition: "Complete a cumulative total of 1,000 reps across all sets"
  },
  {
    id: "ton_titan",
    title: "Ton Titan",
    description: "You’ve lifted over 10,000 kg (22,046 lbs) in total—your strength is monumental!",
    unlockCondition: "Accumulate more than 10,000 kg (22,046 lbs) of total weight lifted across all sets"
  },
  {
    id: "progress_pioneer",
    title: "Progress Pioneer",
    description: "You’ve increased the weight on the same exercise for 10 consecutive sessions—steady gains!",
    unlockCondition: "Log 10 back-to-back sets of the same exercise with strictly increasing weight"
  },
  {
    id: "marathon_runner",
    title: "Marathon Runner",
    description: "You’ve covered at least 42.195 km (26.2 miles) of cardio—epic endurance!",
    unlockCondition: "Log a cumulative cardio distance of 42.195 km (26.2 miles)"
  },
  {
    id: "century_cardio",
    title: "Century Cardio",
    description: "You’ve logged 100 km (62.1 miles) of cardio—century club achieved!",
    unlockCondition: "Accumulate a cumulative cardio distance of 100 km (62.1 miles)"
  },
  {
    id: "century_cardio_miles",
    title: "Century Miles",
    description: "You’ve logged 100 miles (160.9 km) of cardio—mile marker mastery!",
    unlockCondition: "Accumulate a cumulative cardio distance of 100 miles (160.9 km)"
  },
  {
    id: "marathon_session",
    title: "Marathon Session",
    description: "You’ve logged a single cardio session over 42.2 km (26.2 mi)—in it for the long haul!",
    unlockCondition: "Log one cardio set with distance ≥ 42.2 km (26.2 mi)"
  },
  {
    id: "pushup_pro",
    title: "Push-Up Pro",
    description: "You’ve completed 500 push-ups overall—your chest and arms salute you!",
    unlockCondition: "Perform a cumulative total of 500 push-ups across all sets"
  },
  {
    id: "plank_champion",
    title: "Plank Champion",
    description: "You’ve held the plank for a total of 30 minutes—core fortress unlocked!",
    unlockCondition: "Accumulate 1,800 seconds (30 minutes) of plank (isometric) exercises"
  },
  {
    id: "first_cardio",
    title: "Cardio Initiate",
    description: "You’ve logged your first cardio session—feel that heart pumping!",
    unlockCondition: "Log your first cardio exercise set"
  },
  {
    id: "early_bird",
    title: "Early Bird",
    description: "You nailed your workout before sunrise—nothing can stop you!",
    unlockCondition: "Log at least one set before 6:00 AM local time"
  },
  {
    id: "weekend_warrior",
    title: "Weekend Warrior",
    description: "You’ve logged workouts on both Saturday and Sunday—weekend domination!",
    unlockCondition: "Log at least one set on both Saturday and Sunday of the same week"
  },
  {
    id: "night_owl",
    title: "Night Owl",
    description: "You’ve logged a workout after 10:00 PM—burning the midnight oil!",
    unlockCondition: "Log at least one set after 10:00 PM local time"
  },
  {
    id: "all_rounder",
    title: "All-Rounder",
    description: "You’ve hit every major muscle group in one day—complete body domination!",
    unlockCondition: "Log one set in each category: Chest, Back, Legs, Arms, Shoulders, Core, Cardio, Full Body, Custom"
  },
  {
    id: "category_conqueror",
    title: "Category Conqueror",
    description: "You’ve logged at least one set in every exercise category—no muscle left behind!",
    unlockCondition: "Log one set in each category: Chest, Back, Legs, Arms, Shoulders, Core, Cardio, Full Body, Custom"
  },
  {
    id: "variety_enthusiast",
    title: "Variety Enthusiast",
    description: "You’ve logged sets for 20 different exercises—never gets old!",
    unlockCondition: "Log at least one set in 20 unique exercises"
  },
  {
    id: "circuit_complete",
    title: "Circuit Complete",
    description: "You’ve done 5 different exercises in one workout—full-body champion!",
    unlockCondition: "Log at least one set of 5 distinct exercises within a single session"
  },
  {
    id: "incline_king",
    title: "Incline King",
    description: "You’ve tackled a treadmill incline over 10%—uphill warrior!",
    unlockCondition: "Log a treadmill set with incline ≥ 10%"
  },
  {
    id: "bodyweight_beast",
    title: "Bodyweight Beast",
    description: "You’ve crushed 1,000 reps in bodyweight exercises—pure raw power!",
    unlockCondition: "Accumulate 1,000 total reps across exercises that require body weight"
  },
  {
    id: "equipment_explorer",
    title: "Equipment Explorer",
    description: "You’ve used every non-cardio machine at least once—versatility unlocked!",
    unlockCondition: "Log at least one set using each non-cardio category"
  },
  {
    id: "gravity_defier",
    title: "Gravity Defier",
    description: "You’ve lifted more in a single set than your own body weight—levelling up!",
    unlockCondition: "Log a set where effective resistance exceeds body weight"
  },
  {
    id: "scanner_initiate",
    title: "Scan Initiate",
    description: "You’ve used the scanner for the first time—unlocking a new dimension!",
    unlockCondition: "Perform your first scan with the in-app scanner"
  },
  {
    id: "scan_savant",
    title: "Scan Savant",
    description: "You’ve scanned 10 items—discipline through discovery!",
    unlockCondition: "Use the scanner 10 times"
  },
  {
    id: "master_of_scans",
    title: "Master of Scans",
    description: "You’ve scanned 50 items—your curiosity knows no bounds!",
    unlockCondition: "Use the scanner 50 times"
  },
  {
    id: "scanner_100",
    title: "Scan Centurion",
    description: "You've used the scanner 100 times—dedication unmatched!",
    unleashCondition: "Use the in-app scanner 100 times"
  },
  {
    id: "scanner_200",
    title: "Scan Double Century",
    description: "200 scans deep—your curiosity powers the app!",
    unlockCondition: "Use the in-app scanner 200 times"
  },
  {
    id: "scanner_300",
    title: "Scan Triple Threat",
    description: "Three-hundred scans—master of the lens!",
    unlockCondition: "Use the in-app scanner 300 times"
  },
  {
    id: "scanner_400",
    title: "Scan Quad Squad",
    description: "400 scans logged—your scanning prowess is legendary!",
    unlockCondition: "Use the in-app scanner 400 times"
  },
  {
    id: "scanner_500",
    title: "Scan Half-K Master",
    description: "500 scans achieved—half a thousand discoveries unlocked!",
    unlockCondition: "Use the in-app scanner 500 times"
  },
  {
    id: "treadmill_trailblazer",
    title: "Treadmill Trailblazer",
    description: "You’ve gone the extra mile—literally—with a single treadmill run over 10 km!",
    unlockCondition: "Log one treadmill set with distance ≥ 10 km"
  },
  {
    id: "pr_breaker",
    title: "PR Breaker",
    description: "You’ve achieved a new single-set energy high—record smashed!",
    unlockCondition: "Log a set whose joules exceed your previous highest",
    repeatable: true,
    count: 0
  },
  {
    id: "theme_explorer",
    title: "Theme Explorer",
    description: "You’ve tried 5 different color themes—your style knows no bounds!",
    unlockCondition: "Select 5 unique themes in the app"
  },
  {
    id: "color_chameleon",
    title: "Color Chameleon",
    description: "You’ve switched themes 20 times—your look is ever-changing!",
    unlockCondition: "Change the app theme 20 times"
  },
  {
    id: "palette_pioneer",
    title: "Palette Pioneer",
    description: "You’ve created and applied 3 custom themes—DIY color mastery!",
    unlockCondition: "Create and select 3 different custom themes"
  },
  {
    id: "theme_master",
    title: "Theme Master",
    description: "You’ve switched to a new theme every day for a week—style dedication!",
    unlockCondition: "Change your theme at least once per day for 7 consecutive days"
  },
  {
    id: "ultimate_stylist",
    title: "Ultimate Stylist",
    description: "You’ve tried every built-in theme—your fashion sense is flawless!",
    unlockCondition: "Select each predefined theme at least once"
  }
];

export type AchievementId = Achievement["id"];
