import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, FlatList, TextInput, Pressable, Modal } from 'react-native'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IStudent } from '../helpers/karate-classes-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'

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
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, justifyContent: 'flex-start', width: '100%' }}>
				<ScreenHeader label='Pick Students' showBackButton={true} handleBack={closeModal} />
				<View style={{ width: '100%', paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 }}>
					<View style={{ position: 'relative', width: '100%' }}>
						<MaterialCommunityIcons
							style={{ position: 'absolute', left: 15, top: 10, zIndex: 1 }}
							name='account-search'
							size={30}
							color={colors.variants.secondary[4]}
						/>
						<TextInput
							value={textSearch}
							onChangeText={setTextSearch}
							placeholder='Search students'
							placeholderTextColor={colors.variants.secondary[2]}
							style={{
								width: '100%',
								backgroundColor: colors.variants.secondary[0],
								paddingLeft: 55,
								paddingRight: 20,
								borderRadius: 10,
								fontSize: 18,
								height: 50,
								color: colors.variants.secondary[5],
							}}
						/>
					</View>
				</View>
				<View style={{ width: '100%', flex: 1, paddingTop: 10 }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={filteredStudents.sort((a, b) => a?.name?.localeCompare(b?.name))}
							renderItem={({ item, index }) => (
								<>
									<Pressable onPress={() => handleSelectStudent(item)}>
										<View
											style={{
												width: '100%',
												alignItems: 'flex-start',
												paddingHorizontal: 20,
												paddingVertical: 8,
											}}
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
										</View>
									</Pressable>
									{index + 1 !== filteredStudents.length && (
										<View style={{ width: '100%', alignItems: 'center' }}>
											<View style={{ width: '90%', height: 1, backgroundColor: colors.variants.grey[0] }} />
										</View>
									)}
								</>
							)}
							keyExtractor={(item) => item._id}
						/>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default PickStudentsModal
