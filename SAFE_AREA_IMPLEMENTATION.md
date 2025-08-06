# Centralized Safe Area Implementation

This document explains the centralized safe area handling implementation that fixes the drawer positioning issue.

## Problem Solved

**Issue**: The drawer was opening outside the safe area, causing it to appear behind the status bar and notch on devices.

**Solution**: Implemented a centralized safe area handling system that ensures consistent positioning across all components.

## Implementation

### 1. **SafeAreaProvider** (`components/ui/SafeAreaProvider.tsx`)

Centralized provider that wraps the entire app and provides safe area insets to all components.

```tsx
import { SafeAreaProvider } from '@/components/ui/SafeAreaProvider';

// In app/_layout.tsx
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Your app content */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

### 2. **useSafeArea Hook**

Hook to access safe area insets anywhere in the app:

```tsx
import { useSafeArea } from '@/components/ui/SafeAreaProvider';

const MyComponent = () => {
  const insets = useSafeArea();
  
  return (
    <View style={{ paddingTop: insets.top }}>
      {/* Content */}
    </View>
  );
};
```

### 3. **SafeAreaView Component**

Custom SafeAreaView component that applies safe area padding:

```tsx
import { SafeAreaView } from '@/components/ui/SafeAreaProvider';

const MyScreen = () => {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      {/* Content */}
    </SafeAreaView>
  );
};
```

## Drawer Fix

### Before (Problem)
```tsx
// Drawer was positioned absolutely without considering safe area
const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    // Missing safe area consideration
  },
});
```

### After (Solution)
```tsx
// Drawer now uses safe area insets
export const Drawer: React.FC<DrawerProps> = ({ isVisible, onClose, ... }) => {
  const insets = useSafeArea();
  
  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.drawer, { paddingTop: insets.top }]}>
        {/* Drawer content */}
      </View>
    </View>
  );
};
```

## Usage Examples

### 1. **Home Screen**
```tsx
import { SafeAreaView } from '@/components/ui/SafeAreaProvider';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      <AppHeader showLogo={true} />
      {/* Content */}
      <Drawer />
    </SafeAreaView>
  );
}
```

### 2. **Category Screen**
```tsx
import { SafeAreaView } from '@/components/ui/SafeAreaProvider';

export default function CategoryScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      <AppHeader showLogo={false} title="Fashion" />
      {/* Content */}
      <Drawer />
    </SafeAreaView>
  );
}
```

### 3. **Custom Component with Safe Area**
```tsx
import { useSafeArea } from '@/components/ui/SafeAreaProvider';

const CustomHeader = () => {
  const insets = useSafeArea();
  
  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      {/* Header content */}
    </View>
  );
};
```

## Key Benefits

### 1. **Centralized Management**
- Single source of truth for safe area handling
- Consistent behavior across all screens
- Easy to maintain and update

### 2. **Automatic Device Adaptation**
- Works on all devices (iPhone, Android, tablets)
- Handles notches, status bars, and home indicators
- No manual calculations needed

### 3. **Flexible Usage**
- Use `SafeAreaView` for full-screen components
- Use `useSafeArea` hook for custom positioning
- Control which edges to apply safe area to

### 4. **Drawer Positioning Fixed**
- Drawer now opens within safe area bounds
- Proper positioning on all devices
- No more overlap with status bar

## Edge Cases Handled

### 1. **Different Device Types**
- iPhone with notch
- iPhone without notch
- Android devices
- Tablets

### 2. **Orientation Changes**
- Portrait and landscape modes
- Dynamic safe area updates

### 3. **Status Bar Changes**
- Dynamic status bar height
- Status bar style changes

## Migration Guide

### From react-native-safe-area-context
```tsx
// Old
import { SafeAreaView } from 'react-native-safe-area-context';

// New
import { SafeAreaView } from '@/components/ui/SafeAreaProvider';
```

### From useSafeAreaInsets
```tsx
// Old
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// New
import { useSafeArea } from '@/components/ui/SafeAreaProvider';
```

## Testing

To verify the implementation works correctly:

1. **Test on different devices** (iPhone, Android, tablet)
2. **Test in different orientations** (portrait, landscape)
3. **Verify drawer positioning** (should not overlap status bar)
4. **Check safe area padding** (content should not be hidden)

## Troubleshooting

### Drawer still overlapping status bar?
- Ensure `SafeAreaProvider` wraps the entire app
- Check that `useSafeArea` hook is being used in Drawer component
- Verify `paddingTop: insets.top` is applied to drawer container

### Safe area not working on some screens?
- Make sure to import `SafeAreaView` from `@/components/ui/SafeAreaProvider`
- Check that `SafeAreaProvider` is in the root layout
- Verify edges prop is set correctly

### Performance issues?
- The implementation uses React Native's built-in safe area detection
- No additional calculations or performance overhead
- Safe area values are cached and only update when needed 