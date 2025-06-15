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

export default function ExerciseSummaryCard({ 
  exercise, 
  sets, 
  onPress 
}: ExerciseSummaryCardProps) {
  const { theme } = useTheme();
  const { useMetricUnits } = useSettingsStore();
  
  const totalJoules = sets.reduce((sum: number, set: Set) => sum + set.joules, 0);
  const totalSets = sets.length;
  const lastSet = sets[0]; // Sets are already sorted newest first
  
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={onPress}
    >
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
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {totalSets}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Sets
          </Text>
        </View>
        
        {lastSet && (
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {lastSet.weight} {useMetricUnits ? "kg" : "lbs"}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Last Weight
            </Text>
          </View>
        )}
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {formatEnergy(totalJoules).abbreviated}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Energy
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  category: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
});