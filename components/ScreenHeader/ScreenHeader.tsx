import React from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { IScreenHeaderProps } from './helpers/screen-header-interfaces'
import { ButtonContainer, HeaderContainer, HeaderTitle, ButtonText } from './screen-header-styles'

const ScreenHeader = ({
	label = '',
	labelButton = '',
	handleOnPress = () => {},
	disabledButton = false,
	iconName,
	showBackButton = false,
	handleBack = () => {},
}: IScreenHeaderProps) => {
	const insets = useSafeAreaInsets()

	return (
		<HeaderContainer statusbarHeigth={insets.top}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
				{showBackButton && (
					<Pressable onPress={handleBack}>
						<AntDesign name='arrowleft' size={24} color='white' />
					</Pressable>
				)}
				<HeaderTitle>{label?.length > 17 ? label.substring(0, 17) + '...' : label}</HeaderTitle>
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

export default ScreenHeader
