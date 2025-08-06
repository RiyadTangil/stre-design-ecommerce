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
import { CategoryCard } from '@/components/ui/CategoryCard';
import { Drawer } from '@/components/ui/Drawer';
import { useDrawer } from '@/hooks/useDrawer';

// Mock data for categories
const categories = [
  { 
    id: '1', 
    image: { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' }, 
    title: 'Electronics' 
  },
  { 
    id: '2', 
    image: { uri: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' }, 
    title: 'Fashion' 
  },
  { 
    id: '3', 
    image: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' }, 
    title: 'Home & Garden' 
  },
  { 
    id: '4', 
    image: { uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' }, 
    title: 'Sports' 
  },
  { 
    id: '5', 
    image: { uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop' }, 
    title: 'Books' 
  },
  { 
    id: '6', 
    image: { uri: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop' }, 
    title: 'Toys & Games' 
  },
  { 
    id: '7', 
    image: { uri: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop' }, 
    title: 'Beauty' 
  },
  { 
    id: '8', 
    image: { uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }, 
    title: 'Automotive' 
  },
];

export default function CategoriesScreen() {
  const [cartCount, setCartCount] = useState(2);
  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();

  const handleMenuPress = () => {
    openDrawer();
  };

  const handleCategoriesScreenCategoryPress = (category: any) => {
    console.log('Category pressed:', category.title);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      
      <AppHeader
        title="Categories"
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
        {/* Categories Header */}
        <View style={styles.header}>
          <Text style={styles.title}>All Categories</Text>
          <Text style={styles.subtitle}>Browse through our wide selection</Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
                             <CategoryCard
                 image={item.image}
                 title={item.title}
                 onPress={() => handleCategoriesScreenCategoryPress(item)}
               />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>
      </ScrollView>

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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#23262F',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F4F4F4',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  categoriesContainer: {
    backgroundColor: '#23262F',
    paddingVertical: 20,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
}); 