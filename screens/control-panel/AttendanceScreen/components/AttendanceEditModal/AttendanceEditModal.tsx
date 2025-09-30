import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Modal, Image, Text, FlatList, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import {
	getStudentAttendanceByDay,
	registerStudentAttendance,
	updateStudentAttendanceById,
} from '@/redux/actions/studentAttendanceActions'
import { deleteRecoveryClassById } from '@/redux/actions/recoveryClassActions'
import {
	REGISTER_STUDENT_ATTENDANCE_RESET,
	UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET,
} from '@/redux/constants/studentAttendanceConstants'
import { DELETE_RECOVERY_CLASS_BY_ID_RESET } from '@/redux/constants/recoveryClassConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import colors from '@/theme/colors'
import StudentNotesModal from '../StudentNotesModal'
import AddStudentModal from '../AddStudentModal'
import AttendanceStatusModal from '../AttendanceStatusModal'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ConfirmationDeleteModal from '@/components/ConfirmationDeleteModal/ConfirmationDeleteModal'
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
	ClassTitleRow,
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
	RefreshButton,
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

	const [currentAttendance, setCurrentAttendance] = useState(attendanceData)
	const [initialAttendance, setInitialAttendance] = useState<IAttendanceItem[]>([])
	const [attendance, setAttendance] = useState<IAttendanceItem[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [openNotesModal, setOpenNotesModal] = useState<boolean>(false)
	const [selectedStudentForNotes, setSelectedStudentForNotes] = useState<any>(null)
	const [openAddStudentModal, setOpenAddStudentModal] = useState<boolean>(false)
	const [openStatusModal, setOpenStatusModal] = useState<boolean>(false)
	const [selectedStudentForStatus, setSelectedStudentForStatus] = useState<IAttendanceItem | null>(null)
	const [openConfirmationDeleteModal, setOpenConfirmationDeleteModal] = useState<boolean>(false)
	const [studentToDelete, setStudentToDelete] = useState<IAttendanceItem | null>(null)

	const { userInfo } = useAppSelector((state) => state.userLogin) || { userInfo: undefined }

	const { loadingRegisterStudentAttendance, errorRegisterStudentAttendance, successRegisterStudentAttendance } =
		useAppSelector((state) => state.registerStudentAttendance) || {
			loadingRegisterStudentAttendance: false,
			errorRegisterStudentAttendance: '',
			successRegisterStudentAttendance: false,
		}
	const { loadingUpdateStudentAttendanceById, errorUpdateStudentAttendanceById, successUpdateStudentAttendanceById } =
		useAppSelector((state) => state.updateStudentAttendanceById) || {
			loadingUpdateStudentAttendanceById: false,
			errorUpdateStudentAttendanceById: '',
			successUpdateStudentAttendanceById: false,
		}
	const { loadingStudentAttendanceByDay, successStudentAttendanceByDay, studentAttendanceByDayList } = useAppSelector(
		(state) => state.getStudentAttendanceByDay,
	) || {
		loadingStudentAttendanceByDay: false,
		successStudentAttendanceByDay: false,
		studentAttendanceByDayList: undefined,
	}
	const { loadingDeleteRecoveryClassById, errorDeleteRecoveryClassById, successDeleteRecoveryClassById } =
		useAppSelector((state) => state.deleteRecoveryClassById) || {
			loadingDeleteRecoveryClassById: false,
			errorDeleteRecoveryClassById: '',
			successDeleteRecoveryClassById: false,
		}

	const dayAndWeekDay = useMemo(() => {
		if (!currentAttendance?.date) return ''
		const attendanceDate = new Date(
			currentAttendance?.date?.year,
			currentAttendance?.date?.month - 1,
			currentAttendance?.date?.day,
		)
		return format(attendanceDate, 'EEEE MMMM d', { locale: enUS })
	}, [currentAttendance?.date])

	const handleSetAttendance = (data: any) => {
		const attendanceItem: IAttendanceItem[] = []
		data.attendance.forEach((studentAttendance: any) => {
			attendanceItem.push({
				student: studentAttendance.student._id,
				name: studentAttendance.student?.name || 'Unknown',
				lastName: studentAttendance.student?.lastName || '',
				attendanceStatus: studentAttendance.attendanceStatus,
				observations: studentAttendance.observations || '',
				isDayOnly: studentAttendance.isDayOnly || false,
				isTrial: studentAttendance.student?.isTrial || false,
				scheduledDeletionDate: studentAttendance.student?.scheduledDeletionDate,
				isRecovery: studentAttendance.isRecovery || false,
				recoveryClassId: studentAttendance.recoveryClassId,
			})
		})

		setAttendance(attendanceItem)
		setInitialAttendance(JSON.parse(JSON.stringify(attendanceItem)))
	}

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENT_ATTENDANCE_RESET })
			dispatch({ type: UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET })
			dispatch({ type: DELETE_RECOVERY_CLASS_BY_ID_RESET })
			closeModal()
		}
	}, [])

	useEffect(() => {
		if (studentAttendanceByDayList) {
			const updatedAttendance = studentAttendanceByDayList?.attendances.find(
				(item: any) => item.karateClass._id === currentAttendance.karateClass._id,
			)
			if (updatedAttendance) {
				setCurrentAttendance(updatedAttendance)
				handleSetAttendance(updatedAttendance)
			}
		} else if (currentAttendance && currentAttendance.karateClass) {
			handleSetAttendance(currentAttendance)
		}
	}, [studentAttendanceByDayList])

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
					currentAttendance?.date?.year,
					currentAttendance?.date?.month,
					currentAttendance?.date?.day,
				),
			)
		}
	}, [successRegisterStudentAttendance])

	useEffect(() => {
		if (successUpdateStudentAttendanceById) {
			// Refresh attendance data after successful update
			dispatch(
				getStudentAttendanceByDay(
					currentAttendance?.date?.year,
					currentAttendance?.date?.month,
					currentAttendance?.date?.day,
				),
			)
		}
	}, [successUpdateStudentAttendanceById])

	useEffect(() => {
		if (successDeleteRecoveryClassById) {
			// Refresh attendance data after successful removal
			dispatch(
				getStudentAttendanceByDay(
					currentAttendance?.date?.year,
					currentAttendance?.date?.month,
					currentAttendance?.date?.day,
				),
			)
		}
	}, [successDeleteRecoveryClassById])

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
			karateClass: currentAttendance?.karateClass?._id,
			date: currentAttendance?.date,
			attendance: validAttendance,
		}

		// Check if it's a virtual attendance (starts with 'virtual-') or no _id
		if (currentAttendance?.isVirtual || !currentAttendance?._id || currentAttendance?._id?.startsWith('virtual-')) {
			// Create new real attendance from virtual
			dispatch(registerStudentAttendance(studentAttendance))
		} else {
			// Update existing real attendance
			dispatch(updateStudentAttendanceById(currentAttendance?._id, { attendance: validAttendance }))
		}
		setInitialAttendance(JSON.parse(JSON.stringify(attendance)))
	}

	const handleSelectStudent = (studentId: string) => {
		setErrorMessage(null)
		setAttendance((prev) =>
			prev.map((item) => {
				if (String(item?.student) === String(studentId)) {
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
				if (String(item?.student) === String(studentId)) {
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
					if (String(item?.student) === String(selectedStudentForStatus.student)) {
						item.attendanceStatus = status
					}
					return item
				}),
			)
		}
		setOpenStatusModal(false)
		setSelectedStudentForStatus(null)
	}

	const handleOpenDeleteModal = (student: IAttendanceItem) => {
		setStudentToDelete(student)
		setOpenConfirmationDeleteModal(true)
	}

	const handleConfirmDelete = () => {
		if (studentToDelete) {
			if (studentToDelete.recoveryClassId) {
				// It's a makeup student, so un-book them
				const force = true
				dispatch(deleteRecoveryClassById(studentToDelete.recoveryClassId, force))
			} else {
				// It's a regular student, just remove them from the local list for this day
				setAttendance((prev) => prev.filter((item) => item.student !== studentToDelete.student))
			}
		}
		setOpenConfirmationDeleteModal(false)
		setStudentToDelete(null)
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
			.filter(
				(item) =>
					item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
			)
			.sort((a, b) => a?.name?.localeCompare(b?.name))
	}, [attendance, searchQuery])

	const canEdit = useMemo(() => {
		if (userInfo?.isSuper) return true

		const today = new Date()
		const attendanceDate = new Date(
			currentAttendance?.date?.year || 0,
			currentAttendance?.date?.month - 1 || 0,
			currentAttendance?.date?.day || 0,
			12,
			0,
		)
		// Allow editing for today and future dates (not past dates)
		return attendanceDate >= today || format(today, 'yyyy-MM-dd') === format(attendanceDate, 'yyyy-MM-dd')
	}, [currentAttendance])

	const isToday = useMemo(() => {
		const today = new Date()
		const attendanceDate = new Date(
			currentAttendance?.date?.year || 0,
			currentAttendance?.date?.month - 1 || 0,
			currentAttendance?.date?.day || 0,
			12,
			0,
		)
		return format(today, 'yyyy-MM-dd') === format(attendanceDate, 'yyyy-MM-dd')
	}, [currentAttendance])

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
							<ClassTitleRow>
								<ClassName>{currentAttendance?.karateClass?.name}</ClassName>
							</ClassTitleRow>
							<DayWeekText>{dayAndWeekDay}</DayWeekText>
						</ClassDetails>
                        <RefreshButton
							onPress={() => {
								if (!currentAttendance?.date) return
								dispatch(
									getStudentAttendanceByDay(
										currentAttendance?.date?.year,
										currentAttendance?.date?.month,
										currentAttendance?.date?.day,
									),
								)
							}}
                            disabled={loadingStudentAttendanceByDay}
						>
                            {loadingStudentAttendanceByDay ? (
                                <ActivityIndicator size='small' color={colors.variants.secondary[5]} />
                            ) : (
                                <MaterialCommunityIcons name='refresh' size={24} color={colors.variants.secondary[5]} />
                            )}
						</RefreshButton>
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
								placeholder='Search student...'
								placeholderTextColor={colors.variants.grey[3]}
								value={searchQuery}
								onChangeText={setSearchQuery}
								autoComplete='off'
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
												<StudentAvatar source={require('@/assets/img/default-avatar.png')} resizeMode='contain' />
												<StudentTextContainer>
													<StudentName numberOfLines={1}>{capitalizeWords(item.name)}</StudentName>
													<StudentLastName numberOfLines={1}>{capitalizeWords(item?.lastName)}</StudentLastName>

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
													<MaterialCommunityIcons name='dots-horizontal' size={24} color={colors.variants.grey[4]} />
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
						keyExtractor={(item) => String(item.student)}
					/>
				</ScrollView>

				{/* Floating Add Student Button */}
				{canEdit && !userInfo?.isTeacher && (
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
				attendanceId={currentAttendance?._id}
				currentStudents={attendance.map((item) => String(item.student))}
				classId={currentAttendance?.karateClass?._id}
				date={currentAttendance?.date}
				onStudentAdded={() => {
					// Refresh attendance data when student is added
					// This would trigger a re-fetch of the attendance data
					dispatch(
						getStudentAttendanceByDay(
							currentAttendance?.date?.year,
							currentAttendance?.date?.month,
							currentAttendance?.date?.day,
						),
					)
					setOpenAddStudentModal(false)
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
				onRemoveStudent={() => {
					if (selectedStudentForStatus) {
						handleOpenDeleteModal(selectedStudentForStatus)
					}
				}}
				canRemove={!userInfo?.isTeacher}
				currentStatus={selectedStudentForStatus?.attendanceStatus || 'present'}
				studentName={
					selectedStudentForStatus
						? `${capitalizeWords(selectedStudentForStatus.name)} ${capitalizeWords(selectedStudentForStatus.lastName)}`
						: ''
				}
			/>

			{/* Confirmation Delete Modal */}
			<ConfirmationDeleteModal
				openModal={openConfirmationDeleteModal}
				closeModal={() => {
					setOpenConfirmationDeleteModal(false)
					setStudentToDelete(null)
					dispatch({ type: DELETE_RECOVERY_CLASS_BY_ID_RESET })
				}}
				handleConfirm={handleConfirmDelete}
				title={`Are you sure you want to remove ${studentToDelete?.name} ${studentToDelete?.lastName}?`}
				loadingDelete={loadingDeleteRecoveryClassById}
				errorDelete={errorDeleteRecoveryClassById}
			/>
		</Modal>
	)
}

export default AttendanceEditModal
