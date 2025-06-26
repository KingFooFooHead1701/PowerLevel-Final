// app/(tabs)/index.tsx

import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useTheme } from "@/hooks/use-theme"
import { useExerciseStore } from "@/hooks/use-exercise-store"
import ExerciseSummaryCard from "@/components/ExerciseSummaryCard"
import {
  getCurrentMilestone,
  getNextMilestone,
  getMilestoneProgress,
  getRemainingToNextMilestone,
} from "@/constants/milestones"
import { getPowerTierName } from "@/utils/milestone-utils"

export default function DashboardScreen() {
  const router = useRouter()
  const { theme } = useTheme()
  const { exercises, sets, getTotalJoules, isLoading } = useExerciseStore()
  const [totalJoules, setTotalJoules] = useState(0)

  useEffect(() => {
    setTotalJoules(getTotalJoules())
  }, [sets])

  const navigateToPowerLevel = () => {
    router.push("/power-level")
  }

  const exercisesWithSets = exercises.filter((ex) =>
    sets.some((s) => s.exerciseId === ex.id)
  )

  const currentMilestone = getCurrentMilestone(totalJoules)
  const nextMilestone = getNextMilestone(totalJoules)
  const progressPercent = getMilestoneProgress(totalJoules)
  const remainingToNext = getRemainingToNextMilestone(totalJoules)
  const powerTierName = getPowerTierName(totalJoules)

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* In-page title */}
        <Text style={[styles.pageTitle, { color: theme.text }]}>Power Level</Text>

        {/* Tier card */}
        <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Current Power Tier
          </Text>
          <Text style={[styles.value, { color: theme.secondary }]}>
            {powerTierName}
          </Text>

          {nextMilestone && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                <View
                  style={[
                    styles.progressFill,
                    { backgroundColor: theme.primary, width: `${progressPercent}%` },
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                {remainingToNext} to {nextMilestone.name}
              </Text>
            </View>
          )}
        </View>

        {/* “Give Me My Current Power Level” button */}
        <TouchableOpacity
          style={[styles.bigButton, { backgroundColor: theme.primary }]}
          onPress={navigateToPowerLevel}
        >
          <Text style={styles.bigButtonText}>Give Me My Current Power Level</Text>
        </TouchableOpacity>

        {/* Exercise list or empty state */}
        {exercisesWithSets.length > 0 ? (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Your Exercises
            </Text>
            {exercisesWithSets.map((ex) => (
              <ExerciseSummaryCard
                key={ex.id}
                exercise={ex}
                sets={sets.filter((s) => s.exerciseId === ex.id)}
                onPress={() => router.push(`/exercise/${ex.id}`)}
              />
            ))}
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No exercises logged yet. Start by adding a set in the Exercises tab.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1, padding: 16 },

  pageTitle: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },

  card: { padding: 20, borderRadius: 12, marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  value: { fontSize: 36, fontWeight: "bold", marginBottom: 16 },

  progressContainer: { marginBottom: 20 },
  progressBar: { height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 8 },
  progressFill: { height: "100%" },
  progressText: { fontSize: 14, textAlign: "right" },

  bigButton: {
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bigButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  sectionTitle: { fontSize: 20, fontWeight: "600", marginTop: 24, marginBottom: 12 },

  empty: { padding: 24, alignItems: "center" },
  emptyText: { fontSize: 16, textAlign: "center", lineHeight: 24 },
})
