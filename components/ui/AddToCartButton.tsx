import { Colors } from '@/constants/Colors';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface AddToCartButtonProps {
  onPress: () => void;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onPress,
  text = 'Add Cart',
  disabled = false,
  loading = false,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={styles.buttonText}>
        {loading ? 'Adding...' : text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.product.accentPink,
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.product.accentPink,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: Colors.product.lightGrey,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: Colors.product.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
