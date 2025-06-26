// constants/achievements.ts
export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockCondition: string;
}

// Base exercise achievements
const baseAchievements: Achievement[] = [
  {
    id: 'first_workout',
    title: 'First Workout',
    description: 'You logged your first exercise set!',
    unlockCondition: 'Log your first exercise set',
  },
  {
    id: 'first_strength',
    title: 'Strength Initiate',
    description: 'You logged your first strength (non-cardio) set!',
    unlockCondition: 'Log a non-cardio exercise set',
  },
  {
    id: 'first_cardio',
    title: 'Cardio Initiate',
    description: 'You logged your first cardio set!',
    unlockCondition: 'Log your first cardio set',
  },
  {
    id: 'total_cardio_5k',
    title: '5K Runner',
    description: 'You’ve accumulated 5 km of cardio distance.',
    unlockCondition: 'Accumulate 5 km of cardio distance'
  },
  {
    id: 'single_cardio_5k',
    title: '5K Sprint',
    description: 'You’ve completed a single 5 km cardio session.',
    unlockCondition: 'Log one cardio set with distance ≥ 5 km'
  },
  {
    id: 'single_cardio_half_marathon',
    title: 'Half-Marathon Hero',
    description: 'You’ve powered through a 21.0975 km (13.1 mi) session!',
    unlockCondition: 'Log one cardio set with distance ≥ 21.0975 km (13.1 mi)'
  },
  {
    id: 'single_cardio_marathon',
    title: 'Marathon Master',
    description: 'You conquered 42.195 km (26.2 mi) in one go!',
    unlockCondition: 'Log one cardio set with distance ≥ 42.195 km (26.2 mi)'
  },
  {
    id: 'single_cardio_50k',
    title: '50K Ultramarathon Runner',
    description: 'You’ve completed a 50 km (31 mi) cardio session!',
    unlockCondition: 'Log one cardio set with distance ≥ 50 km (31 mi)'
  },
  {
    id: 'single_cardio_50mi',
    title: '50-Mile Ultramarathon Runner',
    description: 'You’ve conquered a 50 mi (80.5 km) cardio session!',
    unlockCondition: 'Log one cardio set with distance ≥ 50 mi (80.5 km)'
  },
  {
    id: 'single_cardio_100k',
    title: '100K Ultramarathon Runner',
    description: 'You’ve powered through a 100 km (62 mi) cardio session!',
    unlockCondition: 'Log one cardio set with distance ≥ 100 km (62 mi)'
  },
  {
    id: 'single_cardio_100mi',
    title: '100-Mile Ultramarathon Runner',
    description: 'You’ve achieved a 100 mi (161 km) cardio session!',
    unlockCondition: 'Log one cardio set with distance ≥ 100 mi (161 km)'
  },

  {
    id: 'ten_sets',
    title: 'Tenacious Ten',
    description: 'You’ve completed 10 total sets.',
    unlockCondition: 'Log 10 total sets',
  },
  {
    id: 'fifty_sets',
    title: 'Fifty-Set Finisher',
    description: 'You’ve smashed through 50 total sets.',
    unlockCondition: 'Log 50 total sets',
  },
  {
    id: 'hundred_sets',
    title: 'Century Sets',
    description: 'You’ve smashed through 100 total sets.',
    unlockCondition: 'Log 100 total sets',
  },
  {
    id: 'total_reps_500',
    title: 'Rep Rampage',
    description: 'You’ve performed 500 total reps across all exercises.',
    unlockCondition: 'Perform 500 reps in total',
  },
  {
    id: 'total_reps_1000',
    title: 'Rep Master',
    description: 'You’ve performed 1,000 total reps across all exercises.',
    unlockCondition: 'Perform 1,000 reps in total',
  },
  {
    id: 'single_set_high_joule',
    title: 'Power Surge',
    description: 'You logged a single set over 10 kJ.',
    unlockCondition: 'Log one set with ≥ 10,000 J',
  },
  {
    id: 'single_set_ultra_joule',
    title: 'Ultra Surge',
    description: 'You logged a single set over 50 kJ.',
    unlockCondition: 'Log one set with ≥ 50,000 J',
  },
  {
    id: 'first_isometric',
    title: 'Iron Plank',
    description: 'You completed your first isometric exercise.',
    unlockCondition: 'Log a set with isometric exercise',
  },
  {
    id: 'total_isometric_600',
    title: 'Plank Champion',
    description: 'You’ve held 600 seconds of isometric exercises.',
    unlockCondition: 'Accumulate 600 seconds of isometrics',
  },
  {
    id: 'treadmill_incline_10',
    title: 'Incline King',
    description: 'You’ve tackled a treadmill incline over 10%.',
    unlockCondition: 'Log a treadmill set with incline ≥ 10%',
  },
  
];

// Generate weight milestones from 1 through 1000 short tons in 25-ton increments
const weightTons: number[] = [1, 10, 25, 50];
for (let t = 75; t <= 1000; t += 25) {
  weightTons.push(t);
}

const weightAchievements: Achievement[] = weightTons.map(tons => {
  // Use short tons to lbs conversion: 1 ton = 2000 lbs
  const idSuffix = tons * 2000;
  return {
    id: `total_weight_${idSuffix}`,
    title: `${tons}-Ton Milestone`,
    description: `You’ve lifted a cumulative ${tons * 2000} lbs (${tons} short tons).`,
    unlockCondition: `Lift ${tons} short tons in total`,
  };
});

export const achievements: Achievement[] = [...baseAchievements, ...weightAchievements];

