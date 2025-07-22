import React, { useEffect, useState } from 'react'
import { ScrollView, FlatList, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IStudent } from '../../helpers/karate-classes-interfaces'
import PickStudentsModal from '../PickStudentsModal'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers } from '@/redux/actions/userActions'
import { GET_STUDENT_USERS_RESET } from '@/redux/constants/userConstants'
import Loader from '@/components/Loader/Loader'
import colors from '@/theme/colors'
import * as S from './AssignedStudentsModal.styles'

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
		setStudentsSelected((prev) => {
			if (prev.some((s) => s._id === student._id)) {
				return prev // Ya está, no lo agregues de nuevo
			}
			return [...prev, student]
		})
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
		<S.ModalContainer visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<S.ModalContent>
				<ScreenHeader
					label='Class Students'
					labelButton='Add'
					handleOnPress={() => setOpenPickStudentsModal(true)}
					disabledButton={loadingGetStudentUsers}
					iconName='plus'
					showBackButton={true}
					handleBack={handleSaveStudentsSelected}
				/>
				<S.ContentContainer>
					{loadingGetStudentUsers ? (
						<S.LoaderView>
							<Loader text='Loading students' />
						</S.LoaderView>
					) : errorGetStudentUsers && !students?.length ? (
						<S.ErrorView>
							<S.ErrorText>{errorGetStudentUsers}</S.ErrorText>
						</S.ErrorView>
					) : !studentsSelected?.length ? (
						<S.NoStudentsView>
							<S.NoStudentsText>No students assigned</S.NoStudentsText>
							<S.PickStudentsButton onPress={() => setOpenPickStudentsModal(true)}>
								<S.PickStudentsButtonView>
									<S.PickStudentsButtonText>Pick Students</S.PickStudentsButtonText>
								</S.PickStudentsButtonView>
							</S.PickStudentsButton>
						</S.NoStudentsView>
					) : (
						<ScrollView>
							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								data={studentsSelected.sort((a, b) => a?.name?.localeCompare(b?.name))}
								renderItem={({ item, index }) => (
									<S.StudentItemView>
										<S.StudentItemContent>
											<S.StudentInfoView>
												<S.StudentAvatar
													source={require('@/assets/img/default-avatar.png')}
													resizeMode='contain'
												/>
												<S.StudentNameView>
													<S.StudentName numberOfLines={1}>
														{capitalizeWords(item.name)}
													</S.StudentName>
													<S.StudentLastName numberOfLines={1}>
														{capitalizeWords(item?.lastName)}
													</S.StudentLastName>
												</S.StudentNameView>
											</S.StudentInfoView>
											<MaterialCommunityIcons
												name='close'
												size={24}
												color={colors.variants.primary[5]}
												onPress={() => handleDeleteStudent(item._id)}
											/>
										</S.StudentItemContent>
										{index + 1 !== studentsSelected.length && (
											<S.Separator>
												<S.SeparatorLine />
											</S.Separator>
										)}
									</S.StudentItemView>
								)}
								keyExtractor={(item) => item._id}
							/>
						</ScrollView>
					)}
				</S.ContentContainer>
			</S.ModalContent>
			{openPickStudentsModal && (
				<PickStudentsModal
					openModal={openPickStudentsModal}
					closeModal={() => setOpenPickStudentsModal(false)}
					students={students}
					studentsSelected={studentsSelected}
					handleSelectStudent={handleSelectStudent}
				/>
			)}
		</S.ModalContainer>
	)
}

export default AssignedStudentsModal
