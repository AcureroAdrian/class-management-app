import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const TeacherTabsLayout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name='index'
				options={{
					tabBarLabel: 'Attendance',
					tabBarIcon: () => <AntDesign name='calendar' size={24} color='blue' />,
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

const TeacherLayout = () => {
	return <TeacherTabsLayout />
}

export default TeacherLayout
