import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export const cleanBDPhone = (value: string) => value.replace(/\D/g, '').slice(0, 11);

// Standard BD mobile: 11 digits, starts with 01 (optionally enforce operator code 013-019)
export const isValidBDPhone = (value: string) => {
  const digits = cleanBDPhone(value);
  // basic rule
  return /^01\d{9}$/.test(digits);
  // stricter operator rule (uncomment if you want 013-019 only)
  // return /^01[3-9]\d{8}$/.test(digits);
};

export const formatBDPhone = (value: string) => {
  const digits = cleanBDPhone(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

type PhoneNumberInputProps = {
  label?: string;
  value: string;
  onChange: (formatted: string, raw: string) => void;
  error?: string;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  containerStyle?: ViewStyle;
};

export default function PhoneNumberInput({
  label = 'Phone Number',
  value,
  onChange,
  error,
  placeholder = '01XXX-XXXXXX',
  editable = true,
  autoFocus,
  containerStyle,
}: PhoneNumberInputProps) {
  const formatted = formatBDPhone(value);

  const handleChange = (text: string) => {
    const raw = cleanBDPhone(text);
    const nextFormatted = formatBDPhone(raw);
    onChange(nextFormatted, raw);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.inputLabel}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
        <Ionicons name="call-outline" size={20} color={Colors.product.lightGrey} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.product.lightGrey}
          value={formatted}
          onChangeText={handleChange}
          keyboardType="phone-pad"
          maxLength={12} // 11 digits + 1 hyphen
          editable={editable}
          autoFocus={autoFocus}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  inputLabel: {
    fontSize: 14,
    color: Colors.product.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Colors.product.text,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});