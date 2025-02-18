import React, { useState } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import colors from '@/theme/colors'

const DailyReportModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showStartDate, setShowStartDate] = useState<boolean>(false)
	const [showEndDate, setShowEndDate] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date>(new Date())
	const [endDate, setEndDate] = useState<Date>(new Date())

	const onChangeStartDate = (event, selectedDate) => {
		setErrorMessage(null)
		const currentDate = selectedDate || startDate
		setShowStartDate(false)
		setStartDate(currentDate)
	}
	const onChangeEndDate = (event, selectedDate) => {
		setErrorMessage(null)
		const currentDate = selectedDate || endDate
		setShowEndDate(false)
		setEndDate(currentDate)
	}

	return (
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				<KeyboardAvoidingWrapper>
					<View>
						<ScreenHeader label='Daily Report' showBackButton={true} handleBack={closeModal} />
						<View style={{ width: '100%', alignItems: 'center' }}>
							{showStartDate && (
								<DateTimePicker
									testID='startDateTimePicker'
									value={startDate}
									mode='date'
									is24Hour={true}
									display='default'
									onChange={onChangeStartDate}
									maximumDate={new Date()}
								/>
							)}
							{showEndDate && (
								<DateTimePicker
									testID='endDateTimePicker'
									value={endDate}
									mode='date'
									is24Hour={true}
									display='default'
									onChange={onChangeEndDate}
									maximumDate={new Date()}
								/>
							)}
							<Text style={{ padding: 20, fontSize: 16, color: colors.brand }}>
								Select start and end dates for the report
							</Text>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='Start Time'
									placeholderTextColor={colors.darkLight}
									value={startDate ? format(new Date(startDate), 'MMMM dd, yyyy') : ''}
									editable={false}
									onPress={() => setShowStartDate(true)}
									style={{
										fontSize: 15,
									}}
								/>
							</View>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='End Time'
									placeholderTextColor={colors.darkLight}
									value={endDate ? format(new Date(endDate), 'MMMM dd, yyyy') : ''}
									editable={false}
									onPress={() => setShowEndDate(true)}
									style={{
										fontSize: 15,
									}}
								/>
							</View>
							<Pressable onPress={closeModal}>
								<View
									style={{
										width: '100%',
										paddingHorizontal: 20,
										paddingVertical: 10,
										backgroundColor: colors.brand,
										borderRadius: 10,
										marginTop: 20,
									}}
								>
									<Text style={{ color: colors.primary }}>Generate Report</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</KeyboardAvoidingWrapper>
			</Modal>
		</>
	)
}

export default DailyReportModal
