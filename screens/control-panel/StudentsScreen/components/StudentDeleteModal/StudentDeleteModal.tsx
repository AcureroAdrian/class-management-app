import React, { useEffect, useState } from 'react'
import { Modal, Pressable, ActivityIndicator, Platform } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format, addDays } from 'date-fns'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import colors from '@/theme/colors'
import * as S from './styles'

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

	return (
		<Modal
			visible={openModal}
			animationType='fade'
			onRequestClose={handleClose}
			transparent
			statusBarTranslucent={true}
		>
			<S.ModalOverlay>
				<S.ModalContainer>
					<S.Title>
						{existingScheduledDate ? 'Modify Scheduled Deletion' : 'Delete Student'}
					</S.Title>
					<S.Separator />

					<S.Description>
						{existingScheduledDate 
							? `This student is scheduled for deletion on ${format(new Date(existingScheduledDate), 'MMM dd, yyyy')}. You can modify the date or delete immediately.`
							: title
						}
					</S.Description>

					<S.InputContainer>
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
							<S.ClearDateButton onPress={() => setScheduledDate(undefined)}>
								<S.ClearDateText>
									Clear date (delete immediately)
								</S.ClearDateText>
							</S.ClearDateButton>
						)}
					</S.InputContainer>

					{scheduledDate && (
						<S.ScheduledDateContainer>
							<S.ScheduledDateText>
								Scheduled for: {format(scheduledDate, 'MMM dd, yyyy')}
							</S.ScheduledDateText>
						</S.ScheduledDateContainer>
					)}

					{errorDelete && (
						<S.ErrorText>{errorDelete}</S.ErrorText>
					)}

					<S.ButtonsContainer>
						<Pressable onPress={handleClose} disabled={loadingDelete}>
							<S.CancelButton>
								<S.CancelButtonText>Cancel</S.CancelButtonText>
							</S.CancelButton>
						</Pressable>
						<Pressable onPress={handleConfirmDeletion} disabled={loadingDelete}>
							<S.ConfirmButton scheduled={!!scheduledDate}>
								{loadingDelete ? (
									<ActivityIndicator size={'small'} color={'#fff'} />
								) : (
									<S.ConfirmButtonText>{buttonText}</S.ConfirmButtonText>
								)}
							</S.ConfirmButton>
						</Pressable>
					</S.ButtonsContainer>
				</S.ModalContainer>
			</S.ModalOverlay>

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
