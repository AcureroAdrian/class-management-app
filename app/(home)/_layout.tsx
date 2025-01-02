import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'

const TabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: 'Login',
					tabBarIcon: () => <AntDesign name='login' size={24} color='black' />,
				}}
			/>
			<Tabs.Screen
				name='signup'
				options={{
					tabBarLabel: 'Signup',
					tabBarIcon: () => <AntDesign name='form' size={24} color='black' />,
				}}
			/>
		</Tabs>
	)
}

const HomeLayout = () => {
	return <TabsLayout />
}

export default HomeLayout
