import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: 'Classes',
					tabBarIcon: () => <AntDesign name='filetext1' size={24} color='blue' />,
				}}
			/>
			<Tabs.Screen
				name='students'
				options={{
					tabBarLabel: 'Students',
					tabBarIcon: () => <AntDesign name='user' size={24} color='blue' />,
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: () => <AntDesign name='setting' size={24} color='blue' />,
				}}
			/>
		</Tabs>
	)
}

const ProtectedLayout = () => {
	return <TabsLayout />
}

export default ProtectedLayout
