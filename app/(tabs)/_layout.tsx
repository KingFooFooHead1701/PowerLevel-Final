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
          height: 80, // Increased height to ensure labels are fully visible
          paddingBottom: 15, // Increased bottom padding
          paddingTop: 10, // Increased top padding
        },
        tabBarItemStyle: {
          paddingVertical: 8, // Increased vertical padding for tab items
        },
        tabBarIconStyle: {
          marginBottom: 4, // Added margin to separate icon from label
        },
        tabBarLabelStyle: {
          fontSize: 12, // Slightly increased font size
          fontWeight: '600',
          marginTop: 2, // Added margin to separate label from icon
          marginBottom: 4,
          opacity: 1, // Ensure labels are fully opaque
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
          title: "Achieve", // Already changed to "Achieve" as requested
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