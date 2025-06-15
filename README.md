# Power Level App

A fitness tracking app that gamifies your workout progress by converting exercise energy into power levels.

## Sound Effects

The app uses sound effects to enhance the user experience. To replace the placeholder sound files with your own:

1. Navigate to the `assets/sounds` directory
2. Replace the following files with your own audio files (keep the same filenames):
   - `beep.mp3` - Used for scanner animation and set confirmation
   - `chirp.mp3` - Used for power level reveal
   - `thump.mp3` - Used for milestone celebration

**Important Notes:**
- Sound files should be in MP3 format
- Keep file sizes small (under 100KB) for better performance
- Sound effects are disabled on web platform

## Features

- Track exercises and sets
- Calculate energy (joules) based on weight, reps, and displacement
- Visualize progress with power levels and milestones
- Customizable themes
- Daily workout summary
- Calendar navigation
- Sound effects and haptic feedback

## Development

This app is built with React Native and Expo.