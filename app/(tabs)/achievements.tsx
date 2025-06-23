// app/(tabs)/achievements.tsx

import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { achievements, Achievement } from "@/constants/achievements";
import { useAchievementStore } from "@/hooks/use-achievement-store";

export default function AchievementsScreen() {
  const { theme } = useTheme();
  const { unlockedIds, evaluateAchievements } = useAchievementStore();

  // Keep track of which IDs were unlocked *this* mount
  const prevUnlockedRef = useRef<string[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  useEffect(() => {
    // snapshot before evaluation
    prevUnlockedRef.current = [...unlockedIds];

    // run unlock logic
    evaluateAchievements();

    // after a tick, compare
    const after = useAchievementStore.getState().unlockedIds;
    const newIds = after.filter(id => !prevUnlockedRef.current.includes(id));
    setNewlyUnlocked(newIds);
  }, [evaluateAchievements]);

  const unlocked = achievements.filter(a => unlockedIds.includes(a.id));
  const locked   = achievements.filter(a => !unlockedIds.includes(a.id));

  const renderItem = (item: Achievement, isLocked: boolean) => (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.cardBackground, opacity: isLocked ? 0.4 : 1 },
      ]}
    >
      <View style={styles.titleRow}>
        <Text
          style={[
            styles.title,
            { color: isLocked ? theme.textSecondary : theme.text },
          ]}
        >
          {item.title}
        </Text>
        {/* show NEW badge if this was unlocked on mount */}
        {!isLocked && newlyUnlocked.includes(item.id) && (
          <View style={[styles.badge, { backgroundColor: theme.primary }]}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
      </View>
      <Text style={[styles.desc, { color: theme.textSecondary }]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Achievements</Text>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Unlocked</Text>
      <FlatList
        data={unlocked}
        keyExtractor={a => a.id}
        renderItem={({ item }) => renderItem(item, false)}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textSecondary }]}>
            No achievements yet.
          </Text>
        }
      />

      <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>
        Locked
      </Text>
      <FlatList
        data={locked}
        keyExtractor={a => a.id}
        renderItem={({ item }) => renderItem(item, true)}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textSecondary }]}>
            All caught up!
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 8,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  desc: {
    fontSize: 14,
    lineHeight: 20,
  },
  empty: {
    textAlign: "center",
    marginVertical: 16,
  },
});
