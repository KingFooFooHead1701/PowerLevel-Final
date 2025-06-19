import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAchievementStore } from "./use-achievement-store";

interface SettingsState {
  useMetricUnits: boolean;
  usePseudoJoules: boolean;
  bodyWeight: number;
  soundEnabled: boolean;
  version: number; // Add version tracking
  toggleUseMetricUnits: () => void;
  toggleUsePseudoJoules: () => void;
  toggleSound: () => void;
  setBodyWeight: (weight: number) => void;
  resetSettings: () => void; // Add reset function
}

// Current version of the store schema - increment this when making changes to force a reset
const CURRENT_VERSION = 4; // Incremented to force reset

// Default settings
const DEFAULT_SETTINGS = {
  useMetricUnits: false,
  usePseudoJoules: false,
  bodyWeight: 0, // Default to 0 to indicate not set
  soundEnabled: true,
  version: CURRENT_VERSION,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,
      
      toggleUseMetricUnits: () => {
        const { setLastUnitSetting } = useAchievementStore.getState();
        const currentSetting = get().useMetricUnits;
        
        // Store the current setting before changing it
        setLastUnitSetting(currentSetting);
        
        set((state) => ({ useMetricUnits: !state.useMetricUnits }));
      },
      
      toggleUsePseudoJoules: () => set((state) => ({ usePseudoJoules: !state.usePseudoJoules })),
      
      toggleSound: () => {
        const { setSoundToggled } = useAchievementStore.getState();
        setSoundToggled(true);
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },
      
      setBodyWeight: (weight) => set({ bodyWeight: weight }),
      
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: "power-level-settings",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state && (!state.version || state.version < CURRENT_VERSION)) {
          // Reset to defaults if version mismatch
          console.log("Settings version mismatch, resetting to defaults");
          Object.assign(state, DEFAULT_SETTINGS);
        }
      },
    }
  )
);