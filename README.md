# Power Level App

A fitness tracking app that gamifies your workout progress by converting exercise energy into power levels.

## Sound Effects

The app uses sound effects to enhance the user experience. To replace the placeholder sound files with your own:

1. Create a folder named `assets/sounds` in your project if it doesn't already exist
2. Add your own audio files with these exact names:
   - `beep.mp3` - Used for scanner animation and set confirmation
   - `chirp.mp3` - Used for power level reveal
   - `thump.mp3` - Used for milestone celebration

**Important Notes:**
- Sound files should be in MP3 format
- Keep file sizes small (under 100KB) for better performance
- Sound effects are disabled on web platform
- Make sure the files are in the correct location: `/assets/sounds/`
- The app will look for these specific filenames, so name your files exactly as shown above

## How to Add Your Own Sound Files

1. Create the sound files with the names mentioned above
2. Place them in the `/assets/sounds/` directory
3. Rebuild the app

If you're using Expo Go, you'll need to rebuild the app with the new sound files included.

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