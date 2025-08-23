import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";

// Import our reusable components
import { CategoryCard } from "@/components/ui/CategoryCard";
import { FeaturedCategoryCard } from "@/components/ui/FeaturedCategoryCard";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductGridCard } from "@/components/ui/ProductGridCard";
import { ProductListItem } from "@/components/ui/ProductListItem";
import { SaleTimer } from "@/components/ui/SaleTimer";
import { SearchPage } from "@/components/ui/SearchPage";
import { SearchResults } from "@/components/ui/SearchResults";
import { useDrawer } from "@/hooks/useDrawer";
import { useSearch } from "@/hooks/useSearch";

// Mock data for the app
const categories = [
  {
    id: "1",
    image: {
      uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    },
    title: "Mobiles",
  },
  {
    id: "2",
    image: {
      uri: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    },
    title: "Electronics",
  },
  {
    id: "3",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    title: "Fashion",
  },
  {
    id: "4",
    image: {
      uri: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
    },
    title: "Furniture",
  },
  {
    id: "5",
    image: {
      uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
    },
    title: "Grocery",
  },
  {
    id: "6",
    image: {
      uri: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
    },
    title: "Appliances",
  },
  {
    id: "7",
    image: {
      uri: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop",
    },
    title: "Toys",
  },
  {
    id: "8",
    image: {
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    },
    title: "More",
  },
];

