import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Check, ChevronRight, X } from "lucide-react-native";

import {
  findThemeCollection,
  themeCollectionPalettes,
  themeCollections,
} from "@/constants/theme-collections";
import { themes, ThemeName } from "@/constants/themes";
import { useTheme } from "@/hooks/use-theme";

interface ThemePickerModalProps {
  visible: boolean;
  onClose: () => void;
}

const formatThemeName = (name: ThemeName) =>
  (name.match(/[A-Z]?[a-z]+|[0-9]+/g) || [name]).join(" ");

export default function ThemePickerModal({
  visible,
  onClose,
}: ThemePickerModalProps) {
  const { theme, themeName, setThemeName } = useTheme();
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  const selectedCollection = selectedCollectionId
    ? themeCollections.find(
        (collection) => collection.id === selectedCollectionId
      )
    : undefined;
  const activeCollection = findThemeCollection(themeName);

  const closePicker = () => {
    setSelectedCollectionId(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent={Platform.OS === "android"}
      onRequestClose={closePicker}
    >
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={["top", "bottom"]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.cardBackground,
              borderBottomColor: theme.border,
            },
          ]}
        >
          {selectedCollection ? (
            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: theme.inputBackground },
              ]}
              onPress={() => setSelectedCollectionId(null)}
              accessibilityRole="button"
              accessibilityLabel="Back to theme collections"
            >
              <ArrowLeft size={22} color={theme.text} />
            </TouchableOpacity>
          ) : (
            <View style={styles.headerButtonPlaceholder} />
          )}

          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Choose a Theme
            </Text>
            <Text
              style={[styles.headerSubtitle, { color: theme.textSecondary }]}
              numberOfLines={1}
            >
              {selectedCollection
                ? selectedCollection.label
                : "Select an anime-inspired collection"}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.headerButton,
              { backgroundColor: theme.inputBackground },
            ]}
            onPress={closePicker}
            accessibilityRole="button"
            accessibilityLabel="Close theme picker"
          >
            <X size={22} color={theme.text} />
          </TouchableOpacity>
        </View>

        {selectedCollection ? (
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.themeContent}
          >
            <View
              style={[
                styles.collectionBanner,
                {
                  backgroundColor:
                    themeCollectionPalettes[selectedCollection.id].background,
                  borderColor:
                    themeCollectionPalettes[selectedCollection.id].primary,
                },
              ]}
            >
              <View style={styles.collectionBannerText}>
                <Text
                  style={[
                    styles.collectionBannerTitle,
                    {
                      color:
                        themeCollectionPalettes[selectedCollection.id].text,
                    },
                  ]}
                >
                  {selectedCollection.label}
                </Text>
                <Text
                  style={[
                    styles.collectionBannerCount,
                    {
                      color:
                        themeCollectionPalettes[selectedCollection.id].text,
                    },
                  ]}
                >
                  {selectedCollection.themeNames.length} color themes
                </Text>
              </View>
              <View style={styles.collectionSwatches}>
                <View
                  style={[
                    styles.collectionSwatch,
                    {
                      backgroundColor:
                        themeCollectionPalettes[selectedCollection.id].primary,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.collectionSwatch,
                    styles.collectionSwatchOverlap,
                    {
                      backgroundColor:
                        themeCollectionPalettes[selectedCollection.id]
                          .secondary,
                    },
                  ]}
                />
              </View>
            </View>

            <Text style={[styles.instructions, { color: theme.textSecondary }]}>
              Tap a theme to preview it throughout the app. Use the Close button
              when you are finished.
            </Text>

            <View style={styles.themeGrid}>
              {selectedCollection.themeNames.map((name) => {
                const isSelected = themeName === name;

                return (
                  <TouchableOpacity
                    key={name}
                    style={[
                      styles.themeItem,
                      {
                        backgroundColor: themes[name].cardBackground,
                        borderColor: isSelected
                          ? themes[name].primary
                          : themes[name].border,
                      },
                    ]}
                    onPress={() => setThemeName(name)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`${formatThemeName(name)} theme`}
                  >
                    <View
                      style={[
                        styles.themeColorPreview,
                        { backgroundColor: themes[name].secondary },
                      ]}
                    >
                      <View
                        style={[
                          styles.themeColorSecondary,
                          { backgroundColor: themes[name].primary },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.themeName,
                        { color: themes[name].text },
                        isSelected && styles.selectedThemeName,
                      ]}
                      numberOfLines={2}
                    >
                      {formatThemeName(name)}
                    </Text>
                    {isSelected && (
                      <View
                        style={[
                          styles.selectedBadge,
                          { backgroundColor: themes[name].primary },
                        ]}
                      >
                        <Check size={13} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.collectionContent}
          >
            <Text style={[styles.instructions, { color: theme.textSecondary }]}>
              Each collection has its own color identity. Tap one to see its
              available character-inspired themes.
            </Text>

            <View style={styles.collectionGrid}>
              {themeCollections.map((collection) => {
                const palette = themeCollectionPalettes[collection.id];
                const containsCurrentTheme =
                  activeCollection?.id === collection.id;

                return (
                  <TouchableOpacity
                    key={collection.id}
                    style={[
                      styles.collectionItem,
                      {
                        backgroundColor: palette.background,
                        borderColor: palette.primary,
                      },
                    ]}
                    onPress={() => setSelectedCollectionId(collection.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`${collection.label}, ${collection.themeNames.length} themes`}
                  >
                    <View
                      style={[
                        styles.collectionAccent,
                        { backgroundColor: palette.primary },
                      ]}
                    />
                    <View style={styles.collectionItemTop}>
                      <View style={styles.smallSwatches}>
                        <View
                          style={[
                            styles.smallSwatch,
                            { backgroundColor: palette.primary },
                          ]}
                        />
                        <View
                          style={[
                            styles.smallSwatch,
                            styles.smallSwatchOverlap,
                            { backgroundColor: palette.secondary },
                          ]}
                        />
                      </View>
                      <ChevronRight size={17} color={palette.secondary} />
                    </View>
                    <Text
                      style={[styles.collectionName, { color: palette.text }]}
                      numberOfLines={2}
                    >
                      {collection.label}
                    </Text>
                    <Text
                      style={[styles.collectionCount, { color: palette.text }]}
                    >
                      {collection.themeNames.length} themes
                    </Text>
                    {containsCurrentTheme && (
                      <View
                        style={[
                          styles.currentBadge,
                          { backgroundColor: palette.primary },
                        ]}
                      >
                        <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        <Text style={styles.currentBadgeText}>Current</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonPlaceholder: {
    width: 44,
    height: 44,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },
  content: {
    flex: 1,
  },
  collectionContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 36,
  },
  themeContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 36,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  collectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  collectionItem: {
    width: "30.33%",
    minHeight: 142,
    marginHorizontal: "1.5%",
    marginVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    overflow: "hidden",
  },
  collectionAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 5,
  },
  collectionItemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 3,
    marginBottom: 10,
  },
  smallSwatches: {
    width: 40,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  smallSwatch: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.75)",
  },
  smallSwatchOverlap: {
    marginLeft: -7,
  },
  collectionName: {
    minHeight: 38,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "700",
  },
  collectionCount: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.78,
  },
  currentBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 8,
  },
  currentBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    marginLeft: 3,
  },
  collectionBanner: {
    minHeight: 104,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  collectionBannerText: {
    flex: 1,
    paddingRight: 12,
  },
  collectionBannerTitle: {
    fontSize: 22,
    fontWeight: "800",
  },
  collectionBannerCount: {
    fontSize: 13,
    marginTop: 5,
    opacity: 0.8,
  },
  collectionSwatches: {
    width: 72,
    flexDirection: "row",
    alignItems: "center",
  },
  collectionSwatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  collectionSwatchOverlap: {
    marginLeft: -17,
  },
  themeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  themeItem: {
    width: "48%",
    minHeight: 118,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  themeColorPreview: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  themeColorSecondary: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  themeName: {
    minHeight: 36,
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  selectedThemeName: {
    fontWeight: "800",
  },
  selectedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 23,
    height: 23,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
