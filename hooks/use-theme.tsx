import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, ThemeName } from "@/constants/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the theme type
type Theme = typeof themes.WarriorsAura;

type ThemeContextType = {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
};

// Create context with default values
const defaultTheme = themes.WarriorsAura;

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeName: "WarriorsAura",
  setThemeName: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>("WarriorsAura");
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themeName");
        if (savedTheme && Object.keys(themes).includes(savedTheme)) {
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
      await AsyncStorage.setItem("themeName", name);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setThemeName: handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);