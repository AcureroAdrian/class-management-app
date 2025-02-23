import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const AdminTabsLayout = () => {
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
				name='attendance'
				options={{
					tabBarLabel: 'Attendance',
					tabBarIcon: () => <AntDesign name='calendar' size={24} color='blue' />,
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
const TeacherTabsLayout = () => {
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
				name='attendance'
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

const AdminLayout = () => {
	return <AdminTabsLayout />
}

export default AdminLayout
