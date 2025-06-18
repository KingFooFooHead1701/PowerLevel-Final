import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeName } from "@/constants/themes";

interface SettingsState {
  useMetricUnits: boolean;
  bodyWeight: number;
  themeName: ThemeName;
  soundEnabled: boolean;
  
  // Actions
  setUseMetricUnits: (useMetric: boolean) => void;
  setBodyWeight: (weight: number) => void;
  setThemeName: (themeName: ThemeName) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      useMetricUnits: true,
      bodyWeight: 0,
      themeName: "WarriorsAura",
      soundEnabled: true,
      
      setUseMetricUnits: (useMetric) => set({ useMetricUnits: useMetric }),
      setBodyWeight: (weight) => set({ bodyWeight: weight }),
      setThemeName: (themeName) => set({ themeName }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
    }),
    {
      name: "fitness-tracker-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);