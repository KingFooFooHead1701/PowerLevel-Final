export interface Exercise {
  id: string;
  name: string;
  category: string;
  displacement: number; // in meters
  requiresBodyWeight?: boolean;
  isCardio?: boolean;
  isIsometric?: boolean;
  description?: string;
  metValue?: number; // Metabolic Equivalent of Task for cardio exercises
}

export const defaultExercises: Exercise[] = [
  // Chest
  { 
    id: "bench-press", 
    name: "Bench Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Lie on a flat bench, grip the barbell with hands wider than shoulder-width, then press up until arms extend and lower to chest level. Your pecs are about to get more attention than your dating profile picture."
  },
  { 
    id: "incline-press", 
    name: "Incline Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Position yourself on an inclined bench (15-30°), grip the bar slightly wider than shoulders, press up and lower to upper chest. Upper chest development: because looking good in V-necks is a human right."
  },
  { 
    id: "decline-press", 
    name: "Decline Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Lie on a decline bench with feet secured, grip barbell wider than shoulders, press up from lower chest, then lower with control. The only decline you should be accepting in your fitness journey."
  },
  { 
    id: "chest-fly", 
    name: "Chest Fly", 
    category: "Chest", 
    displacement: 0.5,
    description: "Lie on bench holding dumbbells above chest with slight elbow bend, lower weights in arc motion to sides, then squeeze back together. Like hugging the world's most awkward invisible tree."
  },
  { 
    id: "push-up", 
    name: "Push-Up", 
    category: "Chest", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in plank position with hands shoulder-width apart, lower chest to floor by bending elbows, then push back up. If you can still update your Instagram story after set three, you're doing it wrong."
  },
  { 
    id: "dips-chest", 
    name: "Dips", 
    category: "Chest", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Support yourself between parallel bars, lower body until shoulders are below elbows, then push back up. Gravity is about to become your personal nemesis for the next 60 seconds."
  },
  { 
    id: "cable-crossover", 
    name: "Cable Crossover", 
    category: "Chest", 
    displacement: 0.5,
    description: "Stand between cable stations with arms extended to sides, pull handles forward and down in arcing motion until they cross. Perfect for practicing your superhero landing pose without the knee damage."
  },
  { 
    id: "pec-deck", 
    name: "Pec Deck", 
    category: "Chest", 
    displacement: 0.4,
    description: "Sit at machine with forearms on pads, press arms together in front of chest, then control the return. Like trying to clap with resistance that fights back harder than your ex."
  },
  { 
    id: "smith-machine-bench", 
    name: "Smith Machine Bench Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Perform bench press on Smith machine with fixed barbell path, pressing up and lowering with control. For when you want to bench press but also want training wheels and a safety net."
  },
  { 
    id: "chest-press-machine", 
    name: "Chest Press Machine", 
    category: "Chest", 
    displacement: 0.4,
    description: "Sit at machine with hands on handles at chest level, press forward until arms extend, then return. The bench press for people who value their spine more than their ego."
  },
  { 
    id: "landmine-press-chest", 
    name: "Landmine Press", 
    category: "Chest", 
    displacement: 0.5,
    description: "With barbell secured in landmine, hold end with one or both hands at shoulder, press up and away at angle. Like jousting with a barbell while your dignity watches from the sidelines."
  },
  { 
    id: "svend-press", 
    name: "Svend Press", 
    category: "Chest", 
    displacement: 0.3,
    description: "Press plate or dumbbells together between palms at chest level, extend arms forward while maintaining pressure, then return. Named after a Viking, feels like torture designed by one too."
  },
  
  // Back
  { 
    id: "pull-up", 
    name: "Pull-Up", 
    category: "Back", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Hang from bar with overhand grip, pull body up until chin clears bar, then lower with control. The exercise everyone attempts after watching too many superhero movies and immediately regrets."
  },
  { 
    id: "lat-pulldown", 
    name: "Lat Pulldown", 
    category: "Back", 
    displacement: 0.5,
    description: "Sit at machine, grip bar with hands wider than shoulders, pull down to upper chest while keeping back straight. Pull-ups for people who enjoy the luxury of sitting down while suffering."
  },
  { 
    id: "bent-over-row", 
    name: "Bent-Over Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Bend at hips with back flat, pull barbell to lower chest, then lower with control. The exercise that simultaneously builds your back and teaches you humility when you drop the weight."
  },
  { 
    id: "seated-row", 
    name: "Seated Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Sit at cable machine with knees slightly bent, pull handle to abdomen while keeping back straight. Like rowing a boat that's permanently anchored to your disappointment."
  },
  { 
    id: "deadlift", 
    name: "Deadlift", 
    category: "Back", 
    displacement: 0.6,
    description: "Stand with bar over feet, bend to grip bar with flat back, drive through heels to stand up straight. The exercise that makes you question all your life choices in real time."
  },
  { 
    id: "back-extension", 
    name: "Back Extension", 
    category: "Back", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Position yourself on hyperextension bench with hips on pad, lower upper body toward floor, then raise to slightly above parallel. Like a trust fall with yourself where the floor is always judging you."
  },
  { 
    id: "t-bar-row", 
    name: "T-Bar Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Straddle T-bar with chest against pad, grip handles, pull weight up by driving elbows back. The rowing exercise that looks most like you're riding a mechanical bull at a fitness-themed bar."
  },
  { 
    id: "single-arm-row", 
    name: "Single-Arm Dumbbell Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Place one knee and hand on bench, pull dumbbell to hip while keeping back flat. For when you want to look like you're starting a lawnmower but with better deltoid definition."
  },
  { 
    id: "face-pull-back", 
    name: "Face Pull (Back)", 
    category: "Back", 
    displacement: 0.4,
    description: "Stand facing cable machine, pull rope attachment toward face with elbows high, then return with control. The exercise that makes you look like you're aggressively flossing your entire upper body."
  },
  { 
    id: "straight-arm-pulldown", 
    name: "Straight Arm Pulldown", 
    category: "Back", 
    displacement: 0.5,
    description: "Stand facing cable machine, grip bar with straight arms overhead, pull down in arc to thighs. Like trying to push down an invisible garage door that's fighting for its mechanical life."
  },
  { 
    id: "smith-machine-row", 
    name: "Smith Machine Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Bend at hips under Smith machine bar, pull bar to abdomen, then lower with control. For when you want to row but also want to stay in your lane like a swimming pool champion."
  },
  { 
    id: "lat-pullover", 
    name: "Lat Pullover", 
    category: "Back", 
    displacement: 0.5,
    description: "Lie across bench with dumbbell held above chest, lower weight in arc behind head, then return. Like you're trying to throw something behind you very slowly while your lats scream for mercy."
  },
  { 
    id: "meadows-row", 
    name: "Meadows Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Position landmine in corner, stand parallel with feet staggered, row end of bar to hip with outside hand. Named after a legend, feels like wrestling a barbell that knows all your weaknesses."
  },
  { 
    id: "chest-supported-row", 
    name: "Chest Supported Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Lie face down on incline bench, pull dumbbells up by driving elbows back. For people who want to row but also take a nap and avoid lower back responsibility simultaneously."
  },
  
  // Legs
  { 
    id: "squat", 
    name: "Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Stand with barbell across upper back, bend knees and hips to lower until thighs are parallel to floor, then drive up. The exercise that makes stairs your sworn enemy for the next three days."
  },
  { 
    id: "leg-press", 
    name: "Leg Press", 
    category: "Legs", 
    displacement: 0.5,
    description: "Sit in machine with feet on platform, press weight away by extending knees and hips, then return. Squats for people who enjoy sitting down while their quads contemplate a mutiny."
  },
  { 
    id: "leg-extension", 
    name: "Leg Extension", 
    category: "Legs", 
    displacement: 0.5,
    description: "Sit in machine with pads over ankles, extend knees to lift weight, then lower with control. The exercise that makes you feel like you're kicking invisible enemies in slow motion."
  },
  { 
    id: "leg-curl", 
    name: "Leg Curl", 
    category: "Legs", 
    displacement: 0.5,
    description: "Lie face down on machine with pads behind ankles, curl weight by bending knees, then extend. Like trying to kick yourself in the butt for skipping leg day last week."
  },
  { 
    id: "calf-raise", 
    name: "Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Stand with balls of feet on elevated surface, lower heels toward floor, then raise up as high as possible. The exercise everyone does while waiting in line, thinking they're being subtle."
  },
  { 
    id: "lunge", 
    name: "Lunge", 
    category: "Legs", 
    displacement: 0.6,
    description: "Step forward with one leg, lower until both knees are bent at 90 degrees, then push back to start. Like practicing for when you trip but with weights and intentional suffering."
  },
  { 
    id: "bulgarian-split-squat", 
    name: "Bulgarian Split Squat", 
    category: "Legs", 
    displacement: 0.5,
    description: "Place rear foot on bench behind you, lower until front thigh is parallel to floor, then push up. Named after Bulgarians, who clearly enjoy watching people suffer in asymmetrical agony."
  },
  { 
    id: "hack-squat", 
    name: "Hack Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Position yourself in hack squat machine, lower body by bending knees, then extend to starting position. Like a squat with training wheels, minus the childhood joy and plus adult pain."
  },
  { 
    id: "smith-machine-squat", 
    name: "Smith Machine Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Perform squat using Smith machine with fixed barbell path, lowering and raising with control. For when you want to squat but also want to stay in your lane like a bowling ball with guardrails."
  },
  { 
    id: "goblet-squat", 
    name: "Goblet Squat", 
    category: "Legs", 
    displacement: 0.5,
    description: "Hold dumbbell or kettlebell close to chest, squat until thighs are parallel to floor, then return to standing. Like hugging a weight while sitting on an invisible chair that hates your quads."
  },
  { 
    id: "sumo-squat", 
    name: "Sumo Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Stand with feet wider than shoulders and toes pointed out, squat while keeping knees in line with toes. Named after sumo wrestlers but sadly doesn't come with the cool outfit or free lunch."
  },
  { 
    id: "seated-calf-raise", 
    name: "Seated Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Sit with knees bent and balls of feet on platform, lower heels toward floor, then raise as high as possible. For when standing up to work your calves feels like too much commitment to leg day."
  },
  { 
    id: "standing-calf-raise", 
    name: "Standing Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Stand with shoulders under pads and balls of feet on platform, raise heels as high as possible. The exercise that makes you look like you're trying to see over a crowd of judgmental calves."
  },
  { 
    id: "adductor-machine", 
    name: "Adductor Machine", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit in machine with pads against inner thighs, press legs together against resistance, then return. The most awkward-looking exercise in the gym, now with bonus eye contact avoidance."
  },
  { 
    id: "abductor-machine", 
    name: "Abductor Machine", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit in machine with pads against outer thighs, press legs outward against resistance, then return. The second most awkward-looking exercise, perfect for establishing your personal space bubble."
  },
  { 
    id: "glute-bridge", 
    name: "Glute Bridge", 
    category: "Legs", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with knees bent and feet flat, lift hips toward ceiling by squeezing glutes, then lower. The exercise that makes you look like you're auditioning for a very strange music video."
  },
  { 
    id: "hip-thrust", 
    name: "Hip Thrust", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit with upper back against bench and barbell across hips, drive through heels to lift hips to full extension. The exercise you hope no one walks by during, yet everyone somehow does."
  },
  { 
    id: "step-up", 
    name: "Step Up", 
    category: "Legs", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Stand facing box or bench, step up with one foot, drive through heel to bring other foot up. Like climbing stairs but with purpose, sweat, and the distant memory of painless walking."
  },
  { 
    id: "box-jump", 
    name: "Box Jump", 
    category: "Legs", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Stand facing box, drop into quarter squat, jump explosively to land on box with soft knees. The exercise with the highest risk-to-Instagram-likes ratio in the entire fitness universe."
  },
  
  // Arms
  { 
    id: "bicep-curl", 
    name: "Bicep Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand holding weights with arms extended, curl weights toward shoulders by bending elbows, then lower. The exercise most likely to be performed directly in front of the dumbbell rack, blocking everyone."
  },
  { 
    id: "hammer-curl", 
    name: "Hammer Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bicep curl with palms facing each other throughout movement, curling up and lowering with control. Named after hammers, but significantly less useful for home renovation projects."
  },
  { 
    id: "tricep-extension", 
    name: "Tricep Extension", 
    category: "Arms", 
    displacement: 0.4,
    description: "Hold weight overhead with both hands, lower behind head by bending elbows, then extend arms up. Like trying to elbow someone behind you in slow motion while holding a heavy paperweight."
  },
  { 
    id: "tricep-pushdown", 
    name: "Tricep Pushdown", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand facing cable machine, grip attachment with elbows at sides, extend arms downward against resistance. The arm exercise for people who like pushing things down with extreme prejudice."
  },
  { 
    id: "skull-crusher", 
    name: "Skull Crusher", 
    category: "Arms", 
    displacement: 0.4,
    description: "Lie on bench holding weight above face, bend elbows to lower weight toward forehead, then extend arms. Named after what happens if you fail the rep, which is totally reassuring for beginners."
  },
  { 
    id: "wrist-curl", 
    name: "Wrist Curl", 
    category: "Arms", 
    displacement: 0.2,
    description: "Sit with forearms on thighs and wrists beyond knees, palms up, curl weight by bending wrists upward. For when you want forearms like Popeye but hate spinach and nautical adventures."
  },
  { 
    id: "preacher-curl", 
    name: "Preacher Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Sit at preacher bench with arms extended over pad, curl weight toward shoulders, then lower. The bicep curl for people who need supervision to behave and not cheat their reps."
  },
  { 
    id: "concentration-curl", 
    name: "Concentration Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Sit with elbow braced against inner thigh, curl weight toward shoulder, then lower with control. The curl that requires you to stare intensely at your bicep like it owes you rent money."
  },
  { 
    id: "cable-curl", 
    name: "Cable Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand facing cable machine with arms extended, curl handle toward shoulders, then lower. Like regular curls but with a robot offering constant resistance and silent judgment."
  },
  { 
    id: "ez-bar-curl", 
    name: "EZ Bar Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bicep curl using EZ bar with angled grip, curling up and lowering with control. For when straight bars are too mainstream for your biceps and wrists have trust issues."
  },
  { 
    id: "reverse-curl", 
    name: "Reverse Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bicep curl with palms facing down throughout movement, curling up and lowering with control. Like regular curls but with an identity crisis and extra forearm activation."
  },
  { 
    id: "overhead-tricep-extension", 
    name: "Overhead Tricep Extension", 
    category: "Arms", 
    displacement: 0.5,
    description: "Hold dumbbell overhead with both hands, lower behind head by bending elbows, then extend arms. Like trying to reach that itch in the middle of your back while holding a small bowling ball."
  },
  { 
    id: "tricep-kickback", 
    name: "Tricep Kickback", 
    category: "Arms", 
    displacement: 0.4,
    description: "Bend at hips with upper arm parallel to floor, extend forearm backward until arm is straight. The exercise that makes you look like you're impersonating a dinosaur with very small arms."
  },
  { 
    id: "diamond-push-up", 
    name: "Diamond Push-Up", 
    category: "Arms", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Perform push-up with hands close together forming diamond shape under chest, lowering and pushing up. Like regular push-ups but with extra suffering and a fancy geometric name to justify it."
  },
  { 
    id: "close-grip-bench", 
    name: "Close Grip Bench Press", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bench press with hands positioned shoulder-width apart, pressing up and lowering with control. For when you want to bench press but also want bigger arms to fill those T-shirt sleeves."
  },
  { 
    id: "reverse-wrist-curl", 
    name: "Reverse Wrist Curl", 
    category: "Arms", 
    displacement: 0.2,
    description: "Sit with forearms on thighs and wrists beyond knees, palms down, curl weight by bending wrists upward. The forearm exercise that makes opening stubborn jars a less dramatic life event."
  },
  { 
    id: "plate-pinch", 
    name: "Plate Pinch", 
    category: "Arms", 
    displacement: 0.1,
    description: "Pinch weight plates between thumb and fingers, hold for time, then release. The exercise that makes you look like you're stealing plates from the gym with extremely suspicious technique."
  },
  
  // Shoulders
  { 
    id: "overhead-press", 
    name: "Overhead Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand holding weight at shoulder level, press overhead until arms are extended, then lower with control. The exercise that makes you realize how low your ceilings are at home, usually the hard way."
  },
  { 
    id: "lateral-raise", 
    name: "Lateral Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand holding weights at sides, raise arms out to sides until parallel with floor, then lower. Like trying to slowly fly away from your problems while gravity laughs at your ambition."
  },
  { 
    id: "front-raise", 
    name: "Front Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand holding weights at front of thighs, raise arms forward until parallel with floor, then lower. The exercise that makes you look like you're dramatically presenting invisible pizza boxes."
  },
  { 
    id: "rear-delt-fly", 
    name: "Rear Delt Fly", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Bend at hips with back flat, raise weights out to sides with slight elbow bend, then lower. The shoulder exercise most people forget exists until their posture resembles a question mark."
  },
  { 
    id: "shrug", 
    name: "Shrug", 
    category: "Shoulders", 
    displacement: 0.3,
    description: "Stand holding weights at sides, lift shoulders toward ears, hold briefly, then lower with control. The exercise that perfectly mimics how you respond to difficult questions about your diet."
  },
  { 
    id: "upright-row", 
    name: "Upright Row", 
    category: "Shoulders", 
    displacement: 0.4,
    description: "Stand holding weight in front of thighs, pull up toward chin by raising elbows, then lower. Like trying to start a lawnmower that's directly in front of you while wearing invisible suspenders."
  },
  { 
    id: "arnold-press", 
    name: "Arnold Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Sit holding dumbbells at shoulders with palms facing you, press overhead while rotating palms forward. Named after Arnold, but sadly doesn't give you his accent or movie career."
  },
  { 
    id: "push-press-shoulders", 
    name: "Push Press", 
    category: "Shoulders", 
    displacement: 0.6,
    description: "Dip slightly at knees, then explosively drive weight overhead using leg momentum, lowering with control. Like cheating at overhead press, but with official permission and technique validation."
  },
  { 
    id: "shoulder-press-machine", 
    name: "Shoulder Press Machine", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Sit at machine with hands on handles at shoulder height, press upward until arms extend. For when free weights are too free-spirited for you and you prefer your shoulder pain predictable."
  },
  { 
    id: "smith-machine-shoulder-press", 
    name: "Smith Machine Shoulder Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Perform shoulder press using Smith machine with fixed barbell path, pressing up and lowering. For when you want to press overhead but also stay in your lane like a train on very shiny tracks."
  },
  { 
    id: "cable-lateral-raise", 
    name: "Cable Lateral Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand sideways to cable machine, raise arm out to side until parallel with floor, then lower. Like regular lateral raises but with a robot offering resistance and no place to hide from form checks."
  },
  { 
    id: "face-pull-shoulders", 
    name: "Face Pull (Shoulders)", 
    category: "Shoulders", 
    displacement: 0.4,
    description: "Stand facing cable machine, pull rope attachment toward face with elbows high and out. The exercise that makes you look like you're aggressively flossing your entire upper body in public."
  },
  { 
    id: "landmine-press-shoulders", 
    name: "Landmine Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "With barbell secured in landmine, hold end at shoulder, press up and away at angle, then lower. Like trying to push away a very persistent barbell that's determined to test your shoulder stability."
  },
  { 
    id: "bradford-press", 
    name: "Bradford Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Press barbell from front of shoulders to behind neck and back in continuous motion. Named after Jim Bradford, who apparently enjoyed shoulder torture and showing off at parties."
  },
  
  // Core
  { 
    id: "crunch", 
    name: "Crunch", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with knees bent, curl upper body toward knees by contracting abs, then lower with control. The exercise everyone does for beach abs and then wonders why their fridge still defeats them."
  },
  { 
    id: "plank", 
    name: "Plank", 
    category: "Core", 
    displacement: 0.0, 
    requiresBodyWeight: true, 
    isIsometric: true,
    description: "Support body on forearms and toes with body in straight line from head to heels, hold position. The exercise where time mysteriously slows to half speed and seconds become eternal torment."
  },
  { 
    id: "russian-twist", 
    name: "Russian Twist", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Sit with knees bent and feet elevated, twist torso to touch weight to floor on each side. Named after Russians, who clearly enjoy core pain and watching foreigners struggle with simple movements."
  },
  { 
    id: "leg-raise", 
    name: "Leg Raise", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Lie on back with hands under glutes, raise straight legs until perpendicular to floor, then lower. Like trying to kick the ceiling while lying down and questioning your life choices simultaneously."
  },
  { 
    id: "ab-wheel", 
    name: "Ab Wheel", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Kneel holding ab wheel, roll forward extending body in straight line, then use abs to pull back. The $10 device that delivers $1000 worth of humility and next-day regret."
  },
  { 
    id: "side-bend", 
    name: "Side Bend", 
    category: "Core", 
    displacement: 0.3,
    description: "Stand holding weight at side, bend sideways by lowering weight toward floor, then return to upright. The exercise that makes you look like you're dramatically picking up a quarter in slow motion."
  },
  { 
    id: "hanging-leg-raise", 
    name: "Hanging Leg Raise", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Hang from bar, raise legs until parallel with floor or higher, then lower with control. Like regular leg raises but with added fear of falling and public embarrassment as motivation."
  },
  { 
    id: "mountain-climber-core", 
    name: "Mountain Climber", 
    category: "Core", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in push-up position, rapidly alternate bringing knees toward chest in running motion. Like running in place while in a push-up position, because regular cardio wasn't punishing enough."
  },
  { 
    id: "bicycle-crunch", 
    name: "Bicycle Crunch", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back, alternate touching elbow to opposite knee while extending other leg. The only acceptable form of cycling to do indoors without getting strange looks from your cat."
  },
  { 
    id: "dead-bug", 
    name: "Dead Bug", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with arms and legs raised, alternate extending opposite arm and leg. Named after a dead bug, which is both accurate and slightly disturbing for your exercise motivation."
  },
  { 
    id: "hollow-hold", 
    name: "Hollow Hold", 
    category: "Core", 
    displacement: 0.0, 
    requiresBodyWeight: true, 
    isIsometric: true,
    description: "Lie on back, raise shoulders and legs off floor while pressing lower back down, hold position. Like a plank but for people who prefer to see the ceiling while questioning their fitness journey."
  },
  { 
    id: "v-up", 
    name: "V-Up", 
    category: "Core", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Lie on back, simultaneously raise legs and upper body to form V-shape, then lower with control. For when regular crunches aren't making you question your life choices with sufficient intensity."
  },
  { 
    id: "dragon-flag", 
    name: "Dragon Flag", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Lie on bench holding behind head, raise entire body as straight line pivoting on shoulders, then lower. Named by Bruce Lee, who apparently hated everyone's abs and wanted them to suffer creatively."
  },
  { 
    id: "ab-crunch-machine", 
    name: "Ab Crunch Machine", 
    category: "Core", 
    displacement: 0.3,
    description: "Sit in machine with pads on chest, crunch forward against resistance, then return with control. For when you want to work your abs but also want to sit down and read emails between sets."
  },
  { 
    id: "cable-crunch", 
    name: "Cable Crunch", 
    category: "Core", 
    displacement: 0.4,
    description: "Kneel facing cable machine, hold rope behind head, crunch toward floor by contracting abs. Like regular crunches but with a robot offering resistance and awkward kneeling positions."
  },
  { 
    id: "oblique-crunch", 
    name: "Oblique Crunch", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with knees bent to one side, curl upper body toward knees, then lower with control. The exercise that makes you look like you're constantly falling to one side with great purpose."
  },
  { 
    id: "side-plank", 
    name: "Side Plank", 
    category: "Core", 
    displacement: 0.0, 
    requiresBodyWeight: true, 
    isIsometric: true,
    description: "Support body on one forearm and side of foot with body in straight line, hold position. Like a regular plank but with a twist—literally—and twice the opportunity to shake uncontrollably."
  },
  { 
    id: "medicine-ball-slam", 
    name: "Medicine Ball Slam", 
    category: "Core", 
    displacement: 0.6,
    description: "Stand holding medicine ball overhead, forcefully throw ball to floor using abs and arms. The exercise that lets you legally throw things in the gym while pretending it's for fitness, not frustration."
  },
  
  // Cardio - Simplified to just two main treadmill types
  { 
    id: "treadmill-walk", 
    name: "Treadmill Walk", 
    category: "Cardio", 
    displacement: 0.0, 
    isCardio: true, 
    metValue: 3.5,
    description: "Walk on treadmill at your chosen pace and incline, maintaining good posture throughout. Enter your settings for accurate tracking. The only time walking in place actually gets you somewhere in life."
  },
  { 
    id: "treadmill-run", 
    name: "Treadmill Run", 
    category: "Cardio", 
    displacement: 0.0, 
    isCardio: true, 
    metValue: 8.0,
    description: "Run on treadmill at your chosen pace and incline, maintaining consistent stride and breathing. Like running from your problems, except you stay in exactly the same place and pay for the privilege."
  },
  
  { 
    id: "elliptical-low", 
    name: "Elliptical (Low Resistance)", 
    category: "Cardio", 
    displacement: 0.03, 
    isCardio: true, 
    metValue: 5.0,
    description: "Use elliptical machine with minimal resistance, maintaining smooth motion and good posture. For when you want to pretend you're cross-country skiing without the snow, skill, or scenery."
  },
  { 
    id: "elliptical-medium", 
    name: "Elliptical (Medium Resistance)", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 7.0,
    description: "Use elliptical machine with moderate resistance, focusing on pushing and pulling with arms and legs. Like running through shallow mud but without getting dirty or having interesting stories after."
  },
  { 
    id: "elliptical-high", 
    name: "Elliptical (High Resistance)", 
    category: "Cardio", 
    displacement: 0.08, 
    isCardio: true, 
    metValue: 9.0,
    description: "Use elliptical machine with challenging resistance, engaging core and maintaining consistent effort. For when you want the burn of running without the joint impact or actual achievement."
  },
  
  { 
    id: "stair-stepper-low", 
    name: "Stair Stepper (Low Intensity)", 
    category: "Cardio", 
    displacement: 0.1, 
    isCardio: true, 
    metValue: 4.0,
    description: "Use stair stepper machine at slow pace, maintaining upright posture and controlled breathing. Like climbing endless stairs while going absolutely nowhere and questioning your life choices."
  },
  { 
    id: "stair-stepper-medium", 
    name: "Stair Stepper (Medium Intensity)", 
    category: "Cardio", 
    displacement: 0.15, 
    isCardio: true, 
    metValue: 6.0,
    description: "Use stair stepper machine at moderate pace, focusing on full foot placement and posture. For when you want to know what living in a fifth-floor walkup feels like without the benefit of reaching an apartment."
  },
  { 
    id: "stair-stepper-high", 
    name: "Stair Stepper (High Intensity)", 
    category: "Cardio", 
    displacement: 0.2, 
    isCardio: true, 
    metValue: 8.0,
    description: "Use stair stepper machine at fast pace, maintaining control and minimizing handrail support. Like escaping a burning building but forever, with no exit and questionable cardiovascular benefits."
  },
  
  { 
    id: "stationary-bike-low", 
    name: "Stationary Bike (Low Resistance)", 
    category: "Cardio", 
    displacement: 0.02, 
    isCardio: true, 
    metValue: 4.0,
    description: "Cycle on stationary bike with minimal resistance, maintaining steady cadence and proper form. For when you want to exercise but also read a magazine, check emails, and avoid actual cycling skills."
  },
  { 
    id: "stationary-bike-medium", 
    name: "Stationary Bike (Medium Resistance)", 
    category: "Cardio", 
    displacement: 0.04, 
    isCardio: true, 
    metValue: 6.0,
    description: "Cycle on stationary bike with moderate resistance, focusing on consistent pedaling and engagement. Like biking through a perpetual slight headwind while scenery remains suspiciously identical."
  },
  { 
    id: "stationary-bike-high", 
    name: "Stationary Bike (High Resistance)", 
    category: "Cardio", 
    displacement: 0.06, 
    isCardio: true, 
    metValue: 8.5,
    description: "Cycle on stationary bike with challenging resistance, maintaining proper form and breathing. For when you want to experience biking uphill without the reward of ever going downhill afterward."
  },
  
  { 
    id: "rowing-machine-low", 
    name: "Rowing Machine (Low Resistance)", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 5.0,
    description: "Use rowing machine with minimal resistance, focusing on proper sequence: legs, back, arms, then reverse. Like rowing a boat on a perfectly calm lake but indoors and significantly less Instagram-worthy."
  },
  { 
    id: "rowing-machine-medium", 
    name: "Rowing Machine (Medium Resistance)", 
    category: "Cardio", 
    displacement: 0.08, 
    isCardio: true, 
    metValue: 7.0,
    description: "Use rowing machine with moderate resistance, maintaining good form and consistent pace. For when you want to pretend you're escaping Alcatraz at a reasonable pace without getting wet."
  },
  { 
    id: "rowing-machine-high", 
    name: "Rowing Machine (High Resistance)", 
    category: "Cardio", 
    displacement: 0.12, 
    isCardio: true, 
    metValue: 9.0,
    description: "Use rowing machine with challenging resistance, focusing on power and technique throughout. Like rowing through molasses while someone yells 'stroke' at you and your hands develop character-building blisters."
  },
  
  { 
    id: "jump-rope", 
    name: "Jump Rope", 
    category: "Cardio", 
    displacement: 0.1, 
    isCardio: true, 
    requiresBodyWeight: true, 
    metValue: 10.0,
    description: "Jump rope at steady pace, keeping jumps low and rhythm consistent with relaxed shoulders. The exercise that looks easy until you try it for more than 30 seconds and your lungs file for divorce."
  },
  { 
    id: "battle-ropes", 
    name: "Battle Ropes", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 8.0,
    description: "Create waves with heavy ropes by moving arms rapidly, maintaining stable lower body and core. Like trying to control two angry snakes while standing still and pretending it's a normal workout activity."
  },
  { 
    id: "sled-push", 
    name: "Sled Push", 
    category: "Cardio", 
    displacement: 0.3, 
    isCardio: true, 
    metValue: 9.0,
    description: "Push weighted sled across floor using legs and arms, maintaining low body position and power. Like pushing a broken-down car but on purpose and with people nodding approvingly instead of offering help."
  },
  { 
    id: "assault-bike", 
    name: "Assault Bike", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 9.0,
    description: "Cycle on fan bike using both arms and legs, maintaining consistent effort and breathing. Named 'assault' because that's exactly what it feels like to your entire cardiovascular system and dignity."
  },
  { 
    id: "jacob-ladder", 
    name: "Jacob's Ladder", 
    category: "Cardio", 
    displacement: 0.2, 
    isCardio: true, 
    metValue: 9.0,
    description: "Climb on self-paced rotating ladder, maintaining steady rhythm and upright posture. Like trying to climb your way to heaven but never quite making it because cardio hell is apparently endless."
  },
  
  // Full Body
  { 
    id: "clean-and-jerk", 
    name: "Clean and Jerk", 
    category: "Full Body", 
    displacement: 1.5,
    description: "Explosively pull barbell from floor to shoulders, then drive it overhead with split stance. The Olympic lift that makes you feel like an athlete until you try to walk normally the next day."
  },
  { 
    id: "snatch", 
    name: "Snatch", 
    category: "Full Body", 
    displacement: 1.8,
    description: "Explosively pull barbell from floor to overhead in one continuous motion, catching in squat position. The lift with the unfortunate name and even more unfortunate learning curve for gym newbies."
  },
  { 
    id: "kettlebell-swing", 
    name: "Kettlebell Swing", 
    category: "Full Body", 
    displacement: 1.0,
    description: "Swing kettlebell between legs, then explosively drive hips forward to swing weight to chest height. Like trying to launch a cannonball using only your hips while your hamstrings file a formal complaint."
  },
  { 
    id: "burpee", 
    name: "Burpee", 
    category: "Full Body", 
    displacement: 1.0, 
    requiresBodyWeight: true,
    description: "Drop to floor, perform push-up, jump feet toward hands, then leap upward with hands overhead. The exercise trainers prescribe when they secretly hate you but legally can't say it out loud."
  },
  { 
    id: "thruster", 
    name: "Thruster", 
    category: "Full Body", 
    displacement: 1.2,
    description: "Hold weight at shoulders, squat deeply, then drive upward and press weight overhead in one fluid motion. Named after what it does to your will to live and any plans you had for the next day."
  },
  { 
    id: "turkish-get-up", 
    name: "Turkish Get-Up", 
    category: "Full Body", 
    displacement: 1.5,
    description: "Lie on back holding weight overhead, methodically rise to standing while keeping weight extended. The exercise that makes getting out of bed look like an Olympic event requiring medals and sponsorships."
  },
  { 
    id: "clean", 
    name: "Clean", 
    category: "Full Body", 
    displacement: 1.2,
    description: "Explosively pull barbell from floor to shoulders in one motion, catching in partial squat. Like deadlifting but with more opportunities to hit yourself in the face with a heavy metal object."
  },
  { 
    id: "power-clean", 
    name: "Power Clean", 
    category: "Full Body", 
    displacement: 1.2,
    description: "Perform clean without dropping into full squat position, catching weight at shoulders with minimal bend. The clean for people who don't like squatting all the way down but still enjoy complex movements."
  },
  { 
    id: "hang-clean", 
    name: "Hang Clean", 
    category: "Full Body", 
    displacement: 0.9,
    description: "Perform clean starting with barbell at knee height rather than floor, explosively pulling to shoulders. The clean for people who don't like picking things up from the floor but still want technical challenges."
  },
  { 
    id: "push-press-full", 
    name: "Push Press", 
    category: "Full Body", 
    displacement: 0.8,
    description: "Dip slightly at knees, then explosively drive weight overhead using leg momentum, lowering with control. Like cheating at overhead press, but with official permission and a fancy name to justify it."
  },
  { 
    id: "medicine-ball-throw", 
    name: "Medicine Ball Throw", 
    category: "Full Body", 
    displacement: 1.0,
    description: "Throw weighted ball with explosive movement pattern, focusing on power and full-body coordination. The exercise that lets you legally throw things in the gym without getting banned or judged harshly."
  },
  { 
    id: "battle-rope-slams", 
    name: "Battle Rope Slams", 
    category: "Full Body", 
    displacement: 0.8,
    description: "Raise both arms overhead holding ropes, then forcefully slam ropes to ground with full-body power. For when you need to physically manifest your feelings about work meetings in a socially acceptable way."
  },
  { 
    id: "tire-flip", 
    name: "Tire Flip", 
    category: "Full Body", 
    displacement: 1.0,
    description: "Lift one side of large tire from ground, then explosively flip it over using legs, hips and arms. The exercise that makes you feel like a strongman competitor until your back reminds you that you're just a regular person."
  },
  { 
    id: "farmers-walk", 
    name: "Farmer's Walk", 
    category: "Full Body", 
    displacement: 0.0,
    description: "Carry heavy weights at sides while walking with upright posture and engaged core. Like grocery shopping but with weights that cost more than the food and significantly less nutritional value."
  },
  { 
    id: "bear-crawl", 
    name: "Bear Crawl", 
    category: "Full Body", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Move forward on hands and feet with knees hovering just above ground, maintaining neutral spine. The exercise that makes adults move like babies but with more sweating and existential questioning."
  },
  { 
    id: "mountain-climber-full", 
    name: "Mountain Climber", 
    category: "Full Body", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in push-up position, rapidly alternate bringing knees toward chest in running motion. Like running in place while in a push-up position, because regular running wasn't humbling enough already."
  },
  { 
    id: "jumping-jack", 
    name: "Jumping Jack", 
    category: "Full Body", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Jump while spreading legs and raising arms overhead, then return to standing position with arms at sides. The exercise everyone remembers from elementary school PE class and still somehow gets winded doing."
  },
];