import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Platform
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { achievements } from "@/constants/achievements";
import { Award, X } from "lucide-react-native";
import { Audio } from "expo-av";

interface AchievementNotificationProps {
  achievementId: string;
  onDismiss: () => void;
}

const { width } = Dimensions.get("window");

export default function AchievementNotification({ 
  achievementId, 
  onDismiss 
}: AchievementNotificationProps) {
  const { theme } = useTheme();
  const { soundEnabled } = useAchievementStore();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  
  // Animation values
  const translateY = new Animated.Value(-150);
  const opacity = new Animated.Value(0);
  
  // Get achievement details
  const achievement = achievements.find(a => a.id === achievementId);
  
  useEffect(() => {
    // Show notification with animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Play sound if enabled
    if (soundEnabled) {
      playSound();
    }
    
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/chirp.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };
  
  const handleDismiss = () => {
    // Hide with animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };
  
  if (!achievement) return null;
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.cardBackground,
          borderColor: theme.secondary,
          transform: [{ translateY }],
          opacity,
          // Add extra padding for iOS notch
          paddingTop: Platform.OS === "ios" ? 50 : 20,
        }
      ]}
    >
      <View style={styles.content}>
        <View style={[
          styles.iconContainer, 
          { backgroundColor: theme.secondary + "20" }
        ]}>
          <Award size={24} color={theme.secondary} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Achievement Unlocked!
          </Text>
          <Text style={[styles.achievementName, { color: theme.text }]}>
            {achievement.name}
          </Text>
          <Text style={[styles.points, { color: theme.secondary }]}>
            +{achievement.points} points
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={handleDismiss}
        >
          <X size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: width,
    borderBottomWidth: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },
  points: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
  },
});