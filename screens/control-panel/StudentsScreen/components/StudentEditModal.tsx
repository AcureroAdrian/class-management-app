import React, { useEffect, useState } from 'react'
import { View, Modal, Text, Switch, ScrollView, KeyboardAvoidingView } from 'react-native'
import { format } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Loader from '@/components/Loader/Loader'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import { IFullStudent } from '../helpers/students-interfaces'
import getStudentDataToUpdate from '../helpers/get-student-data-to-update'
import { levelsInitialValues } from '../helpers/student-screen-initial-values'
import capitalizeWords from '@/shared/capitalize-words'
import { TUserLevel, TUserRole } from '@/shared/common-types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUserById, updateStudentUserById } from '@/redux/actions/userActions'
import { GET_STUDENT_USER_BY_ID_RESET, UPDATE_STUDENT_USER_BY_ID_RESET } from '@/redux/constants/userConstants'
import colors from '@/theme/colors'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

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

	const { userInfo } = useAppSelector((state) => state.userLogin)
	const { loadingGetStudentUserById, successGetStudentUserById, studentUserById, errorGetStudentUserById } =
		useAppSelector((state) => state.getStudentUserById)
	const { loadingUpdateStudentUserById, errorUpdateStudentUserById } = useAppSelector(
		(state) => state.updateStudentUserById,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: GET_STUDENT_USER_BY_ID_RESET })
			dispatch({ type: UPDATE_STUDENT_USER_BY_ID_RESET })
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
	}
	const handleSelectDob = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || dob
		setDob(currentDate)
		setShowDatePicker(false)
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ScreenHeader
					label='Student Info'
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingGetStudentUserById || loadingUpdateStudentUserById}
					handleOnPress={handleUpdateStudent}
					showBackButton={true}
					handleBack={closeModal}
					loadingButtonAction={loadingUpdateStudentUserById}
				/>
				{loadingGetStudentUserById ? (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
						<Loader text='Loading student info' />
					</View>
				) : (
					<>
						<View style={{ flex: 1, width: '100%', paddingBottom: 25 }}>
							<KeyboardAvoidingWrapper>
								<ScrollView contentContainerStyle={{ gap: 40, padding: 20 }}>
									<CustomInputForm
										label='User ID'
										placeholder='USER123'
										placeholderTextColor={colors.darkLight}
										onChangeText={setUserId}
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
										onChangeText={setName}
										value={name}
										editable={!loadingUpdateStudentUserById}
										icon='account'
									/>
									<CustomInputForm
										label='Last Name'
										placeholder='Smith'
										placeholderTextColor={colors.darkLight}
										onChangeText={setLastName}
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
										onPress={() => (console.log('onPress'), !loadingUpdateStudentUserById && setOpenLevelModal(true))}
										icon='karate'
									/>
									<CustomInputForm
										label='Email'
										placeholder='manuel@gmail.com'
										placeholderTextColor={colors.darkLight}
										onChangeText={setEmail}
										value={email}
										editable={!loadingUpdateStudentUserById}
										icon='email'
									/>
									<CustomInputForm
										label='Phone'
										placeholder='+506 1234 5678'
										placeholderTextColor={colors.darkLight}
										onChangeText={setPhone}
										value={phone}
										editable={!loadingUpdateStudentUserById}
										icon='phone'
									/>
									<CustomInputForm
										label='Notes'
										placeholder='This student has 3 brothers...'
										placeholderTextColor={colors.darkLight}
										onChangeText={setNotes}
										value={notes}
										editable={!loadingUpdateStudentUserById}
										multiline={true}
										submitBehavior='blurAndSubmit'
										icon='note'
									/>
									<View style={{ width: '100%', flexDirection: 'row', gap: 40, justifyContent: 'center' }}>
										{role === 'admin' && (
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'flex-start',
													gap: 5,
													alignItems: 'center',
													marginTop: 10,
												}}
											>
												<Switch
													trackColor={{ false: colors.variants.secondary[2], true: colors.variants.secondary[5] }}
													thumbColor={colors.variants.secondary[0]}
													ios_backgroundColor={colors.variants.secondary[2]}
													onValueChange={() => setIsTeacher(!isTeacher)}
													value={isTeacher}
												/>
												<Text style={{ color: colors.variants.secondary[5], fontWeight: 500 }}>Is Teacher</Text>
											</View>
										)}
										{userInfo?.isSuper && (
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'flex-start',
													gap: 5,
													alignItems: 'center',
													marginTop: 10,
												}}
											>
												<Switch
													trackColor={{ false: colors.variants.secondary[2], true: colors.variants.secondary[5] }}
													thumbColor={colors.variants.secondary[0]}
													ios_backgroundColor={colors.variants.secondary[2]}
													onValueChange={() => setIsAdmin(!isAdmin)}
													value={isAdmin}
												/>
												<Text style={{ color: colors.variants.secondary[5], fontWeight: 500 }}>Is Admin</Text>
											</View>
										)}
									</View>
								</ScrollView>
							</KeyboardAvoidingWrapper>
						</View>
						{errorMessage && (
							<Text
								style={{
									textAlign: 'center',
									fontSize: 13,
									color: 'red',
								}}
							>
								{errorMessage}
							</Text>
						)}
					</>
				)}
			</View>
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
					handleSaveOption={(selected: string) => setLevel(selected as TUserLevel)}
				/>
			)}
		</Modal>
	)
}

export default StudentEditModal
