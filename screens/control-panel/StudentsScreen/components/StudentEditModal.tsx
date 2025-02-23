import React, { useEffect, useState } from 'react'
import { View, Modal, Text } from 'react-native'
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
import { TUserLevel } from '@/shared/common-types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUserById, updateStudentUserById } from '@/redux/actions/userActions'
import { GET_STUDENT_USER_BY_ID_RESET, UPDATE_STUDENT_USER_BY_ID_RESET } from '@/redux/constants/userConstants'
import colors from '@/theme/colors'

const StudentEditModal = ({
	openModal,
	closeModal,
	studentId,
}: {
	openModal: boolean
	closeModal: () => void
	studentId: string
}) => {
	const dispatch = useAppDispatch()

	const [name, setName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [dob, setDob] = useState<Date | undefined>(undefined)
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [notes, setNotes] = useState<string>('')
	const [level, setLevel] = useState<TUserLevel>()
	const [openLevelModal, setOpenLevelModal] = useState<boolean>(false)

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
			console.log(studentUserById)
			setName(capitalizeWords(studentUserById?.name || ''))
			setLastName(capitalizeWords(studentUserById?.lastName || ''))
			setPhone(studentUserById?.phone || '')
			setEmail(studentUserById?.email || '')
			setNotes(studentUserById?.notes || '')
			setLevel((studentUserById?.level as TUserLevel) || undefined)
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
		if (!name?.length) {
			return setErrorMessage('First name is required')
		}
		if (!lastName?.length) {
			return setErrorMessage('Last name is required')
		}

		if (!studentUserById) return closeModal()

		const newData: IFullStudent = {
			name,
			lastName,
			phone,
			email,
			notes,
			level,
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
		<>
			<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
				<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
					<ScreenHeader
						label='Student Info'
						labelButton='Save'
						iconName='save'
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
							<View style={{ flex: 1, width: '100%', padding: 20 }}>
								<CustomInputForm
									label='First Name'
									placeholder='Manuel'
									placeholderTextColor={colors.darkLight}
									onChangeText={setName}
									value={name}
									editable={!loadingUpdateStudentUserById}
								/>
								<CustomInputForm
									label='Last Name'
									placeholder='Smith'
									placeholderTextColor={colors.darkLight}
									onChangeText={setLastName}
									value={lastName}
									editable={!loadingUpdateStudentUserById}
								/>
								<CustomInputForm
									label='Date of Birth'
									placeholder='YYY - MM - DD'
									placeholderTextColor={colors.darkLight}
									value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
									editable={false}
									onPress={() => !loadingUpdateStudentUserById && setShowDatePicker(true)}
								/>
								<CustomInputForm
									label='Level'
									placeholder='novice'
									placeholderTextColor={colors.darkLight}
									value={level}
									editable={false}
									onPress={() => !loadingUpdateStudentUserById && setOpenLevelModal(true)}
								/>
								<CustomInputForm
									label='Email'
									placeholder='manuel@gmail.com'
									placeholderTextColor={colors.darkLight}
									onChangeText={setEmail}
									value={email}
									editable={!loadingUpdateStudentUserById}
								/>
								<CustomInputForm
									label='Phone'
									placeholder='+506 1234 5678'
									placeholderTextColor={colors.darkLight}
									onChangeText={setPhone}
									value={phone}
									editable={!loadingUpdateStudentUserById}
								/>
								<CustomInputForm
									label='Notes'
									placeholder='This student has 3 brothers...'
									placeholderTextColor={colors.darkLight}
									onChangeText={setNotes}
									value={notes}
									editable={!loadingUpdateStudentUserById}
								/>
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
		</>
	)
}

export default StudentEditModal
