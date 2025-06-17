import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { clearAllAppData } from '@/hooks/use-exercise-store';
import { useExerciseStore } from '@/hooks/use-exercise-store';
import { useSettingsStore } from '@/hooks/use-settings-store';
import { Trash2 } from 'lucide-react-native';

export default function ResetDataButton() {
  const { theme, resetTheme } = useTheme();
  const { resetToDefaults } = useExerciseStore();
  const { resetSettings } = useSettingsStore();

  const handleResetData = () => {
    Alert.alert(
      "Reset All Data",
      "This will reset all your exercises, sets, and settings to default values. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              // Reset all stores
              resetToDefaults();
              resetSettings();
              resetTheme();
              
              // Clear AsyncStorage
              await clearAllAppData();
              
              Alert.alert(
                "Data Reset",
                "All data has been reset to defaults. Please restart the app for changes to fully take effect.",
                [{ text: "OK" }]
              );
            } catch (error) {
              console.error("Error resetting data:", error);
              Alert.alert("Error", "Failed to reset data. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.dangerBackground }]}
      onPress={handleResetData}
    >
      <Trash2 size={20} color={theme.dangerText || "#FF4040"} />
      <Text style={[styles.text, { color: theme.dangerText || "#FF4040" }]}>
        Reset All Data
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});