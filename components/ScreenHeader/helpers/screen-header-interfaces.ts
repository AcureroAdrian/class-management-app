import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { ViewProps } from 'react-native'

export interface IScreenHeaderProps {
	label: string
	labelButton?: string
	handleOnPress?: () => void
	disabledButton?: boolean
	loadingButtonAction?: boolean
	iconName?: ComponentProps<typeof MaterialCommunityIcons>['name']
	showBackButton?: boolean
	handleBack?: () => void
	additionalIcon?: ComponentProps<typeof MaterialCommunityIcons>['name']
	handleAdditionalIcon?: () => void
}

export interface IHeaderContainer extends ViewProps {
	statusbarHeigth?: number
}
