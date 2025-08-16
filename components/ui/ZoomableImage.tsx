import React from 'react';
import { Dimensions } from 'react-native';
import {
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
    State,
    TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { ImageWithFallback } from './ImageWithFallback';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MAX_ZOOM_SCALE = 3;
const DOUBLE_TAP_SCALE = 2;

interface ZoomableImageProps {
  uri: string;
  height: number;
  fallbackColor: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  uri,
  height,
  fallbackColor,
}) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onStart: (_, context: any) => {
      context.startScale = scale.value;
    },
    onActive: (event, context: any) => {
      // Calculate new scale while respecting MAX_ZOOM_SCALE
      const newScale = Math.min(context.startScale * event.scale, MAX_ZOOM_SCALE);
      scale.value = newScale;
      
      // Only update focal point if we're zoomed in
      if (newScale > 1) {
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      }
    },
    onEnd: () => {
      // If scale is less than 1, spring back to 1
      if (scale.value < 1) {
        scale.value = withSpring(1);
        focalX.value = withSpring(0);
        focalY.value = withSpring(0);
      } else if (scale.value > MAX_ZOOM_SCALE) {
        // If scale is greater than max, spring back to max
        scale.value = withSpring(MAX_ZOOM_SCALE);
      }
      savedScale.value = scale.value;
    },
  });

  const handleDoubleTap = (event: any) => {
    if (scale.value > 1) {
      // If zoomed in, zoom out to original size
      scale.value = withSpring(1, { damping: 15 });
      focalX.value = withSpring(0, { damping: 15 });
      focalY.value = withSpring(0, { damping: 15 });
    } else {
      // Zoom in to the tapped point
      const tapX = event.nativeEvent.x;
      const tapY = event.nativeEvent.y;
      
      // Calculate focal point relative to center
      const focusX = tapX - SCREEN_WIDTH / 2;
      const focusY = tapY - height / 2;
      
      scale.value = withSpring(DOUBLE_TAP_SCALE, { 
        damping: 15,
        stiffness: 100 
      });
      focalX.value = withSpring(focusX, { 
        damping: 15,
        stiffness: 100 
      });
      focalY.value = withSpring(focusY, { 
        damping: 15,
        stiffness: 100 
      });
    }
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { scale: scale.value },
      ],
    };
  });

  const AnimatedImage = Animated.createAnimatedComponent(ImageWithFallback);

  return (
    <TapGestureHandler
      numberOfTaps={2}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          handleDoubleTap(event);
        }
      }}
    >
      <Animated.View>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={{ width: SCREEN_WIDTH, height }}>
            <AnimatedImage
              source={{ uri }}
              style={[
                {
                  width: '100%',
                  height: '100%',
                },
                rStyle,
              ]}
              resizeMode="cover"
              fallbackColor={fallbackColor}
            />
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};
