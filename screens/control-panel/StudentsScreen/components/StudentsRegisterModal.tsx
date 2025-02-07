import React, { useEffect, useState } from 'react'
import { View, Text, Modal, FlatList, Pressable, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { registerStudents } from '@/redux/actions/userActions'
import { REGISTER_STUDENTS_RESET } from '@/redux/constants/userConstants'
import colors from '@/theme/colors'

const StudentsRegisterModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [studentName, setStudentName] = useState<string>('')
	const [studentLastName, setStudentLastName] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [studentsAdded, setStudentsAdded] = useState<{ name: string; lastName: string }[]>([])

	const { loadingRegisterStudents, errorRegisterStudents } = useAppSelector((state) => state.registerStudents)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENTS_RESET })
			closeModal()
		}
	}, [])

	const handleAddStudent = () => {
		setErrorMessage(null)

		if (!studentName?.length) {
			return setErrorMessage('First name is required')
		}
		if (!studentLastName?.length) {
			return setErrorMessage('Last name is required')
		}

		if (studentsAdded.some((student) => student.name === studentName && student.lastName === studentLastName)) {
			return setErrorMessage('Student already added')
		}

		setStudentsAdded((prev) => [...prev, { name: studentName, lastName: studentLastName }])

		setStudentName('')
		setStudentLastName('')
	}
	const handleRemoveStudent = (index: number) => {
		setStudentsAdded((prev) => prev.filter((_, i) => i !== index))
	}
	const handleRegisterStudents = () => {
		if (!studentsAdded?.length) {
			return setErrorMessage('Please add at least one student')
		}

		dispatch(registerStudents({ students: studentsAdded }))
	}

	return (
		<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
			{loadingRegisterStudents && <CustomBackdrop openBackdrop={loadingRegisterStudents} label='Loading ...' />}
			<View>
				<View>
					<ScreenHeader
						label='Add Students'
						labelButton='Save'
						iconName='save'
						disabledButton={loadingRegisterStudents}
						handleOnPress={handleRegisterStudents}
						showBackButton={true}
						handleBack={closeModal}
					/>
					<View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>
						<View style={{ width: '60%', alignItems: 'center' }}>
							<View style={{ width: '90%' }}>
								<CustomInputForm
									label='First Name'
									placeholder='Manuel'
									placeholderTextColor={colors.darkLight}
									onChangeText={setStudentName}
									value={studentName}
								/>
								<CustomInputForm
									label='Last Name'
									placeholder='Smith'
									placeholderTextColor={colors.darkLight}
									onChangeText={setStudentLastName}
									value={studentLastName}
								/>
							</View>
						</View>
						<View style={{ width: '40%', alignItems: 'center' }}>
							<Pressable
								style={{ backgroundColor: colors.brand, padding: 10, paddingHorizontal: 30, borderRadius: 10 }}
								onPress={handleAddStudent}
							>
								<Text style={{ color: colors.primary }}>Add</Text>
							</Pressable>
						</View>
					</View>
					{(errorMessage || errorRegisterStudents) && (
						<Text
							style={{
								textAlign: 'center',
								fontSize: 13,
								color: 'red',
							}}
						>
							{errorMessage || errorRegisterStudents}
						</Text>
					)}
					<Text style={{ paddingLeft: 10, backgroundColor: colors.brand, color: colors.primary, marginBottom: 10 }}>
						Total Added: {studentsAdded?.length}
					</Text>
					<View style={{ width: '100%', alignItems: 'center', marginBottom: 10, height: '70%' }}>
						<ScrollView style={{ width: '100%' }}>
							<FlatList
								data={studentsAdded}
								nestedScrollEnabled={true}
								scrollEnabled={false}
								renderItem={({ item, index }) => (
									<>
										<View
											style={{
												width: '100%',
												padding: 10,
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<Text>
												{item.name} {item.lastName}
											</Text>
											<Pressable onPress={() => handleRemoveStudent(index)}>
												<AntDesign name='closecircle' size={24} color='red' />
											</Pressable>
										</View>
										<View
											style={{
												height: 1,
												backgroundColor: colors.darkLight,
												marginBottom: 10,
												marginLeft: 10,
												marginRight: 10,
											}}
										/>
									</>
								)}
							/>
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default StudentsRegisterModal
