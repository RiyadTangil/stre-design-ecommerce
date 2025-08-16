import React from 'react';
import {
    ActivityIndicator,
    Animated,
    Easing,
    Platform,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = '#007AFF',
  message,
  fullscreen = false,
  overlay = false,
  style,
}) => {
  const [rotation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
    return () => rotation.setValue(0);
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const containerStyle = [
    styles.container,
    fullscreen && styles.fullscreen,
    overlay && styles.overlay,
    style,
  ];

  const CustomLoader = () => (
    <View style={styles.customLoader}>
      <Animated.View
        style={[
          styles.spinnerRing,
          {
            transform: [{ rotate: spin }],
            borderTopColor: color,
          },
        ]}
      />
    </View>
  );

  return (
    <View style={containerStyle}>
      {Platform.OS === 'ios' ? (
        <ActivityIndicator size={size} color={color} />
      ) : (
        <CustomLoader />
      )}
      {message && (
        <ThemedText style={styles.message}>{message}</ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  fullscreen: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  customLoader: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerRing: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
