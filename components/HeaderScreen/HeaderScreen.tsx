import React from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { ButtonContainer, HeaderContainer, HeaderTitle, ButtonText } from './styles/headerScreenStyles'

const HeaderScreen = ({
	label = '',
	labelButton = '',
	handleOnPress = () => {},
	disabledButton = false,
	iconName,
	showBackButton = false,
	handleBack = () => {},
}) => {
	const insets = useSafeAreaInsets()

	return (
		<HeaderContainer statusbarHeigth={insets.top}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
				{showBackButton && (
					<Pressable onPress={handleBack}>
						<AntDesign name='arrowleft' size={24} color='white' />
					</Pressable>
				)}
				<HeaderTitle>{label}</HeaderTitle>
			</View>
			<Pressable onPress={handleOnPress} disabled={disabledButton}>
				<ButtonContainer>
					<ButtonText>{labelButton}</ButtonText>
					{Boolean(iconName) && (
						<AntDesign name={iconName} size={24} color='white' style={{ opacity: disabledButton ? 0.5 : 1 }} />
					)}
				</ButtonContainer>
			</Pressable>
		</HeaderContainer>
	)
}

export default HeaderScreen
