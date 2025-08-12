import { Colors } from '@/constants/Colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
  size?: number;
  testID?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  isSelected,
  onPress,
  size = 25,
  testID,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
      onPress={onPress}
      testID={testID}
    >
      <View
        style={[
          styles.colorCircle,
          {
            backgroundColor: color,
            width: size - 4,
            height: size - 4,
            borderRadius: (size - 4) / 2,
          },
        ]}
      />
      {isSelected && <View style={styles.selectedBorder} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  colorCircle: {
    borderWidth: 1,
    borderColor: Colors.product.borderGrey,
  },
  selectedBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.product.white,
  },
});
