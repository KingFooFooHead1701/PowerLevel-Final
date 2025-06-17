import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { calculateJoules, formatEnergy } from "@/utils/energy-utils";
import { Trash2 } from "lucide-react-native";
import SetInput from "@/components/SetInput";
import SetHistoryItem from "@/components/SetHistoryItem";
import { checkMilestone } from "@/utils/milestone-utils";
import SetConfirmationDialog from "@/components/SetConfirmationDialog";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, sets, addSet, removeSet, getTotalJoules } = useExerciseStore();
  const { useMetricUnits, usePseudoJoules, bodyWeight } = useSettingsStore();
  
  const [activeTab, setActiveTab] = useState("log");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [distance, setDistance] = useState(""); // For cardio exercises
  const [speed, setSpeed] = useState(""); // For cardio exercises (mph or km/h)
  const [incline, setIncline] = useState(""); // For treadmill exercises (percent)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastAddedSet, setLastAddedSet] = useState<any>(null);
  const [totalJoules, setTotalJoules] = useState(0);
  const [previousTotalJoules, setPreviousTotalJoules] = useState(0);
  
  const exercise = exercises.find(e => e.id === id);
  const exerciseSets = sets.filter(set => set.exerciseId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Check if this is a treadmill exercise
  const isTreadmill = exercise?.name?.toLowerCase().includes("treadmill");
  
  useEffect(() => {
    if (!exercise) {
      router.back();
      return;
    }
    setTotalJoules(getTotalJoules());
  }, [exercise, sets]);

  if (!exercise) {
    return null;
  }

  const checkBodyWeightRequired = () => {
    if (exercise.requiresBodyWeight && (!bodyWeight || bodyWeight <= 0)) {
      Alert.alert(
        "Body Weight Required",
        "This exercise requires your body weight for accurate energy calculation. Please set your body weight in Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Go to Settings", 
            onPress: () => router.push("/settings")
          }
        ]
      );
      return false;
    }
    return true;
  };

  const handleAddSet = () => {
    // Check if body weight is required and set
    if (!checkBodyWeightRequired()) {
      return;
    }

    // Validate inputs based on exercise type
    if (exercise.isCardio) {
      if (!distance) {
        Alert.alert("Missing Information", "Please enter distance.");
        return;
      }
      
      if (!speed) {
        Alert.alert("Missing Information", "Please enter speed.");
        return;
      }
      
      // For treadmill exercises, incline is required
      if (isTreadmill && !incline) {
        Alert.alert("Missing Information", "Please enter incline percentage.");
        return;
      }
    } else if (!exercise.isIsometric) {
      if (!reps || !weight) {
        Alert.alert("Missing Information", "Please enter both reps and weight.");
        return;
      }
    }

    const repsNum = parseInt(reps, 10) || 0;
    const weightNum = parseFloat(weight) || 0;
    const distanceNum = parseFloat(distance) || 0; // in meters/km
    const speedNum = parseFloat(speed) || 0; // in km/h or mph
    const inclineNum = parseFloat(incline) || 0; // in percent

    // Validate numeric inputs
    if (exercise.isCardio) {
      if (distanceNum <= 0 || speedNum <= 0) {
        Alert.alert("Invalid Input", "Please enter valid numbers for distance and speed.");
        return;
      }
      
      if (isTreadmill && (inclineNum < 0 || inclineNum > 15)) {
        Alert.alert("Invalid Input", "Incline should be between 0% and 15%.");
        return;
      }
    } else if (!exercise.isIsometric) {
      if (repsNum <= 0 || weightNum < 0) {
        Alert.alert("Invalid Input", "Please enter valid numbers for reps and weight.");
        return;
      }
    }

    const joules = calculateJoules({
      reps: repsNum,
      weight: weightNum,
      useMetricUnits,
      displacement: exercise.displacement,
      usePseudoJoules,
      exercise,
      bodyWeight,
      distance: distanceNum,
      speed: speedNum,
      incline: inclineNum
    });

    // Store the current total joules before adding the new set
    const currentTotalJoules = getTotalJoules();
    setPreviousTotalJoules(currentTotalJoules);

    const newSet = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      date: new Date().toISOString(),
      reps: repsNum,
      weight: weightNum,
      joules,
      distance: distanceNum,
      speed: speedNum,
      incline: inclineNum
    };

    addSet(newSet);
    
    // Update total joules
    const updatedTotalJoules = currentTotalJoules + joules;
    setTotalJoules(updatedTotalJoules);
    
    // Store the last added set for the confirmation dialog
    setLastAddedSet(newSet);
    
    // Show confirmation dialog
    setShowConfirmation(true);
    
    // Note: We're no longer clearing the input fields here
    // This allows users to quickly add multiple sets with the same values
    
    // Check for milestone after adding the set
    const milestone = checkMilestone(updatedTotalJoules, currentTotalJoules);
    
    if (milestone) {
      // Close confirmation dialog if open
      setShowConfirmation(false);
      
      // Navigate to milestone screen
      router.push({
        pathname: "/milestone",
        params: { level: milestone }
      });
    }
  };

  const handleDeleteSet = (setId: string) => {
    Alert.alert(
      "Delete Set",
      "Are you sure you want to delete this set?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            removeSet(setId);
          }
        }
      ]
    );
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: exercise.name }} />
      
      <View style={[styles.tabBar, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "log" && { borderBottomColor: theme.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab("log")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "log" ? theme.primary : theme.textSecondary }
            ]}
          >
            Log Set
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "history" && { borderBottomColor: theme.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab("history")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "history" ? theme.primary : theme.textSecondary }
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "log" ? (
        <View style={styles.logContainer}>
          {exercise.isCardio ? (
            <View style={[styles.cardioInputContainer, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.title, { color: theme.text }]}>
                Log Cardio Exercise
              </Text>
              
              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                    Distance ({useMetricUnits ? "km" : "miles"})
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: theme.inputBackground,
                        color: theme.text,
                        borderColor: theme.border,
                      }
                    ]}
                    value={distance}
                    onChangeText={setDistance}
                    placeholder="0"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="decimal-pad"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                    Speed ({useMetricUnits ? "km/h" : "mph"})
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        backgroundColor: theme.inputBackground,
                        color: theme.text,
                        borderColor: theme.border,
                      }
                    ]}
                    value={speed}
                    onChangeText={setSpeed}
                    placeholder="0"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
              
              {isTreadmill && (
                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                      Incline (%)
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        { 
                          backgroundColor: theme.inputBackground,
                          color: theme.text,
                          borderColor: theme.border,
                        }
                      ]}
                      value={incline}
                      onChangeText={setIncline}
                      placeholder="0"
                      placeholderTextColor={theme.textSecondary}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                      Reps (optional)
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        { 
                          backgroundColor: theme.inputBackground,
                          color: theme.text,
                          borderColor: theme.border,
                        }
                      ]}
                      value={reps}
                      onChangeText={setReps}
                      placeholder="0"
                      placeholderTextColor={theme.textSecondary}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              )}
              
              {!isTreadmill && (
                <View style={styles.inputRow}>
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                      Reps (optional)
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        { 
                          backgroundColor: theme.inputBackground,
                          color: theme.text,
                          borderColor: theme.border,
                        }
                      ]}
                      value={reps}
                      onChangeText={setReps}
                      placeholder="0"
                      placeholderTextColor={theme.textSecondary}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              )}
              
              {exercise.requiresBodyWeight && (
                <View style={styles.bodyWeightInfo}>
                  <Text style={[styles.bodyWeightText, { color: theme.textSecondary }]}>
                    Using body weight: {bodyWeight > 0 ? bodyWeight : "Not set"} {useMetricUnits ? "kg" : "lbs"}
                  </Text>
                </View>
              )}
              
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.primary }]}
                onPress={handleAddSet}
              >
                <Text style={styles.buttonText}>Log Activity</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <SetInput
              reps={reps}
              weight={weight}
              onRepsChange={setReps}
              onWeightChange={setWeight}
              useMetricUnits={useMetricUnits}
              onAddSet={handleAddSet}
              requiresBodyWeight={exercise.requiresBodyWeight}
              bodyWeight={bodyWeight}
            />
          )}
          
          <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>Exercise Information</Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Category: {exercise.category}
            </Text>
            {!exercise.isIsometric && (
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Displacement: {exercise.displacement} meters
              </Text>
            )}
            {exercise.isCardio && exercise.metValue && (
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Base MET Value: {exercise.metValue} (intensity measure)
              </Text>
            )}
            {isTreadmill && (
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                MET value adjusts dynamically based on speed and incline
              </Text>
            )}
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Energy calculation: {usePseudoJoules ? "Simplified" : "Standard"} joules
            </Text>
            {exercise.requiresBodyWeight && (
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                This exercise uses your body weight in calculations
              </Text>
            )}
            {exercise.description && (
              <Text style={[styles.descriptionText, { color: theme.textSecondary }]}>
                {exercise.description}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <ScrollView style={styles.historyContainer}>
          {exerciseSets.length > 0 ? (
            exerciseSets.map(set => (
              <SetHistoryItem
                key={set.id}
                set={set}
                useMetricUnits={useMetricUnits}
                onDelete={() => handleDeleteSet(set.id)}
                isCardio={exercise.isCardio}
                isIsometric={exercise.isIsometric}
                isTreadmill={isTreadmill}
              />
            ))
          ) : (
            <View style={styles.emptyHistory}>
              <Text style={[styles.emptyHistoryText, { color: theme.textSecondary }]}>
                No sets logged for this exercise yet.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
      
      {/* Confirmation Dialog */}
      <SetConfirmationDialog
        visible={showConfirmation}
        onClose={handleCloseConfirmation}
        set={lastAddedSet}
        exercise={exercise}
        useMetricUnits={useMetricUnits}
        totalJoules={totalJoules}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    height: 48,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logContainer: {
    flex: 1,
    padding: 16,
  },
  historyContainer: {
    flex: 1,
    padding: 16,
  },
  cardioInputContainer: {
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  bodyWeightInfo: {
    marginBottom: 16,
  },
  bodyWeightText: {
    fontSize: 14,
    fontStyle: "italic",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  infoCard: {
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 12,
    fontStyle: "italic",
  },
  emptyHistory: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyHistoryText: {
    fontSize: 16,
    textAlign: "center",
  },
});