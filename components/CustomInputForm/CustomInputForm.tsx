import React from 'react'
import { View, TextInputProps, Pressable } from 'react-native'
import { StyledCustomInputlabel, StyledCustomTextInput } from './styles/customInputFormStyles'

interface ICustomInputFormProps extends TextInputProps {
	label: string
	onPress?: () => void
}

const CustomInputForm = ({ label, onPress, ...props }: ICustomInputFormProps) => {
	return (
		<View>
			<StyledCustomInputlabel>{label}</StyledCustomInputlabel>
			<Pressable onPress={onPress}>
				<StyledCustomTextInput {...props} />
			</Pressable>
		</View>
	)
}

export default CustomInputForm
