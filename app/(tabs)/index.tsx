import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { formatEnergy } from "@/utils/energy-utils";
import { Zap, Award } from "lucide-react-native";
import ExerciseSummaryCard from "@/components/ExerciseSummaryCard";
import { 
  getCurrentMilestone, 
  getNextMilestone, 
  getMilestoneProgress, 
  getRemainingToNextMilestone 
} from "@/constants/milestones";
import { getPowerTierName } from "@/utils/milestone-utils";
import { useAchievementStore, checkAchievements } from "@/hooks/use-achievement-store";

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, sets, getTotalJoules, isLoading } = useExerciseStore();
  const { unlockedAchievements, getTotalPoints } = useAchievementStore();
  const [totalJoules, setTotalJoules] = useState(0);
  
  useEffect(() => {
    setTotalJoules(getTotalJoules());
    
    // Check achievements on dashboard load
    checkAchievements();
  }, [sets]);

  const navigateToPowerLevel = () => {
    router.push("/power-level");
  };
  
  const navigateToAchievements = () => {
    router.push("/achievements");
  };

  const exercisesWithSets = exercises.filter(exercise => 
    sets.some(set => set.exerciseId === exercise.id)
  );

  // Get milestone information
  const currentMilestone = getCurrentMilestone(totalJoules);
  const nextMilestone = getNextMilestone(totalJoules);
  const progressPercent = getMilestoneProgress(totalJoules);
  const remainingToNext = getRemainingToNextMilestone(totalJoules);
  const powerTierName = getPowerTierName(totalJoules);
  
  // Get achievement stats
  const achievementCount = unlockedAchievements.length;
  const totalAchievementPoints = getTotalPoints();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Power Level</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Track your workout energy
          </Text>
        </View>

        {/* Power Tier Card */}
        <View style={[styles.powerTierCard, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.powerTierLabel, { color: theme.textSecondary }]}>
            Current Power Tier
          </Text>
          <Text style={[styles.powerTierValue, { color: theme.text }]}>
            {powerTierName}
          </Text>
          
          {nextMilestone && (
            <>
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { backgroundColor: theme.border }
                  ]}
                >
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: theme.primary,
                        width: `${progressPercent}%` 
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                  {remainingToNext} to {nextMilestone.name}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.powerLevelButton, { backgroundColor: theme.primary }]}
                onPress={navigateToPowerLevel}
              >
                <Zap size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Show My Current Power Level</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        
        {/* Achievements Card */}
        <View style={[styles.achievementsCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.achievementsHeader}>
            <View>
              <Text style={[styles.achievementsTitle, { color: theme.text }]}>
                Achievements
              </Text>
              <Text style={[styles.achievementsSubtitle, { color: theme.textSecondary }]}>
                {achievementCount} unlocked • {totalAchievementPoints} points
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.achievementIconContainer, { backgroundColor: theme.primary + "20" }]}
              onPress={navigateToAchievements}
            >
              <Award size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[styles.achievementsButton, { borderColor: theme.border }]}
            onPress={navigateToAchievements}
          >
            <Text style={[styles.achievementsButtonText, { color: theme.primary }]}>
              View All Achievements
            </Text>
          </TouchableOpacity>
        </View>

        {exercisesWithSets.length > 0 ? (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Exercises</Text>
            {exercisesWithSets.map(exercise => (
              <ExerciseSummaryCard 
                key={exercise.id} 
                exercise={exercise} 
                sets={sets.filter(set => set.exerciseId === exercise.id)}
                onPress={() => router.push(`/exercise/${exercise.id}`)}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              No exercises logged yet. Start by adding a set in the Exercises tab.
            </Text>
          </View>
        )}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  powerTierCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  powerTierLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  powerTierValue: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: "right",
  },
  powerLevelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  achievementsCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  achievementsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  achievementsSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementsButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  achievementsButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});