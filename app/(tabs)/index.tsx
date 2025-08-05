import { Header } from '@/components/ui/Header';
import { ProductCard } from '@/components/ui/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

// Mock data for the home page
const categories = [
  { id: 1, name: 'Mobiles', icon: '📱' },
  { id: 2, name: 'Electronics', icon: '🎧' },
  { id: 3, name: 'Fashion', icon: '👕' },
  { id: 4, name: 'Furniture', icon: '🛋️' },
  { id: 5, name: 'Grocery', icon: '🛒' },
  { id: 6, name: 'Appliances', icon: '📺' },
  { id: 7, name: 'Toys', icon: '🧸' },
  { id: 8, name: 'More', icon: '⋯' },
];

const popularProducts = [
  {
    id: 1,
    name: 'Fashion Hat & Jacket',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Leather Jacket',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Casual Style',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Summer Collection',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
  },
];



const PromotionalBanner = () => (
  <View style={styles.bannerContainer}>
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6']}
      style={styles.bannerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.bannerContent}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerSubtitle}>11th Gen Intel® Core™ laptop processors</Text>
          <Text style={styles.bannerTitle}>Loaded up and ready to go.</Text>
          <Text style={styles.bannerDescription}>
            Packed with performance and innovative features designed to give desktop-caliber gameplay.
          </Text>
          <View style={styles.intelLogos}>
            <View style={styles.intelLogo}>
              <Text style={styles.intelLogoText}>intel CORE i5</Text>
            </View>
            <View style={styles.intelLogo}>
              <Text style={styles.intelLogoText}>intel CORE i7</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop now</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.bannerRight}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop' }}
            style={styles.bannerImage}
            contentFit="cover"
          />
        </View>
      </View>
      <View style={styles.bannerPagination}>
        <View style={[styles.paginationDot, styles.paginationDotActive]} />
        <View style={styles.paginationDot} />
        <View style={styles.paginationDot} />
      </View>
    </LinearGradient>
  </View>
);

const CategoryGrid = () => (
  <View style={styles.categoryContainer}>
    <View style={styles.categoryGrid}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <View style={[
            styles.categoryIcon,
            category.name === 'More' && styles.categoryIconMore
          ]}>
            <Text style={[
              styles.categoryIconText,
              category.name === 'More' && styles.categoryIconTextMore
            ]}>
              {category.icon}
            </Text>
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const SalesCountdown = () => (
  <View style={styles.salesContainer}>
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6']}
      style={styles.salesGradient}
    >
      <View style={styles.salesBadge}>
        <Text style={styles.salesBadgeText}>BIG{'\n'}SALE</Text>
      </View>
      <View style={styles.salesContent}>
        <Text style={styles.salesText}>Sales end in</Text>
        <Text style={styles.salesCountdown}>04hrs 10Mins 53Secs</Text>
      </View>
    </LinearGradient>
  </View>
);

const PopularSection = () => (
  <View style={styles.popularContainer}>
    <View style={styles.popularHeader}>
      <Text style={styles.popularTitle}>Most Popular</Text>
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View all</Text>
        <Ionicons name="chevron-forward" size={16} color="#666" />
      </TouchableOpacity>
    </View>
    <FlatList
      data={popularProducts}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.popularList}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          cardWidth={160}
          imageHeight={200}
          showWishlistButton={true}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header 
        title="Home"
        leftIcon="menu"
        rightIcons={[
          { name: "search" },
          { name: "heart-outline" },
          { name: "cart-outline", badge: "3" }
        ]}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PromotionalBanner />
        <CategoryGrid />
        <SalesCountdown />
        <PopularSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  


  // Banner Styles
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bannerGradient: {
    padding: 20,
    minHeight: 200,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerLeft: {
    flex: 1,
    marginRight: 16,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    lineHeight: 28,
  },
  bannerDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
    lineHeight: 20,
  },
  intelLogos: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  intelLogo: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  intelLogoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  bannerRight: {
    width: 120,
    height: 120,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  bannerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },

  // Category Styles
  categoryContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (screenWidth - 64) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ec4899',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
  },
  categoryIconMore: {
    backgroundColor: '#ec4899',
    borderColor: '#ec4899',
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryIconTextMore: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },

  // Sales Styles
  salesContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  salesGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 80,
  },
  salesBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f97316',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginLeft: -8,
  },
  salesBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 14,
  },
  salesContent: {
    flex: 1,
  },
  salesText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  salesCountdown: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Popular Section Styles
  popularContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  popularTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  popularList: {
    paddingRight: 16,
  },


});
