import React from "react";
import { Tabs } from "expo-router";
import { useTheme } from "@/hooks/use-theme";
import { 
  Home, 
  Dumbbell, 
  BarChart2, 
  Award,
  Settings
} from "lucide-react-native";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          borderTopColor: theme.border,
          paddingHorizontal: 8, // Add horizontal padding for better spacing
        },
        tabBarItemStyle: {
          paddingHorizontal: 4, // Add padding to each tab item
        },
        tabBarIconStyle: {
          marginBottom: 2, // Adjust icon position
        },
        tabBarLabelStyle: {
          fontSize: 11, // Slightly smaller font for labels
          marginBottom: 4, // Add some bottom margin to labels
        },
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color }) => <Dumbbell size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",
          tabBarIcon: ({ color }) => <BarChart2 size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: "Achieve", // Changed from "Achievements" to "Achieve"
          tabBarIcon: ({ color }) => <Award size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}