import { Header } from '@/components/ui/Header';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profileMenuItems = [
  {
    id: 1,
    title: 'My Orders',
    icon: 'bag-outline',
    badge: '3',
  },
  {
    id: 2,
    title: 'My Wishlist',
    icon: 'heart-outline',
    badge: '12',
  },
  {
    id: 3,
    title: 'My Reviews',
    icon: 'star-outline',
  },
  {
    id: 4,
    title: 'My Addresses',
    icon: 'location-outline',
  },
  {
    id: 5,
    title: 'Payment Methods',
    icon: 'card-outline',
  },
  {
    id: 6,
    title: 'Settings',
    icon: 'settings-outline',
  },
  {
    id: 7,
    title: 'Help & Support',
    icon: 'help-circle-outline',
  },
  {
    id: 8,
    title: 'About Us',
    icon: 'information-circle-outline',
  },
];



const ProfileInfo = () => (
  <View style={styles.profileSection}>
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={16} color="#666" />
      </TouchableOpacity>
    </View>
  </View>
);

const MenuItem = ({ item }: { item: typeof profileMenuItems[0] }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={item.icon as any} size={24} color="#666" />
      <Text style={styles.menuItemTitle}>{item.title}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </View>
  </TouchableOpacity>
);

const LogoutButton = () => (
  <TouchableOpacity style={styles.logoutButton}>
    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header 
        title="Profile"
        rightIcons={[{ name: "notifications-outline" }]}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileInfo />
        <View style={styles.menuSection}>
          {profileMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>
        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  


  // Profile Section Styles
  profileSection: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 8,
  },
  editButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 20,
  },

  // Menu Section Styles
  menuSection: {
    backgroundColor: 'white',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Logout Button Styles
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 8,
  },
}); 