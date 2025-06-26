import React, { useEffect, useState } from 'react'
import { Modal, Switch, ScrollView } from 'react-native'
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
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<S.ModalContainer>
				<ScreenHeader
					label='Add Student'
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingRegisterStudents}
					loadingButtonAction={loadingRegisterStudents}
					handleOnPress={handleRegisterStudents}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<S.ContentContainer>
					<KeyboardAvoidingWrapper>
						<ScrollView contentContainerStyle={{ gap: 40, padding: 20 }}>
							{(errorMessage || errorRegisterStudents) && (
								<S.ErrorText>
									{errorMessage || errorRegisterStudents}
								</S.ErrorText>
							)}
							<CustomInputForm
								label='User ID'
								placeholder='USER123'
								placeholderTextColor={colors.darkLight}
								onChangeText={(text) => setUserId(text.trim().toUpperCase())}
								value={userId}
								editable={!loadingRegisterStudents}
								icon='account-key'
								autoCapitalize='characters'
								maxLength={20}
							/>
							<CustomInputForm
								label='First Name'
								placeholder='Manuel'
								placeholderTextColor={colors.darkLight}
								onChangeText={setStudentName}
								value={studentName}
								editable={!loadingRegisterStudents}
								icon='account'
							/>
							<CustomInputForm
								label='Last Name'
								placeholder='Smith'
								placeholderTextColor={colors.darkLight}
								onChangeText={setStudentLastName}
								value={studentLastName}
								editable={!loadingRegisterStudents}
								icon='account'
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
								label='Email'
								placeholder='manuel@gmail.com'
								placeholderTextColor={colors.darkLight}
								onChangeText={setEmail}
								value={email}
								editable={!loadingRegisterStudents}
								icon='email'
							/>
							<CustomInputForm
								label='Phone'
								placeholder='+506 1234 5678'
								placeholderTextColor={colors.darkLight}
								onChangeText={setPhone}
								value={phone}
								editable={!loadingRegisterStudents}
								icon='phone'
							/>
							<CustomInputForm
								label='Notes'
								placeholder='This student has 3 brothers...'
								placeholderTextColor={colors.darkLight}
								onChangeText={setNotes}
								value={notes}
								editable={!loadingRegisterStudents}
								multiline={true}
								icon='note'
							/>
							<S.SwitchContainer>
								{role === 'admin' && (
									<S.SwitchOption>
										<Switch
											trackColor={{ false: colors.variants.secondary[2], true: colors.variants.secondary[5] }}
											thumbColor={colors.variants.secondary[0]}
											ios_backgroundColor={colors.variants.secondary[2]}
											onValueChange={() => setIsTeacher(!isTeacher)}
											value={isTeacher}
										/>
										<S.SwitchLabel>Is Teacher</S.SwitchLabel>
									</S.SwitchOption>
								)}
								{userInfo?.isSuper && (
									<S.SwitchOption>
										<Switch
											trackColor={{ false: colors.variants.secondary[2], true: colors.variants.secondary[5] }}
											thumbColor={colors.variants.secondary[0]}
											ios_backgroundColor={colors.variants.secondary[2]}
											onValueChange={() => setIsAdmin(!isAdmin)}
											value={isAdmin}
										/>
										<S.SwitchLabel>Is Admin</S.SwitchLabel>
									</S.SwitchOption>
								)}
							</S.SwitchContainer>
						</ScrollView>
					</KeyboardAvoidingWrapper>
				</S.ContentContainer>
			</S.ModalContainer>
			{showDatePicker && (
				<DateTimePickerModal
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
					handleSaveOption={(selected: string) => setLevel(selected as TUserLevel)}
				/>
			)}
		</Modal>
	)
}

export default StudentsRegisterModal
