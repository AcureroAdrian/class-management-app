import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useSegments } from 'expo-router'
import { format } from 'date-fns'
import { DateData } from 'react-native-calendars'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CalendarComponent from './components/CalendarComponent'
import AttendanceEditModal from './components/AttendanceEditModal'
import generateMarkDatesByMonth from './helpers/generate-mark-days-by-month'
import { TDaysOfWeek, TUserRole } from '@/shared/common-types'
import { getKarateClassesToAdminAttendance } from '@/redux/actions/karateClassActions'
import { getStudentAttendanceByDay } from '@/redux/actions/studentAttendanceActions'
import { GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET } from '@/redux/constants/karateClassConstants'
import { GET_STUDENT_ATTENDANCE_BY_DAY_RESET } from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'

const AttendanceScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()
	const segments: string[] = useSegments()
	const today = new Date()

	const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'))
	const [weekDays, setWeekDays] = useState<TDaysOfWeek[]>([])
	const [month, setMonth] = useState<number>(today.getMonth() + 1)
	const [year, setYear] = useState<number>(today.getFullYear())
	const [markedDates, setMarkedDates] = useState<any>({})
	const [items, setItems] = useState<any[]>([])
	const [generatingMarkDates, setGeneratingMarkDates] = useState(false)
	const [attendanceData, setAttendanceData] = useState<any>(null)
	const [openAttendanceEditModal, setOpenAttendanceEditModal] = useState<boolean>(false)

	const {
		loadingGetKarateClassesToAdminAttendance,
		successGetKarateClassesToAdminAttendance,
		karateClassesToAdminAttendance,
	} = useAppSelector((state) => state.getKarateClassesToAdminAttendance)
	const {
		loadingStudentAttendanceByDay,
		successStudentAttendanceByDay,
		studentAttendanceByDayList,
		errorStudentAttendanceByDay,
	} = useAppSelector((state) => state.getStudentAttendanceByDay)
	const { successRegisterStudentAttendance, studentAttendanceRegistered } = useAppSelector(
		(state) => state.registerStudentAttendance,
	)
	const { successUpdateStudentAttendanceById, studentAttendanceByIdUpdated } = useAppSelector(
		(state) => state.updateStudentAttendanceById,
	)

	useEffect(() => {
		if (segments[1] === 'attendance') {
			dispatch(getKarateClassesToAdminAttendance())
		}
		return () => {
			dispatch({ type: GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET })
		}
	}, [segments])
	useEffect(() => {
		if (successGetKarateClassesToAdminAttendance) {
			const weekDays = new Set()
			karateClassesToAdminAttendance.forEach((item: any) => {
				item.weekDays.forEach((day: string) => {
					weekDays.add(day)
				})
			})
			setWeekDays(Array.from(weekDays) as TDaysOfWeek[])
			const year = new Date().getFullYear()
			const month = new Date().getMonth() + 1
			setYear(year)
			setMonth(month)
		}
	}, [successGetKarateClassesToAdminAttendance])
	useEffect(() => {
		if (month && year) {
			setGeneratingMarkDates(true)
			const markedDates = generateMarkDatesByMonth(month, year, weekDays)
			setMarkedDates(markedDates)
			setGeneratingMarkDates(false)
		}
	}, [month, year, weekDays])
	useEffect(() => {
		if (successGetKarateClassesToAdminAttendance) {
			setItems([])
			dispatch({ type: GET_STUDENT_ATTENDANCE_BY_DAY_RESET })

			const [year, month, day] = currentDate.split('-').map(Number)
			dispatch(getStudentAttendanceByDay(year, month, day))
		}
	}, [currentDate, successGetKarateClassesToAdminAttendance])
	useEffect(() => {
		if (successStudentAttendanceByDay) {
			const newItems = studentAttendanceByDayList?.map((item: any, index: number) => {
				let presents = 0
				let absents = 0
				item.attendance.forEach((student: any) => {
					if (student.attendanceStatus === 'present') {
						presents++
					}
					if (student.attendanceStatus === 'absent') {
						absents++
					}
				})
				return {
					_id: item._id,
					id: 'calendar-item-' + index,
					name: item.karateClass.name,
					description: item.karateClass.description,
					startTime: {
						hour: item.date.hour,
						minute: item.date.minute,
					},
					presents,
					absents,
					item,
				}
			})
			setItems(newItems || [])
		}
	}, [successStudentAttendanceByDay])
	useEffect(() => {
		if (successRegisterStudentAttendance) {
			setItems((prev) =>
				prev.map((item) => {
					if (
						item.startTime.hour === studentAttendanceRegistered.date.hour &&
						item.startTime.minute === studentAttendanceRegistered.date.minute &&
						item.item.karateClass._id === studentAttendanceRegistered.karateClass
					) {
						let presents = 0
						let absents = 0
						studentAttendanceRegistered.attendance.forEach((student: any) => {
							if (student.attendanceStatus === 'present') {
								presents++
							}
							if (student.attendanceStatus === 'absent') {
								absents++
							}
						})
						item.item._id = studentAttendanceRegistered._id
						item.item.attendance = studentAttendanceRegistered.attendance
						item.presents = presents
						item.absents = absents
					}
					return item
				}),
			)
			setOpenAttendanceEditModal(false)
		}
	}, [successRegisterStudentAttendance])
	useEffect(() => {
		if (successUpdateStudentAttendanceById) {
			setItems((prev) =>
				prev.map((item) => {
					if (
						item.startTime.hour === studentAttendanceByIdUpdated.date.hour &&
						item.startTime.minute === studentAttendanceByIdUpdated.date.minute &&
						item._id === studentAttendanceByIdUpdated._id
					) {
						let presents = 0
						let absents = 0
						studentAttendanceByIdUpdated.attendance.forEach((student: any) => {
							if (student.attendanceStatus === 'present') {
								presents++
							}
							if (student.attendanceStatus === 'absent') {
								absents++
							}
						})
						item.item._id = studentAttendanceByIdUpdated._id
						item.item.attendance = studentAttendanceByIdUpdated.attendance
						item.presents = presents
						item.absents = absents
					}
					return item
				}),
			)
			setOpenAttendanceEditModal(false)
		}
	}, [successUpdateStudentAttendanceById])

	const handleDayChange = (date: string) => {
		setCurrentDate(date)
	}
	const handleChangeMonth = (date: DateData) => {
		setMonth(date.month)
		setYear(date.year)
	}
	const handleOpenAttendance = (attendance: any) => {
		setAttendanceData(attendance)
		setOpenAttendanceEditModal(true)
	}

	return (
		<>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ScreenHeader label='Attendance' />
				<CalendarComponent
					currentDate={currentDate}
					handleDayChange={handleDayChange}
					handleChangeMonth={handleChangeMonth}
					markedDates={markedDates}
					loadingGetKarateClassesToAdminAttendance={loadingGetKarateClassesToAdminAttendance}
					generatingMarkDates={generatingMarkDates}
					loadingStudentAttendanceByDay={loadingStudentAttendanceByDay}
					errorStudentAttendanceByDay={errorStudentAttendanceByDay}
					items={items}
					handleOpenAttendance={handleOpenAttendance}
				/>
				{/* <CalendarProvider date={currentDate} onDateChanged={handleDayChange} onMonthChange={handleChangeMonth}>
					<ExpandableCalendar
						initialPosition={'open' as Positions}
						markedDates={markedDates}
						allowShadow={false}
						closeOnDayPress={false}
						hideArrows={true}
						animateScroll={false}
						monthFormat='MMM, yyyy'
						displayLoadingIndicator={loadingGetKarateClassesToAdminAttendance || generatingMarkDates}
						minDate={
							loadingStudentAttendanceByDay || loadingGetKarateClassesToAdminAttendance || generatingMarkDates
								? '1999-01-01'
								: undefined
						}
						maxDate={
							loadingStudentAttendanceByDay || loadingGetKarateClassesToAdminAttendance || generatingMarkDates
								? '1999-01-02'
								: undefined
						}
						allowSelectionOutOfRange={false}
					/>
					<View style={{ flex: 1 }}>
						<View style={{ backgroundColor: 'red', padding: 20 }}>
							<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
								{format(addHours(new Date(currentDate), 12), 'EEEE, dd')}
							</Text>
						</View>
						{loadingStudentAttendanceByDay || loadingGetKarateClassesToAdminAttendance ? (
							<Loader text='Loading attendance...' />
						) : errorStudentAttendanceByDay ? (
							<CenterContainer>
								<ErrorMsgBox>{errorStudentAttendanceByDay}</ErrorMsgBox>
							</CenterContainer>
						) : (
							<FlatList
								data={items}
								renderItem={({ item }) => <AgendaItem item={item} handleOpenAttendance={handleOpenAttendance} />}
							/>
						)}
					</View>
				</CalendarProvider> */}
			</View>
			{openAttendanceEditModal && (
				<AttendanceEditModal
					openModal={openAttendanceEditModal}
					closeModal={() => [setOpenAttendanceEditModal(false), setAttendanceData(null)]}
					attendanceData={attendanceData}
				/>
			)}
		</>
	)
}

export default AttendanceScreen
