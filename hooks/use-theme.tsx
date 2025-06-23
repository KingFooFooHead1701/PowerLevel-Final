// hooks/use-theme.tsx
// ————————————————————————————————————————
// Polyfill for ISO week number (used later in this file)
// Source: https://stackoverflow.com/a/6117889
declare global {
  interface Date {
    getWeek?(): number;
  }
}
if (!Date.prototype.getWeek) {
  Date.prototype.getWeek = function (): number {
    const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    // Thursday in current week decides the year.
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to the date
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  };
}
// ————————————————————————————————————————

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, ThemeName } from "@/constants/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the theme type
type Theme = typeof themes.WarriorsAura;

type ThemeContextType = {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  resetTheme: () => void; // Add reset function
};

// Create context with default values
const defaultTheme = themes.WarriorsAura;
const DEFAULT_THEME_NAME = "WarriorsAura";
const THEME_STORAGE_KEY = "app-theme-name";
const THEME_VERSION_KEY = "app-theme-version";
const CURRENT_THEME_VERSION = 4; // Incremented to force a theme reset

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeName: DEFAULT_THEME_NAME,
  setThemeName: () => {},
  resetTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Check theme version
        const themeVersion = await AsyncStorage.getItem(THEME_VERSION_KEY);
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        
        // If version mismatch or no version, reset to default
        if (!themeVersion || parseInt(themeVersion) < CURRENT_THEME_VERSION) {
          console.log("Theme version mismatch, resetting to default");
          await resetThemeStorage();
        } 
        // Otherwise load saved theme if valid
        else if (savedTheme && Object.keys(themes).includes(savedTheme)) {
          setThemeName(savedTheme as ThemeName);
          setTheme(themes[savedTheme as ThemeName]);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadTheme();
  }, []);
  
  const handleSetTheme = async (name: ThemeName) => {
    setThemeName(name);
    setTheme(themes[name]);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, name);
      await AsyncStorage.setItem(THEME_VERSION_KEY, CURRENT_THEME_VERSION.toString());
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };
  
  const resetThemeStorage = async () => {
    try {
      await AsyncStorage.removeItem(THEME_STORAGE_KEY);
      await AsyncStorage.setItem(THEME_VERSION_KEY, CURRENT_THEME_VERSION.toString());
      setThemeName(DEFAULT_THEME_NAME);
      setTheme(defaultTheme);
    } catch (error) {
      console.error("Failed to reset theme:", error);
    }
  };
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setThemeName: handleSetTheme,
        resetTheme: resetThemeStorage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);