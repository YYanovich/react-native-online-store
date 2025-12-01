import * as React from 'react';
import {
	StyleProp,
	Text,
	TextInput,
	TextInputProps,
	TextStyle,
	View,
	ViewStyle,
	TouchableOpacity,
	Image,
} from 'react-native';
import {
	Control,
	FieldPath,
	FieldPathValue,
	FieldValues,
	RegisterOptions,
	useController,
} from 'react-hook-form';

import { styles } from './input.styles';
import { InputError } from '../../input-error';

import EyeOpen from '../../../../assets/images/eye-open.svg';
import EyeClosed from '../../../../assets/images/eye-closed.svg';

type InputProps<
	T extends FieldValues = FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
> = {
	name: N;
	control: Control<T>;
	defaultValue: FieldPathValue<T, N>;
	rules?:
		| Omit<
				RegisterOptions<T, N>,
				'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
		  >
		| undefined;
	label?: string;
	placeholder?: string;
	isPassword?: boolean;
	extraInputContainerStyles?: StyleProp<ViewStyle>;
	extraErrorStyles?: StyleProp<TextStyle>;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur' | 'onFocus'>;

export function Input<
	T extends FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
>({
	control,
	name,
	rules,
	defaultValue,
	label,
	placeholder,
	isPassword = false,
	extraInputContainerStyles,
	extraErrorStyles = {},
	...restProps
}: InputProps<T, N>) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const inputRef = React.createRef<TextInput>();

	const {
		field: { value, onBlur, onChange },
		fieldState: { error },
	} = useController({
		control,
		defaultValue,
		name,
		rules,
	});

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		onBlur();
		setIsFocused(false);
	};

	return (
		<View style={[styles.container, extraInputContainerStyles]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View
				style={[
					styles.inputContainer,
					isFocused && styles.inputContainerFocused,
					error && styles.inputContainerError,
				]}
			>
				<TextInput
					value={value}
					onChangeText={onChange}
					onBlur={handleBlur}
					onFocus={handleFocus}
					placeholder={placeholder}
					secureTextEntry={isPassword && !isPasswordVisible}
					style={styles.input}
					ref={inputRef}
					{...restProps}
				/>
				{isPassword && (
					<TouchableOpacity
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
						style={styles.eyeButton}
					>
						{isPasswordVisible ? (
							<EyeClosed width={24} height={24} />
						) : (
							<EyeOpen width={24} height={24} />
						)}
					</TouchableOpacity>
				)}
			</View>

			<InputError<T>
				control={control}
				field={name}
				extraErrorStyles={extraErrorStyles}
			/>
		</View>
	);
}
