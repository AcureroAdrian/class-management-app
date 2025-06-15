import React, { PureComponent } from 'react'
import { View, Text, FlatList, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
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
		// console.log('render fix')
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
							backgroundColor: colors.variants.primary[5],
							paddingHorizontal: 20,
							paddingVertical: 10,
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text style={{ fontSize: 18, fontWeight: 500, color: colors.primary }}>
							{format(addHours(new Date(currentDate), 12), 'EEEE, dd')}
						</Text>
						{role === 'admin' && !disableHoliday && (
							<Pressable
								onPress={handleAddHoliday}
								disabled={loadingHoliday}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									gap: 10,
									height: '100%',
									paddingVertical: 10,
									paddingHorizontal: 15,
									borderRadius: 20,
									backgroundColor: colors.variants.primary[1],
								}}
							>
								<Text style={{ color: colors.variants.primary[5], fontWeight: 500, fontSize: 16 }}>
									{isHoliday ? 'Remove Holiday' : 'Mark as Holiday'}
								</Text>
								{loadingHoliday ? (
									<ActivityIndicator size={'small'} color={colors.variants.primary[0]} />
								) : (
									<MaterialCommunityIcons name='pin' size={24} color={colors.variants.primary[5]} />
								)}
							</Pressable>
						)}
					</View>
					{isHoliday && (
						<Text
							style={{
								color: colors.variants.primary[5],
								fontSize: 16,
								fontWeight: 'bold',
								width: '100%',
								textAlign: 'center',
								paddingHorizontal: 20,
								paddingVertical: 10,
							}}
						>
							This day has been marked as a holiday.
						</Text>
					)}
					{errorHoliday && (
						<Text
							style={{
								color: colors.variants.primary[5],
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
								paddingHorizontal: 20,
							}}
						>
							{errorHoliday}
						</Text>
					)}
					{loadingStudentAttendanceByDay || loadingGetKarateClassesToAdminAttendance ? (
						<Loader text='Loading attendance...' />
					) : errorStudentAttendanceByDay ? (
						<CenterContainer>
							<ErrorMsgBox>{errorStudentAttendanceByDay}</ErrorMsgBox>
						</CenterContainer>
					) : (
						<View style={{ flex: 1, width: '100%' }}>
							<ScrollView>
								<FlatList
									data={items}
									keyExtractor={(item) => String(item?.id)}
									nestedScrollEnabled={true}
									scrollEnabled={false}
									renderItem={({ item }) => (
										<AgendaItem item={item} handleOpenAttendance={handleOpenAttendance} disabled={isHoliday} />
									)}
								/>
							</ScrollView>
						</View>
					)}
				</View>
			</CalendarProvider>
		)
	}
}

export default CalendarComponent
