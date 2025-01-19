import React, { useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'expo-status-bar'
import { Stack, useRouter } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { persistor, RootState, store } from '@/redux/store'

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
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaProvider>
					<StatusBar style='auto' />
					<StackLayout />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	)
}

export default RootLayout
