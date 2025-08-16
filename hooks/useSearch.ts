import { router } from 'expo-router';
import { useCallback, useState } from 'react';

interface RecentSearch {
  id: string;
  term: string;
}

interface SearchResult {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: { uri: string };
  rating?: number;
  reviews?: number;
  discount?: string;
}

export const useSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: '1', term: 'boat earbuds' },
    { id: '2', term: 'mobile phones' },
    { id: '3', term: 'realme earphones' },
    { id: '4', term: 'vivo t1 5g' },
    { id: '5', term: 'washing machine' },
    { id: '6', term: 'Air conditioner' },
    { id: '7', term: 'refrigerator' },
    { id: '8', term: 'home theatre' },
  ]);

  const openSearch = useCallback(() => {
    setIsSearchVisible(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);

  const addToRecentSearches = useCallback((term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    const existingIndex = recentSearches.findIndex(
      item => item.term.toLowerCase() === trimmedTerm.toLowerCase()
    );

    if (existingIndex === -1) {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        term: trimmedTerm,
      };
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 9)]); // Keep only 10 items
    } else {
      // Move to top if already exists
      const updatedSearches = [...recentSearches];
      const [movedItem] = updatedSearches.splice(existingIndex, 1);
      updatedSearches.unshift(movedItem);
      setRecentSearches(updatedSearches);
    }
  }, [recentSearches]);

  const removeFromRecentSearches = useCallback((id: string) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchQuery(query);
    addToRecentSearches(query);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock search results - in a real app, this would come from an API
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'iPhone 15 Pro Max',
          price: '৳1,199',
          originalPrice: '৳1,299',
          image: { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
          rating: 4.8,
          reviews: 1250,
          discount: '8% off',
        },
        {
          id: '2',
          title: 'Samsung Galaxy S24 Ultra',
          price: '৳1,299',
          originalPrice: '৳1,399',
          image: { uri: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
          rating: 4.7,
          reviews: 890,
          discount: '7% off',
        },
        {
          id: '3',
          title: 'Google Pixel 8 Pro',
          price: '৳999',
          originalPrice: '৳1,099',
          image: { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
          rating: 4.6,
          reviews: 567,
          discount: '9% off',
        },
        {
          id: '4',
          title: 'OnePlus 12',
          price: '৳899',
          originalPrice: '৳999',
          image: { uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop' },
          rating: 4.5,
          reviews: 432,
          discount: '10% off',
        },
        {
          id: '5',
          title: 'Xiaomi 14 Ultra',
          price: '৳1,099',
          originalPrice: '৳1,199',
          image: { uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop' },
          rating: 4.4,
          reviews: 321,
          discount: '8% off',
        },
      ];

      // Filter results based on query
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
      setShowResults(true);
      setIsSearchVisible(false);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [addToRecentSearches]);

  const closeResults = useCallback(() => {
    setShowResults(false);
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const handleProductPress = useCallback((product: SearchResult) => {
    console.log('Product pressed:', product.title);
    // Navigate to product detail page
    // For search results, we'll use a default product since they might not match our database
    router.push({
      pathname: '/product-details',
      params: { productId: '1' } // Default to first product
    });
  }, []);

  return {
    isSearchVisible,
    showResults,
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    openSearch,
    closeSearch,
    closeResults,
    performSearch,
    handleProductPress,
    addToRecentSearches,
    removeFromRecentSearches,
    clearRecentSearches,
  };
};
