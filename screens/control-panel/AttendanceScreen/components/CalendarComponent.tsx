import React, { PureComponent } from 'react'
import { View, Text, FlatList } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { format, addHours } from 'date-fns'
import Loader from '@/components/Loader/Loader'
import AgendaItem from './AgendaItem'
import { CenterContainer, ErrorMsgBox } from '@/theme/styles'
import { CalendarComponentProps } from '../helpers/attendance-screen-interfaces'

class CalendarComponent extends PureComponent<CalendarComponentProps> {
	render() {
		const {
			currentDate,
			handleDayChange,
			handleChangeMonth,
			markedDates,
			loadingGetKarateClassesToAdminAttendance,
			generatingMarkDates,
			loadingStudentAttendanceByDay,
			errorStudentAttendanceByDay,
			items,
			handleOpenAttendance,
		} = this.props
		// @ts-ignore fix for defaultProps warning: https://github.com/wix/react-native-calendars/issues/2455
		ExpandableCalendar.defaultProps = undefined

		return (
			<CalendarProvider date={currentDate} onDateChanged={handleDayChange} onMonthChange={handleChangeMonth}>
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
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => <AgendaItem item={item} handleOpenAttendance={handleOpenAttendance} />}
						/>
					)}
				</View>
			</CalendarProvider>
		)
	}
}

export default CalendarComponent
