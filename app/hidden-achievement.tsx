import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated, 
  Platform,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { getAchievementById } from '@/constants/achievements';
import { useAchievementStore } from '@/hooks/use-achievement-store';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export default function HiddenAchievementScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { markAchievementViewed } = useAchievementStore();
  
  const achievement = getAchievementById(id as string);
  
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  
  const thumpSound = useRef<Audio.Sound | null>(null);
  
  useEffect(() => {
    // Load sound
    const loadSound = async () => {
      if (Platform.OS !== 'web') {
        try {
          const { sound } = await Audio.Sound.createAsync(
            require('@/assets/sounds/thump.mp3')
          );
          thumpSound.current = sound;
        } catch (error) {
          console.log('Error loading sound', error);
        }
      }
    };
    
    loadSound();
    
    // Play haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    // Start animations
    startAnimations();
    
    // Mark achievement as viewed
    if (achievement) {
      markAchievementViewed(achievement.id);
    }
    
    return () => {
      if (thumpSound.current) {
        thumpSound.current.unloadAsync();
      }
    };
  }, []);
  
  const playThumpSound = async () => {
    if (thumpSound.current) {
      try {
        await thumpSound.current.setPositionAsync(0);
        await thumpSound.current.playAsync();
      } catch (error) {
        console.log('Error playing sound', error);
      }
    }
  };
  
  const startAnimations = () => {
    // Play sound
    setTimeout(() => {
      playThumpSound();
    }, 300);
    
    // Animate badge
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
    
    // Animate text
    setTimeout(() => {
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 600);
  };
  
  const handleClose = () => {
    router.back();
  };
  
  if (!achievement) {
    return null;
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={handleClose}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <X size={24} color={theme.text} />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.badgeContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={[theme.primary + '80', theme.primary]}
            style={styles.badgeGradient}
          >
            <View style={styles.badgeInner}>
              <Award size={80} color="#fff" />
            </View>
          </LinearGradient>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.textContainer,
            { opacity: textOpacityAnim }
          ]}
        >
          <Text style={[styles.title, { color: theme.primary }]}>
            Hidden Achievement Unlocked
          </Text>
          
          <Text style={[styles.achievementName, { color: theme.text }]}>
            {achievement.name}
          </Text>
          
          <Text style={[styles.message, { color: theme.textSecondary }]}>
            {achievement.popupMessage || achievement.description}
          </Text>
          
          <View style={styles.pointsContainer}>
            <Text style={[styles.pointsLabel, { color: theme.textSecondary }]}>
              +{achievement.points} points
            </Text>
          </View>
        </Animated.View>
      </View>
      
      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: theme.primary }]}
        onPress={handleClose}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  badgeContainer: {
    marginBottom: 40,
  },
  badgeGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  achievementName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
  pointsContainer: {
    marginTop: 8,
  },
  pointsLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  continueButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});