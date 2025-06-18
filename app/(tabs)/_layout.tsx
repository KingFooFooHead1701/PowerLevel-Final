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
          height: 65, // Increased height to ensure labels are visible
          paddingBottom: 10, // Increased bottom padding
          paddingTop: 6,
        },
        tabBarItemStyle: {
          paddingVertical: 4, // Add vertical padding to tab bar items
        },
        tabBarIconStyle: {
          marginBottom: 0, // Reduced to give more space to label
        },
        tabBarLabelStyle: {
          fontSize: 11, // Slightly increased font size
          fontWeight: '500',
          marginTop: 0, // Reduced top margin
          marginBottom: 4,
          opacity: 1, // Ensure labels are fully opaque
          color: 'inherit', // Use the inherited color
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
          title: "Achieve", // Changed from "Achievements" to "Achieve" as requested
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