import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
}

export const useDrawer = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleCategoryPress = (category: Category) => {
    console.log('Category pressed:', category.name);
    closeDrawer();
    // Navigate to category page
    // You can add navigation logic here
  };

  const handleSubCategoryPress = (category: Category, subCategory: SubCategory) => {
    console.log('Sub-category pressed:', category.name, subCategory.name);
    closeDrawer();
    // Navigate to sub-category page
    // You can add navigation logic here
  };

  return {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  };
}; 