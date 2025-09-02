import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TabContent: React.FC = () => {

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
        <Stack.Screen name="orders" />
        <Stack.Screen name="order-tracking" />
      </Stack>
    </View>
  );
};

export default function TabLayout() {
  return <TabContent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
});
