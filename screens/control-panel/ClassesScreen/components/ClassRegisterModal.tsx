import React, { useEffect, useState } from 'react'
import { View, Modal } from 'react-native'
import { format, isDate } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker'
import HeaderScreen from '@/components/HeaderScreen/HeaderScreen'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { InnerContainer, StyledFormArea, Colors, ErrorMsgBox } from '@/components/styles'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import { levelsInitialValues, weekDaysInitialValues } from '../helpers/karate-classes-initial-values'
import { shortDaysOfWeek, shortLevels } from '@/shared/short-values'
import { TDaysOfWeek, TUserLevel } from '@/shared/common-types'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { registerKarateClass } from '@/redux/actions/karateClassActions'
import { REGISTER_KARATE_CLASS_RESET } from '@/redux/constants/karateClassConstants'

const ClassRegisterModal = ({ openModal, closeModal }) => {
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

	const { loadingRegisterKarateClass, errorRegisterKarateClass } = useAppSelector(
		(state: RootState) => state.registerKarateClass,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_KARATE_CLASS_RESET })
		}
	}, [])
	useEffect(() => {
		if (errorRegisterKarateClass) {
			setErrorMessage(errorRegisterKarateClass)
		}
	}, [errorRegisterKarateClass])

	const onChange = (event, selectedDate) => {
		setErrorMessage(null)
		const currentDate = selectedDate || date
		setShowDate(false)
		setStartTime(currentDate)
	}
	const handleRegisterClass = () => {
		setErrorMessage(null)
		if (!weekDays?.length) {
			setErrorMessage('Please select at least one day')
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

	return (
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				{loadingRegisterKarateClass && <CustomBackdrop openBackdrop={loadingRegisterKarateClass} label='Loading ...' />}
				<KeyboardAvoidingWrapper>
					<View>
						<HeaderScreen
							label='New Class'
							labelButton='Save'
							iconName='save'
							disabledButton={false}
							handleOnPress={handleRegisterClass}
							showBackButton={true}
							handleBack={closeModal}
						/>
						<InnerContainer>
							{showDate && (
								<DateTimePicker
									testID='dateTimePicker'
									value={startTime}
									mode='time'
									is24Hour={true}
									display='default'
									onChange={onChange}
								/>
							)}
							<StyledFormArea>
								<CustomInputForm
									label='Class Name'
									placeholder='Mon 7 PM Class'
									placeholderTextColor={Colors.darkLight}
									onChangeText={setName}
									value={name}
								/>
								<CustomInputForm
									label='Additional Info'
									placeholder='Its a description ...'
									placeholderTextColor={Colors.darkLight}
									onChangeText={setDescription}
									value={description}
								/>
								<CustomInputForm
									label='Start Time'
									placeholder='12:00 p.m.'
									placeholderTextColor={Colors.darkLight}
									value={startTime ? format(new Date(startTime), 'HH:mm aaaa') : ''}
									editable={false}
									onPress={() => setShowDate(true)}
								/>
								<CustomInputForm
									label='Class Students'
									placeholder='Tap to add students'
									placeholderTextColor={Colors.darkLight}
									value={`${studentsAssigned?.length} students (Tap to add students)`}
									editable={false}
									onPress={() => {}}
								/>
								<CustomInputForm
									label='Weekdays'
									placeholder='Tap to manage class days'
									placeholderTextColor={Colors.darkLight}
									value={
										weekDays?.length ? weekDays.map((day: TDaysOfWeek) => shortDaysOfWeek[day]).join(', ') : undefined
									}
									editable={false}
									onPress={() => setOpenWeekDaysModal(true)}
								/>
								<CustomInputForm
									label='Levels'
									placeholder='Tap to manage student levels'
									placeholderTextColor={Colors.darkLight}
									value={levels?.length ? levels.map((day: TUserLevel) => shortLevels[day]).join(', ') : undefined}
									editable={false}
									onPress={() => setOpenLevelsModal(true)}
								/>
								<ErrorMsgBox>{errorMessage}</ErrorMsgBox>
							</StyledFormArea>
						</InnerContainer>
					</View>
				</KeyboardAvoidingWrapper>
			</Modal>
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
		</>
	)
}

export default ClassRegisterModal
