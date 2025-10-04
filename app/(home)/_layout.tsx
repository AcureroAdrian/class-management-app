import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen name='info' />
		</Stack>
	)
}

const HomeLayout = () => {
	return <StackLayout />
}

export default HomeLayout
