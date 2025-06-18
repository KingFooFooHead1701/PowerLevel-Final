import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { Exercise } from "@/constants/exercises";

export default function CustomExerciseScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { addExercise } = useExerciseStore();
  const { incrementCustomExerciseCount } = useAchievementStore();
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Custom");
  const [displacement, setDisplacement] = useState("1.0");
  const [description, setDescription] = useState("");
  const [isCardio, setIsCardio] = useState(false);
  const [isIsometric, setIsIsometric] = useState(false);
  const [requiresBodyWeight, setRequiresBodyWeight] = useState(false);
  const [metValue, setMetValue] = useState("3.0");

  const categories = [
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

  const handleAddExercise = () => {
    // Validate inputs
    if (!name.trim()) {
      Alert.alert("Missing Information", "Please enter an exercise name.");
      return;
    }

    // For cardio exercises, MET value is required
    if (isCardio && (!metValue || parseFloat(metValue) <= 0)) {
      Alert.alert(
        "Invalid MET Value",
        "Please enter a valid MET value for cardio exercises (greater than 0)."
      );
      return;
    }

    // For non-cardio, non-isometric exercises, displacement is required
    if (!isCardio && !isIsometric && (!displacement || parseFloat(displacement) <= 0)) {
      Alert.alert(
        "Invalid Displacement",
        "Please enter a valid displacement value (greater than 0)."
      );
      return;
    }

    // Create new exercise
    const newExercise: Exercise = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      category,
      displacement: parseFloat(displacement) || 1.0,
      description: description.trim() || undefined,
      isCardio,
      isIsometric,
      requiresBodyWeight,
      metValue: isCardio ? parseFloat(metValue) || 3.0 : undefined,
    };

    // Add to store
    addExercise(newExercise);
    
    // Increment custom exercise count for achievements
    incrementCustomExerciseCount();

    // Navigate back
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ title: "Add Custom Exercise" }} />

        <View style={styles.form}>
          <Text style={[styles.label, { color: theme.text }]}>Exercise Name *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter exercise name"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.label, { color: theme.text }]}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      category === cat ? theme.primary : theme.backgroundSecondary,
                  },
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: category === cat ? "#fff" : theme.text },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>
              Is Cardio Exercise
            </Text>
            <Switch
              value={isCardio}
              onValueChange={(value) => {
                setIsCardio(value);
                if (value) {
                  setIsIsometric(false);
                }
              }}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>
              Is Isometric Exercise
            </Text>
            <Switch
              value={isIsometric}
              onValueChange={(value) => {
                setIsIsometric(value);
                if (value) {
                  setIsCardio(false);
                }
              }}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>
              Requires Body Weight
            </Text>
            <Switch
              value={requiresBodyWeight}
              onValueChange={setRequiresBodyWeight}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor="#fff"
            />
          </View>

          {isCardio ? (
            <>
              <Text style={[styles.label, { color: theme.text }]}>
                MET Value * (intensity measure)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                value={metValue}
                onChangeText={setMetValue}
                placeholder="Enter MET value (e.g., 3.0)"
                placeholderTextColor={theme.textSecondary}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                MET values typically range from 1.0 (resting) to 10+ (intense activity)
              </Text>
            </>
          ) : !isIsometric ? (
            <>
              <Text style={[styles.label, { color: theme.text }]}>
                Displacement * (meters)
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                value={displacement}
                onChangeText={setDisplacement}
                placeholder="Enter displacement in meters"
                placeholderTextColor={theme.textSecondary}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                Typical range: 0.3 (small movements) to 2.0 (large movements)
              </Text>
            </>
          ) : null}

          <Text style={[styles.label, { color: theme.text }]}>Description (Optional)</Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: theme.inputBackground,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter exercise description"
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={handleAddExercise}
          >
            <Text style={styles.buttonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  addButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});