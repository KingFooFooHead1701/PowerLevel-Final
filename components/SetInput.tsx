import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { Plus } from "lucide-react-native";

interface SetInputProps {
  reps: string;
  weight: string;
  onRepsChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  useMetricUnits: boolean;
  onAddSet: () => void;
  requiresBodyWeight?: boolean;
  bodyWeight?: number;
}

export default function SetInput({ 
  reps, 
  weight, 
  onRepsChange, 
  onWeightChange, 
  useMetricUnits,
  onAddSet,
  requiresBodyWeight,
  bodyWeight
}: SetInputProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.title, { color: theme.text }]}>Log a New Set</Text>
      
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Reps
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
            onChangeText={onRepsChange}
            placeholder="0"
            placeholderTextColor={theme.textSecondary}
            keyboardType="number-pad"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Weight ({useMetricUnits ? "kg" : "lbs"})
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
            value={weight}
            onChangeText={onWeightChange}
            placeholder="0"
            placeholderTextColor={theme.textSecondary}
            keyboardType="decimal-pad"
          />
        </View>
      </View>
      
      {requiresBodyWeight && (
        <View style={styles.bodyWeightInfo}>
          <Text style={[styles.bodyWeightText, { color: theme.textSecondary }]}>
            Using body weight: {bodyWeight && bodyWeight > 0 ? bodyWeight : "Not set"} {useMetricUnits ? "kg" : "lbs"}
          </Text>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={onAddSet}
      >
        <Plus size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});