import React, { useEffect, useState } from 'react'
import { View, Text, Modal, ScrollView, FlatList, Pressable, TextInput, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useAppSelector } from '@/redux/store'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import capitalizeWords from '@/shared/capitalize-words'
import { IStudent } from '../helpers/report-screen-interfaces'
import colors from '@/theme/colors'

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
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={filteredStudents.sort((a, b) => a?.name?.localeCompare(b?.name))}
							renderItem={({ item, index }) => (
								<>
									<Pressable onPress={() => selectStudent(item?._id)}>
										<View
											style={{ paddingHorizontal: 20, paddingVertical: 8, alignItems: 'flex-start' }}
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
													<Text numberOfLines={1} style={{ fontSize: 16, color: colors.view.black }}>
														{capitalizeWords(item.name)}
													</Text>
													<Text numberOfLines={1} style={{ fontSize: 14, color: colors.variants.grey[4] }}>
														{capitalizeWords(item?.lastName)}
													</Text>
												</View>
											</View>
										</View>
									</Pressable>
									{index + 1 !== filteredStudents.length && (
										<View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
											<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[0] }} />
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

export default SelectStudentModal
