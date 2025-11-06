import React, { useEffect, useMemo, useState } from 'react'
import { View, Modal, Text, ScrollView, Alert } from 'react-native'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import capitalizeWords from '@/shared/capitalize-words'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { updateStudentUserById } from '@/redux/actions/userActions'
import { UPDATE_STUDENT_USER_BY_ID_RESET } from '@/redux/constants/userConstants'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TEnrollmentPlan } from '@/shared/common-types'

const MyProfileModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()
	const { userInfo } = useAppSelector((state) => state.userLogin)
	const { loadingUpdateStudentUserById, successUpdateStudentUserById, errorUpdateStudentUserById } = useAppSelector(
		(state) => state.updateStudentUserById,
	)

	const [userId, setUserId] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isDirty, setIsDirty] = useState<boolean>(false)

	useEffect(() => {
		return () => {
			dispatch({ type: UPDATE_STUDENT_USER_BY_ID_RESET })
			closeModal()
		}
	}, [])

	useEffect(() => {
		if (userInfo?.userId) {
			setUserId(userInfo.userId)
			setIsDirty(false)
		}
	}, [userInfo])

	useEffect(() => {
		if (errorUpdateStudentUserById) {
			setErrorMessage(errorUpdateStudentUserById)
			dispatch({ type: UPDATE_STUDENT_USER_BY_ID_RESET })
		}
	}, [errorUpdateStudentUserById])

	useEffect(() => {
		if (successUpdateStudentUserById) {
			// Close modal after successful update
			closeModal()
		}
	}, [successUpdateStudentUserById])

	const dob = useMemo(() => {
		if (!userInfo?.dateOfBirth) return null

		const { year, month, day } = userInfo.dateOfBirth

		return new Date(year, month - 1, day, 12, 0, 0)
	}, [userInfo])

	const handleUpdateUserId = () => {
		setErrorMessage(null)
		if (!userId?.length) {
			return setErrorMessage('User ID is required')
		}
		if (userId.length < 6) {
			return setErrorMessage('User ID must be at least 6 characters long')
		}
		if (!/^[A-Za-z0-9]+$/.test(userId)) {
			return setErrorMessage(`User ID ${userId} must contain only letters and numbers`)
		}

		if (!userInfo?._id) return closeModal()

		// Only update if userId has changed
		if (userId.toUpperCase() === userInfo.userId.toUpperCase()) {
			return closeModal()
		}

		dispatch(updateStudentUserById(userInfo._id, { userId: userId.toUpperCase() }))
		setIsDirty(false)
	}

	const handleClose = () => {
		if (isDirty) {
			Alert.alert('Discard Changes?', 'You have unsaved changes. Are you sure you want to discard them?', [
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Discard',
					onPress: () => closeModal(),
					style: 'destructive',
				},
			])
		} else {
			closeModal()
		}
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={handleClose} statusBarTranslucent={true}>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader 
					label='My Profile' 
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingUpdateStudentUserById}
					loadingButtonAction={loadingUpdateStudentUserById}
					handleOnPress={handleUpdateUserId}
					showBackButton={true} 
					handleBack={handleClose} 
				/>
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

						{/* Error Message */}
						{errorMessage && (
							<View style={{ 
								backgroundColor: colors.variants.primary[1],
								borderRadius: 12,
								padding: 16,
								marginBottom: 20,
								borderWidth: 1,
								borderColor: colors.variants.primary[3]
							}}>
								<Text style={{ 
									color: colors.variants.primary[5],
									fontSize: 14,
									fontWeight: '500'
								}}>
									{errorMessage}
								</Text>
							</View>
						)}

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
							{/* Editable User ID with subtle indicator */}
							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
									<Text style={{ 
										fontSize: 14, 
										fontWeight: '600', 
										color: colors.variants.secondary[5],
										flex: 1
									}}>
										User ID
									</Text>
									<View style={{ 
										flexDirection: 'row', 
										alignItems: 'center',
										backgroundColor: colors.variants.secondary[1],
										paddingHorizontal: 8,
										paddingVertical: 4,
										borderRadius: 12
									}}>
										<MaterialCommunityIcons 
											name="pencil" 
											size={12} 
											color={colors.variants.secondary[5]} 
											style={{ marginRight: 4 }}
										/>
										<Text style={{ 
											fontSize: 11, 
											fontWeight: '500', 
											color: colors.variants.secondary[5]
										}}>
											Editable
										</Text>
									</View>
								</View>
								<CustomInputForm
									placeholder='USER123'
									placeholderTextColor={colors.darkLight}
									onChangeText={(text) => {
										setUserId(text.trim().toUpperCase())
										setIsDirty(true)
									}}
									value={userId}
									editable={!loadingUpdateStudentUserById}
									icon='account-key'
									autoCapitalize='characters'
									maxLength={20}
									autoComplete='off'
								/>
							</View>

							{/* Read-only fields */}
							<CustomInputForm
								label='First Name'
								placeholder='Manuel'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo?.name)}
								editable={false}
								icon='account'
								autoComplete='off'
							/>
							<CustomInputForm
								label='Last Name'
								placeholder='Smith'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo?.lastName)}
								editable={false}
								icon='account'
								autoComplete='off'
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
								label='Enrollment Plan'
								placeholder='Optimum'
								placeholderTextColor={colors.darkLight}
								value={userInfo.enrollmentPlan || 'Basic'}
								editable={false}
								icon='account-group'
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
