import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { formatEnergy } from "@/utils/energy-utils";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { getPowerTierName } from "@/utils/milestone-utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useAchievementStore, checkAchievements } from "@/hooks/use-achievement-store";

export default function PowerLevelScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getTotalJoules } = useExerciseStore();
  const { 
    incrementScanCount, 
    incrementDisplayTapCount,
    setLastTierName,
    lastTierName,
    unlockAchievement
  } = useAchievementStore();
  const [totalJoules, setTotalJoules] = useState(0);
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  const scannerSound = useRef<Audio.Sound | null>(null);
  const revealSound = useRef<Audio.Sound | null>(null);
  const thumpSound = useRef<Audio.Sound | null>(null);

  const scannerAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const valueOpacityAnim = useRef(new Animated.Value(0)).current;
  const fullJoulesOpacityAnim = useRef(new Animated.Value(0)).current;
  const tierOpacityAnim = useRef(new Animated.Value(0)).current;
  const tierScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTotalJoules(getTotalJoules());
    const loadSounds = async () => {
      if (Platform.OS !== "web") {
        try {
          const { sound: scanner } = await Audio.Sound.createAsync(
            require("@/assets/sounds/beep.mp3")
          );
          scannerSound.current = scanner;
        } catch {}
        try {
          const { sound: reveal } = await Audio.Sound.createAsync(
            require("@/assets/sounds/chirp.mp3")
          );
          revealSound.current = reveal;
        } catch {}
        try {
          const { sound: thump } = await Audio.Sound.createAsync(
            require("@/assets/sounds/thump.mp3")
          );
          thumpSound.current = thump;
        } catch {}
      }
      setSoundsLoaded(true);
    };
    loadSounds();
    return () => {
      (async () => {
        if (scannerSound.current) await scannerSound.current.unloadAsync();
        if (revealSound.current) await revealSound.current.unloadAsync();
        if (thumpSound.current) await thumpSound.current.unloadAsync();
      })();
    };
  }, []);

  useEffect(() => {
    if (soundsLoaded) setTimeout(startScannerAnimation, 1000);
  }, [soundsLoaded]);

  const playScanner = async () => {
    if (scannerSound.current) {
      await scannerSound.current.setPositionAsync(0);
      await scannerSound.current.playAsync();
    }
  };
  const playReveal = async () => {
    if (revealSound.current) {
      await revealSound.current.setPositionAsync(0);
      await revealSound.current.playAsync();
    }
  };
  const playThump = async () => {
    if (thumpSound.current) {
      await thumpSound.current.setPositionAsync(0);
      await thumpSound.current.playAsync();
    }
  };

  const startScannerAnimation = () => {
    // Increment scan count for achievements
    incrementScanCount();
    
    // Check for time-based achievements
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 4) {
      unlockAchievement("midnight_warrior");
    }
    if (currentHour >= 0 && currentHour < 6) {
      unlockAchievement("early_bird_special");
    }
    
    // Check achievements
    checkAchievements();
    
    scannerAnim.setValue(0);
    opacityAnim.setValue(0);
    valueOpacityAnim.setValue(0);
    fullJoulesOpacityAnim.setValue(0);
    tierOpacityAnim.setValue(0);
    tierScaleAnim.setValue(1);

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(playScanner, 300);

    const firstPass = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: Platform.OS !== "web",
    });
    const secondPass = Animated.timing(scannerAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: Platform.OS !== "web",
    });
    const thirdPass = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: Platform.OS !== "web",
    });
    const reveal = Animated.timing(valueOpacityAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
    const fullJoulesReveal = Animated.timing(fullJoulesOpacityAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
    const tierReveal = Animated.timing(tierOpacityAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
    
    // New tier scale animations
    const tierScaleUp = Animated.timing(tierScaleAnim, {
      toValue: 1.3,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
    
    const tierScaleDown = Animated.timing(tierScaleAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.bounce,
      useNativeDriver: true,
    });

    Animated.sequence([firstPass, secondPass, thirdPass]).start(() => {
      playReveal();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      reveal.start(() => {
        setTimeout(() => fullJoulesReveal.start(), 200);
        setTimeout(() => {
          // Play thump sound right when tier appears
          playThump();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          tierReveal.start();
          // Start scale animation immediately with the tier reveal
          setTimeout(() => {
            Animated.sequence([tierScaleUp, tierScaleDown]).start();
          }, 100);
          
          // Check for tier jump achievement
          const powerTierName = getPowerTierName(totalJoules);
          if (lastTierName && lastTierName !== powerTierName) {
            // Get tier indices to check for jumps
            const tiers = [
              "Novice", "Apprentice", "Adept", "Expert", "Master", 
              "Grandmaster", "Legend", "Mythic", "Godlike", "Transcendent"
            ];
            const lastTierIndex = tiers.indexOf(lastTierName);
            const currentTierIndex = tiers.indexOf(powerTierName);
            
            if (lastTierIndex >= 0 && currentTierIndex >= 0 && currentTierIndex - lastTierIndex >= 2) {
              unlockAchievement("tier_jump");
            }
            
            // Check for max tier achievement
            if (currentTierIndex === tiers.length - 1) {
              unlockAchievement("legendary_status");
            }
          }
          
          // Update last tier name
          setLastTierName(powerTierName);
        }, 500);
      });
    });
  };

  const powerTierName = getPowerTierName(totalJoules);
  const containerWidth = 220;
  const scannerWidth = 40;
  const maxTranslation = (containerWidth - scannerWidth) / 2;

  const handleGoBack = () => router.back();
  
  const handleJoulesTap = () => {
    incrementDisplayTapCount();
    checkAchievements(); // Check for "glitch_in_the_matrix" achievement
  };

  return (
    <>
      {/* hide expo-router header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* status bar & custom header */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView
        edges={["top"]}
        style={[styles.safeArea, { backgroundColor: theme.background }]}
      >
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <TouchableOpacity 
            onPress={handleGoBack} 
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Power Level</Text>
        </View>
      </SafeAreaView>

      {/* main content */}
      <View style={[styles.contentContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>Your Power Level</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.scannerBackground,
              { backgroundColor: theme.cardBackground, opacity: opacityAnim },
            ]}
          />
          <View style={styles.scannerContainer}>
            <Animated.View
              style={[
                styles.scanner,
                {
                  transform: [
                    {
                      translateX: scannerAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-maxTranslation, maxTranslation],
                      }),
                    },
                  ],
                  opacity: opacityAnim,
                  backgroundColor: theme.primary,
                },
              ]}
            >
              <LinearGradient
                colors={["transparent", theme.primary, "transparent"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.scannerGlow}
              />
            </Animated.View>
          </View>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={handleJoulesTap}
            style={styles.powerValueContainer}
          >
            <Animated.Text style={[styles.powerValue, { color: theme.text, opacity: valueOpacityAnim }]}>
              {formatEnergy(totalJoules).abbreviated}
            </Animated.Text>
            <Animated.Text style={[styles.fullJoulesValue, { color: theme.textSecondary, opacity: fullJoulesOpacityAnim }]}>
              {formatEnergy(totalJoules).full}
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.tierContainer, { opacity: tierOpacityAnim }]}>
          <Text style={[styles.tierLabel, { color: theme.textSecondary }]}>
            Power Tier:
          </Text>
          <Animated.Text 
            style={[
              styles.tierValue, 
              { 
                color: theme.primary,
                transform: [{ scale: tierScaleAnim }]
              }
            ]}
          >
            {powerTierName}
          </Animated.Text>
        </Animated.View>
      </View>

      {/* Tier/Rank footer */}
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Keep training to unlock higher power tiers!
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { width: "100%" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 12 },
  contentContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 20, marginBottom: 16 },
  animationContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerBackground: { position: "absolute", width: 220, height: 120, borderRadius: 12 },
  scannerContainer: { position: "absolute", width: 220, height: 120, overflow: "hidden", borderRadius: 12 },
  scanner: { position: "absolute", width: 40, height: 120, borderRadius: 8, left: 90 },
  scannerGlow: { position: "absolute", width: 80, height: 120, left: -20 },
  powerValueContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  powerValue: { fontSize: 64, fontWeight: "bold", zIndex: 10 },
  fullJoulesValue: { fontSize: 16, marginTop: 8, zIndex: 10 },
  tierContainer: { marginTop: 32, alignItems: "center", width: "100%" },
  tierLabel: { fontSize: 16, marginBottom: 8 },
  tierValue: { fontSize: 24, fontWeight: "bold" },
  footerContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
  },
});