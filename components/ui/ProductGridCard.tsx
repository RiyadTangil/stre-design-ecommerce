import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ImageWithFallback } from './ImageWithFallback';

interface ProductGridCardProps {
  item: {
    id: string;
    image: { uri: string };
    category?: string;
    title: string;
    currentPrice: string;
    originalPrice?: string;
    isWishlisted?: boolean;
    isFavorite?: boolean;
   
  };
  onPress: (item: any) => void;
  onToggleWishlist?: (id: string) => void;
  showWishlistButton?: boolean;
   children?: React.ReactNode;
   txHight?: number;
}

export const ProductGridCard: React.FC<ProductGridCardProps> = ({
  item,
  onPress,
  onToggleWishlist,
  showWishlistButton = true,
  children,
  txHight=44,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHeartPress = () => {
    if (onToggleWishlist) {
      animateHeart();
      onToggleWishlist(item.id);
    }
  };

  const isWishlisted = item.isWishlisted || item.isFavorite || false;

  return (
    <Pressable style={styles.productCard} onPress={() => onPress(item)}>
      <View style={styles.imageWrapper}>
        <ImageWithFallback
          source={item.image}
          style={styles.productImage}
          resizeMode="cover"
          fallbackColor="#3A3F47"
        />
        {showWishlistButton && (
          <Animated.View style={[styles.heartButton, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              onPress={handleHeartPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name={isWishlisted ? 'favorite' : 'favorite-border'}
                size={16}
                color="#FF6B9D"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      <View style={styles.detailsContainer}>
        {item.category && (
          <Text style={styles.categoryText}>{item.category}</Text>
        )}
        <Text style={[styles.titleText,{ height: txHight}]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.currentPrice}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          )}
        </View>
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#23262F',
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  detailsContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 11,
    color: '#9B9B9B',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 12,

    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9B9B9B',
    textDecorationLine: 'line-through',
  },
});