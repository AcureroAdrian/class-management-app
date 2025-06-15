import React, { useState } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { USER_LOGOUT } from '@/redux/constants/userConstants'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { TUserRole } from '@/shared/common-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyProfileModal from './components/MyProfileModal'
import InfoModal from './components/InfoModal'
import SystemConfigModal from './components/SystemConfigModal'
import { Container, Content, PressableContainer, TextBold } from './settings-screen-styles'
import colors from '@/theme/colors'

const SettingsScreen = ({ role }: { role: TUserRole }) => {
	const iconSize = 40
	const iconColor = colors.variants.secondary[5]
	const dispatch = useAppDispatch()
	const { userInfo } = useAppSelector((state) => state.userLogin)

	const [openMyProfileModal, setOpenMyProfileModal] = useState<boolean>(false)
	const [openInfoModal, setOpenInfoModal] = useState<boolean>(false)
	const [openSystemConfigModal, setOpenSystemConfigModal] = useState<boolean>(false)

	const handleOnLogout = () => {
		dispatch({ type: USER_LOGOUT })
	}

	return (
		<>
			<Container>
				<ScreenHeader label='Settings' />
		<ScrollView>
				<Content>
					<Pressable style={{ width: '100%' }} onPress={() => setOpenMyProfileModal(true)}>
						<PressableContainer>
							<MaterialCommunityIcons name='account' size={iconSize} color={iconColor} />
							<TextBold>My Account</TextBold>
						</PressableContainer>
					</Pressable>
					<Pressable style={{ width: '100%' }} onPress={() => setOpenInfoModal(true)}>
						<PressableContainer>
							<MaterialCommunityIcons name='information' size={iconSize} color={iconColor} />
							<TextBold>About Miyagi Ken International</TextBold>
						</PressableContainer>
					</Pressable>
					{userInfo?.isSuper && (
						<Pressable style={{ width: '100%' }} onPress={() => setOpenSystemConfigModal(true)}>
							<PressableContainer>
								<MaterialCommunityIcons name='cog' size={iconSize} color={iconColor} />
								<TextBold>System Configuration</TextBold>
							</PressableContainer>
						</Pressable>
					)}
					<Pressable style={{ width: '100%' }} onPress={handleOnLogout}>
						<PressableContainer>
							<MaterialCommunityIcons name='logout' size={iconSize} color={iconColor} />
							<TextBold>Logout</TextBold>
						</PressableContainer>
					</Pressable>
				</Content>
			</ScrollView>
			</Container>
			{openMyProfileModal && (
				<MyProfileModal openModal={openMyProfileModal} closeModal={() => setOpenMyProfileModal(false)} />
			)}
			{openInfoModal && <InfoModal openModal={openInfoModal} closeModal={() => setOpenInfoModal(false)} />}
			{openSystemConfigModal && (
				<SystemConfigModal openModal={openSystemConfigModal} closeModal={() => setOpenSystemConfigModal(false)} />
			)}
		</>
	)
}

export default SettingsScreen
