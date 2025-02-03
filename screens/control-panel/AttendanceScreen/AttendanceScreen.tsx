import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { CalendarProvider, DateData, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { UpdateSources } from 'react-native-calendars/src/expandableCalendar/commons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import AgendaItem from './components/AgendaItem'
import generateMarkDatesByMonth from './helpers/generate-mark-days-by-month'
import { TDaysOfWeek } from '@/shared/common-types'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getKarateClassesToAdminAttendance } from '@/redux/actions/karateClassActions'
import { GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET } from '@/redux/constants/karateClassConstants'
import { getStudentAttendanceByDay } from '@/redux/actions/studentAttendanceActions'
import { CenterContainer, ErrorMsgBox } from '@/theme/styles'
import { GET_STUDENT_ATTENDANCE_BY_DAY_RESET } from '@/redux/constants/studentAttendanceConstants'
import colors from '@/theme/colors'

const AttendanceScreen = () => {
	// @ts-ignore fix for defaultProps warning: https://github.com/wix/react-native-calendars/issues/2455
	ExpandableCalendar.defaultProps = undefined
	const dispatch = useAppDispatch()
	const today = new Date()

	const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'))
	const [weekDays, setWeekDays] = useState<TDaysOfWeek[]>([])
	const [month, setMonth] = useState<number>(today.getMonth() + 1)
	const [year, setYear] = useState<number>(today.getFullYear())
	const [markedDates, setMarkedDates] = useState<any>({})
	const [items, setItems] = useState<any[]>([])

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

	useEffect(() => {
		dispatch(getKarateClassesToAdminAttendance())
		return () => {
			dispatch({ type: GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET })
		}
	}, [])
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
			const markedDates = generateMarkDatesByMonth(month, year, weekDays)
			setMarkedDates(markedDates)
		}
	}, [month, year, weekDays])
	useEffect(() => {
		const [year, month, day] = currentDate.split('-').map(Number)

		dispatch(getStudentAttendanceByDay(year, month, day))
	}, [currentDate])
	useEffect(() => {
		if (successStudentAttendanceByDay) {
			const newItems = studentAttendanceByDayList?.map((item: any) => {
				return {
					name: item.karateClass.name,
					description: item.karateClass.description,
					startTime: {
						hour: item.date.hour,
						minute: item.date.minute,
					},
				}
			})

			setItems(newItems || [])
		}
	}, [successStudentAttendanceByDay])

	const handleDayChange = (date: string) => {
		setCurrentDate(date)
		setItems([])
		dispatch({ type: GET_STUDENT_ATTENDANCE_BY_DAY_RESET })
	}
	const handleChangeMonth = (date: DateData, updateSource: UpdateSources) => {
		setMonth(date.month)
		setYear(date.year)
	}

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
			<ScreenHeader label='Attendance' />
			<CalendarProvider date={currentDate} onDateChanged={handleDayChange} onMonthChange={handleChangeMonth}>
				<ExpandableCalendar
					initialPosition={'open' as Positions}
					markedDates={markedDates}
					allowShadow={false}
					closeOnDayPress={false}
					hideArrows={true}
					animateScroll={false}
					monthFormat='MMM, yyyy'
					displayLoadingIndicator={loadingGetKarateClassesToAdminAttendance}
				/>
				<View style={{ flex: 1 }}>
					<View style={{ backgroundColor: 'red', padding: 20 }}>
						<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
							{format(new Date(currentDate), 'EEEE, dd')}
						</Text>
					</View>
					{loadingStudentAttendanceByDay ? (
						<CenterContainer>
							<ActivityIndicator size='large' color={colors.primary} />
						</CenterContainer>
					) : errorStudentAttendanceByDay ? (
						<CenterContainer>
							<ErrorMsgBox>{errorStudentAttendanceByDay}</ErrorMsgBox>
						</CenterContainer>
					) : (
						<FlatList data={items} renderItem={({ item }) => <AgendaItem item={item} />} />
					)}
				</View>
			</CalendarProvider>
		</View>
	)
}

export default AttendanceScreen
