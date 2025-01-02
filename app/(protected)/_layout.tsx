import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: () => <AntDesign name='home' size={24} color='black' />,
				}}
			/>
		</Tabs>
	)
}

const ProtectedLayout = () => {
	return <TabsLayout />
}

export default ProtectedLayout
