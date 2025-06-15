import React, { useEffect, useMemo, useState } from 'react'
import { View, Modal, Image, Text, FlatList, Pressable, ScrollView } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import { registerStudentAttendance, updateStudentAttendanceById } from '@/redux/actions/studentAttendanceActions'
import {
	REGISTER_STUDENT_ATTENDANCE_RESET,
	UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET,
} from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { format } from 'date-fns'
import colors from '@/theme/colors'
import StudentNotesModal from './StudentNotesModal'
import AddStudentModal from './AddStudentModal'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

// Interface para el attendance item
interface IAttendanceItem {
	student: string
	name: string
	lastName: string
	attendanceStatus: 'present' | 'absent' | 'late'
	observations: string
	isDayOnly: boolean
	isTrial: boolean
	scheduledDeletionDate?: Date
	isRecovery: boolean
	recoveryClassId?: string
}

// Componente Badge reutilizable
const Badge = ({ text, backgroundColor, textColor }: { text: string; backgroundColor: string; textColor: string }) => (
	<View
		style={{
			backgroundColor,
			paddingHorizontal: 6,
			paddingVertical: 2,
			borderRadius: 8,
		}}
	>
		<Text style={{ color: textColor, fontSize: 10, fontWeight: '600' }}>{text}</Text>
	</View>
)

// Configuración de badges
const BADGE_CONFIG = {
	trial: { backgroundColor: '#FFF3CD', textColor: '#856404', text: 'TRIAL' },
	dayOnly: { backgroundColor: '#E1F5FE', textColor: '#01579B', text: 'DAY' },
	recovery: { backgroundColor: '#FFF9C4', textColor: '#F57F17', text: 'MAKEUP' },
	scheduledDeletion: { backgroundColor: '#FFEBEE', textColor: '#C62828', text: 'DEL' },
}

