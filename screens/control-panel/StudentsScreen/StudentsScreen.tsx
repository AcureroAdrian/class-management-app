import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, TextInput, Pressable } from 'react-native'
import { useSegments } from 'expo-router'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import StudentsRegisterModal from './components/StudentsRegisterModal'
import StudentEditModal from './components/StudentEditModal'
import { IStudent } from './helpers/students-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers } from '@/redux/actions/userActions'

const StudentsScreen = () => {
	const dispatch = useAppDispatch()
	const segments: string[] = useSegments()

	const [students, setStudents] = useState<IStudent[]>([])
	const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([])
	const [openStudentsRegisterModal, setOpenStudentsRegisterModal] = useState<boolean>(false)
	const [textSearch, setTextSearch] = useState<string>('')
	const [openStudentEditModal, setOpenStudentEditModal] = useState<boolean>(false)
	const [studentIdSelected, setStudentIdSelected] = useState<string>('')

	const { loadingGetStudentUsers, studentUsersList, successGetStudentUsers, errorGetStudentUsers } = useAppSelector(
		(state: RootState) => state.getStudentUsers,
	)
	const { successRegisterStudents, studentRegisteredList } = useAppSelector(
		(state: RootState) => state.registerStudents,
	)
	const { successUpdateStudentUserById, studentUserByIdUpdated } = useAppSelector(
		(state) => state.updateStudentUserById,
	)

	useEffect(() => {
		if (segments[1] === 'students') {
			setStudents([])
			dispatch(getStudentUsers())
		}
	}, [segments])
	useEffect(() => {
		if (successGetStudentUsers && studentUsersList) {
			setStudents(studentUsersList)
		}
	}, [successGetStudentUsers])
	useEffect(() => {
		if (successRegisterStudents) {
			setStudents((prev) => [...prev, ...(studentRegisteredList || [])])
			setOpenStudentsRegisterModal(false)
		}
	}, [successRegisterStudents])
	useEffect(() => {
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

	const handleSelectStudent = (student: IStudent) => {
		setStudentIdSelected(student._id)
		setOpenStudentEditModal(true)
	}

	return (
		<>
			{loadingGetStudentUsers && <CustomBackdrop openBackdrop={loadingGetStudentUsers} label='Loading students ...' />}
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ScreenHeader
					label='Students'
					labelButton='Add'
					handleOnPress={() => setOpenStudentsRegisterModal(true)}
					disabledButton={loadingGetStudentUsers}
					iconName='plus'
				/>
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
						marginBottom: 10,
						color: '#1F2937',
					}}
				/>
				<ScrollView>
					{errorGetStudentUsers && !students?.length ? (
						<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
							<Text style={{ fontSize: 16, color: 'red' }}>{errorGetStudentUsers}</Text>
						</View>
					) : (
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={filteredStudents.sort((a, b) => a?.name?.localeCompare(b?.name))}
							renderItem={({ item }) => (
								<Pressable onPress={() => handleSelectStudent(item)}>
									<View
										style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, alignItems: 'flex-start' }}
										key={item._id}
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
													width: '100%',
													flexDirection: 'column',
												}}
											>
												<Text style={{ fontWeight: 400, fontSize: 16 }}>{capitalizeWords(item.name)}</Text>
												<Text style={{ fontSize: 15, color: 'grey' }}>{capitalizeWords(item?.lastName)}</Text>
											</View>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
									</View>
								</Pressable>
							)}
							keyExtractor={(item) => item._id}
						/>
					)}
				</ScrollView>
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
		</>
	)
}

export default StudentsScreen
