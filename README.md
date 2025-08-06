# E-Commerce Mobile App

A pixel-perfect, cross-platform e-commerce mobile application built with React Native and Expo, designed to work seamlessly on both iOS and Android platforms.

## 🎨 Design Features

### Pixel-Perfect Implementation
- **Hero Banner**: Dynamic gradient background with promotional content, model image, and auto-sliding pagination
- **Category Grid**: 4-column grid with custom icons for easy navigation
- **Sale Timer**: Real-time countdown timer with dynamic updates
- **Product Cards**: Horizontal scrolling product lists with pricing and add-to-cart functionality
- **Featured Categories**: Image-based category cards with overlay text
- **Product Lists**: Vertical product listings with detailed information
- **Navigation**: Top header with cart badge and bottom tab navigation

### Color Scheme
- **Primary**: Pink (#FF6B9D) - Used for buttons, active states, and accents
- **Secondary**: Blue (#1E3A8A) - Used for sale timer background
- **Neutral**: White, light grays (#f8f9fa, #f0f0f0) - Used for backgrounds and borders
- **Text**: Dark gray (#1a1a1a) for primary text, light gray (#999) for secondary text

## 🏗️ Architecture

### Component Structure
```
components/ui/
├── Header.tsx              # Top navigation with cart badge
├── HeroBanner.tsx          # Main promotional banner
├── CategoryCard.tsx        # Category grid items
├── SaleTimer.tsx           # Countdown timer component
├── ProductCard.tsx         # Horizontal product cards
├── ProductListItem.tsx     # Vertical product list items
├── FeaturedCategoryCard.tsx # Featured category cards
├── BottomTabBar.tsx        # Bottom navigation
└── PlaceholderImage.tsx    # Image placeholder component
```

### Key Features
- **Reusable Components**: All UI components are modular and reusable
- **TypeScript**: Full type safety with proper interfaces
- **Cross-Platform**: Optimized for both iOS and Android
- **Performance**: Efficient rendering with FlatList for large datasets
- **Accessibility**: Proper touch targets and semantic markup

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📱 Platform Compatibility

### iOS
- Supports iOS 13.0 and later
- Optimized for iPhone and iPad
- Safe area handling for notched devices
- Haptic feedback integration ready

### Android
- Supports Android 6.0 (API level 23) and later
- Material Design principles
- Adaptive icons support
- Back button handling

## 🎯 Key Components

### Header Component
- Hamburger menu icon
- Page title
- Search, wishlist, and cart icons
- Dynamic cart badge with count

### Hero Banner
- Linear gradient background
- Promotional content layout
- Auto-sliding pagination dots
- Social media links
- Call-to-action button

### Category Grid
- 4-column responsive layout
- Custom icons for each category
- Touch feedback
- Scalable for additional categories

### Sale Timer
- Real-time countdown functionality
- Custom styling with badge
- Automatic updates every second
- Configurable end time

### Product Cards
- Horizontal scrolling layout
- Image placeholder handling
- Price display with original price strikethrough
- Add-to-cart button with icon

### Bottom Tab Bar
- 4-tab navigation (Home, Categories, Wishlist, Profile)
- Active state indicators
- Platform-specific padding
- Smooth transitions

## 🔧 Customization

### Adding New Categories
```typescript
const newCategories = [
  { id: '9', icon: 'car' as const, title: 'Automotive' },
  { id: '10', icon: 'book' as const, title: 'Books' },
];
```

### Modifying Colors
Update the color constants in each component:
```typescript
const colors = {
  primary: '#FF6B9D',
  secondary: '#1E3A8A',
  background: '#f8f9fa',
  text: '#1a1a1a',
};
```

### Adding Real Images
Replace placeholder images with actual assets:
```typescript
// In your data arrays
{
  id: '1',
  image: require('@/assets/images/product1.png'),
  title: 'Product Name',
  // ... other properties
}
```

## 📊 Performance Optimizations

- **FlatList**: Used for efficient rendering of large lists
- **Image Optimization**: Placeholder images for missing assets
- **Memory Management**: Proper cleanup of timers and intervals
- **Lazy Loading**: Components load only when needed

## 🧪 Testing

The app is structured for easy testing:
- Component isolation
- Mock data for development
- Console logging for user interactions
- TypeScript for compile-time error checking

## 📦 Dependencies

### Core Dependencies
- `expo`: ~53.0.20
- `react-native`: 0.79.5
- `@expo/vector-icons`: ^14.1.0
- `expo-linear-gradient`: ^14.1.5

### Development Dependencies
- `typescript`: ~5.8.3
- `eslint`: ^9.25.0
- `@types/react`: ~19.0.10

## 🎨 Design System

### Typography
- **Headers**: 18px, Bold (700)
- **Titles**: 16px, Semi-Bold (600)
- **Body**: 14px, Regular (400)
- **Captions**: 12px, Regular (400)

### Spacing
- **Small**: 8px
- **Medium**: 16px
- **Large**: 20px
- **Extra Large**: 24px

### Border Radius
- **Small**: 8px
- **Medium**: 12px
- **Large**: 16px
- **Circle**: 50%

## 🔮 Future Enhancements

- [ ] Real API integration
- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Product search and filtering
- [ ] Push notifications
- [ ] Offline support
- [ ] Analytics integration
- [ ] A/B testing framework

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.
