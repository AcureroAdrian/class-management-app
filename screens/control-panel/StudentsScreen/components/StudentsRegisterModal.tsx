import React, { useEffect, useState } from 'react'
import { View, Text, Modal } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import { levelsInitialValues } from '../helpers/student-screen-initial-values'
import { IFullStudent } from '../helpers/students-interfaces'
import { TUserLevel } from '@/shared/common-types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { registerStudents } from '@/redux/actions/userActions'
import { REGISTER_STUDENTS_RESET } from '@/redux/constants/userConstants'
import colors from '@/theme/colors'

const StudentsRegisterModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [studentName, setStudentName] = useState<string>('')
	const [studentLastName, setStudentLastName] = useState<string>('')
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
	const [dob, setDob] = useState<Date | undefined>(undefined)
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [notes, setNotes] = useState<string>('')
	const [level, setLevel] = useState<TUserLevel>()
	const [openLevelModal, setOpenLevelModal] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const { loadingRegisterStudents, errorRegisterStudents } = useAppSelector((state) => state.registerStudents)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENTS_RESET })
			closeModal()
		}
	}, [])

	const handleRegisterStudents = () => {
		if (!studentName?.length) {
			return setErrorMessage('First name is required')
		}
		if (!studentLastName?.length) {
			return setErrorMessage('Last name is required')
		}

		const studentData: IFullStudent = {
			name: studentName?.trim(),
			lastName: studentLastName?.trim(),
			phone,
			email,
			notes,
			level,
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
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
				<ScreenHeader
					label='Add Student'
					labelButton='Save'
					iconName='save'
					disabledButton={loadingRegisterStudents}
					loadingButtonAction={loadingRegisterStudents}
					handleOnPress={handleRegisterStudents}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<View style={{ width: '100%', flex: 1, padding: 20 }}>
					<CustomInputForm
						label='First Name'
						placeholder='Manuel'
						placeholderTextColor={colors.darkLight}
						onChangeText={setStudentName}
						value={studentName}
						editable={!loadingRegisterStudents}
					/>
					<CustomInputForm
						label='Last Name'
						placeholder='Smith'
						placeholderTextColor={colors.darkLight}
						onChangeText={setStudentLastName}
						value={studentLastName}
						editable={!loadingRegisterStudents}
					/>
					<CustomInputForm
						label='Date of Birth'
						placeholder='YYY - MM - DD'
						placeholderTextColor={colors.darkLight}
						value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
						editable={false}
						onPress={() => !loadingRegisterStudents && setShowDatePicker(true)}
					/>
					<CustomInputForm
						label='Level'
						placeholder='novice'
						placeholderTextColor={colors.darkLight}
						value={level}
						editable={false}
						onPress={() => !loadingRegisterStudents && setOpenLevelModal(true)}
					/>
					<CustomInputForm
						label='Email'
						placeholder='manuel@gmail.com'
						placeholderTextColor={colors.darkLight}
						onChangeText={setEmail}
						value={email}
						editable={!loadingRegisterStudents}
					/>
					<CustomInputForm
						label='Phone'
						placeholder='+506 1234 5678'
						placeholderTextColor={colors.darkLight}
						onChangeText={setPhone}
						value={phone}
						editable={!loadingRegisterStudents}
					/>
					<CustomInputForm
						label='Notes'
						placeholder='This student has 3 brothers...'
						placeholderTextColor={colors.darkLight}
						onChangeText={setNotes}
						value={notes}
						editable={!loadingRegisterStudents}
					/>
					{(errorMessage || errorRegisterStudents) && (
						<Text
							style={{
								textAlign: 'center',
								fontSize: 13,
								color: 'red',
							}}
						>
							{errorMessage || errorRegisterStudents}
						</Text>
					)}
				</View>
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

export default StudentsRegisterModal
