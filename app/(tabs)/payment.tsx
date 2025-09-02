import { PageWrapper } from '@/components/ui/PageWrapper';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/contexts/CartContext';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Payment method types
type PaymentMethod = 'card' | 'cash' | 'googlepay' | 'paytm' | 'wallet' | 'netbanking';

// Card interface
interface CardDetails {
  number: string;
  expiry: string;
  name: string;
}

export default function PaymentPage() {
  // State for expanded accordion sections
  const [expandedSection, setExpandedSection] = useState<PaymentMethod | null>('card');
  
  // State for selected card
  const [selectedCard, setSelectedCard] = useState<CardDetails>({
    number: '4532 **** **** ****',
    expiry: '04/25',
    name: 'KEVIN HARD',
  });

  // State for add card modal
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState<CardDetails>({
    number: '',
    expiry: '',
    name: '',
  });
  const [securityCode, setSecurityCode] = useState('');
  const [cardErrors, setCardErrors] = useState({
    name: '',
    number: '',
    expiry: '',
    securityCode: '',
  });

  // Cart data
  const { getSubtotal, getDiscountAmount, getTotal, cartItems, getCartCount } = useCart();

  const formatCurrency = (value: number) => `৳${value.toFixed(2)}`;
  const subtotal = getSubtotal();
  const couponDiscount = getDiscountAmount();
  const mrpTotal = cartItems.reduce((sum, item) => {
    const parseAmount = (s: string) => parseFloat((s || '0').replace('৳', '').replace(/,/g, '')) || 0;
    const original = item.originalPrice ? parseAmount(item.originalPrice) : parseAmount(item.price);
    return sum + original * item.quantity;
  }, 0);
  const mrpDiscount = Math.max(0, mrpTotal - subtotal);
  const itemCount = getCartCount();

  // Handle accordion toggle
  const toggleSection = (section: PaymentMethod) => {
    setExpandedSection(section === expandedSection ? null : section);
  };

  // Import auth context at the top of the file
  const { useAuth } = require('@/contexts/AuthContext');
  const { isAuthenticated } = useAuth();

  // Handle payment
  const handlePayment = () => {
    router.push('/auth/login');
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/auth/login');
      return;
    }
    
    // If authenticated, proceed with payment
    // Alert.alert(
    //   'Order Placed',
    //   'Your order has been placed successfully!',
    //   [
    //     {
    //       text: 'View Order',
    //       onPress: () => {
    //         // Navigate to orders page
    //         console.log('Navigate to orders page');
    //       },
    //     },
    //     {
    //       text: 'Continue Shopping',
    //       onPress: () => {
    //         // Navigate to home
    //         router.replace('/');
    //       },
    //       style: 'cancel',
    //     },
    //   ]
    // );
  };

  // Open add card modal
  const openAddCardModal = () => {
    setShowAddCardModal(true);
  };

  // Close add card modal
  const closeAddCardModal = () => {
    setShowAddCardModal(false);
    // Reset form
    setNewCardDetails({
      number: '',
      expiry: '',
      name: '',
    });
    setSecurityCode('');
    setCardErrors({
      name: '',
      number: '',
      expiry: '',
      securityCode: '',
    });
  };

  // Format card number with spaces
  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Validate card details
  const validateCardDetails = () => {
    const errors = {
      name: '',
      number: '',
      expiry: '',
      securityCode: '',
    };
    let isValid = true;

    // Validate name
    if (!newCardDetails.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Validate card number
    const cardNumberDigits = newCardDetails.number.replace(/\s/g, '');
    if (cardNumberDigits.length < 16) {
      errors.number = 'Enter a valid card number';
      isValid = false;
    }

    // Validate expiry date
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(newCardDetails.expiry)) {
      errors.expiry = 'Enter a valid date (MM/YY)';
      isValid = false;
    } else {
      // Check if card is expired
      const [month, year] = newCardDetails.expiry.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      if (expiryDate < currentDate) {
        errors.expiry = 'Card has expired';
        isValid = false;
      }
    }

    // Validate security code
    if (securityCode.length < 3) {
      errors.securityCode = 'Enter a valid security code';
      isValid = false;
    }

    setCardErrors(errors);
    return isValid;
  };

  // Handle adding a new card
  const handleAddCard = () => {
    if (validateCardDetails()) {
      // Format card number for display (mask middle digits)
      const firstFour = newCardDetails.number.slice(0, 4);
      const maskedNumber = `${firstFour} **** **** ****`;
      
      // Update selected card
      setSelectedCard({
        number: maskedNumber,
        expiry: newCardDetails.expiry,
        name: newCardDetails.name.toUpperCase(),
      });
      
      // Close modal
      closeAddCardModal();
      
      // Show success message
      Alert.alert('Success', 'Card added successfully');
    }
  };

  // Render accordion section
  const renderAccordionSection = (
    title: string,
    icon: React.ReactNode,
    section: PaymentMethod,
    content: React.ReactNode,
    badge?: string
  ) => {
    const isExpanded = expandedSection === section;
    
    return (
      <View style={styles.accordionContainer}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleSection(section)}
          activeOpacity={0.7}
        >
          <View style={styles.accordionTitleContainer}>
            {icon}
            <Text style={styles.accordionTitle}>{title}</Text>
            {badge && (
              <View style={styles.offerBadge}>
                <Text style={styles.offerBadgeText}>{badge}</Text>
              </View>
            )}
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.accordionContent}>
            {content}
          </View>
        )}
      </View>
    );
  };

  // Credit/Debit Card content
  const cardContent = (
    <View>
      <View style={styles.savedCardsHeader}>
        <Text style={styles.savedCardsText}>Saved Cards</Text>
        <TouchableOpacity onPress={openAddCardModal}>
          <Text style={styles.addCardText}>+ Add Card</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardListContainer}>
        {/* Card logos */}
        <View style={styles.cardLogosContainer}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' }} 
            style={styles.cardLogo} 
            resizeMode="contain"
          />
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' }} 
            style={styles.cardLogo} 
            resizeMode="contain"
          />
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png' }} 
            style={styles.cardLogo} 
            resizeMode="contain"
          />
        </View>
        
        {/* Credit card display */}
        <View style={styles.creditCardContainer}>
          <View style={styles.creditCardTop}>
            <Text style={styles.creditCardType}>Credit Card</Text>
          </View>
          <Text style={styles.creditCardNumber}>{selectedCard.number}</Text>
          <View style={styles.creditCardBottom}>
            <Text style={styles.creditCardExpiry}>{selectedCard.expiry}</Text>
            <Text style={styles.creditCardName}>{selectedCard.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Cash on Delivery content
  const cashContent = (
    <View style={styles.paymentMethodContent}>
      <Text style={styles.paymentMethodDescription}>
        Pay when your order is delivered to your doorstep. Additional ৳20 fee applies.
      </Text>
    </View>
  );

  // Google Pay / Phone Pay content
  const googlePayContent = (
    <View style={styles.paymentMethodContent}>
      <Text style={styles.paymentMethodDescription}>
        Pay securely using Google Pay or Phone Pay. Scan QR code or use linked account.
      </Text>
      <TouchableOpacity style={styles.linkAccountButton}>
        <Text style={styles.linkAccountButtonText}>Link Account</Text>
      </TouchableOpacity>
    </View>
  );

  // Paytm / UPI content
  const paytmContent = (
    <View style={styles.paymentMethodContent}>
      <Text style={styles.paymentMethodDescription}>
        Pay using Paytm wallet or any UPI app. Fast and secure payment method.
      </Text>
      <View style={styles.upiContainer}>
        <Text style={styles.upiLabel}>Enter UPI ID:</Text>
        <View style={styles.upiInputContainer}>
          <Text style={styles.upiInputPlaceholder}>yourname@upi</Text>
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Wallets content
  const walletContent = (
    <View style={styles.paymentMethodContent}>
      <Text style={styles.paymentMethodDescription}>
        Pay using your preferred digital wallet. Multiple options available.
      </Text>
      <View style={styles.walletOptionsContainer}>
        <TouchableOpacity style={styles.walletOption}>
          <Text style={styles.walletOptionText}>Amazon Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.walletOption}>
          <Text style={styles.walletOptionText}>PhonePe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.walletOption}>
          <Text style={styles.walletOptionText}>MobiKwik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Net Banking content
  const netBankingContent = (
    <View style={styles.paymentMethodContent}>
      <Text style={styles.paymentMethodDescription}>
        Pay directly from your bank account. Choose from popular banks below.
      </Text>
      <View style={styles.bankOptionsContainer}>
        <TouchableOpacity style={styles.bankOption}>
          <Text style={styles.bankOptionText}>HDFC Bank</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bankOption}>
          <Text style={styles.bankOptionText}>ICICI Bank</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bankOption}>
          <Text style={styles.bankOptionText}>SBI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bankOption}>
          <Text style={styles.bankOptionText}>Axis Bank</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Gift Card content
  const giftCardContent = (
    <View style={styles.paymentMethodContent}>
      <Text style={styles.paymentMethodDescription}>
        Have a gift card? Enter the code below to apply it to your purchase.
      </Text>
      <View style={styles.giftCardContainer}>
        <Text style={styles.giftCardLabel}>Gift Card Code:</Text>
        <View style={styles.giftCardInputContainer}>
          <Text style={styles.giftCardInputPlaceholder}>Enter code here</Text>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <PageWrapper
      title="Payment"
      leftIcon="back"
      rightIcons={[]}
      showBottomNav={false}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Bank Offer Header */}
        <View style={styles.bankOfferHeader}>
          <Ionicons name="gift-outline" size={20} color={Colors.product.accentPink} />
          <Text style={styles.bankOfferHeaderText}>Bank Offer</Text>
        </View>
        
        {/* Bank Offer Details */}
        <View style={styles.offerContainer}>
          <Text style={styles.offerText}>
            10% Instant Savings on CITI Credit and Debit Cards on a min spend of Rs.3,000. TCA
          </Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          {renderAccordionSection(
            'Cash on Delivery (Cash/UPI)',
            <Ionicons name="cash-outline" size={24} color="#FFFFFF" style={styles.accordionIcon} />,
            'cash',
            cashContent
          )}
          
          {renderAccordionSection(
            'Credit/Debit Card',
            <Ionicons name="card-outline" size={24} color="#FFFFFF" style={styles.accordionIcon} />,
            'card',
            cardContent
          )}
          
          {renderAccordionSection(
            'Google Pay/Phone Pay',
            <FontAwesome5 name="google-pay" size={24} color="#FFFFFF" style={styles.accordionIcon} />,
            'googlepay',
            googlePayContent
          )}
          
          {renderAccordionSection(
            'Paytm/Wallet/UPI',
            <MaterialIcons name="payment" size={24} color="#FFFFFF" style={styles.accordionIcon} />,
            'paytm',
            paytmContent
          )}
          
          {renderAccordionSection(
            'Wallets',
            <Ionicons name="wallet-outline" size={24} color="#FFFFFF" style={styles.accordionIcon} />,
            'wallet',
            walletContent
          )}
          
          {renderAccordionSection(
            'Net Banking',
            <MaterialIcons name="account-balance" size={24} color="#FFFFFF" style={styles.accordionIcon} />,
            'netbanking',
            netBankingContent
          )}
          

        </View>

        {/* Price Details */}
        <View style={styles.priceDetailsContainer}>
          <Text style={styles.priceDetailsTitle}>Price Details ({itemCount} {itemCount === 1 ? 'item' : 'items'})</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total MRP</Text>
            <Text style={styles.priceValue}>{formatCurrency(mrpTotal)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Discount on MRP</Text>
            <Text style={styles.discountValue}>-{formatCurrency(mrpDiscount)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Coupon Discount</Text>
            <Text style={styles.discountValue}>-{formatCurrency(couponDiscount)}</Text>
          </View>
          
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatCurrency(getTotal())}</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Payment Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.finalPrice}>{formatCurrency(getTotal())}</Text>
          <TouchableOpacity>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.payNowButton}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Text style={styles.payNowButtonText}>Pay now</Text>
        </TouchableOpacity>
      </View>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeAddCardModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ADD CARD</Text>
              <TouchableOpacity onPress={closeAddCardModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                Please ensure your card can be used for online transactions
              </Text>
              
              {/* Card Holder Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card holder Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={newCardDetails.name}
                  onChangeText={(text) => setNewCardDetails({...newCardDetails, name: text})}
                  placeholder=""
                  placeholderTextColor={Colors.product.lightGrey}
                />
                {cardErrors.name ? <Text style={styles.errorText}>{cardErrors.name}</Text> : null}
              </View>
              
              {/* Card Number */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={newCardDetails.number}
                  onChangeText={(text) => {
                    const formatted = formatCardNumber(text);
                    setNewCardDetails({...newCardDetails, number: formatted});
                  }}
                  placeholder="**** **** **** ****"
                  placeholderTextColor={Colors.product.lightGrey}
                  keyboardType="numeric"
                  maxLength={19}
                />
                {cardErrors.number ? <Text style={styles.errorText}>{cardErrors.number}</Text> : null}
              </View>
              
              {/* Expiry Date and Security Code */}
              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, {flex: 1, marginRight: 10}]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newCardDetails.expiry}
                    onChangeText={(text) => {
                      const formatted = formatExpiryDate(text);
                      setNewCardDetails({...newCardDetails, expiry: formatted});
                    }}
                    placeholder="mm/yyyy"
                    placeholderTextColor={Colors.product.lightGrey}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  {cardErrors.expiry ? <Text style={styles.errorText}>{cardErrors.expiry}</Text> : null}
                </View>
                
                <View style={[styles.inputGroup, {flex: 1}]}>
                  <Text style={styles.inputLabel}>Security Code</Text>
                  <TextInput
                    style={styles.textInput}
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text.replace(/\D/g, ''))}
                    placeholder="CVV"
                    placeholderTextColor={Colors.product.lightGrey}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                  {cardErrors.securityCode ? <Text style={styles.errorText}>{cardErrors.securityCode}</Text> : null}
                </View>
              </View>
              
              {/* Add Button */}
              <TouchableOpacity
                style={styles.addCardButton}
                onPress={handleAddCard}
                activeOpacity={0.8}
              >
                <Text style={styles.addCardButtonText}>Added</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:55,
    backgroundColor: Colors.product.background,
  },
  contentContainer: {
    paddingBottom: 30, // Increased space for bottom button above tab bar
  },
  bankOfferHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  bankOfferHeaderText: {
    color: Colors.product.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  offerContainer: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  offerText: {
    color: Colors.product.text,
    fontSize: 11,
    marginLeft: 8,
    flex: 1,
  },
  paymentMethodsContainer: {
    marginTop: 16,
  },
  accordionContainer: {
    backgroundColor: Colors.product.bgWhite,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionIcon: {
    marginRight: 12,
  },
  accordionTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  offerBadge: {
    backgroundColor: Colors.product.accentPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  offerBadgeText: {
    color: Colors.product.white,
    fontSize: 10,
    fontWeight: '600',
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  savedCardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  savedCardsText: {
    color: Colors.product.text,
    fontSize: 12,
    fontWeight: '500',
  },
  addCardText: {
    color: Colors.product.accentPink,
    fontSize: 12,
    fontWeight: '500',
  },
  cardListContainer: {
    marginBottom: 8,
  },
  cardLogosContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cardLogo: {
    width: 40,
    height: 24,
    marginRight: 8,
    backgroundColor: Colors.product.white,
    borderRadius: 4,
  },
  creditCardContainer: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 12,
    padding: 16,
    height: 160,
    justifyContent: 'space-between',
  },
  creditCardTop: {
    alignItems: 'flex-end',
  },
  creditCardType: {
    color: Colors.product.white,
    fontSize: 12,
    fontWeight: '600',
  },
  creditCardNumber: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 40,
  },
  creditCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  creditCardExpiry: {
    color: Colors.product.white,
    fontSize: 12,
  },
  creditCardName: {
    color: Colors.product.white,
    fontSize: 12,
    fontWeight: '600',
  },
  paymentMethodContent: {
    paddingVertical: 8,
  },
  paymentMethodDescription: {
    color: Colors.product.lightGrey,
    fontSize: 12,
    lineHeight: 20,
  },
  linkAccountButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.product.accentPink,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  linkAccountButtonText: {
    color: Colors.product.accentPink,
    fontSize: 12,
    fontWeight: '500',
  },
  upiContainer: {
    marginTop: 16,
  },
  upiLabel: {
    color: Colors.product.text,
    fontSize: 12,
    marginBottom: 8,
  },
  upiInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  upiInputPlaceholder: {
    color: Colors.product.lightGrey,
    flex: 1,
  },
  verifyButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  verifyButtonText: {
    color: Colors.product.white,
    fontSize: 10,
    fontWeight: '500',
  },
  walletOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  walletOption: {
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  walletOptionText: {
    color: Colors.product.text,
    fontSize: 12,
  },
  bankOptionsContainer: {
    marginTop: 16,
  },
  bankOption: {
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  bankOptionText: {
    color: Colors.product.text,
    fontSize: 12,
  },
  giftCardContainer: {
    marginTop: 16,
  },
  giftCardLabel: {
    color: Colors.product.text,
    fontSize: 12,
    marginBottom: 8,
  },
  giftCardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  giftCardInputPlaceholder: {
    color: Colors.product.lightGrey,
    flex: 1,
  },
  applyButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  applyButtonText: {
    color: Colors.product.white,
    fontSize: 10,
    fontWeight: '500',
  },
  priceDetailsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    backgroundColor: Colors.product.bgWhite,
    borderTopColor: Colors.product.darkGrey,
  },
  priceDetailsTitle: {
    color: Colors.product.text,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: Colors.product.borderLightWhite,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    color: Colors.product.lightGrey,
    fontSize: 12,
  },
  priceValue: {
    color: Colors.product.text,
    fontSize: 12,
  },
  discountValue: {
    color: '#4CAF50', // Green color for discounts
    fontSize: 12,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.product.darkGrey,
  },
  totalLabel: {
    color: Colors.product.text,
    fontSize: 14,
    fontWeight: '600',
  },
  totalValue: {
    color: Colors.product.text,
    fontSize: 14,
    fontWeight: '700',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0, // Add space above bottom navigation
    left: 0,
    right: 0,
    backgroundColor: Colors.product.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: Colors.product.borderLightWhite,
  },
  priceContainer: {
    flex: 1,
  },
  finalPrice: {
    color: Colors.product.text,
    fontSize: 16,
    fontWeight: '700',
  },
  viewDetailsText: {
    color: Colors.product.accentPink,
    fontSize: 10,
  },
  payNowButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  payNowButtonText: {
    color: Colors.product.white,
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: Colors.product.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: Colors.product.bgWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.product.darkGrey,
  },
  modalTitle: {
    color: Colors.product.text,
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  modalDescription: {
    color: Colors.product.lightGrey,
    fontSize: 14,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: Colors.product.text,
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.product.darkGrey,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.product.text,
    fontSize: 14,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  addCardButton: {
    backgroundColor: Colors.product.accentPink,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  addCardButtonText: {
    color: Colors.product.white,
    fontSize: 16,
    fontWeight: '600',
  },
});