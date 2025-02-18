import React from 'react'
import { View, Text, Modal, ScrollView, FlatList, Pressable } from 'react-native'
import { useAppSelector } from '@/redux/store'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'

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
	return (
		<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, justifyContent: 'flex-start' }}>
				<ScreenHeader label='Pick a Class' showBackButton={true} handleBack={closeModal} />
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ScrollView>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={[{ name: 'All classes', _id: 'all' }, ...(karateClassesByAdminList || [])]}
							renderItem={({ item }) => (
								<Pressable onPress={() => selectClass(item._id)}>
									<View style={{ paddingVertical: 10, paddingHorizontal: 20, gap: 10 }}>
										<Text numberOfLines={2}>{item.name}</Text>
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

export default SelectClassModal
