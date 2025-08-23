import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type RightIconType = 'search' | 'wishlist' | 'cart';
type LeftIconType = 'menu' | 'back';

interface HeaderProps {
  title: string;
  leftIcon?: LeftIconType;
  onLeftIconPress?: () => void;
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  onCartPress?: () => void;
  cartCount?: number;
  showLogo?: boolean;
  rightIcons?: RightIconType[];
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon = 'menu',
  onLeftIconPress,
  onSearchPress,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
  showLogo = false,
  rightIcons = ['search', 'wishlist', 'cart'],
}) => {
  const renderRightIcon = (iconType: RightIconType) => {
    switch (iconType) {
      case 'search':
        return (
          <Pressable key="search" style={styles.iconButton} onPress={onSearchPress}>
            <Ionicons name="search" size={24} color="#F4F4F4" />
          </Pressable>
        );
      case 'wishlist':
        return (
          <Pressable key="wishlist" style={styles.iconButton} onPress={onWishlistPress}>
            <Ionicons name="heart-outline" size={24} color="#F4F4F4" />
          </Pressable>
        );
      case 'cart':
        return (
          <Pressable key="cart" style={styles.cartButton} onPress={onCartPress}>
            <Ionicons name="cart-outline" size={24} color="#F4F4F4" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <Pressable style={styles.menuButton} onPress={onLeftIconPress}>
            <Ionicons 
              name={leftIcon === 'back' ? 'chevron-back' : 'menu'} 
              size={24} 
              color="#F4F4F4" 
            />
          </Pressable>
          {showLogo ? (
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop' }}
                style={styles.logo}
              />
              {/* <Text style={styles.logoText}>Star Design</Text> */}
            </View>
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>
        <View style={styles.rightSection}>
          {rightIcons.map(renderRightIcon)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181A20',
    borderBottomWidth: 1,
    borderBottomColor: '#23262F',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F4F4F4',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F4F4F4',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  cartButton: {
    marginLeft: 16,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B9D',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
});