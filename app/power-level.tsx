import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, Easing, Platform, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { formatEnergy } from "@/utils/energy-utils";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { getPowerTierName } from "@/utils/milestone-utils";

export default function PowerLevelScreen() {
  const { theme } = useTheme();
  const { getTotalJoules } = useExerciseStore();
  const [totalJoules, setTotalJoules] = useState(0);
  const [showValue, setShowValue] = useState(false);
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  
  // Sound references
  const scannerSound = useRef(new Audio.Sound());
  const revealSound = useRef(new Audio.Sound());
  
  // Animation refs
  const scannerAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const valueOpacityAnim = useRef(new Animated.Value(0)).current;
  
  // Initialize data and load sounds
  useEffect(() => {
    setTotalJoules(getTotalJoules());
    
    // Load sound effects
    const loadSounds = async () => {
      try {
        if (Platform.OS !== "web") {
          await scannerSound.current.loadAsync(require('@/assets/sounds/beep.mp3'));
          await revealSound.current.loadAsync(require('@/assets/sounds/chirp.mp3'));
          setSoundsLoaded(true);
        } else {
          // On web, we don't need to wait for sounds to load
          setSoundsLoaded(true);
        }
      } catch (error) {
        console.log("Error loading sounds:", error);
        // Even if sounds fail to load, we should still allow the animation to run
        setSoundsLoaded(true);
      }
    };
    
    loadSounds();
    
    // Cleanup sounds on unmount
    return () => {
      const unloadSounds = async () => {
        try {
          if (Platform.OS !== "web") {
            await scannerSound.current.unloadAsync();
            await revealSound.current.unloadAsync();
          }
        } catch (error) {
          console.log("Error unloading sounds:", error);
        }
      };
      
      unloadSounds();
    };
  }, []);
  
  // Start animation when sounds are loaded
  useEffect(() => {
    if (soundsLoaded) {
      // Start with a slight delay
      setTimeout(() => {
        startScannerAnimation();
      }, 300);
    }
  }, [soundsLoaded]);
  
  // Play scanner sound
  const playScanner = async () => {
    if (Platform.OS !== "web" && soundsLoaded) {
      try {
        await scannerSound.current.setPositionAsync(0);
        await scannerSound.current.playAsync();
      } catch (error) {
        console.log("Error playing scanner sound:", error);
      }
    }
  };
  
  // Play reveal sound
  const playReveal = async () => {
    if (Platform.OS !== "web" && soundsLoaded) {
      try {
        await revealSound.current.setPositionAsync(0);
        await revealSound.current.playAsync();
      } catch (error) {
        console.log("Error playing reveal sound:", error);
      }
    }
  };
  
  // Knight Rider style scanner animation
  const startScannerAnimation = () => {
    // Reset animations
    scannerAnim.setValue(0);
    opacityAnim.setValue(0);
    valueOpacityAnim.setValue(0);
    
    // Fade in the scanner
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // First pass (right to left) - normal speed
    const firstPass = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    });
    
    // Second pass (left to right) - slower
    const secondPass = Animated.timing(scannerAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    });
    
    // Third pass (right to left) - even slower
    const thirdPass = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    });
    
    // Final reveal
    const reveal = Animated.timing(valueOpacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    });
    
    // Run the sequence with sound effects
    playScanner(); // Play scanner sound at the start
    
    Animated.sequence([
      firstPass,
      secondPass,
      thirdPass,
    ]).start(() => {
      // Play reveal sound and trigger haptic feedback on completion
      playReveal();
      
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      // Start the reveal animation
      reveal.start(() => {
        setShowValue(true);
      });
    });
  };

  // Get the power tier name
  const powerTierName = getPowerTierName(totalJoules);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Your Power Level
        </Text>
        
        {/* Animation container */}
        <View style={styles.animationContainer}>
          {/* Scanner background */}
          <Animated.View 
            style={[
              styles.scannerBackground,
              { 
                backgroundColor: theme.cardBackground,
                opacity: opacityAnim 
              }
            ]}
          />
          
          {/* Knight Rider scanner */}
          <Animated.View
            style={[
              styles.scanner,
              {
                backgroundColor: theme.primary,
                transform: [{
                  translateX: scannerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                  }),
                }],
                opacity: opacityAnim,
              },
            ]}
          >
            {/* Glow effect */}
            <LinearGradient
              colors={['transparent', theme.primary, 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.scannerGlow}
            />
          </Animated.View>
          
          {/* Power value display */}
          <Animated.Text 
            style={[
              styles.powerValue, 
              { 
                color: theme.text,
                opacity: valueOpacityAnim,
              }
            ]}
          >
            {formatEnergy(totalJoules).abbreviated}
          </Animated.Text>
        </View>
        
        {/* Show the power tier after animation completes */}
        {showValue && (
          <View style={styles.tierContainer}>
            <Text style={[styles.tierLabel, { color: theme.textSecondary }]}>
              Power Tier:
            </Text>
            <Text style={[styles.tierValue, { color: theme.primary }]}>
              {powerTierName}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
  },
  animationContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scannerBackground: {
    position: "absolute",
    width: 220,
    height: 120,
    borderRadius: 12,
  },
  scanner: {
    position: "absolute",
    width: 40,
    height: 120,
    borderRadius: 8,
  },
  scannerGlow: {
    position: "absolute",
    width: 80,
    height: 120,
    left: -20,
  },
  powerValue: {
    fontSize: 64,
    fontWeight: "bold",
    zIndex: 10,
  },
  tierContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  tierLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  tierValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
});