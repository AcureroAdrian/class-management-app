import React, { useState, useEffect } from 'react'
import { Modal, Text } from 'react-native'
import { ICustomSelectModalProps } from './helpers/custom-select-modal-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'
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
} from './custom-select-modal-styles'

const CustomSelectModal = ({
	openModal,
	closeModal,
	title = '',
	options = [],
	selected = '',
	handleSaveOption,
}: ICustomSelectModalProps) => {
	const [tempSelectedOption, setTempSelectedOption] = useState(selected)

	useEffect(() => {
		setTempSelectedOption(selected)
	}, [selected])

	const handleConfirm = () => {
		handleSaveOption(tempSelectedOption)
		closeModal()
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} transparent statusBarTranslucent={true}>
			<ModalBackdrop>
				<ModalContainer height={options.length === 0 ? 250 : 'auto'}>
					<ModalTitle>{title}</ModalTitle>
					<OptionsContainer>
						{options.length > 0 ? (
							options.map((option, index) => (
								<OptionItem key={'option-' + index} onPress={() => setTempSelectedOption(option)}>
									<OptionText>{capitalizeWords(option)}</OptionText>
									{option === tempSelectedOption && (
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
						<ConfirmationButton onPress={handleConfirm} disabled={!tempSelectedOption}>
							<ButtonText>CONFIRM</ButtonText>
						</ConfirmationButton>
					</ActionsContainer>
				</ModalContainer>
			</ModalBackdrop>
		</Modal>
	)
}

export default CustomSelectModal
