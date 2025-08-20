import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface AddReviewProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (review: {
    rating: number;
    comment: string;
    images: string[];
  }) => void;
}

export const AddReview: React.FC<AddReviewProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      // Show error
      return;
    }
    onSubmit({
      rating,
      comment,
      images,
    });
    // Reset form
    setRating(0);
    setComment('');
    setImages([]);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Write a Review</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
          </View>

          <ScrollView style={styles.formContainer}>
            {/* Rating Selection */}
            <View style={styles.ratingSection}>
              <Text style={styles.sectionTitle}>Rate this product</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable
                    key={star}
                    onPress={() => setRating(star)}
                    style={styles.starButton}
                  >
                    <Ionicons
                      name={rating >= star ? "star" : "star-outline"}
                      size={32}
                      color={rating >= star ? Colors.product.accentPink : "#A0A0A0"}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Review Text */}
            <View style={styles.commentSection}>
              <Text style={styles.sectionTitle}>Your Review</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Share your experience with this product..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={4}
                value={comment}
                onChangeText={setComment}
              />
            </View>

            {/* Image Upload */}
            <View style={styles.imageSection}>
              <Text style={styles.sectionTitle}>Add Photos</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imageScrollView}
              >
                {images.map((uri, index) => (
                  <View key={index} style={styles.imagePreview}>
                    <Image source={{ uri }} style={styles.previewImage} />
                    <Pressable
                      style={styles.removeImage}
                      onPress={() => setImages(images.filter((_, i) => i !== index))}
                    >
                      <Ionicons name="close-circle" size={24} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
                <Pressable
                  style={styles.addImageButton}
                  onPress={handleImagePick}
                >
                  <Ionicons name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.addImageText}>Add Photo</Text>
                </Pressable>
              </ScrollView>
            </View>
          </ScrollView>

          <View style={styles.submitSection}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { opacity: rating === 0 ? 0.5 : 1 }
              ]}
              onPress={handleSubmit}
              disabled={rating === 0}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#23262F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  ratingSection: {
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  commentSection: {
    marginBottom: 24,
  },
  commentInput: {
    backgroundColor: '#2A2D35',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageSection: {
    marginBottom: 24,
  },
  imageScrollView: {
    flexGrow: 0,
  },
  imagePreview: {
    position: 'relative',
    marginRight: 12,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImage: {
    position: 'absolute',
    top: -2,
    right: -8,
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#2A2D35',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
  },
  addImageText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
  },
  submitSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  submitButton: {
    backgroundColor: Colors.product.accentPink,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
