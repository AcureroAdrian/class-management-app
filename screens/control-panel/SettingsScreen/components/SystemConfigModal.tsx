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
				'Success!',
				'The attendance system has been completely reset.',
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
			'⚠️ CRITICAL CONFIRMATION',
			'This action will PERMANENTLY delete:\n\n• All attendance records\n• All recovery classes\n• All holidays\n• All report history\n\nAre you COMPLETELY SURE?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'YES, RESET EVERYTHING',
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
						{/* Header Section */}
						<HeaderSection>
							<HeaderTitle>Reset Attendance System</HeaderTitle>
							<HeaderSubtitle>Permanently delete all attendance data and reports</HeaderSubtitle>
						</HeaderSection>

						<WarningContainer>
							<WarningText>⚠️ DANGEROUS ACTION ⚠️</WarningText>
							<WarningDescription>
								This function will PERMANENTLY delete:
								{'\n'}• All historical attendance records
								{'\n'}• All recovery classes
								{'\n'}• All holidays
								{'\n'}• All report history
								{'\n\n'}Students and classes will NOT be deleted.
							</WarningDescription>
						</WarningContainer>

						<ConfirmationContainer>
							<ConfirmationLabel>
								To confirm, type exactly:
								{'\n'}<RequiredText>{REQUIRED_TEXT}</RequiredText>
							</ConfirmationLabel>
							<ConfirmationInput
								value={confirmationText}
								onChangeText={setConfirmationText}
								placeholder="Type the confirmation text here..."
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
								{loadingResetAttendanceSystem ? 'Resetting...' : 'RESET ATTENDANCE SYSTEM'}
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

const HeaderSection = styled.View`
	margin-bottom: 32px;
`

const HeaderTitle = styled.Text`
	font-size: 28px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 8px;
	letter-spacing: -0.5px;
`

const HeaderSubtitle = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[4]};
	line-height: 22px;
	letter-spacing: -0.2px;
`

const WarningContainer = styled.View`
	background-color: #fef2f2;
	border: 1px solid ${colors.red};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 24px;
	border-left-width: 4px;
	border-left-color: ${colors.red};
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
`

const WarningText = styled.Text`
	font-size: 18px;
	font-weight: 700;
	color: ${colors.red};
	text-align: center;
	margin-bottom: 12px;
	letter-spacing: -0.3px;
`

const WarningDescription = styled.Text`
	font-size: 14px;
	color: ${colors.red};
	line-height: 20px;
	letter-spacing: -0.1px;
`

const ConfirmationContainer = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 24px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
`

const ConfirmationLabel = styled.Text`
	font-size: 16px;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 16px;
	text-align: center;
	letter-spacing: -0.2px;
	font-weight: 500;
`

const RequiredText = styled.Text`
	font-weight: 700;
	color: ${colors.red};
	font-family: monospace;
	letter-spacing: -0.1px;
`

const ConfirmationInput = styled.TextInput`
	border: 2px solid ${colors.variants.grey[2]};
	border-radius: 12px;
	padding: 16px;
	font-size: 16px;
	color: ${colors.variants.secondary[5]};
	background-color: ${colors.variants.secondary[0]};
	font-family: monospace;
	text-align: center;
	letter-spacing: -0.1px;
`

const ResetButton = styled.Pressable`
	padding: 16px 24px;
	border-radius: 12px;
	margin-top: 24px;
	align-items: center;
	justify-content: center;
	shadow-color: ${colors.red};
	shadow-offset: 0px 4px;
	shadow-opacity: 0.3;
	shadow-radius: 8px;
	elevation: 8;
`

const ResetButtonText = styled.Text`
	font-size: 16px;
	font-weight: 700;
	text-align: center;
	letter-spacing: -0.2px;
`

export default SystemConfigModal 