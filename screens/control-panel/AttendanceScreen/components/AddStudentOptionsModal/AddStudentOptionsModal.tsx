import React from 'react'
import { Modal } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@/theme/colors'
import capitalizeWords from '@/shared/capitalize-words'
import {
	CloseButton,
	HeaderContainer,
	HeaderTitle,
	ModalContent,
	ModalOverlay,
	OptionButton,
	OptionsContainer,
	OptionText,
	StudentName,
} from './AddStudentOptionsModal.styles'

export type TAddStudentOptions = 'permanent' | 'day-only' | 'makeup'

interface AddStudentOptionsModalProps {
	visible: boolean
	onClose: () => void
	onSelectOption: (option: TAddStudentOptions) => void
	studentName: string
	hasRecoveryCredits: boolean
}

const AddStudentOptionsModal: React.FC<AddStudentOptionsModalProps> = ({
	visible,
	onClose,
	onSelectOption,
	studentName,
	hasRecoveryCredits,
}) => {
	const options: {
		id: TAddStudentOptions
		label: string
		icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
		disabled?: boolean
	}[] = [
		{ id: 'permanent', label: 'Permanent', icon: 'account-plus' },
		{ id: 'day-only', label: 'Day Only', icon: 'calendar-today' },
		{ id: 'makeup', label: 'Makeup', icon: 'calendar-refresh', disabled: !hasRecoveryCredits },
	]

	const renderIcon = (
		iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'],
		isDisabled?: boolean,
	) => {
		const color = isDisabled ? colors.variants.grey[2] : colors.variants.secondary[5]
		return <MaterialCommunityIcons name={iconName} size={28} color={color} />
	}

	return (
		<Modal visible={visible} animationType='fade' transparent={true} onRequestClose={onClose}>
			<ModalOverlay>
				<ModalContent>
					<HeaderContainer>
						<HeaderTitle>Add Student</HeaderTitle>
						<CloseButton onPress={onClose}>
							<MaterialCommunityIcons name='close' size={20} color={colors.variants.grey[4]} />
						</CloseButton>
					</HeaderContainer>

					<StudentName>{capitalizeWords(studentName)}</StudentName>

					<OptionsContainer>
						{options.map((option) => (
							<OptionButton
								key={option.id}
								onPress={() => onSelectOption(option.id)}
								disabled={option.disabled}
								selected={false} // No necessary selection state
							>
								{renderIcon(option.icon, option.disabled)}
								<OptionText selected={false} style={{ color: option.disabled ? colors.variants.grey[2] : colors.variants.secondary[5] }}>
									{option.label}
								</OptionText>
							</OptionButton>
						))}
					</OptionsContainer>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	)
}

export default AddStudentOptionsModal 