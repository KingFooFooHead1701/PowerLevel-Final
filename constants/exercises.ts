// Define the Exercise type
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

// Export the default exercises
export const defaultExercises: Exercise[] = [
  {
    id: "bench-press",
    name: "Bench Press",
    category: "Chest",
    description: "A compound exercise that primarily targets the chest muscles, but also works the shoulders and triceps.",
    instructions: [
      "Lie on a flat bench with your feet flat on the floor.",
      "Grip the barbell with hands slightly wider than shoulder-width apart.",
      "Lower the barbell to your chest, keeping your elbows at a 45-degree angle.",
      "Press the barbell back up to the starting position, fully extending your arms."
    ],
    muscles: ["Chest", "Shoulders", "Triceps"],
    equipment: ["Barbell", "Bench"]
  },
  {
    id: "squat",
    name: "Squat",
    category: "Legs",
    description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart, toes slightly pointed outward.",
      "Hold the barbell across your upper back, resting on your trapezius muscles.",
      "Bend your knees and hips to lower your body, keeping your back straight.",
      "Lower until your thighs are parallel to the ground or slightly below.",
      "Push through your heels to return to the starting position."
    ],
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Lower Back"],
    equipment: ["Barbell", "Squat Rack"]
  },
  {
    id: "deadlift",
    name: "Deadlift",
    category: "Back",
    description: "A compound exercise that targets multiple muscle groups including the back, glutes, and hamstrings.",
    instructions: [
      "Stand with feet hip-width apart, with the barbell over your mid-foot.",
      "Bend at the hips and knees to grip the barbell with hands shoulder-width apart.",
      "Keep your back straight and chest up as you lift the barbell by extending your hips and knees.",
      "Stand up straight with the barbell, then lower it back to the ground with controlled movement."
    ],
    muscles: ["Lower Back", "Glutes", "Hamstrings", "Traps", "Forearms"],
    equipment: ["Barbell"]
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    category: "Shoulders",
    description: "A compound exercise that primarily targets the shoulders, but also works the triceps and upper chest.",
    instructions: [
      "Stand with feet shoulder-width apart, holding a barbell at shoulder height.",
      "Press the barbell overhead, fully extending your arms.",
      "Lower the barbell back to shoulder height with controlled movement."
    ],
    muscles: ["Shoulders", "Triceps", "Upper Chest"],
    equipment: ["Barbell"]
  },
  {
    id: "pull-up",
    name: "Pull-Up",
    category: "Back",
    description: "A compound bodyweight exercise that primarily targets the back and biceps.",
    instructions: [
      "Hang from a pull-up bar with hands slightly wider than shoulder-width apart, palms facing away.",
      "Pull your body up until your chin is above the bar.",
      "Lower your body back to the starting position with controlled movement."
    ],
    muscles: ["Lats", "Biceps", "Forearms", "Shoulders"],
    equipment: ["Pull-Up Bar"]
  },
  {
    id: "dumbbell-curl",
    name: "Dumbbell Curl",
    category: "Arms",
    description: "An isolation exercise that targets the biceps.",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing forward.",
      "Keeping your upper arms stationary, curl the dumbbells up to shoulder level.",
      "Lower the dumbbells back to the starting position with controlled movement."
    ],
    muscles: ["Biceps", "Forearms"],
    equipment: ["Dumbbells"]
  },
  {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    category: "Arms",
    description: "An isolation exercise that targets the triceps.",
    instructions: [
      "Stand facing a cable machine with a straight or V-bar attachment at chest height.",
      "Grip the bar with palms facing down, elbows at your sides.",
      "Push the bar down until your arms are fully extended.",
      "Slowly return to the starting position."
    ],
    muscles: ["Triceps"],
    equipment: ["Cable Machine"]
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Legs",
    description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Sit in the leg press machine with your back against the padded support.",
      "Place your feet on the platform, hip-width apart.",
      "Release the safety bars and lower the platform until your knees form a 90-degree angle.",
      "Push through your heels to extend your legs, without locking your knees."
    ],
    muscles: ["Quadriceps", "Hamstrings", "Glutes"],
    equipment: ["Leg Press Machine"]
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Back",
    description: "A compound exercise that primarily targets the latissimus dorsi (lats) and biceps.",
    instructions: [
      "Sit at a lat pulldown machine with a wide grip on the bar, palms facing away.",
      "Pull the bar down to your upper chest, keeping your back slightly arched.",
      "Slowly return the bar to the starting position with controlled movement."
    ],
    muscles: ["Lats", "Biceps", "Shoulders"],
    equipment: ["Lat Pulldown Machine"]
  },
  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    category: "Shoulders",
    description: "A compound exercise that primarily targets the shoulders, but also works the triceps.",
    instructions: [
      "Sit on a bench with back support, holding dumbbells at shoulder height with palms facing forward.",
      "Press the dumbbells overhead until your arms are fully extended.",
      "Lower the dumbbells back to shoulder height with controlled movement."
    ],
    muscles: ["Shoulders", "Triceps"],
    equipment: ["Dumbbells", "Bench"]
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    category: "Legs",
    description: "A compound exercise that primarily targets the hamstrings and glutes.",
    instructions: [
      "Stand with feet hip-width apart, holding a barbell in front of your thighs.",
      "Keeping your back straight and knees slightly bent, hinge at the hips to lower the barbell.",
      "Lower until you feel a stretch in your hamstrings, typically just below the knees.",
      "Return to the starting position by driving your hips forward."
    ],
    muscles: ["Hamstrings", "Glutes", "Lower Back"],
    equipment: ["Barbell"]
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "Chest",
    description: "A compound exercise that primarily targets the upper chest, but also works the shoulders and triceps.",
    instructions: [
      "Lie on an incline bench set to about 30-45 degrees.",
      "Grip the barbell with hands slightly wider than shoulder-width apart.",
      "Lower the barbell to your upper chest.",
      "Press the barbell back up to the starting position, fully extending your arms."
    ],
    muscles: ["Upper Chest", "Shoulders", "Triceps"],
    equipment: ["Barbell", "Incline Bench"]
  },
  {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    category: "Back",
    description: "A compound exercise that primarily targets the middle back and lats.",
    instructions: [
      "Place your right knee and hand on a bench, with your left foot on the floor.",
      "Hold a dumbbell in your left hand, arm fully extended.",
      "Pull the dumbbell up to your hip, keeping your elbow close to your body.",
      "Lower the dumbbell back to the starting position with controlled movement.",
      "Complete all reps on one side before switching to the other."
    ],
    muscles: ["Middle Back", "Lats", "Biceps"],
    equipment: ["Dumbbell", "Bench"]
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "Legs",
    description: "An isolation exercise that targets the quadriceps.",
    instructions: [
      "Sit in a leg extension machine with your back against the padded support.",
      "Place your feet under the padded bar, knees at 90 degrees.",
      "Extend your legs until they are straight but not locked.",
      "Slowly return to the starting position."
    ],
    muscles: ["Quadriceps"],
    equipment: ["Leg Extension Machine"]
  },
  {
    id: "leg-curl",
    name: "Leg Curl",
    category: "Legs",
    description: "An isolation exercise that targets the hamstrings.",
    instructions: [
      "Lie face down on a leg curl machine with your heels under the padded bar.",
      "Curl your legs up as far as possible by bending your knees.",
      "Slowly return to the starting position with controlled movement."
    ],
    muscles: ["Hamstrings"],
    equipment: ["Leg Curl Machine"]
  },
  {
    id: "cable-fly",
    name: "Cable Fly",
    category: "Chest",
    description: "An isolation exercise that targets the chest muscles.",
    instructions: [
      "Stand in the middle of a cable machine with the pulleys set at chest height.",
      "Grip the handles with palms facing each other, arms extended to the sides.",
      "Keeping a slight bend in your elbows, bring your hands together in front of your chest.",
      "Slowly return to the starting position with controlled movement."
    ],
    muscles: ["Chest", "Shoulders"],
    equipment: ["Cable Machine"]
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    category: "Shoulders",
    description: "An isolation exercise that targets the lateral deltoids (side shoulders).",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides.",
      "Keeping your arms straight but not locked, raise the dumbbells out to the sides.",
      "Raise until your arms are parallel to the floor, then slowly lower back down."
    ],
    muscles: ["Shoulders"],
    equipment: ["Dumbbells"]
  },
  {
    id: "face-pull",
    name: "Face Pull",
    category: "Shoulders",
    description: "A compound exercise that targets the rear deltoids and upper back.",
    instructions: [
      "Stand facing a cable machine with a rope attachment set at head height.",
      "Grip the rope with both hands, palms facing each other.",
      "Pull the rope towards your face, separating the ends as you pull.",
      "Slowly return to the starting position with controlled movement."
    ],
    muscles: ["Rear Deltoids", "Traps", "Rhomboids"],
    equipment: ["Cable Machine"]
  },
  {
    id: "calf-raise",
    name: "Calf Raise",
    category: "Legs",
    description: "An isolation exercise that targets the calf muscles.",
    instructions: [
      "Stand on the edge of a step or platform with your heels hanging off.",
      "Rise up onto your toes as high as possible.",
      "Lower your heels below the level of the step, feeling a stretch in your calves.",
      "Repeat for the desired number of repetitions."
    ],
    muscles: ["Calves"],
    equipment: ["Step or Platform"]
  },
  {
    id: "plank",
    name: "Plank",
    category: "Core",
    description: "An isometric exercise that primarily targets the core muscles.",
    instructions: [
      "Start in a push-up position, then bend your elbows and rest your weight on your forearms.",
      "Your body should form a straight line from your head to your feet.",
      "Engage your core and hold the position for the desired time."
    ],
    muscles: ["Abs", "Lower Back", "Shoulders"],
    equipment: ["None"]
  },
  {
    id: "russian-twist",
    name: "Russian Twist",
    category: "Core",
    description: "A dynamic exercise that targets the obliques and abdominal muscles.",
    instructions: [
      "Sit on the floor with your knees bent and feet flat.",
      "Lean back slightly, keeping your back straight.",
      "Twist your torso to the right, then to the left, touching the floor on each side.",
      "For added difficulty, hold a weight or medicine ball."
    ],
    muscles: ["Obliques", "Abs"],
    equipment: ["Optional: Weight or Medicine Ball"]
  },
  {
    id: "push-up",
    name: "Push-Up",
    category: "Chest",
    description: "A compound bodyweight exercise that primarily targets the chest, shoulders, and triceps.",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart.",
      "Lower your body until your chest nearly touches the floor.",
      "Push your body back up to the starting position, fully extending your arms."
    ],
    muscles: ["Chest", "Shoulders", "Triceps", "Core"],
    equipment: ["None"]
  },
  {
    id: "dip",
    name: "Dip",
    category: "Chest",
    description: "A compound bodyweight exercise that primarily targets the chest, shoulders, and triceps.",
    instructions: [
      "Grip parallel bars with your palms facing inward.",
      "Lower your body by bending your elbows until they reach a 90-degree angle.",
      "Push your body back up to the starting position, fully extending your arms."
    ],
    muscles: ["Chest", "Shoulders", "Triceps"],
    equipment: ["Parallel Bars or Dip Station"]
  },
  {
    id: "chin-up",
    name: "Chin-Up",
    category: "Back",
    description: "A compound bodyweight exercise that primarily targets the biceps and back.",
    instructions: [
      "Hang from a pull-up bar with hands shoulder-width apart, palms facing toward you.",
      "Pull your body up until your chin is above the bar.",
      "Lower your body back to the starting position with controlled movement."
    ],
    muscles: ["Biceps", "Lats", "Forearms"],
    equipment: ["Pull-Up Bar"]
  },
  {
    id: "hanging-leg-raise",
    name: "Hanging Leg Raise",
    category: "Core",
    description: "A challenging exercise that primarily targets the lower abdominal muscles.",
    instructions: [
      "Hang from a pull-up bar with hands shoulder-width apart.",
      "Keeping your legs straight, raise them until they are parallel to the floor or higher.",
      "Lower your legs back to the starting position with controlled movement."
    ],
    muscles: ["Lower Abs", "Hip Flexors"],
    equipment: ["Pull-Up Bar"]
  },
  {
    id: "mountain-climber",
    name: "Mountain Climber",
    category: "Core",
    description: "A dynamic exercise that targets the core while providing cardiovascular benefits.",
    instructions: [
      "Start in a push-up position with your arms straight and hands shoulder-width apart.",
      "Bring your right knee toward your chest, then quickly switch legs, bringing your left knee forward.",
      "Continue alternating legs in a running motion."
    ],
    muscles: ["Abs", "Hip Flexors", "Shoulders"],
    equipment: ["None"]
  },
  {
    id: "burpee",
    name: "Burpee",
    category: "Full Body",
    description: "A high-intensity exercise that works multiple muscle groups and provides cardiovascular benefits.",
    instructions: [
      "Start standing, then squat down and place your hands on the floor.",
      "Jump your feet back into a push-up position.",
      "Perform a push-up (optional).",
      "Jump your feet back to your hands, then explosively jump up with arms overhead."
    ],
    muscles: ["Chest", "Shoulders", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Core"],
    equipment: ["None"]
  },
  {
    id: "kettlebell-swing",
    name: "Kettlebell Swing",
    category: "Full Body",
    description: "A dynamic exercise that primarily targets the posterior chain (hamstrings, glutes, and lower back).",
    instructions: [
      "Stand with feet shoulder-width apart, holding a kettlebell with both hands.",
      "Hinge at the hips to swing the kettlebell between your legs.",
      "Thrust your hips forward to swing the kettlebell up to chest height.",
      "Let the kettlebell fall back between your legs and repeat."
    ],
    muscles: ["Hamstrings", "Glutes", "Lower Back", "Shoulders"],
    equipment: ["Kettlebell"]
  },
  {
    id: "box-jump",
    name: "Box Jump",
    category: "Legs",
    description: "A plyometric exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand in front of a sturdy box or platform.",
      "Bend your knees and swing your arms back, then explosively jump onto the box.",
      "Land softly with your knees slightly bent.",
      "Step back down and repeat."
    ],
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
    equipment: ["Box or Platform"]
  },
  {
    id: "battle-ropes",
    name: "Battle Ropes",
    category: "Full Body",
    description: "A high-intensity exercise that works the upper body and provides cardiovascular benefits.",
    instructions: [
      "Stand with feet shoulder-width apart, holding one end of a battle rope in each hand.",
      "Create waves with the ropes by alternately raising and lowering your arms.",
      "Maintain a steady rhythm and keep your core engaged."
    ],
    muscles: ["Shoulders", "Arms", "Back", "Core"],
    equipment: ["Battle Ropes"]
  },
  {
    id: "farmers-walk",
    name: "Farmer's Walk",
    category: "Full Body",
    description: "A simple yet effective exercise that builds grip strength, shoulders, and core stability.",
    instructions: [
      "Hold a heavy dumbbell or kettlebell in each hand at your sides.",
      "Walk forward with a controlled pace, keeping your shoulders back and core engaged.",
      "Continue for the desired distance or time."
    ],
    muscles: ["Forearms", "Traps", "Shoulders", "Core"],
    equipment: ["Dumbbells or Kettlebells"]
  }
];