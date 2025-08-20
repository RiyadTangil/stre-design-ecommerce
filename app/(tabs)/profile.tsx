import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';


import { PageWrapper } from '@/components/ui/PageWrapper';
import { useDrawer } from '@/hooks/useDrawer';

const profileOptions = [
  {
    id: 'orders',
    title: 'My Orders',
    icon: 'bag-outline',
    subtitle: 'Track your orders',
  },
  {
    id: 'addresses',
    title: 'My Addresses',
    icon: 'location-outline',
    subtitle: 'Manage delivery addresses',
  },
  {
    id: 'payments',
    title: 'Payment Methods',
    icon: 'card-outline',
    subtitle: 'Manage payment options',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings-outline',
    subtitle: 'App preferences',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: 'help-circle-outline',
    subtitle: 'Get help and contact us',
  },
];

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const {
    isDrawerVisible,
    openDrawer,
    closeDrawer,
    handleCategoryPress,
    handleSubCategoryPress,
  } = useDrawer();

  const handleMenuPress = () => {
    openDrawer();
  };

  const handleOptionPress = (optionId: string) => {
    console.log('Option pressed:', optionId);
  };

  return (
    <PageWrapper
      title="Profile"
      showLogo={false}
      isLoading={isLoading}
      loadingMessage="Loading Profile..."
      showDrawer={true}
      onCategoryPress={handleCategoryPress}
      onSubCategoryPress={handleSubCategoryPress}
      onSearchPress={() => console.log('Search pressed')}
      onWishlistPress={() => console.log('Wishlist pressed')}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <Text style={styles.profileMember}>Member since 2023</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option) => (
            <Pressable
              key={option.id}
              style={styles.optionItem}
              onPress={() => handleOptionPress(option.id)}
            >
              <View style={styles.optionIcon}>
                <Ionicons name={option.icon as any} size={24} color="#F4F4F4" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#FF6B9D" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>

    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom tab bar
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#23262F',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F4F4F4',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  profileMember: {
    fontSize: 12,
    color: '#FF6B9D',
  },
  optionsContainer: {
    backgroundColor: '#23262F',
    marginTop: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F4F4F4',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#23262F',
    marginTop: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#FF6B9D',
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B9D',
    marginLeft: 8,
  },
});