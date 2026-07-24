export type DistanceUnit = "km" | "mi";

export interface DistanceEntry {
  distance?: number;
  distanceUnit?: DistanceUnit;
}

const KILOMETERS_PER_MILE = 1.609344;

export function totalDistanceInUnit(
  entries: DistanceEntry[],
  targetUnit: DistanceUnit,
): number {
  return entries.reduce((total, entry) => {
    if (
      typeof entry.distance !== "number" ||
      !Number.isFinite(entry.distance) ||
      entry.distance <= 0
    ) {
      return total;
    }

    // Older saved workouts did not record their unit. Preserve their displayed
    // value instead of guessing and silently changing a user's history.
    if (!entry.distanceUnit || entry.distanceUnit === targetUnit) {
      return total + entry.distance;
    }

    return total + (
      targetUnit === "km"
        ? entry.distance * KILOMETERS_PER_MILE
        : entry.distance / KILOMETERS_PER_MILE
    );
  }, 0);
}
