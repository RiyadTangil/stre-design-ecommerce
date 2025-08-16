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

  if (hasError || !source || !source.uri) {
    return (
      <View
        style={[
          styles.fallback,
          { backgroundColor: fallbackColor },
          style,
          { width: 90, height: 90, borderRadius: 16 },
        ]}
      >
        <Ionicons name="image-outline" size={32} color="#ccc" />
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