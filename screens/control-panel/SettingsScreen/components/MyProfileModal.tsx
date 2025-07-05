import React, { useEffect, useMemo } from 'react'
import { View, Modal, Text, ScrollView } from 'react-native'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import capitalizeWords from '@/shared/capitalize-words'
import { useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MyProfileModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const { userInfo } = useAppSelector((state) => state.userLogin)

	useEffect(() => {
		return () => {
			closeModal()
		}
	}, [])

	const dob = useMemo(() => {
		if (!userInfo?.dateOfBirth) return null

		const { year, month, day } = userInfo.dateOfBirth

		return new Date(year, month - 1, day, 12, 0, 0)
	}, [userInfo])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='My Profile' showBackButton={true} handleBack={closeModal} />
				{userInfo ? (
					<ScrollView 
						style={{ flex: 1 }}
						contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
						showsVerticalScrollIndicator={false}
					>
						{/* Header Section */}
						<View style={{ marginBottom: 32 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
								<View style={{ 
									backgroundColor: colors.brand,
									borderRadius: 12,
									padding: 8,
									marginRight: 12
								}}>
									<MaterialCommunityIcons name="account" size={24} color={colors.view.primary} />
								</View>
								<Text style={{ 
									fontSize: 24, 
									fontWeight: '700', 
									color: colors.variants.secondary[5],
									flex: 1,
									letterSpacing: -0.5
								}}>
									My Profile
								</Text>
							</View>
							<Text style={{ 
								fontSize: 16, 
								color: colors.variants.grey[4],
								lineHeight: 22,
								marginLeft: 52,
								letterSpacing: -0.2
							}}>
								View your account information and details
							</Text>
						</View>

						{/* Profile Form */}
						<View style={{ 
							backgroundColor: colors.view.primary,
							borderRadius: 16,
							padding: 20,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.1,
							shadowRadius: 8,
							elevation: 3,
							borderWidth: 1,
							borderColor: colors.variants.secondary[1],
							gap: 20
						}}>
							<CustomInputForm
								label='First Name'
								placeholder='Manuel'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo?.name)}
								editable={false}
								icon='account'
							/>
							<CustomInputForm
								label='Last Name'
								placeholder='Smith'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo?.lastName)}
								editable={false}
								icon='account'
							/>
							<CustomInputForm
								label='Date of Birth'
								placeholder='YYYY - MM - DD'
								placeholderTextColor={colors.darkLight}
								value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
								editable={false}
								icon='calendar'
							/>
							<CustomInputForm
								label='Level'
								placeholder='novice'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo.level || '')}
								editable={false}
								icon='karate'
							/>
							<CustomInputForm
								label='Email'
								placeholder='manuel@gmail.com'
								placeholderTextColor={colors.darkLight}
								value={userInfo.email}
								editable={false}
								icon='email'
							/>
						</View>
					</ScrollView>
				) : (
					<View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ 
							fontSize: 24, 
							fontWeight: '500', 
							color: colors.variants.primary[5], 
							textAlign: 'center',
							letterSpacing: -0.4
						}}>
							You are not logged in
						</Text>
					</View>
				)}
			</View>
		</Modal>
	)
}

export default MyProfileModal
