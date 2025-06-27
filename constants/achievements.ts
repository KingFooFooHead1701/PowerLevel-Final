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
    unlockCondition: 'Accumulate 5 km of cardio distance',
  },
  {
    id: 'single_cardio_5k',
    title: '5K Sprint',
    description: 'You’ve completed a single 5 km cardio session.',
    unlockCondition: 'Log one cardio set ≥ 5 km',
  },
  {
    id: 'single_cardio_half_marathon',
    title: 'Half-Marathon Hero',
    description: 'You’ve powered through 21.1 km (13.1 mi)!',
    unlockCondition: 'Log one cardio set ≥ 21.1 km',
  },
  {
    id: 'single_cardio_marathon',
    title: 'Marathon Master',
    description: 'You conquered 42.2 km (26.2 mi)!',
    unlockCondition: 'Log one cardio set ≥ 42.2 km',
  },
  {
    id: 'single_cardio_50k',
    title: '50K Ultramarathon Runner',
    description: 'You’ve completed 50 km (31 mi)!',
    unlockCondition: 'Log one cardio set ≥ 50 km',
  },
  {
    id: 'single_cardio_50mi',
    title: '50-Mile Ultramarathon Runner',
    description: 'You’ve conquered 50 mi (80.5 km)!',
    unlockCondition: 'Log one cardio set ≥ 50 mi',
  },
  {
    id: 'single_cardio_100k',
    title: '100K Ultramarathon Runner',
    description: 'You’ve powered through 100 km (62 mi)!',
    unlockCondition: 'Log one cardio set ≥ 100 km',
  },
  {
    id: 'single_cardio_100mi',
    title: '100-Mile Ultramarathon Runner',
    description: 'You’ve achieved 100 mi (161 km)!',
    unlockCondition: 'Log one cardio set ≥ 100 mi',
  },

  // cumulative set milestones
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

  // rep-based achievements
  {
    id: 'total_reps_500',
    title: 'Rep Rampage',
    description: 'You’ve performed 500 total reps.',
    unlockCondition: 'Perform 500 reps in total',
  },
  {
    id: 'total_reps_1000',
    title: 'Rep Master',
    description: 'You’ve performed 1,000 total reps.',
    unlockCondition: 'Perform 1 000 reps in total',
  },

  // squat achievements (6-tier)
  {
    id: 'total_reps_squat_100',
    title: 'Squat Starter',
    description: 'You’ve completed 100 total squats.',
    unlockCondition: 'Accumulate 100 squat reps',
  },
  {
    id: 'total_reps_squat_250',
    title: 'Squat Enthusiast',
    description: 'You’ve completed 250 total squats.',
    unlockCondition: 'Accumulate 250 squat reps',
  },
  {
    id: 'total_reps_squat_500',
    title: 'Squat Adept',
    description: 'You’ve completed 500 total squats.',
    unlockCondition: 'Accumulate 500 squat reps',
  },
  {
    id: 'total_reps_squat_1000',
    title: 'Squat Titan',
    description: 'You’ve completed 1,000 total squats.',
    unlockCondition: 'Accumulate 1 000 squat reps',
  },
  {
    id: 'total_reps_squat_2500',
    title: 'Squat Legend',
    description: 'You’ve completed 2,500 total squats.',
    unlockCondition: 'Accumulate 2 500 squat reps',
  },
  {
    id: 'total_reps_squat_5000',
    title: 'Squat Demigod',
    description: 'You’ve completed 5,000 total squats.',
    unlockCondition: 'Accumulate 5 000 squat reps',
  },

  // push-up achievements (8-tier)
  {
    id: 'total_pushups_100',
    title: 'Push-Up Novice',
    description: 'You’ve done 100 push-ups total.',
    unlockCondition: 'Accumulate 100 push-ups',
  },
  {
    id: 'total_pushups_250',
    title: 'Push-Up Apprentice',
    description: 'You’ve done 250 push-ups total.',
    unlockCondition: 'Accumulate 250 push-ups',
  },
  {
    id: 'total_pushups_500',
    title: 'Push-Up Champion',
    description: 'You’ve done 500 push-ups total.',
    unlockCondition: 'Accumulate 500 push-ups',
  },
  {
    id: 'total_pushups_1000',
    title: 'Push-Up Warrior',
    description: 'You’ve done 1,000 push-ups total.',
    unlockCondition: 'Accumulate 1 000 push-ups',
  },
  {
    id: 'total_pushups_2500',
    title: 'Push-Up Hero',
    description: 'You’ve done 2,500 push-ups total.',
    unlockCondition: 'Accumulate 2 500 push-ups',
  },
  {
    id: 'total_pushups_5000',
    title: 'Push-Up Legend',
    description: 'You’ve done 5,000 push-ups total.',
    unlockCondition: 'Accumulate 5 000 push-ups',
  },
  {
    id: 'total_pushups_10000',
    title: 'Push-Up Master',
    description: 'You’ve done 10,000 push-ups total.',
    unlockCondition: 'Accumulate 10 000 push-ups',
  },
  {
    id: 'total_pushups_50000',
    title: 'Push-Up Titan',
    description: 'You’ve done 50,000 push-ups total.',
    unlockCondition: 'Accumulate 50 000 push-ups',
  },

  // **crunch achievements (mirror push-up tiers)**
  {
    id: 'total_crunches_100',
    title: 'Crunch Novice',
    description: 'You’ve done 100 crunches total.',
    unlockCondition: 'Accumulate 100 crunches',
  },
  {
    id: 'total_crunches_250',
    title: 'Crunch Apprentice',
    description: 'You’ve done 250 crunches total.',
    unlockCondition: 'Accumulate 250 crunches',
  },
  {
    id: 'total_crunches_500',
    title: 'Crunch Champion',
    description: 'You’ve done 500 crunches total.',
    unlockCondition: 'Accumulate 500 crunches',
  },
  {
    id: 'total_crunches_1000',
    title: 'Crunch Warrior',
    description: 'You’ve done 1,000 crunches total.',
    unlockCondition: 'Accumulate 1 000 crunches',
  },
  {
    id: 'total_crunches_2500',
    title: 'Crunch Hero',
    description: 'You’ve done 2,500 crunches total.',
    unlockCondition: 'Accumulate 2 500 crunches',
  },
  {
    id: 'total_crunches_5000',
    title: 'Crunch Legend',
    description: 'You’ve done 5,000 crunches total.',
    unlockCondition: 'Accumulate 5 000 crunches',
  },
  {
    id: 'total_crunches_10000',
    title: 'Crunch Master',
    description: 'You’ve done 10,000 crunches total.',
    unlockCondition: 'Accumulate 10 000 crunches',
  },
  {
    id: 'total_crunches_50000',
    title: 'Crunch Titan',
    description: 'You’ve done 50,000 crunches total.',
    unlockCondition: 'Accumulate 50 000 crunches',
  },
  {
    id: 'first_isometric',
    title: 'Iron Plank',
    description: 'You completed your first isometric exercise.',
    unlockCondition: 'Log one isometric set',
  },
  {
    id: 'total_isometric_600',
    title: 'Plank Champion',
    description: 'You’ve held 600 s of isometric exercises.',
    unlockCondition: 'Accumulate 600 s of holds',
  },
  {
    id: 'treadmill_incline_10',
    title: 'Incline King',
    description: 'You’ve tackled ≥ 10% incline on treadmill.',
    unlockCondition: 'Log a treadmill set ≥ 10% incline',
  },
];

// Generate weight milestones from 1 through 1000 short tons in 25-ton increments
const weightTons: number[] = [1, 10, 25, 50];
for (let t = 75; t <= 1000; t += 25) {
  weightTons.push(t);
}
const weightAchievements: Achievement[] = weightTons.map(tons => {
  const lbs = tons * 2000;
  const lbsStr = lbs.toLocaleString();  // e.g. "2,000"
  return {
    id: `total_weight_${lbs}`,
    title: `${tons}-Ton Milestone`,
    description: `You’ve lifted ${lbsStr} lbs total.`,
    unlockCondition: `Accumulate ${lbsStr} lbs lifted`,
  };
});

export const achievements: Achievement[] = [
  ...baseAchievements,
  ...weightAchievements,
];
