import { Modal, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ICustomOptionsModalProps } from './helpers/custom-options-modal-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import {
	ActionsContainer,
	ButtonText,
	CancelButton,
	ConfirmationButton,
	EmptyListText,
	ModalBackdrop,
	ModalContainer,
	ModalTitle,
	OptionItem,
	OptionsContainer,
	OptionText,
} from './custom-options-modal-styles'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'

const CustomOptionsModal = ({
	openModal,
	closeModal,
	title = '',
	options = [],
	selected = [],
	handleSaveOptions,
}: ICustomOptionsModalProps) => {
	const [optionsModal, setOptionsModal] = useState<string[]>(selected)

	useEffect(() => {
		setOptionsModal(selected)
	}, [selected, openModal])

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
			<ModalBackdrop>
				<ModalContainer height={options.length === 0 ? 250 : 'auto'}>
					<ModalTitle>{title}</ModalTitle>
					<OptionsContainer>
						{options?.length > 0 ? (
							options.map((option, index) => (
								<OptionItem key={'option-' + index} onPress={() => handleOptionPress(option)}>
									<OptionText>{capitalizeWords(option)}</OptionText>
									{optionsModal.includes(option) && (
										<MaterialIcons name='check' size={24} color={colors.green} />
									)}
								</OptionItem>
							))
						) : (
							<EmptyListText>No options available</EmptyListText>
						)}
					</OptionsContainer>
					<ActionsContainer>
						<CancelButton onPress={closeModal}>
							<Text style={{ color: colors.view.tertiary, fontWeight: 'bold' }}>CANCEL</Text>
						</CancelButton>
						<ConfirmationButton onPress={handleSave}>
							<ButtonText>CONFIRM</ButtonText>
						</ConfirmationButton>
					</ActionsContainer>
				</ModalContainer>
			</ModalBackdrop>
		</Modal>
	)
}

export default CustomOptionsModal
