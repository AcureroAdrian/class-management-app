import React from 'react'
import { View, Text, Modal, Button } from 'react-native'
import HeaderScreen from '@/components/HeaderScreen/HeaderScreen'

const StudentsRegisterModal = ({ openModal, closeModal }) => {
	return (
		<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View>
				<HeaderScreen
					label='Add Students'
					labelButton='Save'
					iconName='save'
					disabledButton={false}
					handleOnPress={closeModal}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<Text>ClassRegisterModal</Text>
				<Button title='Close' onPress={closeModal} />
			</View>
		</Modal>
	)
}

export default StudentsRegisterModal
