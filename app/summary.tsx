import React, { useEffect, useState, useCallback } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { formatDate, isToday } from "@/utils/date-utils";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react-native";
import DatePicker from "@/components/DatePicker";
import RecentDaysStrip from "@/components/RecentDaysStrip";

interface ExerciseSummary {
  exerciseId: string;
  exerciseName: string;
  sets: Array<{
    id: string;
    reps: number;
    weight: number;
    date: string;
  }>;
  totalWeight: number;
}

export default function SummaryScreen() {
  const { theme } = useTheme();
  const { exercises, sets } = useExerciseStore();
  const { useMetricUnits } = useSettingsStore();
  
  // Date state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [exerciseSummary, setExerciseSummary] = useState<ExerciseSummary[]>([]);
  const [allTimeTotal, setAllTimeTotal] = useState(0);
  const [datesWithData, setDatesWithData] = useState<Date[]>([]);
  
  // Format selected date
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get all dates with workout data
  useEffect(() => {
    const uniqueDates = new Set<string>();
    
    sets.forEach(set => {
      const date = new Date(set.date);
      const dateString = date.toISOString().split('T')[0];
      uniqueDates.add(dateString);
    });
    
    const datesArray = Array.from(uniqueDates).map(dateString => new Date(dateString));
    datesArray.sort((a, b) => b.getTime() - a.getTime()); // Sort newest to oldest
    
    setDatesWithData(datesArray);
  }, [sets]);
  
  // Update summary when selected date changes
  useEffect(() => {
    updateSummaryForDate(selectedDate);
  }, [selectedDate, sets, exercises]);
  
  // Update summary for a specific date
  const updateSummaryForDate = useCallback((date: Date) => {
    // Get start and end of the selected date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Filter sets for the selected date
    const dateSets = sets.filter(set => {
      const setDate = new Date(set.date);
      return setDate >= startOfDay && setDate <= endOfDay;
    });
    
    // Group sets by exercise
    const exerciseMap = new Map<string, ExerciseSummary>();
    
    // Track the order of first appearance
    const exerciseOrder: string[] = [];
    
    dateSets.forEach(set => {
      const exercise = exercises.find(e => e.id === set.exerciseId);
      if (!exercise) return;
      
      if (!exerciseMap.has(set.exerciseId)) {
        exerciseMap.set(set.exerciseId, {
          exerciseId: set.exerciseId,
          exerciseName: exercise.name,
          sets: [],
          totalWeight: 0
        });
        exerciseOrder.push(set.exerciseId);
      }
      
      const summary = exerciseMap.get(set.exerciseId)!;
      summary.sets.push({
        id: set.id,
        reps: set.reps,
        weight: set.weight,
        date: set.date
      });
      
      // Add to the exercise total (weight × reps)
      summary.totalWeight += set.weight * set.reps;
    });
    
    // Convert map to array, preserving first appearance order
    const summaryArray = exerciseOrder.map(id => exerciseMap.get(id)!);
    
    // Sort sets within each exercise by date (oldest at top)
    summaryArray.forEach(summary => {
      summary.sets.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    
    setExerciseSummary(summaryArray);
    
    // Calculate all-time total
    const total = sets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
    setAllTimeTotal(total);
  }, [sets, exercises]);
  
  // Navigation functions
  const goToToday = () => {
    setSelectedDate(new Date());
  };
  
  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  
  // Format weight based on user's unit preference
  const formatWeight = (weight: number) => {
    return `${weight} ${useMetricUnits ? 'kg' : 'lbs'}`;
  };
  
  // Format total weight with commas for thousands
  const formatTotalWeight = (weight: number) => {
    return `${weight.toLocaleString()} ${useMetricUnits ? 'kg' : 'lbs'}`;
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Daily Summary</Text>
        
        <View style={styles.dateContainer}>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.date, { color: theme.textSecondary }]}>{formattedDate}</Text>
            <Calendar size={20} color={theme.textSecondary} style={styles.calendarIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: theme.cardBackground }]}
            onPress={goToPreviousDay}
          >
            <ChevronLeft size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          
          {!isToday(selectedDate.toISOString()) && (
            <TouchableOpacity 
              style={[styles.todayButton, { backgroundColor: theme.primary }]}
              onPress={goToToday}
            >
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.navButton, { backgroundColor: theme.cardBackground }]}
            onPress={goToNextDay}
          >
            <ChevronRight size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <RecentDaysStrip 
        selectedDate={selectedDate}
        datesWithData={datesWithData}
        onSelectDate={setSelectedDate}
      />
      
      <View style={styles.contentWrapper}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollViewContent}
          scrollEnabled={true}
          horizontal={false}
          directionalLockEnabled={true} // Lock to vertical scrolling only
          scrollEventThrottle={16}
        >
          {exerciseSummary.length > 0 ? (
            <>
              {exerciseSummary.map((summary) => (
                <View 
                  key={summary.exerciseId} 
                  style={[styles.exerciseCard, { backgroundColor: theme.cardBackground }]}
                >
                  <Text style={[styles.exerciseName, { color: theme.text }]}>
                    {summary.exerciseName}
                  </Text>
                  
                  {summary.sets.map((set, index) => (
                    <View 
                      key={set.id} 
                      style={[
                        styles.setRow, 
                        index < summary.sets.length - 1 && { 
                          borderBottomWidth: 1, 
                          borderBottomColor: theme.border 
                        }
                      ]}
                    >
                      <Text style={[styles.setNumber, { color: theme.textSecondary }]}>
                        Set {index + 1}
                      </Text>
                      <Text style={[styles.setReps, { color: theme.text }]}>
                        {set.reps} reps
                      </Text>
                      <Text style={[styles.setWeight, { color: theme.text }]}>
                        {formatWeight(set.weight)}
                      </Text>
                    </View>
                  ))}
                  
                  <View style={styles.exerciseTotalRow}>
                    <Text style={[styles.exerciseTotal, { color: theme.primary }]}>
                      Total for {summary.exerciseName}: {formatTotalWeight(summary.totalWeight)}
                    </Text>
                  </View>
                </View>
              ))}
              
              <View style={[styles.allTimeCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.allTimeLabel, { color: theme.textSecondary }]}>
                  All-Time Total Weight Lifted
                </Text>
                <Text style={[styles.allTimeTotal, { color: theme.primary }]}>
                  {formatTotalWeight(allTimeTotal)}
                </Text>
              </View>
            </>
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                {isToday(selectedDate.toISOString()) 
                  ? "No exercises logged today. Head over to the Exercises tab to start logging your sets!"
                  : `No exercises logged on ${selectedDate.toLocaleDateString()}.`
                }
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      
      {/* Date Picker Modal */}
      <DatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelectDate={handleDateSelect}
        selectedDate={selectedDate}
        datesWithData={datesWithData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 16,
  },
  calendarIcon: {
    marginLeft: 8,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  todayButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  contentWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 40,
  },
  exerciseCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
    paddingBottom: 12,
  },
  setRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  setNumber: {
    width: 60,
    fontSize: 14,
  },
  setReps: {
    flex: 1,
    fontSize: 16,
  },
  setWeight: {
    fontSize: 16,
    fontWeight: "500",
  },
  exerciseTotalRow: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  exerciseTotal: {
    fontSize: 16,
    fontWeight: "600",
  },
  allTimeCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    alignItems: "center",
  },
  allTimeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  allTimeTotal: {
    fontSize: 28,
    fontWeight: "bold",
  },
  emptyState: {
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});