import React, { useMemo, useState } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import colors from '@/theme/colors'
import { useAppSelector } from '@/redux/store'
import SelectClassModal from './SelectClassModal'
import SelectStudentModal from './SelectStudentModal'
import capitalizeWords from '@/shared/capitalize-words'

const StudentReportModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const [classId, setClassId] = useState<string>('all')
	const [studentId, setStudentId] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showStartDate, setShowStartDate] = useState<boolean>(false)
	const [showEndDate, setShowEndDate] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date>(new Date())
	const [endDate, setEndDate] = useState<Date>(new Date())
	const [openClassesModal, setOpenClassesModal] = useState<boolean>(false)
	const [openStudentsModal, setOpenStudentsModal] = useState<boolean>(false)

	const { karateClassesByAdminList } = useAppSelector((state) => state.getKarateClassesByAdmin)
	const { studentUsersList } = useAppSelector((state) => state.getStudentUsers)

	const onChangeStartDate = (event, selectedDate) => {
		setErrorMessage(null)
		const currentDate = selectedDate || startDate
		setShowStartDate(false)
		setStartDate(currentDate)
	}
	const onChangeEndDate = (event, selectedDate) => {
		setErrorMessage(null)
		const currentDate = selectedDate || endDate
		setShowEndDate(false)
		setEndDate(currentDate)
	}
	const selectClass = (classId: string) => {
		setClassId(classId)
		setOpenClassesModal(false)
	}
	const selectStudent = (studentId: string) => {
		setStudentId(studentId)
		setOpenStudentsModal(false)
	}
	const classSelected = useMemo(() => {
		let result = 'All classes'
		if (classId !== 'all') {
			const karateClass = karateClassesByAdminList?.find((karateClass) => karateClass._id === classId)
			result = karateClass?.name
		}
		return result
	}, [karateClassesByAdminList, classId])
	const studentSelected = useMemo(() => {
		let result = 'Select a student'
		if (studentId?.length) {
			const studentSelected = studentUsersList?.find((student) => student._id === studentId)
			result = `${capitalizeWords(studentSelected?.name || '')} ${capitalizeWords(studentSelected?.lastName || '')}`
		}
		return result
	}, [studentUsersList, studentId])

	return (
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				<KeyboardAvoidingWrapper>
					<View>
						<ScreenHeader label='Student Report' showBackButton={true} handleBack={closeModal} />
						<View style={{ width: '100%', alignItems: 'center' }}>
							{showStartDate && (
								<DateTimePicker
									testID='startDateTimePicker'
									value={startDate}
									mode='date'
									is24Hour={true}
									display='default'
									onChange={onChangeStartDate}
									maximumDate={new Date()}
								/>
							)}
							{showEndDate && (
								<DateTimePicker
									testID='endDateTimePicker'
									value={endDate}
									mode='date'
									is24Hour={true}
									display='default'
									onChange={onChangeEndDate}
									maximumDate={new Date()}
								/>
							)}
							<Text style={{ padding: 20, fontSize: 16, color: colors.brand, textAlign: 'center' }}>
								Select student, class, start and end dates for the report
							</Text>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='Student'
									placeholderTextColor={colors.darkLight}
									value={studentSelected}
									editable={false}
									onPress={() => setOpenStudentsModal(true)}
								/>
							</View>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='Class'
									placeholderTextColor={colors.darkLight}
									value={classSelected}
									editable={false}
									onPress={() => setOpenClassesModal(true)}
								/>
							</View>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='Start Time'
									placeholderTextColor={colors.darkLight}
									value={startDate ? format(new Date(startDate), 'MMMM dd, yyyy') : ''}
									editable={false}
									onPress={() => setShowStartDate(true)}
								/>
							</View>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='End Time'
									placeholderTextColor={colors.darkLight}
									value={endDate ? format(new Date(endDate), 'MMMM dd, yyyy') : ''}
									editable={false}
									onPress={() => setShowEndDate(true)}
								/>
							</View>
							<Pressable onPress={closeModal}>
								<View
									style={{
										width: '100%',
										paddingHorizontal: 20,
										paddingVertical: 10,
										backgroundColor: colors.brand,
										borderRadius: 10,
										marginTop: 20,
									}}
								>
									<Text style={{ color: colors.primary }}>Generate Report</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</KeyboardAvoidingWrapper>
			</Modal>
			{openClassesModal && (
				<SelectClassModal
					openModal={openClassesModal}
					closeModal={() => setOpenClassesModal(false)}
					selectClass={selectClass}
				/>
			)}
			{openStudentsModal && (
				<SelectStudentModal
					openModal={openStudentsModal}
					closeModal={() => setOpenStudentsModal(false)}
					selectStudent={selectStudent}
				/>
			)}
		</>
	)
}

export default StudentReportModal
