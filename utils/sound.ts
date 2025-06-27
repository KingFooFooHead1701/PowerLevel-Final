// utils/sound.ts
import { Audio } from "expo-av";

export async function playSound(asset: any) {
  try {
    const { sound } = await Audio.Sound.createAsync(asset);
    await sound.playAsync();
    // automatically unload when playback finishes:
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync().catch(() => {});
      }
    });
  } catch (err) {
    console.warn("Unable to play sound:", err);
  }
}
