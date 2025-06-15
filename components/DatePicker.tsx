import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { ChevronLeft, ChevronRight, X } from "lucide-react-native";

interface DatePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  datesWithData: Date[];
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

// Helper function to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get day of week (0 = Sunday, 6 = Saturday)
const getDayOfWeek = (year: number, month: number, day: number) => {
  return new Date(year, month, day).getDay();
};

export default function DatePicker({
  visible,
  onClose,
  onSelectDate,
  selectedDate,
  datesWithData
}: DatePickerProps) {
  const { theme } = useTheme();
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  
  // Reset view date when selected date changes
  useEffect(() => {
    setViewDate(new Date(selectedDate));
  }, [selectedDate]);
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate);
    newDate.setDate(day);
    onSelectDate(newDate);
  };
  
  // Generate calendar grid
  const renderCalendarGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getDayOfWeek(year, month, 1);
    
    // Day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Generate calendar days
    const days = [];
    
    // Add day names
    dayNames.forEach(day => {
      days.push(
        <View key={`header-${day}`} style={styles.dayNameCell}>
          <Text style={[styles.dayNameText, { color: theme.textSecondary }]}>
            {day}
          </Text>
        </View>
      );
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isSameDay(date, selectedDate);
      const hasData = hasWorkoutData(date, datesWithData);
      const isToday = isSameDay(date, new Date());
      
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.dayCell,
            isSelected && { backgroundColor: theme.primary },
            isToday && !isSelected && { borderColor: theme.primary, borderWidth: 1 }
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text
            style={[
              styles.dayText,
              { color: isSelected ? "#FFFFFF" : theme.text },
              !hasData && { opacity: 0.5 }
            ]}
          >
            {day}
          </Text>
          {hasData && !isSelected && (
            <View 
              style={[
                styles.dataIndicator, 
                { backgroundColor: isToday ? theme.primary : theme.textSecondary }
              ]} 
            />
          )}
        </TouchableOpacity>
      );
    }
    
    return days;
  };
  
  // Format month and year
  const monthYearString = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Select Date</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={24} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.monthSelector}>
                <TouchableOpacity onPress={goToPreviousMonth} style={styles.monthNavButton}>
                  <ChevronLeft size={24} color={theme.textSecondary} />
                </TouchableOpacity>
                
                <Text style={[styles.monthYearText, { color: theme.text }]}>
                  {monthYearString}
                </Text>
                
                <TouchableOpacity onPress={goToNextMonth} style={styles.monthNavButton}>
                  <ChevronRight size={24} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.calendarGrid}>
                {renderCalendarGrid()}
              </View>
              
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View 
                    style={[styles.legendIndicator, { backgroundColor: theme.textSecondary }]} 
                  />
                  <Text style={[styles.legendText, { color: theme.textSecondary }]}>
                    Workout data
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={[styles.todayButton, { backgroundColor: theme.primary }]}
                  onPress={() => onSelectDate(new Date())}
                >
                  <Text style={styles.todayButtonText}>Today</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    maxWidth: 360,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthNavButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "500",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  dayNameCell: {
    width: "14.28%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: "500",
  },
  dayCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
  },
  dataIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: "absolute",
    bottom: 6,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  todayButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});