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
  isCardio,
  isIsometric,
  isTreadmill,
}: SetHistoryItemProps) {
  const { theme } = useTheme();
  const date = new Date(set.date);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const unit = useMetricUnits ? "kg" : "lbs";
  const totalWeight = set.reps * set.weight;
  const { abbreviated: energyAbbreviated } = formatEnergy(set.joules);

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
          {isCardio ? (
            <>
              <Text style={[styles.detailText, { color: theme.text }]}>
                Distance: {set.distance} {useMetricUnits ? "km" : "miles"}
              </Text>
              <Text style={[styles.detailText, { color: theme.text }]}>
                Speed: {set.speed} {useMetricUnits ? "km/h" : "mph"}
              </Text>
              {isTreadmill && set.incline !== undefined && (
                <Text style={[styles.detailText, { color: theme.text }]}>
                  Incline: {set.incline}%
                </Text>
              )}
              {set.reps > 0 && (
                <Text style={[styles.detailText, { color: theme.text }]}>
                  Reps: {set.reps}
                </Text>
              )}
            </>
          ) : isIsometric ? (
            <Text style={[styles.detailText, { color: theme.text }]}>
              Duration: {set.duration} seconds
            </Text>
          ) : (
            <>
              <Text style={[styles.detailText, { color: theme.text }]}>
                {set.reps} reps × {set.weight} {unit}
              </Text>
              <Text style={[styles.detailText, { color: theme.text, fontStyle: 'italic' }]}>
                Total: {totalWeight} {unit}
              </Text>
            </>
          )}
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
    fontSize: 16,
    marginBottom: 4,
  },
  energy: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  energyText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
