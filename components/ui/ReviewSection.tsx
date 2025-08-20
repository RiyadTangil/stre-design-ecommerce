import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AddReview } from './AddReview';
import { ReviewCard } from './ReviewCard';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}

interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  helpful?: number;
}

interface ReviewSectionProps {
  summary: ReviewSummaryProps;
  reviews: Review[];
  onViewAllPress: () => void;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  averageRating,
  totalReviews,
  ratingDistribution,
}) => {
  const getRatingPercentage = (count: number) => (count / totalReviews) * 100;

  return (
    <View style={styles.summaryContainer}>
      {/* Average Rating */}
      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
        <Text style={styles.totalReviews}>
          Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
        </Text>
      </View>

      {/* Rating Bars */}
      <View style={styles.ratingBarsContainer}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <View key={rating} style={styles.ratingBar}>
            <Text style={styles.ratingNumber}>{rating}</Text>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${getRatingPercentage(ratingDistribution[rating])}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.ratingCount}>
              {ratingDistribution[rating] || 0}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  summary,
  reviews,
  onViewAllPress,
}) => {
  const [isAddReviewVisible, setIsAddReviewVisible] = useState(false);

  const handleAddReviewSubmit = (review: {
    rating: number;
    comment: string;
    images: string[];
  }) => {
    // Here you would typically send this to your backend
    console.log('New review:', review);
    setIsAddReviewVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <View style={styles.headerActions}>
          <Pressable 
            style={styles.addReviewButton} 
            onPress={() => setIsAddReviewVisible(true)}
          >
            <Ionicons name="add" size={18} color="#FFFFFF" />
            <Text style={styles.addReviewText}>Add Review</Text>
          </Pressable>
      
        </View>
      </View>

      <ReviewSummary {...summary} />

      <ScrollView 

        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewsContainer}
      >
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <ReviewCard {...review} />
          </View>
        ))}
      </ScrollView>

      <AddReview
        isVisible={isAddReviewVisible}
        onClose={() => setIsAddReviewVisible(false)}
        onSubmit={handleAddReviewSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.product.accentPink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addReviewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#2A2D35',
    // marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  averageRatingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    paddingRight: 16,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  totalReviews: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  ratingBarsContainer: {
    flex: 2,
    paddingLeft: 16,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    width: 20,
  },
  barBackground: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.product.accentPink,
    borderRadius: 2,
  },
  ratingCount: {
    color: '#A0A0A0',
    fontSize: 12,
    width: 30,
    textAlign: 'right',
  },
  reviewsContainer: {
    // paddingHorizontal: 20,
    paddingBottom: 16,
  },
  reviewCard: {
    // width: 300,
    // marginRight: 12,
  },
});
