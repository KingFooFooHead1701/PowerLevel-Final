export type DistanceUnit = "km" | "mi";

const KILOMETERS_PER_MILE = 1.609344;

export const getDistanceUnit = (useMetricUnits: boolean): DistanceUnit =>
  useMetricUnits ? "km" : "mi";

export const convertDistance = (
  value: number,
  fromUnit: DistanceUnit,
  toUnit: DistanceUnit
) => {
  if (fromUnit === toUnit) return value;
  return fromUnit === "km"
    ? value / KILOMETERS_PER_MILE
    : value * KILOMETERS_PER_MILE;
};

export const getDistanceInUnit = (
  value: number,
  storedUnit: DistanceUnit | undefined,
  displayUnit: DistanceUnit
) => {
  // Older workout records predate unit metadata. Treat those values as being
  // in the user's current unit so existing data keeps its familiar meaning.
  return convertDistance(value, storedUnit ?? displayUnit, displayUnit);
};

export const formatDistance = (value: number, unit: DistanceUnit) => {
  const maximumFractionDigits = value >= 100 ? 1 : 2;
  const formatted = value.toLocaleString(undefined, {
    maximumFractionDigits,
  });
  return `${formatted} ${unit === "km" ? "km" : "miles"}`;
};

