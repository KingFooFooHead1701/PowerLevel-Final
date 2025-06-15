import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
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
  const { useMetricUnits, usePseudoJoules } = useSettingsStore();
  
  const [activeTab, setActiveTab] = useState("log");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastAddedSet, setLastAddedSet] = useState<any>(null);
  const [totalJoules, setTotalJoules] = useState(0);
  const [previousTotalJoules, setPreviousTotalJoules] = useState(0);
  
  const exercise = exercises.find(e => e.id === id);
  const exerciseSets = sets.filter(set => set.exerciseId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  useEffect(() => {
    if (!exercise) {
      router.back();
    }
    setTotalJoules(getTotalJoules());
  }, [exercise, sets]);

  if (!exercise) {
    return null;
  }

  const handleAddSet = () => {
    if (!reps || !weight) {
      Alert.alert("Missing Information", "Please enter both reps and weight.");
      return;
    }

    const repsNum = parseInt(reps, 10);
    const weightNum = parseFloat(weight);
    
    if (isNaN(repsNum) || isNaN(weightNum) || repsNum <= 0 || weightNum <= 0) {
      Alert.alert("Invalid Input", "Please enter valid numbers for reps and weight.");
      return;
    }

    const joules = calculateJoules({
      reps: repsNum,
      weight: weightNum,
      useMetricUnits,
      displacement: exercise.displacement,
      usePseudoJoules,
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
          <SetInput
            reps={reps}
            weight={weight}
            onRepsChange={setReps}
            onWeightChange={setWeight}
            useMetricUnits={useMetricUnits}
            onAddSet={handleAddSet}
          />
          
          <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>Exercise Information</Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Category: {exercise.category}
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Displacement: {exercise.displacement} meters
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Energy calculation: {usePseudoJoules ? "Simplified" : "Standard"} joules
            </Text>
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