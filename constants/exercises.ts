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
    description: "Lie back on a flat bench, grip the barbell just outside shoulder-width, then press it up until arms lock out. Lower under control to your chest and repeat. Because nothing says \"I'm king of the gym\" like hoisting steel over your face."
  },
  { 
    id: "incline-press", 
    name: "Incline Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Set the bench to 15–30°, lie back, grip the bar wider than shoulders, and press upward. Lower to your upper chest, repeat. Emphasizes the part of your pecs that people can actually see in a tank top."
  },
  { 
    id: "decline-press", 
    name: "Decline Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Lie on a bench angled downward, grip the barbell wide, lower to lower chest, then press back up. Targets the chest area that most folks think only bodybuilders possess."
  },
  { 
    id: "chest-fly", 
    name: "Chest Fly", 
    category: "Chest", 
    displacement: 0.5,
    description: "On a flat bench hold dumbbells overhead with elbows slightly bent, open arms wide in an arc, then squeeze them back together. Like giving yourself the world's most awkward hug."
  },
  { 
    id: "push-up", 
    name: "Push-Up", 
    category: "Chest", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Start in plank, hands under shoulders, lower chest to floor by bending elbows, then push up. The move everyone swears they can do—until I ask you to pause at the bottom."
  },
  { 
    id: "dips-chest", 
    name: "Dips", 
    category: "Chest", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Support yourself on parallel bars, lean slightly forward, lower until shoulders dip below elbows, then press up. Gravity's cruelest reminder that your chest called \"dibs\" first."
  },
  { 
    id: "cable-crossover", 
    name: "Cable Crossover", 
    category: "Chest", 
    displacement: 0.5,
    description: "Stand between two high pulleys, grab handles, pull them down and together in front of you in a wide arc. Like drawing swords against each pectoral—constant tension guaranteed."
  },
  { 
    id: "pec-deck", 
    name: "Pec Deck", 
    category: "Chest", 
    displacement: 0.4,
    description: "Sit with elbows on pads, press arms together in front of chest, then slowly let them open back out. For when you want a machine to teach your chest manners."
  },
  { 
    id: "smith-machine-bench", 
    name: "Smith Machine Bench Press", 
    category: "Chest", 
    displacement: 0.4,
    description: "Flat-bench press on a guided bar path so you can focus on brute pressing without worrying about balance. Bench press on training wheels."
  },
  { 
    id: "chest-press-machine", 
    name: "Chest Press Machine", 
    category: "Chest", 
    displacement: 0.4,
    description: "Sit, grip handles at chest level, push forward until arms extend, then return. The bench press for people who hate loading plates."
  },
  { 
    id: "landmine-press-chest", 
    name: "Landmine Press", 
    category: "Chest", 
    displacement: 0.5,
    description: "Wedge one end of a barbell in a corner, hold the free end at shoulder, press up and diagonally away, then lower. Asymmetrical pressing that feels like jousting—minus the horse."
  },
  { 
    id: "svend-press", 
    name: "Svend Press", 
    category: "Chest", 
    displacement: 0.3,
    description: "Hold two weight plates together in front of your chest and press arms straight out, maintaining inward squeeze. Isometric torture named after a Viking."
  },
  
  // Back
  { 
    id: "pull-up", 
    name: "Pull-Up", 
    category: "Back", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "Hang from a bar with palms facing away, pull your chin over the bar, then lower with control. Because hoisting your own bodyweight is the closest you'll get to defying gravity—until you realize gravity always wins."
  },
  { 
    id: "lat-pulldown", 
    name: "Lat Pulldown", 
    category: "Back", 
    displacement: 0.5,
    description: "Sit, grip the overhead bar wider than shoulders, pull it down to your chest, then return slowly. All the glory of pull-ups, plus a seat—and no sudden realization of how heavy you actually are."
  },
  { 
    id: "bent-over-row", 
    name: "Bent-Over Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Hinge at the hips with a flat back, grab a barbell, pull it toward your lower chest, then lower with control. Turns you into a human anchor—your lats will thank you later."
  },
  { 
    id: "seated-row", 
    name: "Seated Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Sit at a cable row station, chest tall, pull handles to your abdomen, then let them glide back with tension. Rowing without the risk of flipping your boat—or capsizing your ego."
  },
  { 
    id: "deadlift", 
    name: "Deadlift", 
    category: "Back", 
    displacement: 0.6,
    description: "Feet under bar, back flat, bend to grip, stand tall by pushing through heels, then lower. The lift that makes you question every life choice—and every time you left leg day for \"light\" cardio."
  },
  { 
    id: "back-extension", 
    name: "Back Extension", 
    category: "Back", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Secure your hips on a hyperextension bench, lower torso toward the floor, then raise until your spine is straight. Because arching away from a crunch sometimes feels like a trust fall… with yourself."
  },
  { 
    id: "t-bar-row", 
    name: "T-Bar Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Straddle a loaded T-bar, chest against pad, pull the bar to your torso, then lower slowly. For those who want to row like a Viking—minus the longships and pillaging."
  },
  { 
    id: "single-arm-row", 
    name: "Single-Arm Dumbbell Row", 
    category: "Back", 
    displacement: 0.5,
    description: "One knee and hand on a bench, pull a dumbbell to your hip, then lower with control. Perfect isolation for when you need to remind your back who's boss—one side at a time."
  },
  { 
    id: "face-pull-back", 
    name: "Face Pull (Back)", 
    category: "Back", 
    displacement: 0.4,
    description: "Stand at a high pulley with rope, pull it toward your forehead with elbows flared, then release. The cable workout that doubles as impressing your dentist with all that teeth-gritting."
  },
  { 
    id: "straight-arm-pulldown", 
    name: "Straight Arm Pulldown", 
    category: "Back", 
    displacement: 0.5,
    description: "Stand facing a high cable, arms straight, pull the bar down in an arc to your thighs, then resist back up. Like closing an imaginary garage door—if your lats were the motor."
  },
  { 
    id: "smith-machine-row", 
    name: "Smith Machine Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Bend under a Smith bar, grip it at waist height, pull to your stomach, then lower under tension. Because even your rowing deserves a guided path."
  },
  { 
    id: "lat-pullover", 
    name: "Lat Pullover", 
    category: "Back", 
    displacement: 0.5,
    description: "Lie on a bench holding a dumbbell above your chest, lower it in an arc behind your head, then pull back. Turns your lats into wings—minus the bird calls."
  },
  { 
    id: "meadows-row", 
    name: "Meadows Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Barbell set in a landmine, staggered stance, row the free end to your hip with one hand. Wrestling with a barbell never looked—or felt—so good."
  },
  { 
    id: "chest-supported-row", 
    name: "Chest Supported Row", 
    category: "Back", 
    displacement: 0.5,
    description: "Face down on an incline bench, pull dumbbells toward your ribs, then lower with control. Momentum be gone—this row ensures only your muscles do the talking."
  },
  
  // Legs
  { 
    id: "squat", 
    name: "Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Stand with barbell across upper back, feet shoulder-width, sit hips back until thighs are parallel, then drive through heels to stand. Turns you into a staircase's worst nightmare—prepare for leg day and every day after."
  },
  { 
    id: "leg-press", 
    name: "Leg Press", 
    category: "Legs", 
    displacement: 0.5,
    description: "Sit in the machine, feet on platform hip-width, push weight away until legs almost straight, then control the return. All the squat gains without the \"please help me up\" moment at the end."
  },
  { 
    id: "leg-extension", 
    name: "Leg Extension", 
    category: "Legs", 
    displacement: 0.5,
    description: "Sit with shins under pad, extend knees to lift weight, then lower it slowly. Because sometimes you just want to look like you're kicking bad decisions out of your life."
  },
  { 
    id: "leg-curl", 
    name: "Leg Curl", 
    category: "Legs", 
    displacement: 0.5,
    description: "Lie face down (or sit, depending on machine), curl heels toward glutes, then slowly extend legs. Prepares you for every \"kick me\" prank—except it's topping up your hamstrings."
  },
  { 
    id: "calf-raise", 
    name: "Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Stand on a block or platform, lower heels below toes, then lift as high as you can on your toes. Because nobody ever complained about calves that could defuse bombs."
  },
  { 
    id: "lunge", 
    name: "Lunge", 
    category: "Legs", 
    displacement: 0.6,
    description: "Step forward, drop back knee toward the floor until both knees are ~90°, then push back to start. Perfect training for that one time you trip in public—and maybe won't miss a step."
  },
  { 
    id: "bulgarian-split-squat", 
    name: "Bulgarian Split Squat", 
    category: "Legs", 
    displacement: 0.5,
    description: "Rear foot elevated on bench, front leg lunges down until front thigh is parallel, then drive up. Elevates one leg and your pride—just don't peek at how deep you're going."
  },
  { 
    id: "hack-squat", 
    name: "Hack Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "In the machine with back braced, lower body until thighs parallel, then press back up. Like a squat on rails—minus any chance of enjoying a free-fall."
  },
  { 
    id: "smith-machine-squat", 
    name: "Smith Machine Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Bar locked in Smith rails, squat down with guidance, then drive up. For when you want squat confidence without the barbell therapy."
  },
  { 
    id: "goblet-squat", 
    name: "Goblet Squat", 
    category: "Legs", 
    displacement: 0.5,
    description: "Hold a dumbbell or kettlebell at chest, squat down keeping chest up, then stand. Hug your weight like a long-lost friend—until it makes you regret it."
  },
  { 
    id: "sumo-squat", 
    name: "Sumo Squat", 
    category: "Legs", 
    displacement: 0.6,
    description: "Feet wide, toes turned out, descend with hips back until thighs parallel, then rise. Wide stance, wider gains—just don't dance like a sumo wrestler afterward."
  },
  { 
    id: "seated-calf-raise", 
    name: "Seated Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Sitting with pads on knees, heels off edge, lift heels up, then lower. Sculpt your calves in chair comfort—because who said calves can't chill?"
  },
  { 
    id: "standing-calf-raise", 
    name: "Standing Calf Raise", 
    category: "Legs", 
    displacement: 0.2,
    description: "Shoulders under pads, balls of feet on block, lift heels, then lower. Turns you into the person who always sees over the crowd—literally."
  },
  { 
    id: "adductor-machine", 
    name: "Adductor Machine", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit, press knees together against pads, then slowly let them open. The inner-thigh hug you never knew you needed—awkward yet effective."
  },
  { 
    id: "abductor-machine", 
    name: "Abductor Machine", 
    category: "Legs", 
    displacement: 0.3,
    description: "Sit, press knees outward against resistance, then slowly bring them back. Because sending your thighs on opposing missions builds character."
  },
  { 
    id: "glute-bridge", 
    name: "Glute Bridge", 
    category: "Legs", 
    displacement: 0.3, 
    requiresBodyWeight: true,
    description: "Lie on back, feet flat, lift hips until body forms a straight line from shoulders to knees, then lower. Bench-free hip thrust—your glutes will write you thank-you notes later."
  },
  { 
    id: "hip-thrust", 
    name: "Hip Thrust", 
    category: "Legs", 
    displacement: 0.3,
    description: "Upper back on bench, barbell over hips, drive hips up to full extension, then lower. Maximal rear-end activation without awkward bench dates."
  },
  { 
    id: "step-up", 
    name: "Step Up", 
    category: "Legs", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Step onto box or bench with one foot, drive through heel to bring other up, then step down. Turns every stair into a personal victory march."
  },
  { 
    id: "box-jump", 
    name: "Box Jump", 
    category: "Legs", 
    displacement: 0.5, 
    requiresBodyWeight: true,
    description: "From standing, squat slightly then explode onto a box, land softly, step down. The closest legal approximation to leaping tall buildings in a single bound—minus the cape."
  },
  
  // Arms
  { 
    id: "bicep-curl", 
    name: "Bicep Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand holding dumbbells at your sides, curl weights to shoulders, then lower with control. Mirror optional but highly recommended—your guns deserve an audience."
  },
  { 
    id: "hammer-curl", 
    name: "Hammer Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Palms face each other as you curl dumbbells up, then lower. Turns your forearms into concrete pillars—no carpentry required."
  },
  { 
    id: "tricep-extension", 
    name: "Tricep Extension", 
    category: "Arms", 
    displacement: 0.4,
    description: "Hold a dumbbell overhead with both hands, lower behind head, then extend arms. Feels like you're elbowing bad ideas out of existence."
  },
  { 
    id: "tricep-pushdown", 
    name: "Tricep Pushdown", 
    category: "Arms", 
    displacement: 0.4,
    description: "Facing a cable machine, grip the bar or rope, press down until arms are straight, then release. Because some things deserve to be pushed down—like Monday mornings."
  },
  { 
    id: "skull-crusher", 
    name: "Skull Crusher", 
    category: "Arms", 
    displacement: 0.4,
    description: "Lie on bench, lower bar or dumbbells toward forehead, then extend arms. Named for what could happen if you slack off—no pressure."
  },
  { 
    id: "wrist-curl", 
    name: "Wrist Curl", 
    category: "Arms", 
    displacement: 0.2,
    description: "Forearms on thighs, palms up, curl weight with wrists, then lower. Prepares you for opening that impossible jar of pickles."
  },
  { 
    id: "preacher-curl", 
    name: "Preacher Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Upper arms braced on a preacher bench pad, curl bar to shoulders, then lower. Strict bicep isolation with built-in supervision."
  },
  { 
    id: "concentration-curl", 
    name: "Concentration Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Sit, elbow braced against inner thigh, curl dumbbell to shoulder, then lower. Stare at your bicep like you're negotiating a hostage release."
  },
  { 
    id: "cable-curl", 
    name: "Cable Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Stand facing cable stack, curl handle toward shoulder, then extend back. Constant tension so your biceps never get a snooze button."
  },
  { 
    id: "ez-bar-curl", 
    name: "EZ Bar Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Use an EZ-curl bar with angled grip, curl up, then lower. For wrists that prefer a more sophisticated handshake."
  },
  { 
    id: "reverse-curl", 
    name: "Reverse Curl", 
    category: "Arms", 
    displacement: 0.4,
    description: "Palms face down as you curl bar or dumbbells up, then lower. Turns you into the person who can lift more than just spirits."
  },
  { 
    id: "overhead-tricep-extension", 
    name: "Overhead Tricep Extension", 
    category: "Arms", 
    displacement: 0.5,
    description: "Dumbbell or plate held overhead, lower behind head, then press up. Scratches the itch between your shoulder blades—sort of."
  },
  { 
    id: "tricep-kickback", 
    name: "Tricep Kickback", 
    category: "Arms", 
    displacement: 0.4,
    description: "Hinge at hips, upper arm parallel to ground, extend forearm back, then return. Looks like you're impersonating a velociraptor—but feels awesome."
  },
  { 
    id: "diamond-push-up", 
    name: "Diamond Push-Up", 
    category: "Arms", 
    displacement: 0.4, 
    requiresBodyWeight: true,
    description: "Hands together in a diamond shape under chest, lower down, then push up. Takes push-ups from \"meh\" to \"why is my triceps crying?\""
  },
  { 
    id: "close-grip-bench", 
    name: "Close Grip Bench Press", 
    category: "Arms", 
    displacement: 0.4,
    description: "Hands shoulder-width on bar, press up from chest, then lower. All the press, more triceps—bench press with an arm day twist."
  },
  { 
    id: "reverse-wrist-curl", 
    name: "Reverse Wrist Curl", 
    category: "Arms", 
    displacement: 0.2,
    description: "Forearms on thighs, palms down, curl weight upward with wrists, then lower. Because strong forearms are the ultimate power move."
  },
  { 
    id: "plate-pinch", 
    name: "Plate Pinch", 
    category: "Arms", 
    displacement: 0.1,
    description: "Pinch two plates together between fingers and thumb, hold, then release. Your grip will get so good you'll consider pinching yourself just for fun."
  },
  
  // Shoulders
  { 
    id: "overhead-press", 
    name: "Overhead Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand with a barbell or dumbbells at shoulder height, press overhead until arms lock out, then lower with control. Makes you rethink low doorways—and small talk."
  },
  { 
    id: "lateral-raise", 
    name: "Lateral Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Hold dumbbells at your sides, lift arms out to shoulder height, then lower. Turns your arms into wings—flight not included."
  },
  { 
    id: "front-raise", 
    name: "Front Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "With weights in front of thighs, lift straight arms to shoulder level, then lower. Perfect for opening that top cabinet you can't quite reach."
  },
  { 
    id: "rear-delt-fly", 
    name: "Rear Delt Fly", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Hinge at hips, dumbbells in hand, lift arms out to sides, then lower. Because nobody ever forgets a strong back—especially your posture."
  },
  { 
    id: "shrug", 
    name: "Shrug", 
    category: "Shoulders", 
    displacement: 0.3,
    description: "Hold dumbbells or barbell at sides, raise shoulders toward ears, hold, then relax. Your go-to move for \"I have no clue what I'm doing.\""
  },
  { 
    id: "upright-row", 
    name: "Upright Row", 
    category: "Shoulders", 
    displacement: 0.4,
    description: "Grip barbell or dumbbells in front, lift elbows past shoulders, then lower. Like yanking your sleeves up—only with added style points."
  },
  { 
    id: "arnold-press", 
    name: "Arnold Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Start palms facing you at shoulder level, rotate as you press overhead, then reverse on the way down. Channel your inner Schwarzenegger, minus the accent."
  },
  { 
    id: "push-press-shoulders", 
    name: "Push Press", 
    category: "Shoulders", 
    displacement: 0.6,
    description: "Slight knee bend followed by explosive drive to press weight overhead, then lower. Cheating never felt so legit."
  },
  { 
    id: "shoulder-press-machine", 
    name: "Shoulder Press Machine", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Sit and press handles upward on a machine, then lower. For when you want guidance wheels on your overhead lift."
  },
  { 
    id: "smith-machine-shoulder-press", 
    name: "Smith Machine Shoulder Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Press barbell overhead on a Smith machine track, then lower. Fixed path, zero surprises—except for your pump."
  },
  { 
    id: "cable-lateral-raise", 
    name: "Cable Lateral Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Stand beside a cable column, lift handle out to side to shoulder height, then lower. Constant tension courtesy of robotic resistance."
  },
  { 
    id: "face-pull-shoulders", 
    name: "Face Pull (Shoulders)", 
    category: "Shoulders", 
    displacement: 0.4,
    description: "At a cable with rope, pull handles toward face with elbows high, then release. Feels like tantrum therapy for your rear delts."
  },
  { 
    id: "landmine-press-shoulders", 
    name: "Landmine Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Barbell in a landmine, press the free end upward at an angle, then lower. All the shoulder work, half the overhead drama."
  },
  { 
    id: "bradford-press", 
    name: "Bradford Press", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Press barbell from front rack to behind neck in a fluid arc, then reverse. A dinner-party trick for when you're too strong for standard presses."
  },
  { 
    id: "reverse-fly", 
    name: "Reverse Fly (Bent-Over)", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Hinge at hips, dumbbells in hand, lift arms back in a reverse hugging motion, then lower. The exercise your mom wished you did at the dinner table."
  },
  { 
    id: "cable-front-raise", 
    name: "Cable Front Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Facing a low cable, lift handle straight forward to shoulder height, then lower. A one-way ticket to the \"Why is my front delt sore?\" club."
  },
  { 
    id: "plate-front-raise", 
    name: "Plate Front Raise", 
    category: "Shoulders", 
    displacement: 0.5,
    description: "Hold a weight plate with both hands at thighs, lift to eye level, then lower. Because sometimes dumbbells are too mainstream."
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