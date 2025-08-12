import { useCallback, useState } from 'react';

interface ProductColor {
  id: string;
  name: string;
  value: string;
}

interface ProductImage {
  id: string;
  uri: string;
}

interface ProductData {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  currentPrice: string;
  originalPrice: string;
  discountPercentage: number;
  brand: string;
  weight: string;
  condition: string;
  productCategory: string;
  colors: ProductColor[];
  images: ProductImage[];
}

export const useProductDetails = (initialProduct: ProductData) => {
  const [selectedColor, setSelectedColor] = useState(initialProduct.colors[0]?.id || '');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleColorSelect = useCallback((colorId: string) => {
    setSelectedColor(colorId);
  }, []);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted(prev => !prev);
  }, []);

  const handleAddToCart = useCallback(async () => {
    setIsAddingToCart(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Added to cart:', initialProduct.title, 'Color:', selectedColor);
      // Here you would typically make an API call to add to cart
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  }, [initialProduct.title, selectedColor]);

  const handleImagePress = useCallback((index: number) => {
    setCurrentImageIndex(index);
    console.log('Image pressed:', index);
  }, []);

  const handleImageScroll = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const getSelectedColorData = useCallback(() => {
    return initialProduct.colors.find(color => color.id === selectedColor);
  }, [initialProduct.colors, selectedColor]);

  const getDiscountAmount = useCallback(() => {
    const currentPrice = parseFloat(initialProduct.currentPrice.replace('$', ''));
    const originalPrice = parseFloat(initialProduct.originalPrice.replace('$', ''));
    return originalPrice - currentPrice;
  }, [initialProduct.currentPrice, initialProduct.originalPrice]);

  return {
    // State
    selectedColor,
    isWishlisted,
    isAddingToCart,
    currentImageIndex,
    
    // Actions
    handleColorSelect,
    handleWishlistToggle,
    handleAddToCart,
    handleImagePress,
    handleImageScroll,
    
    // Computed values
    getSelectedColorData,
    getDiscountAmount,
  };
};
