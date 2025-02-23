import React from 'react'
import { ActivityIndicator, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { IScreenHeaderProps } from './helpers/screen-header-interfaces'
import {
	ButtonContainer,
	HeaderContainer,
	HeaderTitle,
	ButtonText,
	RowContainer,
	BackButton,
	ActionButton,
} from './screen-header-styles'

const ScreenHeader = ({
	label = '',
	labelButton = '',
	handleOnPress = () => {},
	disabledButton = false,
	loadingButtonAction = false,
	iconName,
	showBackButton = false,
	handleBack = () => {},
	additionalIcon,
	handleAdditionalIcon = () => {},
}: IScreenHeaderProps) => {
	const insets = useSafeAreaInsets()

	return (
		<HeaderContainer statusbarHeigth={insets.top}>
			<RowContainer>
				{showBackButton && (
					<BackButton onPress={handleBack}>
						<AntDesign name='arrowleft' size={24} color='white' style={{ marginTop: 'auto', marginBottom: 'auto' }} />
					</BackButton>
				)}
				<HeaderTitle>{label?.length > 17 ? label.substring(0, 17) + '...' : label}</HeaderTitle>
				{additionalIcon && (
					<Pressable onPress={handleAdditionalIcon}>
						<AntDesign
							name={additionalIcon}
							size={24}
							color='white'
							style={{ marginTop: 'auto', marginBottom: 'auto' }}
						/>
					</Pressable>
				)}
			</RowContainer>
			<ActionButton onPress={handleOnPress} disabled={disabledButton}>
				<ButtonContainer>
					<ButtonText>{labelButton}</ButtonText>
					{Boolean(iconName) &&
						(loadingButtonAction ? (
							<ActivityIndicator size={'small'} />
						) : (
							<AntDesign name={iconName} size={24} color='white' style={{ opacity: disabledButton ? 0.5 : 1 }} />
						))}
				</ButtonContainer>
			</ActionButton>
		</HeaderContainer>
	)
}

export default ScreenHeader
