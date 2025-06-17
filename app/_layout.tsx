import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { ThemeProvider } from "@/hooks/use-theme";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    // Enable screen rotation on mobile devices
    if (Platform.OS !== 'web') {
      ScreenOrientation.unlockAsync();
    }
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for a smoother experience
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        if (loaded) {
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      }
    }

    if (loaded) {
      prepare();
    }
  }, [loaded]);

  if (!appIsReady) {
    return <CustomSplashScreen />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ 
        headerShown: false,
        headerShadowVisible: false,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="exercise/[id]" 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: "#1A1A2E" },
            headerTintColor: "#fff",
            headerTitle: "",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="power-level" 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: "#1A1A2E" },
            headerTintColor: "#fff",
            headerTitle: "Power Level",
            headerBackTitle: "Back",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="milestone" 
          options={{ 
            headerShown: false,
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="custom-exercise" 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: "#1A1A2E" },
            headerTintColor: "#fff",
            headerTitle: "Add Custom Exercise",
            headerBackTitle: "Back",
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}