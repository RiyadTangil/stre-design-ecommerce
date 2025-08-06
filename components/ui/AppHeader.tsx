import React from 'react';
import { Header } from './Header';

interface AppHeaderProps {
  title: string;
  cartCount?: number;
  showLogo?: boolean;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  onCartPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  cartCount = 0,
  showLogo = false,
  onMenuPress,
  onSearchPress,
  onWishlistPress,
  onCartPress,
}) => {
  return (
    <Header
      title={title}
      cartCount={cartCount}
      showLogo={showLogo}
      onMenuPress={onMenuPress}
      onSearchPress={onSearchPress}
      onWishlistPress={onWishlistPress}
      onCartPress={onCartPress}
    />
  );
}; 