import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ImageWithFallback } from './ImageWithFallback';

interface FeaturedCategoryCardProps {
  image?: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export const FeaturedCategoryCard: React.FC<FeaturedCategoryCardProps> = React.memo(({
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
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 140,
    backgroundColor: '#23262F',
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#3A3F47',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 80,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
   
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F4F4F4',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
  },
});