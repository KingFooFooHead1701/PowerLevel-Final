import React, { useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { X } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";

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
    watts?: number;
    assistance?: number;
    verticalDistance?: number;
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
  const hammerPlayer = useAudioPlayer(
    require("../assets/sounds/hammertink.mp3"),
  );

  useEffect(() => {
    if (!visible) return;
    (async () => {
      try {
        await hammerPlayer.seekTo(0);
        hammerPlayer.play();
      } catch (error) {
        console.warn("Error playing sound:", error);
      }
    })();
  }, [visible, hammerPlayer]);

  if (!set) return null;

  const weightUnit = useMetricUnits ? "kg" : "lb";
  const distanceUnit = useMetricUnits ? "km" : "mi";
  const speedUnit = useMetricUnits ? "km/h" : "mph";
  const verticalUnit = useMetricUnits ? "m" : "ft";
  const { abbreviated: setEnergy, full: setEnergyFull } = formatEnergy(
    set.joules,
  );
  const { abbreviated: totalEnergy } = formatEnergy(totalJoules);

  const details: string[] = [];
  if (set.reps > 0) details.push(`${set.reps} reps`);
  if (set.weight > 0) details.push(`Load: ${set.weight} ${weightUnit}`);
  if (set.duration && set.duration > 0)
    details.push(`Duration: ${set.duration} sec`);
  if (set.distance && set.distance > 0)
    details.push(`Distance: ${set.distance} ${distanceUnit}`);
  if (set.speed && set.speed > 0)
    details.push(`Speed: ${set.speed} ${speedUnit}`);
  if (set.incline !== undefined && set.incline !== 0)
    details.push(`Grade: ${set.incline}%`);
  if (set.watts && set.watts > 0) details.push(`Average power: ${set.watts} W`);
  if (set.assistance && set.assistance > 0)
    details.push(`Assistance: ${set.assistance} ${weightUnit}`);
  if (set.verticalDistance && set.verticalDistance > 0)
    details.push(`Vertical: ${set.verticalDistance} ${verticalUnit}`);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Activity Logged!
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={[styles.exerciseName, { color: theme.text }]}>
              {exercise.name}
            </Text>

            <View style={styles.setDetails}>
              {details.map((detail) => (
                <Text
                  key={detail}
                  style={[styles.detailText, { color: theme.textSecondary }]}
                >
                  {detail}
                </Text>
              ))}
            </View>

            <View style={styles.energyContainer}>
              <Text
                style={[styles.energyLabel, { color: theme.textSecondary }]}
              >
                Energy Generated:
              </Text>
              <Text style={[styles.energyValue, { color: theme.primary }]}>
                {setEnergy}
              </Text>
              <Text
                style={[styles.energyFull, { color: theme.textSecondary }]}
              >
                {setEnergyFull}
              </Text>
            </View>

            <View
              style={[
                styles.totalContainer,
                { backgroundColor: theme.backgroundSecondary },
              ]}
            >
              <Text
                style={[styles.totalLabel, { color: theme.textSecondary }]}
              >
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
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  setDetails: { alignItems: "center", marginBottom: 8 },
  detailText: { fontSize: 15, marginBottom: 4, textAlign: "center" },
  energyContainer: {
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
  },
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
