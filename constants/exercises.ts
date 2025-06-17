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
    description: "Lie back on a flat bench, grip the barbell with hands wider than shoulder-width, then press the weight up until arms are extended. Lower the bar to chest level and repeat. Targets chest, shoulders, and triceps. The original Instagram flex since Ancient Greece."
  },
  { 
    id: "incline-press", 
    name: "Incline Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Perform on an inclined bench (15-30°), grip the bar slightly wider than shoulders, press up until arms extend, then lower to upper chest. Emphasizes upper pecs and front deltoids. For when you want your upper chest to match your inflated ego."
  },
  { 
    id: "decline-press", 
    name: "Decline Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Lie on a decline bench with feet secured, grip barbell wider than shoulders, lower to lower chest, then press up. Targets lower pectoral muscles. The only acceptable decline you should experience at the gym."
  },
  { 
    id: "chest-fly", 
    name: "Chest Fly", 
    category: "Chest", 
    displacement: 0.5,
    description: "Lie on bench holding dumbbells above chest with slight elbow bend, lower weights out to sides in arc motion, then bring back together. Isolates and stretches chest muscles. Like giving a bear hug to an invisible friend."
  },
  { 
    id: "push-up", 
    name: "Push-Up", 
    category: "Chest", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in plank position with hands shoulder-width apart, lower chest to floor by bending elbows, then push back up. Works chest, shoulders, triceps, and core. The exercise everyone claims they can do until you ask for proper form."
  },
  { 
    id: "dips-chest", 
    name: "Dips", 
    category: "Chest", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Support yourself between parallel bars, lower body by bending elbows until shoulders are below elbows, then push back up. Targets chest, triceps, and shoulders. The exercise that makes you realize gravity is your worst enemy."
  },
  { 
    id: "cable-crossover", 
    name: "Cable Crossover", 
    category: "Chest", 
    displacement: 0.5,
    description: "Stand between cable stations with arms extended to sides, pull handles forward and down in arcing motion until they cross. Isolates chest with constant tension. Perfect for practicing your superhero landing pose."
  },
  { 
    id: "pec-deck", 
    name: "Pec Deck", 
    category: "Chest", 
    displacement: 0.4,
    description: "Sit at machine with forearms on pads, press arms together in front of chest, then control return to starting position. Isolates chest with fixed movement path. Like hugging a tree that fights back."
  },
  { 
    id: "smith-machine-bench", 
    name: "Smith Machine Bench Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Perform bench press on Smith machine with fixed barbell path. Allows for controlled movement with less stabilization required. For when you want to bench press but also want training wheels."
  },
  { 
    id: "chest-press-machine", 
    name: "Chest Press Machine", 
    category: "Chest", 
    displacement: 0.4,
    description: "Sit at machine with hands on handles at chest level, press forward until arms extend, then return. Provides consistent resistance through fixed movement. The bench press for people who hate loading plates."
  },
  { 
    id: "landmine-press-chest", 
    name: "Landmine Press", 
    category: "Chest", 
    displacement: 0.5,
    description: "With barbell secured in landmine, hold end with one or both hands at shoulder, press up and away at angle, then lower. Works chest and shoulders asymmetrically. Like jousting with a barbell."
  },
  { 
    id: "svend-press", 
    name: "Svend Press", 
    category: "Chest", 
    displacement: 0.3,
    description: "Press plate or dumbbells together between palms at chest level, extend arms forward while maintaining pressure, then return. Intensely activates chest through isometric hold. Named after a Viking, feels like torture."
  },
  
  // Back
  { 
    id: "pull-up", 
    name: "Pull-Up", 
    category: "Back", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Hang from bar with overhand grip, pull body up until chin clears bar, then lower with control. Works lats, biceps, and upper back. The exercise everyone attempts after watching too many action movies."
  },
  { 
    id: "lat-pulldown", 
    name: "Lat Pulldown", 
    category: "Back", 
    displacement: 0.5,
    description: "Sit at machine, grip bar with hands wider than shoulders, pull down to upper chest while keeping back straight, then control return. Targets latissimus dorsi. Pull-ups for people who enjoy sitting down."
  },
  { 
    id: "bent-over-row", 
    name: "Bent-Over Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Bend at hips with back flat, pull barbell to lower chest, then lower with control. Works entire back, rear shoulders, and biceps. The exercise that teaches you humility and proper back posture simultaneously."
  },
  { 
    id: "seated-row", 
    name: "Seated Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Sit at cable machine with knees slightly bent, pull handle to abdomen while keeping back straight, then extend arms with control. Targets middle back and biceps. Like rowing a boat that never goes anywhere."
  },
  { 
    id: "deadlift", 
    name: "Deadlift", 
    category: "Back", 
    displacement: 0.6,
    description: "Stand with bar over feet, bend to grip bar with flat back, drive through heels to stand up straight, then lower with control. Works entire posterior chain. The exercise that makes you question all your life choices."
  },
  { 
    id: "back-extension", 
    name: "Back Extension", 
    category: "Back", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Position yourself on hyperextension bench with hips on pad, lower upper body toward floor, then raise to slightly above parallel. Strengthens lower back and glutes. Like a trust fall with yourself."
  },
  { 
    id: "t-bar-row", 
    name: "T-Bar Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Straddle T-bar with chest against pad, grip handles, pull weight up by driving elbows back, then lower with control. Targets middle back with focused movement. The rowing exercise that looks most like riding a mechanical bull."
  },
  { 
    id: "single-arm-row", 
    name: "Single-Arm Dumbbell Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Place one knee and hand on bench, pull dumbbell to hip while keeping back flat, then lower with control. Works lats and middle back unilaterally. For when you want to look like you're starting a lawnmower repeatedly."
  },
  { 
    id: "face-pull-back", 
    name: "Face Pull (Back)", 
    category: "Back", 
    displacement: 0.4,
    description: "Stand facing cable machine, pull rope attachment toward face with elbows high, then return with control. Targets rear delts and upper back. The exercise that makes you look like you're aggressively flossing."
  },
  { 
    id: "straight-arm-pulldown", 
    name: "Straight Arm Pulldown", 
    category: "Back", 
    displacement: 0.5,
    description: "Stand facing cable machine, grip bar with straight arms overhead, pull down in arc to thighs, then return. Isolates lats with constant tension. Like trying to push down an invisible garage door."
  },
  { 
    id: "smith-machine-row", 
    name: "Smith Machine Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Bend at hips under Smith machine bar, pull bar to abdomen, then lower with control. Provides stable rowing movement with fixed path. For when you want to row but also want to stay in your lane."
  },
  { 
    id: "lat-pullover", 
    name: "Lat Pullover", 
    category: "Back", 
    displacement: 0.5,
    description: "Lie across bench with dumbbell held above chest, lower weight in arc behind head while keeping arms slightly bent, then return. Stretches and works lats and serratus. Like you're trying to throw something behind you very slowly."
  },
  { 
    id: "meadows-row", 
    name: "Meadows Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Position landmine in corner, stand parallel with feet staggered, row end of bar to hip with outside hand. Targets lats and middle back with unique angle. Named after a legend, feels like wrestling a barbell."
  },
  { 
    id: "chest-supported-row", 
    name: "Chest Supported Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Lie face down on incline bench, pull dumbbells up by driving elbows back, then lower with control. Eliminates momentum for focused back work. For people who want to row but also take a nap."
  },
  
  // Legs
  { 
    id: "squat", 
    name: "Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Stand with barbell across upper back, bend knees and hips to lower until thighs are parallel to floor, then drive through heels to stand. Works entire lower body. The exercise that makes stairs your nemesis for days."
  },
  { 
    id: "leg-press", 
    name: "Leg Press", 
    category: "Legs", 
    displacement: 0.5,
    description: "Sit in machine with feet on platform, press weight away by extending knees and hips, then return with control. Targets quads, hamstrings, and glutes. Squats for people who enjoy sitting down."
  },
  { 
    id: "leg-extension", 
    name: "Leg Extension", 
    category: "Legs", 
    displacement: 0.5,
    description: "Sit in machine with pads over ankles, extend knees to lift weight, then lower with control. Isolates quadriceps. The exercise that makes you feel like you're kicking invisible enemies."
  },
  { 
    id: "leg-curl", 
    name: "Leg Curl", 
    category: "Legs", 
    displacement: 0.5,
    description: "Lie face down on machine with pads behind ankles, curl weight by bending knees, then extend with control. Isolates hamstrings. Like trying to kick yourself in the butt for skipping leg day."
  },
  { 
    id: "calf-raise", 
    name: "Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Stand with balls of feet on elevated surface, lower heels toward floor, then raise up as high as possible. Targets calf muscles. The exercise everyone does while waiting in line and thinks no one notices."
  },
  { 
    id: "lunge", 
    name: "Lunge", 
    category: "Legs", 
    displacement: 0.6,
    description: "Step forward with one leg, lower until both knees are bent at 90 degrees, then push back to starting position. Works quads, hamstrings, and glutes. Like practicing for when you trip but with weights."
  },
  { 
    id: "bulgarian-split-squat", 
    name: "Bulgarian Split Squat", 
    category: "Legs", 
    displacement: 0.5,
    description: "Place rear foot on bench behind you, lower until front thigh is parallel to floor, then push up through front heel. Intensely works quads and glutes unilaterally. Named after Bulgarians, who clearly enjoy suffering."
  },
  { 
    id: "hack-squat", 
    name: "Hack Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Position yourself in hack squat machine, lower body by bending knees until thighs are parallel to platform, then extend to starting position. Targets quads with reduced lower back stress. Like a squat with training wheels."
  },
  { 
    id: "smith-machine-squat", 
    name: "Smith Machine Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Perform squat using Smith machine with fixed barbell path. Allows for controlled movement with less stabilization required. For when you want to squat but also want to stay in your lane."
  },
  { 
    id: "goblet-squat", 
    name: "Goblet Squat", 
    category: "Legs", 
    displacement: 0.5,
    description: "Hold dumbbell or kettlebell close to chest, squat until thighs are parallel to floor, then return to standing. Great for learning proper squat mechanics. Like hugging a weight while sitting on an invisible chair."
  },
  { 
    id: "sumo-squat", 
    name: "Sumo Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Stand with feet wider than shoulders and toes pointed out, squat while keeping knees in line with toes, then stand. Emphasizes inner thighs and glutes. Named after sumo wrestlers, but sadly does not come with the cool outfit."
  },
  { 
    id: "seated-calf-raise", 
    name: "Seated Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Sit with knees bent and balls of feet on platform, lower heels toward floor, then raise as high as possible. Targets soleus muscle. For when standing up to work your calves feels like too much effort."
  },
  { 
    id: "standing-calf-raise", 
    name: "Standing Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Stand with shoulders under pads and balls of feet on platform, raise heels as high as possible, then lower with control. Emphasizes gastrocnemius muscle. The exercise that makes you look like you're trying to see over a crowd."
  },
  { 
    id: "adductor-machine", 
    name: "Adductor Machine", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit in machine with pads against inner thighs, press legs together against resistance, then return with control. Targets inner thigh muscles. The most awkward-looking exercise in the entire gym."
  },
  { 
    id: "abductor-machine", 
    name: "Abductor Machine", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit in machine with pads against outer thighs, press legs outward against resistance, then return with control. Targets outer hip muscles. The second most awkward-looking exercise in the entire gym."
  },
  { 
    id: "glute-bridge", 
    name: "Glute Bridge", 
    category: "Legs", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with knees bent and feet flat, lift hips toward ceiling by squeezing glutes, then lower with control. Targets glutes and hamstrings. The exercise that makes you look like you're auditioning for a weird music video."
  },
  { 
    id: "hip-thrust", 
    name: "Hip Thrust", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit with upper back against bench and barbell across hips, drive through heels to lift hips to full extension, then lower with control. Maximally activates glutes. The exercise you hope no one walks by during."
  },
  { 
    id: "step-up", 
    name: "Step Up", 
    category: "Legs", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Stand facing box or bench, step up with one foot, drive through heel to bring other foot up, then step back down. Works quads and glutes unilaterally. Like climbing stairs but with purpose and possibly regret."
  },
  { 
    id: "box-jump", 
    name: "Box Jump", 
    category: "Legs", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Stand facing box, drop into quarter squat, jump explosively to land on box with soft knees, then step back down. Develops power and explosiveness. The exercise with the highest risk-to-Instagram-likes ratio."
  },
  
  // Arms
  { 
    id: "bicep-curl", 
    name: "Bicep Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand holding weights with arms extended, curl weights toward shoulders by bending elbows, then lower with control. Isolates biceps. The exercise most likely to be performed in front of a mirror for extended periods."
  },
  { 
    id: "hammer-curl", 
    name: "Hammer Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bicep curl with palms facing each other throughout movement. Targets biceps and brachialis for thicker arms. Named after hammers, but significantly less useful for home improvement."
  },
  { 
    id: "tricep-extension", 
    name: "Tricep Extension", 
    category: "Arms", 
    displacement: 0.4,
    description: "Hold weight overhead with both hands, lower behind head by bending elbows, then extend arms to starting position. Isolates triceps. Like trying to elbow someone behind you in slow motion."
  },
  { 
    id: "tricep-pushdown", 
    name: "Tricep Pushdown", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand facing cable machine, grip attachment with elbows at sides, extend arms downward against resistance, then return. Isolates triceps with constant tension. The arm exercise for people who like pushing things down."
  },
  { 
    id: "skull-crusher", 
    name: "Skull Crusher", 
    category: "Arms", 
    displacement: 0.4,
    description: "Lie on bench holding weight above face, bend elbows to lower weight toward forehead, then extend arms. Isolates triceps. Named after what happens if you fail the rep, which is totally reassuring."
  },
  { 
    id: "wrist-curl", 
    name: "Wrist Curl", 
    category: "Arms", 
    displacement: 0.2,
    description: "Sit with forearms on thighs and wrists beyond knees, palms up, curl weight by bending wrists upward, then lower. Strengthens wrist flexors. For when you want forearms like Popeye but hate spinach."
  },
  { 
    id: "preacher-curl", 
    name: "Preacher Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Sit at preacher bench with arms extended over pad, curl weight toward shoulders, then lower with control. Isolates biceps with strict form. The bicep curl for people who need supervision to behave."
  },
  { 
    id: "concentration-curl", 
    name: "Concentration Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Sit with elbow braced against inner thigh, curl weight toward shoulder, then lower with control. Maximally isolates bicep. The curl that requires you to stare intensely at your bicep like it owes you money."
  },
  { 
    id: "cable-curl", 
    name: "Cable Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand facing cable machine with arms extended, curl handle toward shoulders, then lower with control. Provides constant tension throughout movement. Like regular curls but with a robot offering resistance."
  },
  { 
    id: "ez-bar-curl", 
    name: "EZ Bar Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bicep curl using EZ bar with angled grip. Reduces wrist strain while targeting biceps. For when straight bars are just too mainstream for your biceps."
  },
  { 
    id: "reverse-curl", 
    name: "Reverse Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bicep curl with palms facing down throughout movement. Targets forearm extensors and brachialis. Like regular curls but with an identity crisis."
  },
  { 
    id: "overhead-tricep-extension", 
    name: "Overhead Tricep Extension", 
    category: "Arms", 
    displacement: 0.5,
    description: "Hold dumbbell overhead with both hands, lower behind head by bending elbows, then extend arms. Stretches and strengthens triceps. Like trying to reach that itch in the middle of your back."
  },
  { 
    id: "tricep-kickback", 
    name: "Tricep Kickback", 
    category: "Arms", 
    displacement: 0.4,
    description: "Bend at hips with upper arm parallel to floor, extend forearm backward until arm is straight, then return. Isolates triceps. The exercise that makes you look like you're impersonating a dinosaur."
  },
  { 
    id: "diamond-push-up", 
    name: "Diamond Push-Up", 
    category: "Arms", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Perform push-up with hands close together forming diamond shape under chest. Emphasizes triceps more than standard push-up. Like regular push-ups but with extra suffering."
  },
  { 
    id: "close-grip-bench", 
    name: "Close Grip Bench Press", 
    category: "Arms", 
    displacement: 0.4,
    description: "Perform bench press with hands positioned shoulder-width apart. Shifts emphasis to triceps while still working chest. For when you want to bench press but also want bigger arms."
  },
  { 
    id: "reverse-wrist-curl", 
    name: "Reverse Wrist Curl", 
    category: "Arms", 
    displacement: 0.2,
    description: "Sit with forearms on thighs and wrists beyond knees, palms down, curl weight by bending wrists upward, then lower. Strengthens wrist extensors. The forearm exercise that makes opening jars less dramatic."
  },
  { 
    id: "plate-pinch", 
    name: "Plate Pinch", 
    category: "Arms", 
    displacement: 0.1,
    description: "Pinch weight plates between thumb and fingers, hold for time, then release. Develops grip and forearm strength. The exercise that makes you look like you're stealing plates from the gym."
  },
  
  // Shoulders
  { 
    id: "overhead-press", 
    name: "Overhead Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand holding weight at shoulder level, press overhead until arms are extended, then lower with control. Works shoulders and triceps. The exercise that makes you realize how low your ceilings are at home."
  },
  { 
    id: "lateral-raise", 
    name: "Lateral Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand holding weights at sides, raise arms out to sides until parallel with floor, then lower with control. Isolates lateral deltoids. Like trying to slowly fly away from your problems."
  },
  { 
    id: "front-raise", 
    name: "Front Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand holding weights at front of thighs, raise arms forward until parallel with floor, then lower with control. Targets anterior deltoids. The exercise that makes you look like you're dramatically presenting something."
  },
  { 
    id: "rear-delt-fly", 
    name: "Rear Delt Fly", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Bend at hips with back flat, raise weights out to sides with slight elbow bend, then lower. Isolates posterior deltoids. The shoulder exercise most people forget exists."
  },
  { 
    id: "shrug", 
    name: "Shrug", 
    category: "Shoulders", 
    displacement: 0.3,
    description: "Stand holding weights at sides, lift shoulders toward ears, hold briefly, then lower with control. Isolates trapezius muscles. The exercise that perfectly mimics how you respond to difficult questions."
  },
  { 
    id: "upright-row", 
    name: "Upright Row", 
    category: "Shoulders", 
    displacement: 0.4,
    description: "Stand holding weight in front of thighs, pull up toward chin by raising elbows, then lower with control. Works deltoids and trapezius. Like trying to start a lawnmower that's directly in front of you."
  },
  { 
    id: "arnold-press", 
    name: "Arnold Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Sit holding dumbbells at shoulders with palms facing you, press overhead while rotating palms forward, then reverse on descent. Works all three deltoid heads. Named after Arnold, but sadly does not give you his accent."
  },
  { 
    id: "push-press-shoulders", 
    name: "Push Press", 
    category: "Shoulders", 
    displacement: 0.6,
    description: "Dip slightly at knees, then explosively drive weight overhead using leg momentum, lower with control. Allows heavier loads for shoulder development. Like cheating at overhead press, but with official permission."
  },
  { 
    id: "shoulder-press-machine", 
    name: "Shoulder Press Machine", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Sit at machine with hands on handles at shoulder height, press upward until arms extend, then lower with control. Provides fixed movement path for shoulders. For when free weights are too free-spirited for you."
  },
  { 
    id: "smith-machine-shoulder-press", 
    name: "Smith Machine Shoulder Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Perform shoulder press using Smith machine with fixed barbell path. Allows for controlled pressing movement. For when you want to press overhead but also stay in your lane."
  },
  { 
    id: "cable-lateral-raise", 
    name: "Cable Lateral Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand sideways to cable machine, raise arm out to side until parallel with floor, then lower with control. Provides constant tension for lateral deltoids. Like regular lateral raises but with a robot offering resistance."
  },
  { 
    id: "face-pull-shoulders", 
    name: "Face Pull (Shoulders)", 
    category: "Shoulders", 
    displacement: 0.4,
    description: "Stand facing cable machine, pull rope attachment toward face with elbows high and out, then return with control. Targets rear delts and rotator cuff. The exercise that makes you look like you're aggressively flossing."
  },
  { 
    id: "landmine-press-shoulders", 
    name: "Landmine Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "With barbell secured in landmine, hold end at shoulder, press up and away at angle, then lower. Works shoulders with reduced overhead stress. Like trying to push away a very persistent barbell."
  },
  { 
    id: "bradford-press", 
    name: "Bradford Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Press barbell from front of shoulders to behind neck and back in continuous motion. Creates constant tension on deltoids. Named after Jim Bradford, who apparently enjoyed shoulder torture."
  },
  
  // Core
  { 
    id: "crunch", 
    name: "Crunch", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with knees bent, curl upper body toward knees by contracting abs, then lower with control. Targets rectus abdominis. The exercise everyone does for beach abs and then wonders why they don't have beach abs."
  },
  { 
    id: "plank", 
    name: "Plank", 
    category: "Core", 
    displacement: 0.0, 
    requiresBodyWeight: true, 
    isIsometric: true,
    description: "Support body on forearms and toes with body in straight line from head to heels, hold position. Strengthens entire core. The exercise where time mysteriously slows down to half speed."
  },
  { 
    id: "russian-twist", 
    name: "Russian Twist", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Sit with knees bent and feet elevated, twist torso to touch weight to floor on each side. Works obliques and rotational strength. Named after Russians, who clearly enjoy core pain."
  },
  { 
    id: "leg-raise", 
    name: "Leg Raise", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Lie on back with hands under glutes, raise straight legs until perpendicular to floor, then lower with control. Targets lower abs. Like trying to kick the ceiling while lying down."
  },
  { 
    id: "ab-wheel", 
    name: "Ab Wheel", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Kneel holding ab wheel, roll forward extending body in straight line, then use abs to pull back. Intensely works entire core. The $10 device that delivers $1000 worth of pain."
  },
  { 
    id: "side-bend", 
    name: "Side Bend", 
    category: "Core", 
    displacement: 0.3,
    description: "Stand holding weight at side, bend sideways by lowering weight toward floor, then return to upright. Targets obliques. The exercise that makes you look like you're dramatically picking up a quarter."
  },
  { 
    id: "hanging-leg-raise", 
    name: "Hanging Leg Raise", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Hang from bar, raise legs until parallel with floor or higher, then lower with control. Intensely works lower abs and hip flexors. Like regular leg raises but with added fear of falling."
  },
  { 
    id: "mountain-climber-core", 
    name: "Mountain Climber", 
    category: "Core", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in push-up position, rapidly alternate bringing knees toward chest. Works entire core with added cardio benefit. Like running in place while in a push-up position, because regular running wasn't hard enough."
  },
  { 
    id: "bicycle-crunch", 
    name: "Bicycle Crunch", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back, alternate touching elbow to opposite knee while extending other leg. Works rectus abdominis and obliques. The only acceptable form of cycling to do indoors."
  },
  { 
    id: "dead-bug", 
    name: "Dead Bug", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with arms and legs raised, alternate extending opposite arm and leg. Strengthens deep core muscles. Named after a dead bug, which is both accurate and slightly disturbing."
  },
  { 
    id: "hollow-hold", 
    name: "Hollow Hold", 
    category: "Core", 
    displacement: 0.0, 
    requiresBodyWeight: true, 
    isIsometric: true,
    description: "Lie on back, raise shoulders and legs off floor while pressing lower back down, hold position. Intensely works entire core. Like a plank but for people who prefer to see the ceiling while suffering."
  },
  { 
    id: "v-up", 
    name: "V-Up", 
    category: "Core", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Lie on back, simultaneously raise legs and upper body to form V-shape, then lower with control. Intensely works entire abdominal region. For when regular crunches aren't making you question your life choices enough."
  },
  { 
    id: "dragon-flag", 
    name: "Dragon Flag", 
    category: "Core", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Lie on bench holding behind head, raise entire body as straight line pivoting on shoulders, then lower with control. Brutally works entire core. Named by Bruce Lee, who apparently hated everyone's abs."
  },
  { 
    id: "ab-crunch-machine", 
    name: "Ab Crunch Machine", 
    category: "Core", 
    displacement: 0.3,
    description: "Sit in machine with pads on chest, crunch forward against resistance, then return with control. Provides consistent resistance for abdominals. For when you want to work your abs but also want to sit down."
  },
  { 
    id: "cable-crunch", 
    name: "Cable Crunch", 
    category: "Core", 
    displacement: 0.4,
    description: "Kneel facing cable machine, hold rope behind head, crunch toward floor by contracting abs, then return. Allows progressive loading for abdominals. Like regular crunches but with a robot offering resistance."
  },
  { 
    id: "oblique-crunch", 
    name: "Oblique Crunch", 
    category: "Core", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back with knees bent to one side, curl upper body toward knees, then lower with control. Targets oblique muscles. The exercise that makes you look like you're constantly falling to one side."
  },
  { 
    id: "side-plank", 
    name: "Side Plank", 
    category: "Core", 
    displacement: 0.0, 
    requiresBodyWeight: true, 
    isIsometric: true,
    description: "Support body on one forearm and side of foot with body in straight line, hold position. Strengthens obliques and lateral core. Like a regular plank but with a twist—literally."
  },
  { 
    id: "medicine-ball-slam", 
    name: "Medicine Ball Slam", 
    category: "Core", 
    displacement: 0.6,
    description: "Stand holding medicine ball overhead, forcefully throw ball to floor using abs and arms, catch on bounce and repeat. Works entire core with explosive movement. The exercise that lets you legally throw things in the gym."
  },
  
  // Cardio - Simplified treadmill exercises (reduced to just two main types)
  { 
    id: "treadmill-walk", 
    name: "Treadmill Walk", 
    category: "Cardio", 
    displacement: 0.0, 
    isCardio: true, 
    metValue: 3.5,
    description: "Walk on treadmill at your chosen pace and incline. Enter speed, distance, and incline % for accurate energy calculations. The app automatically adjusts based on your settings."
  },
  { 
    id: "treadmill-run", 
    name: "Treadmill Run", 
    category: "Cardio", 
    displacement: 0.0, 
    isCardio: true, 
    metValue: 8.0,
    description: "Run on treadmill at your chosen pace and incline. Enter speed, distance, and incline % for accurate energy calculations. The app automatically adjusts based on your settings."
  },
  
  { 
    id: "elliptical-low", 
    name: "Elliptical (Low Resistance)", 
    category: "Cardio", 
    displacement: 0.03, 
    isCardio: true, 
    metValue: 5.0,
    description: "Use elliptical machine with minimal resistance. Provides low-impact cardiovascular exercise. For when you want to pretend you're cross-country skiing indoors."
  },
  { 
    id: "elliptical-medium", 
    name: "Elliptical (Medium Resistance)", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 7.0,
    description: "Use elliptical machine with moderate resistance. Increases calorie burn while maintaining low impact. Like running through shallow mud but without getting dirty."
  },
  { 
    id: "elliptical-high", 
    name: "Elliptical (High Resistance)", 
    category: "Cardio", 
    displacement: 0.08, 
    isCardio: true, 
    metValue: 9.0,
    description: "Use elliptical machine with challenging resistance. Provides intense cardio while strengthening legs. For when you want the burn of running without the joint impact or, you know, actual running."
  },
  
  { 
    id: "stair-stepper-low", 
    name: "Stair Stepper (Low Intensity)", 
    category: "Cardio", 
    displacement: 0.1, 
    isCardio: true, 
    metValue: 4.0,
    description: "Use stair stepper machine at slow pace. Provides basic cardiovascular conditioning while toning legs. Like climbing endless stairs while going absolutely nowhere."
  },
  { 
    id: "stair-stepper-medium", 
    name: "Stair Stepper (Medium Intensity)", 
    category: "Cardio", 
    displacement: 0.15, 
    isCardio: true, 
    metValue: 6.0,
    description: "Use stair stepper machine at moderate pace. Increases calorie burn and leg muscle engagement. For when you want to know what living in a fifth-floor walkup feels like."
  },
  { 
    id: "stair-stepper-high", 
    name: "Stair Stepper (High Intensity)", 
    category: "Cardio", 
    displacement: 0.2, 
    isCardio: true, 
    metValue: 8.0,
    description: "Use stair stepper machine at fast pace. Provides intense cardio while building serious leg endurance. Like escaping a burning building but forever."
  },
  
  { 
    id: "stationary-bike-low", 
    name: "Stationary Bike (Low Resistance)", 
    category: "Cardio", 
    displacement: 0.02, 
    isCardio: true, 
    metValue: 4.0,
    description: "Cycle on stationary bike with minimal resistance. Provides gentle cardiovascular exercise with very low impact. For when you want to exercise but also read a magazine."
  },
  { 
    id: "stationary-bike-medium", 
    name: "Stationary Bike (Medium Resistance)", 
    category: "Cardio", 
    displacement: 0.04, 
    isCardio: true, 
    metValue: 6.0,
    description: "Cycle on stationary bike with moderate resistance. Increases calorie burn while strengthening legs. Like biking through a perpetual slight headwind."
  },
  { 
    id: "stationary-bike-high", 
    name: "Stationary Bike (High Resistance)", 
    category: "Cardio", 
    displacement: 0.06, 
    isCardio: true, 
    metValue: 8.5,
    description: "Cycle on stationary bike with challenging resistance. Provides intense cardio while building serious leg strength. For when you want to experience biking uphill without the reward of going downhill after."
  },
  
  { 
    id: "rowing-machine-low", 
    name: "Rowing Machine (Low Resistance)", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 5.0,
    description: "Use rowing machine with minimal resistance. Provides full-body cardiovascular exercise. Like rowing a boat on a perfectly calm lake but indoors and less scenic."
  },
  { 
    id: "rowing-machine-medium", 
    name: "Rowing Machine (Medium Resistance)", 
    category: "Cardio", 
    displacement: 0.08, 
    isCardio: true, 
    metValue: 7.0,
    description: "Use rowing machine with moderate resistance. Increases calorie burn while engaging more muscle groups. For when you want to pretend you're escaping Alcatraz at a reasonable pace."
  },
  { 
    id: "rowing-machine-high", 
    name: "Rowing Machine (High Resistance)", 
    category: "Cardio", 
    displacement: 0.12, 
    isCardio: true, 
    metValue: 9.0,
    description: "Use rowing machine with challenging resistance. Provides intense full-body workout. Like rowing through molasses while someone yells 'stroke' at you."
  },
  
  { 
    id: "jump-rope", 
    name: "Jump Rope", 
    category: "Cardio", 
    displacement: 0.1, 
    isCardio: true, 
    requiresBodyWeight: true, 
    metValue: 10.0,
    description: "Jump rope at steady pace. Provides high-intensity cardiovascular exercise with coordination benefits. The exercise that looks easy until you try it for more than 30 seconds."
  },
  { 
    id: "battle-ropes", 
    name: "Battle Ropes", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 8.0,
    description: "Create waves with heavy ropes by moving arms rapidly. Provides intense upper body and cardiovascular workout. Like trying to control two angry snakes while standing still."
  },
  { 
    id: "sled-push", 
    name: "Sled Push", 
    category: "Cardio", 
    displacement: 0.3, 
    isCardio: true, 
    metValue: 9.0,
    description: "Push weighted sled across floor using legs and arms. Provides high-intensity full-body workout. Like pushing a broken-down car but on purpose."
  },
  { 
    id: "assault-bike", 
    name: "Assault Bike", 
    category: "Cardio", 
    displacement: 0.05, 
    isCardio: true, 
    metValue: 9.0,
    description: "Cycle on fan bike using both arms and legs. Provides maximum cardiovascular intensity with full-body engagement. Named 'assault' because that's exactly what it feels like."
  },
  { 
    id: "jacob-ladder", 
    name: "Jacob's Ladder", 
    category: "Cardio", 
    displacement: 0.2, 
    isCardio: true, 
    metValue: 9.0,
    description: "Climb on self-paced rotating ladder. Provides intense cardio with full-body engagement. Like trying to climb your way to heaven but never quite making it."
  },
  
  // Full Body
  { 
    id: "clean-and-jerk", 
    name: "Clean and Jerk", 
    category: "Full Body", 
    displacement: 1.5,
    description: "Explosively pull barbell from floor to shoulders, then drive it overhead with split stance. Olympic lift that develops total-body power. The exercise that makes you feel like an Olympian until you try to walk the next day."
  },
  { 
    id: "snatch", 
    name: "Snatch", 
    category: "Full Body", 
    displacement: 1.8,
    description: "Explosively pull barbell from floor to overhead in one continuous motion. Olympic lift that develops speed and power. The lift with the unfortunate name and even more unfortunate learning curve."
  },
  { 
    id: "kettlebell-swing", 
    name: "Kettlebell Swing", 
    category: "Full Body", 
    displacement: 1.0,
    description: "Swing kettlebell between legs, then explosively drive hips forward to swing weight to chest height. Develops posterior chain and cardiovascular fitness. Like trying to launch a cannonball using only your hips."
  },
  { 
    id: "burpee", 
    name: "Burpee", 
    category: "Full Body", 
    displacement: 1.0, 
    requiresBodyWeight: true,
    description: "Drop to floor, perform push-up, jump feet toward hands, then leap upward with hands overhead. Provides maximum cardiovascular and muscular challenge. The exercise trainers prescribe when they secretly hate you."
  },
  { 
    id: "thruster", 
    name: "Thruster", 
    category: "Full Body", 
    displacement: 1.2,
    description: "Hold weight at shoulders, squat deeply, then drive upward and press weight overhead in one fluid motion. Combines squat and overhead press for maximum efficiency. Named after what it does to your will to live."
  },
  { 
    id: "turkish-get-up", 
    name: "Turkish Get-Up", 
    category: "Full Body", 
    displacement: 1.5,
    description: "Lie on back holding weight overhead, methodically rise to standing while keeping weight extended, then reverse. Develops total-body coordination and stability. The exercise that makes getting out of bed look like an Olympic event."
  },
  { 
    id: "clean", 
    name: "Clean", 
    category: "Full Body", 
    displacement: 1.2,
    description: "Explosively pull barbell from floor to shoulders in one motion. Olympic lift component that develops lower body power and upper body strength. Like deadlifting but with more opportunities to hit yourself in the face."
  },
  { 
    id: "power-clean", 
    name: "Power Clean", 
    category: "Full Body", 
    displacement: 1.2,
    description: "Perform clean without dropping into full squat position. Develops explosive power with emphasis on speed. The clean for people who don't like squatting all the way down."
  },
  { 
    id: "hang-clean", 
    name: "Hang Clean", 
    category: "Full Body", 
    displacement: 0.9,
    description: "Perform clean starting with barbell at knee height rather than floor. Emphasizes second pull phase of clean. The clean for people who don't like picking things up from the floor."
  },
  { 
    id: "push-press-full", 
    name: "Push Press", 
    category: "Full Body", 
    displacement: 0.8,
    description: "Dip slightly at knees, then explosively drive weight overhead using leg momentum. Allows heavier loads for shoulder and total-body development. Like cheating at overhead press, but with official permission."
  },
  { 
    id: "medicine-ball-throw", 
    name: "Medicine Ball Throw", 
    category: "Full Body", 
    displacement: 1.0,
    description: "Throw weighted ball with explosive movement pattern. Develops power and coordination with various throwing techniques. The exercise that lets you legally throw things in the gym."
  },
  { 
    id: "battle-rope-slams", 
    name: "Battle Rope Slams", 
    category: "Full Body", 
    displacement: 0.8,
    description: "Raise both arms overhead holding ropes, then forcefully slam ropes to ground. Provides high-intensity upper body and core workout. For when you need to physically manifest your feelings about work."
  },
  { 
    id: "tire-flip", 
    name: "Tire Flip", 
    category: "Full Body", 
    displacement: 1.0,
    description: "Lift one side of large tire from ground, then explosively flip it over. Develops total-body strength and power. The exercise that makes you feel like a strongman competitor until your back reminds you that you're not."
  },
  { 
    id: "farmers-walk", 
    name: "Farmer's Walk", 
    category: "Full Body", 
    displacement: 0.0,
    description: "Carry heavy weights at sides while walking. Develops grip, core, and total-body strength. Like grocery shopping but with weights that cost more than the food."
  },
  { 
    id: "bear-crawl", 
    name: "Bear Crawl", 
    category: "Full Body", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Move forward on hands and feet with knees hovering just above ground. Develops coordination, core strength, and endurance. The exercise that makes adults move like babies but with more sweating."
  },
  { 
    id: "mountain-climber-full", 
    name: "Mountain Climber", 
    category: "Full Body", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in push-up position, rapidly alternate bringing knees toward chest. Works entire body with emphasis on core and cardiovascular system. Like running in place while in a push-up position, because regular running wasn't hard enough."
  },
  { 
    id: "jumping-jack", 
    name: "Jumping Jack", 
    category: "Full Body", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Jump while spreading legs and raising arms overhead, then return to standing position with arms at sides. Provides basic cardiovascular exercise. The exercise everyone remembers from elementary school PE class."
  },
];