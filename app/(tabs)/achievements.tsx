import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { Award } from "lucide-react-native";

export default function AchievementsTab() {
  const router = useRouter();
  const { theme } = useTheme();
  
  const navigateToAchievements = () => {
    // Navigate to the achievements screen (not the tab)
    router.push("/achievements");
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Award size={64} color={theme.primary} style={styles.icon} />
        <Text style={[styles.title, { color: theme.text }]}>Achievements</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Track your workout milestones and unlock special rewards
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={navigateToAchievements}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>View Achievements</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});