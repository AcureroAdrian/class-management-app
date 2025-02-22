import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import StudentReportDetailsModal from './StudentReportDetailsModal'
import SelectStudentModal from './SelectStudentModal'
import SelectClassModal from './SelectClassModal'
import { IStudentReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentReportForAdmin } from '@/redux/actions/studentAttendanceActions'
import { GET_STUDENT_REPORT_FOR_ADMIN_RESET } from '@/redux/constants/studentAttendanceConstants'
import colors from '@/theme/colors'

const StudentReportModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [classId, setClassId] = useState<string>('all')
	const [studentId, setStudentId] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showStartDate, setShowStartDate] = useState<boolean>(false)
	const [showEndDate, setShowEndDate] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date>(new Date())
	const [endDate, setEndDate] = useState<Date>(new Date())
	const [openClassesModal, setOpenClassesModal] = useState<boolean>(false)
	const [openStudentsModal, setOpenStudentsModal] = useState<boolean>(false)
	const [studentReportByStudentId, setStudentReportByStudentId] = useState<IStudentReport[]>([])
	const [openStudentReportDetailsModal, setOpenStudentReportDetailsModal] = useState<boolean>(false)

	const { karateClassesByAdminList } = useAppSelector((state) => state.getKarateClassesByAdmin)
	const { studentUsersList } = useAppSelector((state) => state.getStudentUsers)
	const {
		loadingStudentReportForAdmin,
		successStudentReportForAdmin,
		studentReportForAdminList,
		errorStudentReportForAdmin,
	} = useAppSelector((state) => state.getStudentReportForAdmin)

	useEffect(() => {
		if (successStudentReportForAdmin) {
			setStudentReportByStudentId(studentReportForAdminList || [])
			setOpenStudentReportDetailsModal(true)
			dispatch({ type: GET_STUDENT_REPORT_FOR_ADMIN_RESET })
		}
	}, [successStudentReportForAdmin])
	useEffect(() => {
		if (errorStudentReportForAdmin) {
			setErrorMessage(errorStudentReportForAdmin)
			dispatch({ type: GET_STUDENT_REPORT_FOR_ADMIN_RESET })
		}
	}, [errorStudentReportForAdmin])

	const onChangeStartDate = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || startDate
		setStartDate(currentDate)
		setShowStartDate(false)
	}
	const onChangeEndDate = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || endDate
		setEndDate(currentDate)
		setShowEndDate(false)
	}
	const selectClass = (classId: string) => {
		setErrorMessage(null)
		setClassId(classId)
		setOpenClassesModal(false)
	}
	const selectStudent = (studentId: string) => {
		setErrorMessage(null)
		setStudentId(studentId)
		setOpenStudentsModal(false)
	}
	const handleGenerateClassReport = () => {
		if (!startDate || !endDate) {
			setErrorMessage('Please select start and end dates.')
			return
		}
		if (!studentId) {
			setErrorMessage('Please select a student for the report and press Generate Report button again.')
			return
		}

		dispatch(
			getStudentReportForAdmin(
				studentId,
				classId,
				format(new Date(startDate), 'yyyy-MM-dd'),
				format(new Date(endDate), 'yyyy-MM-dd'),
			),
		)
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
							<Pressable onPress={handleGenerateClassReport}>
								<View
									style={{
										paddingHorizontal: 20,
										paddingVertical: 10,
										backgroundColor: colors.brand,
										borderRadius: 10,
										marginTop: 20,
										height: 40,
										justifyContent: 'center',
										alignItems: 'center',
										width: 200,
									}}
								>
									{loadingStudentReportForAdmin ? (
										<ActivityIndicator size='small' color={colors.primary} />
									) : (
										<Text style={{ color: colors.primary }}>Generate Report</Text>
									)}
								</View>
							</Pressable>
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
						</View>
					</View>
				</KeyboardAvoidingWrapper>
			</Modal>
			{showStartDate && (
				<DateTimePickerModal
					isVisible={showStartDate}
					mode='date'
					onConfirm={onChangeStartDate}
					onCancel={() => setShowStartDate(false)}
					display='spinner'
					date={startDate}
					maximumDate={new Date()}
				/>
			)}
			{showEndDate && (
				<DateTimePickerModal
					isVisible={showEndDate}
					mode='date'
					onConfirm={onChangeEndDate}
					onCancel={() => setShowEndDate(false)}
					display='spinner'
					date={endDate}
					maximumDate={new Date()}
				/>
			)}
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
			{openStudentReportDetailsModal && (
				<StudentReportDetailsModal
					openModal={openStudentReportDetailsModal}
					closeModal={() => [setOpenStudentReportDetailsModal(false), setStudentReportByStudentId([])]}
					studentReports={studentReportByStudentId}
				/>
			)}
		</>
	)
}

export default StudentReportModal
