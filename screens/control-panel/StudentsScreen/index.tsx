import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSegments } from 'expo-router'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import Loader from '@/components/Loader/Loader'
import StudentsRegisterModal from './components/StudentsRegisterModal'
import StudentEditModal from './components/StudentEditModal'
import StudentDeleteModal from './components/StudentDeleteModal'
import { IStudent } from './helpers/students-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { TUserRole } from '@/shared/common-types'
import { deleteStudentUserById, getStudentUsers } from '@/redux/actions/userActions'
import { DELETE_STUDENT_USER_BY_ID_RESET } from '@/redux/constants/userConstants'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { Badge, BADGE_CONFIG } from '@/shared/Badge'
import * as S from './styles'

const StudentsScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()
	const segments: string[] = useSegments()

	const [mode, setMode] = useState<'students' | 'teachers'>('students')
	const [students, setStudents] = useState<IStudent[]>([])
	const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([])
	const [openStudentsRegisterModal, setOpenStudentsRegisterModal] = useState<boolean>(false)
	const [textSearch, setTextSearch] = useState<string>('')
	const [openStudentEditModal, setOpenStudentEditModal] = useState<boolean>(false)
	const [studentIdSelected, setStudentIdSelected] = useState<string>('')
	const [deleteId, setDeleteId] = useState<string>('')
	const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null)
	const [openStudentDeleteModal, setOpenStudentDeleteModal] = useState<boolean>(false)

	const { loadingGetStudentUsers, studentUsersList, successGetStudentUsers, errorGetStudentUsers } = useAppSelector(
		(state: RootState) => state.getStudentUsers,
	)
	const { successRegisterStudents, studentRegistered } = useAppSelector((state: RootState) => state.registerStudents)
	const { successUpdateStudentUserById, studentUserByIdUpdated } = useAppSelector(
		(state) => state.updateStudentUserById,
	)
	const { loadingDeleteStudentUserById, successDeleteStudentUserById, studentUserDeleted, errorDeleteStudentUserById } =
		useAppSelector((state: RootState) => state.deleteStudentUserById)

	useEffect(() => {
		if (segments[1] === 'students') {
			setStudents([])
			dispatch(getStudentUsers(mode))
		}
	}, [segments, mode])
	useEffect(() => {
		if (successGetStudentUsers && studentUsersList) {
			setDeleteId('')
			setStudents(studentUsersList)
		}
	}, [successGetStudentUsers])
	useEffect(() => {
		if (successRegisterStudents && studentRegistered) {
			setDeleteId('')
			if (
				(mode === 'teachers' && (studentRegistered.isTeacher || studentRegistered.isAdmin)) ||
				(mode === 'students' && !studentRegistered.isTeacher && !studentRegistered.isAdmin)
			) {
				setStudents((prev) => [...prev, studentRegistered])
			}
			setOpenStudentsRegisterModal(false)
		}
	}, [successRegisterStudents])
	useEffect(() => {
		setDeleteId('')
		let filteredStudents = [...students]
		if (textSearch) {
			filteredStudents = filteredStudents.filter((student) =>
				`${student.name.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(textSearch.toLowerCase()),
			)
		}
		setFilteredStudents(filteredStudents)
	}, [textSearch, students])
	useEffect(() => {
		if (successUpdateStudentUserById) {
			setDeleteId('')
			if (
				(mode === 'students' && !studentUserByIdUpdated?.isTeacher && !studentUserByIdUpdated?.isAdmin) ||
				(mode === 'teachers' && (studentUserByIdUpdated?.isTeacher || studentUserByIdUpdated?.isAdmin))
			) {
				setStudents((prev) =>
					prev.map((student) => {
						if (student._id === studentUserByIdUpdated?._id) {
							student.name = studentUserByIdUpdated?.name
							student.lastName = studentUserByIdUpdated?.lastName
						}
						return student
					}),
				)
			} else {
				setStudents((prev) => prev.filter((student) => student._id !== studentUserByIdUpdated?._id))
			}

			setOpenStudentEditModal(false)
		}
	}, [successUpdateStudentUserById])
	useEffect(() => {
		if (successDeleteStudentUserById) {
			setDeleteId('')
			if (!studentUserDeleted?.scheduledDeletionDate) {
				setStudents((prev) => prev.filter((student) => student._id !== studentUserDeleted?.studentId))
			}
			setOpenStudentDeleteModal(false)
		}
	}, [successDeleteStudentUserById])

	const handleSelectStudent = (student: IStudent) => {
		setStudentIdSelected(student._id)
		setOpenStudentEditModal(true)
	}
	const handleSelectDeleteStudent = (studentId: string) => {
		const student = students.find(s => s._id === studentId)
		setSelectedStudent(student || null)
		setDeleteId(deleteId === studentId ? '' : studentId)
	}
	const handleShowConfirmationModal = () => {
		setOpenStudentDeleteModal(true)
	}
	const handleConfirmDeleteStudent = (scheduledDate?: Date) => {
		dispatch(deleteStudentUserById(deleteId, scheduledDate))
	}

	return (
		<>
			<S.ScreenContainer>
				<ScreenHeader
					label={mode === 'students' ? 'Students' : 'Teachers'}
					labelButton='Add'
					handleOnPress={() => [setOpenStudentsRegisterModal(true), setDeleteId('')]}
					disabledButton={loadingGetStudentUsers}
					iconName='plus'
					additionalIcon={role === 'admin' ? 'swap-horizontal' : undefined}
					handleAdditionalIcon={() => setMode(mode === 'students' ? 'teachers' : 'students')}
				/>
				{loadingGetStudentUsers ? (
					<S.LoaderContainer>
						<Loader text='Loading students' />
					</S.LoaderContainer>
				) : errorGetStudentUsers && !students?.length ? (
					<S.ErrorContainer>
						<S.ErrorText>{errorGetStudentUsers}</S.ErrorText>
					</S.ErrorContainer>
				) : (
					<>
						<S.SearchContainer>
							<S.SearchInputContainer>
								<MaterialCommunityIcons
									style={{ position: 'absolute', left: 18, top: 14, zIndex: 1 }}
									name='account-search'
									size={24}
									color={colors.variants.grey[3]}
								/>
								<S.SearchInput
									value={textSearch}
									onChangeText={setTextSearch}
									placeholder={mode === 'students' ? 'Search students' : 'Search teachers'}
									placeholderTextColor={colors.variants.grey[3]}
									autoComplete='off'
								/>
							</S.SearchInputContainer>
						</S.SearchContainer>
						<ScrollView>
							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								data={filteredStudents.sort((a, b) => a?.name?.localeCompare(b?.name))}
								renderItem={({ item, index }) => (
									<>
										<S.StudentItemContainer>
											<S.StudentInfoPressable
												onPress={() => [handleSelectStudent(item), setDeleteId('')]}
												onLongPress={() => handleSelectDeleteStudent(item._id)}
											>
												<S.StudentInfoContainer>
													<S.StudentAvatar
														source={require('@/assets/img/default-avatar.png')}
														resizeMode='contain'
													/>
													<S.StudentNameContainer>
														<S.StudentName numberOfLines={1} >
															{capitalizeWords(item.name)}
														</S.StudentName>
														<S.StudentLastName numberOfLines={1}>
															{capitalizeWords(item?.lastName)}
														</S.StudentLastName>
													</S.StudentNameContainer>
												</S.StudentInfoContainer>
												<S.BadgesContainer>
													{item.isTrial && (
														<Badge {...BADGE_CONFIG.trial}/>
													)}
													{item.scheduledDeletionDate && (
														<Badge {...BADGE_CONFIG.scheduledDeletion}/>
													)}
												</S.BadgesContainer>
											</S.StudentInfoPressable>
											<S.DeleteIconContainer>
												<Pressable onPress={handleShowConfirmationModal}>
													{item._id === deleteId && (
														<MaterialCommunityIcons name='delete' size={24} color={colors.view.secondary} />
													)}
												</Pressable>
											</S.DeleteIconContainer>
										</S.StudentItemContainer>
										{index + 1 !== filteredStudents.length && (
											<S.SeparatorContainer>
												<S.Separator />
											</S.SeparatorContainer>
										)}
									</>
								)}
								keyExtractor={(item) => item._id}
							/>
						</ScrollView>
					</>
				)}
			</S.ScreenContainer>
			{openStudentsRegisterModal && (
				<StudentsRegisterModal
					openModal={openStudentsRegisterModal}
					closeModal={() => setOpenStudentsRegisterModal(false)}
					role={role}
					mode={mode}
				/>
			)}
			{openStudentEditModal && (
				<StudentEditModal
					openModal={openStudentEditModal}
					closeModal={() => [setOpenStudentEditModal(false), setStudentIdSelected('')]}
					studentId={studentIdSelected}
					role={role}
				/>
			)}
			{openStudentDeleteModal && (
				<StudentDeleteModal
					openModal={openStudentDeleteModal}
					closeModal={() => [
						setOpenStudentDeleteModal(false),
						setSelectedStudent(null),
						dispatch({ type: DELETE_STUDENT_USER_BY_ID_RESET }),
					]}
					title={
						mode === 'students'
							? 'Are you sure you want to delete this student?'
							: 'Are you sure you want to delete this teacher?'
					}
					handleConfirm={handleConfirmDeleteStudent}
					loadingDelete={loadingDeleteStudentUserById}
					errorDelete={errorDeleteStudentUserById}
					existingScheduledDate={selectedStudent?.scheduledDeletionDate}
				/>
			)}
		</>
	)
}

export default StudentsScreen
