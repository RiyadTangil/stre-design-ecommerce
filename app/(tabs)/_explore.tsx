import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Custom CSS to make the website look more like a native app
  const injectedJavaScript = `
    (function() {
      // Hide scrollbars and make it look more native
      const style = document.createElement('style');
      style.textContent = \`
        * {
          -webkit-overflow-scrolling: touch;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }
        /* Hide scrollbars but keep functionality */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Make the site more mobile-friendly */
        .container, .main-content {
          max-width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        /* Ensure proper mobile viewport */
        @media (max-width: 768px) {
          body {
            font-size: 16px;
          }
        }
      \`;
      document.head.appendChild(style);
      
      // Remove any fixed headers that might interfere
      const fixedElements = document.querySelectorAll('header, .header, .navbar, .nav');
      fixedElements.forEach(el => {
        if (el.style.position === 'fixed') {
          el.style.position = 'relative';
        }
      });
      
      // Ensure the page is mobile-optimized
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
      } else {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      }
    })();
    true;
  `;

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            Unable to load content. Please check your internet connection and try again.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </View>
      )}
      <WebView
        source={{ uri: 'https://stardesignbd.com/' }}
        style={[styles.webview, isLoading && styles.hidden]}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
});
