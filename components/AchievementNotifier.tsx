// components/AchievementNotifier.tsx
import React, { useEffect, useRef, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { achievements } from "@/constants/achievements";

export default function AchievementNotifier() {
  // pull in your workout data
  const { sets } = useExerciseStore();
  const { /* cardio/distance if used */ } = useSettingsStore();

  // selectors from your zustand store
  const evaluateAchievements = useAchievementStore(s => s.evaluateAchievements);
  const unlockedIds         = useAchievementStore(s => s.unlockedIds);

  // track whether we’ve done our “initial sync”
  const [didInit, setDidInit] = useState(false);
  // hold the last‐seen unlocked list
  const prevUnlockedRef = useRef<string[]>([]);

  // 1️⃣ every time your underlying data changes, re-run unlock logic
  useEffect(() => {
    evaluateAchievements();
  }, [evaluateAchievements, sets /* add other deps here */]);

  // 2️⃣ once the store’s unlockedIds updates...
  useEffect(() => {
    if (!didInit) {
      // first time only: just seed our ref, don’t toast
      prevUnlockedRef.current = unlockedIds;
      setDidInit(true);
      return;
    }

    // afterwards: figure out which IDs are brand-new
    const newOnes = unlockedIds.filter(id => !prevUnlockedRef.current.includes(id));
    newOnes.forEach(id => {
      const a = achievements.find(a => a.id === id);
      if (a) {
        showMessage({
          message: a.title,
          description: a.description,
          type: "success",
        });
      }
    });

    // then update our “last seen” list
    prevUnlockedRef.current = unlockedIds;
  }, [unlockedIds, didInit]);

  return null;
}
