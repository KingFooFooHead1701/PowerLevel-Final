import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Award } from "lucide-react-native";
import { Audio } from "expo-av";
import { useTheme } from "@/hooks/use-theme";
import { getAchievementById } from "@/constants/achievements";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { useSettingsStore } from "@/hooks/use-settings-store";

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
  const { soundEnabled } = useSettingsStore();
  const achievement = getAchievementById(achievementId);
  const slideAnim = React.useRef(new Animated.Value(-200)).current;
  
  useEffect(() => {
    // Play sound if enabled
    const playSound = async () => {
      if (soundEnabled) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            require("@/assets/sounds/chirp.mp3")
          );
          await sound.playAsync();
        } catch (error) {
          console.log("Error playing sound:", error);
        }
      }
    };
    
    // Animate in
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
    
    playSound();
    
    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const handleDismiss = () => {
    Animated.timing(slideAnim, {
      toValue: -200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };
  
  const handlePress = () => {
    handleDismiss();
    if (achievement) {
      if (achievement.category === "hidden") {
        router.push(`/hidden-achievement?id=${achievement.id}`);
      } else {
        router.push(`/achievement/${achievement.id}`);
      }
    }
  };
  
  if (!achievement) return null;
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <TouchableOpacity 
        style={[
          styles.notification,
          { backgroundColor: theme.cardBackground }
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={[
          styles.iconContainer,
          { backgroundColor: theme.primary + "20" }
        ]}>
          <Award size={24} color={theme.primary} />
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>
            Achievement Unlocked!
          </Text>
          <Text style={[styles.achievementName, { color: theme.primary }]}>
            {achievement.name}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleDismiss}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={[styles.closeText, { color: theme.textSecondary }]}>
            ✕
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 50,
    zIndex: 1000,
  },
  notification: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});