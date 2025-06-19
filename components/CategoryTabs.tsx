import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryTabs({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryTabsProps) {
  const { theme } = useTheme();
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category: string) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            { 
              backgroundColor: 
                selectedCategory === category 
                  ? theme.primary 
                  : theme.cardBackground 
            }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.tabText,
              { 
                color: 
                  selectedCategory === category 
                    ? "#fff" 
                    : theme.textSecondary 
              }
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 80,
    maxWidth: 120,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});