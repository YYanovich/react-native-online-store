import React, { useState, useCallback, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	FlatList,
	RefreshControl,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsStackParamList } from '../../../navigation/types/screen-params.type';
import { styles } from './products.screen.styles';
import { COLORS } from '../../../../shared/styles';
import { Product } from '../../../../shared/types/product.types';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductCard } from '../../../../shared/componetnts/productCard/productCard.component';
import { EmptyState } from '../../../../shared/componetnts/emptyState';
import { useDebounceEffect } from '../../../../shared/hooks';
import { useCartStore, CartState } from '../../../../shared/store/cart.store';
import CartIcon from '../../../../../assets/images/Cart.svg';
import Bin from '../../../../../assets/images/Bin.svg';

type NavigationProp = StackNavigationProp<
	ProductsStackParamList,
	'ProductsList'
>;

type SortOrder = 'asc' | 'desc' | null;

const ITEMS_PER_PAGE = 10;

export const ProductsScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const [products, setProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOrder, setSortOrder] = useState<SortOrder>(null);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const hasScrolledRef = useRef(false);
	const itemCount = useCartStore((state: CartState) => state.getItemCount());
	const loadCart = useCartStore((state: CartState) => state.loadCart);

	React.useEffect(() => {
		loadCart().catch((error) => {
			console.error('Failed to load cart data:', error);
		});
	}, [loadCart]);

	const handleCartPress = () => {
		navigation.navigate('CartScreen');
	};

	const handleProductPress = (id: string) => {
		navigation.navigate('ProductDetails', { productId: id });
	};

	const loadProducts = useCallback(
		async (page: number = 1) => {
			try {
				if (page === 1) {
					hasScrolledRef.current = false;
				}
				const isLoadMore = page > 1;
				if (isLoadMore) {
					setIsLoadingMore(true);
				} else {
					setLoading(true);
				}

				const skip = (page - 1) * ITEMS_PER_PAGE;

				const res = await ProductService.getProducts({
					name: searchQuery || undefined,
					sortBy: sortOrder || undefined,
					skip,
					take: ITEMS_PER_PAGE,
				});

				const data: Product[] = res.data ?? [];

				setProducts((prev) => (page === 1 ? data : [...prev, ...data]));

				if (res.total_pages !== undefined) {
					setHasMore(page < res.total_pages);
				} else if (res.total_results !== undefined) {
					const loaded = (page - 1) * ITEMS_PER_PAGE + data.length;
					setHasMore(loaded < res.total_results);
				} else {
					setHasMore(data.length === ITEMS_PER_PAGE);
				}
			} catch (error) {
			} finally {
				setLoading(false);
				setIsLoadingMore(false);
				setRefreshing(false);
			}
		},
		[searchQuery, sortOrder],
	);

	//debounced search effect
	useDebounceEffect(
		() => {
			setCurrentPage(1);
			loadProducts(1);
		},
		[searchQuery, sortOrder],
		500,
	);

	//pull to refresh
	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		setCurrentPage(1);
		loadProducts(1);
	}, [loadProducts]);

	const handleSortAsc = () => setSortOrder('asc');
	const handleSortDesc = () => setSortOrder('desc');
	const handleClearSort = () => setSortOrder(null);

	const handleEndReached = useCallback(() => {
		if (loading || isLoadingMore || !hasMore || !hasScrolledRef.current) {
			return;
		}

		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		loadProducts(nextPage);
	}, [currentPage, hasMore, isLoadingMore, loadProducts, loading]);

	//render product cards
	const renderItem = useCallback(
		({ item }: { item: Product }) => (
			<ProductCard product={item} onPress={handleProductPress} />
		),
		[],
	);

	//empty state
	const renderEmpty = () => {
		if (loading) return null;

		const message = searchQuery
			? 'No products found matching your search'
			: 'No products available';

		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<EmptyState message={message} />
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerLeft} />
				<Text style={styles.title}>Products</Text>
				<TouchableOpacity
					style={styles.cartIconContainer}
					onPress={handleCartPress}
					activeOpacity={0.7}
				>
			<CartIcon style={styles.cartIcon} />
					{itemCount > 0 && (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{itemCount}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>

			{/* search input */}
			<View style={styles.searchSection}>
				<TextInput
					style={styles.searchInput}
					placeholder="Enter product name"
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholderTextColor={COLORS.textSecondary}
				/>
			</View>

			{/* sort buttons */}
			<View style={styles.sortButtons}>
				<TouchableOpacity
					style={[
						styles.sortButton,
						sortOrder === 'desc' && styles.sortButtonActive,
					]}
					onPress={handleSortDesc}
					activeOpacity={0.7}
				>
					<Text style={styles.sortIcon}>↓</Text>
					<Text style={styles.sortText}>High to Low</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.sortButton,
						sortOrder === 'asc' && styles.sortButtonActive,
					]}
					onPress={handleSortAsc}
					activeOpacity={0.7}
				>
					<Text style={styles.sortIcon}>↑</Text>
					<Text style={styles.sortText}>Low to High</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.sortButton, styles.clearButton]}
					onPress={handleClearSort}
					activeOpacity={0.7}
				>
					<Text style={styles.sortIcon}>✕</Text>
					<Text style={styles.sortText}>Clear</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={products}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={renderEmpty}
				ListFooterComponent={
					isLoadingMore ? (
						<View style={styles.paginationContainer}>
							<ActivityIndicator
								size="small"
								color={COLORS.primary}
							/>
						</View>
					) : (
						<View />
					)
				}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.5}
				onMomentumScrollBegin={() => {
					hasScrolledRef.current = true;
				}}
				onScrollBeginDrag={() => {
					hasScrolledRef.current = true;
				}}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						colors={[COLORS.primary]}
						tintColor={COLORS.primary}
					/>
				}
				contentContainerStyle={styles.listContent}
			/>

			{loading && products.length === 0 && (
				<View style={styles.loadingOverlay}>
					<ActivityIndicator size="large" color={COLORS.primary} />
				</View>
			)}
		</View>
	);
};
