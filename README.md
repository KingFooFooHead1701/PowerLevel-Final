# Power Level App

A fitness tracking app that gamifies your workout progress by converting exercise energy into power levels.

## Sound Effects

The app uses sound effects to enhance the user experience. To replace the placeholder sound files with your own:

1. Create a folder named `assets/sounds` in your project if it doesn't already exist
2. Add your own audio files with these exact names:

   * `beep.mp3` - Used for scanner animation
   * `chirp.mp3` - Used for power level reveal
   * `thump.mp3` - Used for milestone celebration
   * `hammertink.mp3` - Used for set confirmation

**Important Notes:**

* Sound files should be in MP3 format
* Keep file sizes small (under 100KB) for better performance
* Sound effects are disabled on web platform
* Make sure the files are in the correct location: `/assets/sounds/`
* The app will look for these specific filenames, so name your files exactly as shown above

## How to Add Your Own Sound Files

1. Create the sound files with the names mentioned above
2. Place them in the `/assets/sounds/` directory
3. Rebuild the app

If you're using Expo Go, you'll need to rebuild the app with the new sound files included.

## Migrating from expo-av (Future Update)

In a future update, we'll need to migrate from expo-av to expo-audio and expo-video as expo-av will be deprecated in SDK 54.

## Features

* Track exercises and sets
* Calculate energy (joules) based on weight, reps, and displacement
* Visualize progress with power levels and milestones
* Customizable themes
* Daily workout summary
* Calendar navigation
* Sound effects and haptic feedback

## Development

This app is built with React Native and Expo.

---

## Energy Conversion Accuracy

Power Level App is designed to deliver **wholly accurate and precise** conversions of your workout efforts into real joules. All underlying formulas are rooted in fundamental physics and established exercise physiology:

* **Weighted & Bodyweight Exercises**: Calculations use the classic work formula $E = m \times g \times h$ (mass × gravity × vertical displacement), combined with accurate estimates of the percentage of body mass in motion for common moves (e.g., 65% for push‑ups, 95% for pull‑ups).
* **Isometric Holds**: Energy cost is modeled by static workload over a standard duration, based on gravitational work against a constant force.
* **Cardio (Walking, Running, Treadmill)**: Uses MET (Metabolic Equivalent of Task) models from ACSM guidelines:

  1. **VO₂ Uptake**: $\text{VO₂ (L/min)} = \frac{\text{MET} \times 3.5 \times \text{body weight (kg)}}{1000}$
  2. **Total Energy**: $\text{Energy (kJ)} = \text{VO₂ (L)} \times 20 \text{kJ/L}$
  3. **Convert to Joules**: Multiply kilojoules by 1000
  4. **Incline & Vertical Work**: Adds $m \times g \times h$ for incline displacement

Every branch of calculation has been carefully reviewed to ensure your power‑level measurements reflect true physical work as closely as possible, striking the right balance between scientific rigor and ease of use.

For more details, refer to `src/utils/energy-utils.ts` where each formula is documented with the physics assumptions and sources.
