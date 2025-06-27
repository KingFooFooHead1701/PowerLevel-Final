// app/(tabs)/power-level.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useTheme } from "@/hooks/use-theme";
import { useExerciseStore } from "@/hooks/use-exercise-store";
import { formatEnergy } from "@/utils/energy-utils";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { getPowerTierName } from "@/utils/milestone-utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function PowerLevelScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getTotalJoules } = useExerciseStore();
  const [totalJoules, setTotalJoules] = useState(0);
  const [soundsLoaded, setSoundsLoaded] = useState(false);

  const scannerSound = useRef<Audio.Sound | null>(null);
  const revealSound  = useRef<Audio.Sound | null>(null);
  const thumpSound   = useRef<Audio.Sound | null>(null);

  const scannerAnim           = useRef(new Animated.Value(0)).current;
  const scannerBGOpacity      = useRef(new Animated.Value(0)).current;
  const revealOpacity         = useRef(new Animated.Value(0)).current;
  const tierOpacity           = useRef(new Animated.Value(0)).current;
  const tierScale             = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTotalJoules(getTotalJoules());
    (async () => {
      if (Platform.OS !== "web") {
        try {
          const { sound } = await Audio.Sound.createAsync(require("@/assets/sounds/beep.mp3"));
          scannerSound.current = sound;
        } catch {}
        try {
          const { sound } = await Audio.Sound.createAsync(require("@/assets/sounds/chirp.mp3"));
          revealSound.current = sound;
        } catch {}
        try {
          const { sound } = await Audio.Sound.createAsync(require("@/assets/sounds/thump.mp3"));
          thumpSound.current = sound;
        } catch {}
      }
      setSoundsLoaded(true);
    })();
    return () => {
      (async () => {
        if (scannerSound.current) await scannerSound.current.unloadAsync();
        if (revealSound.current)  await revealSound.current.unloadAsync();
        if (thumpSound.current)   await thumpSound.current.unloadAsync();
      })();
    };
  }, []);

  useEffect(() => {
    if (soundsLoaded) setTimeout(startAnimation, 800);
  }, [soundsLoaded]);

  const play = async (ref: React.MutableRefObject<Audio.Sound | null>) => {
    if (ref.current) {
      await ref.current.setPositionAsync(0);
      await ref.current.playAsync();
    }
  };

  function startAnimation() {
    // reset
    scannerAnim.setValue(0);
    scannerBGOpacity.setValue(0);
    revealOpacity.setValue(0);
    tierOpacity.setValue(0);
    tierScale.setValue(1);

    Animated.timing(scannerBGOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => play(scannerSound));

    const pass1 = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    });
    const pass2 = Animated.timing(scannerAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    });
    const pass3 = Animated.timing(scannerAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    });

    Animated.sequence([pass1, pass2, pass3]).start(() => {
      play(revealSound);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Animated.timing(revealOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        play(thumpSound);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Animated.parallel([
          Animated.timing(tierOpacity,   { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(tierScale, { toValue: 1.3, duration: 300, useNativeDriver: true }),
            Animated.timing(tierScale, { toValue: 1,   duration: 400, easing: Easing.bounce, useNativeDriver: true }),
          ]),
        ]).start();
      });
    });
  }

  const powerTierName = getPowerTierName(totalJoules);
  const containerW = 220;
  const scannerW  = 40;
  const maxX      = (containerW - scannerW) / 2;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top:15,bottom:15,left:15,right:15 }}>
            <ChevronLeft size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Power Level</Text>
        </View>
      </SafeAreaView>

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Your Power Level</Text>

        <View style={styles.animBox}>
          <Animated.View
            style={[
              styles.scannerBG,
              { opacity: scannerBGOpacity, backgroundColor: theme.cardBackground },
            ]}
          />
          <View style={styles.scannerClip}>
            <Animated.View
              style={[
                styles.scanner,
                {
                  backgroundColor: theme.primary,
                  opacity: scannerBGOpacity,
                  transform: [{
                    translateX: scannerAnim.interpolate({
                      inputRange: [0,1],
                      outputRange: [-maxX, maxX],
                    }),
                  }],
                },
              ]}
            >
              <LinearGradient
                colors={["transparent", theme.primary, "transparent"]}
                start={{x:0,y:0.5}}
                end={{x:1,y:0.5}}
                style={styles.glow}
              />
            </Animated.View>
          </View>

          <Animated.Text style={[styles.mainValue, { color: theme.text, opacity: revealOpacity }]}>
            {formatEnergy(totalJoules).abbreviated}
          </Animated.Text>
          <Animated.Text style={[styles.rawValue, { color: theme.textSecondary, opacity: revealOpacity }]}>
            {totalJoules.toLocaleString()} Joules
          </Animated.Text>
        </View>

        <Animated.View style={[styles.tierBox, { opacity: tierOpacity }]}>
          <Text style={[styles.tierLabel,  { color: theme.textSecondary }]}>Power Tier:</Text>
          <Animated.Text
            style={[
              styles.tierValue,
              { color: theme.primary, transform: [{ scale: tierScale }] },
            ]}
          >
            {powerTierName}
          </Animated.Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Keep training to unlock higher power tiers!
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea:    { width: "100%" },
  header:      { flexDirection: "row", alignItems: "center", padding:16 },
  headerTitle: { fontSize:18, fontWeight:"600", marginLeft:12 },

  // moved from 'justifyContent: "center"' to flex-start + paddingTop
  container:   { 
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,  // ← tweak this value as needed
  },
  subtitle:    { fontSize:20, marginBottom:16 },

  animBox:     { width:250, height:250, alignItems:"center", justifyContent:"center" },
  scannerBG:   { position:"absolute", width:220, height:120, borderRadius:12 },
  scannerClip: { position:"absolute", width:220, height:120, overflow:"hidden", borderRadius:12 },
  scanner:     { position:"absolute", width:40, height:120, borderRadius:8, left:90 },
  glow:        { position:"absolute", width:80, height:120, left:-20 },

  mainValue:   { fontSize:64, fontWeight:"bold", marginTop:8 },
  rawValue:    { fontSize:24, marginTop:4 },

  tierBox:     { marginTop:32, alignItems:"center" },
  tierLabel:   { fontSize:16, marginBottom:8 },
  tierValue:   { fontSize:40, fontWeight:"bold" },

  footer:      { position:"absolute", bottom:32, left:0, right:0, alignItems:"center", paddingHorizontal:20 },
  footerText:  { fontSize:16, textAlign:"center" },
});
