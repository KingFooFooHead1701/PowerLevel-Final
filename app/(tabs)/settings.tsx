import React from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { themes, ThemeName } from "@/constants/themes";
import { Palette, Weight } from "lucide-react-native";

export default function SettingsScreen() {
  const { theme, setThemeName, themeName } = useTheme();
  const { 
    useMetricUnits, 
    toggleUseMetricUnits,
    usePseudoJoules,
    toggleUsePseudoJoules,
    bodyWeight,
    setBodyWeight
  } = useSettingsStore();

  const handleBodyWeightChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setBodyWeight(numValue);
    } else if (value === "") {
      setBodyWeight(0);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
        
        <View style={[styles.section, { borderBottomColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Units</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Use Metric Units (kg)
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Switch between pounds (lbs) and kilograms (kg)
              </Text>
            </View>
            <Switch
              value={useMetricUnits}
              onValueChange={toggleUseMetricUnits}
              trackColor={{ false: "#767577", true: theme.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        <View style={[styles.section, { borderBottomColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Body Information</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Body Weight ({useMetricUnits ? "kg" : "lbs"})
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Required for body weight exercises and accurate energy calculations
              </Text>
            </View>
            <View style={styles.weightInputContainer}>
              <TextInput
                style={[
                  styles.weightInput,
                  { 
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: theme.border
                  }
                ]}
                value={bodyWeight > 0 ? bodyWeight.toString() : ""}
                onChangeText={handleBodyWeightChange}
                placeholder="???"
                placeholderTextColor={theme.textSecondary}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.weightUnit, { color: theme.textSecondary }]}>
                {useMetricUnits ? "kg" : "lbs"}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { borderBottomColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Energy Calculation</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Use Simplified Joules
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Ignore displacement for simplified energy calculation
              </Text>
            </View>
            <Switch
              value={usePseudoJoules}
              onValueChange={toggleUsePseudoJoules}
              trackColor={{ false: "#767577", true: theme.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Themes</Text>
          <Text style={[styles.settingDescription, { color: theme.textSecondary, marginBottom: 16 }]}>
            Choose your preferred color theme
          </Text>
          
          <View style={styles.themesGrid}>
            {Object.entries(themes).map(([name, themeColors]) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.themeItem,
                  { borderColor: theme.border },
                  name === themeName && { borderColor: theme.primary, borderWidth: 2 }
                ]}
                onPress={() => setThemeName(name as ThemeName)}
              >
                <View style={[styles.themeColorPreview, { backgroundColor: themeColors.primary }]}>
                  <View style={[styles.themeColorSecondary, { backgroundColor: themeColors.secondary }]} />
                </View>
                <Text 
                  style={[
                    styles.themeLabel, 
                    { color: theme.text },
                    name === themeName && { color: theme.primary }
                  ]}
                >
                  {name.split(/(?=[A-Z])/).join(" ")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Palette size={24} color={theme.textSecondary} style={styles.aboutIcon} />
          <Text style={[styles.appVersion, { color: theme.textSecondary }]}>
            Power Level v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  weightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  weightInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  weightUnit: {
    marginLeft: 8,
    fontSize: 16,
  },
  themesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  themeItem: {
    width: "48%",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  themeColorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  themeColorSecondary: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  themeLabel: {
    fontSize: 14,
    textAlign: "center",
  },
  aboutSection: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  aboutIcon: {
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
  },
});