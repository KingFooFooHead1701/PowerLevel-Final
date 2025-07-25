import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { Dumbbell } from "lucide-react-native";
import { Exercise } from "@/constants/exercises";
import { Set } from "@/hooks/use-exercise-store";

interface ExerciseSummaryCardProps {
  exercise: Exercise;
  sets: Set[];
  onPress: () => void;
}

function ExerciseSummaryCard({ exercise, sets, onPress }: ExerciseSummaryCardProps) {
  const { theme } = useTheme();
  const { useMetricUnits, bodyWeight } = useSettingsStore();

  const unit = useMetricUnits ? "kg" : "lbs";
  const totalJoules = sets.reduce((sum, s) => sum + s.joules, 0);
  const totalSets = sets.length;
  const lastSet = sets[0];

  // detect isometric by presence of duration
  const lastDuration = lastSet?.duration ?? 0;
  const isIsometric = lastDuration > 0;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + "20" }]}>
          <Dumbbell size={20} color={theme.primary} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{exercise.name}</Text>
          <Text style={[styles.category, { color: theme.textSecondary }]}>
            {exercise.category}
          </Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsContainer}>
        {/* Total sets */}
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.text }]}>{totalSets}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Sets</Text>
        </View>

        {lastSet && (
          isIsometric ? (
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {lastDuration} s @ {bodyWeight} {unit}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Hold</Text>
            </View>
          ) : (
            <>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {lastSet.weight} {unit}
                </Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Last Weight</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  {lastSet.reps * lastSet.weight} {unit}
                </Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Weight</Text>
              </View>
            </>
          )
        )}

        {/* Energy */}
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {formatEnergy(totalJoules).abbreviated}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Energy</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ExerciseSummaryCard);

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 16, marginBottom: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  titleContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: "600" },
  category: { fontSize: 14 },
  statsContainer: { flexDirection: "row", justifyContent: "space-evenly" },
  statItem: { flexBasis: 0, flexGrow: 1, alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  statLabel: { fontSize: 12 },
});
