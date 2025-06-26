import React, { useState, useEffect } from 'react'
import { Modal } from 'react-native'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import {
	ModalOverlay,
	ModalContent,
	Header,
	Title,
	CloseButton,
	StudentName,
	NotesInput,
	ButtonsContainer,
	ActionButton,
	ActionButtonText,
} from './StudentNotesModal.styles'

interface StudentNotesModalProps {
	visible: boolean
	onClose: () => void
	student: any
	onSave: (studentId: string, notes: string) => void
}

const StudentNotesModal = ({ 
	visible, 
	onClose, 
	student, 
	onSave 
}: StudentNotesModalProps) => {
	const [notes, setNotes] = useState('')

	useEffect(() => {
		if (student) {
			setNotes(student.observations || '')
		}
	}, [student])

	const handleSave = () => {
		if (student) {
			onSave(student.student, notes)
		}
		handleClose()
	}

	const handleClose = () => {
		setNotes('')
		onClose()
	}

	return (
		<Modal visible={visible} animationType='fade' transparent={true} onRequestClose={handleClose}>
			<KeyboardAvoidingWrapper enableOnAndroid={false}>
				<ModalOverlay>
					<ModalContent>
						<Header>
							<Title>Student Notes</Title>
							<CloseButton onPress={handleClose}>
								<MaterialCommunityIcons 
									name='close' 
									size={20} 
									color={colors.variants.grey[4]} 
								/>
							</CloseButton>
						</Header>

						{student && (
							<StudentName>
								{student.name} {student.lastName}
							</StudentName>
						)}

						<NotesInput
							placeholder='Write notes for this student in this class...'
							placeholderTextColor={colors.variants.grey[3]}
							value={notes}
							onChangeText={setNotes}
							multiline={true}
							numberOfLines={6}
							selectionColor={colors.variants.secondary[4]}
						/>

						<ButtonsContainer>
							<ActionButton onPress={handleClose} cancel>
								<ActionButtonText cancel>Cancel</ActionButtonText>
							</ActionButton>
							<ActionButton onPress={handleSave}>
								<ActionButtonText>Save Note</ActionButtonText>
							</ActionButton>
						</ButtonsContainer>
					</ModalContent>
				</ModalOverlay>
			</KeyboardAvoidingWrapper>
		</Modal>
	)
}

export default StudentNotesModal
