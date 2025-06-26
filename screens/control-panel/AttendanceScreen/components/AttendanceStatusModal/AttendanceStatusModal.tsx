import React from 'react'
import { Modal } from 'react-native'
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { TAttendanceStatus } from '@/shared/common-types'
import { getStatusColor, getStatusText, getStatusIconInfo } from '@/shared/attendance-helpers'
import colors from '@/theme/colors'
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
	AddNoteButton,
	AddNoteText,
} from './AttendanceStatusModal.styles'

interface AttendanceStatusModalProps {
	visible: boolean
	onClose: () => void
	onSelectStatus: (status: TAttendanceStatus) => void
	onAddNote: () => void
	currentStatus: TAttendanceStatus
	studentName: string
}

const AttendanceStatusModal: React.FC<AttendanceStatusModalProps> = ({
	visible,
	onClose,
	onSelectStatus,
	onAddNote,
	currentStatus,
	studentName,
}) => {
	const statusOptions: Array<{
		status: TAttendanceStatus
		label: string
	}> = [
		{ status: 'present', label: 'Attended' },
		{ status: 'good-behavior', label: 'Good Behavior' },
		{ status: 'bad-behavior', label: 'Bad Behavior' },
		{ status: 'late', label: 'Late' },
		{ status: 'absent', label: 'Absent' },
		{ status: 'sick', label: 'Sick' },
	]

	const getModernIconColor = (status: TAttendanceStatus, isSelected: boolean) => {
		if (!isSelected) return colors.variants.grey[3]
		
		switch (status) {
			case 'present':
				return '#4CAF50'
			case 'good-behavior':
				return '#FF9800'
			case 'bad-behavior':
				return '#F44336'
			case 'late':
				return '#2196F3'
			case 'absent':
				return '#F44336'
			case 'sick':
				return '#9C27B0'
			default:
				return colors.variants.grey[3]
		}
	}

	const renderIcon = (status: TAttendanceStatus, isSelected: boolean) => {
		const iconInfo = getStatusIconInfo(status)
		const color = getModernIconColor(status, isSelected)
		const size = 28
		
		if (iconInfo.library === 'FontAwesome') {
			return <FontAwesome name={iconInfo.name as any} size={size} color={color} />
		}
		return <AntDesign name={iconInfo.name as any} size={size} color={color} />
	}

	return (
		<Modal visible={visible} animationType='fade' transparent={true} onRequestClose={onClose}>
			<ModalOverlay>
				<ModalContent>
					<HeaderContainer>
						<HeaderTitle>Update Status</HeaderTitle>
						<CloseButton onPress={onClose}>
							<MaterialCommunityIcons name='close' size={20} color={colors.variants.grey[4]} />
						</CloseButton>
					</HeaderContainer>

					<StudentName>
						{studentName} - {getStatusText(currentStatus)}
					</StudentName>

					<OptionsContainer 
						style={{ 
							flexDirection: 'row', 
							flexWrap: 'wrap',
							justifyContent: 'space-between'
						}}
					>
						{statusOptions.map((option) => {
							const isSelected = currentStatus === option.status
							return (
								<OptionButton
									key={option.status}
									onPress={() => onSelectStatus(option.status)}
									selected={isSelected}
									status={option.status}
									style={{
										width: '48%',
										marginBottom: 8,
									}}
								>
									{renderIcon(option.status, isSelected)}
									<OptionText selected={isSelected}>
										{option.label}
									</OptionText>
								</OptionButton>
							)
						})}
					</OptionsContainer>

					<AddNoteButton
						onPress={() => {
							onAddNote()
							onClose()
						}}
					>
						<MaterialCommunityIcons 
							name='pencil-outline' 
							size={20} 
							color={colors.variants.secondary[5]} 
						/>
						<AddNoteText>Add / Edit Note</AddNoteText>
					</AddNoteButton>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	)
}

export default AttendanceStatusModal
