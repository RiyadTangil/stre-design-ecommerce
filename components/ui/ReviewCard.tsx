import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RatingDisplay } from './RatingDisplay';

interface ReviewCardProps {
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  helpful?: number;
  isLiked?: boolean;
  onLikePress?: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  userImage,
  rating,
  date,
  comment,
  images = [],
  helpful = 0,
  isLiked = false,
  onLikePress,
}) => {
  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userSection}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: userImage || 'https://ui-avatars.com/api/?name=' + userName,
            }}
            style={styles.userImage}
          />
          <View style={styles.userMeta}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.reviewDate}>{date}</Text>
          </View>
        </View>
        <RatingDisplay rating={2}  reviewCount={5} />
      </View>

      {/* Review Content */}
      <Text style={styles.comment}>{comment}</Text>

      {/* Review Images */}
      {images.length > 0 && (
        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.reviewImage}
              resizeMode="cover"
            />
          ))}
        </View>
      )}

      {/* Helpful Section */}
      <View style={styles.helpfulSection}>
        <Pressable 
          style={styles.likeButton} 
          onPress={() => {
            const anim = new Animated.Value(1);
            Animated.sequence([
              Animated.timing(anim, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
              }),
            ]).start();
            if (onLikePress) {
              onLikePress();
            }
          }}
        >
       
        </Pressable>
        {helpful > 0 && (
          <View style={styles.helpfulCounter}>
            <Ionicons name="thumbs-up" size={14} color="#A0A0A0" />
            <Text style={styles.helpfulText}>
              {helpful} found this helpful
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2D35',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userMeta: {
    justifyContent: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  reviewDate: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  comment: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.9,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: 12,
  },
  reviewImage: {
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#1A1D24',
  },
  helpfulSection: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  helpfulText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginLeft: 4,
  },
  helpfulCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  likeButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginLeft: -8,
  },
});
