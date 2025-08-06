import { SafeAreaView } from '@/components/ui/SafeAreaProvider';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { AppHeader } from '@/components/ui/AppHeader';
import { Drawer } from '@/components/ui/Drawer';
import { ProductCard } from '@/components/ui/ProductCard';
import { useDrawer } from '@/hooks/useDrawer';

// Mock data for category products
const categoryProducts = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    title: 'Casual Shirt',
    price: '$45.00',
    originalPrice: '$50.15',
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    title: 'Track Jacket',
    price: '$23.12',
    originalPrice: '$30.15',
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    title: 'Running Shoes',
    price: '$155.00',
    originalPrice: '$200.00',
  },
  {
    id: '4',
    image: { uri: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop' },
    title: 'Sports Bag',
    price: '$89.99',
    originalPrice: '$120.00',
  },
];

export default function CategoryScreen() {
  const [cartCount, setCartCount] = useState(2);
  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleProductPress = (product: any) => {
    console.log('Product pressed:', product.title);
  };

  const handleMenuPress = () => {
    openDrawer();
  };

  const renderProductCard = ({ item }: { item: any }) => (
    <ProductCard
      image={item.image}
      title={item.title}
      price={item.price}
      originalPrice={item.originalPrice}
      onPress={() => handleProductPress(item)}
      onAddToCart={handleAddToCart}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      
      {/* Header - Shows text instead of logo on non-home pages */}
      <AppHeader
        title="Fashion"
        cartCount={cartCount}
        showLogo={false}
        onMenuPress={handleMenuPress}
        onSearchPress={() => console.log('Search pressed')}
        onWishlistPress={() => console.log('Wishlist pressed')}
        onCartPress={() => console.log('Cart pressed')}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Header */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Fashion Collection</Text>
          <Text style={styles.categorySubtitle}>Discover the latest trends</Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <FlatList
            data={categoryProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productsGrid}
          />
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Drawer - Reused from home screen */}
      <Drawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        onCategoryPress={handleCategoryPress}
        onSubCategoryPress={handleSubCategoryPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categoryHeader: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#23262F',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F4F4F4',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  productsContainer: {
    backgroundColor: '#23262F',
    paddingVertical: 20,
  },
  productsGrid: {
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 20,
  },
}); 