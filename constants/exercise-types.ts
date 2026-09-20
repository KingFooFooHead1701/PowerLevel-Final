export type CalculationFamily =
  | "EXT_LOAD_REPS"
  | "BW_REPS"
  | "COMBINED_REPS"
  | "ASSISTED_BW_REPS"
  | "ISO_MET"
  | "CARDIO_MET"
  | "CARDIO_SPEED_MET"
  | "MACHINE_WATT"
  | "LOADED_LOCOMOTION"
  | "VERTICAL_DISTANCE"
  | "PLYO_REPS"
  | "COMPLEX_REPS"
  | "SWIM_MET";

export interface Exercise {
  id: string;
  name: string;
  category: string;
  displacement: number;
  description?: string;
  calculationFamily?: CalculationFamily;
  trackingMode?: string;
  requiresBodyWeight?: boolean;
  isCardio?: boolean;
  isIsometric?: boolean;
  metValue?: number;
  bodyWeightCoefficient?: number;
  canonicalId?: string;
  hiddenFromPicker?: boolean;
  secondaryTags?: string[];
  equipment?: string[];
}
