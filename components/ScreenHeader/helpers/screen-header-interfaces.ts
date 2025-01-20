import { AntDesign } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { ViewProps } from 'react-native'

export interface IScreenHeaderProps {
	label: string
	labelButton?: string
	handleOnPress?: () => void
	disabledButton?: boolean
	iconName?: ComponentProps<typeof AntDesign>['name']
	showBackButton?: boolean
	handleBack?: () => void
}

export interface IHeaderContainer extends ViewProps {
	statusbarHeigth?: number
}
