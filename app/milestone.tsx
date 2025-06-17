import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { Platform } from "react-native";
import { Zap } from "lucide-react-native";

export default function MilestoneScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    // Play celebration sound and haptic feedback
    const playCelebration = async () => {
      if (Platform.OS !== "web") {
        try {
          // Trigger success haptic feedback
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          
          // Play celebration sound
          try {
            const { sound } = await Audio.Sound.createAsync(
              require('@/assets/sounds/thump.mp3')
            );
            await sound.playAsync();
            
            // Unload sound when done
            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.isLoaded && status.isPlaying === false && status.positionMillis > 0) {
                sound.unloadAsync();
              }
            });
          } catch (error) {
            console.log("Error playing celebration sound:", error);
          }
        } catch (error) {
          console.log("Error playing celebration:", error);
        }
      }
    };
    
    playCelebration();
  }, []);

  const handleContinue = () => {
    router.back();
  };

  // Split the milestone name into material and rank
  const milestoneParts = (level as string).split(" ");
  const material = milestoneParts[0];
  const rank = milestoneParts.slice(1).join(" ");

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Zap size={64} color="#fff" />
        </View>
        
        <Text style={styles.congratsText}>Power Tier Unlocked!</Text>
        
        <View style={styles.milestoneContainer}>
          <Text style={styles.materialText}>{material}</Text>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        
        <Text style={styles.descriptionText}>
          Your power level continues to grow. Keep pushing your limits!
        </Text>
        
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  congratsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  milestoneContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  materialText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  rankText: {
    fontSize: 24,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
  },
  descriptionText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 40,
  },
  continueButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});