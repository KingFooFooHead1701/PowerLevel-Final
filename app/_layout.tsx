// app/_layout.tsx
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenOrientation from 'expo-screen-orientation';

import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import AchievementNotifier from "@/components/AchievementNotifier";
import FlashMessage from "react-native-flash-message";
import { clearAllAppData } from "@/hooks/use-exercise-store";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();
const APP_VERSION = "1.0.2";
const APP_VERSION_KEY = "app-version";

export default function RootLayout() {
  const [loaded, error] = useFonts({ ...FontAwesome.font });
  const [appIsReady, setAppIsReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => { if (error) throw error; }, [error]);

  useEffect(() => {
    if (Platform.OS !== 'web') ScreenOrientation.unlockAsync();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const stored = await AsyncStorage.getItem(APP_VERSION_KEY);
        if (!stored || stored !== APP_VERSION) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem(APP_VERSION_KEY, APP_VERSION);
          if (stored && stored !== APP_VERSION) {
            await clearAllAppData();
          }
        }
        await new Promise(r => setTimeout(r, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        if (loaded) {
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      }
    }
    if (loaded) prepare();
  }, [loaded]);

  if (!appIsReady) return <CustomSplashScreen />;

  return <RootLayoutNav isFirstLaunch={isFirstLaunch} />;
}

function RootLayoutNav({ isFirstLaunch }: { isFirstLaunch: boolean }) {
  const colorScheme = useColorScheme();
  const exerciseStore = useExerciseStore();
  const settingsStore = useSettingsStore();

  useEffect(() => {
    if (isFirstLaunch) {
      exerciseStore.resetToDefaults();
      settingsStore.resetSettings();
    }
  }, [isFirstLaunch]);

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
        <Stack.Screen name="(tabs)" />
        {/* …other modal/screens here… */}
      </Stack>
      {/* mount notifier + toast UI at the root */}
      <AchievementNotifier />
      <FlashMessage position="top" />
    </ThemeProvider>
  );
}
