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
			<View style={{ flex: 1 }}>
				<ScreenHeader label='Settings' />
				<View style={{ gap: 30, marginTop: 20, marginBottom: 20, padding: 20, flex: 1 }}>
					<Pressable onPress={() => setOpenMyProfileModal(true)}>
						<View style={{ flexDirection: 'row', gap: 10 }}>
							<AntDesign name='user' size={24} color='black' />
							<Text>My Account</Text>
						</View>
					</Pressable>
					<Pressable onPress={() => setOpenInfoModal(true)}>
						<View style={{ flexDirection: 'row', gap: 10 }}>
							<AntDesign name='infocirlce' size={24} color='black' />
							<Text>About Miyagi Ken International</Text>
						</View>
					</Pressable>
					<Pressable onPress={handleOnLogout} style={{ justifyContent: 'flex-end' }}>
						<View style={{ flexDirection: 'row', gap: 10 }}>
							<AntDesign name='logout' size={24} color='black' />
							<Text>Logout</Text>
						</View>
					</Pressable>
				</View>
			</View>
			{openMyProfileModal && (
				<MyProfileModal openModal={openMyProfileModal} closeModal={() => setOpenMyProfileModal(false)} />
			)}
			{openInfoModal && <InfoModal openModal={openInfoModal} closeModal={() => setOpenInfoModal(false)} />}
		</>
	)
}

export default SettingsScreen
