import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, Modal, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import { IStudent } from '../helpers/karate-classes-interfaces'
import PickStudentsModal from './PickStudentsModal'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers } from '@/redux/actions/userActions'
import { GET_STUDENT_USERS_RESET } from '@/redux/constants/userConstants'

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
		dispatch(getStudentUsers())
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
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
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
					<View style={{ width: '100%', alignItems: 'center' }}>
						<ScrollView>
							{!studentsSelected?.length && (
								<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
									<Text style={{ fontSize: 16, color: 'red' }}>No students assigned</Text>
									<Button title='Assign students' onPress={() => setOpenPickStudentsModal(true)} />
								</View>
							)}
							{errorGetStudentUsers && !students?.length ? (
								<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
									<Text style={{ fontSize: 16, color: 'red' }}>{errorGetStudentUsers}</Text>
								</View>
							) : (
								<FlatList
									nestedScrollEnabled={true}
									scrollEnabled={false}
									data={studentsSelected.sort((a, b) => a?.name?.localeCompare(b?.name))}
									renderItem={({ item }) => (
										<View
											style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, alignItems: 'flex-start' }}
											key={item._id}
										>
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center',
													width: '100%',
													flex: 1,
													justifyContent: 'space-between',
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
														<Text numberOfLines={1} style={{ fontWeight: 400, fontSize: 16 }}>
															{capitalizeWords(item.name)}
														</Text>
														<Text numberOfLines={1} style={{ fontSize: 15, color: 'grey' }}>
															{capitalizeWords(item?.lastName)}
														</Text>
													</View>
												</View>
												<AntDesign
													name='closecircle'
													size={24}
													color='red'
													onPress={() => handleDeleteStudent(item._id)}
												/>
											</View>
											<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
										</View>
									)}
									keyExtractor={(item) => item._id}
								/>
							)}
						</ScrollView>
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
			{loadingGetStudentUsers && <CustomBackdrop openBackdrop={loadingGetStudentUsers} label='Loading students ...' />}
		</>
	)
}

export default AssignedStudentsModal
