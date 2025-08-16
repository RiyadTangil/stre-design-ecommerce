import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CategoryTagProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
  label,
  backgroundColor = Colors.product.lightPink,
  textColor = Colors.product.darkPink,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: textColor,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
