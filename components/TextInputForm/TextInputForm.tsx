import React from 'react'
import { Pressable, View } from 'react-native'
import { Octicons, Ionicons } from '@expo/vector-icons'
import { ITextInputFormProps } from './helpers/text-input-form-interface'
import colors from '@/theme/colors'
import { LeftIconContainer, RightIconContainer, TextInputFormInput, TextInputFormLabel } from './text-input-form-styles'

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
			<LeftIconContainer>
				<Octicons name={icon} size={30} color={colors.brand} />
			</LeftIconContainer>
			<TextInputFormLabel>{label}</TextInputFormLabel>
			{isDate ? (
				<Pressable onPress={showDatePicker} >
					<TextInputFormInput {...props} onPressIn={showDatePicker}/>
				</Pressable>
			) : (
				<TextInputFormInput {...props} />
			)}
			{isPassword && (
				<RightIconContainer onPress={() => setHidePassword && setHidePassword(!hidePassword)}>
					<Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={colors.darkLight} />
				</RightIconContainer>
			)}
		</View>
	)
}

export default TextInputForm
