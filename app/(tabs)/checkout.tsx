import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { PageWrapper } from '@/components/ui/PageWrapper';
import { Colors } from '@/constants/Colors';

interface AddressForm {
  fullName: string;
  mobileNo: string;
  pinCode: string;
  address: string;
  locality: string;
  cityDistrict: string;
  state: string;
  addressType: 'Home' | 'Work';
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<AddressForm>({
    fullName: '',
    mobileNo: '',
    pinCode: '',
    address: '',
    locality: '',
    cityDistrict: '',
    state: '',
    addressType: 'Home',
  });

  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  const handleInputChange = (field: keyof AddressForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressForm> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNo.replace(/\s/g, ''))) {
      newErrors.mobileNo = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit pin code';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.locality.trim()) {
      newErrors.locality = 'Locality/Town is required';
    }

    if (!formData.cityDistrict.trim()) {
      newErrors.cityDistrict = 'City/District is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = () => {
    if (validateForm()) {
      Alert.alert(
        'Address Saved',
        'Your delivery address has been saved successfully!',
        [
          {
            text: 'Continue to Payment',
            onPress: () => {
              // Navigate to payment page
              console.log('Proceeding to payment with address:', formData);
              router.push('/(tabs)/payment');
            },
          },
        ]
      );
    }
  };

  const renderInput = (
    label: string,
    field: keyof AddressForm,
    placeholder: string,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          errors[field] && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.product.lightGrey}
        value={formData[field] as string}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
      />
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  const renderAddressTypeButton = (type: 'Home' | 'Work') => (
    <TouchableOpacity
      style={[
        styles.addressTypeButton,
        formData.addressType === type && styles.addressTypeButtonActive,
      ]}
      onPress={() => handleInputChange('addressType', type)}
    >
      <Text
        style={[
          styles.addressTypeText,
          formData.addressType === type && styles.addressTypeTextActive,
        ]}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );

  return (
    <PageWrapper
      title="Add delivery address"
      leftIcon="back"
      rightIcons={[]}
      showBottomNav={false}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          
          {renderInput('Full Name', 'fullName', 'Type Your Name')}
          {renderInput('Mobile No.', 'mobileNo', 'Type Your Mobile No.', 'phone-pad')}
          
          <Text style={styles.sectionTitle}>Address</Text>
          
          {renderInput('Pin Code', 'pinCode', 'Pin Code', 'numeric')}
          {renderInput('Address', 'address', 'Address')}
          {renderInput('Locality/Town', 'locality', 'Locality/Town')}
          
          <View style={styles.rowContainer}>
            <View style={styles.halfWidth}>
              {renderInput('City/District', 'cityDistrict', 'City/District')}
            </View>
            <View style={styles.halfWidth}>
              {renderInput('State', 'state', 'State')}
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Save Address As</Text>
          
          <View style={styles.addressTypeContainer}>
            {renderAddressTypeButton('Home')}
            {renderAddressTypeButton('Work')}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAddress}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.product.background,
  },
  contentContainer: {
    paddingBottom: 100, // Space for bottom button
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.product.text,
    marginBottom: 16,
    marginTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.product.darkGrey,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.product.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 8,
    padding: 16,
    // height: 48,
    fontSize: 12,
    color: Colors.product.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: Colors.product.accentPink,
  },
  errorText: {
    color: Colors.product.accentPink,
    fontSize: 12,
    marginTop: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  addressTypeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.product.lightGrey,
    backgroundColor: 'transparent',
  },
  addressTypeButtonActive: {
    backgroundColor: Colors.product.accentPink,
    borderColor: Colors.product.accentPink,
  },
  addressTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.product.lightGrey,
  },
  addressTypeTextActive: {
    color: Colors.product.white,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.product.background,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.product.darkGrey,
  },
  saveButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
});