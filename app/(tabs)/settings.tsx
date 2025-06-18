import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useAchievementStore, checkAchievements } from "@/hooks/use-achievement-store";
import { themes, ThemeName } from "@/constants/themes";
import ResetDataButton from "@/components/ResetDataButton";
import { Stack } from "expo-router";

export default function SettingsScreen() {
  const { theme, themeName, setThemeName } = useTheme();
  const { 
    useMetricUnits, 
    toggleUseMetricUnits, 
    usePseudoJoules, 
    toggleUsePseudoJoules,
    bodyWeight,
    setBodyWeight,
    soundEnabled,
    toggleSound
  } = useSettingsStore();
  const { setLastUnitSetting } = useAchievementStore();
  
  const [weightInput, setWeightInput] = useState(bodyWeight > 0 ? bodyWeight.toString() : "");

  const handleSaveBodyWeight = () => {
    const weight = parseFloat(weightInput);
    if (isNaN(weight) || weight <= 0) {
      Alert.alert("Invalid Weight", "Please enter a valid body weight greater than 0.");
      return;
    }
    setBodyWeight(weight);
    Alert.alert("Success", "Body weight saved successfully.");
  };

  const handleToggleUnits = () => {
    // Store current setting before toggling
    setLastUnitSetting(useMetricUnits);
    toggleUseMetricUnits();
    
    // Check for achievement
    checkAchievements();
  };
  
  const handleToggleSound = () => {
    toggleSound();
    
    // Check for achievement
    checkAchievements();
  };

  // Format theme name with spaces
  const formatThemeName = (name: string) => {
    // Insert a space before each capital letter
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  const renderThemeOptions = () => {
    const themeNames = Object.keys(themes) as ThemeName[];
    
    return (
      <View style={styles.themeContainer}>
        {themeNames.map((name) => {
          // Get the actual theme colors for accurate representation
          const themeColors = themes[name];
          
          return (
            <TouchableOpacity
              key={name}
              style={[
                styles.themeOption,
                {
                  backgroundColor: themeColors.cardBackground,
                  borderColor: themeName === name ? themeColors.primary : theme.border,
                  borderWidth: themeName === name ? 3 : 1,
                },
              ]}
              onPress={() => setThemeName(name)}
            >
              {/* Primary color circle */}
              <View style={[
                styles.themeColorCircle, 
                { 
                  backgroundColor: themeColors.primary,
                  borderColor: "rgba(255,255,255,0.3)" 
                }
              ]} />
              
              {/* Secondary color circle */}
              <View style={[
                styles.themeColorCircle, 
                { 
                  backgroundColor: themeColors.secondary, 
                  marginTop: 4,
                  borderColor: "rgba(255,255,255,0.3)" 
                }
              ]} />
              
              <Text style={[
                styles.themeText, 
                { 
                  color: themeColors.text,
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }
              ]}>
                {formatThemeName(name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: "Settings" }} />
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Units</Text>
        
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            Use Metric Units (kg, km)
          </Text>
          <Switch
            value={useMetricUnits}
            onValueChange={handleToggleUnits}
            trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
          Switch between metric (kg, km) and imperial (lbs, miles) units.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Body Weight</Text>
        
        <View style={styles.bodyWeightContainer}>
          <TextInput
            style={[
              styles.bodyWeightInput,
              {
                backgroundColor: theme.inputBackground,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={weightInput}
            onChangeText={setWeightInput}
            placeholder={`Enter your weight in ${useMetricUnits ? "kg" : "lbs"}`}
            placeholderTextColor={theme.textSecondary}
            keyboardType="decimal-pad"
          />
          
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.primary }]}
            onPress={handleSaveBodyWeight}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
          Your body weight is used for certain exercises and calculations.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Energy Calculation</Text>
        
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            Use Simplified Joules
          </Text>
          <Switch
            value={usePseudoJoules}
            onValueChange={toggleUsePseudoJoules}
            trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
          Simplified joules use a more generous calculation that results in higher energy values.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Sound</Text>
        
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: theme.text }]}>
            Enable Sound Effects
          </Text>
          <Switch
            value={soundEnabled}
            onValueChange={handleToggleSound}
            trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
            thumbColor="#fff"
          />
        </View>
        
        <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
          Toggle sound effects for achievements and milestones.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Theme</Text>
        {renderThemeOptions()}
        <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
          Choose your preferred app theme.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Data Management</Text>
        <ResetDataButton />
      </View>
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: theme.textSecondary }]}>
          Power Level v1.0.3
        </Text>
        <Text style={[styles.aboutText, { color: theme.textSecondary }]}>
          Track your workouts and watch your power level grow!
        </Text>
      </View>
      
      {/* Add extra space at bottom for iOS */}
      {Platform.OS === "ios" && <View style={{ height: 50 }} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A3A",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  bodyWeightContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bodyWeightInput: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 8,
  },
  saveButton: {
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  themeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly", // Better spacing between theme boxes
    marginBottom: 16,
    paddingHorizontal: 8, // Add padding to center the grid better
  },
  themeOption: {
    width: 95, // Slightly wider to accommodate spaced names
    height: 105, // Taller to fit two color circles
    margin: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  themeColorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  themeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 8,
  },
});