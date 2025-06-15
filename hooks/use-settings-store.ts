import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
  useMetricUnits: boolean;
  usePseudoJoules: boolean;
  bodyWeight: number;
  toggleUseMetricUnits: () => void;
  toggleUsePseudoJoules: () => void;
  setBodyWeight: (weight: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      useMetricUnits: false,
      usePseudoJoules: false,
      bodyWeight: 70, // Default body weight in kg
      
      toggleUseMetricUnits: () => set((state) => ({ useMetricUnits: !state.useMetricUnits })),
      toggleUsePseudoJoules: () => set((state) => ({ usePseudoJoules: !state.usePseudoJoules })),
      setBodyWeight: (weight) => set({ bodyWeight: weight }),
    }),
    {
      name: "power-level-settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);