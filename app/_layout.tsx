import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View, Alert, Platform } from "react-native";
import { ThemeProvider, useTheme } from "@/hooks/use-theme";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearAllAppData } from "@/hooks/use-exercise-store";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useAchievementStore, checkAchievements } from "@/hooks/use-achievement-store";
import AchievementNotification from "@/components/AchievementNotification";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// App version for data migration checks
const APP_VERSION = "1.0.3"; // Incremented to force data reset
const APP_VERSION_KEY = "app-version";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

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
        
        // Check if this is first launch or if app version has changed
        const storedVersion = await AsyncStorage.getItem(APP_VERSION_KEY);
        
        // If no version stored or version changed, consider it a first launch
        if (!storedVersion || storedVersion !== APP_VERSION) {
          setIsFirstLaunch(true);
          
          // Store current version
          await AsyncStorage.setItem(APP_VERSION_KEY, APP_VERSION);
          
          // For version change, clear all data
          if (storedVersion && storedVersion !== APP_VERSION) {
            console.log("App version changed, clearing all data");
            await clearAllAppData();
          }
        }
        
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

  return <RootLayoutNav isFirstLaunch={isFirstLaunch} />;
}

function RootLayoutNav({ isFirstLaunch }: { isFirstLaunch: boolean }) {
  const colorScheme = useColorScheme();
  const exerciseStore = useExerciseStore();
  const settingsStore = useSettingsStore();
  const achievementStore = useAchievementStore();
  const [achievementNotification, setAchievementNotification] = useState<string | null>(null);
  
  // Check for unviewed achievements
  useEffect(() => {
    const unviewedAchievements = achievementStore.getUnviewedAchievements();
    if (unviewedAchievements.length > 0) {
      setAchievementNotification(unviewedAchievements[0].id);
    }
  }, [achievementStore.unlockedAchievements]);
  
  // Check achievements on app start
  useEffect(() => {
    checkAchievements();
  }, []);

  // Reset stores to defaults on first launch
  useEffect(() => {
    if (isFirstLaunch) {
      // Reset all stores to defaults
      exerciseStore.resetToDefaults();
      settingsStore.resetSettings();
      achievementStore.resetAchievements();
      
      // You could show a welcome message or tutorial here
      console.log("First launch detected - stores reset to defaults");
    }
  }, [isFirstLaunch]);

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      
      {/* Achievement notification */}
      {achievementNotification && (
        <AchievementNotification 
          achievementId={achievementNotification}
          onDismiss={() => setAchievementNotification(null)}
        />
      )}
      
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
          name="hidden-achievement" 
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
        <Stack.Screen 
          name="achievements" 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: "#1A1A2E" },
            headerTintColor: "#fff",
            headerTitle: "Achievements",
            headerBackTitle: "Back",
          }} 
        />
        <Stack.Screen 
          name="achievement/[id]" 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: "#1A1A2E" },
            headerTintColor: "#fff",
            headerTitle: "Achievement Details",
            headerBackTitle: "Back",
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}

// Add a component to reset all app data (for development/testing)
export function ResetAppDataButton() {
  const handleReset = () => {
    Alert.alert(
      "Reset App Data",
      "This will clear all app data and reset to defaults. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: async () => {
            await clearAllAppData();
            Alert.alert("Success", "App data has been reset. Please restart the app.");
          }
        }
      ]
    );
  };
  
  return null; // Return null for now, implement UI if needed
}