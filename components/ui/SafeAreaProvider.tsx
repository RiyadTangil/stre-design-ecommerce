import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider as RNSafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaProviderProps {
  children: React.ReactNode;
}

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({ children }) => {
  return (
    <RNSafeAreaProvider>
      {children}
    </RNSafeAreaProvider>
  );
};

// Hook to get safe area insets
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  return insets;
};

// Component to apply safe area padding
interface SafeAreaViewProps {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: any;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({ 
  children, 
  edges = ['top', 'bottom', 'left', 'right'],
  style 
}) => {
  const insets = useSafeAreaInsets();
  
  const paddingStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };

  return (
    <View style={[styles.container, paddingStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 