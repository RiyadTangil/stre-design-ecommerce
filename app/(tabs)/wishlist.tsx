import { Header } from '@/components/ui/Header';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const wishlistItems = [
  {
    id: 1,
    name: 'Fashion Hat & Jacket',
    price: '$89.99',
    originalPrice: '$120.00',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop',
    discount: '25%',
  },
  {
    id: 2,
    name: 'Leather Jacket',
    price: '$129.99',
    originalPrice: '$180.00',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
    discount: '28%',
  },
  {
    id: 3,
    name: 'Casual Style',
    price: '$59.99',
    originalPrice: '$80.00',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
    discount: '25%',
  },
  {
    id: 4,
    name: 'Summer Collection',
    price: '$79.99',
    originalPrice: '$100.00',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
    discount: '20%',
  },
  {
    id: 5,
    name: 'Designer Bag',
    price: '$199.99',
    originalPrice: '$250.00',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=400&fit=crop',
    discount: '20%',
  },
  {
    id: 6,
    name: 'Sneakers',
    price: '$89.99',
    originalPrice: '$120.00',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
    discount: '25%',
  },
];



const WishlistItem = ({ item }: { item: typeof wishlistItems[0] }) => (
  <TouchableOpacity style={styles.wishlistItem}>
    <View style={styles.itemImageContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        contentFit="cover"
      />
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="close" size={16} color="white" />
      </TouchableOpacity>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
    </View>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.originalPrice}>{item.originalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function WishlistScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header 
        title="Wishlist"
        rightIcons={[{ name: "search" }]}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {wishlistItems.length > 0 ? (
          <View style={styles.wishlistGrid}>
            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>
              Start adding items you love to your wishlist
            </Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
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
    padding: 16,
  },
  


  // Wishlist Grid Styles
  wishlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wishlistItem: {
    width: (screenWidth - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  // Empty State Styles
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 