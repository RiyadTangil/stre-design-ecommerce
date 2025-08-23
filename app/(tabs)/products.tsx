import { PageWrapper } from "@/components/ui/PageWrapper";
import { ProductGridCard } from "@/components/ui/ProductGridCard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
const { height } = Dimensions.get('window')
const POPULAR_PRODUCTS = [
  {
    id: "1",
    title: "Blue Long Dress With Round Neck Denim",
    image: {
      uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Dress",
    rating: 4.5,
    reviews: 265,
    currentPrice: "৳158.15",
    originalPrice: "৳200.00",
    discount: 40,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Black Hat with White suits",
    image: {
      uri: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Accessories",
    rating: 4.2,
    reviews: 189,
    currentPrice: "৳158.15",
    originalPrice: "৳200.00",
    discount: 45,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Brown Women Shirts by Coklat Cloth",
    image: {
      uri: "https://images.unsplash.com/photo-1604695573706-53730d51e7ec?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Shirt",
    rating: 4.0,
    reviews: 142,
    currentPrice: "৳24.15",
    originalPrice: "৳50.00",
    discount: 13,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Elegant White Summer Dress",
    image: {
      uri: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Dress",
    rating: 4.7,
    reviews: 312,
    currentPrice: "৳89.99",
    originalPrice: "৳130.00",
    discount: 30,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Red Casual T-Shirt",
    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "T-Shirt",
    rating: 4.3,
    reviews: 210,
    currentPrice: "৳39.99",
    originalPrice: "৳60.00",
    discount: 20,
    isFavorite: false,
  },
  {
    id: "6",
    title: "Green Summer Top",
    image: {
      uri: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Top",
    rating: 4.1,
    reviews: 98,
    currentPrice: "৳29.99",
    originalPrice: "৳45.00",
    discount: 10,
    isFavorite: false,
  },
   {
    id: "7",
    title: "Blue Long Dress With Round Neck Denim",
    image: {
      uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Dress",
    rating: 4.5,
    reviews: 265,
    currentPrice: "৳158.15",
    originalPrice: "৳200.00",
    discount: 40,
    isFavorite: false,
  },
  {
    id: "8",
    title: "Black Hat with White suits",
    image: {
      uri: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Accessories",
    rating: 4.2,
    reviews: 189,
    currentPrice: "৳158.15",
    originalPrice: "৳200.00",
    discount: 45,
    isFavorite: true,
  },
  {
    id: "9",
    title: "Brown Women Shirts by Coklat Cloth",
    image: {
      uri: "https://images.unsplash.com/photo-1604695573706-53730d51e7ec?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Shirt",
    rating: 4.0,
    reviews: 142,
    currentPrice: "৳24.15",
    originalPrice: "৳50.00",
    discount: 13,
    isFavorite: false,
  },
];

const BEST_PRODUCTS = [
  {
    id: "7",
    title: "Classic Black Leather Shoes",
    image: {
      uri: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Shoes",
    rating: 4.8,
    reviews: 320,
    currentPrice: "৳120.00",
    originalPrice: "৳180.00",
    discount: 33,
    isFavorite: true,
  },
  {
    id: "8",
    title: "Elegant Red Party Dress",
    image: {
      uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Dress",
    rating: 4.6,
    reviews: 210,
    currentPrice: "৳99.99",
    originalPrice: "৳150.00",
    discount: 25,
    isFavorite: false,
  },
  {
    id: "9",
    title: "Stylish Blue Denim Jacket",
    image: {
      uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Jacket",
    rating: 4.7,
    reviews: 180,
    currentPrice: "৳79.99",
    originalPrice: "৳120.00",
    discount: 20,
    isFavorite: false,
  },
  {
    id: "10",
    title: "White Sneakers",
    image: {
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Shoes",
    rating: 4.9,
    reviews: 400,
    currentPrice: "৳59.99",
    originalPrice: "৳90.00",
    discount: 15,
    isFavorite: true,
  },
  {
    id: "11",
    title: "Brown Leather Handbag",
    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Accessories",
    rating: 4.5,
    reviews: 150,
    currentPrice: "৳49.99",
    originalPrice: "৳80.00",
    discount: 10,
    isFavorite: false,
  },
  {
    id: "12",
    title: "Green Floral Skirt",
    image: {
      uri: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Skirt",
    rating: 4.3,
    reviews: 110,
    currentPrice: "৳39.99",
    originalPrice: "৳60.00",
    discount: 20,
    isFavorite: false,
  },
];

const FLASH_SALE_PRODUCTS = [
  {
    id: "13",
    title: "Flash Sale: Red Hoodie",
    image: {
      uri: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Hoodie",
    rating: 4.4,
    reviews: 90,
    currentPrice: "৳19.99",
    originalPrice: "৳40.00",
    discount: 50,
    isFavorite: false,
  },
  {
    id: "14",
    title: "Flash Sale: Blue Jeans",
    image: {
      uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Jeans",
    rating: 4.2,
    reviews: 120,
    currentPrice: "৳29.99",
    originalPrice: "৳60.00",
    discount: 50,
    isFavorite: false,
  },
  {
    id: "15",
    title: "Flash Sale: White T-Shirt",
    image: {
      uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "T-Shirt",
    rating: 4.1,
    reviews: 80,
    currentPrice: "৳14.99",
    originalPrice: "৳30.00",
    discount: 50,
    isFavorite: false,
  },
  {
    id: "16",
    title: "Flash Sale: Black Sneakers",
    image: {
      uri: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Shoes",
    rating: 4.6,
    reviews: 140,
    currentPrice: "৳34.99",
    originalPrice: "৳70.00",
    discount: 50,
    isFavorite: true,
  },
  {
    id: "17",
    title: "Flash Sale: Green Dress",
    image: {
      uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Dress",
    rating: 4.3,
    reviews: 100,
    currentPrice: "৳24.99",
    originalPrice: "৳50.00",
    discount: 50,
    isFavorite: false,
  },
  {
    id: "18",
    title: "Flash Sale: Brown Handbag",
    image: {
      uri: "https://images.unsplash.com/photo-1604695573706-53730d51e7ec?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    },
    category: "Accessories",
    rating: 4.0,
    reviews: 60,
    currentPrice: "৳29.99",
    originalPrice: "৳60.00",
    discount: 50,
    isFavorite: false,
  },
];


const ITEMS_PER_PAGE = 6;

export default function ProductsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Popular");
  const [popularProducts, setPopularProducts] = useState(POPULAR_PRODUCTS);
  const [bestProducts, setBestProducts] = useState(BEST_PRODUCTS);
  const [flashSaleProducts, setFlashSaleProducts] =
    useState(FLASH_SALE_PRODUCTS);
  
  // Pagination states
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const tabs = ["Popular", "Best Products", "Flash Sale"];

  const getAllProducts = () => {
    if (activeTab === "Popular") return popularProducts;
    if (activeTab === "Best Products") return bestProducts;
    if (activeTab === "Flash Sale") return flashSaleProducts;
    return [];
  };

  const loadMoreProducts = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const allProducts = getAllProducts();
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProducts = allProducts.slice(startIndex, endIndex);
      
      if (newProducts.length > 0) {
        setDisplayedProducts(prev => [...prev, ...newProducts]);
        setCurrentPage(prev => prev + 1);
        
        // Check if there are more products to load
        if (endIndex >= allProducts.length) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 800); // Simulate network delay
  };

  const resetPagination = () => {
    setDisplayedProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setLoading(false);
  };

  // Initialize products when component mounts or tab changes
  useEffect(() => {
    resetPagination();
    loadMoreProducts();
  }, [activeTab]);

  const toggleFavorite = (productId: string) => {
    // Update the main product arrays
    if (activeTab === "Popular") {
      setPopularProducts(
        popularProducts.map((product) =>
          product.id === productId
            ? { ...product, isFavorite: !product.isFavorite }
            : product
        )
      );
    } else if (activeTab === "Best Products") {
      setBestProducts(
        bestProducts.map((product) =>
          product.id === productId
            ? { ...product, isFavorite: !product.isFavorite }
            : product
        )
      );
    } else if (activeTab === "Flash Sale") {
      setFlashSaleProducts(
        flashSaleProducts.map((product) =>
          product.id === productId
            ? { ...product, isFavorite: !product.isFavorite }
            : product
        )
      );
    }
    
    // Update displayed products as well
    setDisplayedProducts(
      displayedProducts.map((product) =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="#FF6B9D" />
        <Text style={styles.loadingText}>Loading more products...</Text>
      </View>
    );
  };

  return (
    <PageWrapper
      title="Products"
      showLogo={false}
      leftIcon="back"
    >
      <View style={styles.container}>
        {/* Tab Navigation */}
        <View style={styles.tabWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}
            contentContainerStyle={styles.tabContent}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <FlatList
        data={displayedProducts}
        renderItem={({ item }) => (
          <ProductGridCard
            item={item}
            onPress={() => {
              // Navigate to product details
              router.push(`/product-details?id=${item.id}`);
            }}
            onToggleWishlist={() => toggleFavorite(item.id)}
            showWishlistButton={true}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.productList}
        contentContainerStyle={styles.productListContent}
        columnWrapperStyle={styles.gridRow}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
         ListFooterComponent={renderFooter}
       />
      </View>
     </PageWrapper>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.product.background,
  },
  tabWrapper: {
    backgroundColor: Colors.product.background,
    zIndex: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Colors.product.background,
    zIndex: 1,
  },
  
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.product.white,
  },
  tabContainer: {
    backgroundColor: Colors.product.background,
    zIndex: 1,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.product.accentPink,
  },
  tabText: {
    fontSize: 16,
    color: Colors.product.lightGrey,
  },
  activeTabText: {
    color: Colors.product.accentPink,
    fontWeight: "600",
  },
  productList: {
    flex: 1,
    backgroundColor: Colors.product.background,
  },
  productListContent: {
    padding: 16,
    paddingBottom: 100, // Add padding at bottom for better scroll experience
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: height - 200,

    flex: 1,
  },
  loadingText: {
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
    marginTop: 8,
  },
});
