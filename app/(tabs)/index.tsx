import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { formatEnergy } from "@/utils/energy-utils";
import { getPowerTierName, getNextPowerTier, checkMilestones } from "@/utils/milestone-utils";
import { Award, Dumbbell, Zap, ChevronRight } from "lucide-react-native";
import RecentDaysStrip from "@/components/RecentDaysStrip";

export default function DashboardScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, sets, getTotalJoules } = useExerciseStore();
  const { unlockedAchievements, getTotalPoints } = useAchievementStore();
  const [totalJoules, setTotalJoules] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Get the total joules
    const joules = getTotalJoules();
    setTotalJoules(joules);
    
    // Check achievements on dashboard load
    checkMilestones();
  }, [sets.length]);

  // Get unique dates with workout data
  const datesWithData = useExerciseStore().getUniqueDates();
  
  // Set the selected date to the most recent date if not already set
  useEffect(() => {
    if (datesWithData.length > 0 && !selectedDate) {
      setSelectedDate(datesWithData[0]);
    }
  }, [datesWithData, selectedDate]);

  const powerTierName = getPowerTierName(totalJoules);
  const nextTier = getNextPowerTier(totalJoules);
  const achievementCount = unlockedAchievements.length;
  const achievementPoints = getTotalPoints();
  const formattedEnergy = formatEnergy(totalJoules);

  const navigateToPowerLevel = () => {
    router.push("/power-level");
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
      </View>

      {/* Power Level Card */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.cardBackground }]}
        onPress={navigateToPowerLevel}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Zap size={20} color={theme.primary} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Power Level</Text>
        </View>
        
        <View style={styles.powerLevelContainer}>
          <Text style={[styles.powerTierName, { color: theme.primary }]}>
            {powerTierName}
          </Text>
          <Text style={[styles.energyText, { color: theme.textSecondary }]}>
            {formattedEnergy.full}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { backgroundColor: theme.backgroundSecondary }
            ]}
          >
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: theme.primary,
                  width: `${nextTier.progress * 100}%` 
                }
              ]}
            />
          </View>
          <Text style={[styles.nextTierText, { color: theme.textSecondary }]}>
            Next: {nextTier.name} ({formatEnergy(nextTier.threshold).abbreviated})
          </Text>
        </View>
      </TouchableOpacity>

      {/* Recent Activity */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
      </View>
      
      {datesWithData.length > 0 && (
        <RecentDaysStrip 
          selectedDate={selectedDate}
          datesWithData={datesWithData}
          onSelectDate={handleSelectDate}
          scrollToToday={true}
        />
      )}

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <TouchableOpacity 
          style={[styles.statCard, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push("/exercises")}
          activeOpacity={0.7}
        >
          <Dumbbell size={24} color={theme.primary} style={styles.statIcon} />
          <Text style={[styles.statValue, { color: theme.text }]}>{exercises.length}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Exercises</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statCard, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push("/achievements")}
          activeOpacity={0.7}
        >
          <Award size={24} color={theme.primary} style={styles.statIcon} />
          <Text style={[styles.statValue, { color: theme.text }]}>{achievementCount}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Achievements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statCard, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push("/achievements")}
          activeOpacity={0.7}
        >
          <Text style={[styles.pointsValue, { color: theme.primary }]}>{achievementPoints}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Points</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
      </View>
      
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push("/exercises")}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: theme.text }]}>Start Workout</Text>
          <ChevronRight size={16} color={theme.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push("/summary")}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: theme.text }]}>View Summary</Text>
          <ChevronRight size={16} color={theme.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push("/custom-exercise")}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: theme.text }]}>Add Custom Exercise</Text>
          <ChevronRight size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  powerLevelContainer: {
    marginBottom: 12,
  },
  powerTierName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  energyText: {
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 8,
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
  nextTierText: {
    fontSize: 12,
    textAlign: "right",
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  quickActionsContainer: {
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});