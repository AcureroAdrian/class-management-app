import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, Modal, Button, Pressable } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IStudent } from '../helpers/karate-classes-interfaces'
import PickStudentsModal from './PickStudentsModal'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers } from '@/redux/actions/userActions'
import { GET_STUDENT_USERS_RESET } from '@/redux/constants/userConstants'
import Loader from '@/components/Loader/Loader'
import colors from '@/theme/colors'

const AssignedStudentsModal = ({
	openModal,
	closeModal,
	studentsAssigned,
	handleAssignStudents,
}: {
	openModal: boolean
	closeModal: () => void
	studentsAssigned: string[]
	handleAssignStudents: (students: string[]) => void
}) => {
	const dispatch = useAppDispatch()

	const [studentsSelected, setStudentsSelected] = useState<IStudent[]>([])
	const [students, setStudents] = useState<IStudent[]>([])
	const [openPickStudentsModal, setOpenPickStudentsModal] = useState<boolean>(false)

	const { loadingGetStudentUsers, studentUsersList, successGetStudentUsers, errorGetStudentUsers } = useAppSelector(
		(state: RootState) => state.getStudentUsers,
	)

	useEffect(() => {
		dispatch(getStudentUsers('students'))
		return () => {
			dispatch({ type: GET_STUDENT_USERS_RESET })
		}
	}, [])
	useEffect(() => {
		if (successGetStudentUsers && studentUsersList) {
			setStudents(studentUsersList)
		}
	}, [successGetStudentUsers])
	useEffect(() => {
		if (studentsAssigned?.length && studentUsersList?.length) {
			const studentsData = studentUsersList.filter((student: IStudent) => studentsAssigned.includes(student._id))
			setStudentsSelected(studentsData)
		}
	}, [studentsAssigned, studentUsersList])

	const handleSelectStudent = (student: IStudent) => {
		setStudentsSelected((prev) => [...prev, student])
	}
	const handleSaveStudentsSelected = () => {
		const validIds = studentsSelected.map((student: IStudent) => student._id)
		handleAssignStudents(validIds)
		closeModal()
	}
	const handleDeleteStudent = (studentId: string) => {
		setStudentsSelected((prev) => prev.filter((s) => s._id !== studentId))
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<ScreenHeader
					label='Class Students'
					labelButton='Add'
					handleOnPress={() => setOpenPickStudentsModal(true)}
					disabledButton={loadingGetStudentUsers}
					iconName='plus'
					showBackButton={true}
					handleBack={handleSaveStudentsSelected}
				/>
				<View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
					{loadingGetStudentUsers ? (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
							<Loader text='Loading students' />
						</View>
					) : errorGetStudentUsers && !students?.length ? (
						<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
							<Text style={{ fontSize: 16, color: colors.variants.primary[5] }}>{errorGetStudentUsers}</Text>
						</View>
					) : !studentsSelected?.length ? (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								height: '100%',
								padding: 20,
								gap: 20,
							}}
						>
							<Text style={{ fontSize: 16, color: colors.variants.primary[5] }}>No students assigned</Text>
							<Pressable onPress={() => setOpenPickStudentsModal(true)}>
								<View
									style={{
										backgroundColor: colors.variants.secondary[5],
										paddingVertical: 10,
										paddingHorizontal: 40,
										borderRadius: 10,
									}}
								>
									<Text style={{ color: colors.primary, fontSize: 16, fontWeight: 500 }}>Pick Students</Text>
								</View>
							</Pressable>
						</View>
					) : (
						<ScrollView>
							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								data={studentsSelected.sort((a, b) => a?.name?.localeCompare(b?.name))}
								renderItem={({ item, index }) => (
									<View style={{ paddingTop: 12 }}>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												width: '100%',
												flex: 1,
												justifyContent: 'space-between',
												paddingHorizontal: 20,
												paddingVertical: 8,
											}}
										>
											<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%', flex: 1 }}>
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
												</View>
											</View>
											<MaterialCommunityIcons
												name='close'
												size={24}
												color={colors.variants.primary[5]}
												onPress={() => handleDeleteStudent(item._id)}
											/>
										</View>
										{index + 1 !== studentsSelected.length && (
											<View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
												<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[0] }} />
											</View>
										)}
									</View>
								)}
								keyExtractor={(item) => item._id}
							/>
						</ScrollView>
					)}
				</View>
			</View>
			{openPickStudentsModal && (
				<PickStudentsModal
					openModal={openPickStudentsModal}
					closeModal={() => setOpenPickStudentsModal(false)}
					students={students}
					studentsSelected={studentsSelected}
					handleSelectStudent={handleSelectStudent}
				/>
			)}
		</Modal>
	)
}

export default AssignedStudentsModal
