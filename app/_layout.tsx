import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/use-theme";
import { SettingsProvider } from "@/hooks/use-settings-store";
import { ExerciseProvider } from "@/hooks/use-exercise-store";
import { AchievementProvider } from "@/hooks/use-achievement-store";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import AchievementNotification from "@/components/AchievementNotification";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ExerciseProvider>
          <AchievementProvider>
            <CustomSplashScreen>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="achievements" options={{ presentation: "card" }} />
                <Stack.Screen name="achievement/[id]" options={{ presentation: "card" }} />
                <Stack.Screen name="hidden-achievement" options={{ presentation: "card" }} />
              </Stack>
              <AchievementNotification />
            </CustomSplashScreen>
          </AchievementProvider>
        </ExerciseProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}