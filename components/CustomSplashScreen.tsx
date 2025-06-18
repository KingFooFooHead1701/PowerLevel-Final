import React, { useEffect, useState, ReactNode } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface CustomSplashScreenProps {
  children: ReactNode;
}

export default function CustomSplashScreen({ children }: CustomSplashScreenProps) {
  const { theme } = useTheme();
  const [isAppReady, setIsAppReady] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Simulate loading time (you can replace this with actual loading logic)
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsAppReady(true);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isAppReady) {
    return <>{children}</>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});