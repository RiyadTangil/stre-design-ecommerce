import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { CategoryCard } from '@/components/ui/CategoryCard';

import { PageWrapper } from '@/components/ui/PageWrapper';
import { useDrawer } from '@/hooks/useDrawer';
import { router } from 'expo-router';

// Mock data for categories matching the image
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
    image: { uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' }, 
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
    image: { uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' }, 
    title: 'Fashion' 
  },
];

// Promotional banners data
const promotionalBanners = [
  {
    id: '1',
    title: 'Sweatshirts',
    subtitle: 'Collections',
    buttonText: 'SHOP NOW',
    buttonColor: '#FF6B9D',
    image: { uri: 'https://img.freepik.com/premium-photo/amazed-kid-advertising-background-astonished-boy_279525-14079.jpg' }
  },
  {
    id: '2',
    title: 'Caps',
    subtitle: 'Collections',
    buttonText: 'SHOP NOW',
    buttonColor: '#6B46C1',
    image: { uri: 'https://img.freepik.com/free-photo/portrait-posing-smiling-young-man_1268-21868.jpg?semt=ais_hybrid&w=740&q=80' }
  },
  {
    id: '3',
    title: 'Jackets',
    subtitle: 'Collections',
    buttonText: 'SHOP NOW',
    buttonColor: '#FF6B9D',
    image: { uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop' }
  }
];

export default function CategoriesScreen() {
  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();



  const handleCategoriesScreenCategoryPress = (category: any) => {
    console.log('Category pressed:', category.title);
     router.push({
          pathname: "/products",
          params: { category: category.id },
        });
  };

  const handleShopNowPress = (banner: any) => {
    console.log('Shop now pressed for:', banner.title);
  };





  return (
    <PageWrapper
      title="All Categories"
      showLogo={false}
      leftIcon="back"
      onLeftIconPress={() => console.log('Back pressed')}
      showDrawer={true}
      onCategoryPress={handleCategoryPress}
      onSubCategoryPress={handleSubCategoryPress}
      onSearchPress={() => console.log('Search pressed')}
      onWishlistPress={() => console.log('Wishlist pressed')}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesGrid}>
            {categories.map((item) => (
              <CategoryCard
                key={item.id}
                image={item.image}
                title={item.title}
                onPress={() => handleCategoriesScreenCategoryPress(item)}
              />
            ))}
          </View>
        </View>

        {/* Promotional Banners */}
        <View style={styles.bannersContainer}>
          <View style={styles.bannersList}>
            {promotionalBanners.map((item) => (
              <View key={item.id} style={styles.bannerContainer}>
                <Image source={item.image} style={styles.bannerBackgroundImage} resizeMode="cover" />
                <View style={styles.bannerOverlay} />
                <View style={styles.bannerContent}>
                  <View style={styles.bannerTextContainer}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <Pressable 
                      style={[styles.shopNowButton, { backgroundColor: item.buttonColor }]}
                      onPress={() => handleShopNowPress(item)}
                    >
                      <Text style={styles.shopNowButtonText}>{item.buttonText}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

    </PageWrapper>
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
    paddingBottom: 100,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#181A20',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#23262F',
    paddingVertical: 20,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  bannersContainer: {
    backgroundColor: '#23262F',
    paddingVertical: 20,
  },
  bannersList: {
    paddingHorizontal: 20,
  },
  bannerContainer: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    position: 'relative',
    zIndex: 1,
    justifyContent: 'flex-end',
  },
  bannerTextContainer: {
    width: '50%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  shopNowButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});