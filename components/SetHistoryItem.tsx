import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";
import { Trash2 } from "lucide-react-native";

interface SetHistoryItemProps {
  set: {
    id: string;
    date: string;
    reps: number;
    weight: number;
    joules: number;
    duration?: number;
    distance?: number;
    speed?: number;
    incline?: number;
    watts?: number;
    assistance?: number;
    verticalDistance?: number;
  };
  useMetricUnits: boolean;
  onDelete: () => void;
  isCardio?: boolean;
  isIsometric?: boolean;
  isTreadmill?: boolean;
}

function SetHistoryItem({
  set,
  useMetricUnits,
  onDelete,
}: SetHistoryItemProps) {
  const { theme } = useTheme();
  const date = new Date(set.date);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const weightUnit = useMetricUnits ? "kg" : "lb";
  const distanceUnit = useMetricUnits ? "km" : "mi";
  const speedUnit = useMetricUnits ? "km/h" : "mph";
  const verticalUnit = useMetricUnits ? "m" : "ft";
  const { abbreviated: energyAbbreviated } = formatEnergy(set.joules);

  const details: string[] = [];
  if (set.reps > 0) details.push(`${set.reps} reps`);
  if (set.weight > 0) details.push(`Load: ${set.weight} ${weightUnit}`);
  if (set.duration && set.duration > 0)
    details.push(`Duration: ${set.duration} sec`);
  if (set.distance && set.distance > 0)
    details.push(`Distance: ${set.distance} ${distanceUnit}`);
  if (set.speed && set.speed > 0)
    details.push(`Speed: ${set.speed} ${speedUnit}`);
  if (set.incline !== undefined && set.incline !== 0)
    details.push(`Grade: ${set.incline}%`);
  if (set.watts && set.watts > 0) details.push(`Average power: ${set.watts} W`);
  if (set.assistance && set.assistance > 0)
    details.push(`Assistance: ${set.assistance} ${weightUnit}`);
  if (set.verticalDistance && set.verticalDistance > 0)
    details.push(`Vertical: ${set.verticalDistance} ${verticalUnit}`);

  if (details.length === 0) details.push("Activity logged");

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {formattedDate} at {formattedTime}
        </Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Trash2 size={18} color={theme.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          {details.map((detail) => (
            <Text
              key={detail}
              style={[styles.detailText, { color: theme.text }]}
            >
              {detail}
            </Text>
          ))}
        </View>

        <View style={styles.energy}>
          <Text style={[styles.energyText, { color: theme.primary }]}>
            {energyAbbreviated}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default React.memo(SetHistoryItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flex: 1,
  },
  detailText: {
    fontSize: 15,
    marginBottom: 4,
  },
  energy: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 12,
  },
  energyText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
