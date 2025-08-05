import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  title: string;
  leftIcon?: string;
  rightIcons?: Array<{
    name: string;
    onPress?: () => void;
    badge?: string;
  }>;
  onLeftPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcons = [],
  onLeftPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {leftIcon && (
          <TouchableOpacity style={styles.headerButton} onPress={onLeftPress}>
            <Ionicons name={leftIcon as any} size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      <View style={styles.rightSection}>
        {rightIcons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.headerButton}
            onPress={icon.onPress}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={icon.name as any} size={24} color="#333" />
              {icon.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{icon.badge}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 40,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 