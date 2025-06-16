import React, { useEffect } from "react";
import { StyleSheet, View, Text, Animated, Easing, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Zap } from "lucide-react-native";

export default function CustomSplashScreen() {
  // Get screen dimensions
  const screenWidth = Dimensions.get('window').width;
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const loadingAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    
    // Loading bar animation
    if (Platform.OS === 'web') {
      // Web-specific animation that works properly
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Must be false for web
          }),
          Animated.timing(loadingAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false, // Must be false for web
          })
        ])
      ).start();
    } else {
      // Native animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(loadingAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          })
        ])
      ).start();
    }
  }, []);

  // Calculate loading bar width based on platform
  const loadingBarWidth = Platform.OS === 'web' ? '100%' : screenWidth - 80;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1A1A2E", "#4169E1"]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <Animated.View 
        style={[
          styles.contentContainer, 
          { opacity: fadeAnim }
        ]}
      >
        <View style={styles.logoContainer}>
          <Zap size={64} color="#FFD700" />
        </View>
        
        <Text style={styles.appName}>POWER LEVEL</Text>
        <Text style={styles.tagline}>TRACK YOUR STRENGTH JOURNEY</Text>
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.loadingContainer,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[styles.loadingBar, { width: loadingBarWidth }]}>
          {Platform.OS === 'web' ? (
            // Web-specific implementation with left position animation
            <Animated.View 
              style={[
                styles.loadingIndicator,
                {
                  left: loadingAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '80%']
                  }),
                  width: '20%'
                }
              ]} 
            />
          ) : (
            // Native implementation
            <Animated.View 
              style={[
                styles.loadingIndicator,
                {
                  transform: [{
                    translateX: loadingAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, screenWidth - 120]
                    })
                  }],
                  width: 40
                }
              ]} 
            />
          )}
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 60,
  },
  loadingContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 80,
    left: 40,
    right: 40,
  },
  loadingBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  loadingIndicator: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 3,
    position: "absolute",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  }
});