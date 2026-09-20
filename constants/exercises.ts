import type { CalculationFamily, Exercise } from "./exercise-types";
export type { CalculationFamily, Exercise } from "./exercise-types";
import { chestExercises1 } from "./exercise-data/chest-1";
import { chestExercises2 } from "./exercise-data/chest-2";
import { backExercises1 } from "./exercise-data/back-1";
import { backExercises2 } from "./exercise-data/back-2";
import { legsExercises1 } from "./exercise-data/legs-1";
import { legsExercises2 } from "./exercise-data/legs-2";
import { armsExercises1 } from "./exercise-data/arms-1";
import { armsExercises2 } from "./exercise-data/arms-2";
import { forearms_gripExercises1 } from "./exercise-data/forearms-grip-1";
import { shouldersExercises1 } from "./exercise-data/shoulders-1";
import { shouldersExercises2 } from "./exercise-data/shoulders-2";
import { coreExercises1 } from "./exercise-data/core-1";
import { coreExercises2 } from "./exercise-data/core-2";
import { cardioExercises1 } from "./exercise-data/cardio-1";
import { cardioExercises2 } from "./exercise-data/cardio-2";
import { full_bodyExercises1 } from "./exercise-data/full-body-1";
import { neckExercises1 } from "./exercise-data/neck-1";

export const exerciseCategories = [
  "All",
  "Quick-Select",
  "Chest",
  "Back",
  "Legs",
  "Arms",
  "Forearms & Grip",
  "Shoulders",
  "Core",
  "Cardio",
  "Full Body",
  "Neck",
  "Custom",
] as const;

const BODY_WEIGHT_FAMILIES = new Set<CalculationFamily>([
  "BW_REPS",
  "COMBINED_REPS",
  "ASSISTED_BW_REPS",
  "ISO_MET",
  "CARDIO_MET",
  "CARDIO_SPEED_MET",
  "LOADED_LOCOMOTION",
  "VERTICAL_DISTANCE",
  "PLYO_REPS",
  "SWIM_MET",
]);

const CARDIO_FAMILIES = new Set<CalculationFamily>([
  "CARDIO_MET",
  "CARDIO_SPEED_MET",
  "MACHINE_WATT",
  "LOADED_LOCOMOTION",
  "VERTICAL_DISTANCE",
  "SWIM_MET",
]);

const trackingModeFor = (family: CalculationFamily): string => {
  switch (family) {
    case "BW_REPS":
    case "PLYO_REPS":
      return "Reps";
    case "COMBINED_REPS":
    case "EXT_LOAD_REPS":
    case "COMPLEX_REPS":
      return "Weight + reps";
    case "ASSISTED_BW_REPS":
      return "Assistance + reps";
    case "ISO_MET":
    case "CARDIO_MET":
    case "SWIM_MET":
      return "Time";
    case "CARDIO_SPEED_MET":
      return "Time + speed";
    case "MACHINE_WATT":
      return "Time + watts";
    case "LOADED_LOCOMOTION":
      return "Load + time";
    case "VERTICAL_DISTANCE":
      return "Vertical distance";
  }
};

const hydrateExercise = (seed: Exercise): Exercise => {
  const family = seed.calculationFamily ?? "EXT_LOAD_REPS";
  return {
    ...seed,
    calculationFamily: family,
    trackingMode: seed.trackingMode ?? trackingModeFor(family),
    requiresBodyWeight:
      seed.requiresBodyWeight ?? BODY_WEIGHT_FAMILIES.has(family),
    isCardio: seed.isCardio ?? CARDIO_FAMILIES.has(family),
    isIsometric: seed.isIsometric ?? family === "ISO_MET",
  };
};

const canonicalExercises: Exercise[] = [
  ...chestExercises1,
  ...chestExercises2,
  ...backExercises1,
  ...backExercises2,
  ...legsExercises1,
  ...legsExercises2,
  ...armsExercises1,
  ...armsExercises2,
  ...forearms_gripExercises1,
  ...shouldersExercises1,
  ...shouldersExercises2,
  ...coreExercises1,
  ...coreExercises2,
  ...cardioExercises1,
  ...cardioExercises2,
  ...full_bodyExercises1,
  ...neckExercises1,
].map(hydrateExercise);

export const legacyExerciseAliases: Record<string, string> = {
  "landmine-press-chest": "landmine-press",
  "face-pull-back": "face-pull",
  "tricep-extension": "overhead-dumbbell-triceps-extension",
  "overhead-tricep-extension": "overhead-dumbbell-triceps-extension",
  "push-press-shoulders": "push-press",
  "face-pull-shoulders": "face-pull",
  "landmine-press-shoulders": "landmine-press",
  "reverse-fly": "rear-delt-fly",
  "mountain-climber-core": "mountain-climber",
  "push-press-full": "push-press",
  "mountain-climber-full": "mountain-climber",
};

const legacyAliasExercises = Object.entries(legacyExerciseAliases).reduce<
  Exercise[]
>((aliases, [legacyId, canonicalId]) => {
  const canonical = canonicalExercises.find(
    (exercise) => exercise.id === canonicalId,
  );
  if (canonical) {
    aliases.push({
      ...canonical,
      id: legacyId,
      canonicalId,
      hiddenFromPicker: true,
    });
  }
  return aliases;
}, []);

export const resolveCanonicalExerciseId = (exerciseId: string): string =>
  legacyExerciseAliases[exerciseId] ?? exerciseId;

/**
 * Includes hidden legacy aliases so workout history saved by older versions
 * continues to resolve. Exercise pickers hide hiddenFromPicker entries.
 */
export const defaultExercises: Exercise[] = [
  ...canonicalExercises,
  ...legacyAliasExercises,
];

export const visibleDefaultExercises: Exercise[] = canonicalExercises;

export const getExerciseByAnyId = (
  exerciseId: string,
): Exercise | undefined => {
  const direct = defaultExercises.find(
    (exercise) => exercise.id === exerciseId,
  );
  if (direct) return direct;

  const canonicalId = resolveCanonicalExerciseId(exerciseId);
  return canonicalExercises.find((exercise) => exercise.id === canonicalId);
};
