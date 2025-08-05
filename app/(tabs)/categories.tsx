import { Header } from '@/components/ui/Header';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Mobiles', icon: '📱', color: '#ec4899' },
  { id: 2, name: 'Electronics', icon: '🎧', color: '#3b82f6' },
  { id: 3, name: 'Fashion', icon: '👕', color: '#10b981' },
  { id: 4, name: 'Furniture', icon: '🛋️', color: '#f59e0b' },
  { id: 5, name: 'Grocery', icon: '🛒', color: '#8b5cf6' },
  { id: 6, name: 'Appliances', icon: '📺', color: '#ef4444' },
  { id: 7, name: 'Toys', icon: '🧸', color: '#06b6d4' },
  { id: 8, name: 'Books', icon: '📚', color: '#84cc16' },
  { id: 9, name: 'Sports', icon: '⚽', color: '#f97316' },
  { id: 10, name: 'Beauty', icon: '💄', color: '#ec4899' },
  { id: 11, name: 'Health', icon: '💊', color: '#10b981' },
  { id: 12, name: 'Automotive', icon: '🚗', color: '#6b7280' },
];



const CategoryItem = ({ category }: { category: typeof categories[0] }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={[styles.categoryIcon, { borderColor: category.color }]}>
      <Text style={styles.categoryIconText}>{category.icon}</Text>
    </View>
    <Text style={styles.categoryName}>{category.name}</Text>
  </TouchableOpacity>
);

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header 
        title="Categories"
        rightIcons={[{ name: "search" }]}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </View>
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
  


  // Category Grid Styles
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (screenWidth - 64) / 3,
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIconText: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
}); 