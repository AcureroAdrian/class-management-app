import React, { useEffect, useState } from 'react'
import { View, Modal, Text, ScrollView } from 'react-native'
import { format, isDate } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import AssignedStudentsModal from './AssignedStudentsModal'
import AgeRangeInput from './AgeRangeInput'
import {
	levelsInitialValues,
	locationsInitialValues,
	weekDaysInitialValues,
} from '../helpers/karate-classes-initial-values'
import { shortDaysOfWeek, shortLevels } from '@/shared/short-values'
import { TDaysOfWeek, TLocation, TUserLevel } from '@/shared/common-types'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { registerKarateClass } from '@/redux/actions/karateClassActions'
import { REGISTER_KARATE_CLASS_RESET } from '@/redux/constants/karateClassConstants'
import colors from '@/theme/colors'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

const ClassRegisterModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showDate, setShowDate] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [startTime, setStartTime] = useState<Date>(new Date('2000-01-01 12:00:00'))
	const [weekDays, setWeekDays] = useState<TDaysOfWeek[]>(weekDaysInitialValues)
	const [levels, setLevels] = useState<TUserLevel[]>(levelsInitialValues)
	const [minAge, setMinAge] = useState<number>(0)
	const [maxAge, setMaxAge] = useState<number>(100)
	const [location, setLocation] = useState<TLocation>('spring')
	const [openLocationsModal, setOpenLocationsModal] = useState<boolean>(false)
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
		if (!location?.length) {
			setErrorMessage('Please select a location')
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
				minAge,
				maxAge,
				levels,
				location,
			}),
		)
	}
	const handleAssignStudents = (students: string[]) => {
		setStudentsAssigned(students)
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, width: '100%', justifyContent: 'flex-start' }}>
				<ScreenHeader
					label='New Class'
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingRegisterKarateClass}
					loadingButtonAction={loadingRegisterKarateClass}
					handleOnPress={handleRegisterClass}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<View style={{ flex: 1, width: '100%' }}>
					<KeyboardAvoidingWrapper>
						<ScrollView contentContainerStyle={{ gap: 40, padding: 20 }}>
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
							<CustomInputForm
								label='Class Name'
								placeholder='Mon 7 PM Class'
								onChangeText={setName}
								value={name}
								editable={!loadingRegisterKarateClass}
								multiline={true}
								icon='account'
							/>
							<CustomInputForm
								label='Additional Info'
								placeholder='Its a description ...'
								onChangeText={setDescription}
								value={description}
								editable={!loadingRegisterKarateClass}
								multiline={true}
								icon='note-edit'
							/>
							<CustomInputForm
								label='Start Time'
								placeholder='12:00 p.m.'
								value={startTime ? format(new Date(startTime), 'HH:mm aaaa') : ''}
								editable={false}
								onPress={() => !loadingRegisterKarateClass && setShowDate(true)}
								icon='timer'
							/>
							<CustomInputForm
								label='Class Students'
								placeholder='Tap to add students'
								value={`${studentsAssigned?.length} students (Tap to add students)`}
								editable={false}
								onPress={() => !loadingRegisterKarateClass && setOpenAssignedStudentsModal(true)}
								icon='account-group'
							/>
							<CustomInputForm
								label='Weekdays'
								placeholder='Tap to manage class days'
								value={
									weekDays?.length ? weekDays.map((day: TDaysOfWeek) => shortDaysOfWeek[day]).join(', ') : undefined
								}
								editable={false}
								onPress={() => !loadingRegisterKarateClass && setOpenWeekDaysModal(true)}
								icon='calendar'
							/>
							<AgeRangeInput
								minAge={minAge}
								maxAge={maxAge}
								saveMinAge={(value: number) => setMinAge(value)}
								saveMaxAge={(value: number) => setMaxAge(value)}
							/>
							<CustomInputForm
								label='Levels'
								placeholder='Tap to manage student levels'
								value={levels?.length ? levels.map((day: TUserLevel) => shortLevels[day]).join(', ') : undefined}
								editable={false}
								onPress={() => !loadingRegisterKarateClass && setOpenLevelsModal(true)}
								icon='karate'
							/>
							<CustomInputForm
								label='Location'
								placeholder='Tap to select a location'
								value={capitalizeWords(location)}
								editable={false}
								onPress={() => !loadingRegisterKarateClass && setOpenLocationsModal(true)}
								icon='map'
							/>
						</ScrollView>
					</KeyboardAvoidingWrapper>
				</View>
			</View>
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
			{openLocationsModal && (
				<CustomSelectModal
					openModal={openLocationsModal}
					closeModal={() => setOpenLocationsModal(false)}
					title='Class Locations'
					options={locationsInitialValues}
					selected={location || ''}
					handleSaveOption={(selected: string) => setLocation(selected as TLocation)}
				/>
			)}
		</Modal>
	)
}

export default ClassRegisterModal
