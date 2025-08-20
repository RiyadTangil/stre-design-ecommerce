import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import our reusable components
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Import our reusable components
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductDetailsHeader } from "@/components/ui/ProductDetailsHeader";

import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { ReviewSection } from "@/components/ui/ReviewSection";
import { useProductDetails } from "@/hooks/useProductDetails";
import { ImageGallery } from "@/components/ui/ImageGallery";

// Product data interface
interface ProductData {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  currentPrice: string;
  originalPrice: string;
  discountPercentage: number;
  brand: string;
  weight: string;
  condition: string;
  productCategory: string;
  colors: { id: string; name: string; value: string }[];
  images: { id: string; uri: string; type?: 'image' | 'video'; thumbnail?: string }[];
}

// Mock product database - in a real app, this would come from an API
const productDatabase: Record<string, ProductData> = {
  "1": {
    id: "1",
    title: "Peter England casual",
    description:
      "Premium casual wear from Peter England. Made with high-quality cotton fabric for maximum comfort and style. Perfect for both casual outings and semi-formal occasions.",
    category: "Fashion",
    rating: 4.5,
    reviewCount: 2600,
    currentPrice: "৳45.00",
    originalPrice: "৳50.15",
    discountPercentage: 10,
    brand: "Peter England",
    weight: "200grm",
    condition: "NEW",
    productCategory: "Casual Wear",
    colors: [
      { id: "1", name: "Blue", value: "#4A90E2" },
      { id: "2", name: "Black", value: "#2A2A2A" },
      { id: "3", name: "White", value: "#FF6B9D" },
      { id: "4", name: "Grey", value: "#808080" },
    ],
    images: [
      {
        id: "1",
        uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        id: "2",
        uri: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
      },
      {
        id: "3",
        uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Zip-Front Track Jacket",
    description:
      "Sporty and comfortable track jacket with zip-front closure. Perfect for athletic activities and casual wear. Features breathable fabric and modern design.",
    category: "Sports",
    rating: 4.3,
    reviewCount: 1200,
    currentPrice: "৳23.12",
    originalPrice: "৳30.15",
    discountPercentage: 23,
    brand: "Sports Brand",
    weight: "350grm",
    condition: "NEW",
    productCategory: "Athletic Wear",
    colors: [
      { id: "1", name: "Red", value: "#E74C3C" },
      { id: "2", name: "Blue", value: "#3498DB" },
      { id: "3", name: "Black", value: "#2A2A2A" },
    ],
    images: [
      {
        id: "1",
        uri: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
      },
      {
        id: "2",
        uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      },
    ],
  },
  "3": {
    id: "3",
    title: "Louis V",
    description:
      "Luxury fashion item from the renowned Louis V brand. Crafted with premium materials and attention to detail. A statement piece for fashion enthusiasts.",
    category: "Luxury",
    rating: 4.8,
    reviewCount: 850,
    currentPrice: "৳155.00",
    originalPrice: "৳200.00",
    discountPercentage: 22,
    brand: "Louis V",
    weight: "500grm",
    condition: "NEW",
    productCategory: "Luxury Fashion",
    colors: [
      { id: "1", name: "Brown", value: "#8B4513" },
      { id: "2", name: "Black", value: "#2A2A2A" },
      { id: "3", name: "Tan", value: "#D2B48C" },
    ],
    images: [
      {
        id: "1",
        uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop",
      },
      {
        id: "2",
        uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop",
      },
    ],
  },
  "4": {
    id: "4",
    title: "Nike Air Max",
    description:
      "Iconic Nike Air Max sneakers with superior comfort and style. Features the signature Air Max technology for exceptional cushioning and support.",
    category: "Footwear",
    rating: 4.6,
    reviewCount: 3200,
    currentPrice: "৳89.99",
    originalPrice: "৳120.00",
    discountPercentage: 25,
    brand: "Nike",
    weight: "400grm",
    condition: "NEW",
    productCategory: "Athletic Shoes",
    colors: [
      { id: "1", name: "White", value: "#FFFFFF" },
      { id: "2", name: "Black", value: "#2A2A2A" },
      { id: "3", name: "Red", value: "#E74C3C" },
      { id: "4", name: "Blue", value: "#3498DB" },
    ],
    images: [
      {
        id: "1",
        uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        id: "2",
        uri: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop",
        type: "image"
      },
      {
        id: "3",
        uri: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-with-the-stopwatch-running-32808-large.mp4",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
      },
    ],
  },
  "5": {
    id: "5",
    title: "Adidas Ultraboost",
    description:
      "High-performance running shoes with Adidas Ultraboost technology. Provides maximum energy return and comfort for long-distance running.",
    category: "Footwear",
    rating: 4.7,
    reviewCount: 2100,
    currentPrice: "৳129.99",
    originalPrice: "৳180.00",
    discountPercentage: 28,
    brand: "Adidas",
    weight: "350grm",
    condition: "NEW",
    productCategory: "Running Shoes",
    colors: [
      { id: "1", name: "Grey", value: "#808080" },
      { id: "2", name: "Black", value: "#2A2A2A" },
      { id: "3", name: "Blue", value: "#3498DB" },
    ],
    images: [
      {
        id: "1",
        uri: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop",
      },
      {
        id: "2",
        uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  },
};

export default function ProductDetailsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useLocalSearchParams<{ productId: string }>();

  // Get product data from database
  const productData = productDatabase[productId || "1"] || productDatabase["1"];
  const relatedProducts = [
    {
      id: "1",
      image: {
        uri: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
      },
      title: "Havells Swing Fan",
      description: "400mm, Blue tone",
      discount: "20% off",
      originalPrice: "৳1500",
      currentPrice: "৳1,299",
    },
    {
      id: "2",
      image: {
        uri: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop",
      },
      title: "OnePlus Nord 2T 5G",
      description: "8GB RAM, 128GB Storage",
      discount: "50% off",
      originalPrice: "৳1,500",
      currentPrice: "৳999",
    },
    {
      id: "3",
      image: {
        uri: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop",
      },
      title: "ThinkPad L13 Yoga Gen 3",
      description: "Dual core, Red tone",
      discount: "20% off",
      originalPrice: "৳2500",
      currentPrice: "৳2299",
    },
    {
      id: "4",
      image: {
        uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      },
      title: "Sony WH-1000XM4",
      description: "Noise cancelling, Wireless",
      discount: "30% off",
      originalPrice: "৳349",
      currentPrice: "৳244",
    },
    {
      id: "5",
      image: {
        uri: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop",
      },
      title: "Apple Watch Series 7",
      description: "GPS, Always-On Display",
      discount: "15% off",
      originalPrice: "৳399",
      currentPrice: "৳339",
    },
  ];
  useEffect(() => {
    // Simulate loading product data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const {
    selectedColor,
    isWishlisted,
    isAddingToCart,
    currentImageIndex,
    handleColorSelect,
    handleWishlistToggle,
    handleAddToCart,
    handleImagePress,
    handleImageScroll,
    getSelectedColorData,
    getDiscountAmount,
  } = useProductDetails(productData);

  const handleBackPress = () => {
    // Navigate back
    router.back();
  };

  // Memoize expensive computations
  const selectedColorData = useMemo(
    () => getSelectedColorData(),
    [getSelectedColorData]
  );
  const discountAmount = useMemo(
    () => getDiscountAmount(),
    [getDiscountAmount]
  );

  if (isLoading || !productData) {
    return (
      <PageWrapper
        isLoading={true}
        loadingMessage="Loading Product Details..."
        showHeader={false}
        title=""

      />
    );
  }
  const reviewItem = [
     {
      id: "2",
      userName: "Michael Chen",
      rating: 4,
      date: "Aug 14, 2025",
      comment:
        "Great product overall. ",
      helpful: 15,
    },
    {
      id: "1",
      userName: "Sarah Johnson",
      rating: 5,
      date: "Aug 15, 2025",
      comment:
        "This product exceeded my expectations! The quality is outstanding,",
      helpful: 24,
      images: [
        "https://images.unsplash.com/photo-1591375275624-fa4d31d75ae8?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1591375246214-6593d3c1d845?w=200&h=200&fit=crop",
      ],
    },
   
    {
      id: "3",
      userName: "Emma Wilson",
      rating: 5,
      date: "Aug 13, 2025",
      comment:
        "Great product overall. The only minor issue is that the color is slightly different from what's shown in the pictures, but still looks good.",
      helpful: 8,
      images: [
        "https://images.unsplash.com/photo-1591375275729-c8c30d7c5412?w=200&h=200&fit=crop",
      ],
    },
  ];
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PageWrapper
      leftIcon={"back"}
        // showHeader={false}
        style={styles.container}
      >
        {/* Header */}
        <ProductDetailsHeader
          onBackPress={handleBackPress}
          onWishlistPress={handleWishlistToggle}
          isWishlisted={isWishlisted}
        />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Product Images with Gradient Background */}
          <View style={styles.imageSection}>
            <LinearGradient
              colors={[
                Colors.product.gradientStart,
                Colors.product.gradientEnd,
              ]}
              style={styles.gradientBackground}
            >
              <ImageGallery
                media={productData.images.map(img => ({
                  id: img.id,
                  uri: img.uri,
                  type: 'image'
                }))}
                aspectRatio={4/3}
                onImagePress={handleImagePress}
              />
            </LinearGradient>
          </View>

          {/* Product Information */}
          <View style={styles.contentSection}>
            {/* Category Tag */}
            <CategoryTag label={productData.category} />

            {/* Product Title */}
            <Text style={styles.productTitle}>{productData.title}</Text>

            {/* Description */}
            <Text style={styles.description}>{productData.description}</Text>

            {/* Color Selection and Rating */}
            <View style={styles.colorAndRatingSection}>
              <RatingDisplay
                rating={productData.rating}
                reviewCount={productData.reviewCount}
              />
              <View style={styles.colorSection}>
                <View style={styles.colorSwatches}>
                  {productData.colors.map(
                    (color: { id: string; name: string; value: string }) => (
                      <ColorSwatch
                        key={color.id}
                        color={color.value}
                        isSelected={selectedColor === color.id}
                        onPress={() => handleColorSelect(color.id)}
                      />
                    )
                  )}
                </View>
              </View>
            </View>

            {/* Specifications */}
            <View style={styles.specificationsSection}>
              <Text style={styles.sectionTitle}>Specifications</Text>
              <View style={styles.specificationItem}>
                <Text style={styles.specificationLabel}>Brand:</Text>
                <Text style={styles.specificationValue}>
                  {productData.brand}
                </Text>
              </View>
              <View style={styles.specificationItem}>
                <Text style={styles.specificationLabel}>Weight:</Text>
                <Text style={styles.specificationValue}>
                  {productData.weight}
                </Text>
              </View>
              <View style={styles.specificationItem}>
                <Text style={styles.specificationLabel}>Condition:</Text>
                <Text style={styles.specificationValue}>
                  {productData.condition}
                </Text>
              </View>
              <View style={styles.specificationItem}>
                <Text style={styles.specificationLabel}>Category:</Text>
                <Text style={styles.specificationValue}>
                  {productData.productCategory}
                </Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {productData.description}
              </Text>
            </View>

            {/* Related Products */}
            <View style={styles.relatedProductsSection}>
              <Text style={styles.sectionTitle}>Related Products</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedProductsContainer}
              >
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.currentPrice}
                    originalPrice={product.originalPrice}
                    onPress={() => {
                      router.push({
                        pathname: "/product-details",
                        params: { productId: product.id },
                      });
                    }}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Reviews Section */}
            <ReviewSection
              summary={{
                averageRating: 4.5,
                totalReviews: 256,
                ratingDistribution: {
                  5: 150,
                  4: 70,
                  3: 20,
                  2: 10,
                  1: 6,
                },
              }}
              reviews={reviewItem}
              onViewAllPress={() => console.log("View all reviews")}
            />
          </View>
        </ScrollView>

        {/* Bottom Price and Add to Cart */}
        <View style={styles.bottomSection}>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>
                {productData.currentPrice}
              </Text>
              <Text style={styles.originalPrice}>
                {productData.originalPrice}
              </Text>
            </View>
            <Text style={styles.discountText}>
              {productData.discountPercentage}% OFF
            </Text>
          </View>
          <AddToCartButton onPress={handleAddToCart} loading={isAddingToCart} />
        </View>
      </PageWrapper>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: Colors.product.lightGrey,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom section
  },
  imageSection: {
    position: "relative",
  },
  gradientBackground: {
    minHeight: 300,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: "#23262F",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    lineHeight: 24,
  },
  colorAndRatingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingBottom: 14,
    marginBottom: 10,
  },
  colorSection: {
    // flex: 1,
    // marginRight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  colorSwatches: {
    flexDirection: "row",
    // alignItems: "center",
  },
  specificationsSection: {
    marginBottom: 24,
  },
  specificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  specificationLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.7,
    fontWeight: "500",
  },
  specificationValue: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.7,
    fontWeight: "400",
  },
  descriptionSection: {
    marginBottom: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.product.lightGrey,
  },
  descriptionText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    lineHeight: 18,
  },
  relatedProductsSection: {
    marginTop: 24,
    // marginBottom: 100,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  relatedProductsContainer: {
    paddingTop: 16,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#23262F",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceContainer: {
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  originalPrice: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    textDecorationLine: "line-through",
  },
  discountText: {
    fontSize: 12,
    color: Colors.product.accentPink,
    fontWeight: "600",
    marginTop: 4,
  },
});
