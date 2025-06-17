import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
  useMetricUnits: boolean;
  usePseudoJoules: boolean;
  bodyWeight: number;
  version: number; // Add version tracking
  toggleUseMetricUnits: () => void;
  toggleUsePseudoJoules: () => void;
  setBodyWeight: (weight: number) => void;
  resetSettings: () => void; // Add reset function
}

// Current version of the store schema
const CURRENT_VERSION = 1;

// Default settings
const DEFAULT_SETTINGS = {
  useMetricUnits: false,
  usePseudoJoules: false,
  bodyWeight: 0, // Default to 0 to indicate not set
  version: CURRENT_VERSION,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      
      toggleUseMetricUnits: () => set((state) => ({ useMetricUnits: !state.useMetricUnits })),
      toggleUsePseudoJoules: () => set((state) => ({ usePseudoJoules: !state.usePseudoJoules })),
      setBodyWeight: (weight) => set({ bodyWeight: weight }),
      
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: "power-level-settings",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state && (!state.version || state.version < CURRENT_VERSION)) {
          // Reset to defaults if version mismatch
          Object.assign(state, DEFAULT_SETTINGS);
        }
      },
    }
  )
);