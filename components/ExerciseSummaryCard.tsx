import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Exercise } from "@/constants/exercises";
import { ExerciseSet } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { formatDate } from "@/utils/date-utils";
import { ChevronRight } from "lucide-react-native";

interface ExerciseSummaryCardProps {
  exercise: Exercise;
  sets: ExerciseSet[];
  onPress: () => void;
}

export default function ExerciseSummaryCard({
  exercise,
  sets,
  onPress,
}: ExerciseSummaryCardProps) {
  const { theme } = useTheme();
  const { useMetricUnits } = useSettingsStore();

  // Calculate total weight lifted
  const totalWeight = sets.reduce((sum, set) => sum + set.weight * set.reps, 0);
  
  // Get the most recent set date
  const mostRecentDate = sets.length > 0
    ? new Date(Math.max(...sets.map(set => new Date(set.date).getTime())))
    : null;

  // Format the date
  const formattedDate = mostRecentDate 
    ? formatDate(mostRecentDate.toISOString()) 
    : "No date";

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.primary }]}>{exercise.name}</Text>
        <Text style={[styles.category, { color: theme.textSecondary }]}>
          {exercise.category}
        </Text>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {sets.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Sets
            </Text>
          </View>
          
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {totalWeight.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {useMetricUnits ? "kg" : "lbs"} Total
            </Text>
          </View>
          
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {formattedDate}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Last Active
            </Text>
          </View>
        </View>
      </View>
      
      <ChevronRight size={20} color={theme.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});