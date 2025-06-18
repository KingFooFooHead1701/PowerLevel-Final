import React from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface CustomSplashScreenProps {
  children?: React.ReactNode;
}

export default function CustomSplashScreen({ children }: CustomSplashScreenProps) {
  const { theme } = useTheme();
  const fadeAnim = React.useState(new Animated.Value(1))[0];

  React.useEffect(() => {
    // Simulate loading time (you can replace this with actual loading logic)
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      {children}
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