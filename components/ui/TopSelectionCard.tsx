import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ImageWithFallback } from './ImageWithFallback';

interface TopSelectionCardProps {
  image?: any;
  title: string;
  subtitle: string;
  imageBackgroundColor?: string;
  onPress?: () => void;
}

export const TopSelectionCard: React.FC<TopSelectionCardProps> = ({
  image,
  title,
  subtitle,
  imageBackgroundColor = '#E5E5E5',
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.imageContainer, { backgroundColor: imageBackgroundColor }]}>
        <ImageWithFallback
          source={image}
          style={styles.image}
          resizeMode="cover"
          fallbackColor={imageBackgroundColor}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23262F',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
 
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    
    opacity: 0.9,
  },
});
