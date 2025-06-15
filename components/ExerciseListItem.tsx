import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Dumbbell, Star } from "lucide-react-native";
import { Exercise } from "@/constants/exercises";

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
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.cardBackground,
          borderLeftColor: hasHistory ? theme.primary : "transparent",
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
      
      {hasHistory && (
        <Star size={16} color={theme.primary} fill={theme.primary} />
      )}
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
});