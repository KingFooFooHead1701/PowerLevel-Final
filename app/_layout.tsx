import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/use-theme";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import AchievementNotification from "@/components/AchievementNotification";

export default function RootLayout() {
  const [unviewedAchievement, setUnviewedAchievement] = useState<string | null>(null);
  const { getUnviewedAchievements, markAchievementViewed } = useAchievementStore();
  
  // Check for unviewed achievements
  useEffect(() => {
    const unviewed = getUnviewedAchievements();
    if (unviewed.length > 0) {
      setUnviewedAchievement(unviewed[0].id);
    }
  }, [getUnviewedAchievements]);
  
  const handleDismissNotification = () => {
    if (unviewedAchievement) {
      markAchievementViewed(unviewedAchievement);
      setUnviewedAchievement(null);
    }
  };
  
  return (
    <ThemeProvider>
      <CustomSplashScreen>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="achievements" options={{ presentation: "card" }} />
          <Stack.Screen name="achievement/[id]" options={{ presentation: "card" }} />
          <Stack.Screen name="hidden-achievement" options={{ presentation: "card" }} />
        </Stack>
        {unviewedAchievement && (
          <AchievementNotification 
            achievementId={unviewedAchievement} 
            onDismiss={handleDismissNotification} 
          />
        )}
      </CustomSplashScreen>
    </ThemeProvider>
  );
}