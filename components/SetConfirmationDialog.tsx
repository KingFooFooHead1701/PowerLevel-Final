import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";
import { Exercise } from "@/constants/exercises";
import { Set } from "@/hooks/use-exercise-store";
import { Audio } from "expo-av";
import { Platform } from "react-native";

interface SetConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  set: Set | null;
  exercise: Exercise | null;
  useMetricUnits: boolean;
  totalJoules: number;
}

// Array of confirmation messages
const CONFIRMATION_MESSAGES = [
  {
    title: "💪 Set Logged!",
    message: "You just crushed {reps} reps at {weight} {unit} of {exercise}—that's {energy} J added to your total!"
  },
  {
    title: "High-Five! 🖐",
    message: "{reps}×{weight} {unit} on {exercise} recorded. You've earned {energy} J—keep that power level rising!"
  },
  {
    title: "Set Added",
    message: "{exercise}: {reps} reps @ {weight} {unit} → +{energy} J"
  },
  {
    title: "Nice Work!",
    message: "+{energy} J to your Power Level. You're now at {total_energy} {best_unit} toward your next milestone!"
  },
  {
    title: "Great job!",
    message: "Great job on those {reps} reps at {weight} {unit}! I just tallied {energy} joules—you're one step closer to that next big milestone."
  },
  {
    title: "+{energy} J",
    message: "✓ {reps}×{weight} {unit} ({exercise})"
  },
  {
    title: "+{energy} XP!",
    message: "{exercise} set complete—level up your power bar!"
  },
  {
    title: "You did it!",
    message: "{reps} reps @ {weight} {unit} done. That's {energy} J more in the bank."
  },
  {
    title: "Set Recorded",
    message: "{exercise} – {reps}×{weight} → +{energy} J"
  },
  {
    title: "Milestone Update",
    message: "{exercise} set added! You're making great progress."
  },
  {
    title: "Beast Mode Engaged!",
    message: "You smashed {reps}×{weight} {unit} of {exercise}—that's {energy} J toward your next breakthrough!"
  },
  {
    title: "Power Surge!",
    message: "{energy} J added! Your current Power Level is {total_energy} J—keep charging!"
  },
  {
    title: "That's How Champions Train!",
    message: "{reps} reps at {weight} {unit} logged. You're forging strength and racking up {energy} J!"
  },
  {
    title: "Crush It!",
    message: "You just conquered {exercise} with {reps} reps @ {weight} {unit}—{energy} J earned. Onward!"
  },
  {
    title: "Next-Level Strength!",
    message: "Set recorded: {reps}×{weight} {unit} → +{energy} J. Your Power Level is unstoppable!"
  },
  {
    title: "Feel the Burn, See the Growth!",
    message: "{exercise} set done. {energy} J fuel for your warrior's journey."
  },
  {
    title: "Strength Unleashed!",
    message: "Logged {reps} reps @ {weight} {unit}—{energy} J more energy in the bank!"
  },
  {
    title: "Unstoppable Force!",
    message: "Boom—{energy} J added. Your Power Level now sits at {total_energy} J!"
  },
  {
    title: "You're on Fire!",
    message: "That's {reps}×{weight} {unit} in the books—{energy} J power-up complete!"
  },
  {
    title: "Every Rep Counts!",
    message: "{exercise}: {reps} reps @ {weight} {unit} → +{energy} J. Keep stacking wins!"
  },
  {
    title: "Warrior's Progress!",
    message: "You've fortified your Power Level with {energy} J—you're getting stronger every set."
  },
  {
    title: "Power Up Achieved!",
    message: "Set logged: {reps}×{weight} {unit}, earning {energy} J toward your next milestone."
  },
  {
    title: "Victory in Motion!",
    message: "{exercise} conquered—{reps} reps @ {weight} {unit}, that's {energy} J more!"
  },
  {
    title: "Rise and Grind!",
    message: "You logged {reps}×{weight} {unit}—{energy} J just added to your arsenal."
  },
  {
    title: "Strength in Numbers!",
    message: "{energy} J more on your Power Meter. {total_energy} J and counting!"
  },
  {
    title: "Pure Power!",
    message: "Logged {reps}×{weight} {unit} of {exercise}—you just banked {energy} J!"
  },
  {
    title: "Be Unstoppable!",
    message: "{exercise} set recorded: {reps} reps @ {weight} {unit} → +{energy} J."
  },
  {
    title: "Next Rep, Next Reward!",
    message: "You crushed {reps}×{weight} {unit}—that's {energy} J toward greatness!"
  },
  {
    title: "Steel Resolve!",
    message: "{reps} reps at {weight} {unit} locked in—{energy} J added to your arsenal."
  },
  {
    title: "Power on Demand!",
    message: "Just logged {exercise}: {reps}×{weight} {unit} → +{energy} J. Keep it coming!"
  }
];

export default function SetConfirmationDialog({
  visible,
  onClose,
  set,
  exercise,
  useMetricUnits,
  totalJoules
}: SetConfirmationDialogProps) {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Play confirmation sound when dialog becomes visible
    if (visible && set) {
      playConfirmationSound();
    }
  }, [visible]);
  
  // Play confirmation sound - using hammertink.mp3 instead of beep.mp3
  const playConfirmationSound = async () => {
    if (Platform.OS !== "web") {
      try {
        try {
          const { sound } = await Audio.Sound.createAsync(
            require('@/assets/sounds/hammertink.mp3')
          );
          await sound.playAsync();
          
          // Unload sound when done
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.isPlaying === false && status.positionMillis > 0) {
              sound.unloadAsync();
            }
          });
        } catch (error) {
          console.log("Error playing confirmation sound:", error);
        }
      } catch (error) {
        console.log("Error playing confirmation sound:", error);
      }
    }
  };
  
  if (!set || !exercise) return null;
  
  // Select a random message
  const randomIndex = Math.floor(Math.random() * CONFIRMATION_MESSAGES.length);
  const selectedMessage = CONFIRMATION_MESSAGES[randomIndex];
  
  // Format the energy values
  const energyFormatted = formatEnergy(set.joules);
  const totalEnergyFormatted = formatEnergy(totalJoules);
  
  // Replace placeholders in the message
  const formatMessage = (text: string) => {
    return text
      .replace("{reps}", set.reps.toString())
      .replace("{weight}", set.weight.toString())
      .replace("{unit}", useMetricUnits ? "kg" : "lbs")
      .replace("{exercise}", exercise.name)
      .replace("{energy}", energyFormatted.abbreviated)
      .replace("{total_energy}", totalEnergyFormatted.abbreviated)
      .replace("{best_unit}", totalEnergyFormatted.abbreviated.split(" ")[1]);
  };
  
  const title = formatMessage(selectedMessage.title);
  const message = formatMessage(selectedMessage.message);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
          
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});