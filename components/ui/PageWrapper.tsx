import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from '@/components/ui/SafeAreaProvider';
import { AppHeader } from '@/components/ui/AppHeader';
import { Loader } from '@/components/ui/Loader';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { Drawer } from '@/components/ui/Drawer';
import { useCart } from '@/contexts/CartContext';
import { useDrawer } from '@/hooks/useDrawer';
import { useState } from 'react';

type RightIconType = 'search' | 'wishlist' | 'cart';
type LeftIconType = 'menu' | 'back';

interface PageWrapperProps {
  children?: ReactNode;
  title: string;
  showLogo?: boolean;
  isLoading?: boolean;
  loadingMessage?: string;
  leftIcon?: LeftIconType;
  onLeftIconPress?: () => void; // Optional - component handles smart navigation by default
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  rightIcons?: RightIconType[];
  showHeader?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  // Drawer props
  showDrawer?: boolean;
  onCategoryPress?: (categoryId: string) => void;
  onSubCategoryPress?: (categoryId: string, subCategoryId: string) => void;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
  showLogo = false,
  isLoading = false,
  loadingMessage = 'Loading...',
  leftIcon = 'menu',
  onLeftIconPress,
  onSearchPress,
  onWishlistPress,
  rightIcons = [ 'cart'],
  showHeader = true,
  edges = ['left', 'right', 'bottom', 'top'],
  showDrawer = false,
  onCategoryPress,
  onSubCategoryPress,
}) => {
  const { getCartCount, isCartVisible, openCart, closeCart, checkout } = useCart();
  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();



  const handleLeftIconPress = () => {
    // If custom handler is provided, use it first
    if (onLeftIconPress) {
      onLeftIconPress();
      return;
    }

    // Smart default behavior based on icon type
    if (leftIcon === 'menu') {
      if (showDrawer) {
        openDrawer();
      } else {
        // Default menu behavior - could open a global menu or drawer
        console.log('Menu pressed - no drawer configured');
      }
    } else if (leftIcon === 'back') {
      // Smart back navigation
      if (router.canGoBack()) {
        router.back();
      } else {
        // Fallback to home if no back history
        router.replace('/(tabs)/');
      }
    }
  };

  const handleCategoryPressInternal = (categoryId: string) => {
    if (onCategoryPress) {
      onCategoryPress(categoryId);
    } else {
      handleCategoryPress(categoryId);
    }
  };

  const handleSubCategoryPressInternal = (categoryId: string, subCategoryId: string) => {
    if (onSubCategoryPress) {
      onSubCategoryPress(categoryId, subCategoryId);
    } else {
      handleSubCategoryPress(categoryId, subCategoryId);
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      console.log('Search pressed');
    }
  };

  const handleWishlistPress = () => {
    if (onWishlistPress) {
      onWishlistPress();
    } else {
      console.log('Wishlist pressed');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor="#181A20" />
        <Loader fullscreen message={loadingMessage} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      
      {showHeader && (
        <AppHeader
          title={title}
          cartCount={getCartCount()}
          showLogo={showLogo}
          leftIcon={leftIcon}
          onLeftIconPress={handleLeftIconPress}
          onSearchPress={handleSearchPress}
          onWishlistPress={handleWishlistPress}
          onCartPress={openCart}
          rightIcons={rightIcons}
        />
      )}
      
      <View style={styles.content}>
        {children}
      </View>
      
      <CartDrawer isVisible={isCartVisible} onClose={closeCart} onCheckout={checkout} />
      
      {showDrawer && (
        <Drawer
          isVisible={isDrawerVisible}
          onClose={closeDrawer}
          onCategoryPress={handleCategoryPressInternal}
          onSubCategoryPress={handleSubCategoryPressInternal}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  content: {
    flex: 1,
  },
});