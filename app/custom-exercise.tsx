import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { Exercise } from "@/constants/exercises";
import { Dumbbell, Save, ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function CustomExerciseScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { addExercise } = useExerciseStore();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Custom");
  const [displacement, setDisplacement] = useState("0.5");
  const [description, setDescription] = useState("");
  const [requiresBodyWeight, setRequiresBodyWeight] = useState(false);
  const [isCardio, setIsCardio] = useState(false);
  const [isIsometric, setIsIsometric] = useState(false);
  const [metValue, setMetValue] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

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

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Missing Information", "Please enter a name for the exercise.");
      return;
    }
    const displacementValue = parseFloat(displacement);
    if (isNaN(displacementValue) || displacementValue < 0) {
      Alert.alert("Invalid Input", "Please enter a valid displacement value (0 or greater).");
      return;
    }

    let metValueNum = 0;
    if (isCardio && metValue) {
      metValueNum = parseFloat(metValue);
      if (isNaN(metValueNum) || metValueNum <= 0) {
        Alert.alert("Invalid Input", "Please enter a valid MET value for cardio exercise.");
        return;
      }
    }

    const id = `custom-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    const newExercise: Exercise = {
      id,
      name,
      category,
      displacement: displacementValue,
      description: description.trim(),
      requiresBodyWeight: requiresBodyWeight,
      isCardio: isCardio,
      isIsometric: isIsometric,
      metValue: metValueNum > 0 ? metValueNum : undefined,
    };
    addExercise(newExercise);
    Alert.alert("Exercise Added", `${name} has been added.`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleGoBack = () => router.back();

  // Handle exercise type selection
  const handleExerciseTypeChange = (type: 'standard' | 'cardio' | 'isometric') => {
    if (type === 'cardio') {
      setIsCardio(true);
      setIsIsometric(false);
      // Set default values for cardio
      if (category !== 'Cardio') setCategory('Cardio');
      if (!metValue) setMetValue("5.0"); // Default MET value
    } else if (type === 'isometric') {
      setIsCardio(false);
      setIsIsometric(true);
      // Set default values for isometric
      setDisplacement("0.0"); // Isometric exercises typically have zero displacement
    } else {
      // Standard exercise
      setIsCardio(false);
      setIsIsometric(false);
    }
  };

  return (
    <>
      {/* hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* custom header */}
      <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <TouchableOpacity 
            onPress={handleGoBack} 
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Add Custom Exercise</Text>
        </View>
      </SafeAreaView>

      {/* form */}
      <ScrollView style={[styles.scrollView, { backgroundColor: theme.background }]}>
        <View style={[styles.formCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: theme.primary + "20" }]}>
              <Dumbbell size={32} color={theme.primary} />
            </View>
          </View>

          <Text style={[styles.label, { color: theme.text }]}>Exercise Name</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
            ]}
            placeholder="Enter exercise name"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { color: theme.text }]}>Category</Text>
          <TouchableOpacity
            style={[styles.categorySelector, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={{ color: theme.text }}>{category}</Text>
          </TouchableOpacity>

          {showCategoryPicker && (
            <View style={[styles.categoryList, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryItem, cat === category && { backgroundColor: theme.primary + "20" }]}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryPicker(false);
                    // Auto-select cardio type if Cardio category is selected
                    if (cat === 'Cardio' && !isCardio) {
                      handleExerciseTypeChange('cardio');
                    }
                  }}
                >
                  <Text style={{ color: cat === category ? theme.primary : theme.text }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Exercise Type Selection */}
          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 16 }]}>Exercise Type</Text>
          <View style={styles.exerciseTypeContainer}>
            <TouchableOpacity
              style={[
                styles.exerciseTypeButton,
                { borderColor: theme.border },
                !isCardio && !isIsometric && { backgroundColor: theme.primary, borderColor: theme.primary }
              ]}
              onPress={() => handleExerciseTypeChange('standard')}
            >
              <Text style={{ 
                color: !isCardio && !isIsometric ? "#fff" : theme.text,
                fontWeight: !isCardio && !isIsometric ? "600" : "normal"
              }}>
                Standard
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.exerciseTypeButton,
                { borderColor: theme.border },
                isCardio && { backgroundColor: theme.primary, borderColor: theme.primary }
              ]}
              onPress={() => handleExerciseTypeChange('cardio')}
            >
              <Text style={{ 
                color: isCardio ? "#fff" : theme.text,
                fontWeight: isCardio ? "600" : "normal"
              }}>
                Cardio
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.exerciseTypeButton,
                { borderColor: theme.border },
                isIsometric && { backgroundColor: theme.primary, borderColor: theme.primary }
              ]}
              onPress={() => handleExerciseTypeChange('isometric')}
            >
              <Text style={{ 
                color: isIsometric ? "#fff" : theme.text,
                fontWeight: isIsometric ? "600" : "normal"
              }}>
                Isometric
              </Text>
            </TouchableOpacity>
          </View>

          {/* Standard Exercise Fields */}
          {!isCardio && !isIsometric && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>Displacement (meters)</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
                ]}
                placeholder="Enter displacement in meters"
                placeholderTextColor={theme.textSecondary}
                value={displacement}
                onChangeText={setDisplacement}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                Displacement is the vertical distance moved per rep.
              </Text>
            </>
          )}

          {/* Isometric Exercise Fields */}
          {isIsometric && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>Displacement (meters)</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
                ]}
                placeholder="Usually 0 for isometric exercises"
                placeholderTextColor={theme.textSecondary}
                value={displacement}
                onChangeText={setDisplacement}
                keyboardType="decimal-pad"
                editable={true}
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                Isometric exercises typically have zero displacement as they involve static holds.
              </Text>
            </>
          )}

          {/* Cardio Exercise Fields */}
          {isCardio && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>Displacement (meters)</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
                ]}
                placeholder="Enter incline/grade as decimal (e.g., 0.05 for 5%)"
                placeholderTextColor={theme.textSecondary}
                value={displacement}
                onChangeText={setDisplacement}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                For cardio, displacement represents incline/grade (e.g., 0.05 for 5% treadmill incline).
              </Text>

              <Text style={[styles.label, { color: theme.text }]}>MET Value</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
                ]}
                placeholder="Enter MET value (e.g., 5.0)"
                placeholderTextColor={theme.textSecondary}
                value={metValue}
                onChangeText={setMetValue}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                MET (Metabolic Equivalent of Task) helps calculate energy expenditure.
                Examples: Walking (3-4), Jogging (7-8), Running (8-12), Cycling (4-10).
              </Text>
            </>
          )}

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                { borderColor: theme.border },
                requiresBodyWeight && { backgroundColor: theme.primary, borderColor: theme.primary }
              ]}
              onPress={() => setRequiresBodyWeight(!requiresBodyWeight)}
            >
              {requiresBodyWeight && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={[styles.checkboxLabel, { color: theme.text }]}>
              Requires Body Weight
            </Text>
          </View>
          <Text style={[styles.helperText, { color: theme.textSecondary, marginTop: -8, marginBottom: 16 }]}>
            Check this for exercises where your body weight is part of the resistance (push-ups, pull-ups, etc.)
          </Text>

          <Text style={[styles.label, { color: theme.text }]}>Description (Optional)</Text>
          <TextInput
            style={[
              styles.textArea,
              { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
            ]}
            placeholder="Enter exercise description"
            placeholderTextColor={theme.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.primary }]} onPress={handleSave}>
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
  formCard: { borderRadius: 12, padding: 16, margin: 16 },
  iconContainer: { alignItems: "center", marginBottom: 24 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: "center", alignItems: "center" },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: { height: 48, borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, fontSize: 16, marginBottom: 16 },
  textArea: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, fontSize: 16, marginBottom: 16, minHeight: 100 },
  helperText: { fontSize: 12, marginBottom: 16 },
  categorySelector: { height: 48, borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, justifyContent: "center", marginBottom: 16 },
  categoryList: { borderRadius: 8, borderWidth: 1, marginBottom: 16, maxHeight: 200 },
  categoryItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.1)" },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, marginRight: 8, justifyContent: "center", alignItems: "center" },
  checkboxInner: { width: 10, height: 10, backgroundColor: "#fff", borderRadius: 2 },
  checkboxLabel: { fontSize: 16 },
  saveButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 56, borderRadius: 8, margin: 16 },
  buttonIcon: { marginRight: 8 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  exerciseTypeContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 16 
  },
  exerciseTypeButton: { 
    flex: 1, 
    height: 40, 
    borderRadius: 8, 
    borderWidth: 1, 
    justifyContent: "center", 
    alignItems: "center",
    marginHorizontal: 4
  },
});