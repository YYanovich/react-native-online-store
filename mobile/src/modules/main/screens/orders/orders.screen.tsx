import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Layout } from '../../../../shared/componetnts/layout';
import { styles } from './orders.screen.styles';
import { useOrdersStore } from '../../../../shared/store/orders.store';
import { OrderCard } from '../../../../shared/componetnts/orderProduct/orderCard.component';
import BottomSheet from '@gorhom/bottom-sheet';
import CheckIcon from '../../../../../assets/images/checkmark-circle.svg';
import { TPaymentStatus, TDeliveryStatus, TSortOrder, SortOrder } from './types';
import { COLORS } from '../../../../shared/styles';
import { PaymentStatus, DeliveryStatus } from '../../../../shared/types/order.types';
import { ListEmpty } from '../../../../shared/componetnts/listEmpty';

const paymentStatusOptions: TPaymentStatus[] = ['All', PaymentStatus.PENDING, PaymentStatus.COMPLETE, PaymentStatus.FAILED];
const deliveryStatusOptions: TDeliveryStatus[] = ['All', DeliveryStatus.PENDING, DeliveryStatus.IN_TRANSIT, DeliveryStatus.DELIVERED];
const sortOptions: TSortOrder[] = ['All', SortOrder.ASC, SortOrder.DESC];

export default function OrdersScreen() {
	const { orders, loading, fetchOrders, filters, setPaymentStatus, setDeliveryStatus, setSortBy } =
		useOrdersStore();
	const [activeFilter, setActiveFilter] = useState<'payment' | 'delivery' | 'date' | null>(null);
	const [refreshing, setRefreshing] = useState(false);

	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => {
		if (!activeFilter) return ['35%'];
		switch (activeFilter) {
			case 'date':
				return [200]; 
			case 'payment':
			case 'delivery':
			default:
				return ['33%'];
		}
	}, [activeFilter]);
	

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	const openFilter = (filter: 'payment' | 'delivery' | 'date') => {
		setActiveFilter(filter);
		// Delay expand to allow snapPoints recalculation after state update
		setTimeout(() => bottomSheetRef.current?.expand(), 0);
	};

	const renderFilterOptions = () => {
		let options: string[] = [];
		let currentFilterValue: string = '';
		let onSelect = (value: string) => {};

		switch (activeFilter) {
			case 'payment':
				options = paymentStatusOptions;
				currentFilterValue = filters.paymentStatus;
				onSelect = (value) => setPaymentStatus(value as TPaymentStatus);
				break;
			case 'delivery':
				options = deliveryStatusOptions;
				currentFilterValue = filters.deliveryStatus;
				onSelect = (value) => setDeliveryStatus(value as TDeliveryStatus);
				break;
			case 'date':
				options = sortOptions;
				currentFilterValue = filters.sortBy;
				onSelect = (value) => setSortBy(value as TSortOrder);
				break;
			default:
				return null;
		}

		return (
			<View style={styles.filterContainer}>
				<Text style={styles.filterHeader}>Filter by</Text>
				{options.map((option) => {
					const selected = currentFilterValue === option;
					return (
						<TouchableOpacity
							key={option}
							style={styles.filterOption}
							onPress={() => {
								onSelect(option);
								bottomSheetRef.current?.close();
							}}
						>
							<Text style={[styles.filterText, selected && { color: COLORS.success }]}>
								{option}
							</Text>
							{selected && (
								<CheckIcon width={20} height={20} color={COLORS.success} />
							)}
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const handleRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchOrders();
		setRefreshing(false);
	}, [fetchOrders]);

	const OrdersEmpty = React.useMemo(
		() => () => (loading ? null : <ListEmpty message="No orders found" />),
		[loading],
	);

	const renderFooter = () => {
		if (!loading || orders.length === 0) return <View />;
		return (
			<View style={styles.emptyContainer}>
				<ActivityIndicator size="small" color={COLORS.primary} />
			</View>
		);
	};

	return (
		<Layout withScroll={false}>
			<View style={styles.header}>
				<Text style={styles.title}>Orders</Text>
			</View>
			<Text style={styles.filterTitle}>Filter by</Text>
			<View style={styles.filterBar}>
				<TouchableOpacity onPress={() => openFilter('payment')}>
					<Text style={styles.filterLabel}>Payment: <Text style={styles.filterValue}>{filters.paymentStatus}</Text></Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => openFilter('delivery')}>
					<Text style={styles.filterLabel}>Delivery: <Text style={styles.filterValue}>{filters.deliveryStatus}</Text></Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => openFilter('date')}>
					<Text style={styles.filterLabel}>Date: <Text style={styles.filterValue}>{filters.sortBy === 'asc' ? 'Asc' : 'Desc'}</Text></Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={orders}
				keyExtractor={(item) => item.orderId}
				renderItem={({ item }) => <OrderCard order={item} />}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={OrdersEmpty}
				ListFooterComponent={renderFooter}
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
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				backgroundStyle={styles.bottomSheet}
				handleIndicatorStyle={styles.handleIndicator}
				enablePanDownToClose={true}
			>
				{renderFilterOptions()}
			</BottomSheet>
		</Layout>
	);
}
