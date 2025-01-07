import React from 'react'
import { View, Text, Button } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { USER_LOGOUT } from '@/redux/constants/userConstants'
import HeaderScreen from '@/components/HeaderScreen/HeaderScreen'
import capitalizeWords from '@/shared/capitalize-words'

const SettingsScreen = () => {
	const dispatch = useAppDispatch()

	const { userInfo } = useAppSelector((state) => state.userLogin)

	const handleOnLogout = () => {
		dispatch({ type: USER_LOGOUT })
	}

	return (
		<View>
			<HeaderScreen label='Settings' />
			<View style={{ gap: 10, marginTop: 20, marginBottom: 20, padding: 20 }}>
				<Text>Name: {capitalizeWords(userInfo?.name || '')}</Text>
				<Text>Last Name: {capitalizeWords(userInfo?.lastName || '')}</Text>
				<Button title='Logout' onPress={handleOnLogout} />
			</View>
		</View>
	)
}

export default SettingsScreen
