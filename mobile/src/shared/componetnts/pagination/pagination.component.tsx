import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './pagination.component.styles';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) return null;

	const renderPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let endPage = Math.min(totalPages, startPage + maxVisible - 1);

		if (endPage - startPage < maxVisible - 1) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}

		if (startPage > 1) {
			pages.push(
				<TouchableOpacity
					key="first"
					style={styles.pageButton}
					onPress={() => onPageChange(1)}
				>
					<Text style={styles.pageText}>1</Text>
				</TouchableOpacity>,
			);
			if (startPage > 2) {
				pages.push(
					<Text key="dots1" style={styles.dots}>
						...
					</Text>,
				);
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<TouchableOpacity
					key={i}
					style={[
						styles.pageButton,
						i === currentPage && styles.activeButton,
					]}
					onPress={() => onPageChange(i)}
				>
					<Text
						style={[
							styles.pageText,
							i === currentPage && styles.activeText,
						]}
					>
						{i}
					</Text>
				</TouchableOpacity>,
			);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push(
					<Text key="dots2" style={styles.dots}>
						...
					</Text>,
				);
			}
			pages.push(
				<TouchableOpacity
					key="last"
					style={styles.pageButton}
					onPress={() => onPageChange(totalPages)}
				>
					<Text style={styles.pageText}>{totalPages}</Text>
				</TouchableOpacity>,
			);
		}

		return pages;
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.navButton, currentPage === 1 && styles.disabled]}
				onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<Text style={styles.navText}>←</Text>
			</TouchableOpacity>

			{renderPageNumbers()}

			<TouchableOpacity
				style={[
					styles.navButton,
					currentPage === totalPages && styles.disabled,
				]}
				onPress={() =>
					currentPage < totalPages && onPageChange(currentPage + 1)
				}
				disabled={currentPage === totalPages}
			>
				<Text style={styles.navText}>→</Text>
			</TouchableOpacity>
		</View>
	);
};
