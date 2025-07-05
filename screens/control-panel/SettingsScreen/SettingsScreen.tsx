import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { USER_LOGOUT } from '@/redux/constants/userConstants'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { TUserRole } from '@/shared/common-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyProfileModal from './components/MyProfileModal'
import InfoModal from './components/InfoModal'
import SystemConfigModal from './components/SystemConfigModal'
import { 
	Container, 
	Content, 
	HeaderSection, 
	HeaderTitle, 
	HeaderSubtitle, 
	SettingsCard, 
	CardContent, 
	CardLeft, 
	IconContainer, 
	CardTitle, 
	LogoutCard, 
	LogoutIconContainer, 
	LogoutTitle 
} from './settings-screen-styles'
import colors from '@/theme/colors'

const SettingsScreen = ({ role }: { role: TUserRole }) => {
	const iconSize = 24
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
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingBottom: 40 }}
					showsVerticalScrollIndicator={false}
				>
					<Content>
						{/* Header Section */}
						<HeaderSection>
							<HeaderTitle>Account & Settings</HeaderTitle>
							<HeaderSubtitle>Manage your profile, preferences, and system configuration</HeaderSubtitle>
						</HeaderSection>

						{/* Settings Cards */}
						<SettingsCard onPress={() => setOpenMyProfileModal(true)}>
							<CardContent>
								<CardLeft>
									<IconContainer>
										<MaterialCommunityIcons name='account' size={iconSize} color={colors.brand} />
									</IconContainer>
									<CardTitle>My Account</CardTitle>
								</CardLeft>
								<MaterialCommunityIcons name='chevron-right' size={20} color={colors.variants.grey[3]} />
							</CardContent>
						</SettingsCard>

						<SettingsCard onPress={() => setOpenInfoModal(true)}>
							<CardContent>
								<CardLeft>
									<IconContainer>
										<MaterialCommunityIcons name='information' size={iconSize} color={colors.brand} />
									</IconContainer>
									<CardTitle>About Miyagi Ken International</CardTitle>
								</CardLeft>
								<MaterialCommunityIcons name='chevron-right' size={20} color={colors.variants.grey[3]} />
							</CardContent>
						</SettingsCard>

						{userInfo?.isSuper && (
							<SettingsCard onPress={() => setOpenSystemConfigModal(true)}>
								<CardContent>
									<CardLeft>
										<IconContainer>
											<MaterialCommunityIcons name='cog' size={iconSize} color={colors.brand} />
										</IconContainer>
										<CardTitle>System Configuration</CardTitle>
									</CardLeft>
									<MaterialCommunityIcons name='chevron-right' size={20} color={colors.variants.grey[3]} />
								</CardContent>
							</SettingsCard>
						)}

						{/* Logout Card */}
						<LogoutCard onPress={handleOnLogout}>
							<CardContent>
								<CardLeft>
									<LogoutIconContainer>
										<MaterialCommunityIcons name='logout' size={iconSize} color={colors.view.primary} />
									</LogoutIconContainer>
									<LogoutTitle>Logout</LogoutTitle>
								</CardLeft>
								<MaterialCommunityIcons name='chevron-right' size={20} color="rgba(255,255,255,0.6)" />
							</CardContent>
						</LogoutCard>
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
