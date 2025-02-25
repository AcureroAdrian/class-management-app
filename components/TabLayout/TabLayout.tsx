import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ITabLayoutProps } from './helpers/tab-layout-interfaces'
import colors from '@/theme/colors'

const TabLayout = ({ tabs }: ITabLayoutProps) => {
	const sizeIcon = 28
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveBackgroundColor: colors.variants.primary[0],
				tabBarActiveTintColor: colors.variants.primary[5],
				tabBarInactiveTintColor: colors.variants.grey[3],
				tabBarStyle: { height: 60, backgroundColor: colors.view.primary },
			}}
		>
			{tabs.map((tab) => (
				<Tabs.Screen
					key={tab.id}
					name={tab.name}
					options={{
						tabBarLabel: tab.label,
						tabBarIcon: ({ color }) => <MaterialCommunityIcons name={tab.icon} size={sizeIcon} color={color} />,
					}}
				/>
			))}
		</Tabs>
	)
}

export default TabLayout
