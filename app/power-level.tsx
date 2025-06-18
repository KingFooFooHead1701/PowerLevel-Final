import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { formatEnergy } from "@/utils/energy-utils";
import { getPowerTierName, getNextPowerTier } from "@/utils/milestone-utils";
import { milestones } from "@/constants/milestones";
import { Zap, ChevronRight } from "lucide-react-native";

export default function PowerLevelScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getTotalJoules } = useExerciseStore();
  const [totalJoules, setTotalJoules] = useState(0);

  useEffect(() => {
    setTotalJoules(getTotalJoules());
  }, []);

  const powerTierName = getPowerTierName(totalJoules);
  const nextTier = getNextPowerTier(totalJoules);
  const formattedEnergy = formatEnergy(totalJoules);
  
  // Filter milestones that are relevant to the user's progress
  const relevantMilestones = milestones
    .filter(milestone => milestone.threshold_j <= nextTier.threshold * 2)
    .sort((a, b) => b.threshold_j - a.threshold_j);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Power Level</Text>
      </View>

      {/* Current Power Level */}
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
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
      </View>

      {/* Power Tiers Explanation */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About Power Levels</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.explanationText, { color: theme.text }]}>
          Your power level is calculated based on the total energy you've generated during your workouts. 
          Energy is measured in joules and is calculated from the weight lifted and repetitions performed.
        </Text>
        <Text style={[styles.explanationText, { color: theme.text, marginTop: 12 }]}>
          As you continue to work out, your power level will increase, unlocking new tiers and achievements.
        </Text>
      </View>

      {/* Milestones */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Energy Milestones</Text>
      </View>
      
      {relevantMilestones.map((milestone) => {
        const isCompleted = totalJoules >= milestone.threshold_j;
        
        return (
          <TouchableOpacity
            key={milestone.id}
            style={[
              styles.milestoneCard, 
              { 
                backgroundColor: theme.cardBackground,
                opacity: isCompleted ? 1 : 0.7
              }
            ]}
            onPress={() => router.push("/milestone?id=" + milestone.id)}
            activeOpacity={0.7}
          >
            <View style={styles.milestoneHeader}>
              <View style={styles.milestoneIconContainer}>
                <Zap 
                  size={20} 
                  color={isCompleted ? milestone.color : theme.textSecondary} 
                />
              </View>
              <View style={styles.milestoneInfo}>
                <Text 
                  style={[
                    styles.milestoneName, 
                    { 
                      color: isCompleted ? theme.text : theme.textSecondary,
                      fontWeight: isCompleted ? "600" : "400"
                    }
                  ]}
                >
                  {milestone.name}
                </Text>
                <Text style={[styles.milestoneThreshold, { color: theme.textSecondary }]}>
                  {formatEnergy(milestone.threshold_j).full}
                </Text>
              </View>
              <ChevronRight size={16} color={theme.textSecondary} />
            </View>
            
            {isCompleted && (
              <View 
                style={[
                  styles.completedBadge, 
                  { backgroundColor: theme.primary }
                ]}
              >
                <Text style={styles.completedText}>Completed</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
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
  powerLevelContainer: {
    marginBottom: 12,
  },
  powerTierName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  energyText: {
    fontSize: 16,
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
    fontSize: 14,
    textAlign: "right",
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  milestoneCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  milestoneHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  milestoneIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneName: {
    fontSize: 16,
    marginBottom: 2,
  },
  milestoneThreshold: {
    fontSize: 14,
  },
  completedBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  completedText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});