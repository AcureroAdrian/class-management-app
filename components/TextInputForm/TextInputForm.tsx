import React from 'react'
import { Pressable, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ITextInputFormProps } from './helpers/text-input-form-interface'
import { LeftIconContainer, RightIconContainer, TextInputFormInput, TextInputFormLabel } from './text-input-form-styles'
import colors from '@/theme/colors'

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
				<MaterialCommunityIcons name={icon} size={30} color={colors.brand} />
			</LeftIconContainer>
			<TextInputFormLabel>{label}</TextInputFormLabel>
			{isDate ? (
				<Pressable onPress={showDatePicker}>
					<TextInputFormInput {...props} onPressIn={showDatePicker} />
				</Pressable>
			) : (
				<TextInputFormInput {...props} />
			)}
			{isPassword && (
				<RightIconContainer onPress={() => setHidePassword && setHidePassword(!hidePassword)}>
					<MaterialCommunityIcons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={colors.darkLight} />
				</RightIconContainer>
			)}
		</View>
	)
}

export default TextInputForm
