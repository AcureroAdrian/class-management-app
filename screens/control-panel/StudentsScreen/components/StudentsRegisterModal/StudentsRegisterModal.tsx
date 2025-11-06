import React, { useEffect, useState } from 'react'
import { Modal, Switch, ScrollView, Alert } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import { levelsInitialValues } from '../../helpers/student-screen-initial-values'
import { IFullStudent } from '../../helpers/students-interfaces'
import { TUserLevel, TUserRole } from '@/shared/common-types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { registerStudents } from '@/redux/actions/userActions'
import { REGISTER_STUDENTS_RESET } from '@/redux/constants/userConstants'
import colors from '@/theme/colors'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import * as S from './styles'

const StudentsRegisterModal = ({
	openModal,
	closeModal,
	role,
	mode,
}: {
	openModal: boolean
	closeModal: () => void
	role: TUserRole
	mode: 'students' | 'teachers'
}) => {
	const dispatch = useAppDispatch()

	const [userId, setUserId] = useState<string>('')
	const [studentName, setStudentName] = useState<string>('')
	const [studentLastName, setStudentLastName] = useState<string>('')
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [dob, setDob] = useState<Date | undefined>(undefined)
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [notes, setNotes] = useState<string>('')
	const [level, setLevel] = useState<TUserLevel>()
	const [isTeacher, setIsTeacher] = useState<boolean>(mode === 'teachers')
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [openLevelModal, setOpenLevelModal] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isDirty, setIsDirty] = useState<boolean>(false)
	const [enrollmentPlan, setEnrollmentPlan] = useState<'Basic' | 'Optimum' | 'Plus' | 'Advanced'>('Basic')
	const [openPlanModal, setOpenPlanModal] = useState<boolean>(false)

	const { userInfo } = useAppSelector((state) => state.userLogin)
	const { loadingRegisterStudents, errorRegisterStudents } = useAppSelector((state) => state.registerStudents)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENTS_RESET })
			closeModal()
		}
	}, [])

	const handleRegisterStudents = () => {
		if (!userId?.length) {
			return setErrorMessage('User ID is required')
		}
		if (userId.length < 6) {
			return setErrorMessage('User ID must be at least 6 characters long')
		}
		if (!/^[A-Za-z0-9]+$/.test(userId)) {
			return setErrorMessage(`User ID ${userId} must contain only letters and numbers`)
		}
		if (!studentName?.length) {
			return setErrorMessage('First name is required')
		}
		if (!studentLastName?.length) {
			return setErrorMessage('Last name is required')
		}

		const studentData: IFullStudent = {
			userId: userId.toUpperCase(),
			name: studentName?.trim(),
			lastName: studentLastName?.trim(),
			phone,
			email,
			notes,
			level,
			isTeacher,
			isAdmin,
			isTrial: false,
			enrollmentPlan,
		}

		if (dob) {
			studentData.dateOfBirth = {
				year: dob.getFullYear(),
				month: dob.getMonth() + 1,
				day: dob.getDate(),
			}
		}

		dispatch(registerStudents(studentData))
	}
	const handleSelectDob = (date: Date) => {
		const currentDate = date || dob
		setDob(currentDate)
		setShowDatePicker(false)
		setIsDirty(true)
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
					label='Add Student'
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingRegisterStudents}
					loadingButtonAction={loadingRegisterStudents}
					handleOnPress={handleRegisterStudents}
					showBackButton={true}
					handleBack={handleClose}
				/>
				<S.ContentContainer>
					<KeyboardAvoidingWrapper>
						<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
							{(errorMessage || errorRegisterStudents) && (
								<S.ErrorText>
									{errorMessage || errorRegisterStudents}
								</S.ErrorText>
							)}
							
							{/* Personal Information */}
							<S.FormSection>
								<S.SectionTitle>Personal Information</S.SectionTitle>
								<S.FormGroup>
									<CustomInputForm
										label='User ID'
										placeholder='USER123'
										placeholderTextColor={colors.darkLight}
										onChangeText={(text) => {
											setUserId(text.trim().toUpperCase())
											setIsDirty(true)
										}}
										value={userId}
										editable={!loadingRegisterStudents}
										icon='account-key'
										autoCapitalize='characters'
										maxLength={20}
										autoComplete='off'
									/>
									<CustomInputForm
										label='First Name'
										placeholder='Manuel'
										placeholderTextColor={colors.darkLight}
										onChangeText={(text) => {
											setStudentName(text)
											setIsDirty(true)
										}}
										value={studentName}
										editable={!loadingRegisterStudents}
										icon='account'
										autoComplete='off'
									/>
									<CustomInputForm
										label='Last Name'
										placeholder='Smith'
										placeholderTextColor={colors.darkLight}
										onChangeText={(text) => {
											setStudentLastName(text)
											setIsDirty(true)
										}}
										value={studentLastName}
										editable={!loadingRegisterStudents}
										icon='account'
										autoComplete='off'
									/>
									<CustomInputForm
										label='Date of Birth'
										placeholder='YYY - MM - DD'
										placeholderTextColor={colors.darkLight}
										value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
										editable={false}
										onPress={() => !loadingRegisterStudents && setShowDatePicker(true)}
										icon='calendar'
									/>
									<CustomInputForm
										label='Level'
										placeholder='novice'
										placeholderTextColor={colors.darkLight}
										value={level}
										editable={false}
										onPress={() => !loadingRegisterStudents && setOpenLevelModal(true)}
										icon='karate'
									/>
									<CustomInputForm
										label='Enrollment Plan'
										placeholder='Optimum'
										placeholderTextColor={colors.darkLight}
										value={enrollmentPlan}
										editable={false}
										onPress={() => !loadingRegisterStudents && setOpenPlanModal(true)}
										icon='account-switch'
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
										editable={!loadingRegisterStudents}
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
										editable={!loadingRegisterStudents}
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
										editable={!loadingRegisterStudents}
										multiline={true}
										icon='note'
									/>
								</S.FormGroup>
							</S.FormSection>

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
			</S.ModalContainer>
			{showDatePicker && (
				<DateTimePickerModal
					minimumDate={new Date('1900-01-01')}
					isVisible={showDatePicker}
					mode='date'
					onConfirm={handleSelectDob}
					onCancel={() => setShowDatePicker(false)}
					display='spinner'
					date={dob}
					maximumDate={new Date()}
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
			{openPlanModal && (
				<CustomSelectModal
					openModal={openPlanModal}
					closeModal={() => setOpenPlanModal(false)}
					title='Enrollment Plan'
					options={['Basic', 'Optimum', 'Plus', 'Advanced']}
					selected={enrollmentPlan}
					handleSaveOption={(selected: string) => {
						setEnrollmentPlan(selected as any)
						setIsDirty(true)
					}}
				/>
			)}
		</Modal>
	)
}

export default StudentsRegisterModal
