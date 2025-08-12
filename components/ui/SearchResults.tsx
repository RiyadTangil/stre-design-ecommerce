import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { ProductCard } from './ProductCard';

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

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  loading: boolean;
  onProductPress: (product: SearchResult) => void;
  onBackToSearch: () => void;
}

type SortOption = 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest';
type FilterOption = 'all' | 'electronics' | 'fashion' | 'home' | 'sports';

export const SearchResults: React.FC<SearchResultsProps> = memo(({
  query,
  results,
  loading,
  onProductPress,
  onBackToSearch,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: 'relevance', label: 'Relevance', icon: 'star' },
    { value: 'price_low', label: 'Price: Low to High', icon: 'arrow-up' },
    { value: 'price_high', label: 'Price: High to Low', icon: 'arrow-down' },
    { value: 'rating', label: 'Highest Rated', icon: 'star' },
    { value: 'newest', label: 'Newest First', icon: 'time' },
  ];

  const filterOptions: { value: FilterOption; label: string; icon: string }[] = [
    { value: 'all', label: 'All Categories', icon: 'grid' },
    { value: 'electronics', label: 'Electronics', icon: 'hardware-chip' },
    { value: 'fashion', label: 'Fashion', icon: 'shirt' },
    { value: 'home', label: 'Home & Garden', icon: 'home' },
    { value: 'sports', label: 'Sports', icon: 'football' },
  ];

  const sortedAndFilteredResults = useCallback(() => {
    let filtered = results;

    // Apply category filter
    if (filterBy !== 'all') {
      // In a real app, you'd filter by actual category data
      filtered = results.filter(item => 
        item.title.toLowerCase().includes(filterBy)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        return filtered.sort((a, b) => 
          parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
        );
      case 'price_high':
        return filtered.sort((a, b) => 
          parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
        );
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return filtered.sort((a, b) => b.id.localeCompare(a.id));
      default:
        return filtered;
    }
  }, [results, sortBy, filterBy]);

  const renderProduct = useCallback(({ item }: { item: SearchResult }) => (
    <ProductCard
      image={item.image}
      title={item.title}
      price={item.price}
      originalPrice={item.originalPrice}
      onPress={() => onProductPress(item)}
    />
  ), [onProductPress]);

  const renderSortOption = useCallback(({ item }: { item: typeof sortOptions[0] }) => (
    <Pressable
      style={[
        styles.sortOption,
        sortBy === item.value && styles.sortOptionActive
      ]}
      onPress={() => setSortBy(item.value)}
    >
      <Ionicons 
        name={item.icon as any} 
        size={16} 
        color={sortBy === item.value ? '#FF6B9D' : '#A0A0A0'} 
      />
      <Text style={[
        styles.sortOptionText,
        sortBy === item.value && styles.sortOptionTextActive
      ]}>
        {item.label}
      </Text>
    </Pressable>
  ), [sortBy]);

  const renderFilterOption = useCallback(({ item }: { item: typeof filterOptions[0] }) => (
    <Pressable
      style={[
        styles.filterOption,
        filterBy === item.value && styles.filterOptionActive
      ]}
      onPress={() => setFilterBy(item.value)}
    >
      <Ionicons 
        name={item.icon as any} 
        size={16} 
        color={filterBy === item.value ? '#FF6B9D' : '#A0A0A0'} 
      />
      <Text style={[
        styles.filterOptionText,
        filterBy === item.value && styles.filterOptionTextActive
      ]}>
        {item.label}
      </Text>
    </Pressable>
  ), [filterBy]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B9D" />
        <Text style={styles.loadingText}>Searching for "{query}"...</Text>
      </View>
    );
  }

  const finalResults = sortedAndFilteredResults();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBackToSearch}>
          <Ionicons name="arrow-back" size={24} color="#F4F4F4" />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.searchQuery}>"{query}"</Text>
          <Text style={styles.resultCount}>
            {finalResults.length} {finalResults.length === 1 ? 'result' : 'results'}
          </Text>
        </View>
        <Pressable 
          style={styles.filterButton} 
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="filter" size={24} color="#F4F4F4" />
        </Pressable>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Sort by</Text>
            <FlatList
              data={sortOptions}
              renderItem={renderSortOption}
              keyExtractor={(item) => item.value}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sortOptionsList}
            />
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Filter by</Text>
            <FlatList
              data={filterOptions}
              renderItem={renderFilterOption}
              keyExtractor={(item) => item.value}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterOptionsList}
            />
          </View>
        </View>
      )}

      {/* Results */}
      {finalResults.length > 0 ? (
        <FlatList
          data={finalResults}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
          columnWrapperStyle={styles.resultsRow}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search" size={64} color="#A0A0A0" />
          <Text style={styles.noResultsTitle}>No results found</Text>
          <Text style={styles.noResultsText}>
            Try adjusting your search terms or filters
          </Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181A20',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#A0A0A0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#23262F',
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  searchQuery: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F4F4F4',
  },
  resultCount: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  filterButton: {
    marginLeft: 12,
  },
  filtersContainer: {
    backgroundColor: '#23262F',
    paddingVertical: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F4F4F4',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sortOptionsList: {
    paddingHorizontal: 16,
  },
  filterOptionsList: {
    paddingHorizontal: 16,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  sortOptionActive: {
    backgroundColor: '#FF6B9D20',
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  sortOptionText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginLeft: 6,
  },
  sortOptionTextActive: {
    color: '#FF6B9D',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterOptionActive: {
    backgroundColor: '#FF6B9D20',
    borderWidth: 1,
    borderColor: '#FF6B9D',
  },
  filterOptionText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginLeft: 6,
  },
  filterOptionTextActive: {
    color: '#FF6B9D',
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  resultsRow: {
    justifyContent: 'space-between',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F4F4F4',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
  },
});
