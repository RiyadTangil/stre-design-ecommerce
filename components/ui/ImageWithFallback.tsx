import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';

interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
  source: { uri: string } | any;
  fallbackColor?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  source,
  fallbackColor = '#23262F',
  style,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !source) {
    return (
      <View
        style={[
          styles.fallback,
          { backgroundColor: fallbackColor },
          style,
        ]}
      >
        <Ionicons name="image-outline" size={24} color="#ccc" />
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 