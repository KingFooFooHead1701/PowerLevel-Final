import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/hooks/use-theme';
import CustomSplashScreen from '@/components/CustomSplashScreen';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <CustomSplashScreen />;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="exercise/[id]" 
          options={{ 
            title: "Exercise Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="custom-exercise" 
          options={{ 
            title: "Add Custom Exercise",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="achievement/[id]" 
          options={{ 
            title: "Achievement Details",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="hidden-achievement" 
          options={{ 
            title: "Hidden Achievement",
            presentation: "card",
          }} 
        />
        <Stack.Screen 
          name="power-level" 
          options={{ 
            title: "Power Level",
            presentation: "modal",
          }} 
        />
        <Stack.Screen 
          name="milestone" 
          options={{ 
            title: "Milestone Details",
            presentation: "card",
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}