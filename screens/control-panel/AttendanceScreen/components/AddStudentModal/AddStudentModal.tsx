import React, { useState, useEffect } from 'react'
import { View, Modal, Text, FlatList, Pressable, TextInput, ScrollView, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers, registerTrialStudent } from '@/redux/actions/userActions'
import { addStudentToAttendance, getStudentAttendanceByDay } from '@/redux/actions/studentAttendanceActions'
import capitalizeWords from '@/shared/capitalize-words'
import { REGISTER_TRIAL_STUDENT_RESET } from '@/redux/constants/userConstants'
import { ADD_STUDENT_TO_ATTENDANCE_RESET } from '@/redux/constants/studentAttendanceConstants'
import { Badge, BADGE_CONFIG } from '@/shared/Badge'
import { levelsInitialValues } from '../../../ClassesScreen/helpers/karate-classes-initial-values'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import { TUserLevel } from '@/shared/common-types'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import {
	CloseButton,
	CreateTrialButton,
	CreateTrialButtonContainer,
	CreateTrialButtonText,
	HeaderContainer,
	HeaderTitle,
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
	FormScrollView,
	FormTitle,
	InputContainer,
	InputWrapper,
	InputLabel,
	FormTextInput,
	NotesTextInput,
	ErrorText,
	FormActionButtonsContainer,
	FormButton,
	FormButtonText,
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
	
	const [showCreateTrial, setShowCreateTrial] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [newTrialStudent, setNewTrialStudent] = useState({
		name: '',
		lastName: '',
		userId: '',
		level: '',
		phone: '',
		email: '',
		notes: '',
	})
	const [openLevelModal, setOpenLevelModal] = useState(false)
	const { studentUsersList } = useAppSelector(state => state.getStudentUsers)
	const { loadingRegisterTrialStudent, successRegisterTrialStudent, trialStudentRegistered } = 
		useAppSelector(state => state.registerTrialStudent)
	const { loadingAddStudentToAttendance, successAddStudentToAttendance } = 
		useAppSelector(state => state.addStudentToAttendance)

	useEffect(() => {
		if (visible) {
			dispatch(getStudentUsers('students'))
		}
	}, [visible])

	useEffect(() => {
		if (successRegisterTrialStudent && trialStudentRegistered) {
			// Automatically add the new trial student to attendance
			dispatch(addStudentToAttendance({
				studentId: trialStudentRegistered._id,
				attendanceId,
				isDayOnly: true,
				addPermanently: false,
				classId,
				date
			}))
			dispatch({ type: REGISTER_TRIAL_STUDENT_RESET })
		}
	}, [successRegisterTrialStudent, trialStudentRegistered])

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
		setShowCreateTrial(false)
		setSearchText('')
		setNewTrialStudent({
			name: '',
			lastName: '',
			userId: '',
			level: '',
			phone: '',
			email: '',
			notes: '',
		})
		onClose()
	}

	const handleCreateTrialStudent = () => {
		if (!newTrialStudent.name || !newTrialStudent.lastName || !newTrialStudent.userId || !newTrialStudent.level) {
			return
		}
		dispatch(registerTrialStudent(newTrialStudent))
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
		<>
			<Modal visible={visible} animationType='slide' onRequestClose={handleClose} statusBarTranslucent={true}>
				<ModalContainer>
					{/* Header */}
					<HeaderContainer>
						<HeaderTitle>Add Student</HeaderTitle>
						<CloseButton onPress={handleClose}>
							<MaterialCommunityIcons name='close' size={24} color={colors.primary} />
						</CloseButton>
					</HeaderContainer>

					{!showCreateTrial ? (
						<>
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
								<CreateTrialButton onPress={() => setShowCreateTrial(true)}>
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
						</>
					) : (
						/* Create Trial Student Form */
						<FormScrollView>
							<FormTitle>Create Trial Student</FormTitle>

							<InputContainer>
								<InputWrapper>
									<InputLabel>User ID *</InputLabel>
									<FormTextInput
										placeholder='E.g: STUD001, ABC123 (min. 6 characters)'
										value={newTrialStudent.userId}
										onChangeText={(text: string) => {
											// Only allow letters and numbers, convert to uppercase
											const cleanText = text.replace(/[^A-Z0-9]/g, '').toUpperCase()
											setNewTrialStudent((prev) => ({ ...prev, userId: cleanText }))
										}}
										maxLength={20}
										autoCapitalize='characters'
										style={{ textTransform: 'uppercase' }}
									/>
									{newTrialStudent.userId && newTrialStudent.userId.length < 6 && (
										<ErrorText>The ID must be at least 6 characters</ErrorText>
									)}
								</InputWrapper>

								<InputWrapper>
									<InputLabel>First Name *</InputLabel>
									<FormTextInput
										placeholder="Student's first name"
										value={newTrialStudent.name}
										onChangeText={(text: string) => setNewTrialStudent((prev) => ({ ...prev, name: text }))}
									/>
								</InputWrapper>

								<InputWrapper>
									<InputLabel>Last Name *</InputLabel>
									<FormTextInput
										placeholder="Student's last name"
										value={newTrialStudent.lastName}
										onChangeText={(text: string) => setNewTrialStudent((prev) => ({ ...prev, lastName: text }))}
									/>
								</InputWrapper>

								<InputWrapper>
									<InputLabel>Level *</InputLabel>
									<Pressable onPress={() => setOpenLevelModal(true)}>
										<FormTextInput
											placeholder="Student's level"
											value={newTrialStudent.level}
											editable={false}
										/>
									</Pressable>
								</InputWrapper>

								<InputWrapper>
									<InputLabel>Phone (optional)</InputLabel>
									<FormTextInput
										placeholder='Phone number'
										value={newTrialStudent.phone}
										onChangeText={(text: string) => setNewTrialStudent((prev) => ({ ...prev, phone: text }))}
										keyboardType='phone-pad'
									/>
								</InputWrapper>

								<InputWrapper>
									<InputLabel>Email (optional)</InputLabel>
									<FormTextInput
										placeholder='Email address'
										value={newTrialStudent.email}
										onChangeText={(text: string) => setNewTrialStudent((prev) => ({ ...prev, email: text }))}
										keyboardType='email-address'
										autoCapitalize='none'
									/>
								</InputWrapper>

								<InputWrapper>
									<InputLabel>Notes (optional)</InputLabel>
									<NotesTextInput
										placeholder='Additional notes about the student'
										value={newTrialStudent.notes}
										onChangeText={(text: string) => setNewTrialStudent((prev) => ({ ...prev, notes: text }))}
										multiline={true}
										numberOfLines={4}
									/>
								</InputWrapper>
							</InputContainer>

							{/* Action Buttons */}
							<FormActionButtonsContainer>
								<FormButton onPress={() => setShowCreateTrial(false)} cancel>
									<FormButtonText cancel>Cancel</FormButtonText>
								</FormButton>
								<FormButton
									onPress={handleCreateTrialStudent}
									disabled={
										!newTrialStudent.name ||
										!newTrialStudent.lastName ||
										!newTrialStudent.userId ||
										!newTrialStudent.level ||
										newTrialStudent.userId.length < 6 ||
										loadingRegisterTrialStudent
									}
								>
									<FormButtonText>
										{loadingRegisterTrialStudent ? 'Creating...' : 'Create and Add'}
									</FormButtonText>
								</FormButton>
							</FormActionButtonsContainer>
						</FormScrollView>
					)}
				</ModalContainer>
			</Modal>
			{openLevelModal && (
				<CustomSelectModal
					openModal={openLevelModal}
					closeModal={() => setOpenLevelModal(false)}
					title='Student Levels'
					options={levelsInitialValues}
					selected={newTrialStudent.level || ''}
					handleSaveOption={(selected: string) => setNewTrialStudent(prev => ({ ...prev, level: selected }))}
				/>
			)}
		</>
	)
}

export default AddStudentModal 