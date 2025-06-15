import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator, Platform } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format, addDays } from 'date-fns'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import colors from '@/theme/colors'

interface IStudentDeleteModalProps {
	openModal: boolean
	closeModal: () => void
	title: string
	handleConfirm: (scheduledDate?: Date) => void
	loadingDelete?: boolean
	errorDelete?: string
	existingScheduledDate?: string
}

const StudentDeleteModal = ({
	openModal,
	closeModal,
	title = '',
	handleConfirm = () => {},
	loadingDelete,
	errorDelete,
	existingScheduledDate,
}: IStudentDeleteModalProps) => {
	const [scheduledDate, setScheduledDate] = useState<Date | undefined>(existingScheduledDate ? new Date(existingScheduledDate) : undefined)
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const iosDisplay = parseInt(Platform.Version as string, 10) >= 14 ? 'inline' : 'spinner';

	useEffect(() => {
		// Al abrir el modal, establecer la fecha existente si la hay
		if (openModal && existingScheduledDate) {
			setScheduledDate(new Date(existingScheduledDate))
		}
		
		return () => {
			if (!openModal) {
				setScheduledDate(undefined)
				setShowDatePicker(false)
			}
		}
	}, [openModal, existingScheduledDate])

	const handleSelectDate = (date: Date) => {
		setScheduledDate(date)
		setShowDatePicker(false)
	}

	const handleConfirmDeletion = () => {
		handleConfirm(scheduledDate)
		setScheduledDate(undefined)
	}

	const handleClose = () => {
		setScheduledDate(undefined)
		setShowDatePicker(false)
		closeModal()
	}

	const buttonText = scheduledDate ? 'Schedule Delete' : 'Delete Now'
	const minDate = addDays(new Date(), 1) // Mínimo 1 día en el futuro

	// Si el DateTimePicker está abierto, no mostrar el modal principal

	return (
		<Modal
			visible={openModal}
			animationType='fade'
			onRequestClose={handleClose}
			transparent
			statusBarTranslucent={true}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						backgroundColor: '#fff',
						width: '85%',
						maxHeight: 600,
						height: 'auto',
						padding: 20,
						borderRadius: 8,
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
						{existingScheduledDate ? 'Modify Scheduled Deletion' : 'Delete Student'}
					</Text>
					<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[0], marginVertical: 10 }} />

					<Text style={{ fontSize: 16, marginBottom: 20, lineHeight: 22 }}>
						{existingScheduledDate 
							? `This student is scheduled for deletion on ${format(new Date(existingScheduledDate), 'MMM dd, yyyy')}. You can modify the date or delete immediately.`
							: title
						}
					</Text>

					<View style={{ marginBottom: 20 }}>
						<CustomInputForm
							label='Schedule Deletion (Optional)'
							placeholder='Select date to schedule deletion'
							placeholderTextColor={colors.variants.secondary[2]}
							value={scheduledDate ? format(scheduledDate, 'yyyy-MM-dd') : ''}
							editable={false}
							onPress={() => !loadingDelete && setShowDatePicker(true)}
							icon='calendar'
						/>
						{scheduledDate && (
							<Pressable onPress={() => setScheduledDate(undefined)} style={{ marginTop: 8, alignSelf: 'flex-start' }}>
								<Text style={{ color: colors.brand, fontSize: 14, textDecorationLine: 'underline' }}>
									Clear date (delete immediately)
								</Text>
							</Pressable>
						)}
					</View>

					{scheduledDate && (
						<View
							style={{ backgroundColor: colors.variants.secondary[0], padding: 12, borderRadius: 6, marginBottom: 15 }}
						>
							<Text style={{ fontSize: 14, color: colors.variants.secondary[4], textAlign: 'center' }}>
								Scheduled for: {format(scheduledDate, 'MMM dd, yyyy')}
							</Text>
						</View>
					)}

					{errorDelete && (
						<Text style={{ color: colors.variants.primary[5], marginBottom: 15, fontSize: 14 }}>{errorDelete}</Text>
					)}

					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
						<Pressable onPress={handleClose} disabled={loadingDelete}>
							<View
								style={{
									paddingVertical: 12,
									paddingHorizontal: 20,
									borderColor: colors.brand,
									borderWidth: 1,
									borderRadius: 6,
								}}
							>
								<Text style={{ color: colors.brand, fontSize: 16 }}>Cancel</Text>
							</View>
						</Pressable>
						<Pressable onPress={handleConfirmDeletion} disabled={loadingDelete}>
							<View
								style={{
									paddingVertical: 12,
									paddingHorizontal: 20,
									backgroundColor: scheduledDate ? colors.variants.secondary[4] : colors.brand,
									borderRadius: 6,
									minWidth: 120,
									alignItems: 'center',
								}}
							>
								{loadingDelete ? (
									<ActivityIndicator size={'small'} color={'#fff'} />
								) : (
									<Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>{buttonText}</Text>
								)}
							</View>
						</Pressable>
					</View>
				</View>
			</View>

			{showDatePicker && (
				<DateTimePickerModal
					isVisible={showDatePicker}
					mode='date'
					onConfirm={handleSelectDate}
					onCancel={() => setShowDatePicker(false)}
					display={Platform.OS === 'ios' ? iosDisplay : 'calendar'}
					minimumDate={minDate}
					date={scheduledDate || minDate}
				/>
			)}
		</Modal>
	)
}

export default StudentDeleteModal
