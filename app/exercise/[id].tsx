import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import {
  CalculationFamily,
  resolveCanonicalExerciseId,
} from "@/constants/exercises";
import { calculateJoules } from "@/utils/energy-utils";
import { checkMilestone } from "@/utils/milestone-utils";
import SetHistoryItem from "@/components/SetHistoryItem";
import SetConfirmationDialog from "@/components/SetConfirmationDialog";

const REP_FAMILIES: CalculationFamily[] = [
  "EXT_LOAD_REPS",
  "BW_REPS",
  "COMBINED_REPS",
  "ASSISTED_BW_REPS",
  "PLYO_REPS",
  "COMPLEX_REPS",
];

const fallbackFamily = (exercise: {
  calculationFamily?: CalculationFamily;
  isCardio?: boolean;
  isIsometric?: boolean;
  requiresBodyWeight?: boolean;
}): CalculationFamily => {
  if (exercise.calculationFamily) return exercise.calculationFamily;
  if (exercise.isIsometric) return "ISO_MET";
  if (exercise.isCardio) return "CARDIO_MET";
  return exercise.requiresBodyWeight ? "BW_REPS" : "EXT_LOAD_REPS";
};

export default function ExerciseDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const requestedId = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, sets, addSet, removeSet, getTotalJoules } =
    useExerciseStore();
  const { useMetricUnits, usePseudoJoules, bodyWeight } = useSettingsStore();

  const exercise = useMemo(
    () => exercises.find((item) => item.id === requestedId),
    [exercises, requestedId],
  );

  useEffect(() => {
    if (!exercise) router.back();
  }, [exercise, router]);

  const [activeTab, setActiveTab] = useState<"log" | "history">("log");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [speed, setSpeed] = useState("");
  const [incline, setIncline] = useState("");
  const [watts, setWatts] = useState("");
  const [assistance, setAssistance] = useState("");
  const [verticalDistance, setVerticalDistance] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastAddedSet, setLastAddedSet] = useState<any>(null);

  if (!exercise) return null;

  const family = fallbackFamily(exercise);
  const canonicalId = exercise.canonicalId ?? exercise.id;
  const exerciseSets = sets
    .filter(
      (loggedSet) =>
        resolveCanonicalExerciseId(loggedSet.exerciseId) === canonicalId,
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  const weightUnit = useMetricUnits ? "kg" : "lb";
  const distanceUnit = useMetricUnits ? "km" : "mi";
  const speedUnit = useMetricUnits ? "km/h" : "mph";
  const verticalUnit = useMetricUnits ? "m" : "ft";

  const needsBodyWeight = exercise.requiresBodyWeight;
  const needsExternalWeight =
    family === "EXT_LOAD_REPS" ||
    family === "COMBINED_REPS" ||
    family === "COMPLEX_REPS" ||
    family === "LOADED_LOCOMOTION";

  const parse = (value: string) => {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const validate = () => {
    if (needsBodyWeight && (!bodyWeight || bodyWeight <= 0)) {
      Alert.alert(
        "Body Weight Required",
        "This exercise uses your body weight in its energy model. Add your body weight in Settings first.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Go to Settings", onPress: () => router.push("/settings") },
        ],
      );
      return false;
    }

    if (REP_FAMILIES.includes(family) && parse(reps) <= 0) {
      Alert.alert("Missing Information", "Please enter a valid rep count.");
      return false;
    }

    if (needsExternalWeight && parse(weight) <= 0) {
      Alert.alert(
        "Missing Information",
        `Please enter the external load in ${weightUnit}.`,
      );
      return false;
    }

    if (family === "ASSISTED_BW_REPS" && parse(assistance) <= 0) {
      Alert.alert(
        "Missing Information",
        `Please enter the assistance amount in ${weightUnit}.`,
      );
      return false;
    }

    if (
      ["ISO_MET", "CARDIO_MET", "CARDIO_SPEED_MET", "MACHINE_WATT", "SWIM_MET", "LOADED_LOCOMOTION"].includes(
        family,
      ) &&
      parse(duration) <= 0
    ) {
      Alert.alert("Missing Information", "Please enter the duration in seconds.");
      return false;
    }

    if (family === "CARDIO_SPEED_MET" && parse(speed) <= 0) {
      Alert.alert(
        "Missing Information",
        `Please enter your speed in ${speedUnit}.`,
      );
      return false;
    }

    if (
      family === "VERTICAL_DISTANCE" &&
      parse(verticalDistance) <= 0 &&
      parse(duration) <= 0
    ) {
      Alert.alert(
        "Missing Information",
        `Enter vertical distance in ${verticalUnit}, or a duration for the MET fallback.`,
      );
      return false;
    }

    return true;
  };

  const clearInputs = () => {
    setReps("");
    setWeight("");
    setDuration("");
    setDistance("");
    setSpeed("");
    setIncline("");
    setWatts("");
    setAssistance("");
    setVerticalDistance("");
  };

  const handleAddSet = () => {
    if (!validate()) return;

    const repsNum = Math.round(parse(reps));
    const weightNum = parse(weight);
    const durationNum = Math.round(parse(duration));
    const distanceNum = parse(distance);
    const speedNum = parse(speed);
    const inclineNum = parse(incline);
    const wattsNum = parse(watts);
    const assistanceNum = parse(assistance);
    const verticalDistanceNum = parse(verticalDistance);

    const joules = calculateJoules({
      reps: repsNum,
      weight: weightNum,
      useMetricUnits,
      displacement: exercise.displacement,
      usePseudoJoules,
      exercise,
      bodyWeight,
      duration: durationNum,
      distance: distanceNum,
      speed: speedNum,
      incline: inclineNum,
      watts: wattsNum,
      assistance: assistanceNum,
      verticalDistance: verticalDistanceNum,
    });

    if (!Number.isFinite(joules) || joules <= 0) {
      Alert.alert(
        "Calculation Error",
        "Power Level could not calculate energy from those inputs. Check the values and try again.",
      );
      return;
    }

    const before = getTotalJoules();
    const newSet = {
      id: Date.now().toString(),
      exerciseId: canonicalId,
      date: new Date().toISOString(),
      reps: repsNum,
      weight: weightNum,
      joules,
      duration: durationNum || undefined,
      distance: distanceNum || undefined,
      distanceUnit: distanceNum
        ? (useMetricUnits ? ("km" as const) : ("mi" as const))
        : undefined,
      speed: speedNum || undefined,
      speedUnit: speedNum
        ? (useMetricUnits ? ("kmh" as const) : ("mph" as const))
        : undefined,
      incline: inclineNum || undefined,
      watts: wattsNum || undefined,
      assistance: assistanceNum || undefined,
      verticalDistance: verticalDistanceNum || undefined,
      verticalDistanceUnit: verticalDistanceNum
        ? (useMetricUnits ? ("m" as const) : ("ft" as const))
        : undefined,
    };

    addSet(newSet);
    setLastAddedSet(newSet);
    setShowConfirmation(true);
    clearInputs();

    const milestone = checkMilestone(before + joules, before);
    if (milestone) {
      setShowConfirmation(false);
      router.push({ pathname: "/milestone", params: { level: milestone } });
    }
  };

  const Input = ({
    label,
    value,
    onChangeText,
    placeholder = "0",
  }: {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
  }) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
        {label}
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
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        keyboardType="decimal-pad"
      />
    </View>
  );

  const renderInputs = () => {
    if (REP_FAMILIES.includes(family)) {
      return (
        <>
          <Input label="Reps" value={reps} onChangeText={setReps} />
          {(family === "EXT_LOAD_REPS" ||
            family === "COMBINED_REPS" ||
            family === "COMPLEX_REPS" ||
            family === "PLYO_REPS") && (
            <Input
              label={`External load (${weightUnit})${
                family === "PLYO_REPS" ? " — optional" : ""
              }`}
              value={weight}
              onChangeText={setWeight}
            />
          )}
          {family === "ASSISTED_BW_REPS" && (
            <Input
              label={`Assistance (${weightUnit})`}
              value={assistance}
              onChangeText={setAssistance}
            />
          )}
        </>
      );
    }

    if (family === "VERTICAL_DISTANCE") {
      return (
        <>
          <Input
            label={`Vertical distance (${verticalUnit})`}
            value={verticalDistance}
            onChangeText={setVerticalDistance}
          />
          <Input
            label="Duration (seconds) — optional fallback"
            value={duration}
            onChangeText={setDuration}
          />
          <Input
            label={`External load (${weightUnit}) — optional`}
            value={weight}
            onChangeText={setWeight}
          />
        </>
      );
    }

    if (family === "LOADED_LOCOMOTION") {
      return (
        <>
          <Input
            label="Duration (seconds)"
            value={duration}
            onChangeText={setDuration}
          />
          <Input
            label={`Load (${weightUnit})`}
            value={weight}
            onChangeText={setWeight}
          />
          <Input
            label={`Distance (${distanceUnit}) — optional`}
            value={distance}
            onChangeText={setDistance}
          />
        </>
      );
    }

    if (family === "CARDIO_SPEED_MET") {
      return (
        <>
          <Input
            label="Duration (seconds)"
            value={duration}
            onChangeText={setDuration}
          />
          <Input
            label={`Speed (${speedUnit})`}
            value={speed}
            onChangeText={setSpeed}
          />
          <Input
            label="Grade / incline (%) — optional"
            value={incline}
            onChangeText={setIncline}
          />
          <Input
            label={`Distance (${distanceUnit}) — optional`}
            value={distance}
            onChangeText={setDistance}
          />
        </>
      );
    }

    if (family === "MACHINE_WATT") {
      return (
        <>
          <Input
            label="Duration (seconds)"
            value={duration}
            onChangeText={setDuration}
          />
          <Input
            label="Average watts — optional, preferred"
            value={watts}
            onChangeText={setWatts}
          />
          <Text style={[styles.helperText, { color: theme.textSecondary }]}>
            If watts are unavailable, Power Level uses the exercise's MET estimate.
          </Text>
        </>
      );
    }

    return (
      <Input
        label="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
      />
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        edges={["top"]}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ChevronLeft size={26} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.text }]}>
              {exercise.name}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {exercise.category}
            </Text>
          </View>
        </View>

        <View style={styles.tabs}>
          {(["log", "history"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && { borderBottomColor: theme.primary },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === tab ? theme.primary : theme.textSecondary,
                  },
                ]}
              >
                {tab === "log" ? "Log" : "History"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "log" ? (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View
              style={[
                styles.card,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Log {exercise.name}
              </Text>
              {renderInputs()}
              {needsBodyWeight && (
                <Text style={[styles.helperText, { color: theme.textSecondary }]}>
                  Body weight used:{" "}
                  {bodyWeight && bodyWeight > 0 ? bodyWeight : "Not set"}{" "}
                  {weightUnit}
                </Text>
              )}
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.primary }]}
                onPress={handleAddSet}
              >
                <Text style={styles.primaryButtonText}>Log Activity</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.card,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Exercise Information
              </Text>
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                Calculation model: {family}
              </Text>
              {exercise.metValue != null && (
                <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                  Base MET: {exercise.metValue}
                </Text>
              )}
              {REP_FAMILIES.includes(family) && (
                <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                  Default travel per rep: {exercise.displacement} m
                </Text>
              )}
              {exercise.description && (
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  {exercise.description}
                </Text>
              )}
            </View>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {exerciseSets.length > 0 ? (
              exerciseSets.map((loggedSet) => (
                <SetHistoryItem
                  key={loggedSet.id}
                  set={loggedSet}
                  useMetricUnits={useMetricUnits}
                  onDelete={() => removeSet(loggedSet.id)}
                  isCardio={exercise.isCardio}
                  isIsometric={exercise.isIsometric}
                  isTreadmill={exercise.name.toLowerCase().includes("treadmill")}
                />
              ))
            ) : (
              <View
                style={[
                  styles.card,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <Text style={{ color: theme.textSecondary }}>
                  No history for this exercise yet.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>

      {lastAddedSet && (
        <SetConfirmationDialog
          visible={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          set={lastAddedSet}
          exercise={exercise}
          useMetricUnits={useMetricUnits}
          totalJoules={getTotalJoules()}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: { flex: 1, marginLeft: 10 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 13, marginTop: 2 },
  tabs: { flexDirection: "row", paddingHorizontal: 16 },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: { fontSize: 16, fontWeight: "600" },
  scrollContent: { padding: 16, paddingBottom: 40 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 14 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 14, marginBottom: 6 },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  helperText: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
  primaryButton: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  infoText: { fontSize: 14, marginBottom: 6 },
  description: { fontSize: 15, lineHeight: 22, marginTop: 8 },
});
