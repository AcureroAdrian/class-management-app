import React, { useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { Stack, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootState, store } from '@/redux/store'

axios.defaults.baseURL = 'http://192.168.100.38:8000'

const StackLayout = () => {
	const router = useRouter()

	const { userInfo } = useSelector((state: RootState) => state?.userLogin)

	useEffect(() => {
		const newPath = userInfo ? '/(protected)' : '/(home)'
		router.replace(newPath)
	}, [userInfo])

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='(home)' />
			<Stack.Screen name='(protected)' />
		</Stack>
	)
}

const RootLayout = () => {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar style='auto' />
				<StackLayout />
			</SafeAreaProvider>
		</Provider>
	)
}

export default RootLayout
