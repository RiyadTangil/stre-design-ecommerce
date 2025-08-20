import React from 'react';
import { Header } from './Header';

type RightIconType = 'search' | 'wishlist' | 'cart';
type LeftIconType = 'menu' | 'back';

interface AppHeaderProps {
  title: string;
  cartCount?: number;
  showLogo?: boolean;
  leftIcon?: LeftIconType;
  onLeftIconPress?: () => void;
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  onCartPress?: () => void;
  rightIcons?: RightIconType[];
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  cartCount = 0,
  showLogo = false,
  leftIcon = 'menu',
  onLeftIconPress,
  onSearchPress,
  onWishlistPress,
  onCartPress,
  rightIcons = ['search', 'wishlist', 'cart'],
}) => {
  return (
    <Header
      title={title}
      cartCount={cartCount}
      showLogo={showLogo}
      leftIcon={leftIcon}
      onLeftIconPress={onLeftIconPress}
      onSearchPress={onSearchPress}
      onWishlistPress={onWishlistPress}
      onCartPress={onCartPress}
      rightIcons={rightIcons}
    />
  );
};