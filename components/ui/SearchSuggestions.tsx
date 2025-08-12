import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface SearchSuggestion {
  id: string;
  term: string;
  type: 'product' | 'category' | 'brand';
  icon?: string;
}

interface SearchSuggestionsProps {
  query: string;
  onSuggestionPress: (suggestion: SearchSuggestion) => void;
  visible: boolean;
}

// Mock suggestions data - in a real app, this would come from an API
const mockSuggestions: SearchSuggestion[] = [
  { id: '1', term: 'iPhone 15 Pro', type: 'product', icon: 'phone-portrait' },
  { id: '2', term: 'Samsung Galaxy', type: 'product', icon: 'phone-portrait' },
  { id: '3', term: 'Apple Watch', type: 'product', icon: 'watch' },
  { id: '4', term: 'MacBook Pro', type: 'product', icon: 'laptop' },
  { id: '5', term: 'Nike Shoes', type: 'product', icon: 'football' },
  { id: '6', term: 'Electronics', type: 'category', icon: 'hardware-chip' },
  { id: '7', term: 'Fashion', type: 'category', icon: 'shirt' },
  { id: '8', term: 'Home & Garden', type: 'category', icon: 'home' },
  { id: '9', term: 'Apple', type: 'brand', icon: 'logo-apple' },
  { id: '10', term: 'Samsung', type: 'brand', icon: 'logo-android' },
];

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = memo(({
  query,
  onSuggestionPress,
  visible,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);

  const filterSuggestions = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = mockSuggestions.filter(suggestion =>
      suggestion.term.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by relevance (exact matches first, then partial matches)
    const sorted = filtered.sort((a, b) => {
      const aExact = a.term.toLowerCase().startsWith(searchQuery.toLowerCase());
      const bExact = b.term.toLowerCase().startsWith(searchQuery.toLowerCase());
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return a.term.localeCompare(b.term);
    });

    setFilteredSuggestions(sorted.slice(0, 8)); // Limit to 8 suggestions
  }, []);

  useEffect(() => {
    filterSuggestions(query);
  }, [query, filterSuggestions]);

  const getIconName = (suggestion: SearchSuggestion) => {
    if (suggestion.icon) return suggestion.icon;
    
    switch (suggestion.type) {
      case 'product':
        return 'cube';
      case 'category':
        return 'grid';
      case 'brand':
        return 'business';
      default:
        return 'search';
    }
  };

  const getTypeColor = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product':
        return '#FF6B9D';
      case 'category':
        return '#4CAF50';
      case 'brand':
        return '#2196F3';
      default:
        return '#A0A0A0';
    }
  };

  const renderSuggestion = useCallback(({ item }: { item: SearchSuggestion }) => (
    <Pressable
      style={styles.suggestionItem}
      onPress={() => onSuggestionPress(item)}
    >
      <View style={styles.suggestionLeft}>
        <View style={[styles.iconContainer, { backgroundColor: getTypeColor(item.type) + '20' }]}>
          <Ionicons 
            name={getIconName(item) as any} 
            size={16} 
            color={getTypeColor(item.type)} 
          />
        </View>
        <Text style={styles.suggestionText}>{item.term}</Text>
      </View>
      <View style={styles.suggestionRight}>
        <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
          {item.type}
        </Text>
        <Ionicons name="arrow-forward" size={16} color="#A0A0A0" />
      </View>
    </Pressable>
  ), [onSuggestionPress]);

  if (!visible || filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Suggestions</Text>
        <Text style={styles.countText}>{filteredSuggestions.length} results</Text>
      </View>
      <FlatList
        data={filteredSuggestions}
        renderItem={renderSuggestion}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
});

SearchSuggestions.displayName = 'SearchSuggestions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23262F',
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F4F4F4',
  },
  countText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  listContainer: {
    paddingVertical: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: '#F4F4F4',
    flex: 1,
  },
  suggestionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginRight: 8,
  },
});
