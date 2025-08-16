import { Colors } from '@/constants/Colors';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { ZoomableImage } from './ZoomableImage';

interface ProductImageCarouselProps {
  images: { id: string; uri: string }[];
  height?: number;
  onImagePress?: (index: number) => void;
}

const { width: screenWidth } = Dimensions.get('window');

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  height = 300,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderImage = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.imageContainer, { height }]}>
      <ZoomableImage
        uri={item.uri}
        height={height}
        fallbackColor={Colors.product.veryLightGrey}
      />
    </View>
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor:
                index === currentIndex
                  ? Colors.product.accentPink
                  : Colors.product.white,
              opacity: index === currentIndex ? 1 : 0.5,
            },
          ]}
        />
      ))}
    </View>
  );

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={screenWidth}
        snapToAlignment="center"
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.product.white,
  },
});
