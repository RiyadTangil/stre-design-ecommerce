# Navigation Guide: Home to Product Details

## Overview
This guide explains how to navigate from the home page to the product details page using the popular products section.

## Navigation Flow

### 1. From Home Page
- **Location**: `app/(tabs)/index.tsx`
- **Section**: "Most Popular" products carousel
- **Action**: Tap on any product card

### 2. Navigation Implementation
```typescript
// In app/(tabs)/index.tsx
const handleHomeProductPress = (product: any) => {
  console.log('Product pressed:', product.title);
  // Navigate to product details with product data
  router.push({
    pathname: '/product-details',
    params: { productId: product.id }
  });
};
```

### 3. Product Details Page
- **Location**: `app/(tabs)/product-details.tsx`
- **Receives**: `productId` parameter from navigation
- **Loads**: Product data from mock database

## Available Products

The following products are available in the mock database:

| ID | Product Name | Category | Price |
|----|--------------|----------|-------|
| 1 | Peter England casual | Fashion | $45.00 |
| 2 | Zip-Front Track Jacket | Sports | $23.12 |
| 3 | Louis V | Luxury | $155.00 |
| 4 | Nike Air Max | Footwear | $89.99 |
| 5 | Adidas Ultraboost | Footwear | $129.99 |

## How to Test

1. **Start the app**: `npm start` or `expo start`
2. **Navigate to Home**: The app opens on the home page
3. **Find Popular Products**: Scroll down to the "Most Popular" section
4. **Tap a Product**: Tap on any product card in the carousel
5. **View Details**: You'll be taken to the product details page

## Navigation Features

### Back Navigation
- **Header Back Button**: Tap the left arrow in the top-left corner
- **System Back**: Use the device's back button (Android) or swipe gesture (iOS)

### Product Details Features
- **Image Carousel**: Swipe through product images
- **Color Selection**: Tap different color swatches
- **Wishlist**: Tap the heart icon to add/remove from wishlist
- **Add to Cart**: Tap the "Add Cart" button at the bottom

## Code Structure

### Home Page (`app/(tabs)/index.tsx`)
```typescript
// Product data
const popularProducts = [
  {
    id: '1',
    title: 'Peter England casual',
    price: '$45.00',
    // ... other properties
  },
  // ... more products
];

// Navigation handler
const handleHomeProductPress = (product: any) => {
  router.push({
    pathname: '/product-details',
    params: { productId: product.id }
  });
};
```

### Product Details Page (`app/(tabs)/product-details.tsx`)
```typescript
// Get product ID from navigation
const { productId } = useLocalSearchParams<{ productId: string }>();

// Load product data
const productData = productDatabase[productId || '1'] || productDatabase['1'];
```

## Error Handling

- **Invalid Product ID**: Falls back to product ID '1'
- **Missing Product**: Shows loading state
- **Navigation Errors**: Graceful fallback to home page

## Future Enhancements

1. **Deep Linking**: Direct links to specific products
2. **Product Search**: Search and navigate to products
3. **Related Products**: Navigate between related items
4. **Product History**: Remember recently viewed products
5. **Share Products**: Share product links

## Testing Checklist

- [ ] Tap each product in the popular section
- [ ] Verify correct product data loads
- [ ] Test back navigation
- [ ] Test color selection
- [ ] Test wishlist functionality
- [ ] Test add to cart functionality
- [ ] Test image carousel
- [ ] Test on different screen sizes

This navigation system provides a smooth user experience from browsing products on the home page to viewing detailed product information.
