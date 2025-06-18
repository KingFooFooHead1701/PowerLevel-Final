import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@/hooks/use-theme";

export default function AchievementsLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="all"
        options={{
          title: "All Achievements",
          presentation: "card",
        }}
      />
    </Stack>
  );
}