import React from 'react'
import { ActivityIndicator, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IScreenHeaderProps } from './helpers/screen-header-interfaces'
import {
	HeaderContainer,
	HeaderTitle,
	ButtonText,
	RowContainer,
	BackButton,
	ActionButton,
	BackButtonContainer,
	AdditionalButton,
	TitleContainer,
} from './screen-header-styles'
import colors from '@/theme/colors'

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
			{showBackButton && (
				<BackButtonContainer>
					<BackButton onPress={handleBack}>
						<MaterialCommunityIcons name='arrow-left' size={30} color={colors.view.primary} />
					</BackButton>
				</BackButtonContainer>
			)}
			<RowContainer>
				<TitleContainer>
					<HeaderTitle>{label?.length > 17 ? label.substring(0, 17) + '...' : label}</HeaderTitle>
					{additionalIcon && (
						<Pressable onPress={handleAdditionalIcon}>
							<AdditionalButton>
								<MaterialCommunityIcons name={additionalIcon} size={30} color={colors.view.primary} />
							</AdditionalButton>
						</Pressable>
					)}
				</TitleContainer>
				<Pressable onPress={handleOnPress} disabled={disabledButton}>
					{labelButton && (
						<ActionButton>
							<ButtonText>{labelButton}</ButtonText>
							{Boolean(iconName) &&
								(loadingButtonAction ? (
									<ActivityIndicator size={'small'} />
								) : (
									<MaterialCommunityIcons
										name={iconName}
										size={20}
										color={colors.variants.primary[5]}
										style={{ opacity: disabledButton ? 0.5 : 1 }}
									/>
								))}
						</ActionButton>
					)}
				</Pressable>
			</RowContainer>
		</HeaderContainer>
	)
}

export default ScreenHeader
