import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Video support removed
import { GestureHandlerRootView, PinchGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const THUMBNAIL_SIZE = 64;
const THUMBNAIL_SPACING = 8;

interface MediaItem {
  id: string;
  uri: string;
  thumbnail?: string;
}

interface ImageGalleryProps {
  media: MediaItem[];
  aspectRatio?: number;
  onImagePress?: (index: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  media,
  aspectRatio = 4/3,
  onImagePress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [hasError, setHasError] = useState<Record<string, boolean>>({});
  const [showPinchInstruction, setShowPinchInstruction] = useState(true);
  
  const mainFlatListRef = useRef<FlatList>(null);
  const thumbnailFlatListRef = useRef<FlatList>(null);
  
  // Remove this entire useEffect - it's causing the infinite loop
  useEffect(() => {
    setShowPinchInstruction(true);
  }, []);
  
  // Calculate main image height based on screen width and aspect ratio
  const mainImageHeight = SCREEN_WIDTH / aspectRatio;

  const handleMainImagePress = () => {
    if (onImagePress) {
      onImagePress(currentIndex);
    } else {
      setIsImageViewVisible(true);
    }
  };

  const handleThumbnailPress = (index: number) => {
    setCurrentIndex(index);
    mainFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    
    if (index !== currentIndex) {
      setCurrentIndex(index);
      
      // Scroll thumbnail to center the selected item
      thumbnailFlatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // Center the thumbnail
      });
    }
  };

  const handleImageLoadStart = (id: string) => {
    setIsLoading(prev => ({ ...prev, [id]: true }));
    setHasError(prev => ({ ...prev, [id]: false }));
  };

  const handleImageLoadSuccess = (id: string) => {
    setIsLoading(prev => ({ ...prev, [id]: false }));
  };

  const handleImageLoadError = (id: string) => {
    setIsLoading(prev => ({ ...prev, [id]: false }));
    setHasError(prev => ({ ...prev, [id]: true }));
  };

  const renderMainItem = ({ item, index }: { item: MediaItem; index: number }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        style={[styles.mainImageContainer, { height: mainImageHeight }]}
        onPress={handleMainImagePress}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.uri }}
            style={styles.mainImage}
            resizeMode="cover"
            // onLoadStart={() => handleImageLoadStart(item.id)}
            onLoad={() => handleImageLoadSuccess(item.id)}
            onError={() => handleImageLoadError(item.id)}
          />
          {isLoading[item.id] && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.product.accentPink} />
            </View>
          )}
          {hasError[item.id] && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={40} color="#FF6B6B" />
              <Text style={styles.errorText}>Failed to load image</Text>
            </View>
          )}
          
          {/* Pinch instruction indicator - only show initially */}
        {showPinchInstruction && (
          <View style={styles.pinchInstructionContainer}>
            <Ionicons name="expand-outline" size={20} color="white" />
            <Text style={styles.pinchInstructionText}>Tap to zoom</Text>
          </View>
        )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderThumbnailItem = ({ item, index }: { item: MediaItem; index: number }) => {
    const isActive = index === currentIndex;
    
    return (
      <TouchableOpacity
        style={[
          styles.thumbnailContainer,
          isActive && styles.activeThumbnail,
        ]}
        onPress={() => handleThumbnailPress(index)}
      >
        <Image
          source={{ uri: item.thumbnail || item.uri }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {media.map((_, index) => (
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

  // Custom fullscreen image viewer state
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const doubleTapRef = useRef(null);
  const pinchRef = useRef(null);
  const singleTapRef = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const lastTap = useRef(0);
  const tapPosition = useRef({ x: 0, y: 0 });
  const zoomIndicatorTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const pinchGestureHandler = (event: any) => {
    // Handle pinch/zoom with increased maximum zoom level for e-commerce product detail
    scale.value = Math.max(1, Math.min(event.scale, 5)); // Increased max zoom to 5x
    
    // Show zoom indicator
    setShowZoomIndicator(true);
    
    // Clear any existing timeout
    if (zoomIndicatorTimeout.current) {
      clearTimeout(zoomIndicatorTimeout.current);
    }
    
    // Keep zoom indicator visible longer for better user experience
    zoomIndicatorTimeout.current = setTimeout(() => {
      setShowZoomIndicator(false);
    }, 3000); // Increased from 1.5s to 3s
    
    // Handle pan when zoomed in
    if (scale.value > 1) {
      translateX.value += event.translationX;
      translateY.value += event.translationY;
      
      // Limit pan to reasonable bounds based on zoom level
      const maxTranslateX = SCREEN_WIDTH * (scale.value - 1) / 2;
      const maxTranslateY = (SCREEN_WIDTH * 1.5) * (scale.value - 1) / 2; // Adjusted for image height
      
      translateX.value = Math.min(Math.max(translateX.value, -maxTranslateX), maxTranslateX);
      translateY.value = Math.min(Math.max(translateY.value, -maxTranslateY), maxTranslateY);
    }
  };
  
  const onDoubleTap = (event: any) => {
    if (scale.value > 1) {
      // If already zoomed in, reset zoom
      resetZoom();
    } else {
      // Zoom in to 3x at the tap position for better product detail viewing
      scale.value = withSpring(3);
      
      // Calculate the focus point for zooming
      const focusX = event.x;
      const focusY = event.y;
      
      // Adjust translation to zoom toward tap point
      translateX.value = withSpring((SCREEN_WIDTH / 2 - focusX) * (3 - 1));
      translateY.value = withSpring((SCREEN_WIDTH * 1.5 / 2 - focusY) * (3 - 1));
      
      // Show zoom indicator
      setShowZoomIndicator(true);
      
      // Clear any existing timeout
      if (zoomIndicatorTimeout.current) {
        clearTimeout(zoomIndicatorTimeout.current);
      }
      
      // Hide zoom indicator after 1.5 seconds
      zoomIndicatorTimeout.current = setTimeout(() => {
        setShowZoomIndicator(false);
      }, 1500);
    }
  };
  
  // Enhanced animated styles with better transform order for proper zooming
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }, // Scale applied last for better zoom behavior
      ],
    };
  });
  
  const resetZoom = () => {
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    
    // Show zoom indicator when resetting
    setShowZoomIndicator(true);
    
    // Clear any existing timeout
    if (zoomIndicatorTimeout.current) {
      clearTimeout(zoomIndicatorTimeout.current);
    }
    
    // Keep zoom indicator visible longer for better user experience
    zoomIndicatorTimeout.current = setTimeout(() => {
      setShowZoomIndicator(false);
    }, 3000); // Increased from 1.5s to 3s
  };
  
  const closeFullScreenViewer = () => {
    resetZoom();
    setIsImageViewVisible(false);
  };
  
  // State for fullscreen instruction
  const [showFullscreenInstruction, setShowFullscreenInstruction] = useState(true);
  
  // Keep fullscreen instruction visible longer for better user experience
  useEffect(() => {
    if (isImageViewVisible && showFullscreenInstruction) {
      const timer = setTimeout(() => {
        setShowFullscreenInstruction(false);
      }, 5000); // Increased from 3s to 5s
      
      return () => clearTimeout(timer);
    }
  }, [isImageViewVisible, showFullscreenInstruction]);
  
  // Enhanced manual double-tap detection for reliable zoom
  const handleImageTap = (event: any) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 400; // Increased from 300ms to 400ms for better detection
    
    // Ensure we capture the tap position accurately
    tapPosition.current = { 
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY 
    };
    
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (scale.value > 1) {
        // If already zoomed in, reset zoom
        resetZoom();
      } else {
        // Zoom in to 3x at the tap position for better product detail viewing
        scale.value = withSpring(3);
        
        // Calculate the focus point for zooming
        const focusX = tapPosition.current.x;
        const focusY = tapPosition.current.y;
        
        // Adjust translation to zoom toward tap point
        translateX.value = withSpring((SCREEN_WIDTH / 2 - focusX) * (3 - 1));
        translateY.value = withSpring((SCREEN_WIDTH * 1.5 / 2 - focusY) * (3 - 1));
        
        // Show zoom indicator
        setShowZoomIndicator(true);
        
        // Clear any existing timeout
        if (zoomIndicatorTimeout.current) {
          clearTimeout(zoomIndicatorTimeout.current);
        }
        
        // Keep zoom indicator visible longer for better user experience
        zoomIndicatorTimeout.current = setTimeout(() => {
          setShowZoomIndicator(false);
        }, 3000); // Increased from 1.5s to 3s
      }
    } else {
      // Single tap - toggle controls
      setShowControls(!showControls);
    }
    
    lastTap.current = now;
  };
  
  const renderFullScreenViewer = () => {
    if (!isImageViewVisible) return null;
    
    const currentItem = media[currentIndex];
    
    return (
      <Modal
        visible={isImageViewVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeFullScreenViewer}
      >
        <View style={styles.fullScreenContainer}>
          {showControls && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeFullScreenViewer}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          )}
          
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={pinchGestureHandler}
          >
            <Animated.View style={[styles.fullScreenMediaContainer, animatedStyles]}>
              <TouchableWithoutFeedback onPress={handleImageTap}>
                <Image
                  source={{ uri: currentItem.uri }}
                  style={styles.fullScreenMedia}
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
            </Animated.View>
          </PinchGestureHandler>
          
          {showZoomIndicator && (
            <View style={styles.zoomIndicator}>
              <Text style={styles.zoomIndicatorText}>
                {Math.round(scale.value * 100)}%
              </Text>
            </View>
          )}
          
          {/* Fullscreen instruction overlay */}
          {showFullscreenInstruction && (
            <View style={styles.fullscreenInstructionContainer}>
              <View style={styles.instructionItem}>
                <Ionicons name="scan-outline" size={24} color="white" />
                <Text style={styles.instructionText}>Pinch to zoom</Text>
              </View>
              <View style={styles.instructionItem}>
                <Ionicons name="finger-print-outline" size={24} color="white" />
                <Text style={styles.instructionText}>Double-tap to zoom</Text>
              </View>
              <View style={styles.instructionItem}>
                <Ionicons name="hand-left-outline" size={24} color="white" />
                <Text style={styles.instructionText}>Drag to pan when zoomed</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Main Image Carousel */}
      <FlatList
        ref={mainFlatListRef}
        data={media}
        renderItem={renderMainItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="center"
      />
      
      {/* Pagination Dots */}
      {renderPaginationDots()}
      
      {/* Thumbnails Row */}
      <View style={styles.thumbnailsRow}>
        <FlatList
          ref={thumbnailFlatListRef}
          data={media}
          renderItem={renderThumbnailItem}
          keyExtractor={(item) => `thumb-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailsContent}
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: THUMBNAIL_SIZE + THUMBNAIL_SPACING,
            offset: (THUMBNAIL_SIZE + THUMBNAIL_SPACING) * index,
            index,
          })}
        />
      </View>

      {/* Custom Full Screen Image Viewer */}
      {renderFullScreenViewer()}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mainImageContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.product.veryLightGrey,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  // Video styles removed
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  errorText: {
    color: '#FF6B6B',
    marginTop: 8,
    fontWeight: '500',
  },
  pinchInstructionContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker background for better visibility
    borderRadius: 20, // Increased from 16 to 20
    padding: 10, // Increased from 8 to 10
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, // Added border
    borderColor: 'rgba(255, 255, 255, 0.3)', // Added subtle white border
  },
  pinchInstructionText: {
    color: 'white',
    fontSize: 14, // Increased from 12 to 14
    marginLeft: 6, // Increased from 4 to 6
    fontWeight: '600', // Increased from 500 to 600
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  thumbnailsRow: {
    marginTop: 10,
    height: THUMBNAIL_SIZE + 10,
  },
  thumbnailsContent: {
    paddingHorizontal: 10,
  },
  thumbnailContainer: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    marginRight: THUMBNAIL_SPACING,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: Colors.product.accentPink,
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  // Video indicator style removed
  // Custom fullscreen viewer styles
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenMediaContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.5, // Adjust based on typical image aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenMedia: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  zoomIndicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker background for better visibility
    paddingHorizontal: 16, // Increased from 12 to 16
    paddingVertical: 8, // Increased from 6 to 8
    borderRadius: 20, // Increased from 15 to 20
    borderWidth: 1, // Added border
    borderColor: 'rgba(255, 255, 255, 0.3)', // Added subtle white border
  },
 zoomIndicatorText: {
    color: 'white',
    fontSize: 16, // Increased from 14 to 16 for better visibility
    fontWeight: '700', // Increased from 600 to 700 for better visibility
  },
  fullscreenInstructionContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    alignItems: 'center',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
});
