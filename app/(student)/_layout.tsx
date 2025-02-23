import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const StudentTabsLayout = () => {
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
				name='report'
				options={{
					tabBarLabel: 'Reports',
					tabBarIcon: () => <AntDesign name='linechart' size={24} color='blue' />,
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

const StudentLayout = () => {
	return <StudentTabsLayout />
}

export default StudentLayout
