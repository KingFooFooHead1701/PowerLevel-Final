import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SettingsState {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
  unitSystem: "metric" | "imperial";
  
  // Actions
  toggleSound: () => void;
  toggleVibration: () => void;
  toggleNotifications: () => void;
  setUnitSystem: (system: "metric" | "imperial") => void;
  resetSettings: () => void;
}

// Default settings
const DEFAULT_SETTINGS = {
  soundEnabled: true,
  vibrationEnabled: true,
  notificationsEnabled: true,
  unitSystem: "metric" as const,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      
      // Toggle sound
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      
      // Toggle vibration
      toggleVibration: () => set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
      
      // Toggle notifications
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      
      // Set unit system
      setUnitSystem: (system) => set({ unitSystem: system }),
      
      // Reset settings to defaults
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: "fitness-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);