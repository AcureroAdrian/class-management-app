import React, { useEffect, useState } from 'react'
import { Modal, Switch, ScrollView, Alert } from 'react-native'
import { format } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Loader from '@/components/Loader/Loader'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import { IFullStudent } from '../../helpers/students-interfaces'
import getStudentDataToUpdate from '../../helpers/get-student-data-to-update'
import { levelsInitialValues } from '../../helpers/student-screen-initial-values'
import capitalizeWords from '@/shared/capitalize-words'
import { TUserLevel, TUserRole } from '@/shared/common-types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { adjustStudentRecoveryCredits, getStudentUserById, updateStudentUserById } from '@/redux/actions/userActions'
import {
	ADJUST_RECOVERY_CREDITS_RESET,
	GET_STUDENT_USER_BY_ID_RESET,
	UPDATE_STUDENT_USER_BY_ID_RESET,
} from '@/redux/constants/userConstants'
import colors from '@/theme/colors'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import * as S from './styles'

const StudentEditModal = ({
	openModal,
	closeModal,
	studentId,
	role,
}: {
	openModal: boolean
	closeModal: () => void
	studentId: string
	role: TUserRole
}) => {
	const dispatch = useAppDispatch()

	const [userId, setUserId] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [dob, setDob] = useState<Date | undefined>(undefined)
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [notes, setNotes] = useState<string>('')
	const [level, setLevel] = useState<TUserLevel>()
	const [isTeacher, setIsTeacher] = useState<boolean>(false)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [openLevelModal, setOpenLevelModal] = useState<boolean>(false)
	const [isDirty, setIsDirty] = useState<boolean>(false)

	const { userInfo } = useAppSelector((state) => state.userLogin)
	const { loadingGetStudentUserById, successGetStudentUserById, studentUserById, errorGetStudentUserById } =
		useAppSelector((state) => state.getStudentUserById)
	const { loadingUpdateStudentUserById, errorUpdateStudentUserById } = useAppSelector(
		(state) => state.updateStudentUserById,
	)
	const { loadingAdjustRecoveryCredits, errorAdjustRecoveryCredits } = useAppSelector(
		(state) => state.adjustRecoveryCredits,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: GET_STUDENT_USER_BY_ID_RESET })
			dispatch({ type: UPDATE_STUDENT_USER_BY_ID_RESET })
			dispatch({ type: ADJUST_RECOVERY_CREDITS_RESET })
			closeModal()
		}
	}, [])
	useEffect(() => {
		if (studentId) {
			dispatch(getStudentUserById(studentId))
		}
	}, [studentId])
	useEffect(() => {
		if (successGetStudentUserById) {
			setUserId(studentUserById?.userId || '')
			setName(capitalizeWords(studentUserById?.name || ''))
			setLastName(capitalizeWords(studentUserById?.lastName || ''))
			setPhone(studentUserById?.phone || '')
			setEmail(studentUserById?.email || '')
			setNotes(studentUserById?.notes || '')
			setLevel((studentUserById?.level as TUserLevel) || undefined)
			setIsTeacher(studentUserById?.isTeacher || false)
			setIsAdmin(studentUserById?.isAdmin || false)
			if (studentUserById?.dateOfBirth?.year) {
				const dob = new Date(
					studentUserById?.dateOfBirth?.year,
					studentUserById?.dateOfBirth?.month - 1,
					studentUserById?.dateOfBirth?.day,
				)
				setDob(dob)
			}
			setIsDirty(false)
		}
	}, [successGetStudentUserById])
	useEffect(() => {
		if (errorGetStudentUserById) {
			setErrorMessage(errorGetStudentUserById)
		}
	}, [errorGetStudentUserById])
	useEffect(() => {
		if (errorUpdateStudentUserById) {
			setErrorMessage(errorUpdateStudentUserById)
			dispatch({ type: UPDATE_STUDENT_USER_BY_ID_RESET })
		}
	}, [errorUpdateStudentUserById])
	useEffect(() => {
		if (errorAdjustRecoveryCredits) {
			setErrorMessage(errorAdjustRecoveryCredits)
			dispatch({ type: ADJUST_RECOVERY_CREDITS_RESET })
		}
	}, [errorAdjustRecoveryCredits])

	const handleUpdateStudent = () => {
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
		if (!name?.length) {
			return setErrorMessage('First name is required')
		}
		if (!lastName?.length) {
			return setErrorMessage('Last name is required')
		}

		if (!studentUserById) return closeModal()

		const newData: IFullStudent = {
			userId: userId.toUpperCase(),
			name,
			lastName,
			phone,
			email,
			notes,
			level,
			isTeacher,
			isAdmin,
		}

		if (dob) {
			newData.dateOfBirth = {
				year: dob.getFullYear(),
				month: dob.getMonth() + 1,
				day: dob.getDate(),
			}
		}

		const { needUpdate, dataToUpdate } = getStudentDataToUpdate(studentUserById, newData)

		if (!needUpdate) {
			return closeModal()
		}

		dispatch(updateStudentUserById(studentId, dataToUpdate))
		setIsDirty(false)
	}
	const handleSelectDob = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || dob
		setDob(currentDate)
		setShowDatePicker(false)
		setIsDirty(true)
	}

	const handleAdjustCredits = (adjustment: 1 | -1) => {
		setErrorMessage(null)
		if (role === 'admin' || userInfo?.isSuper) {
			dispatch(adjustStudentRecoveryCredits(studentId, adjustment))
		}
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
			<S.ModalContainer>
				<ScreenHeader
					label='Student Info'
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingGetStudentUserById || loadingUpdateStudentUserById || loadingAdjustRecoveryCredits}
					handleOnPress={handleUpdateStudent}
					showBackButton={true}
					handleBack={handleClose}
					loadingButtonAction={loadingUpdateStudentUserById}
				/>
				{loadingGetStudentUserById ? (
					<S.LoaderContainer>
						<Loader text='Loading student info' />
					</S.LoaderContainer>
				) : (
					<>
						<S.ContentContainer>
							<KeyboardAvoidingWrapper>
								<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
									{/* Personal Information */}
									<S.FormSection>
										<S.SectionTitle>Personal Information</S.SectionTitle>
										<S.FormGroup>
											<CustomInputForm
												label='User ID'
												placeholder='USER123'
												placeholderTextColor={colors.darkLight}
												onChangeText={(text) => {
													setUserId(text)
													setIsDirty(true)
												}}
												value={userId}
												editable={!loadingUpdateStudentUserById && (role === 'admin' || userInfo?.isSuper)}
												icon='account-key'
												autoCapitalize='characters'
												maxLength={20}
											/>
											<CustomInputForm
												label='First Name'
												placeholder='Manuel'
												placeholderTextColor={colors.darkLight}
												onChangeText={(text) => {
													setName(text)
													setIsDirty(true)
												}}
												value={name}
												editable={!loadingUpdateStudentUserById}
												icon='account'
											/>
											<CustomInputForm
												label='Last Name'
												placeholder='Smith'
												placeholderTextColor={colors.darkLight}
												onChangeText={(text) => {
													setLastName(text)
													setIsDirty(true)
												}}
												value={lastName}
												editable={!loadingUpdateStudentUserById}
												icon='account'
											/>
											<CustomInputForm
												label='Date of Birth'
												placeholder='YYY - MM - DD'
												placeholderTextColor={colors.darkLight}
												value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
												editable={false}
												onPress={() => !loadingUpdateStudentUserById && setShowDatePicker(true)}
												icon='calendar'
											/>
											<CustomInputForm
												label='Level'
												placeholder='novice'
												placeholderTextColor={colors.darkLight}
												value={level}
												editable={false}
												onPress={() => !loadingUpdateStudentUserById && setOpenLevelModal(true)}
												icon='karate'
											/>
										</S.FormGroup>
									</S.FormSection>

									{/* Contact Information */}
									<S.FormSection>
										<S.SectionTitle>Contact Information</S.SectionTitle>
										<S.FormGroup>
											<CustomInputForm
												label='Email'
												placeholder='manuel@gmail.com'
												placeholderTextColor={colors.darkLight}
												onChangeText={(text) => {
													setEmail(text)
													setIsDirty(true)
												}}
												value={email}
												editable={!loadingUpdateStudentUserById}
												icon='email'
											/>
											<CustomInputForm
												label='Phone'
												placeholder='+506 1234 5678'
												placeholderTextColor={colors.darkLight}
												onChangeText={(text) => {
													setPhone(text)
													setIsDirty(true)
												}}
												value={phone}
												editable={!loadingUpdateStudentUserById}
												icon='phone'
											/>
											<CustomInputForm
												label='Notes'
												placeholder='This student has 3 brothers...'
												placeholderTextColor={colors.darkLight}
												onChangeText={(text) => {
													setNotes(text)
													setIsDirty(true)
												}}
												value={notes}
												editable={!loadingUpdateStudentUserById}
												multiline={true}
												submitBehavior='blurAndSubmit'
												icon='note'
											/>
										</S.FormGroup>
									</S.FormSection>

									{/* Credit Management */}
									{(role === 'admin' || userInfo?.isSuper) && (
										<S.CreditsContainer>
											<S.CreditsHeader>
												<S.CreditsTitle>Credit Management</S.CreditsTitle>
												<S.CreditsSubtitle>Manage the student's recovery credits</S.CreditsSubtitle>
											</S.CreditsHeader>
											<S.CreditsContent>
												<S.CreditsInfoContainer>
													<S.CreditsInfo>
														<S.CreditsLabel>Total:</S.CreditsLabel>
														<S.CreditsValue>{studentUserById?.totalRecoveryCredits ?? 0}</S.CreditsValue>
													</S.CreditsInfo>
													<S.CreditsInfo>
														<S.CreditsLabel>Adjusted:</S.CreditsLabel>
														<S.CreditsValue>{studentUserById?.recoveryCreditsAdjustment ?? 0}</S.CreditsValue>
													</S.CreditsInfo>
												</S.CreditsInfoContainer>
												<S.CreditsActions>
													<S.CreditButtonMinus
														onPress={() => handleAdjustCredits(-1)}
														disabled={loadingAdjustRecoveryCredits}
													>
														<MaterialCommunityIcons name='minus' size={24} color={colors.variants.primary[5]} />
													</S.CreditButtonMinus>
													<S.CreditButtonPlus
														onPress={() => handleAdjustCredits(1)}
														disabled={loadingAdjustRecoveryCredits}
													>
														<MaterialCommunityIcons name='plus' size={24} color={colors.variants.secondary[5]} />
													</S.CreditButtonPlus>
												</S.CreditsActions>
											</S.CreditsContent>
										</S.CreditsContainer>
									)}

									{/* Permissions and Roles */}
									{(role === 'admin' || userInfo?.isSuper) && (
										<S.SwitchContainer>
											<S.SectionTitle>Permissions and Roles</S.SectionTitle>
											{role === 'admin' && (
												<S.SwitchOption>
													<S.SwitchInfo>
														<S.SwitchLabel>Is Teacher</S.SwitchLabel>
														<S.SwitchDescription>Grants permissions to manage classes</S.SwitchDescription>
													</S.SwitchInfo>
													<Switch
														trackColor={{ false: colors.variants.grey[2], true: colors.variants.secondary[4] }}
														thumbColor={isTeacher ? colors.variants.secondary[5] : colors.variants.grey[0]}
														ios_backgroundColor={colors.variants.grey[2]}
														onValueChange={() => {
															setIsTeacher(!isTeacher)
															setIsDirty(true)
														}}
														value={isTeacher}
													/>
												</S.SwitchOption>
											)}
											{userInfo?.isSuper && (
												<S.SwitchOption>
													<S.SwitchInfo>
														<S.SwitchLabel>Is Admin</S.SwitchLabel>
														<S.SwitchDescription>Grants full administrative permissions</S.SwitchDescription>
													</S.SwitchInfo>
													<Switch
														trackColor={{ false: colors.variants.grey[2], true: colors.variants.primary[4] }}
														thumbColor={isAdmin ? colors.variants.primary[5] : colors.variants.grey[0]}
														ios_backgroundColor={colors.variants.grey[2]}
														onValueChange={() => {
															setIsAdmin(!isAdmin)
															setIsDirty(true)
														}}
														value={isAdmin}
													/>
												</S.SwitchOption>
											)}
										</S.SwitchContainer>
									)}
								</ScrollView>
							</KeyboardAvoidingWrapper>
						</S.ContentContainer>
						{errorMessage && (
							<S.ErrorText>
								{errorMessage}
							</S.ErrorText>
						)}
					</>
				)}
			</S.ModalContainer>
			{showDatePicker && (
				<DateTimePickerModal
					isVisible={showDatePicker}
					mode='date'
					onConfirm={handleSelectDob}
					onCancel={() => setShowDatePicker(false)}
					display='spinner'
					date={dob}
				/>
			)}
			{openLevelModal && (
				<CustomSelectModal
					openModal={openLevelModal}
					closeModal={() => setOpenLevelModal(false)}
					title='Student Levels'
					options={levelsInitialValues}
					selected={level || ''}
					handleSaveOption={(selected: string) => {
						setLevel(selected as TUserLevel)
						setIsDirty(true)
					}}
				/>
			)}
		</Modal>
	)
}

export default StudentEditModal
