import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface CartItem {
  id: string;
  title: string;
  image: { uri: string };
  price: string;
  originalPrice: string;
  quantity: number;
  selectedColor?: string;
  colorName?: string;
}

export interface CouponCode {
  code: string;
  discount: number; // percentage discount (e.g., 10 for 10%)
  minAmount?: number; // minimum cart amount required
  isValid: boolean;
}

interface CartContextType {
  isCartVisible: boolean;
  cartItems: CartItem[];
  appliedCoupon: CouponCode | null;
  couponInput: string;
  couponError: string;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, selectedColor?: string) => void;
  updateQuantity: (id: string, quantity: number, selectedColor?: string) => void;
  getCartCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  setCouponInput: (code: string) => void;
  applyCoupon: () => void;
  removeCoupon: () => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  // Mock coupon codes for demonstration
  const validCoupons: CouponCode[] = [
    { code: 'SAVE10', discount: 10, minAmount: 50, isValid: true },
    { code: 'WELCOME20', discount: 20, minAmount: 100, isValid: true },
    { code: 'FIRST15', discount: 15, minAmount: 30, isValid: true },
    { code: 'SUMMER25', discount: 25, minAmount: 200, isValid: true },
  ];

  const openCart = useCallback(() => {
    console.log("Opening cart with items:", cartItems);
    setIsCartVisible(true);
  }, [cartItems]);

  const closeCart = useCallback(() => {
    setIsCartVisible(false);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    console.log("Adding to cart:", item);
    setCartItems(prevItems => {
      // Create unique identifier combining product id and selected color
      const itemKey = `${item.id}-${item.selectedColor || 'default'}`;
      const existingItem = prevItems.find(i => 
        `${i.id}-${i.selectedColor || 'default'}` === itemKey
      );
      
      if (existingItem) {
        const updatedItems = prevItems.map(i => 
          `${i.id}-${i.selectedColor || 'default'}` === itemKey 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
        console.log("Updated cart items:", updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        console.log("New cart items:", newItems);
        return newItems;
      }
    });
  }, []);

  const removeFromCart = useCallback((id: string, selectedColor?: string) => {
    const itemKey = `${id}-${selectedColor || 'default'}`;
    setCartItems(prevItems => prevItems.filter(item => 
      `${item.id}-${item.selectedColor || 'default'}` !== itemKey
    ));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedColor);
      return;
    }
    
    const itemKey = `${id}-${selectedColor || 'default'}`;
    setCartItems(prevItems =>
      prevItems.map(item =>
        `${item.id}-${item.selectedColor || 'default'}` === itemKey 
          ? { ...item, quantity } 
          : item
      )
    );
  }, [removeFromCart]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const getSubtotal = useCallback(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('৳', ''));
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const getDiscountAmount = useCallback(() => {
    if (!appliedCoupon) return 0;
    const subtotal = getSubtotal();
    return (subtotal * appliedCoupon.discount) / 100;
  }, [appliedCoupon, getSubtotal]);

  const getTotal = useCallback(() => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const deliveryFee = 0.99;
    return subtotal - discount + deliveryFee;
  }, [getSubtotal, getDiscountAmount]);

  const applyCoupon = useCallback(() => {
    setCouponError('');
    
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const coupon = validCoupons.find(c => c.code.toLowerCase() === couponInput.toLowerCase());
    
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    const subtotal = getSubtotal();
    if (coupon.minAmount && subtotal < coupon.minAmount) {
      setCouponError(`Minimum order amount ৳${coupon.minAmount} required`);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponInput('');
    console.log('Coupon applied:', coupon);
  }, [couponInput, getSubtotal, validCoupons]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError('');
    console.log('Coupon removed');
  }, []);

  const checkout = useCallback(() => {
    console.log('Proceeding to checkout with items:', cartItems);
    // Implement checkout logic here
  }, [cartItems]);

  const value: CartContextType = {
    isCartVisible,
    cartItems,
    appliedCoupon,
    couponInput,
    couponError,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    setCouponInput,
    applyCoupon,
    removeCoupon,
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};