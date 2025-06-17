import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { formatEnergy } from "@/utils/energy-utils";
import { formatDate } from "@/utils/date-utils";
import { Trash2, Clock } from "lucide-react-native";
import { Set } from "@/hooks/use-exercise-store";

interface SetHistoryItemProps {
  set: Set;
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
  
  const formatDuration = (seconds: number | undefined): string => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDistance = (distance: number | undefined): string => {
    if (!distance) return "N/A";
    return `${distance} ${useMetricUnits ? "km" : "mi"}`;
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {formatDate(set.date)}
          </Text>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={onDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Trash2 size={18} color={theme.error} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.details}>
          {(isCardio || isIsometric) ? (
            <>
              {set.duration && set.duration > 0 && (
                <View style={styles.detailItem}>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {formatDuration(set.duration)}
                  </Text>
                  <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                    Duration
                  </Text>
                </View>
              )}
              
              {isCardio && set.distance && set.distance > 0 && (
                <View style={styles.detailItem}>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {formatDistance(set.distance)}
                  </Text>
                  <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                    Distance
                  </Text>
                </View>
              )}
              
              {set.reps > 0 && (
                <View style={styles.detailItem}>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {set.reps}
                  </Text>
                  <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                    Reps
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.detailItem}>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {set.reps}
                </Text>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                  Reps
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {set.weight} {useMetricUnits ? "kg" : "lbs"}
                </Text>
                <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                  Weight
                </Text>
              </View>
            </>
          )}
          
          <View style={styles.detailItem}>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {formatEnergy(set.joules).abbreviated}
            </Text>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
              Energy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
    marginRight: -8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
  },
});