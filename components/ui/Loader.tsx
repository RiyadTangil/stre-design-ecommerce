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
import { Colors } from '../../constants/Colors';

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
  color = Colors.product.accentPink,
  message,
  fullscreen = false,
  overlay = false,
  style,
}) => {
  const [wave1] = React.useState(new Animated.Value(0));
  const [wave2] = React.useState(new Animated.Value(0));
  const [wave3] = React.useState(new Animated.Value(0));
  const [wave4] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const createWaveAnimation = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animations = [
      createWaveAnimation(wave1, 0),
      createWaveAnimation(wave2, 500),
      createWaveAnimation(wave3, 1000),
      createWaveAnimation(wave4, 1500),
    ];

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
      wave1.setValue(0);
      wave2.setValue(0);
      wave3.setValue(0);
      wave4.setValue(0);
    };
  }, [wave1, wave2, wave3, wave4]);

  const containerStyle = [
    styles.container,
    fullscreen && styles.fullscreen,
    overlay && styles.overlay,
    style,
  ];

  const WaveLoader = () => {
    const createWaveStyle = (animatedValue: Animated.Value) => {
      const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 4],
      });

      const opacity = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.8, 0.4, 0],
      });

      return {
        transform: [{ scale }],
        opacity,
      };
    };

    return (
      <View style={styles.waveContainer}>
        <Animated.View
          style={[
            styles.wave,
            { backgroundColor: color },
            createWaveStyle(wave1),
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            { backgroundColor: color },
            createWaveStyle(wave2),
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            { backgroundColor: color },
            createWaveStyle(wave3),
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            { backgroundColor: color },
            createWaveStyle(wave4),
          ]}
        />
        <View style={[styles.centerDot, { backgroundColor: color }]} />
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      <WaveLoader />
      {/* {message && (
        <ThemedText style={styles.message}>{message}</ThemedText>
      )} */}
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
  waveContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.6,
  },
  centerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 10,
  },
});
