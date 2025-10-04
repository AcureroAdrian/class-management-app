import React, { useState, useEffect } from 'react'
import { Modal, FlatList, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { addStudentToAttendance } from '@/redux/actions/studentAttendanceActions'
import { bookingRecoveryClassById } from '@/redux/actions/karateClassActions'
import { getStudentUsers } from '@/redux/actions/userActions'
import { BOOKING_RECOVERY_CLASS_BY_ID_RESET } from '@/redux/constants/karateClassConstants'
import { ADD_STUDENT_TO_ATTENDANCE_RESET } from '@/redux/constants/studentAttendanceConstants'
import { Badge, BADGE_CONFIG } from '@/shared/Badge'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import AddStudentOptionsModal, {
	TAddStudentOptions,
} from '../AddStudentOptionsModal/AddStudentOptionsModal'
import TrialStudentModal from '../TrialStudentModal'

import {
	CreateTrialButton,
	CreateTrialButtonContainer,
	CreateTrialButtonText,
	ModalContainer,
	SearchBarContainer,
	SearchInput,
	StudentAvatar,
	StudentInfoContainer,
	StudentListItemContainer,
	StudentListItemContent,
	StudentName,
	BadgesContainer,
	ActionButtonsContainer,
	ActionButton,
	ActionButtonText,
	EmptyListContainer,
	EmptyListText,
	ErrorMessage,
} from './AddStudentModal.styles'

interface AddStudentModalProps {
	visible: boolean
	onClose: () => void
	attendanceId: string
	currentStudents: string[]
	onStudentAdded: () => void
	classId?: string
	date?: any
}

const AddStudentModal = ({
	visible,
	onClose,
	attendanceId,
	currentStudents,
	onStudentAdded,
	classId,
	date,
}: AddStudentModalProps) => {
	const dispatch = useAppDispatch()

	const [searchText, setSearchText] = useState('')
	const [openTrialStudentModal, setOpenTrialStudentModal] = useState<boolean>(false)
	const [selectedStudent, setSelectedStudent] = useState<any>(null)
	const [isOptionsModalVisible, setOptionsModalVisible] = useState<boolean>(false)

	const { studentUsersList } = useAppSelector((state) => state.getStudentUsers) || {}
	const {
		loadingAddStudentToAttendance,
		successAddStudentToAttendance,
		errorAddStudentToAttendance,
	} = useAppSelector((state) => state.addStudentToAttendance) || {}
	const {
		loadingBookingRecoveryClassById,
		successBookingRecoveryClassById,
		errorBookingRecoveryClassById,
	} = useAppSelector((state) => state.bookingRecoveryClassById) || {}

	useEffect(() => {
		if (visible) {
			dispatch(getStudentUsers('students'))
		}
	}, [visible])

	useEffect(() => {
		if (successAddStudentToAttendance) {
			onStudentAdded()
			handleClose()
		}
	}, [successAddStudentToAttendance])

	useEffect(() => {
		if (successBookingRecoveryClassById) {
			onStudentAdded()
			handleClose()
		}
	}, [successBookingRecoveryClassById])

	const availableStudents =
		studentUsersList
			?.filter(
				(student: any) =>
					!currentStudents.includes(student._id) &&
					(student.name.toLowerCase().includes(searchText.toLowerCase()) ||
						student.lastName.toLowerCase().includes(searchText.toLowerCase())),
			)
			?.sort((a: any, b: any) => {
				// Ordenar primero por nombre, luego por apellido
				const nameComparison = a.name.localeCompare(b.name)
				if (nameComparison !== 0) return nameComparison
				return a.lastName.localeCompare(b.lastName)
			}) || []

	const handleClose = () => {
		setSearchText('')
		dispatch({ type: ADD_STUDENT_TO_ATTENDANCE_RESET })
		dispatch({ type: BOOKING_RECOVERY_CLASS_BY_ID_RESET })
		setOptionsModalVisible(false)
		setSelectedStudent(null)
		onClose()
	}

	const handleOpenTrial = () => {
		setOpenTrialStudentModal(true)
	}

	const handleAddStudent = (studentId: string, isDayOnly: boolean, addPermanently: boolean) => {
		dispatch({ type: BOOKING_RECOVERY_CLASS_BY_ID_RESET })
		dispatch(
			addStudentToAttendance({
				studentId,
				attendanceId,
				isDayOnly,
				addPermanently,
				classId,
				date,
			}),
		)
	}

	const handleMakeupStudent = (studentId: string) => {
		dispatch({ type: ADD_STUDENT_TO_ATTENDANCE_RESET })
		if (classId && date) {
			dispatch(
				bookingRecoveryClassById(classId, {
					studentId,
					attendanceId: undefined, // Using a general credit
					date,
				}),
			)
		}
	}

	const handleOpenOptionsModal = (student: any) => {
		setSelectedStudent(student)
		setOptionsModalVisible(true)
	}

	const handleSelectOption = (option: TAddStudentOptions) => {
		if (!selectedStudent) return

		switch (option) {
			case 'permanent':
				handleAddStudent(selectedStudent._id, false, true)
				break
			case 'day-only':
				handleAddStudent(selectedStudent._id, true, false)
				break
			case 'makeup':
				handleMakeupStudent(selectedStudent._id)
				break
		}
		setOptionsModalVisible(false)
		setSelectedStudent(null)
	}

	return (
		<Modal visible={visible} animationType='slide' onRequestClose={handleClose} statusBarTranslucent={true}>
			<ModalContainer>
				<ScreenHeader label='Add Student' showBackButton={true} handleBack={handleClose} />

				{/* Search Bar */}
				<SearchBarContainer>
					<SearchInput
						placeholder='Search student...'
						placeholderTextColor={colors.variants.grey[3]}
						value={searchText}
						onChangeText={setSearchText}
						autoComplete='off'
					/>
				</SearchBarContainer>

				{/* Error Message */}
				{(errorAddStudentToAttendance || errorBookingRecoveryClassById) && (
					<ErrorMessage>{errorAddStudentToAttendance || errorBookingRecoveryClassById}</ErrorMessage>
				)}

				{/* Create Trial Student Button */}
				<CreateTrialButtonContainer>
					<CreateTrialButton onPress={handleOpenTrial}>
						<MaterialCommunityIcons name='account-plus' size={24} color={colors.primary} />
						<CreateTrialButtonText>Create a Trial Student</CreateTrialButtonText>
					</CreateTrialButton>
				</CreateTrialButtonContainer>

				{/* Students List */}
				<FlatList
					data={availableStudents}
					keyExtractor={(item) => item._id}
					style={{ flex: 1 }}
					renderItem={({ item }) => (
						<StudentListItemContainer>
							<StudentListItemContent>
								<StudentAvatar source={require('@/assets/img/default-avatar.png')} resizeMode='contain' />
								<StudentInfoContainer>
									<StudentName>
										{capitalizeWords(item.name)} {capitalizeWords(item.lastName)}
									</StudentName>

									{/* Badges */}
									<BadgesContainer>
										{item.isTrial && <Badge {...BADGE_CONFIG.trial} />}
										{item.scheduledDeletionDate && <Badge {...BADGE_CONFIG.scheduledDeletion} />}
										{item.recoveryCredits > 0 && (
											<Badge
												text={`${item.recoveryCredits} makeup${item.recoveryCredits > 1 ? 's' : ''}`}
												backgroundColor={colors.variants.secondary[3]}
												textColor={colors.primary}
											/>
										)}
									</BadgesContainer>
								</StudentInfoContainer>

								{/* Action Buttons */}
								<ActionButtonsContainer>
									<TouchableOpacity onPress={() => handleOpenOptionsModal(item)}>
										<MaterialCommunityIcons name='plus-circle' size={32} color={colors.variants.primary[5]} />
									</TouchableOpacity>
								</ActionButtonsContainer>
							</StudentListItemContent>
						</StudentListItemContainer>
					)}
					ListEmptyComponent={() => (
						<EmptyListContainer>
							<MaterialCommunityIcons name='account-search' size={64} color={colors.variants.grey[3]} />
							<EmptyListText>No available students found</EmptyListText>
						</EmptyListContainer>
					)}
				/>

				{/* Add Student Options Modal */}
				{isOptionsModalVisible && selectedStudent && (
					<AddStudentOptionsModal
						visible={isOptionsModalVisible}
						onClose={() => {
							setOptionsModalVisible(false)
							setSelectedStudent(null)
						}}
						onSelectOption={handleSelectOption}
						studentName={`${selectedStudent.name} ${selectedStudent.lastName}`}
						hasRecoveryCredits={selectedStudent.recoveryCredits > 0}
					/>
				)}

				{/* Trial Student Modal */}
				{openTrialStudentModal && (
					<TrialStudentModal
						visible={openTrialStudentModal}
						onClose={() => setOpenTrialStudentModal(false)}
						attendanceId={attendanceId}
						classId={classId}
						date={date}
						onStudentAdded={() => {
							onStudentAdded()
							setOpenTrialStudentModal(false)
						}}
					/>
				)}
			</ModalContainer>
		</Modal>
	)
}

export default AddStudentModal
