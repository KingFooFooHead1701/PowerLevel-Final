// components/AchievementNotifier.tsx
import React, { useEffect, useRef, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useAchievementStore } from "@/hooks/use-achievement-store";
import { achievements } from "@/constants/achievements";

export default function AchievementNotifier() {
  const { sets } = useExerciseStore();
  const evaluateAchievements = useAchievementStore(s => s.evaluateAchievements);
  const unlockedIds         = useAchievementStore(s => s.unlockedIds);

  const [didInit, setDidInit] = useState(false);
  const prevUnlockedRef = useRef<string[]>([]);

  // Re-run your unlock logic any time data changes
  useEffect(() => {
    evaluateAchievements();
  }, [evaluateAchievements, sets]);

  // Watch unlockedIds; the first time we see a non-empty list, just seed and bail.
  useEffect(() => {
    // If we haven’t seeded yet…
    if (!didInit) {
      // Once the store has loaded its persisted achievements
      if (unlockedIds.length > 0) {
        prevUnlockedRef.current = unlockedIds; // seed
        setDidInit(true);
      }
      return;
    }

    // Now only show toasts for IDs added after seeding
    const newOnes = unlockedIds.filter(id => !prevUnlockedRef.current.includes(id));
    if (newOnes.length === 0) return;

    // **Immediately** update our “seen” list so reload won’t retrigger these
    prevUnlockedRef.current = unlockedIds;

    const queue = newOnes
      .map(id => achievements.find(a => a.id === id))
      .filter((a): a is typeof achievements[0] => Boolean(a));

    const showNext = (i: number) => {
      if (i >= queue.length) return;
      const a = queue[i]!;
      showMessage({
        message:      a.title,
        description:  a.description,
        type:         "success",
        floating:     true,
        position:     "top",
        duration:     3000,
        style: {
          marginTop:       80,   // your preferred drop distance
          paddingVertical: 16,
          borderRadius:    8,
        },
        titleStyle: { fontSize: 18 },
        textStyle:  { fontSize: 14 },
        onHide:    () => setTimeout(() => showNext(i + 1), 200),
      });
    };

    showNext(0);
  }, [unlockedIds, didInit]);

  return null;
}
