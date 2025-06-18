import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { useAchievementStore, checkAchievements } from "@/hooks/use-achievement-store";
import { 
  achievements, 
  Achievement, 
  AchievementCategory, 
  formatAchievement,
  getAchievementsByCategory
} from "@/constants/achievements";
import { 
  Award, 
  Zap, 
  Dumbbell, 
  Calendar, 
  Star,
  ChevronRight,
  Lock
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
  
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | "all">("all");
  
  // Run achievement check on screen load
  useEffect(() => {
    checkAchievements();
  }, []);
  
  // Filter achievements by category
  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : getAchievementsByCategory(selectedCategory);
  
  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);
  const totalPoints = getTotalPoints();
  
  // Render category icon
  const renderCategoryIcon = (category: AchievementCategory | "all") => {
    const color = selectedCategory === category ? theme.primary : theme.textSecondary;
    
    switch (category) {
      case "all":
        return <Award size={24} color={color} />;
      case "milestone":
        return <Zap size={24} color={color} />;
      case "exercise":
        return <Dumbbell size={24} color={color} />;
      case "consistency":
        return <Calendar size={24} color={color} />;
      case "special":
        return <Star size={24} color={color} />;
      case "hidden":
        return <Star size={24} color={color} />;
      default:
        return <Award size={24} color={color} />;
    }
  };
  
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
            backgroundColor: isUnlocked ? theme.secondary + "20" : theme.backgroundSecondary,
            borderColor: isUnlocked ? theme.secondary : theme.border
          }
        ]}>
          {isUnlocked ? (
            <Award size={24} color={theme.secondary} />
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
            { color: isUnlocked ? theme.secondary : theme.textSecondary }
          ]}>
            {isUnlocked ? `${item.points} pts` : "? pts"}
          </Text>
          {isUnlocked && <ChevronRight size={16} color={theme.textSecondary} />}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Achievements</Text>
        
        <View style={[styles.statsCard, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.secondary }]}>{unlockedCount}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Unlocked</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.secondary }]}>{completionPercentage}%</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Complete</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.secondary }]}>{totalPoints}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Points</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.categoryTabs}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabsContent}
        >
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === "all" && { 
                borderBottomColor: theme.primary,
                borderBottomWidth: 2
              }
            ]}
            onPress={() => setSelectedCategory("all")}
          >
            {renderCategoryIcon("all")}
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === "all" ? theme.primary : theme.textSecondary }
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === "milestone" && { 
                borderBottomColor: theme.primary,
                borderBottomWidth: 2
              }
            ]}
            onPress={() => setSelectedCategory("milestone")}
          >
            {renderCategoryIcon("milestone")}
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === "milestone" ? theme.primary : theme.textSecondary }
            ]}>
              Milestones
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === "exercise" && { 
                borderBottomColor: theme.primary,
                borderBottomWidth: 2
              }
            ]}
            onPress={() => setSelectedCategory("exercise")}
          >
            {renderCategoryIcon("exercise")}
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === "exercise" ? theme.primary : theme.textSecondary }
            ]}>
              Exercises
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === "consistency" && { 
                borderBottomColor: theme.primary,
                borderBottomWidth: 2
              }
            ]}
            onPress={() => setSelectedCategory("consistency")}
          >
            {renderCategoryIcon("consistency")}
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === "consistency" ? theme.primary : theme.textSecondary }
            ]}>
              Consistency
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === "special" && { 
                borderBottomColor: theme.primary,
                borderBottomWidth: 2
              }
            ]}
            onPress={() => setSelectedCategory("special")}
          >
            {renderCategoryIcon("special")}
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === "special" ? theme.primary : theme.textSecondary }
            ]}>
              Special
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === "hidden" && { 
                borderBottomColor: theme.primary,
                borderBottomWidth: 2
              }
            ]}
            onPress={() => setSelectedCategory("hidden")}
          >
            {renderCategoryIcon("hidden")}
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === "hidden" ? theme.primary : theme.textSecondary }
            ]}>
              Hidden
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredAchievements}
        renderItem={renderAchievement}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.achievementsList}
        showsVerticalScrollIndicator={false}
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
  categoryTabs: {
    height: 60,
  },
  categoryTabsContent: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    height: 60,
  },
  categoryText: {
    fontSize: 16,
    marginLeft: 8,
  },
  achievementsList: {
    padding: 16,
    paddingTop: 0,
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
});