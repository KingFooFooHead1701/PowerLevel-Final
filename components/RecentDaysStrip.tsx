import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface RecentDaysStripProps {
  selectedDate: Date;
  datesWithData: Date[];
  onSelectDate: (date: Date) => void;
}

// Helper function to check if two dates are the same day
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Helper function to check if a date has workout data
const hasWorkoutData = (date: Date, datesWithData: Date[]) => {
  return datesWithData.some(dataDate => isSameDay(dataDate, date));
};

export default function RecentDaysStrip({
  selectedDate,
  datesWithData,
  onSelectDate
}: RecentDaysStripProps) {
  const { theme } = useTheme();
  
  // Generate array of recent days (last 14 days including today)
  const generateRecentDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      days.push(date);
    }
    
    return days;
  };
  
  const recentDays = generateRecentDays();
  
  // Format day name and date
  const formatDayPill = (date: Date) => {
    const isToday = isSameDay(date, new Date());
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    
    return (
      <TouchableOpacity
        key={date.toISOString()}
        style={[
          styles.dayPill,
          { backgroundColor: theme.cardBackground },
          isSameDay(date, selectedDate) && { backgroundColor: theme.primary },
          !hasWorkoutData(date, datesWithData) && { opacity: 0.6 }
        ]}
        onPress={() => onSelectDate(date)}
      >
        <Text 
          style={[
            styles.dayName,
            { color: isSameDay(date, selectedDate) ? "#FFFFFF" : theme.textSecondary }
          ]}
        >
          {isToday ? "Today" : dayName}
        </Text>
        <Text 
          style={[
            styles.dayNumber,
            { color: isSameDay(date, selectedDate) ? "#FFFFFF" : theme.text }
          ]}
        >
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recentDays.map(date => formatDayPill(date))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dayPill: {
    width: 60,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    paddingVertical: 8,
  },
  dayName: {
    fontSize: 12,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
});