import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Dumbbell, Star, Trash2 } from "lucide-react-native";
import { Exercise } from "@/constants/exercises";
import { useExerciseStore } from "@/hooks/use-exercise-store";

interface ExerciseListItemProps {
  exercise: Exercise;
  hasHistory: boolean;
  onPress: () => void;
}

export default function ExerciseListItem({ 
  exercise, 
  hasHistory, 
  onPress 
}: ExerciseListItemProps) {
  const { theme } = useTheme();
  const { removeExercise } = useExerciseStore();
  
  // Check if this is a custom exercise (ID starts with "custom-")
  const isCustomExercise = exercise.id.startsWith("custom-");
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Exercise",
      `Are you sure you want to delete "${exercise.name}"? This will also delete all sets associated with this exercise.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => removeExercise(exercise.id)
        }
      ]
    );
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.cardBackground,
          borderLeftColor: hasHistory ? theme.secondary : "transparent",
          borderLeftWidth: hasHistory ? 4 : 0,
        }
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.primary + "20" }]}>
        <Dumbbell size={20} color={theme.primary} />
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]}>{exercise.name}</Text>
        <Text style={[styles.category, { color: theme.textSecondary }]}>
          {exercise.category}
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        {hasHistory && (
          <Star size={16} color={theme.secondary} fill={theme.secondary} style={styles.starIcon} />
        )}
        
        {isCustomExercise && (
          <TouchableOpacity 
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.deleteButton}
          >
            <Trash2 size={18} color={theme.error} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
});