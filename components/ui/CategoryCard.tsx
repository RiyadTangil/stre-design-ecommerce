import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ImageWithFallback } from './ImageWithFallback';

interface CategoryCardProps {
  image?: { uri: string };
  title: string;
  onPress?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = React.memo(({
  image,
  title,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <ImageWithFallback
          source={image}
          style={styles.image}
          resizeMode="cover"
          fallbackColor="#FFF0F5"
        />
        <View style={styles.overlay} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    paddingVertical: 16,
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
    backgroundColor: '#23262F',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(24,26,32,0.4)',
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F4F4F4',
    textAlign: 'center',
  },
});