import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search, Plus } from "lucide-react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import ExerciseListItem from "@/components/ExerciseListItem";
import CategoryTabs from "@/components/CategoryTabs";
import {
  exerciseCategories,
  resolveCanonicalExerciseId,
} from "@/constants/exercises";

export default function ExercisesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, sets } = useExerciseStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const recentCanonicalIds = useMemo(
    () =>
      new Set(
        sets.map((loggedSet) =>
          resolveCanonicalExerciseId(loggedSet.exerciseId),
        ),
      ),
    [sets],
  );

  const filteredExercises = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return exercises.filter((exercise) => {
      if (exercise.hiddenFromPicker) return false;

      const searchable = [
        exercise.name,
        exercise.category,
        ...(exercise.secondaryTags ?? []),
        ...(exercise.equipment ?? []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);
      const matchesCategory =
        selectedCategory === "All" ||
        exercise.category === selectedCategory ||
        (selectedCategory === "Quick-Select" &&
          recentCanonicalIds.has(exercise.id));

      return matchesSearch && matchesCategory;
    });
  }, [exercises, searchQuery, selectedCategory, recentCanonicalIds]);

  const renderEmptyState = () => {
    const message =
      selectedCategory === "Quick-Select"
        ? "No recently used exercises yet. Log an exercise and it will appear here."
        : "No exercises found. Try a different search or category.";

    return (
      <View style={styles.emptyState}>
        <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
          {message}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Exercises</Text>
          <Text style={[styles.count, { color: theme.textSecondary }]}>
            {exercises.filter((exercise) => !exercise.hiddenFromPicker).length}{" "}
            built-in + custom exercises
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.secondary }]}
          onPress={() => router.push("/custom-exercise")}
        >
          <Plus size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <CategoryTabs
        categories={[...exerciseCategories]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.inputBackground },
        ]}
      >
        <Search
          size={20}
          color={theme.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search exercises, equipment, or tags..."
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
            hasHistory={recentCanonicalIds.has(item.id)}
            onPress={() => router.push(`/exercise/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  count: { fontSize: 12, marginTop: 2 },
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 16 },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: { fontSize: 16, textAlign: "center" },
});
