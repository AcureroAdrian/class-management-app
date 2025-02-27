import React from 'react'
import { View, Text, Modal, ScrollView, FlatList, Pressable } from 'react-native'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'

const SelectClassModal = ({
	openModal,
	closeModal,
	selectClass,
}: {
	openModal: boolean
	closeModal: () => void
	selectClass: (classId: string) => void
}) => {
	const { karateClassesByAdminList } = useAppSelector((state) => state.getKarateClassesByAdmin)
	const { karateClassesByStudentIdList } = useAppSelector((state) => state.getKarateClassesByStudentId)

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, justifyContent: 'flex-start' }}>
				<ScreenHeader label='Pick a Class' showBackButton={true} handleBack={closeModal} />
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={[
								{ name: 'All classes', _id: 'all' },
								...(karateClassesByAdminList || karateClassesByStudentIdList || []),
							]}
							renderItem={({ item }) => (
								<Pressable onPress={() => selectClass(item._id)}>
									<View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
										<Text numberOfLines={2}>{item.name}</Text>
									</View>
									<View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
										<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[0] }} />
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

export default SelectClassModal
