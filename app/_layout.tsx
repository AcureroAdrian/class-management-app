import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'

const StackLayout = () => {
	const { authState } = useAuth()
	const router = useRouter()

	useEffect(() => {
		const newPath = authState?.authenticated ? '/(protected)' : '/(home)'
		router.replace(newPath)
	}, [authState])

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='(home)' />
			<Stack.Screen name='(protected)' />
		</Stack>
	)
}

const RootLayout = () => {
	return (
		<AuthProvider>
			<StackLayout />
		</AuthProvider>
	)
}

export default RootLayout
