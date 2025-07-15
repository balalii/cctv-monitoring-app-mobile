import { Tabs } from 'expo-router';
import { Cctv, Info, Monitor, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 53,
          paddingTop:0,
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 8,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#9ca3af',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'CCTV',
          tabBarIcon: ({ size, color }) => (
            <Cctv size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Informasi',
          tabBarIcon: ({ size, color }) => (
            <Info size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}