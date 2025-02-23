import React from 'react'
import { View, Text, Button } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { USER_LOGOUT } from '@/redux/constants/userConstants'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import { TUserRole } from '@/shared/common-types'
import { SafeAreaViewStyled } from '@/theme/styles'

const SettingsScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()

	const { userInfo } = useAppSelector((state) => state.userLogin)

	const handleOnLogout = () => {
		dispatch({ type: USER_LOGOUT })
	}

	return (
		<SafeAreaViewStyled>
			<View style={{ flex: 1 }}>
				<ScreenHeader label='Settings' />
				<View style={{ gap: 10, marginTop: 20, marginBottom: 20, padding: 20 }}>
					<Text>Name: {capitalizeWords(userInfo?.name || '')}</Text>
					<Text>Last Name: {capitalizeWords(userInfo?.lastName || '')}</Text>
					<Button title='Logout' onPress={handleOnLogout} />
				</View>
			</View>
		</SafeAreaViewStyled>
	)
}

export default SettingsScreen