const popularProducts = [
  {
    id: "1",
    image: {
      uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    title: "Peter England casual",
    price: "৳45.00",
    originalPrice: "৳50.15",
  },
  {
    id: "2",
    image: {
      uri: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    },
    title: "Zip-Front Track Jacket",
    price: "৳23.12",
    originalPrice: "৳30.15",
  },
  {
    id: "3",
    image: {
      uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
    title: "Louis V",
    price: "৳155.00",
    originalPrice: "৳200.00",
  },
  {
    id: "4",
    image: {
      uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    },
    title: "Nike Air Max",
    price: "৳89.99",
    originalPrice: "৳120.00",
  },
  {
    id: "5",
    image: {
      uri: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    },
    title: "Adidas Ultraboost",
    price: "৳129.99",
    originalPrice: "৳180.00",
  },
];

const featuredCategories = [
  {
    id: "1",
    image: {
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    },
    title: "Headphones",
    subtitle: "Up to 80% off",
  },
  {
    id: "2",
    image: {
      uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    },
    title: "Mobile Phones",
    subtitle: "From ৳1999",
  },
  {
    id: "3",
    image: {
      uri: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    },
    title: "Laptops",
    subtitle: "Up to 50% off",
  },
  {
    id: "4",
    image: {
      uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    },
    title: "Cameras",
    subtitle: "Up to 60% off",
  },
  {
    id: "5",
    image: {
      uri: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop",
    },
    title: "Smartwatches",
    subtitle: "From ৳299",
  },
];

const popularItems = [
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

const topSelection = [
  {
    id: "1",
    image: {
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    },
    category: "Electronics",
    title: "Wired Earphones",
    currentPrice: "৳25.00",
    originalPrice: "৳50.00",
    isWishlisted: false,
  },
  {
    id: "2",
    image: {
      uri: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    },
    category: "Mobile",
    title: "Top Mobiles",
    currentPrice: "৳15,999",
    originalPrice: "৳31,999",
    isWishlisted: true,
  },
  {
    id: "3",
    image: {
      uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    },
    category: "Audio",
    title: "Premium Headphones",
    currentPrice: "৳89.99",
    originalPrice: "৳179.99",
    isWishlisted: false,
  },
  {
    id: "4",
    image: {
      uri: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    },
    category: "Computers",
    title: "Best Laptops",
    currentPrice: "৳45,999",
    originalPrice: "৳91,999",
    isWishlisted: false,
  },
];

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPopularIndex, setCurrentPopularIndex] = useState(0);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  
  const popularCarouselRef = useRef<FlatList>(null);
  const featuredCarouselRef = useRef<FlatList>(null);
  const popularScrollX = useRef(new Animated.Value(0)).current;
  const featuredScrollX = useRef(new Animated.Value(0)).current;
  const popularAutoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const featuredAutoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();

  const {
    isSearchVisible,
    showResults,
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    openSearch,
    closeSearch,
    closeResults,
    performSearch,
    handleProductPress,
  } = useSearch();

  // This is the correct handleAddToCart function that uses the cart hook
  const handleAddToCart = () => {
    // This will be handled by the useCart hook now
    // We'll keep this function for compatibility with existing components
    console.log('Item added to cart');
  };

  const handleHeroPress = (index: number) => {
    console.log("Hero image pressed:", index);
    // Navigate to specific category or product based on index
  };
  const handleHomeCategoryPress = (category: any) => {
    router.push({
      pathname: "/categories",
      params: { category: category.id },
    });
    console.log("Home category pressed:", category.title);
  };

  const handleHomeProductPress = (product: any) => {
    console.log("Product pressed:", product.title);
    // Navigate to product details with product data
    router.push({
      pathname: "/product-details",
      params: { productId: product.id },
    });
  };

  const handleViewAll = (section: string) => {
    console.log("View all pressed for:", section);
  };

  const handleMenuPress = () => {
    openDrawer();
  };

  const handleSearchPress = () => {
    openSearch();
  };

  // Infinite scrolling carousel for Popular section
  const createInfiniteData = useCallback((data: any[]) => {
    if (data.length === 0) return data;
    // Create a longer array by repeating the data multiple times
    const repeatedData = [];
    for (let i = 0; i < 3; i++) {
      repeatedData.push(
        ...data.map((item, index) => ({
          ...item,
          id: `${item.id}_${i}`,
          originalId: item.id,
        }))
      );
    }
    return repeatedData;
  }, []);

  const infinitePopularProducts = createInfiniteData(popularProducts);
  const infiniteFeaturedCategories = createInfiniteData(featuredCategories);

  const startPopularAutoPlay = useCallback(() => {
    if (popularAutoPlayTimer.current) {
      clearInterval(popularAutoPlayTimer.current);
    }

    popularAutoPlayTimer.current = setInterval(() => {
      if (popularCarouselRef.current) {
        const nextIndex = (currentPopularIndex + 1) % popularProducts.length;
        const targetIndex = nextIndex + popularProducts.length; // Offset by one set
        popularCarouselRef.current.scrollToIndex({
          index: targetIndex,
          animated: true,
        });
        setCurrentPopularIndex(nextIndex);
      }
    }, 3000); // Auto-scroll every 3 seconds
  }, [currentPopularIndex, popularProducts.length]);

  const stopPopularAutoPlay = useCallback(() => {
    if (popularAutoPlayTimer.current) {
      clearInterval(popularAutoPlayTimer.current);
      popularAutoPlayTimer.current = null;
    }
  }, []);

  // Auto-play for Featured Categories section
  const startFeaturedAutoPlay = useCallback(() => {
    if (featuredAutoPlayTimer.current) {
      clearInterval(featuredAutoPlayTimer.current);
    }

    featuredAutoPlayTimer.current = setInterval(() => {
      if (featuredCarouselRef.current) {
        const nextIndex =
          (currentFeaturedIndex + 1) % featuredCategories.length;
        const targetIndex = nextIndex + featuredCategories.length; // Offset by one set
        featuredCarouselRef.current.scrollToIndex({
          index: targetIndex,
          animated: true,
        });
        setCurrentFeaturedIndex(nextIndex);
      }
    }, 4000); // Auto-scroll every 4 seconds (slightly slower than popular)
  }, [currentFeaturedIndex, featuredCategories.length]);

  const stopFeaturedAutoPlay = useCallback(() => {
    if (featuredAutoPlayTimer.current) {
      clearInterval(featuredAutoPlayTimer.current);
      featuredAutoPlayTimer.current = null;
    }
  }, []);

  useEffect(() => {
    startPopularAutoPlay();
    return () => stopPopularAutoPlay();
  }, [startPopularAutoPlay, stopPopularAutoPlay]);

  useEffect(() => {
    startFeaturedAutoPlay();
    return () => stopFeaturedAutoPlay();
  }, [startFeaturedAutoPlay, stopFeaturedAutoPlay]);

  const onPopularViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index || 0;
        const actualIndex = index % popularProducts.length;
        setCurrentPopularIndex(actualIndex);
      }
    }
  ).current;

  const onFeaturedViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index || 0;
        const actualIndex = index % featuredCategories.length;
        setCurrentFeaturedIndex(actualIndex);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderProductCard = ({ item }: { item: any }) => (
    <ProductCard
      image={item.image}
      title={item.title}
      price={item.price}
      originalPrice={item.originalPrice}
      onPress={() => handleHomeProductPress(item)}
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
 useEffect(() => {
    // Simulate loading product data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const renderTopSelection = ({ item }: { item: any }) => (
    <ProductGridCard
      item={item}
      onPress={handleProductPress}
      showWishlistButton={true}
    />
  );
  const heroImages = [
    {
      id: "1",
      uri: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop",
    },
    {
      id: "2",
      uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    },
    {
      id: "3",
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop",
    },
  ];
  return (
    <PageWrapper
      title="Home"
      showLogo={true}
      isLoading={isLoading}
      loadingMessage="Loading Home..."

      rightIcons={['search', 'wishlist', 'cart']}
      // onCategoryPress={handleCategoryPress}
      // onSubCategoryPress={handleSubCategoryPress}
      onSearchPress={handleSearchPress}
      onWishlistPress={() => console.log("Wishlist pressed")}
    >
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
            <Pressable onPress={() => handleViewAll("Most Popular")}>
              <Text style={styles.viewAllText}>View all {">"}</Text>
            </Pressable>
          </View>
          <View style={styles.carouselContainer}>
            <FlatList
              ref={popularCarouselRef}
              data={infinitePopularProducts}
              renderItem={renderProductCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: popularScrollX } } }],
                { useNativeDriver: false }
              )}
              onViewableItemsChanged={onPopularViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              scrollEventThrottle={16}
              decelerationRate={0.8}
              snapToInterval={172} // 160 (card width) + 12 (margin)
              snapToAlignment="start"
              bounces={false}
              overScrollMode="never"
              onScrollBeginDrag={stopPopularAutoPlay}
              onScrollEndDrag={startPopularAutoPlay}
              onMomentumScrollEnd={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / 172);
                const actualIndex = index % popularProducts.length;
                setCurrentPopularIndex(actualIndex);
              }}
            />
          </View>
        </View>

        {/* Featured Categories */}
        <View style={[styles.section, styles.featuredCategoriesSection]}>
          <View style={styles.carouselContainer}>
            <FlatList
              ref={featuredCarouselRef}
              data={infiniteFeaturedCategories}
              renderItem={renderFeaturedCategory}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: featuredScrollX } } }],
                { useNativeDriver: false }
              )}
              onViewableItemsChanged={onFeaturedViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              scrollEventThrottle={16}
              decelerationRate={0.8}
              snapToInterval={172} // 160 (card width) + 12 (margin)
              snapToAlignment="start"
              bounces={false}
              overScrollMode="never"
              onScrollBeginDrag={stopFeaturedAutoPlay}
              onScrollEndDrag={startFeaturedAutoPlay}
              onMomentumScrollEnd={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / 172);
                const actualIndex = index % featuredCategories.length;
                setCurrentFeaturedIndex(actualIndex);
              }}
            />
          </View>
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <Pressable onPress={() => handleViewAll("Popular Items")}>
              <Text style={styles.viewAllText}>View all {">"}</Text>
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
                onPress={() => handleHomeProductPress(item)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </View>

        {/* Top Selection */}
        <View style={[styles.section, styles.topSelectionSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Selection</Text>
          </View>

          <View style={styles.topSelectionGrid}>
            {topSelection.map((item) => (
              <View key={item.id} style={styles.topSelectionItem}>
                {renderTopSelection({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Search Page */}
      <SearchPage
        isVisible={isSearchVisible}
        onClose={closeSearch}
        onSearch={performSearch}
        recentSearches={recentSearches}
      />

      {/* Search Results */}
      {showResults && (
        <SearchResults
          query={searchQuery}
          results={searchResults}
          loading={isSearching}
          onProductPress={handleProductPress}
          onBackToSearch={closeResults}
        />
      )}

    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom tab bar
  },
  categoriesContainer: {
    backgroundColor: "#23262F",
    paddingVertical: 16,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
  section: {
    // backgroundColor: '#23262F',
    marginTop: 12,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F4F4F4",
  },
  viewAllText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  popularItemsContainer: {
    paddingHorizontal: 20,
  },
  carouselContainer: {
    position: "relative",
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  featuredCategoriesSection: {
    borderTopWidth: 1,
    borderTopColor: "#2A2D35",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2D35",
  },
  topSelectionSection: {
    backgroundColor: "#2F2F2F",
  },
  topSelectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  topSelectionItem: {
    width: "50%",
    // marginBottom: 20,
  },
});
