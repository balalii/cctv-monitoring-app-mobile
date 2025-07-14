import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Monitor, Shield, Eye, Cctv, Wifi } from 'lucide-react-native';
import { Image } from 'expo-image';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main app after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.iconWrapper}>
            <Image
              style={styles.image}
              source={require('../assets/images/icon.png')}
              contentFit="cover"
              transition={1000}
            />
          </View>

          <Text style={styles.appName}>ATCS Monitor Indonesia</Text>

          <View style={styles.tagline}>
            <Text style={styles.taglineText}>Lalu lintas dalam genggaman.</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <View style={styles.loadingProgress} />
            </View>
            <Text style={styles.loadingText}>Initializing...</Text>
          </View>

          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>
            © 2025 ATCS Monitor Indonesia
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  iconWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 5,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  eyeIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'green',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '300',
    marginBottom: 16,
  },
  tagline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  taglineText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  loadingBar: {
    width: 120,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: '#1f2937',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
