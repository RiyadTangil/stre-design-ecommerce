import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TabItem {
  id: string;
  title: string;
  icon: string;
  activeIcon?: string;
}

interface CustomBottomTabBarProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const tabs: TabItem[] = [
  {
    id: 'home',
    title: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: 'grid-outline',
    activeIcon: 'grid',
  },
  {
    id: 'wishlist',
    title: 'Wishlist',
    icon: 'heart-outline',
    activeIcon: 'heart',
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    activeIcon: 'person',
  },
];

export const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const iconName = isActive ? tab.activeIcon || tab.icon : tab.icon;
        
        return (
          <Pressable
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.id)}
          >
            {/* Active indicator line */}
            {isActive && <View style={styles.activeIndicator} />}
            
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName as any}
                size={24}
                color={isActive ? '#FF6B9D' : '#A0A0A0'}
              />
            </View>
            
            {/* Label */}
            <Text style={[
              styles.tabLabel,
              { color: isActive ? '#FF6B9D' : '#A0A0A0' }
            ]}>
              {tab.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#181A20',
    borderTopWidth: 1,
    borderTopColor: '#23262F',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 8,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -15,
    width: 30,
    height: 3,
    backgroundColor: '#FF6B9D',
    borderRadius: 2,
  },
  iconContainer: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 