import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    discount?: string;
  };
  onPress?: () => void;
  onWishlistPress?: () => void;
  isWishlisted?: boolean;
  showWishlistButton?: boolean;
  showDiscount?: boolean;
  showOriginalPrice?: boolean;
  cardWidth?: number;
  imageHeight?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onWishlistPress,
  isWishlisted = false,
  showWishlistButton = false,
  showDiscount = false,
  showOriginalPrice = false,
  cardWidth = (screenWidth - 48) / 2,
  imageHeight = 200,
}) => {
  return (
    <TouchableOpacity
      style={[styles.productCard, { width: cardWidth }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={[styles.productImage, { height: imageHeight }]}
          contentFit="cover"
        />
        
        {showWishlistButton && (
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={onWishlistPress}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={20}
              color={isWishlisted ? "#ef4444" : "white"}
            />
          </TouchableOpacity>
        )}
        
        {showDiscount && product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{product.price}</Text>
          {showOriginalPrice && product.originalPrice && (
            <Text style={styles.originalPrice}>{product.originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
}); 