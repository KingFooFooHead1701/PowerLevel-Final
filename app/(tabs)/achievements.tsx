import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { useAchievementStore, checkAchievements } from "@/hooks/use-achievement-store";
import { 
  achievements, 
  Achievement, 
  AchievementCategory, 
  formatAchievement
} from "@/constants/achievements";
import { 
  Award, 
  Lock,
  ChevronRight
} from "lucide-react-native";

export default function AchievementsTab() {
  const router = useRouter();
  const { theme } = useTheme();
  const { 
    unlockedAchievements, 
    isAchievementUnlocked,
    getAchievementProgress,
    getTotalPoints
  } = useAchievementStore();
  
  // Run achievement check on screen load
  useEffect(() => {
    checkAchievements();
  }, []);
  
  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);
  const totalPoints = getTotalPoints();
  
  // Render achievement item
  const renderAchievement = ({ item }: { item: Achievement }) => {
    const isUnlocked = isAchievementUnlocked(item.id);
    
    // For locked achievements, especially hidden ones, show placeholder
    if (!isUnlocked && (item.category === "hidden" || item.hidden)) {
      return (
        <View
          style={[
            styles.achievementItem,
            { backgroundColor: theme.cardBackground }
          ]}
        >
          <View style={[
            styles.achievementIcon,
            { 
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border
            }
          ]}>
            <Lock size={24} color={theme.textSecondary} />
          </View>
          
          <View style={styles.achievementContent}>
            <Text style={[styles.achievementName, { color: theme.textSecondary }]}>
              ??? Secret Achievement ???
            </Text>
            
            <Text style={[styles.achievementDescription, { color: theme.textSecondary }]}>
              Keep working out to discover this achievement
            </Text>
          </View>
          
          <View style={styles.achievementPoints}>
            <Text style={[styles.pointsText, { color: theme.textSecondary }]}>
              ? pts
            </Text>
          </View>
        </View>
      );
    }
    
    // For unlocked or visible achievements
    const { name, description } = formatAchievement(item, isUnlocked);
    
    // Get progress if not unlocked
    const progress = !isUnlocked ? getAchievementProgress(item.id) : undefined;
    const progressPercentage = progress 
      ? Math.min(Math.round((progress.progress / progress.total) * 100), 100)
      : 0;
    
    return (
      <TouchableOpacity
        style={[
          styles.achievementItem,
          { backgroundColor: theme.cardBackground }
        ]}
        onPress={() => {
          if (isUnlocked && item.category === "hidden") {
            router.push(`/hidden-achievement?id=${item.id}`);
          } else if (isUnlocked) {
            router.push(`/achievement/${item.id}`);
          }
        }}
        disabled={!isUnlocked}
      >
        <View style={[
          styles.achievementIcon,
          { 
            backgroundColor: isUnlocked ? theme.primary + "20" : theme.backgroundSecondary,
            borderColor: isUnlocked ? theme.primary : theme.border
          }
        ]}>
          {isUnlocked ? (
            <Award size={24} color={theme.primary} />
          ) : (
            <Lock size={24} color={theme.textSecondary} />
          )}
        </View>
        
        <View style={styles.achievementContent}>
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
            <View style={styles.progressContainer}>
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
              <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                {progress.progress}/{progress.total}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.achievementPoints}>
          <Text style={[
            styles.pointsText,
            { color: isUnlocked ? theme.primary : theme.textSecondary }
          ]}>
            {isUnlocked ? `${item.points} pts` : "? pts"}
          </Text>
          {isUnlocked && <ChevronRight size={16} color={theme.textSecondary} />}
        </View>
      </TouchableOpacity>
    );
  };
  
  // Filter to show only a few achievements on the tab screen
  const featuredAchievements = achievements
    .filter(a => !a.hidden && a.category !== "hidden")
    .slice(0, 5);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Achievements</Text>
        
        <View style={[styles.statsCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{unlockedCount}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Unlocked</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{completionPercentage}%</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Complete</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{totalPoints}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Points</Text>
          </View>
        </View>
      </View>
      
      <FlatList
        data={featuredAchievements}
        renderItem={renderAchievement}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.achievementsList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity
            style={[styles.viewAllButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push("/achievements")}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllButtonText}>View All Achievements</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  achievementsList: {
    padding: 16,
  },
  achievementItem: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
  },
  achievementPoints: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  progressContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
  },
  viewAllButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  viewAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});