import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { clearAllAppData } from '@/hooks/use-exercise-store';
import { useExerciseStore } from '@/hooks/use-exercise-store';
import { useSettingsStore } from '@/hooks/use-settings-store';
import { useAchievementStore } from '@/hooks/use-achievement-store';
import { Trash2 } from 'lucide-react-native';

export default function ResetDataButton() {
  const { theme } = useTheme();
  const { resetToDefaults } = useExerciseStore();
  const { resetSettings } = useSettingsStore();
  const { resetAchievements } = useAchievementStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resetType, setResetType] = useState<'all' | 'exercises' | 'achievements' | 'settings'>('all');

  const handleResetData = () => {
    setResetType('all');
    setShowConfirmation(true);
  };

  const handleResetExercises = () => {
    setResetType('exercises');
    setShowConfirmation(true);
  };

  const handleResetAchievements = () => {
    setResetType('achievements');
    setShowConfirmation(true);
  };

  const handleResetSettings = () => {
    setResetType('settings');
    setShowConfirmation(true);
  };

  const confirmReset = async () => {
    setShowConfirmation(false);
    
    try {
      switch (resetType) {
        case 'all':
          await clearAllAppData();
          resetToDefaults();
          resetSettings();
          resetAchievements();
          Alert.alert('Success', 'All app data has been reset to defaults.');
          break;
        case 'exercises':
          resetToDefaults();
          Alert.alert('Success', 'Exercise data has been reset to defaults.');
          break;
        case 'achievements':
          resetAchievements();
          Alert.alert('Success', 'Achievement data has been reset.');
          break;
        case 'settings':
          resetSettings();
          Alert.alert('Success', 'Settings have been reset to defaults.');
          break;
      }
    } catch (error) {
      console.error('Error resetting data:', error);
      Alert.alert('Error', 'There was a problem resetting the data.');
    }
  };

  const getResetTitle = () => {
    switch (resetType) {
      case 'all': return 'Reset All Data';
      case 'exercises': return 'Reset Exercise Data';
      case 'achievements': return 'Reset Achievements';
      case 'settings': return 'Reset Settings';
    }
  };

  const getResetMessage = () => {
    switch (resetType) {
      case 'all': 
        return 'This will permanently delete all your exercises, sets, achievements, and settings. This action cannot be undone.';
      case 'exercises': 
        return 'This will permanently delete all your exercises and sets. This action cannot be undone.';
      case 'achievements': 
        return 'This will permanently delete all your achievements progress. This action cannot be undone.';
      case 'settings': 
        return 'This will reset all settings to their default values. This action cannot be undone.';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.resetButton, { backgroundColor: theme.danger }]}
        onPress={handleResetData}
      >
        <Trash2 size={20} color="#fff" style={styles.icon} />
        <Text style={styles.resetButtonText}>Reset All Data</Text>
      </TouchableOpacity>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionButton, { borderColor: theme.border }]}
          onPress={handleResetExercises}
        >
          <Text style={[styles.optionButtonText, { color: theme.danger }]}>Reset Exercises</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.optionButton, { borderColor: theme.border }]}
          onPress={handleResetAchievements}
        >
          <Text style={[styles.optionButtonText, { color: theme.danger }]}>Reset Achievements</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.optionButton, { borderColor: theme.border }]}
          onPress={handleResetSettings}
        >
          <Text style={[styles.optionButtonText, { color: theme.danger }]}>Reset Settings</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {getResetTitle()}
            </Text>
            
            <Text style={[styles.modalMessage, { color: theme.textSecondary }]}>
              {getResetMessage()}
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.backgroundSecondary }]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={[styles.modalButtonText, { color: theme.text }]}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: theme.danger }]}
                onPress={confirmReset}
              >
                <Text style={styles.modalButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  optionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});