import React, { useState, useEffect } from 'react'
import { Modal, ScrollView, Switch, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { registerTrialStudent } from '@/redux/actions/userActions'
import { addStudentToAttendance } from '@/redux/actions/studentAttendanceActions'
import { REGISTER_TRIAL_STUDENT_RESET } from '@/redux/constants/userConstants'
import { ADD_STUDENT_TO_ATTENDANCE_RESET } from '@/redux/constants/studentAttendanceConstants'
import { levelsInitialValues } from '../../../ClassesScreen/helpers/karate-classes-initial-values'
import { TUserLevel } from '@/shared/common-types'
import colors from '@/theme/colors'
import * as S from './styles'

interface TrialStudentModalProps {
	visible: boolean
	onClose: () => void
	attendanceId: string
	classId?: string
	date?: any
	onStudentAdded: () => void
}

const TrialStudentModal = ({
	visible,
	onClose,
	attendanceId,
	classId,
	date,
	onStudentAdded,
}: TrialStudentModalProps) => {
	const dispatch = useAppDispatch()

	const [userId, setUserId] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [level, setLevel] = useState<TUserLevel>()
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [dob, setDob] = useState<Date | undefined>(undefined)
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [notes, setNotes] = useState<string>('')
	const [addPermanently, setAddPermanently] = useState<boolean>(false)
	const [openLevelModal, setOpenLevelModal] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const {
		loadingRegisterTrialStudent,
		successRegisterTrialStudent,
		trialStudentRegistered,
		errorRegisterTrialStudent,
	} = useAppSelector((state) => state.registerTrialStudent) || {}
	const { loadingAddStudentToAttendance, successAddStudentToAttendance } =
		useAppSelector((state) => state.addStudentToAttendance) || {}

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_TRIAL_STUDENT_RESET })
			dispatch({ type: ADD_STUDENT_TO_ATTENDANCE_RESET })
			handleClose()
		}
	}, [])

	useEffect(() => {
		if (successRegisterTrialStudent && trialStudentRegistered) {
			// Automatically add the new trial student to attendance
			dispatch(
				addStudentToAttendance({
					studentId: trialStudentRegistered._id,
					attendanceId,
					isDayOnly: !addPermanently,
					addPermanently,
					classId,
					date,
				}),
			)
			dispatch({ type: REGISTER_TRIAL_STUDENT_RESET })
		}
	}, [successRegisterTrialStudent, trialStudentRegistered, addPermanently])

	useEffect(() => {
		if (successAddStudentToAttendance) {
			onStudentAdded()
			handleClose()
			dispatch({ type: ADD_STUDENT_TO_ATTENDANCE_RESET })
		}
	}, [successAddStudentToAttendance])

	useEffect(() => {
		if (errorRegisterTrialStudent) {
			setErrorMessage(errorRegisterTrialStudent)
		}
	}, [errorRegisterTrialStudent])

	const handleClose = () => {
		setUserId('')
		setName('')
		setLastName('')
		setLevel(undefined)
		setPhone('')
		setEmail('')
		setNotes('')
		setAddPermanently(false)
		setErrorMessage(null)
		onClose()
	}

	const handleCreateTrialStudent = () => {
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
		if (!level) {
			return setErrorMessage('Level is required')
		}

		const trialStudentData: any = {
			userId: userId.toUpperCase(),
			name: name.trim(),
			lastName: lastName.trim(),
			level,
			phone,
			email,
			notes,
		}

		if (dob) {
			trialStudentData.dateOfBirth = {
				year: dob.getFullYear(),
				month: dob.getMonth() + 1,
				day: dob.getDate(),
			}
		}

		dispatch(registerTrialStudent(trialStudentData))
	}

	// Si no está visible, no renderizar nada
	if (!visible) {
		return null
	}

	return (
		<>
			{/* Overlay para el modal anidado */}
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					zIndex: 1000,
				}}
			>
				<S.ModalContainer>
					<ScreenHeader
						label='Trial Student'
						labelButton='Create'
						iconName='content-save'
						disabledButton={loadingRegisterTrialStudent || loadingAddStudentToAttendance}
						loadingButtonAction={loadingRegisterTrialStudent || loadingAddStudentToAttendance}
						handleOnPress={handleCreateTrialStudent}
						showBackButton={true}
						handleBack={handleClose}
					/>
					<S.ContentContainer>
						<KeyboardAvoidingWrapper>
							<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
								{errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

								{/* Personal Information */}
								<S.FormSection>
									<S.SectionTitle>Personal Information</S.SectionTitle>
									<S.FormGroup>
										<CustomInputForm
											label='User ID'
											placeholder='USER123 (min. 6 characters)'
											placeholderTextColor={colors.darkLight}
											onChangeText={(text) => setUserId(text.trim().toUpperCase())}
											value={userId}
											editable={!loadingRegisterTrialStudent}
											icon='account-key'
											autoCapitalize='characters'
											maxLength={20}
											autoComplete='off'
										/>
										<CustomInputForm
											label='First Name'
											placeholder='Manuel'
											placeholderTextColor={colors.darkLight}
											onChangeText={setName}
											value={name}
											editable={!loadingRegisterTrialStudent}
											icon='account'
											autoComplete='off'
										/>
										<CustomInputForm
											label='Last Name'
											placeholder='Smith'
											placeholderTextColor={colors.darkLight}
											onChangeText={setLastName}
											value={lastName}
											editable={!loadingRegisterTrialStudent}
											icon='account'
											autoComplete='off'
										/>
										<CustomInputForm
											label='Date of Birth'
											placeholder='YYY - MM - DD'
											placeholderTextColor={colors.darkLight}
											value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
											editable={false}
											onPress={() => !loadingRegisterTrialStudent && setShowDatePicker(true)}
											icon='calendar'
										/>
										<CustomInputForm
											label='Level'
											placeholder='novice'
											placeholderTextColor={colors.darkLight}
											value={level}
											editable={false}
											onPress={() => !loadingRegisterTrialStudent && setOpenLevelModal(true)}
											icon='karate'
										/>
									</S.FormGroup>
								</S.FormSection>

								{/* Contact Information */}
								<S.FormSection>
									<S.SectionTitle>Contact Information</S.SectionTitle>
									<S.FormGroup>
										<CustomInputForm
											label='Email (optional)'
											placeholder='manuel@gmail.com'
											placeholderTextColor={colors.darkLight}
											onChangeText={setEmail}
											value={email}
											editable={!loadingRegisterTrialStudent}
											icon='email'
											keyboardType='email-address'
											autoCapitalize='none'
										/>
										<CustomInputForm
											label='Phone (optional)'
											placeholder='+506 1234 5678'
											placeholderTextColor={colors.darkLight}
											onChangeText={setPhone}
											value={phone}
											editable={!loadingRegisterTrialStudent}
											icon='phone'
											keyboardType='phone-pad'
										/>
										<CustomInputForm
											label='Notes (optional)'
											placeholder='Additional notes about the student'
											placeholderTextColor={colors.darkLight}
											onChangeText={setNotes}
											value={notes}
											editable={!loadingRegisterTrialStudent}
											multiline={true}
											submitBehavior='blurAndSubmit'
											icon='note'
										/>
									</S.FormGroup>
								</S.FormSection>

								{/* Class Assignment */}
								<S.FormSection>
									<S.SectionTitle>Class Assignment</S.SectionTitle>
									<S.InfoCard>
										<S.InfoCardTitle>💡 Trial Student Info</S.InfoCardTitle>
										<S.InfoCardDescription>
											Trial students are temporary and will be added to today's class only
										</S.InfoCardDescription>
									</S.InfoCard>
								</S.FormSection>
							</ScrollView>
						</KeyboardAvoidingWrapper>
					</S.ContentContainer>
				</S.ModalContainer>
			</View>

			{/* Level Selection Modal - Usando Modal real para este */}
			{openLevelModal && (
				<CustomSelectModal
					openModal={openLevelModal}
					closeModal={() => setOpenLevelModal(false)}
					title='Student Levels'
					options={levelsInitialValues}
					selected={level || ''}
					handleSaveOption={(selected: string) => setLevel(selected as TUserLevel)}
				/>
			)}

			{showDatePicker && (
				<DateTimePickerModal
					minimumDate={new Date('1900-01-01')}
					isVisible={showDatePicker}
					mode='date'
					onConfirm={(date) => {
						const currentDate = date || dob
						setDob(currentDate)
						setShowDatePicker(false)
					}}
					onCancel={() => setShowDatePicker(false)}
					display='spinner'
					date={dob}
					maximumDate={new Date()}
				/>
			)}
		</>
	)
}

export default TrialStudentModal
