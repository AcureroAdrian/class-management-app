import React from 'react'
import { View, Text, Modal, Pressable, ScrollView } from 'react-native'
import { ICustomSelectModalProps } from './helpers/custom-select-modal-interfaces'
import capitalizeWords from '@/shared/capitalize-words'

const CustomSelectModal = ({
	openModal,
	closeModal,
	title = '',
	options = [],
	selected = '',
	handleSaveOption,
}: ICustomSelectModalProps) => {
	const handleOptionPress = (option: string) => {
		handleSaveOption(option)
		closeModal()
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} transparent statusBarTranslucent={true}>
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						backgroundColor: '#fff',
						width: '80%',
						maxHeight: 600,
						height: 'auto',
						padding: 20,
						borderRadius: 3,
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
					<View style={{ paddingTop: 10, paddingBottom: 10, maxHeight: 400 }}>
						<ScrollView>
							{options?.map((option, index) => (
								<Pressable key={'option-' + index} onPress={() => handleOptionPress(option)}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginBottom: 10,
										}}
									>
										<Text style={{ fontSize: 16, padding: 10 }}>{capitalizeWords(option)}</Text>
										{option === selected && <Text style={{ color: 'green' }}>✓</Text>}
									</View>
								</Pressable>
							))}
						</ScrollView>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, gap: 20, marginTop: 10 }}>
						<Pressable onPress={closeModal}>
							<Text style={{ color: 'blue', paddingLeft: 5, paddingRight: 5 }}>CANCEL</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default CustomSelectModal
