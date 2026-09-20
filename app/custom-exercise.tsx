import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Dumbbell, Save } from "lucide-react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import {
  CalculationFamily,
  Exercise,
  exerciseCategories,
} from "@/constants/exercises";

type CustomType = "standard" | "cardio" | "isometric";

export default function CustomExerciseScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { addExercise } = useExerciseStore();

  const selectableCategories = exerciseCategories.filter(
    (category) => !["All", "Quick-Select"].includes(category),
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("Custom");
  const [description, setDescription] = useState("");
  const [displacement, setDisplacement] = useState("0.5");
  const [metValue, setMetValue] = useState("5.0");
  const [requiresBodyWeight, setRequiresBodyWeight] = useState(false);
  const [type, setType] = useState<CustomType>("standard");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const setExerciseType = (next: CustomType) => {
    setType(next);
    if (next === "cardio") {
      setCategory("Cardio");
      setRequiresBodyWeight(true);
      if (!metValue) setMetValue("5.0");
    } else if (next === "isometric") {
      setDisplacement("0");
      setRequiresBodyWeight(true);
    }
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert("Missing Information", "Please enter an exercise name.");
      return;
    }

    const displacementValue = Number.parseFloat(displacement);
    if (!Number.isFinite(displacementValue) || displacementValue < 0) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid non-negative displacement.",
      );
      return;
    }

    let met: number | undefined;
    if (type === "cardio" || type === "isometric") {
      const parsedMet = Number.parseFloat(metValue);
      if (!Number.isFinite(parsedMet) || parsedMet <= 0) {
        Alert.alert("Invalid Input", "Please enter a valid MET value.");
        return;
      }
      met = parsedMet;
    }

    let calculationFamily: CalculationFamily;
    if (type === "cardio") calculationFamily = "CARDIO_MET";
    else if (type === "isometric") calculationFamily = "ISO_MET";
    else calculationFamily = requiresBodyWeight ? "BW_REPS" : "EXT_LOAD_REPS";

    const id = `custom-${trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now()}`;

    const newExercise: Exercise = {
      id,
      name: trimmedName,
      category,
      description: description.trim(),
      displacement: displacementValue,
      calculationFamily,
      trackingMode:
        type === "cardio" || type === "isometric" ? "Time" : "Weight + reps",
      requiresBodyWeight:
        requiresBodyWeight || type === "cardio" || type === "isometric",
      isCardio: type === "cardio",
      isIsometric: type === "isometric",
      metValue: met,
      bodyWeightCoefficient:
        calculationFamily === "BW_REPS" ? 0.7 : undefined,
    };

    addExercise(newExercise);
    Alert.alert("Exercise Added", `${trimmedName} has been added.`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        edges={["top"]}
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Add Custom Exercise
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[styles.formCard, { backgroundColor: theme.cardBackground }]}
        >
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: `${theme.primary}20` },
              ]}
            >
              <Dumbbell size={32} color={theme.primary} />
            </View>
          </View>

          <Text style={[styles.label, { color: theme.text }]}>Exercise Name</Text>
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
          <TouchableOpacity
            style={[
              styles.selector,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
            onPress={() => setShowCategoryPicker((value) => !value)}
          >
            <Text style={{ color: theme.text }}>{category}</Text>
          </TouchableOpacity>

          {showCategoryPicker && (
            <View
              style={[
                styles.categoryList,
                { borderColor: theme.border },
              ]}
            >
              {selectableCategories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(item);
                    setShowCategoryPicker(false);
                    if (item === "Cardio") setExerciseType("cardio");
                  }}
                >
                  <Text style={{ color: theme.text }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={[styles.label, { color: theme.text }]}>Exercise Type</Text>
          <View style={styles.typeRow}>
            {(["standard", "cardio", "isometric"] as CustomType[]).map(
              (item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.typeButton,
                    { borderColor: theme.border },
                    type === item && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                  ]}
                  onPress={() => setExerciseType(item)}
                >
                  <Text
                    style={{
                      color: type === item ? "#fff" : theme.text,
                      fontWeight: type === item ? "700" : "400",
                    }}
                  >
                    {item[0].toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          {type === "standard" && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>
                Displacement per rep (meters)
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
                keyboardType="decimal-pad"
              />

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRequiresBodyWeight((value) => !value)}
              >
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: theme.border },
                    requiresBodyWeight && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                  ]}
                />
                <Text style={[styles.checkboxLabel, { color: theme.text }]}>
                  Body weight is the primary resistance
                </Text>
              </TouchableOpacity>
            </>
          )}

          {(type === "cardio" || type === "isometric") && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>
                Default MET value
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
                keyboardType="decimal-pad"
              />
            </>
          )}

          <Text style={[styles.label, { color: theme.text }]}>
            Description (Optional)
          </Text>
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
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.primary }]}
          onPress={handleSave}
        >
          <Save size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Save Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { width: "100%" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 12 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  formCard: { borderRadius: 12, padding: 16, margin: 16 },
  iconContainer: { alignItems: "center", marginBottom: 20 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 8 },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  selector: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryList: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryItem: { padding: 12 },
  typeRow: { flexDirection: "row", marginBottom: 18 },
  typeButton: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxLabel: { fontSize: 14, flex: 1 },
  textArea: {
    minHeight: 100,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonIcon: { marginRight: 8 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
