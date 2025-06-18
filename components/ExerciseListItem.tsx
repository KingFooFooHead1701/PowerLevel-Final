import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { ChevronRight } from "lucide-react-native";
import { Exercise } from "@/constants/exercises";

interface ExerciseListItemProps {
  exercise: Exercise;
  hasHistory: boolean;
  onPress: () => void;
}

export default function ExerciseListItem({
  exercise,
  hasHistory,
  onPress,
}: ExerciseListItemProps) {
  const { theme } = useTheme();

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
        {hasHistory && (
          <View style={[styles.historyBadge, { backgroundColor: theme.secondary + "20" }]}>
            <Text style={[styles.historyText, { color: theme.secondary }]}>
              History Available
            </Text>
          </View>
        )}
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    marginBottom: 8,
  },
  historyBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  historyText: {
    fontSize: 12,
    fontWeight: "500",
  },
});