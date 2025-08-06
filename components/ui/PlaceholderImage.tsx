import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PlaceholderImageProps {
  width: number;
  height: number;
  borderRadius?: number;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  borderRadius = 0,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
        },
      ]}
    >
      <Ionicons name="image-outline" size={24} color="#ccc" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 