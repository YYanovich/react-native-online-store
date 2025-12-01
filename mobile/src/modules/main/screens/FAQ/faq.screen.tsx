import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated';
import { styles } from './faq.screen.styles';

interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

const FAQ_DATA: FAQItem[] = [
	{
		id: '1',
		question: 'Is it safe to buy from us?',
		answer:
			'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
	},
	{
		id: '2',
		question: 'Is it safe to buy from us?',
		answer:
			'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
	},
	{
		id: '3',
		question: 'Is it safe to buy from us?',
		answer:
			'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
	},
	{
		id: '4',
		question: 'Is it safe to buy from us?',
		answer:
			'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
	},
	{
		id: '5',
		question: 'Is it safe to buy from us?',
		answer:
			'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.',
	},
];

interface AccordionItemProps {
	item: FAQItem;
	isExpanded: boolean;
	onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isExpanded, onToggle }) => {
	const animation = useSharedValue(isExpanded ? 1 : 0);

	React.useEffect(() => {
		animation.value = withTiming(isExpanded ? 1 : 0, { duration: 300 });
	}, [isExpanded, animation]);

	const contentStyle = useAnimatedStyle(() => {
		const height = interpolate(
			animation.value,
			[0, 1],
			[0, 200],
			Extrapolation.CLAMP
		);
		const opacity = interpolate(
			animation.value,
			[0, 0.5, 1],
			[0, 0, 1],
			Extrapolation.CLAMP
		);
		return {
			height,
			opacity,
		};
	});

	const iconStyle = useAnimatedStyle(() => {
		const rotate = interpolate(
			animation.value,
			[0, 1],
			[0, 90],
			Extrapolation.CLAMP
		);
		return {
			transform: [{ rotate: `${rotate}deg` }],
		};
	});

	return (
		<View style={styles.accordionItem}>
			<TouchableOpacity style={styles.accordionHeader} onPress={onToggle} activeOpacity={0.7}>
				<Text style={styles.accordionQuestion}>{item.question}</Text>
				<Animated.Text style={[styles.accordionIcon, iconStyle]}>
					{isExpanded ? '›' : '›'}
				</Animated.Text>
			</TouchableOpacity>
			<Animated.View style={[styles.accordionContent, contentStyle]}>
				<Text style={styles.accordionAnswer}>{item.answer}</Text>
			</Animated.View>
		</View>
	);
};

export default function FAQScreen() {
	const navigation = useNavigation();
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const toggleItem = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<Text style={styles.backIcon}>‹</Text>
				</TouchableOpacity>
				<Text style={styles.title}>FAQ</Text>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{FAQ_DATA.map((item) => (
					<AccordionItem
						key={item.id}
						item={item}
						isExpanded={expandedId === item.id}
						onToggle={() => toggleItem(item.id)}
					/>
				))}
			</ScrollView>
		</View>
	);
}
