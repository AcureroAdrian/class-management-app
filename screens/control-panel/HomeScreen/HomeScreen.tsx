import React from 'react'
import { Text, View } from 'react-native'
import { ButtonText, StyledButton } from '@/components/styles'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar } from './styles/homeScreenStyles'

const HomeScreen = () => {
	const { onLogout, authState } = useAuth()

	return (
		<View>
			<Avatar resizeMode='cover' source={require('@/assets/img/default-avatar.jpg')} />
			<Text>HomeScreen</Text>
			<Text>{authState?.userInfo?.name}</Text>
			<Text>{authState?.userInfo?.email}</Text>
			<StyledButton onPress={onLogout}>
				<ButtonText>Logout</ButtonText>
			</StyledButton>
		</View>
	)
}

export default HomeScreen
