import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, TextInput, Pressable, Modal } from 'react-native'
import { InnerContainer } from '@/components/styles'
import HeaderScreen from '@/components/HeaderScreen/HeaderScreen'
import { IStudent } from '../helpers/karate-classes-interfaces'
import capitalizeWords from '@/shared/capitalize-words'

const PickStudentsModal = ({
	openModal,
	closeModal,
	studentsSelected,
	students,
	handleSelectStudent,
}: {
	openModal: boolean
	closeModal: () => void
	studentsSelected: IStudent[]
	students: IStudent[]
	handleSelectStudent: (student: IStudent) => void
}) => {
	const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([])
	const [textSearch, setTextSearch] = useState<string>('')

	useEffect(() => {
		const alreadySelected = studentsSelected.map((student: IStudent) => student._id)
		let filteredStudents = students?.filter((student: IStudent) => !alreadySelected.includes(student._id))
		if (textSearch) {
			filteredStudents = filteredStudents.filter((student: IStudent) =>
				`${student.name.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(textSearch.toLowerCase()),
			)
		}
		setFilteredStudents(filteredStudents)
	}, [textSearch, students, studentsSelected])

	return (
		<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<HeaderScreen label='Pick Students' showBackButton={true} handleBack={closeModal} />
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
				<InnerContainer>
					<ScrollView>
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
					</ScrollView>
				</InnerContainer>
			</View>
		</Modal>
	)
}

export default PickStudentsModal
