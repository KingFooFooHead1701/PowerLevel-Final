import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useAchievementStore } from "@/hooks/use-achievement-store";

export default function ResetDataButton() {
  const { theme, resetTheme } = useTheme();
  const { resetToDefaults } = useExerciseStore(); // Fixed: Use resetToDefaults instead of resetExerciseData
  const { resetSettings } = useSettingsStore();
  const { resetAchievements } = useAchievementStore();
  const [confirmationStep, setConfirmationStep] = useState(0);

  const handleResetData = () => {
    if (confirmationStep === 0) {
      setConfirmationStep(1);
      return;
    }

    if (confirmationStep === 1) {
      Alert.alert(
        "Reset All Data",
        "This will permanently delete all your exercise data, achievements, and settings. This action cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setConfirmationStep(0),
          },
          {
            text: "Reset Everything",
            style: "destructive",
            onPress: () => {
              resetToDefaults(); // Fixed: Use resetToDefaults instead of resetExerciseData
              resetSettings();
              resetAchievements();
              resetTheme();
              setConfirmationStep(0);
              Alert.alert("Data Reset", "All data has been reset successfully.");
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.resetButton,
          {
            backgroundColor: confirmationStep === 0 ? theme.dangerBackground : theme.dangerText + "20",
          },
        ]}
        onPress={handleResetData}
      >
        <Text style={[styles.resetButtonText, { color: theme.dangerText }]}>
          {confirmationStep === 0
            ? "Reset All Data"
            : "Tap Again to Confirm Reset"}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.warningText, { color: theme.textSecondary }]}>
        This will delete all your exercise data, achievements, and settings.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  resetButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  warningText: {
    fontSize: 14,
    textAlign: "center",
  },
});