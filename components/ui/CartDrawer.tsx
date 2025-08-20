import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useSafeArea } from "./SafeAreaProvider";
import { useCart } from "@/contexts/CartContext";

interface CartDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isVisible,
  onClose,
  onCheckout,
}) => {
  const insets = useSafeArea();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getSubtotal, 
    getDiscountAmount, 
    getTotal,
    appliedCoupon,
    couponInput,
    couponError,
    setCouponInput,
    applyCoupon,
    removeCoupon
  } = useCart();
  const [slideAnim] = useState(new Animated.Value(400));

  // Calculate totals
  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const deliveryFee = 0.99;
  const total = getTotal();

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 400,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleIncreaseQuantity = (id: string, selectedColor?: string) => {
    const itemKey = `${id}-${selectedColor || "default"}`;
    const item = cartItems.find(
      (i) => `${i.id}-${i.selectedColor || "default"}` === itemKey
    );
    if (item) {
      updateQuantity(id, item.quantity + 1, selectedColor);
    }
  };

  const handleDecreaseQuantity = (id: string, selectedColor?: string) => {
    const itemKey = `${id}-${selectedColor || "default"}`;
    const item = cartItems.find(
      (i) => `${i.id}-${i.selectedColor || "default"}` === itemKey
    );
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1, selectedColor);
    }
  };

  const handleRemoveItem = (id: string, selectedColor?: string) => {
    removeFromCart(id, selectedColor);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.drawer,
          { paddingTop: insets.top, transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#F4F4F4" />
          </Pressable>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <View style={styles.emptyCartIcon}>
              <Ionicons name="bag-outline" size={80} color="#3A3A3A" />
            </View>
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtitle}>
              Looks like you haven 't added anything to your cart yet.
            </Text>
            <Text style={styles.emptyCartSubtitle}>
              Start shopping to fill it up!
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.cartItemsContainer}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <View
                key={`${item.id}-${item.selectedColor || "default"}`}
                style={styles.cartItem}
              >
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {/* <Text style={styles.itemSubtitle}>{item.title.toLowerCase().includes('casual') ? 'Peter Langford Pure Cotton Shirt' : ''}</Text> */}
                  {item.colorName && (
                    <Text style={styles.itemColor}>Color: {item.colorName}</Text>
                  )}
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <Text style={styles.itemOriginalPrice}>
                      {item.originalPrice}
                    </Text>
                  </View>
                </View>
                <View style={styles.quantityControls}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      handleDecreaseQuantity(item.id, item.selectedColor)
                    }
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      handleIncreaseQuantity(item.id, item.selectedColor)
                    }
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {cartItems.length > 0 && (
          <View style={styles.couponContainer}>
          <Text style={styles.couponText}>Have a coupon code? Enter here:</Text>
          
          {appliedCoupon ? (
            <View style={styles.appliedCouponContainer}>
              <View style={styles.appliedCouponInfo}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.product.accentPink}
                />
                <Text style={styles.appliedCouponText}>
                  {appliedCoupon.code} (-{appliedCoupon.discount}%)
                </Text>
              </View>
              <Pressable style={styles.removeCouponButton} onPress={removeCoupon}>
                <Ionicons name="close" size={16} color="#A0A0A0" />
              </Pressable>
            </View>
          ) : (
            <View>
              <View style={styles.couponInputContainer}>
                <Ionicons
                  name="pricetag-outline"
                  size={20}
                  color={Colors.product.accentPink}
                />
                <TextInput
                  style={styles.couponInput}
                  placeholder="Enter Your Offer Code"
                  placeholderTextColor="#A0A0A0"
                  value={couponInput}
                  onChangeText={setCouponInput}
                  autoCapitalize="characters"
                />
                <Pressable 
                  style={[styles.applyButton, !couponInput.trim() && styles.applyButtonDisabled]} 
                  onPress={applyCoupon}
                  disabled={!couponInput.trim()}
                >
                  <Text style={[styles.applyButtonText, !couponInput.trim() && styles.applyButtonTextDisabled]}>Apply</Text>
                </Pressable>
              </View>
              {couponError ? (
                <Text style={styles.couponErrorText}>{couponError}</Text>
              ) : null}
            </View>
          )}
          </View>
        )}

        {cartItems.length > 0 && (
          <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price:</Text>
            <Text style={styles.summaryValue}>৳{subtotal.toFixed(2)}</Text>
          </View>
          {discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount ({appliedCoupon?.code}):</Text>
              <Text style={styles.discountValue}>-৳{discountAmount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee:</Text>
            <Text style={styles.summaryValue}>৳{deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>৳{total.toFixed(2)}</Text>
          </View>
          </View>
        )}

        {cartItems.length > 0 && (
          <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>৳{total.toFixed(2)}</Text>
            <Text style={styles.viewPriceDetails}>View price details</Text>
          </View>
          <Pressable style={styles.checkoutButton} onPress={onCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "90%",
    height: "100%",
    backgroundColor: "#181A20",
    borderLeftWidth: 1,
    borderLeftColor: "#23262F",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#23262F",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F4F4F4",
  },
  closeButton: {
    padding: 8,
  },
  deliveryInfo: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#23262F",
  },
  deliveryText: {
    fontSize: 12,
    color: "#A0A0A0",
    marginBottom: 4,
  },
  deliveryLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F4F4F4",
    marginRight: 4,
  },
  cartItemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#23262F",
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F4F4F4",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#A0A0A0",
    marginBottom: 4,
  },
  itemColor: {
    fontSize: 12,
    color: "#A0A0A0",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F4F4F4",
    marginRight: 8,
  },
  itemOriginalPrice: {
    fontSize: 12,
    color: "#A0A0A0",
    textDecorationLine: "line-through",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#23262F",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F4F4F4",
    lineHeight: 20,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F4F4F4",
    marginHorizontal: 8,
  },
  couponContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#23262F",
    borderBottomWidth: 1,
    borderBottomColor: "#23262F",
  },
  couponText: {
    fontSize: 12,
    color: "#A0A0A0",
    marginBottom: 8,
  },
  couponInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23262F",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: "#F4F4F4",
    marginLeft: 8,
    paddingVertical: 4,
  },
  applyButton: {
    backgroundColor: Colors.product.accentPink,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  applyButtonDisabled: {
    backgroundColor: "#3A3A3A",
  },
  applyButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  applyButtonTextDisabled: {
    color: "#A0A0A0",
  },
  couponErrorText: {
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 8,
    marginLeft: 4,
  },
  appliedCouponContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A4D3A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  appliedCouponInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  appliedCouponText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.product.accentPink,
    marginLeft: 8,
  },
  removeCouponButton: {
    padding: 4,
  },
  summaryContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#23262F",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  summaryValue: {
    fontSize: 14,
    color: "#F4F4F4",
  },
  discountValue: {
    fontSize: 14,
    color: Colors.product.accentPink,
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#23262F",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F4F4F4",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.product.accentPink,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#23262F",
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F4F4F4",
  },
  viewPriceDetails: {
    fontSize: 12,
    color: Colors.product.accentPink,
  },
  checkoutButton: {
    backgroundColor: Colors.product.accentPink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  checkoutButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emptyCartContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    
    paddingHorizontal: 40,
  },
  emptyCartIcon: {
    marginBottom: 24,
    opacity: 0.6,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F4F4F4",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyCartSubtitle: {
    fontSize: 14,
    color: "#A0A0A0",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
  },
});
