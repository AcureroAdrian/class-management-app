import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Modal, Image, Text, FlatList, Pressable, ScrollView, Alert } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import {
	getStudentAttendanceByDay,
	registerStudentAttendance,
	updateStudentAttendanceById,
} from '@/redux/actions/studentAttendanceActions'
import {
	REGISTER_STUDENT_ATTENDANCE_RESET,
	UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET,
} from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import colors from '@/theme/colors'
import StudentNotesModal from '../StudentNotesModal'
import AddStudentModal from '../AddStudentModal'
import AttendanceStatusModal from '../AttendanceStatusModal'
import TrialStudentModal from '../TrialStudentModal'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { TAttendanceStatus } from '@/shared/common-types'
import { getMacroStatus, toggleBasicAttendance, isStudentPresent } from '@/shared/attendance-helpers'
import StatusIcon from '@/shared/StatusIcon'
import { Badge, BADGE_CONFIG } from '@/shared/Badge'
import {
	ClassName,
	DayWeekText,
	ModalContainer,
	CompactHeaderContainer,
	ClassInfoRow,
	ClassDetails,
	AttendanceSummary,
	SummaryMini,
	SummaryBadgeMini,
	SummaryBadgeTextMini,
	TotalTextMini,
	SearchContainer,
	SearchInputContainer,
	SearchInput,
	ClearSearchButton,
	ErrorMessage,
	StudentListItem,
	StudentListItemContainer,
	StudentListItemContent,
	StudentInfoContainer,
	StudentAvatar,
	StudentTextContainer,
	StudentName,
	StudentLastName,
	StudentBadgesContainer,
	StudentActionsContainer,
	NotesIndicator,
	MoreOptionsButton,
	Separator,
	SeparatorLine,
	FloatingButtonContainer,
	FloatingButton,
	FloatingButtonText,
} from './styles'

// Interface para el attendance item
interface IAttendanceItem {
	student: string
	name: string
	lastName: string
	attendanceStatus: TAttendanceStatus
	observations: string
	isDayOnly: boolean
	isTrial: boolean
	scheduledDeletionDate?: Date
	isRecovery: boolean
	recoveryClassId?: string
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

	const [initialAttendance, setInitialAttendance] = useState<IAttendanceItem[]>([])
	const [attendance, setAttendance] = useState<IAttendanceItem[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [openNotesModal, setOpenNotesModal] = useState<boolean>(false)
	const [selectedStudentForNotes, setSelectedStudentForNotes] = useState<any>(null)
	const [openAddStudentModal, setOpenAddStudentModal] = useState<boolean>(false)
	const [openTrialStudentModal, setOpenTrialStudentModal] = useState<boolean>(false)
	const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)
	const [selectedStudentForStatus, setSelectedStudentForStatus] = useState<IAttendanceItem | null>(null)

	const { loadingRegisterStudentAttendance, errorRegisterStudentAttendance, successRegisterStudentAttendance } = useAppSelector(
		(state) => state.registerStudentAttendance,
	)
	const { loadingUpdateStudentAttendanceById, errorUpdateStudentAttendanceById, successUpdateStudentAttendanceById } = useAppSelector(
		(state) => state.updateStudentAttendanceById,
	)
	const { successStudentAttendanceByDay, studentAttendanceByDayList } = useAppSelector(
		(state) => state.getStudentAttendanceByDay,
	)

	const dayAndWeekDay = useMemo(() => {
		if (!attendanceData?.date) return ''
		const attendanceDate = new Date(
			attendanceData?.date?.year,
			attendanceData?.date?.month - 1,
			attendanceData?.date?.day,
		)
		return format(attendanceDate, 'EEEE MMMM d', { locale: enUS })
	}, [attendanceData?.date])

