import React, { useEffect, useState } from 'react'
import { View, Modal, Image, Text } from 'react-native'
import { format } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import getStudentDataToUpdate from '../helpers/get-student-data-to-update'
import { IFullStudent } from '../helpers/students-interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUserById, updateStudentUserById } from '@/redux/actions/userActions'
import { GET_STUDENT_USER_BY_ID_RESET, UPDATE_STUDENT_USER_BY_ID_RESET } from '@/redux/constants/userConstants'
import capitalizeWords from '@/shared/capitalize-words'
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
	const [dob, setDob] = useState<Date | null>(null)
	const [date, setDate] = useState<Date>(new Date(2000, 0, 1))
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [notes, setNotes] = useState<string>('')

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
			setName(capitalizeWords(studentUserById?.name || ''))
			setLastName(capitalizeWords(studentUserById?.lastName || ''))
			setPhone(studentUserById?.phone || '')
			setEmail(studentUserById?.email || '')
			setNotes(studentUserById?.notes || '')
			if (studentUserById?.dateOfBirth?.year) {
				const dob = new Date(
					studentUserById?.dateOfBirth?.year,
					studentUserById?.dateOfBirth?.month - 1,
					studentUserById?.dateOfBirth?.day,
				)
				setDob(dob)
				setDate(dob)
			}
		}
	}, [successGetStudentUserById])

	const handleUpdateStudent = () => {
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
	const handleSelectDob = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShowDatePicker(false)
		setDate(currentDate)
		setDob(currentDate)
	}

	return (
		<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
			{loadingGetStudentUserById ||
				(loadingUpdateStudentUserById && (
					<CustomBackdrop
						openBackdrop={loadingGetStudentUserById || loadingUpdateStudentUserById}
						label='Loading ...'
					/>
				))}
			{showDatePicker && (
				<DateTimePicker
					testID='dateTimePicker'
					value={date}
					mode='date'
					is24Hour={true}
					display='default'
					onChange={handleSelectDob}
				/>
			)}
			<View>
				<View>
					<ScreenHeader
						label='Student Info'
						labelButton='Save'
						iconName='save'
						disabledButton={loadingGetStudentUserById || loadingUpdateStudentUserById}
						handleOnPress={handleUpdateStudent}
						showBackButton={true}
						handleBack={closeModal}
					/>
					<View
						style={{
							width: '100%',
							alignItems: 'flex-start',
							flexDirection: 'row',
							justifyContent: 'space-between',
							padding: 10,
						}}
					>
						<View
							style={{
								flex: 1,
								height: 120,
								alignItems: 'center',
								justifyContent: 'center',
								marginHorizontal: 20,
								borderColor: colors.brand,
								borderWidth: 2,
								borderRadius: 10,
								marginTop: 10,
								backgroundColor: 'skyblue',
							}}
						>
							<Image
								resizeMode='contain'
								style={{ width: 90, height: 90, tintColor: colors.brand }}
								source={require('@/assets/img/camera.png')}
							/>
						</View>
						<View style={{ width: '60%', alignItems: 'center' }}>
							<View style={{ width: '90%' }}>
								<CustomInputForm
									label='First Name'
									placeholder='Manuel'
									placeholderTextColor={colors.darkLight}
									onChangeText={setName}
									value={name}
								/>
								<CustomInputForm
									label='Last Name'
									placeholder='Smith'
									placeholderTextColor={colors.darkLight}
									onChangeText={setLastName}
									value={lastName}
								/>
							</View>
						</View>
					</View>
					<View style={{ padding: 20 }}>
						<CustomInputForm
							label='Date of Birth'
							placeholder='YYY - MM - DD'
							placeholderTextColor={colors.darkLight}
							value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
							editable={false}
							onPress={() => setShowDatePicker(true)}
						/>
						<CustomInputForm
							label='Email'
							placeholder='manuel@gmail.com'
							placeholderTextColor={colors.darkLight}
							onChangeText={setEmail}
							value={email}
						/>
						<CustomInputForm
							label='Phone'
							placeholder='+506 1234 5678'
							placeholderTextColor={colors.darkLight}
							onChangeText={setPhone}
							value={phone}
						/>
						<CustomInputForm
							label='Notes'
							placeholder='This student has 3 brothers...'
							placeholderTextColor={colors.darkLight}
							onChangeText={setNotes}
							value={notes}
						/>
					</View>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 13,
							color: 'red',
						}}
					>
						{errorMessage || errorGetStudentUserById || errorUpdateStudentUserById}
					</Text>
				</View>
			</View>
		</Modal>
	)
}

export default StudentEditModal
