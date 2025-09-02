import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  image?: any;
  title: string;
  price: string;
  originalPrice?: string;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  image,
  title,
  price,
  originalPrice,
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
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>{originalPrice}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 160,
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
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F4F4F4',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F4F4F4',
  },
  originalPrice: {
    fontSize: 14,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
  },
});