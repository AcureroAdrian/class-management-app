import React, { useState, useEffect } from 'react'
import { Alert, TextInput, Text, View, Modal, Pressable, ScrollView } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { resetAttendanceSystem, resetAttendanceSystemReset } from '@/redux/actions/systemActions'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import colors from '@/theme/colors'
import styled from 'styled-components/native'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

interface ISystemConfigModalProps {
	openModal: boolean
	closeModal: () => void
}

const SystemConfigModal = ({ openModal, closeModal }: ISystemConfigModalProps) => {
	const dispatch = useAppDispatch()
	const [confirmationText, setConfirmationText] = useState('')
	const REQUIRED_TEXT = 'RESET ATTENDANCE SYSTEM'

	const { loadingResetAttendanceSystem, successResetAttendanceSystem, errorResetAttendanceSystem } = useAppSelector(
		(state) => state.resetAttendanceSystem
	)

	const isButtonEnabled = confirmationText === REQUIRED_TEXT

	useEffect(() => {
		if (successResetAttendanceSystem) {
			Alert.alert(
				'¡Éxito!',
				'El sistema de asistencias ha sido reseteado completamente.',
				[
					{
						text: 'OK',
						onPress: () => {
							dispatch(resetAttendanceSystemReset())
							setConfirmationText('')
							closeModal()
						},
					},
				]
			)
		}
	}, [successResetAttendanceSystem])

	useEffect(() => {
		if (errorResetAttendanceSystem) {
			Alert.alert('Error', errorResetAttendanceSystem, [
				{
					text: 'OK',
					onPress: () => {
						dispatch(resetAttendanceSystemReset())
					},
				},
			])
		}
	}, [errorResetAttendanceSystem])

	const handleResetSystem = () => {
		Alert.alert(
			'⚠️ CONFIRMACIÓN CRÍTICA',
			'Esta acción eliminará PERMANENTEMENTE:\n\n• Todas las asistencias\n• Todas las clases de recuperación\n• Todos los días festivos\n• Todo el historial de reportes\n\n¿Estás COMPLETAMENTE SEGURO?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'SÍ, RESETEAR TODO',
					style: 'destructive',
					onPress: () => {
						dispatch(resetAttendanceSystem(confirmationText))
					},
				},
			]
		)
	}

	const handleCloseModal = () => {
		if (!loadingResetAttendanceSystem) {
			setConfirmationText('')
			dispatch(resetAttendanceSystemReset())
			closeModal()
		}
	}

	return (
		<Modal
			visible={openModal}
			animationType="fade"
			onRequestClose={handleCloseModal}
			statusBarTranslucent={true}
		>
			<Container>
				<ScreenHeader label="System Configuration" showBackButton handleBack={handleCloseModal} />
				

				<Content>
                    <KeyboardAvoidingWrapper>
					<SectionTitle>Reset Attendance System</SectionTitle>

					<WarningContainer>
						<WarningText>⚠️ ACCIÓN PELIGROSA ⚠️</WarningText>
						<WarningDescription>
							Esta función eliminará PERMANENTEMENTE:
							{'\n'}• Todas las asistencias históricas
							{'\n'}• Todas las clases de recuperación
							{'\n'}• Todos los días festivos
							{'\n'}• Todo el historial de reportes
							{'\n\n'}Los estudiantes y clases NO se eliminarán.
						</WarningDescription>
					</WarningContainer>


					<ConfirmationContainer>
						<ConfirmationLabel>
							Para confirmar, escriba exactamente:
							{'\n'}<RequiredText>{REQUIRED_TEXT}</RequiredText>
						</ConfirmationLabel>
						<ConfirmationInput
							value={confirmationText}
							onChangeText={setConfirmationText}
							placeholder="Escriba el texto de confirmación aquí..."
							editable={!loadingResetAttendanceSystem}
							autoCapitalize="characters"
						/>
					</ConfirmationContainer>

					<ResetButton
						onPress={handleResetSystem}
						disabled={!isButtonEnabled || loadingResetAttendanceSystem}
						style={{
							backgroundColor: isButtonEnabled ? colors.red : colors.variants.grey[2],
							opacity: (!isButtonEnabled || loadingResetAttendanceSystem) ? 0.5 : 1,
						}}
					>
						<ResetButtonText style={{
							color: isButtonEnabled ? colors.primary : colors.variants.grey[5],
						}}>
							{loadingResetAttendanceSystem ? 'Reseteando...' : 'RESET ATTENDANCE SYSTEM'}
						</ResetButtonText>
					</ResetButton>
                    </KeyboardAvoidingWrapper>
				</Content>
			</Container>
		</Modal>
	)
}

const Container = styled.View`
	flex: 1;
	background-color: ${colors.primary};
`

const Content = styled.ScrollView`
	flex: 1;
	padding: 20px;
`

const SectionTitle = styled.Text`
	font-size: 24px;
	font-weight: bold;
	color: ${colors.tertiary};
	margin-bottom: 20px;
	text-align: center;
`

const WarningContainer = styled.View`
	background-color: #fef2f2;
	border: 2px solid ${colors.red};
	border-radius: 8px;
	padding: 15px;
	margin-bottom: 20px;
`

const WarningText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: ${colors.red};
	text-align: center;
	margin-bottom: 10px;
`

const WarningDescription = styled.Text`
	font-size: 14px;
	color: ${colors.red};
	line-height: 20px;
`

const ConfirmationContainer = styled.View`
	margin-bottom: 20px;
`

const ConfirmationLabel = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[6]};
	margin-bottom: 10px;
	text-align: center;
`

const RequiredText = styled.Text`
	font-weight: bold;
	color: ${colors.red};
	font-family: monospace;
`

const ConfirmationInput = styled.TextInput`
	border: 2px solid ${colors.variants.grey[2]};
	border-radius: 8px;
	padding: 12px;
	font-size: 16px;
	color: ${colors.tertiary};
	background-color: ${colors.primary};
	font-family: monospace;
	text-align: center;
`

const ResetButton = styled.Pressable`
	padding: 15px;
	border-radius: 8px;
	margin-top: 20px;
	align-items: center;
	justify-content: center;
`

const ResetButtonText = styled.Text`
	font-size: 16px;
	font-weight: bold;
	text-align: center;
`

export default SystemConfigModal 