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
import { levelsInitialValues } from '../../ClassesScreen/helpers/karate-classes-initial-values'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import { TUserLevel } from '@/shared/common-types'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'

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
		<Modal
			visible={visible}
			animationType="slide"
			onRequestClose={handleClose}
			statusBarTranslucent={true}
		>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				{/* Header */}
				<View style={{
					paddingTop: 50,
					paddingHorizontal: 20,
					paddingBottom: 20,
					backgroundColor: colors.variants.primary[4],
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
					<Text style={{
						fontSize: 20,
						fontWeight: '600',
						color: colors.primary,
						flex: 1
					}}>
						Add Student
					</Text>
					<Pressable
						onPress={handleClose}
						style={{
							padding: 8,
							borderRadius: 8,
							backgroundColor: 'rgba(255,255,255,0.2)'
						}}
					>
						<MaterialCommunityIcons name="close" size={24} color={colors.primary} />
					</Pressable>
				</View>

				{!showCreateTrial ? (
					<>
						{/* Search Bar */}
						<View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
							<TextInput
								style={{
									backgroundColor: colors.variants.secondary[1],
									borderRadius: 10,
									paddingHorizontal: 15,
									paddingVertical: 12,
									fontSize: 16,
									borderWidth: 1,
									borderColor: colors.variants.grey[1]
								}}
								placeholder="Search student..."
								placeholderTextColor={colors.variants.grey[3]}
								value={searchText}
								onChangeText={setSearchText}
							/>
						</View>

						{/* Create Trial Student Button */}
						<View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
							<Pressable
								onPress={() => setShowCreateTrial(true)}
								style={{
									backgroundColor: colors.variants.secondary[2],
									paddingVertical: 15,
									paddingHorizontal: 20,
									borderRadius: 10,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<MaterialCommunityIcons name="account-plus" size={24} color={colors.primary} />
								<Text style={{
									fontSize: 16,
									fontWeight: '600',
									color: colors.primary
								}}>
									Create a Trial Student
								</Text>
							</Pressable>
						</View>

						{/* Students List */}
						<FlatList
							data={availableStudents}
							keyExtractor={(item) => item._id}
							style={{ flex: 1 }}
							renderItem={({ item }) => (
								<View style={{
									paddingHorizontal: 20,
									paddingVertical: 10,
									borderBottomWidth: 1,
									borderBottomColor: colors.variants.grey[1]
								}}>
									<View style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: 15
									}}>
										<Image
											source={require('@/assets/img/default-avatar.png')}
											style={{ width: 50, height: 50, borderRadius: 25 }}
											resizeMode='contain'
										/>
										<View style={{ flex: 1 }}>
											<Text style={{
												fontSize: 16,
												fontWeight: '600',
												color: colors.view.black
											}}>
												{capitalizeWords(item.name)} {capitalizeWords(item.lastName)}
											</Text>
											
											{/* Badges */}
											<View style={{ flexDirection: 'row', marginTop: 4, gap: 4 }}>
												{item.isTrial && (
													<View style={{ 
														backgroundColor: '#FFF3CD', 
														paddingHorizontal: 6, 
														paddingVertical: 2, 
														borderRadius: 8 
													}}>
														<Text style={{ color: '#856404', fontSize: 10, fontWeight: '600' }}>TRIAL</Text>
													</View>
												)}
												{item.isTrial && (
													<Badge {...BADGE_CONFIG.trial}/>
												)}
												{item.scheduledDeletionDate && (
													<Badge {...BADGE_CONFIG.scheduledDeletion}/>
												)}
											</View>
										</View>
										
										{/* Action Buttons */}
										<View style={{ gap: 8 }}>
											<Pressable
												onPress={() => handleAddStudent(item._id, false, true)}
												disabled={loadingAddStudentToAttendance}
												style={{
													backgroundColor: colors.variants.primary[4],
													paddingHorizontal: 15,
													paddingVertical: 8,
													borderRadius: 8,
													opacity: loadingAddStudentToAttendance ? 0.7 : 1
												}}
											>
												<Text style={{
													color: colors.primary,
													fontSize: 12,
													fontWeight: '600',
													textAlign: 'center'
												}}>
													Permanent
												</Text>
											</Pressable>
											<Pressable
												onPress={() => handleAddStudent(item._id, true, false)}
												disabled={loadingAddStudentToAttendance}
												style={{
													backgroundColor: colors.variants.secondary[3],
													paddingHorizontal: 15,
													paddingVertical: 8,
													borderRadius: 8,

													opacity: loadingAddStudentToAttendance ? 0.7 : 1
												}}
											>
												<Text style={{
													color: colors.primary,
													fontSize: 12,
													fontWeight: '600',
													textAlign: 'center'
												}}>
													Day only
												</Text>
											</Pressable>
										</View>
									</View>
								</View>
							)}
							ListEmptyComponent={() => (
								<View style={{ 
									padding: 40, 
									alignItems: 'center' 
								}}>
									<MaterialCommunityIcons 
										name="account-search" 
										size={64} 
										color={colors.variants.grey[3]} 
									/>
									<Text style={{
										fontSize: 16,
										color: colors.variants.grey[4],
										textAlign: 'center',
										marginTop: 10
									}}>
										No available students found
									</Text>
								</View>
							)}
						/>
					</>
				) : (
					/* Create Trial Student Form */
					<ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
						<Text style={{
							fontSize: 18,
							fontWeight: '600',
							color: colors.variants.secondary[5],
							marginBottom: 20,
							textAlign: 'center'
						}}>
							Create Trial Student
						</Text>

						<View style={{ gap: 15 }}>
							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									User ID *
								</Text>
								<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1],
										textTransform: 'uppercase'
									}}
									placeholder="E.g: STUD001, ABC123 (min. 6 characters)"
									value={newTrialStudent.userId}
									onChangeText={(text) => {
										// Only allow letters and numbers, convert to uppercase
										const cleanText = text.replace(/[^A-Z0-9]/g, '').toUpperCase()
										setNewTrialStudent(prev => ({ ...prev, userId: cleanText }))
									}}
									maxLength={20}
									autoCapitalize="characters"
								/>
								{newTrialStudent.userId && newTrialStudent.userId.length < 6 && (
									<Text style={{ color: '#C62828', fontSize: 12, marginTop: 2 }}>
										The ID must be at least 6 characters
									</Text>
								)}
							</View>

							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									First Name *
								</Text>
								<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1]
									}}
									placeholder="Student's first name"
									value={newTrialStudent.name}
									onChangeText={(text) => setNewTrialStudent(prev => ({ ...prev, name: text }))}
								/>
							</View>

							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									Last Name *
								</Text>
								<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1]
									}}
									placeholder="Student's last name"
									value={newTrialStudent.lastName}
									onChangeText={(text) => setNewTrialStudent(prev => ({ ...prev, lastName: text }))}
								/>
							</View>

							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									Level *
								</Text>
								<Pressable onPress={() => setOpenLevelModal(true)}>
									<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1]
									}}
									placeholder="Student's level"
									value={newTrialStudent.level}
									editable={false}
									/>
								</Pressable>
							</View>

							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									Phone (optional)
								</Text>
								<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1]
									}}
									placeholder="Phone number"
									value={newTrialStudent.phone}
									onChangeText={(text) => setNewTrialStudent(prev => ({ ...prev, phone: text }))}
									keyboardType="phone-pad"
								/>
							</View>

							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									Email (optional)
								</Text>
								<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1]
									}}
									placeholder="Email address"
									value={newTrialStudent.email}
									onChangeText={(text) => setNewTrialStudent(prev => ({ ...prev, email: text }))}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</View>

							<View>
								<Text style={{ fontSize: 14, fontWeight: '600', color: colors.variants.secondary[4], marginBottom: 5 }}>
									Notes (optional)
								</Text>
								<TextInput
									style={{
										backgroundColor: colors.variants.secondary[1],
										borderRadius: 10,
										paddingHorizontal: 15,
										paddingVertical: 12,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.variants.grey[1],
										minHeight: 80,
										textAlignVertical: 'top'
									}}
									placeholder="Additional notes about the student"
									value={newTrialStudent.notes}
									onChangeText={(text) => setNewTrialStudent(prev => ({ ...prev, notes: text }))}
									multiline={true}
									numberOfLines={4}
								/>
							</View>
						</View>

						{/* Action Buttons */}
						<View style={{
							flexDirection: 'row',
							gap: 10,
							marginTop: 30,
							marginBottom: 20
						}}>
							<Pressable
								onPress={() => setShowCreateTrial(false)}
								style={{
									flex: 1,
									backgroundColor: colors.variants.grey[2],
									paddingVertical: 15,
									borderRadius: 10,
									alignItems: 'center'
								}}
							>
								<Text style={{
									color: colors.variants.grey[5],
									fontSize: 16,
									fontWeight: '600'
								}}>
									Cancel
								</Text>
							</Pressable>
							<Pressable
								onPress={handleCreateTrialStudent}
								disabled={!newTrialStudent.name || !newTrialStudent.lastName || !newTrialStudent.userId || !newTrialStudent.level || newTrialStudent.userId.length < 6 || loadingRegisterTrialStudent}
								style={{
									flex: 1,
									backgroundColor: colors.variants.primary[4],
									paddingVertical: 15,
									borderRadius: 10,
									alignItems: 'center',
									opacity: (!newTrialStudent.name || !newTrialStudent.lastName || !newTrialStudent.userId || !newTrialStudent.level || newTrialStudent.userId.length < 6 || loadingRegisterTrialStudent) ? 0.7 : 1
								}}
							>
								<Text style={{
									color: colors.primary,
									fontSize: 16,
									fontWeight: '600'
								}}>
									{loadingRegisterTrialStudent ? 'Creating...' : 'Create and Add'}
								</Text>
							</Pressable>
						</View>
					</ScrollView>
				)}
			</View>
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