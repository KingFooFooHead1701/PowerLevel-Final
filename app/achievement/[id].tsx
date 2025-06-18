import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { getAchievementById, formatAchievement } from "@/constants/achievements";
import { Award, ArrowLeft } from "lucide-react-native";

export default function AchievementDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { 
    isAchievementUnlocked, 
    getAchievementProgress,
    markAchievementViewed
  } = useAchievementStore();
  
  // Get achievement details
  const achievement = getAchievementById(id as string);
  
  if (!achievement) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ title: "Achievement Not Found" }} />
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: theme.textSecondary }]}>
            Achievement not found
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Check if unlocked
  const isUnlocked = isAchievementUnlocked(achievement.id);
  
  // Format name and description
  const { name, description } = formatAchievement(achievement, isUnlocked);
  
  // Get progress if not unlocked
  const progress = !isUnlocked ? getAchievementProgress(achievement.id) : undefined;
  const progressPercentage = progress 
    ? Math.min(Math.round((progress.progress / progress.total) * 100), 100)
    : 0;
  
  // Mark as viewed if unlocked and not viewed
  React.useEffect(() => {
    if (isUnlocked) {
      markAchievementViewed(achievement.id);
    }
  }, [isUnlocked, achievement.id]);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: "Achievement Details" }} />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.achievementCard, { backgroundColor: theme.cardBackground }]}>
          <View style={[
            styles.iconContainer,
            { 
              backgroundColor: isUnlocked ? theme.primary + "20" : theme.backgroundSecondary,
              borderColor: isUnlocked ? theme.primary : theme.border
            }
          ]}>
            <Award 
              size={64} 
              color={isUnlocked ? theme.primary : theme.textSecondary} 
            />
          </View>
          
          <Text style={[
            styles.achievementName,
            { color: isUnlocked ? theme.text : theme.textSecondary }
          ]}>
            {name}
          </Text>
          
          <Text style={[
            styles.achievementDescription,
            { color: theme.textSecondary }
          ]}>
            {description}
          </Text>
          
          {progress && (
            <View style={styles.progressSection}>
              <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
                Progress: {progress.progress}/{progress.total}
              </Text>
              
              <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: theme.primary,
                      width: `${progressPercentage}%` 
                    }
                  ]} 
                />
              </View>
              
              <Text style={[styles.progressPercentage, { color: theme.textSecondary }]}>
                {progressPercentage}% Complete
              </Text>
            </View>
          )}
          
          <View style={styles.pointsContainer}>
            <Text style={[styles.pointsLabel, { color: theme.textSecondary }]}>
              Achievement Points:
            </Text>
            <Text style={[
              styles.pointsValue,
              { color: isUnlocked ? theme.primary : theme.textSecondary }
            ]}>
              {achievement.points}
            </Text>
          </View>
          
          {isUnlocked && (
            <View style={styles.unlockedInfo}>
              <Text style={[styles.unlockedText, { color: theme.primary }]}>
                Achievement Unlocked!
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.primary }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#fff" style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to Achievements</Text>
        </TouchableOpacity>
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
  },
  scrollContent: {
    padding: 16,
    alignItems: "center",
  },
  achievementCard: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
  },
  achievementName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  achievementDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  progressSection: {
    width: "100%",
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    width: "100%",
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    textAlign: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  unlockedInfo: {
    marginTop: 16,
  },
  unlockedText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  backIcon: {
    marginRight: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
  },
});