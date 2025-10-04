import React, { ComponentProps } from 'react'
import { View, TextInputProps, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyledCustomInputlabel, StyledCustomTextInput } from '@/theme/styles'
import colors from '@/theme/colors'

interface ICustomInputFormProps extends TextInputProps {
	label?: string
	onPress?: () => void
	icon?: ComponentProps<typeof MaterialCommunityIcons>['name']
}

const CustomInputForm = ({ label, onPress, icon, ...props }: ICustomInputFormProps) => {
	return (
		<View style={{ width: '100%', position: 'relative' }}>
			{Boolean(label?.length) && <StyledCustomInputlabel>{label}</StyledCustomInputlabel>}
			<Pressable onPress={onPress}>
				<StyledCustomTextInput placeholderTextColor={colors.variants.secondary[2]} {...props} onPress={onPress} />
			</Pressable>
			{icon && (
				<View
					style={{
						position: 'absolute',
						width: 55,
						top: 0,
						right: 0,
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<MaterialCommunityIcons
						style={{ marginTop: 15 }}
						name={icon}
						size={30}
						color={colors.variants.secondary[5]}
					/>
				</View>
			)}
		</View>
	)
}

export default CustomInputForm
