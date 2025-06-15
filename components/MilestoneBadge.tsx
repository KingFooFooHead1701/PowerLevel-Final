import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface MilestoneBadgeProps {
  milestoneName: string;
  size?: "small" | "medium" | "large";
}

export default function MilestoneBadge({ 
  milestoneName, 
  size = "medium" 
}: MilestoneBadgeProps) {
  const { theme } = useTheme();
  
  // Split the milestone name into material and rank
  const parts = milestoneName.split(" ");
  const material = parts[0];
  const rank = parts.slice(1).join(" ");
  
  // Determine font sizes based on the size prop
  const materialFontSize = size === "small" ? 12 : size === "medium" ? 16 : 20;
  const rankFontSize = size === "small" ? 10 : size === "medium" ? 14 : 18;
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: theme.cardBackground }
    ]}>
      <Text style={[
        styles.material, 
        { color: theme.primary, fontSize: materialFontSize }
      ]}>
        {material}
      </Text>
      <Text style={[
        styles.rank, 
        { color: theme.text, fontSize: rankFontSize }
      ]}>
        {rank}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  material: {
    fontWeight: "bold",
  },
  rank: {
    fontWeight: "500",
  },
});