import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RatingDisplayProps {
  rating: number;
  reviewCount: number;
  starColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  starColor = '#FFD700',
  textColor = Colors.product.white,
  size = 'medium',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: 12, iconSize: 14 };
      case 'large':
        return { fontSize: 16, iconSize: 20 };
      default:
        return { fontSize: 14, iconSize: 16 };
    }
  };

  const { fontSize, iconSize } = getSizeStyles();

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }

    // Half star
    if (hasHalfStar) {
      stars.push('★');
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.star,
          {
            color: starColor,
            fontSize: iconSize,
          },
        ]}
      >
        ★
      </Text>
      <Text
        style={[
          styles.rating,
          {
            color: textColor,
            fontSize,
          },
        ]}
      >
        {rating.toFixed(1)}
      </Text>
      <Text
        style={[
          styles.reviewCount,
          {
            color: Colors.product.lightGrey,
            fontSize: fontSize - 2,
          },
        ]}
      >
        ({reviewCount.toLocaleString()} review{reviewCount !== 1 ? 's' : ''})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  star: {
    marginRight: 4,
  },
  rating: {
    fontWeight: '700',
    marginRight: 4,
  },
  reviewCount: {
    fontWeight: '400',
  },
});
