import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Keyboard,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Loader } from './Loader';
import { SearchSuggestions } from './SearchSuggestions';

interface SearchPageProps {
    isVisible: boolean;
    onClose: () => void;
    onSearch?: (query: string) => void;
    recentSearches?: { id: string; term: string }[];
}

export const SearchPage: React.FC<SearchPageProps> = memo(({
    isVisible,
    onClose,
    onSearch,
    recentSearches = [],
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const slideAnim = useRef(new Animated.Value(-1000)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const searchInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (isVisible) {
            // Simulate loading time
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            // Slide in animation
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            return () => clearTimeout(timer);

        } else {
            // Slide out animation
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -1000,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible, slideAnim, fadeAnim]);

    const handleSearch = useCallback((query: string) => {
        if (query.trim()) {
            onSearch?.(query);
            setSearchQuery('');
        }
    }, [onSearch]);

    const handleRecentSearchPress = useCallback((term: string) => {
        setSearchQuery(term);
        handleSearch(term);
    }, [handleSearch]);

    const handleRemoveRecentSearch = useCallback((id: string) => {
        // This would be handled by the parent component through the hook
        console.log('Remove search:', id);
    }, []);

    const handleSuggestionPress = useCallback((suggestion: any) => {
        setSearchQuery(suggestion.term);
        handleSearch(suggestion.term);
    }, [handleSearch]);

    const renderRecentSearchItem = useCallback(({ item }: { item: { id: string; term: string } }) => (
        <Pressable
            style={styles.recentSearchItem}
            onPress={() => handleRecentSearchPress(item.term)}
        >
            <View style={styles.recentSearchLeft}>
                <Ionicons name="time-outline" size={16} color="#FF6B9D" />
                <Text style={styles.recentSearchText}>{item.term}</Text>
            </View>
            <Pressable
                style={styles.arrowButton}
                onPress={() => handleRecentSearchPress(item.term)}
            >
                <Ionicons name="arrow-up" size={16} color="#FF6B9D" />
            </Pressable>
        </Pressable>
    ), [handleRecentSearchPress]);

    if (!isVisible) return null;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                {isLoading ? (
                    <View style={styles.container}>
                        <Loader fullscreen message="Loading Search..." />
                    </View>
                ) : (
                    <Animated.View
                        style={[
                            styles.container,
                            {
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                    <SafeAreaView style={styles.safeArea}>
                        {/* Search Input */}
                        <View style={styles.searchContainer}>
                            <View style={styles.searchInputContainer}>
                                <Ionicons name="search" size={20} color="#FF6B9D" />
                                <TextInput
                                    ref={searchInputRef}
                                    style={styles.searchInput}
                                    placeholder="Search here..."
                                    placeholderTextColor="#A0A0A0"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    onSubmitEditing={() => handleSearch(searchQuery)}
                                    returnKeyType="search"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {searchQuery.length > 0 && (
                                    <Pressable
                                        style={styles.clearButton}
                                        onPress={() => setSearchQuery('')}
                                    >
                                        <Ionicons name="close-circle" size={20} color="#A0A0A0" />
                                    </Pressable>
                                )}
                            </View>
                        </View>

                        {/* Search Suggestions */}
                        <SearchSuggestions
                            query={searchQuery}
                            onSuggestionPress={handleSuggestionPress}
                            visible={searchQuery.length > 0}
                        />

                        {/* Recent Searches */}
                        <View style={[styles.recentSearchesContainer, { display: searchQuery.length > 0 ? 'none' : 'flex' }]}>
                            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
                            <FlatList
                                data={recentSearches}
                                renderItem={renderRecentSearchItem}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.recentSearchesList}
                            />
                        </View>

                        {/* Go Back Button */}
                        <View style={styles.goBackContainer}>
                            <Pressable style={styles.goBackButton} onPress={onClose}>
                                <Text style={styles.goBackText}>GO Back!</Text>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                    </Animated.View>
                )}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
});

SearchPage.displayName = 'SearchPage';

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#181A20',
        zIndex: 2000,
    },
    container: {
        flex: 1,
        backgroundColor: '#181A20',
    },
    safeArea: {
        // borderWidth: 1,
        // borderColor: 'red',
        height: "90%"
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#23262F',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#2A2D35',
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#F4F4F4',
        paddingVertical: 0,
    },
    clearButton: {
        marginLeft: 8,
    },
    recentSearchesContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    recentSearchesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#F4F4F4',
        marginBottom: 16,
    },
    recentSearchesList: {
        paddingBottom: 20,
    },
    recentSearchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    recentSearchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    recentSearchText: {
        fontSize: 14,
        color: '#A0A0A0',
        marginLeft: 12,
        flex: 1,
    },
    arrowButton: {
        padding: 4,
    },
    goBackContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    
        alignItems: 'center',
    },
    goBackButton: {
        backgroundColor: '#23262F',
        borderWidth: 1,
        borderColor: '#FF6B9D',
        borderRadius: 8,
       
        width:"100%",
        paddingHorizontal: 32,
        paddingVertical: 12,
    },
    goBackText: {
        fontSize: 12,
        textAlign:"center",
        fontWeight: '600',
        color: '#A0A0A0',
    },
});
