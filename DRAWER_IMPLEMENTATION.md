# Drawer Navigation Implementation

This document explains the drawer navigation implementation with reusable components and hooks.

## Features Implemented

### 1. **Drawer Component** (`components/ui/Drawer.tsx`)
- **Project Logo**: Displays at the top of the drawer using Unsplash image
- **Categories with Dropdown**: Each category can expand to show sub-categories
- **Animated Transitions**: Smooth expand/collapse animations
- **Reusable**: Can be used across different screens

### 2. **Enhanced Header Component** (`components/ui/Header.tsx`)
- **Conditional Logo/Text**: Shows logo on home page, text on other pages
- **Hamburger Menu**: Opens the drawer when pressed
- **Cart Badge**: Shows cart count with notification badge

### 3. **Reusable Hook** (`hooks/useDrawer.ts`)
- **State Management**: Manages drawer visibility
- **Event Handlers**: Handles category and sub-category navigation
- **Reusable**: Can be used in any screen that needs drawer functionality

### 4. **AppHeader Wrapper** (`components/ui/AppHeader.tsx`)
- **Simplified Interface**: Wraps the Header component for easier usage
- **Consistent API**: Provides a clean interface for different screen types

## Usage Examples

### Home Screen (with Logo)
```tsx
import { AppHeader } from '@/components/ui/AppHeader';
import { useDrawer } from '@/hooks/useDrawer';

export default function HomeScreen() {
  const { isDrawerVisible, openDrawer, closeDrawer, handleCategoryPress, handleSubCategoryPress } = useDrawer();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Home"
        cartCount={cartCount}
        showLogo={true} // Shows logo instead of text
        onMenuPress={openDrawer}
        onSearchPress={() => console.log('Search')}
        onWishlistPress={() => console.log('Wishlist')}
        onCartPress={() => console.log('Cart')}
      />
      
      {/* Your content */}
      
      <Drawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        onCategoryPress={handleCategoryPress}
        onSubCategoryPress={handleSubCategoryPress}
      />
    </SafeAreaView>
  );
}
```

### Category Screen (with Text)
```tsx
export default function CategoryScreen() {
  const { isDrawerVisible, openDrawer, closeDrawer, handleCategoryPress, handleSubCategoryPress } = useDrawer();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Fashion"
        cartCount={cartCount}
        showLogo={false} // Shows text instead of logo
        onMenuPress={openDrawer}
        onSearchPress={() => console.log('Search')}
        onWishlistPress={() => console.log('Wishlist')}
        onCartPress={() => console.log('Cart')}
      />
      
      {/* Your content */}
      
      <Drawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        onCategoryPress={handleCategoryPress}
        onSubCategoryPress={handleSubCategoryPress}
      />
    </SafeAreaView>
  );
}
```

## Component Structure

```
components/ui/
├── Drawer.tsx           # Main drawer component with categories
├── Header.tsx           # Enhanced header with logo/text support
├── AppHeader.tsx        # Wrapper component for easier usage
└── ... (other UI components)

hooks/
└── useDrawer.ts         # Reusable hook for drawer state management

app/(tabs)/
├── index.tsx           # Home screen (shows logo)
└── category.tsx        # Category screen (shows text)
```

## Key Features

### 1. **Code Reusability**
- `useDrawer` hook can be used in any screen
- `AppHeader` component provides consistent interface
- `Drawer` component is completely reusable

### 2. **Conditional Logo Display**
- Home page: Shows project logo + "Star Design" text
- Other pages: Shows page title as text
- Controlled by `showLogo` prop

### 3. **Category Navigation**
- Main categories with icons
- Expandable sub-categories
- Smooth animations
- Proper event handling

### 4. **Consistent Styling**
- Dark theme throughout
- Proper safe area handling
- Status bar integration
- Responsive design

## Customization

### Adding New Categories
Edit the `categories` array in `components/ui/Drawer.tsx`:

```tsx
const categories: Category[] = [
  {
    id: '7',
    name: 'New Category',
    icon: 'star',
    subCategories: [
      { id: '7-1', name: 'Sub Category 1' },
      { id: '7-2', name: 'Sub Category 2' },
    ],
  },
  // ... existing categories
];
```

### Changing the Logo
Update the image source in both `Header.tsx` and `Drawer.tsx`:

```tsx
source={{ uri: 'YOUR_LOGO_URL' }}
```

### Styling Customization
All styles are defined in the respective component files and can be easily modified to match your design requirements.

## Navigation Integration

The drawer is designed to work with any navigation system. You can integrate it with:
- React Navigation
- Expo Router
- Custom navigation solutions

Simply update the `handleCategoryPress` and `handleSubCategoryPress` functions in the `useDrawer` hook to navigate to the appropriate screens. 