import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeArea } from './SafeAreaProvider';

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onCategoryPress: (category: Category) => void;
  onSubCategoryPress: (category: Category, subCategory: SubCategory) => void;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: 'phone-portrait',
    subCategories: [
      { id: '1-1', name: 'Smartphones' },
      { id: '1-2', name: 'Laptops' },
      { id: '1-3', name: 'Tablets' },
      { id: '1-4', name: 'Accessories' },
    ],
  },
  {
    id: '2',
    name: 'Fashion',
    icon: 'shirt',
    subCategories: [
      { id: '2-1', name: 'Men\'s Clothing' },
      { id: '2-2', name: 'Women\'s Clothing' },
      { id: '2-3', name: 'Shoes' },
      { id: '2-4', name: 'Accessories' },
    ],
  },
  {
    id: '3',
    name: 'Home & Garden',
    icon: 'home',
    subCategories: [
      { id: '3-1', name: 'Furniture' },
      { id: '3-2', name: 'Decor' },
      { id: '3-3', name: 'Kitchen' },
      { id: '3-4', name: 'Garden' },
    ],
  },
  {
    id: '4',
    name: 'Sports',
    icon: 'football',
    subCategories: [
      { id: '4-1', name: 'Fitness' },
      { id: '4-2', name: 'Outdoor' },
      { id: '4-3', name: 'Team Sports' },
      { id: '4-4', name: 'Equipment' },
    ],
  },
  {
    id: '5',
    name: 'Books',
    icon: 'library',
    subCategories: [
      { id: '5-1', name: 'Fiction' },
      { id: '5-2', name: 'Non-Fiction' },
      { id: '5-3', name: 'Academic' },
      { id: '5-4', name: 'Children' },
    ],
  },
  {
    id: '6',
    name: 'Toys & Games',
    icon: 'game-controller',
    subCategories: [
      { id: '6-1', name: 'Board Games' },
      { id: '6-2', name: 'Video Games' },
      { id: '6-3', name: 'Educational' },
      { id: '6-4', name: 'Outdoor Toys' },
    ],
  },
  {
    id: '7',
    name: 'Fashion',
    icon: 'shirt',
    subCategories: [
      { id: '2-1', name: 'Men\'s Clothing' },
      { id: '2-2', name: 'Women\'s Clothing' },
      { id: '2-3', name: 'Shoes' },
      { id: '2-4', name: 'Accessories' },
    ],
  },
  {
    id: '7',
    name: 'Sports',
    icon: 'football',
    subCategories: [
      { id: '4-1', name: 'Fitness' },
      { id: '4-2', name: 'Outdoor' },
      { id: '4-3', name: 'Team Sports' },
      { id: '4-4', name: 'Equipment' },
    ],
  },
];

const CategoryItem: React.FC<{
  category: Category;
  onPress: (category: Category) => void;
  onSubCategoryPress: (category: Category, subCategory: SubCategory) => void;
}> = ({ category, onPress, onSubCategoryPress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, category.subCategories.length * 40],
  });

  return (
    <View style={styles.categoryItem}>
      <Pressable
        style={styles.categoryHeader}
        onPress={() => {
          if (category.subCategories.length > 0) {
            toggleExpanded();
          } else {
            onPress(category);
          }
        }}
      >
        <View style={styles.categoryInfo}>
          <Ionicons name={category.icon as any} size={20} color="#F4F4F4" />
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
        {category.subCategories.length > 0 && (
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#F4F4F4"
          />
        )}
      </Pressable>
      
      {category.subCategories.length > 0 && (
        <Animated.View style={[styles.subCategoriesContainer, { maxHeight }]}>
          {category.subCategories.map((subCategory) => (
            <Pressable
              key={subCategory.id}
              style={styles.subCategoryItem}
              onPress={() => onSubCategoryPress(category, subCategory)}
            >
              <Text style={styles.subCategoryName}>{subCategory.name}</Text>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export const Drawer: React.FC<DrawerProps> = ({
  isVisible,
  onClose,
  onCategoryPress,
  onSubCategoryPress,
}) => {
  const insets = useSafeArea();
  
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.drawer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#F4F4F4" />
          </Pressable>
        </View>
        
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop' }}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Star Design</Text>
        </View>

        <ScrollView style={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onPress={onCategoryPress}
              onSubCategoryPress={onSubCategoryPress}
            />
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.footerButton}>
            <Ionicons name="settings" size={20} color="#F4F4F4" />
            <Text style={styles.footerButtonText}>Settings</Text>
          </Pressable>
          <Pressable style={styles.footerButton}>
            <Ionicons name="help-circle" size={20} color="#F4F4F4" />
            <Text style={styles.footerButtonText}>Help</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#181A20',
    borderRightWidth: 1,
    borderRightColor: '#23262F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#23262F',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F4F4F4',
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryItem: {
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#23262F',
    borderRadius: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F4F4F4',
    marginLeft: 12,
  },
  subCategoriesContainer: {
    overflow: 'hidden',
  },
  subCategoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: '#1E1E1E',
    marginTop: 1,
  },
  subCategoryName: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#23262F',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerButtonText: {
    fontSize: 14,
    color: '#F4F4F4',
    marginLeft: 8,
  },
}); 