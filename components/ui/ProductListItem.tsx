import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProductListItemProps {
  image?: any;
  title: string;
  description: string;
  discount: string;
  originalPrice: string;
  currentPrice: string;
  onPress?: () => void;
  onAddToCart?: () => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  image,
  title,
  description,
  discount,
  originalPrice,
  currentPrice,
  onPress,
  onAddToCart,
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
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discount}>{discount}</Text>
          <Text style={styles.originalPrice}>{originalPrice}</Text>
          <Text style={styles.currentPrice}>{currentPrice}</Text>
        </View>
      </View>
      <Pressable style={styles.addToCartButton} onPress={onAddToCart}>
        <Ionicons name="cart-outline" size={20} color="white" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    borderRadius: 16,
    // borderBottomColor: '#23262F',
    backgroundColor: "#23262F",
  },
  image: {
    width: 80,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    marginLeft: 5,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F4F4F4",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#FF6B9D",
    marginBottom: 10,
  },
  discount: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#A0A0A0",
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F4F4F4",
  },
  addToCartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6B9D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
