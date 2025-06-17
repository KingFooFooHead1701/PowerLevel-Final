import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { Exercise } from "@/constants/exercises";
import { Dumbbell, Save, ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomExerciseScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { addExercise } = useExerciseStore();
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Custom");
  const [displacement, setDisplacement] = useState("0.5");
  const [description, setDescription] = useState("");
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

    // Create a unique ID based on name and timestamp
    const id = `custom-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
    
    const newExercise: Exercise = {
      id,
      name,
      category,
      displacement: displacementValue,
    };

    addExercise(newExercise);
    Alert.alert(
      "Exercise Added",
      `${name} has been added to your exercises.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleGoBack} 
            style={styles.backButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Add Custom Exercise</Text>
        </View>
      </SafeAreaView>
      
      <ScrollView style={styles.scrollView}>
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
              { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }
            ]}
            placeholder="Enter exercise name"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
          />
          
          <Text style={[styles.label, { color: theme.text }]}>Category</Text>
          <TouchableOpacity
            style={[
              styles.categorySelector,
              { backgroundColor: theme.inputBackground, borderColor: theme.border }
            ]}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={{ color: theme.text }}>{category}</Text>
          </TouchableOpacity>
          
          {showCategoryPicker && (
            <View style={[styles.categoryList, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryItem,
                    cat === category && { backgroundColor: theme.primary + "20" }
                  ]}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={{ color: cat === category ? theme.primary : theme.text }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          <Text style={[styles.label, { color: theme.text }]}>
            Displacement (meters)
          </Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }
            ]}
            placeholder="Enter displacement in meters"
            placeholderTextColor={theme.textSecondary}
            value={displacement}
            onChangeText={setDisplacement}
            keyboardType="decimal-pad"
          />
          <Text style={[styles.helperText, { color: theme.textSecondary }]}>
            Displacement is the vertical distance moved during one rep (used for energy calculation)
          </Text>
          
          <Text style={[styles.label, { color: theme.text }]}>Description (Optional)</Text>
          <TextInput
            style={[
              styles.textArea,
              { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }
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
        
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.primary }]}
          onPress={handleSave}
        >
          <Save size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Save Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 100,
  },
  helperText: {
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  categorySelector: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginBottom: 16,
  },
  categoryList: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: -12,
    marginBottom: 16,
    maxHeight: 200,
  },
  categoryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 8,
    marginBottom: 40,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});