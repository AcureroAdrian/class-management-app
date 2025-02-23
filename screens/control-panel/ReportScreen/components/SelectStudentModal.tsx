import React, { useEffect, useState } from 'react'
import { View, Text, Modal, ScrollView, FlatList, Pressable, TextInput, Image } from 'react-native'
import { useAppSelector } from '@/redux/store'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import { IStudent } from '../helpers/report-screen-interfaces'

const SelectStudentModal = ({
	openModal,
	closeModal,
	selectStudent,
}: {
	openModal: boolean
	closeModal: () => void
	selectStudent: (classId: string) => void
}) => {
	const [textSearch, setTextSearch] = useState<string>('')
	const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([])

	const { studentUsersList } = useAppSelector((state) => state.getStudentUsers)

	useEffect(() => {
		let filteredStudents = [...(studentUsersList || [])]
		if (textSearch) {
			filteredStudents = filteredStudents.filter((student) =>
				`${student.name.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(textSearch.toLowerCase()),
			)
		}
		setFilteredStudents(filteredStudents)
	}, [textSearch, studentUsersList])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ScreenHeader label='Pick a Student' showBackButton={true} handleBack={closeModal} />
				<TextInput
					value={textSearch}
					onChangeText={setTextSearch}
					placeholder='Search students'
					placeholderTextColor='#A0A0A0'
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
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={filteredStudents.sort((a, b) => a?.name?.localeCompare(b?.name))}
							renderItem={({ item }) => (
								<Pressable onPress={() => selectStudent(item?._id)}>
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
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default SelectStudentModal
