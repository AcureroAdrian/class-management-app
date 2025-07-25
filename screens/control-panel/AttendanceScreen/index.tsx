import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from 'expo-router'
import { format } from 'date-fns'
import { DateData } from 'react-native-calendars'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CalendarComponent from './components/CalendarComponent'
import AttendanceEditModal from './components/AttendanceEditModal'
import StudentNotesModal from './components/StudentNotesModal'
import generateMarkDatesByMonth from './helpers/generate-mark-days-by-month'
import { TDaysOfWeek, TUserRole } from '@/shared/common-types'
import { getKarateClassesToAdminAttendance } from '@/redux/actions/karateClassActions'
import { getStudentAttendanceByDay } from '@/redux/actions/studentAttendanceActions'
import { GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET } from '@/redux/constants/karateClassConstants'
import { GET_STUDENT_ATTENDANCE_BY_DAY_RESET } from '@/redux/constants/studentAttendanceConstants'
import { deleteHolidayById, registerHolidayByDate } from '@/redux/actions/holidayActions'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { DELETE_HOLIDAY_BY_ID_RESET, REGISTER_HOLIDAY_BY_DATE_RESET } from '@/redux/constants/holidayConstants'
import { isStudentPresent } from '@/shared/attendance-helpers'
import { AttendanceScreenContainer } from './styles'

const AttendanceScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()
	const today = new Date()

	const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
	const [weekDays, setWeekDays] = useState<TDaysOfWeek[]>([])
	const [month, setMonth] = useState<number>(today.getMonth() + 1)
	const [year, setYear] = useState<number>(today.getFullYear())
	const [markedDates, setMarkedDates] = useState<any>({})
	const [items, setItems] = useState<any[]>([])
	const [generatingMarkDates, setGeneratingMarkDates] = useState(false)
	const [attendanceData, setAttendanceData] = useState<any>(null)
	const [openAttendanceEditModal, setOpenAttendanceEditModal] = useState<boolean>(false)
	const [holidayId, setHolidayId] = useState<string>('')

	const {
		loadingGetKarateClassesToAdminAttendance,
		successGetKarateClassesToAdminAttendance,
		karateClassesToAdminAttendance,
	} = useAppSelector((state) => state.getKarateClassesToAdminAttendance) || {
		loadingGetKarateClassesToAdminAttendance: false,
		successGetKarateClassesToAdminAttendance: false,
		karateClassesToAdminAttendance: [],
	}
	const {
		loadingStudentAttendanceByDay,
		successStudentAttendanceByDay,
		studentAttendanceByDayList,
		errorStudentAttendanceByDay,
	} = useAppSelector((state) => state.getStudentAttendanceByDay) || {
		loadingStudentAttendanceByDay: false,
		successStudentAttendanceByDay: false,
		studentAttendanceByDayList: {},
		errorStudentAttendanceByDay: '',
	}
	const { successRegisterStudentAttendance, studentAttendanceRegistered } =
		useAppSelector((state) => state.registerStudentAttendance) || {}
	const { successUpdateStudentAttendanceById, studentAttendanceByIdUpdated } =
		useAppSelector((state) => state.updateStudentAttendanceById) || {}
	const {
		loadingRegisterHolidayByDate,
		successRegisterHolidayByDate,
		holidayByDateRegistered,
		errorRegisterHolidayByDate,
	} = useAppSelector((state) => state.registerHolidayByDate) || {
		loadingRegisterHolidayByDate: false,
		successRegisterHolidayByDate: false,
		holidayByDateRegistered: {} as any,
		errorRegisterHolidayByDate: '',
	}
	const { loadingDeleteHolidayById, successDeleteHolidayById, errorDeleteHolidayById } =
		useAppSelector((state) => state.deleteHolidayById) || {
			loadingDeleteHolidayById: false,
			successDeleteHolidayById: false,
			errorDeleteHolidayById: ''
		}

	useFocusEffect(
		useCallback(() => {
			dispatch(getKarateClassesToAdminAttendance())

			return () => {
				dispatch({ type: GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET })
			}
		}, []),
	)

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
	}, [successGetKarateClassesToAdminAttendance, karateClassesToAdminAttendance])

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
			dispatch({ type: REGISTER_HOLIDAY_BY_DATE_RESET })
			dispatch({ type: DELETE_HOLIDAY_BY_ID_RESET })

			const [year, month, day] = currentDate.split('-').map(Number)
			dispatch(getStudentAttendanceByDay(year, month, day))
		}
	}, [currentDate, successGetKarateClassesToAdminAttendance])

	useEffect(() => {
		if (successStudentAttendanceByDay) {
			const newItems = studentAttendanceByDayList?.attendances?.map((item: any, index: number) => {
				let presents = 0
				let absents = 0
				item.attendance.forEach((student: any) => {
					if (isStudentPresent(student.attendanceStatus)) {
						presents++
					} else {
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
					total: item?.students?.length,
					item,
				}
			})

			// Ordenar las clases por hora
			const sortedItems = newItems?.sort((a, b) => {
				const timeA = a.startTime.hour * 60 + a.startTime.minute
				const timeB = b.startTime.hour * 60 + b.startTime.minute
				return timeA - timeB
			})

			setItems(sortedItems || [])
			setHolidayId(studentAttendanceByDayList?.holiday?._id)
		}
	}, [successStudentAttendanceByDay])

	useEffect(() => {
		if (successRegisterStudentAttendance) {
			setItems((prev) => {
				const updatedItems = prev.map((item) => {
					if (
						item.startTime.hour === studentAttendanceRegistered.date.hour &&
						item.startTime.minute === studentAttendanceRegistered.date.minute &&
						item.item.karateClass._id === studentAttendanceRegistered.karateClass
					) {
						let presents = 0
						let absents = 0
						studentAttendanceRegistered.attendance.forEach((student: any) => {
							if (isStudentPresent(student.attendanceStatus)) {
								presents++
							} else {
								absents++
							}
						})
						item.item._id = studentAttendanceRegistered._id
						item.item.attendance = studentAttendanceRegistered.attendance
						item.presents = presents
						item.absents = absents
					}
					return item
				})
				
				// Mantener el orden por hora
				return updatedItems.sort((a, b) => {
					const timeA = a.startTime.hour * 60 + a.startTime.minute
					const timeB = b.startTime.hour * 60 + b.startTime.minute
					return timeA - timeB
				})
			})
			setOpenAttendanceEditModal(false)
		}
	}, [successRegisterStudentAttendance])

	useEffect(() => {
		if (successUpdateStudentAttendanceById) {
			setItems((prev) => {
				const updatedItems = prev.map((item) => {
					if (
						item.startTime.hour === studentAttendanceByIdUpdated.date.hour &&
						item.startTime.minute === studentAttendanceByIdUpdated.date.minute &&
						item._id === studentAttendanceByIdUpdated._id
					) {
						let presents = 0
						let absents = 0
						studentAttendanceByIdUpdated.attendance.forEach((student: any) => {
							if (isStudentPresent(student.attendanceStatus)) {
								presents++
							} else {
								absents++
							}
						})
						item.item._id = studentAttendanceByIdUpdated._id
						item.item.attendance = studentAttendanceByIdUpdated.attendance
						item.presents = presents
						item.absents = absents
					}
					return item
				})
				
				// Mantener el orden por hora
				return updatedItems.sort((a, b) => {
					const timeA = a.startTime.hour * 60 + a.startTime.minute
					const timeB = b.startTime.hour * 60 + b.startTime.minute
					return timeA - timeB
				})
			})
			setOpenAttendanceEditModal(false)
		}
	}, [successUpdateStudentAttendanceById, studentAttendanceByIdUpdated])

	useEffect(() => {
		if (successRegisterHolidayByDate || successDeleteHolidayById) {
			const [year, month, day] = currentDate.split('-').map(Number)
			dispatch(getStudentAttendanceByDay(year, month, day))
			dispatch({ type: REGISTER_HOLIDAY_BY_DATE_RESET })
			dispatch({ type: DELETE_HOLIDAY_BY_ID_RESET })
		}
	}, [successRegisterHolidayByDate, successDeleteHolidayById, currentDate, dispatch])

	const handleDayChange = useCallback((date: string) => {
		setCurrentDate(date)
	}, [])

	const handleChangeMonth = useCallback((date: DateData) => {
		setMonth(date.month)
		setYear(date.year)
	}, [])

	const handleOpenAttendance = useCallback((attendance: any) => {
		setAttendanceData(attendance)
		setOpenAttendanceEditModal(true)
	}, [])

	const handleAddHoliday = useCallback(() => {
		if (holidayId?.length) {
			dispatch(deleteHolidayById(holidayId))
		} else {
			const [year, month, day] = currentDate.split('-').map(Number)
			dispatch(registerHolidayByDate(year, month, day))
		}
	}, [holidayId, currentDate, dispatch])

	return (
		<>
			<AttendanceScreenContainer>
				<ScreenHeader label='Attendance' />
				<CalendarComponent
					role={role}
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
					handleAddHoliday={handleAddHoliday}
					disableHoliday={format(new Date(), 'yyyy-MM-dd') === currentDate || new Date(currentDate) < new Date()}
					isHoliday={Boolean(holidayId?.length)}
					loadingHoliday={loadingRegisterHolidayByDate || loadingDeleteHolidayById}
					errorHoliday={errorRegisterHolidayByDate || errorDeleteHolidayById}
				/>
			</AttendanceScreenContainer>
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
