import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ITabLayoutProps } from './helpers/tab-layout-interfaces'
import colors from '@/theme/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TabLayout = ({ tabs }: ITabLayoutProps) => {
	const sizeIcon = 24
	const insets = useSafeAreaInsets()
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveBackgroundColor: colors.variants.primary[0],
				tabBarActiveTintColor: colors.variants.primary[5],
				tabBarInactiveTintColor: colors.variants.grey[3],
				tabBarStyle: { height: 50 + insets.bottom, paddingBottom: insets.bottom },
				tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
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
