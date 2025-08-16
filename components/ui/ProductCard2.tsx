import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { RatingDisplay } from "./RatingDisplay";

// ✅ Define Product type
export interface Product {
  id: string | number;
  image: ImageSourcePropType;
  title: string;
  category?: string;
  currentPrice: string;
  originalPrice?: string;
  isWishlisted?: boolean;
}

// ✅ Define Props
interface ProductCard2Props {
  item: Product;
  onPress?: (item: Product) => void;
  onToggleWishlist?: (item: Product) => void;
}

export default function ProductCard2({
  item,
  onPress,
  onToggleWishlist,
}: ProductCard2Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleHeartPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onToggleWishlist?.(item);
  };

  return (
    <Pressable style={styles.wishlistItem} onPress={() => onPress?.(item)}>
      {/* Left Section - Image with Heart Icon */}
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <ImageWithFallback
            source={item.image}
            style={styles.productImage}
            resizeMode="cover"
            fallbackColor="#3A3F47"
          />
          <Animated.View
            style={[styles.heartButton, { transform: [{ scale: scaleAnim }] }]}
          >
            <TouchableOpacity
              onPress={handleHeartPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name={item.isWishlisted ? "favorite" : "favorite-border"}
                size={16}
                color="#FF6B9D"
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Right Section - Product Details */}
      <View style={styles.detailsContainer}>
        {item.category ? (
          <Text style={styles.categoryText}>{item.category}</Text>
        ) : (
          <RatingDisplay rating={3.5} reviewCount={50} size="small" />
        )}
        <Text style={styles.titleText} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.currentPrice}</Text>
          {item.originalPrice ? (
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wishlistItem: {
    flexDirection: "row",
    backgroundColor: "#23262F",
    // marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  imageWrapper: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6B9D",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 10,
    color: "#9B9B9B",
    marginBottom: 2,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 18,
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  originalPrice: {
    fontSize: 12,
    color: "#9B9B9B",
    textDecorationLine: "line-through",
  },
});
