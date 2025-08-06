import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  onCartPress?: () => void;
  cartCount?: number;
  showLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onMenuPress,
  onSearchPress,
  onWishlistPress,
  onCartPress,
  cartCount = 0,
  showLogo = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <Pressable style={styles.menuButton} onPress={onMenuPress}>
            <Ionicons name="menu" size={24} color="#F4F4F4" />
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
          <Pressable style={styles.iconButton} onPress={onSearchPress}>
            <Ionicons name="search" size={24} color="#F4F4F4" />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={onWishlistPress}>
            <Ionicons name="heart-outline" size={24} color="#F4F4F4" />
          </Pressable>
          <Pressable style={styles.cartButton} onPress={onCartPress}>
            <Ionicons name="cart-outline" size={24} color="#F4F4F4" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
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