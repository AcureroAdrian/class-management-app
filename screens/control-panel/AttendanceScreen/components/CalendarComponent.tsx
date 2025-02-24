import React, { PureComponent } from 'react'
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { AntDesign } from '@expo/vector-icons'
import { format, addHours } from 'date-fns'
import Loader from '@/components/Loader/Loader'
import AgendaItem from './AgendaItem'
import { CalendarComponentProps } from '../helpers/attendance-screen-interfaces'
import { CenterContainer, ErrorMsgBox } from '@/theme/styles'
import colors from '@/theme/colors'

class CalendarComponent extends PureComponent<CalendarComponentProps> {
	render() {
		const {
			role,
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
			handleAddHoliday,
			isHoliday,
			loadingHoliday,
			errorHoliday,
			disableHoliday,
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
					displayLoadingIndicator={loadingGetKarateClassesToAdminAttendance || generatingMarkDates || loadingHoliday}
					minDate={
						loadingStudentAttendanceByDay ||
						loadingGetKarateClassesToAdminAttendance ||
						generatingMarkDates ||
						loadingHoliday
							? '1999-01-01'
							: undefined
					}
					maxDate={
						loadingStudentAttendanceByDay ||
						loadingGetKarateClassesToAdminAttendance ||
						generatingMarkDates ||
						loadingHoliday
							? '1999-01-02'
							: undefined
					}
					allowSelectionOutOfRange={false}
				/>
				<View style={{ flex: 1 }}>
					<View
						style={{
							backgroundColor: 'red',
							padding: 20,
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
							{format(addHours(new Date(currentDate), 12), 'EEEE, dd')}
						</Text>
						{role === 'admin' && !disableHoliday && (
							<Pressable
								onPress={handleAddHoliday}
								disabled={loadingHoliday}
								style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: '100%' }}
							>
								<Text style={{ color: colors.primary }}>{isHoliday ? 'Remove Holiday' : 'Mark as Holiday'}</Text>
								{loadingHoliday ? (
									<ActivityIndicator size={'small'} color={'#fff'} />
								) : (
									<AntDesign name='pushpin' size={24} color={colors.primary} />
								)}
							</Pressable>
						)}
					</View>
					{isHoliday && (
						<Text
							style={{
								color: 'red',
								fontSize: 16,
								fontWeight: 'bold',
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
							}}
						>
							This day has been marked as a holiday.
						</Text>
					)}
					{errorHoliday && (
						<Text
							style={{
								color: 'red',
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
							}}
						>
							errorHoliday
						</Text>
					)}
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
							renderItem={({ item }) => (
								<AgendaItem item={item} handleOpenAttendance={handleOpenAttendance} disabled={isHoliday} />
							)}
						/>
					)}
				</View>
			</CalendarProvider>
		)
	}
}

export default CalendarComponent
