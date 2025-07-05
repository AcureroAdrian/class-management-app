import React, { useEffect, useState } from 'react'
import { isDate } from 'date-fns'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Loader from '@/components/Loader/Loader'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomOptionsModal from '@/components/CustomOptionsModal/CustomOptionsModal'
import CustomSelectModal from '@/components/CustomSelectModal/CustomSelectModal'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import AgeRangeInput from '../AgeRangeInput'
import AssignedStudentsModal from '../AssignedStudentsModal'
import {
	levelsInitialValues,
	locationsInitialValues,
	weekDaysInitialValues,
} from '../../helpers/karate-classes-initial-values'
import getDataToUpdate from '../../helpers/get-data-to-update'
import { shortDaysOfWeek, shortLevels } from '@/shared/short-values'
import { TDaysOfWeek, TLocation, TUserLevel } from '@/shared/common-types'
import capitalizeWords from '@/shared/capitalize-words'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getkarateClassById, updatekarateClassById } from '@/redux/actions/karateClassActions'
import { GET_KARATE_CLASS_BY_ID_RESET, UPDATE_KARATE_CLASS_BY_ID_RESET } from '@/redux/constants/karateClassConstants'
import colors from '@/theme/colors'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import * as S from './ClassEditModal.styles'
import { format } from 'date-fns'

const ClassEditModal = ({
	openModal,
	closeModal,
	classId,
}: {
	openModal: boolean
	closeModal: () => void
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
	const [location, setLocation] = useState<TLocation>('spring')
	const [studentsAssigned, setStudentsAssigned] = useState<string[]>([])
	const [openWeekDaysModal, setOpenWeekDaysModal] = useState<boolean>(false)
	const [openLevelsModal, setOpenLevelsModal] = useState<boolean>(false)
	const [openLocationsModal, setOpenLocationsModal] = useState<boolean>(false)
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
			setLocation(karateClassById.location || 'spring')
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
			location,
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
		<S.ModalContainer visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<S.ModalView>
				<ScreenHeader
					label='Class Info'
					labelButton='Save'
					iconName='content-save'
					disabledButton={loadingGetKarateClassById || loadingUpdateKarateClassById}
					loadingButtonAction={loadingUpdateKarateClassById}
					handleOnPress={handleUpdateClass}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<S.ContentContainer>
					{loadingGetKarateClassById ? (
						<S.LoaderView>
							<Loader text='Loading class info' />
						</S.LoaderView>
					) : (
						<S.FormContainer>
							<KeyboardAvoidingWrapper>
								<S.StyledScrollView>
									{errorMessage && (
										<S.ErrorText>
											{errorMessage}
										</S.ErrorText>
									)}
									
									{/* Basic Information */}
									<S.FormSection>
										<S.SectionTitle>Basic Information</S.SectionTitle>
										<S.FormGroup>
											<CustomInputForm
												label='Class Name'
												placeholder='Mon 7 PM Class'
												placeholderTextColor={colors.darkLight}
												onChangeText={setName}
												value={name}
												editable={!loadingUpdateKarateClassById}
												multiline={true}
												icon='school'
											/>
											<CustomInputForm
												label='Additional Info'
												placeholder='Its a description ...'
												placeholderTextColor={colors.darkLight}
												onChangeText={setDescription}
												value={description}
												editable={!loadingUpdateKarateClassById}
												multiline={true}
												icon='information'
											/>
											<CustomInputForm
												label='Location'
												placeholder='Tap to select a location'
												placeholderTextColor={colors.darkLight}
												value={capitalizeWords(location)}
												editable={false}
												onPress={() => !loadingUpdateKarateClassById && setOpenLocationsModal(true)}
												icon='map-marker'
											/>
										</S.FormGroup>
									</S.FormSection>

									{/* Schedule & Timing */}
									<S.FormSection>
										<S.SectionTitle>Schedule & Timing</S.SectionTitle>
										<S.FormGroup>
											<CustomInputForm
												label='Start Time'
												placeholder='12:00 p.m.'
												placeholderTextColor={colors.darkLight}
												value={startTime ? format(new Date(startTime), 'HH:mm aaaa') : ''}
												editable={false}
												onPress={() => !loadingUpdateKarateClassById && setShowDate(true)}
												icon='clock'
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
												icon='calendar-week'
											/>
										</S.FormGroup>
									</S.FormSection>

									{/* Student Configuration */}
									<S.FormSection>
										<S.SectionTitle>Student Configuration</S.SectionTitle>
										<S.FormGroup>
											<CustomInputForm
												label='Class Students'
												placeholder='Tap to add students'
												placeholderTextColor={colors.darkLight}
												value={`${studentsAssigned?.length} students (Tap to add students)`}
												editable={false}
												onPress={() => !loadingUpdateKarateClassById && setOpenAssignedStudentsModal(true)}
												icon='account-group'
											/>
											<CustomInputForm
												label='Student Levels'
												placeholder='Tap to manage student levels'
												placeholderTextColor={colors.darkLight}
												value={levels?.length ? levels.map((level: TUserLevel) => shortLevels[level]).join(', ') : undefined}
												editable={false}
												onPress={() => !loadingUpdateKarateClassById && setOpenLevelsModal(true)}
												icon='karate'
											/>
											<AgeRangeInput
												minAge={minAge}
												maxAge={maxAge}
												saveMinAge={(value: number) => setMinAge(value)}
												saveMaxAge={(value: number) => setMaxAge(value)}
											/>
										</S.FormGroup>
									</S.FormSection>

								</S.StyledScrollView>
							</KeyboardAvoidingWrapper>
						</S.FormContainer>
					)}
				</S.ContentContainer>
			</S.ModalView>
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
		</S.ModalContainer>
	)
}

export default ClassEditModal
