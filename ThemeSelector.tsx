// components/ThemeSelector.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { themes as themeList } from "@/constants/themes";

export default function ThemeSelector() {
  const { theme, themeName, setThemeName } = useTheme();
  const incrementThemeChangeCount = useSettingsStore(s => s.incrementThemeChangeCount);
  const incrementThemeUniqueCount = useSettingsStore(s => s.incrementThemeUniqueCount);

  const selectTheme = (name: string) => {
    if (name === themeName) return;
    setThemeName(name);
    incrementThemeChangeCount();      // total switches
    incrementThemeUniqueCount(name);  // unique picks
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: theme.text }]}>
        Pick a Color Theme
      </Text>
      <ScrollView contentContainerStyle={styles.list}>
        {Object.keys(themeList).map(name => (
          <TouchableOpacity
            key={name}
            style={[
              styles.item,
              {
                backgroundColor:
                  themeName === name ? theme.primary + "20" : theme.cardBackground,
                borderColor: themeName === name ? theme.primary : theme.border,
              },
            ]}
            onPress={() => selectTheme(name)}
          >
            <Text
              style={[
                styles.itemText,
                { color: themeName === name ? theme.primary : theme.text },
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  header: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  list: { flexDirection: "row", flexWrap: "wrap" },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  itemText: { fontSize: 14 },
});
