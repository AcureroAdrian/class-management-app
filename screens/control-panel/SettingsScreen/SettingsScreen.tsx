import React, { useState } from 'react'
import { View, Text, Button, Pressable } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { USER_LOGOUT } from '@/redux/constants/userConstants'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import { TUserRole } from '@/shared/common-types'
import { AntDesign } from '@expo/vector-icons'
import colors from '@/theme/colors'
import MyProfileModal from './components/MyProfileModal'
import InfoModal from './components/InfoModal'
import {
	Container,
	Content,
	PressableContainer,
	LogoutButton,
	TextBold,
	Divider
} from './settings-screen-styles'

const SettingsScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()

	const [openMyProfileModal, setOpenMyProfileModal] = useState<boolean>(false)
	const [openInfoModal, setOpenInfoModal] = useState<boolean>(false)

	const { userInfo } = useAppSelector((state) => state.userLogin)

	const handleOnLogout = () => {
		dispatch({ type: USER_LOGOUT })
	}

	return (
		<>
			<Container>
				<ScreenHeader label='Settings' />
				<Content>
					<Pressable onPress={() => setOpenMyProfileModal(true)}>
						<PressableContainer>
							<AntDesign name='user' size={26} color='black' />
							<TextBold>My Account</TextBold>
						</PressableContainer>
					</Pressable>
					<Divider />
					<Pressable onPress={() => setOpenInfoModal(true)}>
						<PressableContainer>
							<AntDesign name='infocirlce' size={26} color='black' />
							<TextBold>About Miyagi Ken International</TextBold>
						</PressableContainer>
					</Pressable>
					<Divider />
					<LogoutButton onPress={handleOnLogout}>
						<PressableContainer>
							<AntDesign name='logout' size={26} color='black' />
							<TextBold>Logout</TextBold>
						</PressableContainer>
					</LogoutButton>
				</Content>
			</Container>
			{openMyProfileModal && (
				<MyProfileModal openModal={openMyProfileModal} closeModal={() => setOpenMyProfileModal(false)} />
			)}
			{openInfoModal && <InfoModal openModal={openInfoModal} closeModal={() => setOpenInfoModal(false)} />}
		</>
	)
}

export default SettingsScreen
