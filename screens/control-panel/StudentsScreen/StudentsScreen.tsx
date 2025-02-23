import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, TextInput, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSegments } from 'expo-router'
import ConfirmationDeleteModal from '@/components/ConfirmationDeleteModal/ConfirmationDeleteModal'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import Loader from '@/components/Loader/Loader'
import StudentsRegisterModal from './components/StudentsRegisterModal'
import StudentEditModal from './components/StudentEditModal'
import { IStudent } from './helpers/students-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { deleteStudentUserById, getStudentUsers } from '@/redux/actions/userActions'
import { DELETE_STUDENT_USER_BY_ID_RESET } from '@/redux/constants/userConstants'

const StudentsScreen = () => {
	const dispatch = useAppDispatch()
	const segments: string[] = useSegments()

	const [students, setStudents] = useState<IStudent[]>([])
	const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([])
	const [openStudentsRegisterModal, setOpenStudentsRegisterModal] = useState<boolean>(false)
	const [textSearch, setTextSearch] = useState<string>('')
	const [openStudentEditModal, setOpenStudentEditModal] = useState<boolean>(false)
	const [studentIdSelected, setStudentIdSelected] = useState<string>('')
	const [deleteId, setDeleteId] = useState<string>('')
	const [openConfirmationDeleteModal, setOpenConfirmationDeleteModal] = useState<boolean>(false)

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
			dispatch(getStudentUsers())
		}
	}, [segments])
	useEffect(() => {
		if (successGetStudentUsers && studentUsersList) {
			setDeleteId('')
			setStudents(studentUsersList)
		}
	}, [successGetStudentUsers])
	useEffect(() => {
		if (successRegisterStudents && studentRegistered) {
			setDeleteId('')
			setStudents((prev) => [...prev, studentRegistered])
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
			setStudents((prev) =>
				prev.map((student) => {
					if (student._id === studentUserByIdUpdated?._id) {
						student.name = studentUserByIdUpdated?.name
						student.lastName = studentUserByIdUpdated?.lastName
					}
					return student
				}),
			)
			setOpenStudentEditModal(false)
		}
	}, [successUpdateStudentUserById])
	useEffect(() => {
		if (successDeleteStudentUserById) {
			setDeleteId('')
			setStudents((prev) => prev.filter((student) => student._id !== studentUserDeleted?.studentId))
			setOpenConfirmationDeleteModal(false)
		}
	}, [successDeleteStudentUserById])

	const handleSelectStudent = (student: IStudent) => {
		setStudentIdSelected(student._id)
		setOpenStudentEditModal(true)
	}
	const handleSelectDeleteStudent = (studentId: string) => {
		setDeleteId(deleteId === studentId ? '' : studentId)
	}
	const handleShowConfirmationModal = () => {
		setOpenConfirmationDeleteModal(true)
	}
	const handleConfirmDeleteStudent = () => {
		dispatch(deleteStudentUserById(deleteId))
	}

	return (
		<>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ScreenHeader
					label='Students'
					labelButton='Add'
					handleOnPress={() => [setOpenStudentsRegisterModal(true), setDeleteId('')]}
					disabledButton={loadingGetStudentUsers}
					iconName='plus'
				/>
				{loadingGetStudentUsers ? (
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
						<Loader text='Loading students' />
					</View>
				) : errorGetStudentUsers && !students?.length ? (
					<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
						<Text style={{ fontSize: 16, color: 'red' }}>{errorGetStudentUsers}</Text>
					</View>
				) : (
					<>
						<TextInput
							value={textSearch}
							onChangeText={setTextSearch}
							placeholder='Search students'
							style={{
								width: '100%',
								backgroundColor: '#E5E7EB',
								padding: 10,
								borderRadius: 5,
								fontSize: 15,
								height: 50,
								marginVertical: 3,
								color: '#1F2937',
							}}
						/>
						<ScrollView>
							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								data={filteredStudents.sort((a, b) => a?.name?.localeCompare(b?.name))}
								renderItem={({ item }) => (
									<View
										style={{ paddingHorizontal: 15, paddingTop: 15, alignItems: 'flex-start', width: '100%' }}
										key={item._id}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												gap: 10,
												width: '100%',
												justifyContent: 'flex-start',
											}}
										>
											<Pressable
												onPress={() => [handleSelectStudent(item), setDeleteId('')]}
												onLongPress={() => handleSelectDeleteStudent(item._id)}
												style={{ width: '80%' }}
											>
												<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
													<Image
														source={require('@/assets/img/default-avatar.png')}
														style={{ width: 50, height: 50, borderRadius: 50 }}
														resizeMode='contain'
													/>
													<View
														style={{
															justifyContent: 'center',
															alignItems: 'flex-start',
															flexDirection: 'column',
														}}
													>
														<Text style={{ fontWeight: 400, fontSize: 16 }}>{capitalizeWords(item.name)}</Text>
														<Text style={{ fontSize: 15, color: 'grey' }}>{capitalizeWords(item?.lastName)}</Text>
													</View>
												</View>
											</Pressable>
											<View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
												<Pressable onPress={handleShowConfirmationModal}>
													{item._id === deleteId && <AntDesign name='delete' size={20} color='red' />}
												</Pressable>
											</View>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
									</View>
								)}
								keyExtractor={(item) => item._id}
							/>
						</ScrollView>
					</>
				)}
			</View>
			{openStudentsRegisterModal && (
				<StudentsRegisterModal
					openModal={openStudentsRegisterModal}
					closeModal={() => setOpenStudentsRegisterModal(false)}
				/>
			)}
			{openStudentEditModal && (
				<StudentEditModal
					openModal={openStudentEditModal}
					closeModal={() => [setOpenStudentEditModal(false), setStudentIdSelected('')]}
					studentId={studentIdSelected}
				/>
			)}
			{openConfirmationDeleteModal && (
				<ConfirmationDeleteModal
					openModal={openConfirmationDeleteModal}
					closeModal={() => [
						setOpenConfirmationDeleteModal(false),
						dispatch({ type: DELETE_STUDENT_USER_BY_ID_RESET }),
					]}
					title='Are you sure you want to delete this student?'
					handleConfirm={handleConfirmDeleteStudent}
					loadingDelete={loadingDeleteStudentUserById}
					errorDelete={errorDeleteStudentUserById}
				/>
			)}
		</>
	)
}

export default StudentsScreen
