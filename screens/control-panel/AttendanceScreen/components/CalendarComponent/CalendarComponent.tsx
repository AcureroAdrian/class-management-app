import React, { PureComponent } from 'react'
import { FlatList, ActivityIndicator, ScrollView } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { format, addHours } from 'date-fns'
import Loader from '@/components/Loader/Loader'
import AgendaItem from '../AgendaItem'
import { CalendarComponentProps } from '../../helpers/attendance-screen-interfaces'
import { CenterContainer, ErrorMsgBox } from '@/theme/styles'
import colors from '@/theme/colors'
import {
	Container,
	Header,
	HeaderText,
	HolidayButton,
	HolidayButtonText,
	HolidayInfoText,
	ErrorText,
	AgendaContainer,
} from './CalendarComponent.styles'

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
				<Container>
					<Header>
						<HeaderText>{format(addHours(new Date(currentDate), 12), 'EEEE, dd')}</HeaderText>
						{role === 'admin' && !disableHoliday && (
							<HolidayButton onPress={handleAddHoliday} disabled={loadingHoliday}>
								<HolidayButtonText>{isHoliday ? 'Remove Holiday' : 'Mark as Holiday'}</HolidayButtonText>
								{loadingHoliday ? (
									<ActivityIndicator size={'small'} color={colors.variants.primary[0]} />
								) : (
									<MaterialCommunityIcons name='pin' size={24} color={colors.variants.primary[5]} />
								)}
							</HolidayButton>
						)}
					</Header>
					{isHoliday && <HolidayInfoText>This day has been marked as a holiday.</HolidayInfoText>}
					{errorHoliday && <ErrorText>{errorHoliday}</ErrorText>}
					{loadingStudentAttendanceByDay || loadingGetKarateClassesToAdminAttendance ? (
						<Loader text='Loading attendance...' />
					) : errorStudentAttendanceByDay ? (
						<CenterContainer>
							<ErrorMsgBox>{errorStudentAttendanceByDay}</ErrorMsgBox>
						</CenterContainer>
					) : (
						<AgendaContainer>
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
						</AgendaContainer>
					)}
				</Container>
			</CalendarProvider>
		)
	}
}

export default CalendarComponent
