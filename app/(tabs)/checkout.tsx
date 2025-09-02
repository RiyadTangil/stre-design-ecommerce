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
import { useCart } from '@/contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';

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
  const { cartItems, getSubtotal } = useCart();
  
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
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [deliveryOption, setDeliveryOption] = useState<string>('standard');
  
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

  const subtotal = getSubtotal();
  const standardDeliveryFee = 15;
  const priorityDeliveryFee = 25;
  const platformFee = 14;
  
  const deliveryFee = deliveryOption === 'priority' ? priorityDeliveryFee : standardDeliveryFee;
  const total = subtotal + deliveryFee + platformFee;

  const handleChangePaymentMethod = () => {
    router.push('/payment-method');
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully!',
      [
        {
          text: 'Track Order',
          onPress: () => {
            router.replace('/(tabs)/order-tracking');
          },
        },
        {
          text: 'Continue Shopping',
          onPress: () => {
            router.replace('/auth/login');
          },
          style: 'cancel',
        },
      ]
    );
  };

  const paymentMethodNames: { [key: string]: string } = {
    cash: 'Cash',
    rocket: 'Rocket',
    upay: 'upay',
    nagad: 'Nagad',
    bkash: 'bKash',
    card: 'Credit or debit card'
  };

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
        {/* Address Form Section */}
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

          {/* <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveAddress}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity> */}
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <View style={styles.paymentHeader}>
            <View style={styles.paymentHeaderLeft}>
              <Ionicons name="card" size={20} color={Colors.product.text} />
              <Text style={styles.sectionTitlePayment}>Payment method</Text>
            </View>
            <TouchableOpacity onPress={handleChangePaymentMethod}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.selectedPaymentMethod}>
            <Ionicons 
              name={paymentMethod === 'cash' ? 'cash' : 'card'} 
              size={20} 
              color={Colors.product.text} 
            />
            <Text style={styles.paymentMethodText}>
              {paymentMethodNames[paymentMethod]}
            </Text>
            {paymentMethod === 'cash' && (
              <View style={styles.primaryBadge}>
                <Ionicons name="information-circle" size={16} color={Colors.product.white} />
                <Text style={styles.primaryBadgeText}>Primary</Text>
              </View>
            )}
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleNoMargin}>Order summary</Text>
          
          {cartItems.map((item, index) => {
            const getItemPrice = (price: any) => {
              if (typeof price === 'number') return price;
              const s = String(price || '0');
              return parseFloat(s.replace('৳', '').replace(/,/g, '')) || 0;
            };
            const itemPrice = getItemPrice((item as any).price);
            const itemTotal = itemPrice * (item.quantity || 1);
            
            return (
              <View key={`${item.id}-${item.selectedColor || 'default'}-${index}`} style={styles.orderItem}>
                <Text style={styles.orderItemQuantity}>{item.quantity}x</Text>
                <Text style={styles.orderItemName}>{(item as any).title || (item as any).name}</Text>
                <Text style={styles.orderItemPrice}>Tk {itemTotal.toFixed(0)}</Text>
              </View>
            );
          })}
          
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Tk {subtotal.toFixed(0)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {deliveryOption === 'standard' ? 'Standard delivery' : 'Priority delivery'}
              </Text>
              <Text style={styles.summaryValue}>Tk {deliveryFee}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee</Text>
              <Text style={styles.summaryValue}>Tk {platformFee}</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        {/* <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By completing this order, I agree to{' '}
            <Text style={styles.termsLink}>all terms</Text>
          </Text>
        </View> */}
      </ScrollView>
      
      {/* Bottom Total and Place Order */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total (incl. fees and tax)</Text>
          <Text style={styles.totalAmount}>Tk {total.toFixed(0)}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.seeSummary}>See summary</Text>
          </TouchableOpacity> */}
        </View>
        
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Text style={styles.placeOrderButtonText}>Place order</Text>
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
    paddingBottom: 180, // Space for bottom bar
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
  sectionTitleNoMargin: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.product.text,
    marginBottom: 16,
  },
  sectionTitlePayment: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.product.text,
    marginLeft: 12,
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
   termsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: Colors.product.lightGrey,
    textAlign: 'center',
  },
   placeOrderButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
  termsLink: {
    color: Colors.product.accentPink,
    textDecorationLine: 'underline',
  },
   section: {
    backgroundColor: Colors.product.bgWhite,
    marginBottom: 8,
    padding: 16,
  },
    totalContainer: {
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.product.lightGrey,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.product.accentPink,
    marginVertical: 4,
  },
  seeSummary: {
    fontSize: 12,
    color: Colors.product.lightGrey,
  },
   orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderItemQuantity: {
    fontSize: 14,
    color: Colors.product.lightGrey,
    width: 30,
  },
  orderItemName: {
    flex: 1,
    fontSize: 14,
    color: Colors.product.text,
    marginLeft: 8,
  },
    selectedPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: Colors.product.text,
    marginLeft: 12,
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 14,
    color: Colors.product.text,
    fontWeight: '500',
  },
  orderSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.product.darkGrey,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.product.lightGrey,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.product.text,
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

  primaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.product.accentPink,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryBadgeText: {
    fontSize: 12,
    color: Colors.product.white,
    marginLeft: 4,
  },
  addressTypeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.product.lightGrey,
    backgroundColor: 'transparent',
  },
    paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    color: Colors.product.accentPink,
    fontWeight: '500',
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
    padding: 10,
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