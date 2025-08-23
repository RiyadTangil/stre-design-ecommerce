import { CartDrawer } from "@/components/ui/CartDrawer";
import { CustomBottomTabBar } from "@/components/ui/CustomBottomTabBar";
import { Drawer } from "@/components/ui/Drawer";
import { Loader } from "@/components/ui/Loader";
import { SafeAreaView } from "@/components/ui/SafeAreaProvider";
import { useCart } from "@/contexts/CartContext";
import { useDrawer } from "@/hooks/useDrawer";
import { router, usePathname } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Header } from "./Header";

// Import types from Drawer component
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

type RightIconType = "search" | "wishlist" | "cart";
type LeftIconType = "menu" | "back";

interface PageWrapperProps {
  children?: ReactNode;
  title: string;
  showLogo?: boolean;
  isLoading?: boolean;
  loadingMessage?: string;
  leftIcon?: LeftIconType; // Optional - component handles smart navigation by default
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  rightIcons?: RightIconType[];
  showHeader?: boolean;
  showBottomNav?: boolean; // Control bottom navigation visibility
  edges?: ("top" | "bottom" | "left" | "right")[];
  onCategoryPress?: (category: Category) => void;
  onSubCategoryPress?: (category: Category, subCategory: SubCategory) => void;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
  showLogo = false,
  isLoading = false,
  loadingMessage = "Loading...",
  leftIcon = "menu",
  onSearchPress,
  onWishlistPress,
  rightIcons = ["cart"],
  showHeader = true,
  showBottomNav = true,
  edges = ["left", "right", "bottom", "top"],
  onCategoryPress,
  onSubCategoryPress,
}) => {
  const { getCartCount, isCartVisible, openCart, closeCart, checkout } =
    useCart();
  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();
  
  // Bottom navigation state management
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');
  
  // Update active tab based on current route
  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('home');
    } else if (pathname === '/categories') {
      setActiveTab('categories');
    } else if (pathname === '/wishlist') {
      setActiveTab('wishlist');
    } else if (pathname === '/profile') {
      setActiveTab('profile');
    }
  }, [pathname]);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    
    // Navigate to the appropriate screen
    switch (tabId) {
      case 'home':
        router.push('/');
        break;
      case 'categories':
        router.push('/categories');
        break;
      case 'wishlist':
        router.push('/wishlist');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  const handleLeftIconPress = () => {

    // Smart default behavior based on icon type
    if (leftIcon === "menu") {
      openDrawer();
    } else if (leftIcon === "back") {
      // Smart back navigation
      if (router.canGoBack()) {
        router.back();
      } else {
        // Fallback to home if no back history
        router.replace("/");
      }
    }
  };

  const handleCategoryPressInternal = (category: Category) => {
    if (onCategoryPress) {
      onCategoryPress(category);
    } else {
      handleCategoryPress(category);
    }
  };

  const handleSubCategoryPressInternal = (
    category: Category,
    subCategory: SubCategory
  ) => {
    if (onSubCategoryPress) {
      onSubCategoryPress(category, subCategory);
    } else {
      handleSubCategoryPress(category, subCategory);
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      console.log("Search pressed");
    }
  };

  const handleWishlistPress = () => {
    if (onWishlistPress) {
      onWishlistPress();
    } else {
      console.log("Wishlist pressed");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <StatusBar barStyle="light-content" backgroundColor="#181A20" />
        <Loader fullscreen message={loadingMessage} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      {showHeader && (
        <>
          <Header
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
        </>
      )}

      <View style={styles.content}>{children}</View>

      <CartDrawer
        isVisible={isCartVisible}
        onClose={closeCart}
        onCheckout={checkout}
      />

      {isDrawerVisible && (
        <Drawer
          isVisible={isDrawerVisible}
          onClose={closeDrawer}
          onCategoryPress={handleCategoryPressInternal}
          onSubCategoryPress={handleSubCategoryPressInternal}
        />
      )}
      
      {showBottomNav && (
        <CustomBottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  content: {
    flex: 1,
  },
});
