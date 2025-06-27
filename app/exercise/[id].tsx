// app/(tabs)/[id].tsx

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Platform,
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { calculateJoules } from "@/utils/energy-utils";
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
  const { width, height } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState<"log" | "history">("log");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [speed, setSpeed] = useState("");
  const [incline, setIncline] = useState("");
  const [duration, setDuration] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastAddedSet, setLastAddedSet] = useState<any>(null);
  const [totalJoules, setTotalJoules] = useState(0);

  const exercise = exercises.find(e => e.id === id);
  useEffect(() => { if (!exercise) router.back(); }, [exercise]);
  if (!exercise) return null;

  const exerciseSets = sets
    .filter(s => s.exerciseId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isTreadmill = exercise.name.toLowerCase().includes("treadmill");
  const isLandscape = width > height;

  useEffect(() => {
    setTotalJoules(getTotalJoules());
  }, [sets]);

  const checkBodyWeightRequired = () => {
    if (exercise.requiresBodyWeight && (!bodyWeight || bodyWeight <= 0)) {
      Alert.alert(
        "Body Weight Required",
        "This exercise requires your body weight for accurate energy calculation. Please set your body weight in Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Go to Settings", onPress: () => router.push("/settings") }
        ]
      );
      return false;
    }
    return true;
  };

  const handleAddSet = () => {
    if (!checkBodyWeightRequired()) return;

    // cardio
    if (exercise.isCardio) {
      if (!distance || !speed || (isTreadmill && !incline)) {
        Alert.alert("Missing Information", "Please fill in all cardio fields.");
        return;
      }
      const distanceNum = parseFloat(distance) || 0;
      const speedNum    = parseFloat(speed)    || 0;
      const inclineNum  = parseFloat(incline)  || 0;

      const joules = calculateJoules({
        reps: 0, weight: 0, useMetricUnits,
        displacement: exercise.displacement,
        usePseudoJoules, exercise, bodyWeight,
        distance: distanceNum, speed: speedNum, incline: inclineNum
      });

      const before = getTotalJoules();
      const newSet = {
        id: Date.now().toString(),
        exerciseId: exercise.id,
        date: new Date().toISOString(),
        reps: 0, weight: 0,
        joules, distance: distanceNum, speed: speedNum, incline: inclineNum
      };
      addSet(newSet);
      setTotalJoules(before + joules);
      setLastAddedSet(newSet);
      setShowConfirmation(true);
      const milestone = checkMilestone(before + joules, before);
      if (milestone) {
        setShowConfirmation(false);
        router.push({ pathname: "/milestone", params: { level: milestone } });
      }
      return;
    }

    // isometric
    if (exercise.isIsometric) {
      const dur = parseInt(duration, 10) || 0;
      if (dur <= 0) {
        Alert.alert("Missing Information", "Please enter duration in seconds.");
        return;
      }
      const joules = calculateJoules({
        reps: 0, weight: 0, useMetricUnits,
        displacement: exercise.displacement,
        usePseudoJoules, exercise, bodyWeight,
        duration: dur, distance: 0, incline: 0
      });

      const before = getTotalJoules();
      const newSet = {
        id: Date.now().toString(),
        exerciseId: exercise.id,
        date: new Date().toISOString(),
        reps: 0, weight: 0,
        joules, duration: dur
      };
      addSet(newSet);
      setTotalJoules(before + joules);
      setLastAddedSet(newSet);
      setShowConfirmation(true);
      const milestone = checkMilestone(before + joules, before);
      if (milestone) {
        setShowConfirmation(false);
        router.push({ pathname: "/milestone", params: { level: milestone } });
      }
      return;
    }

    // strength
    const repsNum   = parseInt(reps, 10)   || 0;
    const weightNum = parseFloat(weight)   || 0;
    if (repsNum <= 0 || weightNum < 0) {
      Alert.alert("Invalid Input", "Please enter valid reps & weight.");
      return;
    }
    const joules = calculateJoules({
      reps: repsNum, weight: weightNum, useMetricUnits,
      displacement: exercise.displacement,
      usePseudoJoules, exercise, bodyWeight,
      distance: 0, incline: 0
    });
    const before = getTotalJoules();
    const newSet = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      date: new Date().toISOString(),
      reps: repsNum, weight: weightNum, joules
    };
    addSet(newSet);
    setTotalJoules(before + joules);
    setLastAddedSet(newSet);
    setShowConfirmation(true);
    const milestone = checkMilestone(before + joules, before);
    if (milestone) {
      setShowConfirmation(false);
      router.push({ pathname: "/milestone", params: { level: milestone } });
    }
  };

  const renderLogSection = () => {
    if (exercise.isCardio) {
      return (
        <View style={[styles.cardioInputContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.title, { color: theme.text }]}>Log Cardio Exercise</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                Distance ({useMetricUnits ? "km" : "miles"})
              </Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
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
                style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
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
                  Incline (%) — enter 0 if flat
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
                  value={incline}
                  onChangeText={setIncline}
                  placeholder="0"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          )}
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={handleAddSet}>
            <Text style={styles.buttonText}>Log Activity</Text>
          </TouchableOpacity>
          {isTreadmill && (
            <Text style={[styles.treadmillWarning, { color: theme.textSecondary }]}>
              ⚠️ Increasing speed does not increase joules. To burn more energy, log more miles or use a higher incline on your next set.
            </Text>
          )}
        </View>
      );
    }

    if (exercise.isIsometric) {
      return (
        <View style={[styles.cardioInputContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.title, { color: theme.text }]}>Log Isometric Exercise</Text>
          <Text style={[styles.inputLabel, { color: theme.textSecondary, marginBottom: 8 }]}>
            Duration (seconds)
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
            value={duration}
            onChangeText={setDuration}
            placeholder="0"
            placeholderTextColor={theme.textSecondary}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={handleAddSet}>
            <Text style={styles.buttonText}>Log Hold</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // strength + optional crunch-only warning
    return (
      <>
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

        {exercise.name.toLowerCase().includes("crunch") && (
          <Text style={[styles.warningText, { color: theme.textSecondary }]}>
            ⚠️ Joules for crunches default to 30% of your body weight. Any extra weight you hold
            (e.g. a plate) will be added on top of that to calculate your total energy.
          </Text>
        )}
      </>
    );
  };

  const renderContent = () => {
    if (isLandscape) {
      return (
        <View style={styles.landscapeContainer}>
          <View style={styles.landscapeLeftPanel}>
            {activeTab === "log" ? (
              <ScrollView style={styles.logContainer}>{renderLogSection()}</ScrollView>
            ) : (
              <ScrollView style={styles.historyContainer}>
                {exerciseSets.length > 0 ? (
                  exerciseSets.map(s => (
                    <SetHistoryItem
                      key={s.id}
                      set={s}
                      useMetricUnits={useMetricUnits}
                      onDelete={() => removeSet(s.id)}
                      isCardio={exercise.isCardio}
                      isIsometric={exercise.isIsometric}
                      isTreadmill={isTreadmill}
                    />
                  ))
                ) : (
                  <View style={styles.emptyHistory}>
                    <Text style={[styles.emptyHistoryText, { color: theme.textSecondary }]}>
                      No sets logged yet.
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
          <View style={styles.landscapeRightPanel}>
            <View style={[styles.infoCard, { backgroundColor: theme.cardBackground, height: "100%" }]}>
              <Text style={[styles.infoTitle, { color: theme.text }]}>Exercise Information</Text>
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Category: {exercise.category}
              </Text>
              {!exercise.isIsometric && (
                <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                  Displacement: {exercise.displacement} meters
                </Text>
              )}
              {exercise.isCardio && exercise.metValue != null && (
                <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                  Base MET Value: {exercise.metValue}
                </Text>
              )}
              {isTreadmill && (
                <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                  MET value adjusts dynamically based on speed & incline
                </Text>
              )}
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Energy calc: {usePseudoJoules ? "Simplified" : "Standard"} joules
              </Text>
              {exercise.description && (
                <ScrollView
                  style={styles.landscapeDescriptionScrollView}
                  showsVerticalScrollIndicator={Platform.OS !== "web"}
                >
                  <Text style={[styles.descriptionText, { color: theme.textSecondary }]}>
                    {exercise.description}
                  </Text>
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      );
    }

    return (
      <>
        {activeTab === "log" ? (
          <ScrollView style={styles.logContainer}>{renderLogSection()}</ScrollView>
        ) : (
          <ScrollView style={styles.historyContainer}>
            {exerciseSets.length > 0 ? (
              exerciseSets.map(s => (
                <SetHistoryItem
                  key={s.id}
                  set={s}
                  useMetricUnits={useMetricUnits}
                  onDelete={() => removeSet(s.id)}
                  isCardio={exercise.isCardio}
                  isIsometric={exercise.isIsometric}
                  isTreadmill={isTreadmill}
                />
              ))
            ) : (
              <View style={styles.emptyHistory}>
                <Text style={[styles.emptyHistoryText, { color: theme.textSecondary }]}>
                  No sets logged yet.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
        <View style={[styles.portraitInfoContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>Exercise Information</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Category: {exercise.category}
          </Text>
          {!exercise.isIsometric && (
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Displacement: {exercise.displacement} meters
            </Text>
          )}
          {exercise.isCardio && exercise.metValue != null && (
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Base MET Value: {exercise.metValue}
            </Text>
          )}
          {isTreadmill && (
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              MET value adjusts dynamically based on speed & incline
            </Text>
          )}
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Energy calc: {usePseudoJoules ? "Simplified" : "Standard"} joules
          </Text>
          {exercise.description && (
            <ScrollView
              style={styles.descriptionScrollView}
              showsVerticalScrollIndicator={Platform.OS !== "web"}
            >
              <Text style={[styles.descriptionText, { color: theme.textSecondary }]}>
                {exercise.description}
              </Text>
            </ScrollView>
          )}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
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

      {renderContent()}

      <SetConfirmationDialog
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        set={lastAddedSet}
        exercise={exercise}
        useMetricUnits={useMetricUnits}
        totalJoules={totalJoules}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: { flexDirection: "row", height: 48 },
  tab: { flex: 1, justifyContent: "center", alignItems: "center" },
  tabText: { fontSize: 16, fontWeight: "500" },

  logContainer: { flex: 1, padding: 16 },
  historyContainer: { flex: 1, padding: 16 },

  cardioInputContainer: { padding: 16, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 16 },
  inputRow: { flexDirection: "row", marginBottom: 16 },
  inputGroup: { flex: 1, marginHorizontal: 4 },
  inputLabel: { fontSize: 14, marginBottom: 8 },
  input: { height: 48, borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, fontSize: 16 },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    marginTop: 8
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  treadmillWarning: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },

  warningText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },

  emptyHistory: { padding: 24, alignItems: "center", justifyContent: "center" },
  emptyHistoryText: { fontSize: 16, textAlign: "center" },

  landscapeContainer: { flex: 1, flexDirection: "row" },
  landscapeLeftPanel: { flex: 1, borderRightWidth: 1, borderRightColor: "#333" },
  landscapeRightPanel: { flex: 1, padding: 16 },
  infoCard: { padding: 16, borderRadius: 8, marginTop: 24, marginBottom: 24 },
  infoTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  infoText: { fontSize: 14, marginBottom: 8 },

  landscapeDescriptionScrollView: { flex: 1, marginTop: 12 },
  descriptionScrollView: { maxHeight: 200, marginTop: 12 },
  descriptionText: { fontSize: 16, lineHeight: 24, fontStyle: "italic" },

  portraitInfoContainer: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
});
