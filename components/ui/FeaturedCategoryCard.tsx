import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ImageWithFallback } from './ImageWithFallback';

interface FeaturedCategoryCardProps {
  image?: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export const FeaturedCategoryCard: React.FC<FeaturedCategoryCardProps> = ({
  image,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <ImageWithFallback
        source={image}
        style={styles.image}
        resizeMode="cover"
        fallbackColor="#f5f5f5"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#23262F',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(24,26,32,0.6)',
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F4F4F4',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#A0A0A0',
  },
}); 