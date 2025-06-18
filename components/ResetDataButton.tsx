import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Trash2 } from "lucide-react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useAchievementStore } from "@/hooks/use-achievement-store";

export default function ResetDataButton() {
  const { theme } = useTheme();
  const { resetAllData } = useExerciseStore();
  const { resetAchievements } = useAchievementStore();
  const [isResetting, setIsResetting] = useState(false);
  
  const handleResetPress = () => {
    Alert.alert(
      "Reset All Data",
      "This will permanently delete all your exercise data, sets, and achievements. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: confirmReset
        }
      ]
    );
  };
  
  const confirmReset = () => {
    setIsResetting(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      resetAllData();
      resetAchievements();
      setIsResetting(false);
      
      Alert.alert(
        "Data Reset Complete",
        "All your exercise data and achievements have been reset.",
        [{ text: "OK" }]
      );
    }, 500);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.resetButton,
          { backgroundColor: theme.dangerBackground },
          isResetting && { opacity: 0.7 }
        ]}
        onPress={handleResetPress}
        disabled={isResetting}
      >
        <Trash2 size={20} color={theme.danger} style={styles.icon} />
        <Text style={[styles.resetText, { color: theme.danger }]}>
          {isResetting ? "Resetting..." : "Reset All Data"}
        </Text>
      </TouchableOpacity>
      
      <Text style={[styles.warningText, { color: theme.textSecondary }]}>
        This will permanently delete all your exercise data, sets, and achievements.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  icon: {
    marginRight: 8,
  },
  resetText: {
    fontSize: 16,
    fontWeight: "600",
  },
  warningText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 32,
  },
});