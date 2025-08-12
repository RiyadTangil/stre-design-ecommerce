import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface ProductDetailsHeaderProps {
  onBackPress: () => void;
  onWishlistPress: () => void;
  isWishlisted?: boolean;
}

export const ProductDetailsHeader: React.FC<ProductDetailsHeaderProps> = ({
  onBackPress,
  onWishlistPress,
  isWishlisted = false,
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </Pressable>
      
      <View style={styles.spacer} />
      
      <Pressable style={styles.wishlistButton} onPress={onWishlistPress}>
        <Ionicons 
          name={isWishlisted ? "heart" : "heart-outline"} 
          size={24} 
          color={isWishlisted ? Colors.product.accentPink : "#FFFFFF"} 
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
});