const AttendanceEditModal = ({
	openModal,
	closeModal,
	attendanceData,
}: {
	openModal: boolean
	closeModal: () => void
	attendanceData: any
}) => {
	const dispatch = useAppDispatch()

	const [attendance, setAttendance] = useState<IAttendanceItem[]>([])
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [openNotesModal, setOpenNotesModal] = useState<boolean>(false)
	const [selectedStudentForNotes, setSelectedStudentForNotes] = useState<any>(null)
	const [openAddStudentModal, setOpenAddStudentModal] = useState<boolean>(false)

	const { loadingRegisterStudentAttendance, errorRegisterStudentAttendance } = useAppSelector(
		(state) => state.registerStudentAttendance,
	)
	const { loadingUpdateStudentAttendanceById, errorUpdateStudentAttendanceById } = useAppSelector(
		(state) => state.updateStudentAttendanceById,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENT_ATTENDANCE_RESET })
			dispatch({ type: UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET })
			closeModal()
		}
	}, [])
	useEffect(() => {
		if (attendanceData && attendanceData.karateClass) {
			const attendanceItem: IAttendanceItem[] = []
			
			// Check for existing attendance
			if (attendanceData.attendance && attendanceData.attendance.length > 0) {
				// Real attendance exists
				attendanceData.attendance.forEach((studentAttendance: any) => {
					const studentInfo = attendanceData.karateClass.students.find(
						(student: any) => student._id === studentAttendance.student
					)
					
					attendanceItem.push({
						student: studentAttendance.student,
						name: studentInfo?.name || 'Unknown',
						lastName: studentInfo?.lastName || '',
						attendanceStatus: studentAttendance.attendanceStatus,
						observations: studentAttendance.observations || '',
						isDayOnly: studentAttendance.isDayOnly || false,
						isTrial: studentInfo?.isTrial || false,
						scheduledDeletionDate: studentInfo?.scheduledDeletionDate,
						isRecovery: studentAttendance.isRecovery || false,
						recoveryClassId: studentAttendance.recoveryClassId,
					})
				})
			} else {
				// Virtual attendance - create from class students
				const classStudents = attendanceData.karateClass.students || []
				const recoveryStudents = attendanceData.karateClass.recoveryClasses || []

				// Add regular class students
				classStudents.forEach((student: any) => {
					attendanceItem.push({
						student: student._id,
						name: student.name,
						lastName: student.lastName,
						attendanceStatus: 'absent',
						observations: '',
						isDayOnly: student.isDayOnly || false,
						isTrial: student.isTrial || false,
						scheduledDeletionDate: student.scheduledDeletionDate,
						isRecovery: false,
						recoveryClassId: undefined,
					})
				})

				// Add recovery students
				recoveryStudents.forEach((recoveryClass: any) => {
					if (recoveryClass.student && !attendanceItem.some(item => item.student === recoveryClass.student._id)) {
						attendanceItem.push({
							student: recoveryClass.student._id,
							name: recoveryClass.student.name,
							lastName: recoveryClass.student.lastName,
							attendanceStatus: 'absent',
							observations: '',
							isDayOnly: recoveryClass.student.isDayOnly || false,
							isTrial: recoveryClass.student.isTrial || false,
							scheduledDeletionDate: recoveryClass.student.scheduledDeletionDate,
							isRecovery: true,
							recoveryClassId: recoveryClass._id,
						})
					}
				})
			}

			setAttendance(attendanceItem)
		}
	}, [attendanceData])
	useEffect(() => {
		if (errorRegisterStudentAttendance) {
			setErrorMessage(errorRegisterStudentAttendance)
		}
	}, [errorRegisterStudentAttendance])
	useEffect(() => {
		if (errorUpdateStudentAttendanceById) {
			setErrorMessage(errorUpdateStudentAttendanceById)
		}
	}, [errorUpdateStudentAttendanceById])

	const handleSaveAtendance = () => {
		setErrorMessage(null)
		if (!attendance?.length) {
			setErrorMessage('No attendance found')
			return
		}

		const validAttendance = attendance?.map((e) => ({
			student: e?.student,
			attendanceStatus: e?.attendanceStatus,
			observations: e?.observations,
			isDayOnly: e?.isDayOnly,
			isRecovery: e?.isRecovery,
			recoveryClassId: e?.recoveryClassId,
		}))

		const studentAttendance = {
			karateClass: attendanceData?.karateClass?._id,
			date: attendanceData?.date,
			attendance: validAttendance,
		}

		// Check if it's a virtual attendance (starts with 'virtual-') or no _id
		if (attendanceData?.isVirtual || !attendanceData?._id || attendanceData?._id?.startsWith('virtual-')) {
			// Create new real attendance from virtual
			dispatch(registerStudentAttendance(studentAttendance))
		} else {
			// Update existing real attendance
			dispatch(updateStudentAttendanceById(attendanceData?._id, { attendance: validAttendance }))
		}
	}
	const handleSelectStudent = (studentId: string) => {
		setErrorMessage(null)
		setAttendance((prev) =>
			prev.map((item) => {
				if (item?.student === studentId) {
					item.attendanceStatus = item.attendanceStatus === 'present' ? 'absent' : 'present'
				}
				return item
			}),
		)
	}
	const handleOpenNotesModal = (student: any) => {
		setSelectedStudentForNotes(student)
		setOpenNotesModal(true)
	}
	const handleSaveNotes = (studentId: string, notes: string) => {
		setAttendance((prev) =>
			prev.map((item) => {
				if (item?.student === studentId) {
					item.observations = notes
				}
				return item
			}),
		)
		setOpenNotesModal(false)
		setSelectedStudentForNotes(null)
	}
	//MEMORIZE CONSTANTS
	const { presents, absents, late } = useMemo(() => {
		const presents = attendance?.filter((student) => student?.attendanceStatus === 'present')?.length
		const absents = attendance?.filter((student) => student?.attendanceStatus === 'absent')?.length
		const late = attendance?.filter((student) => student?.attendanceStatus === 'late')?.length

		return { presents, absents, late }
	}, [attendance])
	const canEdit = useMemo(() => {
		const today = new Date()
		const attendanceDate = new Date(
			attendanceData?.date?.year || 0,
			attendanceData?.date?.month - 1 || 0,
			attendanceData?.date?.day || 0,
			12,
			0,
		)
		// Allow editing for today and future dates (not past dates)
		return attendanceDate >= today || format(today, 'yyyy-MM-dd') === format(attendanceDate, 'yyyy-MM-dd')
	}, [attendanceData])

	const isToday = useMemo(() => {
		const today = new Date()
		const attendanceDate = new Date(
			attendanceData?.date?.year || 0,
			attendanceData?.date?.month - 1 || 0,
			attendanceData?.date?.day || 0,
			12,
			0,
		)
		return format(today, 'yyyy-MM-dd') === format(attendanceDate, 'yyyy-MM-dd')
	}, [attendanceData])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-start',
				}}
			>
				<ScreenHeader
					label='Attendance Info'
					labelButton={canEdit ? 'Save' : undefined}
					iconName={canEdit ? 'content-save' : undefined}
					disabledButton={loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
					loadingButtonAction={loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
					handleOnPress={handleSaveAtendance}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
					<Text style={{ fontSize: 18, fontWeight: 600, color: colors.variants.secondary[5] }}>
						{attendanceData?.karateClass?.name}
					</Text>
				</View>
				<View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 10 }}>
					<View
						style={{
							width: '100%',
							backgroundColor: colors.variants.secondary[1],
							padding: 10,
							height: 50,
							borderRadius: 20,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View style={{ flexDirection: 'row', gap: 15 }}>
							{Boolean(presents) && (
								<View
									style={{
										backgroundColor: 'green',
										padding: 5,
										width: 30,
										height: 30,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: '50%',
									}}
								>
									<Text style={{ color: colors.primary }}>{presents}</Text>
								</View>
							)}
							{Boolean(absents) && (
								<View
									style={{
										backgroundColor: colors.variants.primary[5],
										padding: 5,
										width: 30,
										height: 30,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: '50%',
									}}
								>
									<Text style={{ color: colors.primary }}>{absents}</Text>
								</View>
							)}
							{Boolean(late) && (
								<View
									style={{
										backgroundColor: colors.variants.primary[5],
										padding: 5,
										width: 30,
										height: 30,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: '50%',
									}}
								>
									<Text style={{ color: colors.primary }}>{late}</Text>
								</View>
							)}
						</View>
						<Text style={{ color: colors.variants.secondary[5], fontSize: 18, fontWeight: 500 }}>
							Total: {attendance?.length}
						</Text>
					</View>
				</View>
				{errorMessage && (
					<Text
						style={{
							textAlign: 'center',
							fontSize: 13,
							color: colors.variants.primary[5],
						}}
					>
						{errorMessage}
					</Text>
				)}
				<ScrollView>
					<FlatList
						nestedScrollEnabled={true}
						scrollEnabled={false}
						data={attendance.sort((a, b) => a?.name?.localeCompare(b?.name))}
						renderItem={({ item, index }) => (
							<>
								<Pressable
									onPress={() => handleSelectStudent(item.student)}
									disabled={!canEdit || loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
								>
									<View
										style={{
											flex: 1,
											paddingHorizontal: 20,
											paddingVertical: 8,
											alignItems: 'flex-start',
										}}
									>
										<View
											style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
										>
											<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
												<Image
													source={require('@/assets/img/default-avatar.png')}
													style={{ width: 50, height: 50, borderRadius: 50 }}
													resizeMode='contain'
												/>
												<View
													style={{
														justifyContent: 'center',
														alignItems: 'flex-start',
														width: '100%',
														flexDirection: 'column',
													}}
												>
													<Text numberOfLines={1} style={{ fontSize: 16, color: colors.view.black }}>
														{capitalizeWords(item.name)}
													</Text>
													<Text numberOfLines={1} style={{ fontSize: 14, color: colors.variants.grey[4] }}>
														{capitalizeWords(item?.lastName)}
													</Text>

													{/* Badges Container */}
													<View style={{ flexDirection: 'row', marginTop: 4, gap: 4 }}>
														{item.isTrial && (
															<Badge text='TRIAL' backgroundColor={BADGE_CONFIG.trial.backgroundColor} textColor={BADGE_CONFIG.trial.textColor} />
														)}
														{item.isDayOnly && (
															<Badge text='DAY' backgroundColor={BADGE_CONFIG.dayOnly.backgroundColor} textColor={BADGE_CONFIG.dayOnly.textColor} />
														)}
														{item.scheduledDeletionDate && (
															<Badge text='DEL' backgroundColor={BADGE_CONFIG.scheduledDeletion.backgroundColor} textColor={BADGE_CONFIG.scheduledDeletion.textColor} />
														)}
														{item.isRecovery  && (
															<Badge text='MAKEUP' backgroundColor={BADGE_CONFIG.recovery.backgroundColor} textColor={BADGE_CONFIG.recovery.textColor} />
														)}
													</View>
												</View>
											</View>
											<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
												{/* Notes Icon */}
													<Pressable
														onPress={() => handleOpenNotesModal(item)}
														disabled={!canEdit}
														style={{
															padding: 5,
															borderRadius: 5,
															backgroundColor: colors.variants.secondary[1],
															opacity: canEdit ? 1 : 0.5,
														}}
													>
														<MaterialCommunityIcons
															name='pencil'
															size={18}
															color={item.observations ? colors.variants.primary[5] : colors.variants.grey[4]}
														/>
													</Pressable>

												{/* Attendance Status Icon */}
												{item.attendanceStatus === 'present' && <AntDesign name='check' size={24} color='green' />}
												{item.attendanceStatus === 'absent' && <AntDesign name='close' size={24} color='red' />}
												{/* {item.attendanceStatus === 'late' && <AntDesign name='hourglass' size={24} color='skyblue' />}*/}
											</View>
										</View>
									</View>
								</Pressable>
								{index + 1 !== attendance.length && (
									<View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
										<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[0] }} />
									</View>
								)}
							</>
						)}
						keyExtractor={(item) => item.student}
					/>

					{/* Floating Add Student Button */}
					{canEdit && (
						<View style={{ alignItems: 'center', paddingVertical: 20 }}>
							<Pressable
								onPress={() => setOpenAddStudentModal(true)}
								style={{
									backgroundColor: colors.variants.primary[4],
									width: 60,
									height: 60,
									borderRadius: 30,
									justifyContent: 'center',
									alignItems: 'center',
									shadowColor: '#000',
									shadowOffset: {
										width: 0,
										height: 2,
									},
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
									elevation: 5,
								}}
							>
								<MaterialCommunityIcons name='account-plus' size={28} color={colors.primary} />
							</Pressable>
							<Text
								style={{
									marginTop: 8,
									fontSize: 12,
									color: colors.variants.grey[4],
									textAlign: 'center',
								}}
							>
								Agregar Estudiante
							</Text>
						</View>
					)}
				</ScrollView>
			</View>


			{/* Student Notes Modal */}
			
			<StudentNotesModal
				visible={openNotesModal}
				onClose={() => {
					setOpenNotesModal(false)
					setSelectedStudentForNotes(null)
				}}
				student={selectedStudentForNotes}
				onSave={handleSaveNotes}
			/>

			{/* Add Student Modal */}
			<AddStudentModal
				visible={openAddStudentModal}
				onClose={() => setOpenAddStudentModal(false)}
				attendanceId={attendanceData?._id}
				currentStudents={attendance.map((item) => item.student)}
				classId={attendanceData?.karateClass?._id}
				date={attendanceData?.date}
				onStudentAdded={() => {
					// Refresh attendance data when student is added
					// This would trigger a re-fetch of the attendance data
				}}
			/>
		</Modal>

	)
}

export default AttendanceEditModal
