import React, { useRef, useEffect } from "react";
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
  scrollToToday?: boolean;
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

// Helper function to get all days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export default function RecentDaysStrip({
  selectedDate,
  datesWithData,
  onSelectDate,
  scrollToToday = false
}: RecentDaysStripProps) {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const todayRef = useRef<TouchableOpacity>(null);
  const todayIndex = useRef<number>(-1);
  
  // Generate array of all days in the current month
  const generateMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    
    return days;
  };
  
  const monthDays = generateMonthDays();
  
  // Scroll to today when the component mounts or when scrollToToday changes
  useEffect(() => {
    if (scrollToToday && scrollViewRef.current && todayIndex.current >= 0) {
      // Use a timeout to ensure the scroll happens after layout
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: todayIndex.current * 68, // 60px width + 8px margin
          animated: true
        });
      }, 100);
    }
  }, [scrollToToday]);
  
  // Format day name and date
  const formatDayPill = (date: Date, index: number) => {
    const isToday = isSameDay(date, new Date());
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = date.getDate();
    
    // Store the index of today for scrolling
    if (isToday) {
      todayIndex.current = index;
    }
    
    return (
      <TouchableOpacity
        key={date.toISOString()}
        ref={isToday ? todayRef : null}
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
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {monthDays.map((date, index) => formatDayPill(date, index))}
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