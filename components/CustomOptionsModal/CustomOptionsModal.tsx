import { View, Text, Modal, Button, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ICustomOptionsModalProps } from './helpers/custom-options-modal-interfaces'
import capitalizeWords from '@/shared/capitalize-words'

const CustomOptionsModal = ({
	openModal,
	closeModal,
	title = '',
	options = [],
	selected = [],
	handleSaveOptions,
}: ICustomOptionsModalProps) => {
	const [optionsModal, setOptionsModal] = useState<string[]>(selected)

	const handleSave = () => {
		handleSaveOptions(optionsModal)
		closeModal()
	}
	const handleOptionPress = (option: string) => {
		const exists = optionsModal.includes(option)

		if (exists) {
			setOptionsModal((prev) => prev.filter((item) => item !== option))
		} else {
			setOptionsModal((prev) => [...prev, option])
		}
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
										{optionsModal.includes(option) && <Text style={{ color: 'green' }}>✓</Text>}
									</View>
								</Pressable>
							))}
						</ScrollView>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10, gap: 20, marginTop: 10 }}>
						<Pressable onPress={closeModal}>
							<Text style={{ color: 'blue', paddingLeft: 5, paddingRight: 5 }}>CANCEL</Text>
						</Pressable>
						<Pressable onPress={handleSave}>
							<Text style={{ color: 'blue', paddingLeft: 5, paddingRight: 5 }}>OK</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default CustomOptionsModal
