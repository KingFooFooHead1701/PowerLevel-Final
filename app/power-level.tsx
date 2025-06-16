import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, Easing, Platform, TouchableOpacity, Dimensions } from "react-native";
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
  
  // Get screen dimensions for responsive sizing
  const screenWidth = Dimensions.get('window').width;
  
  // Sound references
  const scannerSound = useRef<Audio.Sound | null>(null);
  const revealSound = useRef<Audio.Sound | null>(null);
  
  // Animation refs
  const scannerAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const valueOpacityAnim = useRef(new Animated.Value(0)).current;
  const fullJoulesOpacityAnim = useRef(new Animated.Value(0)).current;
  const tierOpacityAnim = useRef(new Animated.Value(0)).current;
  
  // Initialize data and load sounds
  useEffect(() => {
    setTotalJoules(getTotalJoules());
    
    // Load sound effects
    const loadSounds = async () => {
      try {
        if (Platform.OS !== "web") {
          // Create and load the sounds
          const { sound: scanner } = await Audio.Sound.createAsync(
            require('@/assets/sounds/beep.mp3')
          );
          scannerSound.current = scanner;
          
          const { sound: reveal } = await Audio.Sound.createAsync(
            require('@/assets/sounds/chirp.mp3')
          );
          revealSound.current = reveal;
          
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
            if (scannerSound.current) {
              await scannerSound.current.unloadAsync();
            }
            if (revealSound.current) {
              await revealSound.current.unloadAsync();
            }
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
      // Start with a slight delay to ensure sounds are ready
      setTimeout(() => {
        startScannerAnimation();
      }, 1000); // Increased delay to ensure sounds are fully loaded
    }
  }, [soundsLoaded]);
  
  // Play scanner sound
  const playScanner = async () => {
    if (Platform.OS !== "web" && soundsLoaded && scannerSound.current) {
      try {
        // Make sure the sound is reset to the beginning
        await scannerSound.current.setPositionAsync(0);
        // Set volume to ensure it's audible
        await scannerSound.current.setVolumeAsync(1.0);
        // Play the sound
        await scannerSound.current.playAsync();
      } catch (error) {
        console.log("Error playing scanner sound:", error);
      }
    }
  };
  
  // Play reveal sound
  const playReveal = async () => {
    if (Platform.OS !== "web" && soundsLoaded && revealSound.current) {
      try {
        await revealSound.current.setPositionAsync(0);
        await revealSound.current.setVolumeAsync(1.0);
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
    fullJoulesOpacityAnim.setValue(0);
    tierOpacityAnim.setValue(0);
    
    // Fade in the scanner
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Play scanner sound at the start with a slight delay to ensure it's ready
    setTimeout(() => {
      playScanner();
    }, 300);
    
    // First pass (right to left) - normal speed
    const firstPass = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: Platform.OS !== 'web',
      easing: Easing.inOut(Easing.ease),
    });
    
    // Second pass (left to right) - slower
    const secondPass = Animated.timing(scannerAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: Platform.OS !== 'web',
      easing: Easing.inOut(Easing.ease),
    });
    
    // Third pass (right to left) - even slower
    const thirdPass = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: Platform.OS !== 'web',
      easing: Easing.inOut(Easing.ease),
    });
    
    // Final reveal
    const reveal = Animated.timing(valueOpacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    });
    
    // Full joules text fade in
    const fullJoulesReveal = Animated.timing(fullJoulesOpacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    });
    
    // Tier text fade in
    const tierReveal = Animated.timing(tierOpacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    });
    
    // Run the sequence
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
        
        // After the value is shown, fade in the full joules text
        setTimeout(() => {
          fullJoulesReveal.start();
          
          // After full joules is shown, fade in the tier text
          setTimeout(() => {
            tierReveal.start();
          }, 300);
        }, 200);
      });
    });
  };

  // Get the power tier name
  const powerTierName = getPowerTierName(totalJoules);

  // Calculate the scanner width and animation range based on container size
  const scannerWidth = 40;
  const containerWidth = 220;
  const maxTranslation = (containerWidth - scannerWidth) / 2;

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
          {Platform.OS === 'web' ? (
            <Animated.View
              style={[
                styles.scanner,
                {
                  backgroundColor: theme.primary,
                  left: scannerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(containerWidth - scannerWidth) / 2 - maxTranslation, (containerWidth - scannerWidth) / 2 + maxTranslation]
                  }),
                  opacity: opacityAnim,
                },
              ]}
            >
              <LinearGradient
                colors={['transparent', theme.primary, 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.scannerGlow}
              />
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                styles.scanner,
                {
                  backgroundColor: theme.primary,
                  transform: [{
                    translateX: scannerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-maxTranslation, maxTranslation],
                    }),
                  }],
                  opacity: opacityAnim,
                },
              ]}
            >
              <LinearGradient
                colors={['transparent', theme.primary, 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.scannerGlow}
              />
            </Animated.View>
          )}
          
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
          
          {/* Full joules display - Always visible but with opacity animation */}
          <Animated.Text 
            style={[
              styles.fullJoulesValue, 
              { 
                color: theme.textSecondary,
                opacity: fullJoulesOpacityAnim,
              }
            ]}
          >
            {formatEnergy(totalJoules).full}
          </Animated.Text>
        </View>
        
        {/* Show the power tier after animation completes - positioned absolutely */}
        <Animated.View 
          style={[
            styles.tierContainer,
            { opacity: tierOpacityAnim }
          ]}
        >
          <Text style={[styles.tierLabel, { color: theme.textSecondary }]}>
            Power Tier:
          </Text>
          <Text style={[styles.tierValue, { color: theme.primary }]}>
            {powerTierName}
          </Text>
        </Animated.View>
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
    position: "relative",
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
    marginBottom: 80, // Add space below for the tier text
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
    left: 90, // Center position (220/2 - 40/2)
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
  fullJoulesValue: {
    fontSize: 16,
    marginTop: 8,
    zIndex: 10,
  },
  tierContainer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    width: "100%",
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