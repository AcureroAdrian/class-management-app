import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { LeftIcon, RightIcon, StyledInputLabel, StyledTextInput, Colors } from '../styles'
import { ITextInputFormProps } from './helpers/text-input-form-interface'

const { darkLight, brand } = Colors

const TextInputForm = ({
	label,
	icon,
	isPassword,
	hidePassword,
	setHidePassword,
	isDate,
	showDatePicker,
	...props
}: ITextInputFormProps) => {
	return (
		<View>
			<LeftIcon>
				<Octicons name={icon} size={30} color={brand} />
			</LeftIcon>
			<StyledInputLabel>{label}</StyledInputLabel>
			{!isDate && <StyledTextInput {...props} />}
			{isDate && (
				<TouchableOpacity onPress={showDatePicker}>
					<StyledTextInput {...props} />
				</TouchableOpacity>
			)}
			{isPassword && (
				<RightIcon onPress={() => setHidePassword && setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
				</RightIcon>
			)}
		</View>
	)
}

export default TextInputForm
