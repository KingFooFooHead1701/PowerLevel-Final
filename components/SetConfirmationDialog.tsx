// components/SetConfirmationDialog.tsx

import React, { useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";
import { Audio } from "expo-av";          // ← make sure this is expo-av
import { X } from "lucide-react-native";

interface SetConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  set: {
    reps: number;
    weight: number;
    joules: number;
    distance?: number;
    speed?: number;
    incline?: number;
    duration?: number;
  } | null;
  exercise: {
    name: string;
    isCardio?: boolean;
    isIsometric?: boolean;
  };
  useMetricUnits: boolean;
  totalJoules: number;
}

export default function SetConfirmationDialog({
  visible,
  onClose,
  set,
  exercise,
  useMetricUnits,
  totalJoules,
}: SetConfirmationDialogProps) {
  const { theme } = useTheme();

  // play the hammer-tink whenever the dialog opens
  useEffect(() => {
    let soundObject: Audio.Sound;
    if (visible) {
      (async () => {
        try {
          const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/hammertink.mp3")  // ← correct relative path
          );
          soundObject = sound;
          await soundObject.playAsync();
        } catch (err) {
          console.warn("Error loading or playing sound:", err);
        }
      })();
    }
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [visible]);

  if (!set) return null;

  const { abbreviated: setEnergy, full: setEnergyFull } = formatEnergy(set.joules);
  const { abbreviated: totalEnergy } = formatEnergy(totalJoules);
  const isTreadmill = exercise.name.toLowerCase().includes("treadmill");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Set Logged!</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={[styles.exerciseName, { color: theme.text }]}>
              {exercise.name}
            </Text>

            {exercise.isCardio ? (
              <View style={styles.setDetails}>
                <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                  Distance: {set.distance} {useMetricUnits ? "km" : "miles"}
                </Text>
                <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                  Speed: {set.speed} {useMetricUnits ? "km/h" : "mph"}
                </Text>
                {isTreadmill && set.incline !== undefined && (
                  <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                    Incline: {set.incline}%
                  </Text>
                )}
                {set.reps > 0 && (
                  <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                    Reps: {set.reps}
                  </Text>
                )}
              </View>
            ) : exercise.isIsometric ? (
              <View style={styles.setDetails}>
                <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                  Duration: {set.duration} seconds
                </Text>
              </View>
            ) : (
              <View style={styles.setDetails}>
                <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                  {set.reps} reps × {set.weight} {useMetricUnits ? "kg" : "lbs"}
                </Text>
              </View>
            )}

            <View style={styles.energyContainer}>
              <Text style={[styles.energyLabel, { color: theme.textSecondary }]}>
                Energy Generated:
              </Text>
              <Text style={[styles.energyValue, { color: theme.primary }]}>
                {setEnergy}
              </Text>
              <Text style={[styles.energyFull, { color: theme.textSecondary }]}>
                {setEnergyFull}
              </Text>
            </View>

            <View style={[styles.totalContainer, { backgroundColor: theme.backgroundSecondary }]}>
              <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>
                Total Power Level:
              </Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>
                {totalEnergy}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.closeFullButton, { backgroundColor: theme.primary }]}
            onPress={onClose}
          >
            <Text style={styles.closeFullButtonText}>Continue</Text>
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
    width: "100%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: "700" },
  closeButton: { padding: 4 },
  modalBody: { width: "100%", alignItems: "center" },
  exerciseName: { fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  setDetails: { alignItems: "center", marginBottom: 16 },
  detailText: { fontSize: 16, marginBottom: 4, textAlign: "center" },
  energyContainer: { alignItems: "center", marginVertical: 16, width: "100%" },
  energyLabel: { fontSize: 14, marginBottom: 4 },
  energyValue: { fontSize: 32, fontWeight: "700", marginBottom: 4 },
  energyFull: { fontSize: 12 },
  totalContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  totalLabel: { fontSize: 14, marginBottom: 4 },
  totalValue: { fontSize: 24, fontWeight: "700" },
  closeFullButton: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  closeFullButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