	const handleSetAttendance = (data: any) => {
		const attendanceItem: IAttendanceItem[] = []
		// Check for existing attendance
		if (data.attendance && data.attendance.length > 0) {
			// Real attendance exists
			data.attendance.forEach((studentAttendance: any) => {
				const studentInfo = data.karateClass.students.find(
					(student: any) => student._id === studentAttendance.student,
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
			const classStudents = data.karateClass.students || []
			const recoveryStudents = data.karateClass.recoveryClasses || []

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
					isRecovery: student.isRecovery || false,
					recoveryClassId: undefined,
				})
			})

			// Add recovery students
			recoveryStudents.forEach((recoveryClass: any) => {
				if (recoveryClass.student && !attendanceItem.some((item) => item.student === recoveryClass.student._id)) {
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
		setInitialAttendance(JSON.parse(JSON.stringify(attendanceItem)))
	}

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENT_ATTENDANCE_RESET })
			dispatch({ type: UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET })
			closeModal()
		}
	}, [])

	useEffect(() => {
		if (studentAttendanceByDayList) {
			const updatedAttendance = studentAttendanceByDayList?.attendances.find(
				(item: any) => item.karateClass._id === attendanceData.karateClass._id,
			)
			if (updatedAttendance) {
				handleSetAttendance(updatedAttendance)
			}
		} else if (attendanceData && attendanceData.karateClass) {
			handleSetAttendance(attendanceData)
		}
	}, [studentAttendanceByDayList, attendanceData])

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

	useEffect(() => {
		if (successRegisterStudentAttendance) {
			// Refresh attendance data after successful registration
			dispatch(
				getStudentAttendanceByDay(
					attendanceData?.date?.year,
					attendanceData?.date?.month,
					attendanceData?.date?.day,
				),
			)
		}
	}, [successRegisterStudentAttendance])

	useEffect(() => {
		if (successUpdateStudentAttendanceById) {
			// Refresh attendance data after successful update
			dispatch(
				getStudentAttendanceByDay(
					attendanceData?.date?.year,
					attendanceData?.date?.month,
					attendanceData?.date?.day,
				),
			)
		}
	}, [successUpdateStudentAttendanceById])

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
		setInitialAttendance(JSON.parse(JSON.stringify(attendance)))
	}

	const handleSelectStudent = (studentId: string) => {
		setErrorMessage(null)
		setAttendance((prev) =>
			prev.map((item) => {
				if (item?.student === studentId) {
					item.attendanceStatus = toggleBasicAttendance(item.attendanceStatus)
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

	const handleOpenStatusModal = (student: IAttendanceItem) => {
		setSelectedStudentForStatus(student)
		setOpenStatusModal(true)
	}

	const handleSelectStatus = (status: TAttendanceStatus) => {
		if (selectedStudentForStatus) {
			setAttendance((prev) =>
				prev.map((item) => {
					if (item?.student === selectedStudentForStatus.student) {
						item.attendanceStatus = status
					}
					return item
				}),
			)
		}
		setOpenStatusModal(false)
		setSelectedStudentForStatus(null)
	}

	const handleClose = () => {
		const isDirty = JSON.stringify(initialAttendance) !== JSON.stringify(attendance)
		if (isDirty) {
			Alert.alert('Discard Changes?', 'You have unsaved changes. Are you sure you want to discard them?', [
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Discard',
					onPress: () => closeModal(),
					style: 'destructive',
				},
			])
		} else {
			closeModal()
		}
	}

	//MEMORIZE CONSTANTS
	const { presents, absents, late } = useMemo(() => {
		const presents = attendance?.filter((student) => isStudentPresent(student?.attendanceStatus))?.length
		const absents = attendance?.filter((student) => !isStudentPresent(student?.attendanceStatus))?.length
		const late = attendance?.filter((student) => student?.attendanceStatus === 'late')?.length

		return { presents, absents, late }
	}, [attendance])
	const filteredAttendance = useMemo(() => {
		if (!searchQuery.trim()) return attendance.sort((a, b) => a?.name?.localeCompare(b?.name))
		
		return attendance
			.filter(item => 
				item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.lastName.toLowerCase().includes(searchQuery.toLowerCase())
			)
			.sort((a, b) => a?.name?.localeCompare(b?.name))
	}, [attendance, searchQuery])

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
		<Modal visible={openModal} animationType='fade' onRequestClose={handleClose} statusBarTranslucent={true}>
			<ModalContainer>
				<ScreenHeader
					label='Attendance Info'
					labelButton={canEdit ? 'Save' : undefined}
					iconName={canEdit ? 'content-save' : undefined}
					disabledButton={loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
					loadingButtonAction={loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
					handleOnPress={handleSaveAtendance}
					showBackButton={true}
					handleBack={handleClose}
				/>
				<CompactHeaderContainer>
					<ClassInfoRow>
						<ClassDetails>
							<ClassName>{attendanceData?.karateClass?.name}</ClassName>
							<DayWeekText>{dayAndWeekDay}</DayWeekText>
						</ClassDetails>
						<AttendanceSummary>
							<SummaryMini>
								{Boolean(presents) && (
									<SummaryBadgeMini type='present'>
										<SummaryBadgeTextMini>{presents}</SummaryBadgeTextMini>
									</SummaryBadgeMini>
								)}
								{Boolean(absents) && (
									<SummaryBadgeMini type='absent'>
										<SummaryBadgeTextMini>{absents}</SummaryBadgeTextMini>
									</SummaryBadgeMini>
								)}
								{Boolean(late) && (
									<SummaryBadgeMini type='late'>
										<SummaryBadgeTextMini>{late}</SummaryBadgeTextMini>
									</SummaryBadgeMini>
								)}
							</SummaryMini>
							<TotalTextMini>Total: {attendance?.length}</TotalTextMini>
						</AttendanceSummary>
					</ClassInfoRow>
					<SearchContainer>
						<SearchInputContainer>
							<MaterialCommunityIcons name='magnify' size={20} color={colors.variants.grey[3]} />
							<SearchInput
								placeholder="Search student..."
								placeholderTextColor={colors.variants.grey[3]}
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
							{searchQuery.length > 0 && (
								<ClearSearchButton onPress={() => setSearchQuery('')}>
									<MaterialCommunityIcons name='close-circle' size={20} color={colors.variants.grey[3]} />
								</ClearSearchButton>
							)}
						</SearchInputContainer>
					</SearchContainer>
				</CompactHeaderContainer>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<ScrollView contentContainerStyle={{ paddingBottom: canEdit ? 120 : 24 }}>
					<FlatList
						nestedScrollEnabled={true}
						scrollEnabled={false}
						data={filteredAttendance}
						renderItem={({ item, index }) => (
						<>
							<StudentListItem
								onPress={() => handleSelectStudent(item.student)}
								disabled={!canEdit || loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
							>
								<StudentListItemContainer>
									<StudentListItemContent>
										<StudentInfoContainer>
											<StudentAvatar
												source={require('@/assets/img/default-avatar.png')}
												resizeMode='contain'
											/>
											<StudentTextContainer>
												<StudentName numberOfLines={1}>
													{capitalizeWords(item.name)}
												</StudentName>
												<StudentLastName numberOfLines={1}>
													{capitalizeWords(item?.lastName)}
												</StudentLastName>

												{/* Badges Container */}
												<StudentBadgesContainer>
													{item.isTrial && <Badge {...BADGE_CONFIG.trial} />}
													{item.isDayOnly && <Badge {...BADGE_CONFIG.dayOnly} />}
													{item.scheduledDeletionDate && <Badge {...BADGE_CONFIG.scheduledDeletion} />}
													{item.isRecovery && <Badge {...BADGE_CONFIG.recovery} />}
												</StudentBadgesContainer>
											</StudentTextContainer>
										</StudentInfoContainer>
										<StudentActionsContainer>
											{/* Notes Indicator */}
											{item.observations && (
												<NotesIndicator>
													<MaterialCommunityIcons name='pencil' size={14} color={colors.variants.primary[5]} />
												</NotesIndicator>
											)}

											{/* Attendance Status Icon */}
											<StatusIcon status={item.attendanceStatus} size={24} />

											{/* Three Dots Menu */}
											<MoreOptionsButton onPress={() => handleOpenStatusModal(item)} disabled={!canEdit}>
												<MaterialCommunityIcons name='dots-horizontal' size={16} color={colors.variants.grey[4]} />
											</MoreOptionsButton>
										</StudentActionsContainer>
									</StudentListItemContent>
								</StudentListItemContainer>
							</StudentListItem>
							{index + 1 !== filteredAttendance.length && (
								<Separator>
									<SeparatorLine />
								</Separator>
							)}
						</>
					)}
					keyExtractor={(item) => item.student}
				/>
				</ScrollView>

				{/* Floating Add Student Button */}
				{canEdit && (
					<FloatingButtonContainer>
						<FloatingButton onPress={() => setOpenAddStudentModal(true)}>
							<MaterialCommunityIcons name='account-plus' size={24} color={colors.primary} />
						</FloatingButton>
						<FloatingButtonText>Add Student</FloatingButtonText>
					</FloatingButtonContainer>
				)}
			</ModalContainer>

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
				onOpenTrial={() => {
					setOpenAddStudentModal(false)
					setOpenTrialStudentModal(true)
				}}
				attendanceId={attendanceData?._id}
				currentStudents={attendance.map((item) => item.student)}
				classId={attendanceData?.karateClass?._id}
				date={attendanceData?.date}
				onStudentAdded={() => {
					// Refresh attendance data when student is added
					// This would trigger a re-fetch of the attendance data
					dispatch(
						getStudentAttendanceByDay(
							attendanceData?.date?.year,
							attendanceData?.date?.month,
							attendanceData?.date?.day,
						),
					)
					setOpenAddStudentModal(false)
				}}
			/>

			{/* Trial Student Modal */}
			<TrialStudentModal
				visible={openTrialStudentModal}
				onClose={() => setOpenTrialStudentModal(false)}
				attendanceId={attendanceData?._id}
				classId={attendanceData?.karateClass?._id}
				date={attendanceData?.date}
				onStudentAdded={() => {
					dispatch(
						getStudentAttendanceByDay(
							attendanceData?.date?.year,
							attendanceData?.date?.month,
							attendanceData?.date?.day,
						),
					)
					setOpenTrialStudentModal(false)
				}}
			/>

			{/* Attendance Status Modal */}
			<AttendanceStatusModal
				visible={openStatusModal}
				onClose={() => {
					setOpenStatusModal(false)
					setSelectedStudentForStatus(null)
				}}
				onSelectStatus={handleSelectStatus}
				onAddNote={() => {
					if (selectedStudentForStatus) {
						handleOpenNotesModal(selectedStudentForStatus)
					}
				}}
				currentStatus={selectedStudentForStatus?.attendanceStatus || 'present'}
				studentName={
					selectedStudentForStatus
						? `${capitalizeWords(selectedStudentForStatus.name)} ${capitalizeWords(selectedStudentForStatus.lastName)}`
						: ''
				}
			/>
		</Modal>
	)
}

export default AttendanceEditModal
