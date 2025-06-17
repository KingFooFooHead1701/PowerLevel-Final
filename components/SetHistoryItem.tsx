import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";
import { Trash2, Clock } from "lucide-react-native";

interface SetHistoryItemProps {
  set: {
    id: string;
    reps: number;
    weight: number;
    joules: number;
    date: string;
    duration?: number;
    distance?: number;
    speed?: number;
  };
  useMetricUnits: boolean;
  onDelete: () => void;
  isCardio?: boolean;
  isIsometric?: boolean;
}

export default function SetHistoryItem({ 
  set, 
  useMetricUnits, 
  onDelete,
  isCardio,
  isIsometric
}: SetHistoryItemProps) {
  const { theme } = useTheme();
  const { abbreviated } = formatEnergy(set.joules);
  
  const date = new Date(set.date);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {formattedDate} at {formattedTime}
        </Text>
        <TouchableOpacity onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Trash2 size={18} color={theme.error} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {isCardio || isIsometric ? (
          <>
            {set.duration && (
              <View style={styles.dataRow}>
                <Clock size={16} color={theme.textSecondary} style={styles.icon} />
                <Text style={[styles.dataText, { color: theme.text }]}>
                  Duration: {formatDuration(set.duration)}
                </Text>
              </View>
            )}
            
            {isCardio && set.distance && (
              <View style={styles.dataRow}>
                <Text style={[styles.dataText, { color: theme.text }]}>
                  Distance: {set.distance} {useMetricUnits ? "km" : "miles"}
                </Text>
              </View>
            )}
            
            {isCardio && set.speed && set.speed > 0 && (
              <View style={styles.dataRow}>
                <Text style={[styles.dataText, { color: theme.text }]}>
                  Speed: {set.speed} {useMetricUnits ? "km/h" : "mph"}
                </Text>
              </View>
            )}
            
            {set.reps > 0 && (
              <View style={styles.dataRow}>
                <Text style={[styles.dataText, { color: theme.text }]}>
                  Reps: {set.reps}
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            <Text style={[styles.dataText, { color: theme.text }]}>
              {set.reps} reps × {set.weight} {useMetricUnits ? "kg" : "lbs"}
            </Text>
          </>
        )}
        
        <Text style={[styles.energyText, { color: theme.primary }]}>
          {abbreviated}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  dataText: {
    fontSize: 16,
    fontWeight: "500",
  },
  energyText: {
    fontSize: 18,
    fontWeight: "600",
  },
});