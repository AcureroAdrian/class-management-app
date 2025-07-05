import React, { useState, useEffect } from 'react'
import { Modal, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers } from '@/redux/actions/userActions'
import { addStudentToAttendance } from '@/redux/actions/studentAttendanceActions'
import capitalizeWords from '@/shared/capitalize-words'
import { ADD_STUDENT_TO_ATTENDANCE_RESET } from '@/redux/constants/studentAttendanceConstants'
import { Badge, BADGE_CONFIG } from '@/shared/Badge'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
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
} from './AddStudentModal.styles'

interface AddStudentModalProps {
	visible: boolean
	onClose: () => void
	onOpenTrial: () => void
	attendanceId: string
	currentStudents: string[]
	onStudentAdded: () => void
	classId?: string
	date?: any
}

const AddStudentModal = ({
	visible,
	onClose,
	onOpenTrial,
	attendanceId,
	currentStudents,
	onStudentAdded,
	classId,
	date,
}: AddStudentModalProps) => {
	const dispatch = useAppDispatch()
	
	const [searchText, setSearchText] = useState('')
	
	const { studentUsersList } = useAppSelector(state => state.getStudentUsers)
	const { loadingAddStudentToAttendance, successAddStudentToAttendance } = 
		useAppSelector(state => state.addStudentToAttendance)

	useEffect(() => {
		if (visible) {
			dispatch(getStudentUsers('students'))
		}
	}, [visible])

	useEffect(() => {
		if (successAddStudentToAttendance) {
			onStudentAdded()
			handleClose()
			dispatch({ type: ADD_STUDENT_TO_ATTENDANCE_RESET })
		}
	}, [successAddStudentToAttendance])

	const availableStudents = studentUsersList?.filter((student: any) => 
		!currentStudents.includes(student._id) &&
		(student.name.toLowerCase().includes(searchText.toLowerCase()) ||
		 student.lastName.toLowerCase().includes(searchText.toLowerCase()))
	) || []

	const handleClose = () => {
		setSearchText('')
		onClose()
	}

	const handleAddStudent = (studentId: string, isDayOnly: boolean, addPermanently: boolean) => {
		dispatch(addStudentToAttendance({
			studentId,
			attendanceId,
			isDayOnly,
			addPermanently,
			classId,
			date
		}))
	}

	return (
		<Modal visible={visible} animationType='slide' onRequestClose={handleClose} statusBarTranslucent={true}>
			<ModalContainer>
				<ScreenHeader
					label='Add Student'
					showBackButton={true}
					handleBack={handleClose}
				/>

				{/* Search Bar */}
				<SearchBarContainer>
					<SearchInput
						placeholder='Search student...'
						placeholderTextColor={colors.variants.grey[3]}
						value={searchText}
						onChangeText={setSearchText}
					/>
				</SearchBarContainer>

				{/* Create Trial Student Button */}
				<CreateTrialButtonContainer>
					<CreateTrialButton onPress={onOpenTrial}>
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
								<StudentAvatar
									source={require('@/assets/img/default-avatar.png')}
									resizeMode='contain'
								/>
								<StudentInfoContainer>
									<StudentName>
										{capitalizeWords(item.name)} {capitalizeWords(item.lastName)}
									</StudentName>
									
									{/* Badges */}
									<BadgesContainer>
										{item.isTrial && (
											<Badge {...BADGE_CONFIG.trial}/>
										)}
										{item.scheduledDeletionDate && (
											<Badge {...BADGE_CONFIG.scheduledDeletion}/>
										)}
									</BadgesContainer>
								</StudentInfoContainer>
								
								{/* Action Buttons */}
								<ActionButtonsContainer>
									<ActionButton
										onPress={() => handleAddStudent(item._id, false, true)}
										disabled={loadingAddStudentToAttendance}
										permanent
									>
										<ActionButtonText>
											Permanent
										</ActionButtonText>
									</ActionButton>
									<ActionButton
										onPress={() => handleAddStudent(item._id, true, false)}
										disabled={loadingAddStudentToAttendance}
									>
										<ActionButtonText>
											Day only
										</ActionButtonText>
									</ActionButton>
								</ActionButtonsContainer>
							</StudentListItemContent>
						</StudentListItemContainer>
					)}
					ListEmptyComponent={() => (
						<EmptyListContainer>
							<MaterialCommunityIcons 
								name="account-search" 
								size={64} 
								color={colors.variants.grey[3]} 
							/>
							<EmptyListText>
								No available students found
							</EmptyListText>
						</EmptyListContainer>
					)}
				/>
			</ModalContainer>
		</Modal>
	)
}

export default AddStudentModal
