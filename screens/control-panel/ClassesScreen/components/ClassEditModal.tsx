import React, { useEffect, useState } from 'react'
import { View, Modal, Text } from 'react-native'
import { format, isDate } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Loader from '@/components/Loader/Loader'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import AssignedStudentsModal from './AssignedStudentsModal'
import { levelsInitialValues, weekDaysInitialValues } from '../helpers/karate-classes-initial-values'
import getDataToUpdate from '../helpers/get-data-to-update'
import { shortDaysOfWeek, shortLevels } from '@/shared/short-values'
import { TDaysOfWeek, TUserLevel } from '@/shared/common-types'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getkarateClassById, updatekarateClassById } from '@/redux/actions/karateClassActions'
import { GET_KARATE_CLASS_BY_ID_RESET, UPDATE_KARATE_CLASS_BY_ID_RESET } from '@/redux/constants/karateClassConstants'
import colors from '@/theme/colors'
import AgeRangeInput from './AgeRangeInput'

const ClassEditModal = ({
	openModal,
	closeModal,
	className,
	classId,
}: {
	openModal: boolean
	closeModal: () => void
	className: string
	classId: string
}) => {
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
	const [studentsAssigned, setStudentsAssigned] = useState<string[]>([])
	const [openWeekDaysModal, setOpenWeekDaysModal] = useState<boolean>(false)
	const [openLevelsModal, setOpenLevelsModal] = useState<boolean>(false)
	const [openAssignedStudentsModal, setOpenAssignedStudentsModal] = useState<boolean>(false)

	const { loadingGetKarateClassById, successGetKarateClassById, karateClassById, errorGetKarateClassById } =
		useAppSelector((state: RootState) => state.getKarateClassById)
	const { loadingUpdateKarateClassById, errorUpdateKarateClassById } = useAppSelector(
		(state: RootState) => state.updateKarateClassById,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: GET_KARATE_CLASS_BY_ID_RESET })
			dispatch({ type: UPDATE_KARATE_CLASS_BY_ID_RESET })
			closeModal()
		}
	}, [])
	useEffect(() => {
		if (classId) {
			dispatch(getkarateClassById(classId))
		}
	}, [classId])
	useEffect(() => {
		if (successGetKarateClassById) {
			setName(karateClassById.name)
			setDescription(karateClassById.description)
			setWeekDays(karateClassById.weekDays)
			setLevels(karateClassById.levels)
			setStudentsAssigned(karateClassById.students)
			setMinAge(karateClassById.minAge || 0)
			setMaxAge(karateClassById.maxAge || 100)
			const date = new Date()
			date.setHours(karateClassById.startTime.hour, karateClassById.startTime.minute)
			setStartTime(date)
		}
	}, [successGetKarateClassById])
	useEffect(() => {
		if (errorGetKarateClassById) {
			setErrorMessage(errorGetKarateClassById)
		}
	}, [errorGetKarateClassById])
	useEffect(() => {
		if (errorUpdateKarateClassById) {
			setErrorMessage(errorUpdateKarateClassById)
			dispatch({ type: UPDATE_KARATE_CLASS_BY_ID_RESET })
		}
	}, [errorUpdateKarateClassById])

	const onChange = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || startTime
		setStartTime(currentDate)
		setShowDate(false)
	}
	const handleUpdateClass = () => {
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

		const { needUpdate, dataToUpdate } = getDataToUpdate(karateClassById, {
			name,
			description,
			startTime: {
				hour: startTime.getHours(),
				minute: startTime.getMinutes(),
			},
			minAge: minAge,
			maxAge: maxAge,
			weekDays,
			levels,
			students: studentsAssigned,
		})

		if (!needUpdate) {
			return closeModal()
		}

		dispatch(updatekarateClassById(classId, dataToUpdate))
	}
	const handleAssignStudents = (students: string[]) => {
		setErrorMessage(null)
		setStudentsAssigned(students)
	}

	return (
		<>
			<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
				<View style={{ flex: 1, justifyContent: 'flex-start' }}>
					<ScreenHeader
						label={className}
						labelButton='Save'
						iconName='save'
						disabledButton={loadingGetKarateClassById || loadingUpdateKarateClassById}
						loadingButtonAction={loadingUpdateKarateClassById}
						handleOnPress={handleUpdateClass}
						showBackButton={true}
						handleBack={closeModal}
					/>
					<View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
						{loadingGetKarateClassById ? (
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
								<Loader text='Loading class info' />
							</View>
						) : (
							<View style={{ width: '90%', flex: 1 }}>
								<CustomInputForm
									label='Class Name'
									placeholder='Mon 7 PM Class'
									placeholderTextColor={colors.darkLight}
									onChangeText={setName}
									value={name}
									editable={!loadingUpdateKarateClassById}
								/>
								<CustomInputForm
									label='Additional Info'
									placeholder='Its a description ...'
									placeholderTextColor={colors.darkLight}
									onChangeText={setDescription}
									value={description}
									editable={!loadingUpdateKarateClassById}
								/>
								<CustomInputForm
									label='Start Time'
									placeholder='12:00 p.m.'
									placeholderTextColor={colors.darkLight}
									value={startTime ? format(new Date(startTime), 'HH:mm aaaa') : ''}
									editable={false}
									onPress={() => !loadingUpdateKarateClassById && setShowDate(true)}
								/>
								<CustomInputForm
									label='Class Students'
									placeholder='Tap to add students'
									placeholderTextColor={colors.darkLight}
									value={`${studentsAssigned?.length} students (Tap to add students)`}
									editable={false}
									onPress={() => !loadingUpdateKarateClassById && setOpenAssignedStudentsModal(true)}
								/>
								<CustomInputForm
									label='Weekdays'
									placeholder='Tap to manage class days'
									placeholderTextColor={colors.darkLight}
									value={
										weekDays?.length ? weekDays.map((day: TDaysOfWeek) => shortDaysOfWeek[day]).join(', ') : undefined
									}
									editable={false}
									onPress={() => !loadingUpdateKarateClassById && setOpenWeekDaysModal(true)}
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
									placeholderTextColor={colors.darkLight}
									value={levels?.length ? levels.map((day: TUserLevel) => shortLevels[day]).join(', ') : undefined}
									editable={false}
									onPress={() => !loadingUpdateKarateClassById && setOpenLevelsModal(true)}
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
						)}
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
				{openAssignedStudentsModal && (
					<AssignedStudentsModal
						openModal={openAssignedStudentsModal}
						closeModal={() => setOpenAssignedStudentsModal(false)}
						studentsAssigned={studentsAssigned}
						handleAssignStudents={handleAssignStudents}
					/>
				)}
			</Modal>
		</>
	)
}

export default ClassEditModal
