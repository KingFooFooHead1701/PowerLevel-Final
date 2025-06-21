import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { useSettingsStore } from '@/hooks/use-settings-store';
import { useTheme } from '@/hooks/use-theme';
import { themes, ThemeName } from '@/constants/themes';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResetDataButton from '@/components/ResetDataButton';
import { Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const {
    useMetricUnits,
    usePseudoJoules,
    bodyWeight,
    toggleUseMetricUnits,
    toggleUsePseudoJoules,
    setBodyWeight
  } = useSettingsStore();
  const { theme, themeName, setThemeName } = useTheme();
  const [weightInput, setWeightInput] = useState(bodyWeight ? bodyWeight.toString() : '');

  const handleWeightChange = (text: string) => {
    setWeightInput(text);
    const weight = parseFloat(text);
    if (!isNaN(weight) && weight > 0) {
      setBodyWeight(weight);
    }
  };

  const showThemeInfo = () => {
    Alert.alert(
      'About Themes',
      'Themes affect the visual appearance of the app. Choose a theme that matches your style and preferences.',
      [{ text: 'OK' }]
    );
  };

  const showUnitsInfo = () => {
    Alert.alert(
      'About Units',
      'Metric units use kilograms and kilometers. Imperial units use pounds and miles.',
      [{ text: 'OK' }]
    );
  };

  const showPseudoJoulesInfo = () => {
    Alert.alert(
      'About Pseudo-Joules',
      'Pseudo-joules are a simplified calculation that ignores some physics complexities to make energy values more intuitive for workout tracking.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Settings' }} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Units & Calculations */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Units & Calculations</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Use Metric Units</Text>
              <TouchableOpacity onPress={showUnitsInfo} style={styles.infoButton}>
                <Info size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <Switch
              value={useMetricUnits}
              onValueChange={toggleUseMetricUnits}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor={Platform.OS === 'ios' ? undefined : theme.switchThumb}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Use Pseudo-Joules</Text>
              <TouchableOpacity onPress={showPseudoJoulesInfo} style={styles.infoButton}>
                <Info size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            <Switch
              value={usePseudoJoules}
              onValueChange={toggleUsePseudoJoules}
              trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
              thumbColor={Platform.OS === 'ios' ? undefined : theme.switchThumb}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Body Weight</Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                value={weightInput}
                onChangeText={handleWeightChange}
                keyboardType="numeric"
                placeholder={useMetricUnits ? 'kg' : 'lbs'}
                placeholderTextColor={theme.textSecondary}
              />
              <Text style={[styles.inputUnit, { color: theme.textSecondary }]}>
                {useMetricUnits ? 'kg' : 'lbs'}
              </Text>
            </View>
          </View>
        </View>

        {/* Appearance / Themes */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
            <TouchableOpacity onPress={showThemeInfo} style={styles.infoButton}>
              <Info size={16} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.themeGrid}>
            {(Object.keys(themes) as ThemeName[]).map((name) => {
              // split camelCase into words
              const words = name.match(/[A-Z]?[a-z]+|[0-9]+/g) || [name];
              const labelText = words.join('\n');

              return (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.themeItem,
                    { backgroundColor: themes[name].cardBackground },
                    themeName === name && styles.selectedTheme,
                    themeName === name && { borderColor: themes[name].primary }
                  ]}
                  onPress={() => setThemeName(name)}
                >
                  <View style={[styles.themeColorPreview, { backgroundColor: themes[name].primary }]} />
                  <Text
                    style={[
                      styles.themeName,
                      { color: themes[name].text },
                      themeName === name && { fontWeight: '700' }
                    ]}
                    numberOfLines={2}
                  >
                    {labelText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Data Management */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Data Management</Text>
          </View>
          <ResetDataButton />
          <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>
            Warning: Resetting data will permanently delete all your exercises, sets, and settings.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Power Level v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  section: { borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150,150,150,0.2)'
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', flex: 1 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150,150,150,0.1)'
  },
  settingLabelContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingLabel: { fontSize: 16 },
  infoButton: { marginLeft: 8, padding: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 100
  },
  input: { flex: 1, height: 40, fontSize: 16 },
  inputUnit: { marginLeft: 4, fontSize: 16 },

  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12 },
  themeItem: {
    width: '30%',
    marginHorizontal: '1.5%',
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  selectedTheme: { borderWidth: 2 },
  themeColorPreview: { width: 24, height: 24, borderRadius: 12, marginBottom: 8 },

  themeName: {
    fontSize: 12,
    textAlign: 'center',  // center each of the two lines
    lineHeight: 16        // adjust as needed
  },

  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontStyle: 'italic'
  },
  footer: { alignItems: 'center', marginTop: 8, marginBottom: 24 },
  footerText: { fontSize: 14 }
});
