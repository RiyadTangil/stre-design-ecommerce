import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ImageWithFallback } from './ImageWithFallback';
import { RatingDisplay } from './RatingDisplay';
import { Colors } from '../../constants/Colors';

interface Product {
  id: string;
  title: string;
  image: { uri: string } | number;
  rating: number;
  reviews: number;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  isFavorite: boolean;
}

interface ProductListItemProps {
  product: Product;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

export const ProductListItem2: React.FC<ProductListItemProps> = ({
  product,
  onPress,
  onFavoritePress,
}) => {
  if (!product) {
    return null;
  }
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <ImageWithFallback
          source={product.image}
          style={styles.image}
          resizeMode="cover"
          fallbackColor="#f5f5f5"
        />
        <Pressable
          style={styles.favoriteButton}
          onPress={onFavoritePress}
        >
          <Ionicons
            name={product.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={product.isFavorite ? Colors.product.accentPink : Colors.product.white}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <RatingDisplay
          rating={product.rating}
          reviewCount={product.reviews}
          size="small"
        />
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.priceContainer}>
          <View style={styles.priceInfo}>
            <Text style={styles.currentPrice}>
              ${product.currentPrice.toFixed(2)}
            </Text>
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.discountBadge}>
            <Text style={styles.discount}>{product.discount}% OFF</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.product.white,
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.product.white,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.product.lightGrey,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    // backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.product.white,
  },
}); 