import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import {
	Calendar,
	CalendarList,
	AgendaList,
	DateData,
	CalendarProvider,
	WeekCalendar,
	ExpandableCalendar,
} from 'react-native-calendars'
import { format } from 'date-fns'
import HeaderScreen from '@/components/HeaderScreen/HeaderScreen'
import AgendaItem from './components/AgendaItem'
import { Positions } from 'react-native-calendars/src/expandableCalendar'

const AttendanceScreen = () => {
	const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'))
	const [items, setItems] = useState<any[]>([])

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

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
			<HeaderScreen label='Attendance' />
			<CalendarProvider date={currentDate} onDateChanged={handleDayChange}>
				<ExpandableCalendar
					initialPosition={'open' as Positions}
					allowShadow={false}
					closeOnDayPress={false}
					hideArrows={true}
					animateScroll={false}
					monthFormat='MMM, yyyy'
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
