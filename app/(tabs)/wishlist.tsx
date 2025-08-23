import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { ProductGridCard } from '@/components/ui/ProductGridCard';

// Mock data for wishlist items based on the image
const wishlistItems = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
    category: 'Jacket',
    title: 'Men Black Grey Allover Printed Round Neck ...',
    currentPrice: '৳25.15',
    originalPrice: '৳30.15',
    isWishlisted: true,
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    category: 'T-Shirt',
    title: 'Pink Winter Sweater and Jacket with Cap',
    currentPrice: '৳25.15',
    originalPrice: '৳30.15',
    isWishlisted: true,
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    category: 'T-Shirt',
    title: 'Men Black Grey Allover Printed Round Neck ...',
    currentPrice: '৳25.15',
    originalPrice: '৳30.15',
    isWishlisted: true,
  },
  {
    id: '4',
    image: { uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop"},
    category: 'Jacket',
    title: 'Pink Winter Sweater and Jacket with Cap',
    currentPrice: '৳25.15',
    originalPrice: '৳30.15',
    isWishlisted: false,
  },
];

// Wishlist Item Component
const WishlistItem = ({ item, onToggleWishlist, onPress, viewMode }: {
  item: any;
  onToggleWishlist: (id: string) => void;
  onPress: (item: any) => void;
  viewMode: 'list' | 'grid';
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
    animateHeart();
    onToggleWishlist(item.id);
  };
  if (viewMode === 'grid') {
    return (
      <ProductGridCard
        item={item}
        onPress={onPress}
        onToggleWishlist={onToggleWishlist}
        showWishlistButton={true}
      />
    );
  }

  return (
    <Pressable style={styles.wishlistItem} onPress={() => onPress(item)}>
      {/* Left Section - Image with Heart Icon */}
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <ImageWithFallback
            source={item.image}
            style={styles.productImage}
            resizeMode="cover"
            fallbackColor="#3A3F47"
          />
          <Animated.View style={[styles.heartButton, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
              onPress={handleHeartPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons
                name={item.isWishlisted ? 'favorite' : 'favorite-border'}
                size={16}
                color="#FF6B9D"
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Right Section - Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.titleText} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{item.currentPrice}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function WishlistScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistData, setWishlistData] = useState(wishlistItems);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    // Simulate loading wishlist data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const listButtonScale = useRef(new Animated.Value(1)).current;
  const gridButtonScale = useRef(new Animated.Value(1)).current;
  const backButtonScale = useRef(new Animated.Value(1)).current;

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.sequence([
      Animated.timing(backButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(backButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    router.back();
  };

  const handleToggleWishlist = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setWishlistData(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isWishlisted: !item.isWishlisted }
          : item
      )
    );
  };

  const handleProductPress = (product: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Product pressed:', product.title);
  };

  const handleViewModeToggle = (mode: 'list' | 'grid') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const buttonScale = mode === 'list' ? listButtonScale : gridButtonScale;
    
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setViewMode(mode);
  };

  const renderWishlistItem = ({ item }: { item: any }) => (
    <WishlistItem
      item={item}
      onToggleWishlist={handleToggleWishlist}
      onPress={handleProductPress}
      viewMode={viewMode}
    />
  );

  return (
    <PageWrapper
      title="Wishlist"
      showLogo={false}
      isLoading={isLoading}
      loadingMessage="Loading Wishlist..."

      leftIcon="back"
    >
      {/* Custom Header Actions */}
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: backButtonScale }] }}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <MaterialIcons name="chevron-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={styles.headerTitle}>Wishlist</Text>
        
        <View style={styles.headerActions}>
          <Animated.View style={{ transform: [{ scale: listButtonScale }] }}>
            <TouchableOpacity 
              style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
              onPress={() => handleViewModeToggle('list')}
            >
              <MaterialIcons 
                name="view-list" 
                size={20} 
                color={viewMode === 'list' ? '#FFFFFF' : '#9B9B9B'} 
              />
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View style={{ transform: [{ scale: gridButtonScale }] }}>
            <TouchableOpacity 
              style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeButtonActive]}
              onPress={() => handleViewModeToggle('grid')}
            >
              <MaterialIcons 
                name="grid-view" 
                size={20} 
                color={viewMode === 'grid' ? '#FFFFFF' : '#9B9B9B'} 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Wishlist Items */}
      <FlatList
        key={viewMode} // Force re-render when view mode changes
        data={wishlistData}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id}
        style={styles.wishlistContainer}
        contentContainerStyle={[
          styles.wishlistContent,
          viewMode === 'grid' && styles.wishlistContentGrid
        ]}
        showsVerticalScrollIndicator={false}
        numColumns={viewMode === 'grid' ? 2 : 1}
        columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
      />

    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1C20',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1C20',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D36',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 8,
  },
  viewModeButtonActive: {
    backgroundColor: '#2A2D36',
  },
  wishlistContainer: {
    flex: 1,
  },
  wishlistContent: {
    paddingVertical: 16,
  },
  wishlistContentGrid: {
    paddingHorizontal: 10,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: '#23262F',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#23262F',
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
    marginLeft: 16,
  },
  categoryText: {
    fontSize: 10,
    color: '#9B9B9B',
   
    marginTop: 4,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
    
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    gap: 8,
  },
  currentPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9B9B9B',
    textDecorationLine: 'line-through',
  },
  // Grid styles are now handled by ProductGridCard component
});