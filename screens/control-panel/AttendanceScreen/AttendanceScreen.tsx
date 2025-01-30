import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { CalendarProvider, DateData, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import AgendaItem from './components/AgendaItem'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getKarateClassesToAdminAttendance } from '@/redux/actions/karateClassActions'
import generateMarkDatesByMonth from './helpers/generate-mark-days-by-month'
import { TDaysOfWeek } from '@/shared/common-types'
import { UpdateSources } from 'react-native-calendars/src/expandableCalendar/commons'

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

	useEffect(() => {
		dispatch(getKarateClassesToAdminAttendance())
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

	const handleDayChange = (date: string) => {
		setCurrentDate(date)
		setItems(
			Array(Math.round(Math.random() * 15))
				.fill(true)
				.map((e, i) => ({
					name: `Class Event-${i + 1}`,
					description: i % 2 === 0 ? `Class Event-${i + 1} description` : '',
					startTime: {
						hour: i + 5,
						minute: Math.round(Math.random() * 50),
					},
				})),
		)
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
					<FlatList data={items} renderItem={({ item }) => <AgendaItem item={item} />} />
				</View>
			</CalendarProvider>
		</View>
	)
}

export default AttendanceScreen
