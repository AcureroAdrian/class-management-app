import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator, ScrollView } from 'react-native'
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
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
			setErrorMessage('Please select a student and press Generate Report again.')
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
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='Student Report' showBackButton={true} handleBack={closeModal} />
				
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
					showsVerticalScrollIndicator={false}
				>
					{/* Header Section */}
					<View style={{ marginBottom: 32 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
							<View style={{ 
								backgroundColor: colors.brand,
								borderRadius: 12,
								padding: 8,
								marginRight: 12
							}}>
								<MaterialCommunityIcons name="account-search" size={24} color={colors.view.primary} />
							</View>
							<Text style={{ 
								fontSize: 24, 
								fontWeight: '700', 
								color: colors.variants.secondary[5],
								flex: 1,
								letterSpacing: -0.5
							}}>
								Individual Report
							</Text>
						</View>
						<Text style={{ 
							fontSize: 16, 
							color: colors.variants.grey[4],
							lineHeight: 22,
							marginLeft: 52,
							letterSpacing: -0.2
						}}>
							{role === 'student'
								? 'Select class and dates for your report'
								: 'Select student, class and dates for the report'}
						</Text>
					</View>

					{/* Form Section */}
					<View style={{ 
						backgroundColor: colors.view.primary,
						borderRadius: 16,
						padding: 20,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.1,
						shadowRadius: 8,
						elevation: 3,
						borderWidth: 1,
						borderColor: colors.variants.secondary[1],
						marginBottom: 24
					}}>
						<Text style={{ 
							fontSize: 16, 
							fontWeight: '600', 
							color: colors.variants.secondary[5],
							marginBottom: 20,
							letterSpacing: -0.3
						}}>
							Report Configuration
						</Text>
						
						<View style={{ gap: 20 }}>
							{/* Student Selection */}
							<View>
								<Text style={{ 
									fontSize: 14, 
									fontWeight: '500', 
									color: colors.variants.secondary[4],
									marginBottom: 8,
									letterSpacing: -0.2
								}}>
									Student
								</Text>
								<CustomInputForm
									label=''
									value={studentSelected}
									editable={false}
									onPress={() => role === 'admin' && !loadingStudentReportForAdmin && setOpenStudentsModal(true)}
									icon='account'
								/>
							</View>

							{/* Class Selection */}
							<View>
								<Text style={{ 
									fontSize: 14, 
									fontWeight: '500', 
									color: colors.variants.secondary[4],
									marginBottom: 8,
									letterSpacing: -0.2
								}}>
									Class
								</Text>
								<CustomInputForm
									label=''
									value={classSelected}
									editable={false}
									onPress={() => !loadingStudentReportForAdmin && setOpenClassesModal(true)}
									icon='google-classroom'
								/>
							</View>

							{/* Date Range */}
							<View>
								<Text style={{ 
									fontSize: 14, 
									fontWeight: '500', 
									color: colors.variants.secondary[4],
									marginBottom: 8,
									letterSpacing: -0.2
								}}>
									Date Range
								</Text>
								<View style={{ flexDirection: 'row', gap: 12 }}>
									<View style={{ flex: 1 }}>
										<CustomInputForm
											label=''
											value={startDate ? format(new Date(startDate), 'MM/dd/yyyy') : ''}
											editable={false}
											onPress={() => !loadingStudentReportForAdmin && setShowStartDate(true)}
											icon='calendar-start'
										/>
									</View>
									<View style={{ flex: 1 }}>
										<CustomInputForm
											label=''
											value={endDate ? format(new Date(endDate), 'MM/dd/yyyy') : ''}
											editable={false}
											onPress={() => !loadingStudentReportForAdmin && setShowEndDate(true)}
											icon='calendar-end'
										/>
									</View>
								</View>
							</View>
						</View>
					</View>

					{/* Generate Button */}
					<Pressable 
						onPress={handleGenerateClassReport}
						disabled={loadingStudentReportForAdmin}
						style={({ pressed }) => [
							{
								backgroundColor: colors.brand,
								borderRadius: 12,
								paddingVertical: 16,
								paddingHorizontal: 24,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								shadowColor: colors.brand,
								shadowOffset: { width: 0, height: 4 },
								shadowOpacity: 0.3,
								shadowRadius: 8,
								elevation: 8,
								opacity: loadingStudentReportForAdmin ? 0.7 : 1,
								transform: [{ scale: pressed ? 0.98 : 1 }],
								marginBottom: 24
							}
						]}
					>
						{loadingStudentReportForAdmin ? (
							<>
								<ActivityIndicator size='small' color={colors.view.primary} style={{ marginRight: 8 }} />
								<Text style={{ 
									color: colors.view.primary, 
									fontSize: 16, 
									fontWeight: '600',
									letterSpacing: -0.2
								}}>
									Generating...
								</Text>
							</>
						) : (
							<>
								<MaterialCommunityIcons name="file-document-outline" size={20} color={colors.view.primary} style={{ marginRight: 8 }} />
								<Text style={{ 
									color: colors.view.primary, 
									fontSize: 16, 
									fontWeight: '600',
									letterSpacing: -0.2
								}}>
									Generate Report
								</Text>
							</>
						)}
					</Pressable>

					{/* Error Message */}
					{errorMessage && (
						<View style={{ 
							backgroundColor: '#FFF5F5',
							borderRadius: 12,
							padding: 16,
							borderLeftWidth: 4,
							borderLeftColor: colors.variants.primary[5],
							marginBottom: 24
						}}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<MaterialCommunityIcons name="alert-circle" size={20} color={colors.variants.primary[5]} />
								<Text style={{ 
									fontSize: 14, 
									color: colors.variants.primary[5],
									marginLeft: 8,
									fontWeight: '500'
								}}>
									{errorMessage}
								</Text>
							</View>
						</View>
					)}

					{/* Info Section */}
					<View style={{
						backgroundColor: colors.variants.secondary[1],
						borderRadius: 12,
						padding: 16,
						borderLeftWidth: 4,
						borderLeftColor: colors.brand
					}}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
							<MaterialCommunityIcons name="information" size={18} color={colors.brand} />
							<Text style={{ 
								fontSize: 14, 
								fontWeight: '600', 
								color: colors.variants.secondary[5],
								marginLeft: 8,
								letterSpacing: -0.2
							}}>
								Report Information
							</Text>
						</View>
						<Text style={{ 
							fontSize: 13, 
							color: colors.variants.secondary[3],
							lineHeight: 18,
							letterSpacing: -0.1
						}}>
							This report shows individual attendance history with detailed charts and statistics
						</Text>
					</View>
				</ScrollView>
			</View>

			{/* Date Pickers */}
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
