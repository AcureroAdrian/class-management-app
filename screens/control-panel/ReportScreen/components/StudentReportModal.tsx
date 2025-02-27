import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import StudentReportDetailsModal from './StudentReportDetailsModal'
import SelectStudentModal from './SelectStudentModal'
import SelectClassModal from './SelectClassModal'
import { IStudentReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { TUserRole } from '@/shared/common-types'
import { getStudentReportForAdmin } from '@/redux/actions/studentAttendanceActions'
import { GET_STUDENT_REPORT_FOR_ADMIN_RESET } from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { getStudentUsers } from '@/redux/actions/userActions'

const StudentReportModal = ({
	openModal,
	closeModal,
	role,
}: {
	openModal: boolean
	closeModal: () => void
	role: TUserRole
}) => {
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
	const { karateClassesByStudentIdList } = useAppSelector((state) => state.getKarateClassesByStudentId)
	const { studentUsersList } = useAppSelector((state) => state.getStudentUsers)
	const {
		loadingStudentReportForAdmin,
		successStudentReportForAdmin,
		studentReportForAdminList,
		errorStudentReportForAdmin,
	} = useAppSelector((state) => state.getStudentReportForAdmin)
	const { userInfo } = useAppSelector((state) => state.userLogin)

	useEffect(() => {
		if (role === 'student') {
			setStudentId(userInfo?._id || '')
		} else {
			dispatch(getStudentUsers('students'))
		}
	}, [userInfo])
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
			const karateClass = (karateClassesByAdminList || karateClassesByStudentIdList)?.find(
				(karateClass) => karateClass._id === classId,
			)
			result = karateClass?.name
		}
		return result
	}, [karateClassesByAdminList, karateClassesByStudentIdList, classId])
	const studentSelected = useMemo(() => {
		let result = 'Select a student'
		if (studentId?.length) {
			const studentSelected = studentUsersList?.find((student) => student._id === studentId)
			result = `${capitalizeWords(studentSelected?.name || '')} ${capitalizeWords(studentSelected?.lastName || '')}`
		}
		if (role === 'student') {
			result = `${capitalizeWords(userInfo?.name || '')} ${capitalizeWords(userInfo?.lastName || '')}`
		}
		return result
	}, [studentUsersList, studentId, userInfo, role])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View>
				<ScreenHeader label='Student Report' showBackButton={true} handleBack={closeModal} />
				<View style={{ width: '100%', alignItems: 'center' }}>
					<Text style={{ padding: 20, fontSize: 16, color: colors.brand, textAlign: 'center' }}>
						{role === 'student'
							? 'Select class, start and end dates for the report'
							: 'Select student, class, start and end dates for the report'}
					</Text>
					<View style={{ width: '100%', paddingHorizontal: 20, gap: 40 }}>
						<CustomInputForm
							label='Student'
							value={studentSelected}
							editable={false}
							onPress={() => role === 'admin' && !loadingStudentReportForAdmin && setOpenStudentsModal(true)}
							icon='account'
						/>
						<CustomInputForm
							label='Class'
							value={classSelected}
							editable={false}
							onPress={() => !loadingStudentReportForAdmin && setOpenClassesModal(true)}
							icon='book'
						/>
						<CustomInputForm
							label='Start Time'
							value={startDate ? format(new Date(startDate), 'MMMM dd, yyyy') : ''}
							editable={false}
							onPress={() => !loadingStudentReportForAdmin && setShowStartDate(true)}
							icon='calendar'
						/>
						<CustomInputForm
							label='End Time'
							value={endDate ? format(new Date(endDate), 'MMMM dd, yyyy') : ''}
							editable={false}
							onPress={() => !loadingStudentReportForAdmin && setShowEndDate(true)}
							icon='calendar'
						/>
					</View>
					<Pressable onPress={handleGenerateClassReport}>
						<View
							style={{
								paddingHorizontal: 40,
								paddingVertical: 10,
								backgroundColor: colors.variants.secondary[5],
								borderRadius: 10,
								marginTop: 40,
								height: 40,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{loadingStudentReportForAdmin ? (
								<ActivityIndicator size='small' color={colors.view.primary} />
							) : (
								<Text style={{ color: colors.view.primary, fontSize: 16, fontWeight: 500 }}>Generate Report</Text>
							)}
						</View>
					</Pressable>
					{errorMessage && (
						<View style={{ marginTop: 40, width: '100%', alignItems: 'center' }}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 16,
									color: colors.variants.primary[5],
								}}
							>
								{errorMessage}
							</Text>
						</View>
					)}
				</View>
			</View>
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
		</Modal>
	)
}

export default StudentReportModal
