import { SafeAreaView } from '@/components/ui/SafeAreaProvider';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Import our reusable components
import { AppHeader } from '@/components/ui/AppHeader';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Drawer } from '@/components/ui/Drawer';
import { FeaturedCategoryCard } from '@/components/ui/FeaturedCategoryCard';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductListItem } from '@/components/ui/ProductListItem';
import { SaleTimer } from '@/components/ui/SaleTimer';
import { useDrawer } from '@/hooks/useDrawer';

// Mock data for the app
const categories = [
  { 
    id: '1', 
    image: { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' }, 
    title: 'Mobiles' 
  },
  { 
    id: '2', 
    image: { uri: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' }, 
    title: 'Electronics' 
  },
  { 
    id: '3', 
    image: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' }, 
    title: 'Fashion' 
  },
  { 
    id: '4', 
    image: { uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' }, 
    title: 'Furniture' 
  },
  { 
    id: '5', 
    image: { uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop' }, 
    title: 'Grocery' 
  },
  { 
    id: '6', 
    image: { uri: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop' }, 
    title: 'Appliances' 
  },
  { 
    id: '7', 
    image: { uri: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop' }, 
    title: 'Toys' 
  },
  { 
    id: '8', 
    image: { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }, 
    title: 'More' 
  },
];

const popularProducts = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    title: 'Peter England casual',
    price: '$45.00',
    originalPrice: '$50.15',
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    title: 'Zip-Front Track Jacket',
    price: '$23.12',
    originalPrice: '$30.15',
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    title: 'Louis V',
    price: '$155.00',
    originalPrice: '$200.00',
  },
  {
    id: '4',
    image: { uri: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop' },
    title: 'Nike Air Max',
    price: '$89.99',
    originalPrice: '$120.00',
  },
  {
    id: '5',
    image: { uri: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop' },
    title: 'Adidas Ultraboost',
    price: '$129.99',
    originalPrice: '$180.00',
  },
];

const featuredCategories = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    title: 'Headphones',
    subtitle: 'Up to 80% off',
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop' },
    title: 'Mobile Phones',
    subtitle: 'From $1999',
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
    title: 'Laptops',
    subtitle: 'Up to 50% off',
  },
  {
    id: '4',
    image: { uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop' },
    title: 'Cameras',
    subtitle: 'Up to 60% off',
  },
  {
    id: '5',
    image: { uri: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop' },
    title: 'Smartwatches',
    subtitle: 'From $299',
  },
];

const popularItems = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop' },
    title: 'Havells Swing Fan',
    description: '400mm, Blue tone',
    discount: '20% off',
    originalPrice: '$1500',
    currentPrice: '$1,299',
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop' },
    title: 'OnePlus Nord 2T 5G',
    description: '8GB RAM, 128GB Storage',
    discount: '50% off',
    originalPrice: '$1,500',
    currentPrice: '$999',
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop' },
    title: 'ThinkPad L13 Yoga Gen 3',
    description: 'Dual core, Red tone',
    discount: '20% off',
    originalPrice: '$2500',
    currentPrice: '$2299',
  },
  {
    id: '4',
    image: { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    title: 'Sony WH-1000XM4',
    description: 'Noise cancelling, Wireless',
    discount: '30% off',
    originalPrice: '$349',
    currentPrice: '$244',
  },
  {
    id: '5',
    image: { uri: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop' },
    title: 'Apple Watch Series 7',
    description: 'GPS, Always-On Display',
    discount: '15% off',
    originalPrice: '$399',
    currentPrice: '$339',
  },
];

const topSelection = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    title: 'Wired Earphones',
    subtitle: 'upto 50% off',
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop' },
    title: 'Top Mobiles',
    subtitle: 'upto 50% off',
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop' },
    title: 'Cameras',
    subtitle: 'upto 50% off',
  },
  {
    id: '4',
    image: { uri: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
    title: 'Best Laptops',
    subtitle: 'upto 50% off',
  },
  {
    id: '5',
    image: { uri: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop' },
    title: 'Smartwatches',
    subtitle: 'upto 50% off',
  },
];

export default function HomeScreen() {
  const [cartCount, setCartCount] = useState(3);
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

  const handleHeroPress = (index: number) => {
    console.log('Hero image pressed:', index);
    // Navigate to specific category or product based on index
  };

  const handleHomeCategoryPress = (category: any) => {
    console.log('Home category pressed:', category.title);
  };

  const handleProductPress = (product: any) => {
    console.log('Product pressed:', product.title);
  };

  const handleViewAll = (section: string) => {
    console.log('View all pressed for:', section);
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

  const renderFeaturedCategory = ({ item }: { item: any }) => (
    <FeaturedCategoryCard
      image={item.image}
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => handleProductPress(item)}
    />
  );

  const renderTopSelection = ({ item }: { item: any }) => (
    <FeaturedCategoryCard
      image={item.image}
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => handleProductPress(item)}
    />
  );
  const heroImages = [
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop',
    },


  ];
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      {/* Header */}
      <AppHeader
        title="Home"
        cartCount={cartCount}
        showLogo={true}
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
        {/* Hero Banner */}

        <ImageCarousel
          images={heroImages}
          height={200}
          autoPlay={true}
          autoPlayInterval={4000}
          showPagination={true}
          onImagePress={handleHeroPress}
        />
   

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard
                image={item.image}
                title={item.title}
                onPress={() => handleHomeCategoryPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>

        {/* Sale Timer */}
        <SaleTimer endTime={new Date(Date.now() + 4 * 60 * 60 * 1000)} />

        {/* Most Popular Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
            <Pressable onPress={() => handleViewAll('Most Popular')}>
              <Text style={styles.viewAllText}>View all {'>'}</Text>
            </Pressable>
          </View>
          <FlatList
            data={popularProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Featured Categories */}
        <View style={styles.section}>
          <FlatList
            data={featuredCategories}
            renderItem={renderFeaturedCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <Pressable onPress={() => handleViewAll('Popular Items')}>
              <Text style={styles.viewAllText}>View all {'>'}</Text>
            </Pressable>
          </View>
          <View style={styles.popularItemsContainer}>
            {popularItems.map((item) => (
              <ProductListItem
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                discount={item.discount}
                originalPrice={item.originalPrice}
                currentPrice={item.currentPrice}
                onPress={() => handleProductPress(item)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </View>

        {/* Top Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selection</Text>
          <FlatList
            data={topSelection}
            renderItem={renderTopSelection}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

      </ScrollView>

      {/* Drawer */}
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
    paddingBottom: 100, // Space for bottom tab bar
  },
  categoriesContainer: {
    backgroundColor: '#23262F',
    paddingVertical: 16,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#23262F',
    marginTop: 12,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F4F4F4',
  },
  viewAllText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  popularItemsContainer: {
    paddingHorizontal: 20,
  },
});
