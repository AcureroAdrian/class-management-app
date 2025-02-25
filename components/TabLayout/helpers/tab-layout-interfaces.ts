import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ComponentProps } from 'react'

export interface ITabItem {
	id: string
	name: string
	icon: ComponentProps<typeof MaterialCommunityIcons>['name']
	label: string
}

export interface ITabLayoutProps {
	tabs: ITabItem[]
}
