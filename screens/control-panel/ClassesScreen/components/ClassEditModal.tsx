import React, { useEffect, useState } from 'react'
import { View, Modal, Text } from 'react-native'
import { format, isDate, setHours } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import AssignedStudentsModal from './AssignedStudentsModal'
import { levelsInitialValues, weekDaysInitialValues } from '../helpers/karate-classes-initial-values'
import getDataToUpdate from '../helpers/get-data-to-update'
import { shortDaysOfWeek, shortLevels } from '@/shared/short-values'
import { TDaysOfWeek, TUserLevel } from '@/shared/common-types'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getkarateClassById, updatekarateClassById } from '@/redux/actions/karateClassActions'
import { GET_KARATE_CLASS_BY_ID_RESET, UPDATE_KARATE_CLASS_BY_ID_RESET } from '@/redux/constants/karateClassConstants'
import colors from '@/theme/colors'

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
			const date = new Date()
			date.setHours(karateClassById.startTime.hour, karateClassById.startTime.minute)
			setStartTime(date)
		}
	}, [successGetKarateClassById])

	const onChange = (event, selectedDate) => {
		setErrorMessage(null)
		const currentDate = selectedDate || date
		setShowDate(false)
		setStartTime(currentDate)
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
		setStudentsAssigned(students)
	}

	return (
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				{loadingGetKarateClassById && <CustomBackdrop openBackdrop={loadingGetKarateClassById} label='Loading ...' />}
				<KeyboardAvoidingWrapper>
					<View>
						<ScreenHeader
							label={className}
							labelButton='Save'
							iconName='save'
							disabledButton={loadingUpdateKarateClassById}
							handleOnPress={handleUpdateClass}
							showBackButton={true}
							handleBack={closeModal}
						/>
						<View style={{ width: '100%', alignItems: 'center' }}>
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
								<Text
									style={{
										textAlign: 'center',
										fontSize: 13,
										color: 'red',
									}}
								>
									{errorMessage || errorGetKarateClassById || errorUpdateKarateClassById}
								</Text>
							</View>
						</View>
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
			{openAssignedStudentsModal && (
				<AssignedStudentsModal
					openModal={openAssignedStudentsModal}
					closeModal={() => setOpenAssignedStudentsModal(false)}
					studentsAssigned={studentsAssigned}
					handleAssignStudents={handleAssignStudents}
				/>
			)}
		</>
	)
}

export default ClassEditModal
