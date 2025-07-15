import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  Info,
  Globe,
  RefreshCcw,
  SquareArrowOutUpRight,
  Code2,
  Github,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Image } from 'expo-image';

export default function SettingsScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={['#000000', '#000000e1']} style={styles.header}>
        <Info size={28} color="#ffffff" />
        <View>
          <Text style={styles.headerTitle}>Informasi Aplikasi</Text>
          <Text style={styles.headerSubtitle}>ATCS Monitor Indonesia</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* App Info Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.appIconContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/icon.png')}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View>
              <Text style={styles.appName}>ATCS Monitor Indonesia</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.cardBodyText}>
            Sumber data CCTV pada aplikasi ini berasal dari layanan publik yang
            tersedia untuk umum.
          </Text>
          <Text style={styles.cardBodyItalicText}>
            Keakuratan dan ketersediaan streaming bergantung pada masing-masing
            penyedia layanan.
          </Text>
        </View>

        {/* Informasi Aplikasi */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status Server</Text>
          {/* Server Status */}
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.infoIconContainer}>
              <Globe size={20} color="#10b981" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Server </Text>
              <View style={styles.statusBadge}>
                <View
                  style={[styles.statusDot, { backgroundColor: '#10b981' }]}
                />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />

          {/* Last Updated */}
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.infoIconContainer}>
              <RefreshCcw size={20} color="#000000" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>Just now</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Collab */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kolaborasi</Text>
          {/* Server Status */}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://github.com/balalii/cctv-monitoring')
            }
            style={styles.infoRow}
            activeOpacity={0.7}
          >
            <View style={styles.infoIconContainer}>
              <Github size={20} color="black" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Github Repository </Text>
              <View>
                <View />
                <SquareArrowOutUpRight size={20} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} ATCS Monitor Indonesia
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // Softer background color
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10, // More rounded corners
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0000007c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  appIconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Add this to contain the image within the rounded border
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  appVersion: {
    fontSize: 13,
    color: '#6b7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  cardBodyText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  cardBodyItalicText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
    fontStyle: 'italic',
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  infoValue: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerLink: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '600',
  },
  link: {
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
