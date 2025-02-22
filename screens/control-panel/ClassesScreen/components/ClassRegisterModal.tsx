import React, { useEffect, useState } from 'react'
import { View, Modal, Text } from 'react-native'
import { format, isDate } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import AssignedStudentsModal from './AssignedStudentsModal'
import { levelsInitialValues, weekDaysInitialValues } from '../helpers/karate-classes-initial-values'
import { shortDaysOfWeek, shortLevels } from '@/shared/short-values'
import { TDaysOfWeek, TUserLevel } from '@/shared/common-types'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { registerKarateClass } from '@/redux/actions/karateClassActions'
import { REGISTER_KARATE_CLASS_RESET } from '@/redux/constants/karateClassConstants'
import colors from '@/theme/colors'

const ClassRegisterModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showDate, setShowDate] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [startTime, setStartTime] = useState<Date>(new Date('2000-01-01 12:00:00'))
	const [weekDays, setWeekDays] = useState<TDaysOfWeek[]>(weekDaysInitialValues)
	const [levels, setLevels] = useState<TUserLevel[]>(levelsInitialValues)
	const [studentsAssigned, setStudentsAssigned] = useState<string[]>([])
	const [openWeekDaysModal, setOpenWeekDaysModal] = useState<boolean>(false)
	const [openLevelsModal, setOpenLevelsModal] = useState<boolean>(false)
	const [openAssignedStudentsModal, setOpenAssignedStudentsModal] = useState<boolean>(false)

	const { loadingRegisterKarateClass, errorRegisterKarateClass } = useAppSelector(
		(state: RootState) => state.registerKarateClass,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_KARATE_CLASS_RESET })
			closeModal()
		}
	}, [])
	useEffect(() => {
		if (errorRegisterKarateClass) {
			setErrorMessage(errorRegisterKarateClass)
		}
	}, [errorRegisterKarateClass])

	const onChange = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || startTime
		setStartTime(currentDate)
		setShowDate(false)
	}
	const handleRegisterClass = () => {
		setErrorMessage(null)
		if (!weekDays?.length) {
			setErrorMessage('Please select at least one day')
			return
		}
		if (!levels?.length) {
			setErrorMessage('Please select at least one student level')
			return
		}
		if (!startTime || !isDate(new Date(startTime))) {
			setErrorMessage('Please select a start time')
			return
		}

		const hour = startTime.getHours()
		const minute = startTime.getMinutes()
		dispatch(
			registerKarateClass({
				name,
				description,
				startTime: {
					hour,
					minute,
				},
				weekDays,
				students: studentsAssigned,
				minAge: 0,
				maxAge: 100,
				levels,
			}),
		)
	}
	const handleAssignStudents = (students: string[]) => {
		setStudentsAssigned(students)
	}

	return (
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				<KeyboardAvoidingWrapper>
					<View>
						<ScreenHeader
							label='New Class'
							labelButton='Save'
							iconName='save'
							disabledButton={loadingRegisterKarateClass}
							handleOnPress={handleRegisterClass}
							showBackButton={true}
							handleBack={closeModal}
						/>
						<View style={{ width: '100%', alignItems: 'center' }}>
							<View style={{ width: '90%' }}>
								<CustomInputForm
									label='Class Name'
									placeholder='Mon 7 PM Class'
									placeholderTextColor={colors.darkLight}
									onChangeText={setName}
									value={name}
								/>
								<CustomInputForm
									label='Additional Info'
									placeholder='Its a description ...'
									placeholderTextColor={colors.darkLight}
									onChangeText={setDescription}
									value={description}
								/>
								<CustomInputForm
									label='Start Time'
									placeholder='12:00 p.m.'
									placeholderTextColor={colors.darkLight}
									value={startTime ? format(new Date(startTime), 'HH:mm aaaa') : ''}
									editable={false}
									onPress={() => setShowDate(true)}
								/>
								<CustomInputForm
									label='Class Students'
									placeholder='Tap to add students'
									placeholderTextColor={colors.darkLight}
									value={`${studentsAssigned?.length} students (Tap to add students)`}
									editable={false}
									onPress={() => setOpenAssignedStudentsModal(true)}
								/>
								<CustomInputForm
									label='Weekdays'
									placeholder='Tap to manage class days'
									placeholderTextColor={colors.darkLight}
									value={
										weekDays?.length ? weekDays.map((day: TDaysOfWeek) => shortDaysOfWeek[day]).join(', ') : undefined
									}
									editable={false}
									onPress={() => setOpenWeekDaysModal(true)}
								/>
								<CustomInputForm
									label='Levels'
									placeholder='Tap to manage student levels'
									placeholderTextColor={colors.darkLight}
									value={levels?.length ? levels.map((day: TUserLevel) => shortLevels[day]).join(', ') : undefined}
									editable={false}
									onPress={() => setOpenLevelsModal(true)}
								/>
								{errorMessage && (
									<Text
										style={{
											textAlign: 'center',
											fontSize: 13,
											color: 'red',
										}}
									>
										{errorMessage}
									</Text>
								)}
							</View>
						</View>
					</View>
				</KeyboardAvoidingWrapper>
				{showDate && (
					<DateTimePickerModal
						isVisible={showDate}
						mode='time'
						is24Hour={true}
						onConfirm={onChange}
						onCancel={() => setShowDate(false)}
						display='spinner'
						date={startTime}
					/>
				)}
				{openAssignedStudentsModal && (
					<AssignedStudentsModal
						openModal={openAssignedStudentsModal}
						closeModal={() => setOpenAssignedStudentsModal(false)}
						studentsAssigned={studentsAssigned}
						handleAssignStudents={handleAssignStudents}
					/>
				)}
				{openWeekDaysModal && (
				<CustomOptionsModal
					openModal={openWeekDaysModal}
					closeModal={() => setOpenWeekDaysModal(false)}
					title='Week Days'
					options={weekDaysInitialValues}
					selected={weekDays}
					handleSaveOptions={(selected: any) => setWeekDays(selected)}
				/>
			)}
			{openLevelsModal && (
				<CustomOptionsModal
					openModal={openLevelsModal}
					closeModal={() => setOpenLevelsModal(false)}
					title='Levels'
					options={levelsInitialValues}
					selected={levels}
					handleSaveOptions={(selected: any) => setLevels(selected)}
				/>
			)}
			</Modal>
			{loadingRegisterKarateClass && <CustomBackdrop openBackdrop={loadingRegisterKarateClass} label='Loading ...' />}
			
		</>
	)
}

export default ClassRegisterModal
