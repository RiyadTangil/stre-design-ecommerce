import { Stack, usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomBottomTabBar } from '@/components/ui/CustomBottomTabBar';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');

  // Update active tab based on current route
  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('home');
    } else if (pathname === '/categories') {
      setActiveTab('categories');
    } else if (pathname === '/wishlist') {
      setActiveTab('wishlist');
    } else if (pathname === '/profile') {
      setActiveTab('profile');
    }
  }, [pathname]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    
    // Navigate to the appropriate screen
    switch (tabId) {
      case 'home':
        router.push('/');
        break;
      case 'categories':
        router.push('/categories');
        break;
      case 'wishlist':
        router.push('/wishlist');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="wishlist" />
        <Stack.Screen name="no" />
      </Stack>
      
      {!pathname.includes('product-details') && (
        <CustomBottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
});
