import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { formatDate } from "@/utils/date-utils";
import { calculateTotalEnergy } from "@/utils/energy-utils";

interface ExerciseSummaryCardProps {
  exerciseId: string;
  date: string;
}

export default function ExerciseSummaryCard({ exerciseId, date }: ExerciseSummaryCardProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { getExerciseById, getSetsByExerciseAndDate } = useExerciseStore();
  
  const exercise = getExerciseById(exerciseId);
  const sets = getSetsByExerciseAndDate(exerciseId, date);
  
  if (!exercise || sets.length === 0) return null;
  
  const totalSets = sets.length;
  const totalReps = sets.reduce((sum, set) => sum + set.reps, 0);
  const totalWeight = sets.reduce((sum, set) => sum + set.weight, 0);
  const totalEnergy = calculateTotalEnergy(sets);
  
  const handlePress = () => {
    router.push(`/exercise/${exerciseId}?date=${date}`);
  };
  
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.exerciseName, { color: theme.text }]}>
          {exercise.name}
        </Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {formatDate(date)}
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.primary }]}>
            {totalSets}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Sets
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.primary }]}>
            {totalReps}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Reps
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.primary }]}>
            {totalWeight}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Weight
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.primary }]}>
            {Math.round(totalEnergy)}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            Energy
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.viewDetails, { color: theme.primary }]}>
          View Details
        </Text>
        <ChevronRight size={16} color={theme.primary} />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
});