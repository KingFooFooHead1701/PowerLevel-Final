import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { Search, Plus } from "lucide-react-native";
import ExerciseListItem from "@/components/ExerciseListItem";
import CategoryTabs from "@/components/CategoryTabs";
import { Exercise } from "@/constants/exercises";

export default function ExercisesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, sets } = useExerciseStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Quick-Select",
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Shoulders",
    "Core",
    "Cardio",
    "Full Body",
    "Custom",
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All" || 
      exercise.category === selectedCategory ||
      (selectedCategory === "Quick-Select" && sets.some(set => set.exerciseId === exercise.id));
    
    return matchesSearch && matchesCategory;
  });

  const navigateToExercise = (exerciseId: string) => {
    router.push(`/exercise/${exerciseId}`);
  };

  const navigateToCustomExercise = () => {
    router.push("/custom-exercise");
  };

  const renderEmptyState = () => {
    let message = "No exercises found. Try a different search or category.";
    
    if (selectedCategory === "Quick-Select") {
      message = "No starred exercises yet. Use exercises regularly to see them here.";
    }
    
    return (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
          {message}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Exercises</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.secondary }]}
          onPress={navigateToCustomExercise}
        >
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <View style={[styles.searchContainer, { backgroundColor: theme.inputBackground }]}>
        <Search size={20} color={theme.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search exercises..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExerciseListItem
            exercise={item}
            hasHistory={sets.some(set => set.exerciseId === item.id)}
            onPress={() => navigateToExercise(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
  },
});