// app/(tabs)/settings.tsx

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
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Constants from "expo-constants";
import { useTheme } from "@/hooks/use-theme";
import { useSettingsStore } from "@/hooks/use-settings-store";
import ResetDataButton from "@/components/ResetDataButton";
import ThemePickerModal from "@/components/ThemePickerModal";
import { findThemeCollection } from "@/constants/theme-collections";
import { Info, Palette } from "lucide-react-native";

export default function SettingsScreen() {
  const {
    useMetricUnits,
    usePseudoJoules,
    bodyWeight,
    toggleUseMetricUnits,
    toggleUsePseudoJoules,
    setBodyWeight,
  } = useSettingsStore();
  const { theme, themeName } = useTheme();
  const [weightInput, setWeightInput] = useState(
    bodyWeight ? bodyWeight.toString() : ""
  );
  const [themePickerVisible, setThemePickerVisible] = useState(false);
  const activeThemeCollection = findThemeCollection(themeName);
  const formattedThemeName = (
    themeName.match(/[A-Z]?[a-z]+|[0-9]+/g) || [themeName]
  ).join(" ");

  const handleWeightChange = (text: string) => {
    setWeightInput(text);
    const weight = parseFloat(text);
    if (!isNaN(weight) && weight > 0) {
      setBodyWeight(weight);
    }
  };

  const showThemeInfo = () =>
    Alert.alert(
      "About Themes",
      "Themes affect the visual appearance of the app. Choose a theme that matches your style and preferences.",
      [{ text: "OK" }]
    );

  const showUnitsInfo = () =>
    Alert.alert(
      "About Units",
      "Metric units use kilograms and kilometers. Imperial units use pounds and miles.",
      [{ text: "OK" }]
    );

  const showPseudoJoulesInfo = () =>
    Alert.alert(
      "About Pseudo-Joules",
      "Pseudo-joules are a simplified calculation that ignores some physics complexities to make energy values more intuitive for workout tracking.",
      [{ text: "OK" }]
    );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["bottom"]}
    >
      {/* navigation header title in case you keep it */}
      <Stack.Screen options={{ title: "Settings" }} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---- In-content page title ---- */}
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          Settings & Appearance
        </Text>

        {/* Units & Calculations */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text
              style={[styles.sectionTitle, { color: theme.text }]}
            >
              Units & Calculations
            </Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Text
                style={[styles.settingLabel, { color: theme.text }]}
              >
                Use Metric Units
              </Text>
              <TouchableOpacity
                onPress={showUnitsInfo}
                style={styles.infoButton}
              >
                <Info size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <Switch
              value={useMetricUnits}
              onValueChange={toggleUseMetricUnits}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor={Platform.OS === "ios" ? undefined : theme.switchThumb}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Text
                style={[styles.settingLabel, { color: theme.text }]}
              >
                Use Pseudo-Joules
              </Text>
              <TouchableOpacity
                onPress={showPseudoJoulesInfo}
                style={styles.infoButton}
              >
                <Info size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <Switch
              value={usePseudoJoules}
              onValueChange={toggleUsePseudoJoules}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor={Platform.OS === "ios" ? undefined : theme.switchThumb}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>
              Body Weight
            </Text>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: theme.inputBackground },
              ]}
            >
              <TextInput
                style={[styles.input, { color: theme.text, textAlign: "right" }]}
                value={weightInput}
                onChangeText={handleWeightChange}
                keyboardType="numeric"
                placeholder="Enter Weight"
                placeholderTextColor={theme.textSecondary}
              />
              <Text
                style={[styles.inputUnit, { color: theme.textSecondary }]}
              >
                {useMetricUnits ? "kg" : "lbs"}
              </Text>
            </View>
          </View>
        </View>

        {/* Appearance / Themes */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Appearance
            </Text>
            <TouchableOpacity onPress={showThemeInfo} style={styles.infoButton}>
              <Info size={16} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.currentThemeRow}>
            <View
              style={[
                styles.currentThemePreview,
                { backgroundColor: theme.secondary },
              ]}
            >
              <View
                style={[
                  styles.currentThemePreviewInner,
                  { backgroundColor: theme.primary },
                ]}
              />
            </View>
            <View style={styles.currentThemeText}>
              <Text
                style={[styles.currentThemeLabel, { color: theme.textSecondary }]}
              >
                Current Theme
              </Text>
              <Text style={[styles.currentThemeName, { color: theme.text }]}>
                {formattedThemeName}
              </Text>
              <Text
                style={[
                  styles.currentCollectionName,
                  { color: theme.textSecondary },
                ]}
              >
                {activeThemeCollection?.label ?? "Theme Collection"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.browseThemesButton,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => setThemePickerVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Browse theme collections"
          >
            <Palette size={21} color={theme.primary} />
            <View style={styles.browseThemesText}>
              <Text style={[styles.browseThemesTitle, { color: theme.text }]}>
                Browse Theme Collections
              </Text>
              <Text
                style={[
                  styles.browseThemesDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Opens a full-screen theme picker
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Data Management */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Data Management
            </Text>
          </View>
          <ResetDataButton />
          <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>
            Warning: Resetting data will permanently delete all your exercises,
            sets, and settings.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Power Level v{Constants.expoConfig?.version ?? "1.1.0"}
          </Text>
        </View>
      </ScrollView>

      <ThemePickerModal
        visible={themePickerVisible}
        onClose={() => setThemePickerVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },

  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 45,    // ← push it down a bit
    marginBottom: 24,
  },


  section: { borderRadius: 12, marginBottom: 16, overflow: "hidden" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(150,150,150,0.2)",
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", flex: 1 },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(150,150,150,0.1)",
  },
  settingLabelContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  settingLabel: { fontSize: 16 },
  infoButton: { marginLeft: 8, padding: 4 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 160,
  },
  input: { flex: 1, height: 40, fontSize: 16 },
  inputUnit: { marginLeft: 4, fontSize: 16 },

  currentThemeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  currentThemePreview: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  currentThemePreviewInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  currentThemeText: {
    flex: 1,
    marginLeft: 14,
  },
  currentThemeLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  currentThemeName: {
    fontSize: 17,
    fontWeight: "700",
  },
  currentCollectionName: {
    fontSize: 13,
    marginTop: 2,
  },
  browseThemesButton: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    margin: 16,
  },
  browseThemesText: {
    flex: 1,
    marginLeft: 12,
  },
  browseThemesTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  browseThemesDescription: {
    fontSize: 12,
    marginTop: 3,
  },

  disclaimer: {
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontStyle: "italic",
  },
  footer: { alignItems: "center", marginTop: 8, marginBottom: 24 },
  footerText: { fontSize: 14 },
});
