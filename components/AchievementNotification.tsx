import React, { useEffect, useRef } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  TouchableOpacity, 
  Platform 
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { Award } from "lucide-react-native";
import { getAchievementById } from "@/constants/achievements";
import * as Haptics from "expo-haptics";

interface AchievementNotificationProps {
  achievementId: string;
  onDismiss: () => void;
}

export default function AchievementNotification({ 
  achievementId, 
  onDismiss 
}: AchievementNotificationProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  const achievement = getAchievementById(achievementId);
  
  if (!achievement) {
    return null;
  }
  
  useEffect(() => {
    // Play haptic feedback on achievement unlock
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    // Slide in animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
    
    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      dismissNotification();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissNotification = () => {
    // Slide out animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      onDismiss();
    });
  };
  
  const handlePress = () => {
    dismissNotification();
    router.push(`/achievement/${achievementId}`);
  };
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          backgroundColor: theme.cardBackground,
          borderColor: theme.primary,
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + "20" }]}>
          <Award size={24} color={theme.primary} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Achievement Unlocked!
          </Text>
          <Text style={[styles.achievementName, { color: theme.text }]}>
            {achievement.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 10,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});