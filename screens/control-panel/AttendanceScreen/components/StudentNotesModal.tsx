import React, { useState, useEffect } from 'react'
import { View, Modal, Text, TextInput, Pressable } from 'react-native'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

interface StudentNotesModalProps {
	visible: boolean
	onClose: () => void
	student: any
	onSave: (studentId: string, notes: string) => void
}

const StudentNotesModal: React.FC<StudentNotesModalProps> = ({ visible, onClose, student, onSave }) => {
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
	}

	const handleClose = () => {
		setNotes('')
		onClose()
	}

	return (
		<Modal visible={visible} animationType='fade' transparent={true} onRequestClose={handleClose}>
			<KeyboardAvoidingWrapper enableOnAndroid={false}>
				<View
					style={{
						flex: 1,
						backgroundColor: 'rgba(0,0,0,0.5)',
						justifyContent: 'center',
						alignItems: 'center',
						paddingHorizontal: 20,
					}}
				>
					<View
						style={{
							backgroundColor: colors.primary,
							borderRadius: 15,
							padding: 20,
							width: '100%',
							maxWidth: 400,
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}
					>
						{/* Header */}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 20,
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: '600',
									color: colors.variants.secondary[5],
								}}
							>
								Notas del Estudiante
							</Text>
							<Pressable
								onPress={handleClose}
								style={{
									padding: 5,
									borderRadius: 5,
								}}
							>
								<MaterialCommunityIcons name='close' size={24} color={colors.variants.grey[4]} />
							</Pressable>
						</View>

						{/* Student Info */}
						{student && (
							<Text
								style={{
									fontSize: 16,
									color: colors.variants.secondary[4],
									marginBottom: 15,
									textAlign: 'center',
								}}
							>
								{student.name} {student.lastName}
							</Text>
						)}

						{/* Notes Input */}
						<TextInput
							style={{
								backgroundColor: colors.variants.secondary[1],
								borderRadius: 10,
								padding: 15,
								minHeight: 120,
								textAlignVertical: 'top',
								fontSize: 16,
								color: colors.view.black,
								borderWidth: 1,
								borderColor: colors.variants.grey[1],
							}}
							placeholder='Escribe las notas para este estudiante en esta clase...'
							placeholderTextColor={colors.variants.grey[3]}
							value={notes}
							onChangeText={setNotes}
							multiline={true}
							numberOfLines={6}
						/>

						{/* Action Buttons */}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 20,
								gap: 10,
							}}
						>
							<Pressable
								onPress={handleClose}
								style={{
									flex: 1,
									backgroundColor: colors.variants.grey[2],
									paddingVertical: 12,
									borderRadius: 8,
									alignItems: 'center',
								}}
							>
								<Text
									style={{
										color: colors.variants.grey[5],
										fontSize: 16,
										fontWeight: '600',
									}}
								>
									Cancelar
								</Text>
							</Pressable>
							<Pressable
								onPress={handleSave}
								style={{
									flex: 1,
									backgroundColor: colors.variants.primary[4],
									paddingVertical: 12,
									borderRadius: 8,
									alignItems: 'center',
								}}
							>
								<Text
									style={{
										color: colors.primary,
										fontSize: 16,
										fontWeight: '600',
									}}
								>
									Guardar
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</KeyboardAvoidingWrapper>
		</Modal>
	)
}

export default StudentNotesModal
