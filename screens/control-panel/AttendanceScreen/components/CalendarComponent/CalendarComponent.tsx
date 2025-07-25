import React, { useCallback } from 'react'
import { FlatList, ActivityIndicator, ScrollView } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { format, addHours } from 'date-fns'
import { es } from 'date-fns/locale'
import Loader from '@/components/Loader/Loader'
import AgendaItem from '../AgendaItem'
import EmptyState from './EmptyState'
import DateHeader from './DateHeader'
import { CalendarComponentProps } from '../../helpers/attendance-screen-interfaces'
import { CenterContainer, ErrorMsgBox } from '@/theme/styles'
import colors from '@/theme/colors'
import {
	Container,
	HolidayInfoText,
	ErrorText,
	AgendaContainer,
} from './styles'

const CalendarComponent = ({
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
}: CalendarComponentProps) => {
	// @ts-ignore fix for defaultProps warning: https://github.com/wix/react-native-calendars/issues/2455
	ExpandableCalendar.defaultProps = undefined

	const calendarTheme = {
		backgroundColor: colors.primary,
		calendarBackground: colors.primary,
		textSectionTitleColor: colors.variants.grey[4],
		selectedDayBackgroundColor: colors.variants.primary[5],
		selectedDayTextColor: colors.primary,
		todayTextColor: colors.variants.primary[5],
		dayTextColor: colors.variants.secondary[5],
		textDisabledColor: colors.variants.grey[2],
		dotColor: colors.variants.primary[4],
		selectedDotColor: colors.primary,
		arrowColor: colors.variants.secondary[4],
		monthTextColor: colors.variants.secondary[5],
		indicatorColor: colors.variants.primary[5],
		textDayFontWeight: '500' as const,
		textMonthFontWeight: '600' as const,
		textDayHeaderFontWeight: '600' as const,
		textDayFontSize: 15,
		textMonthFontSize: 18,
		textDayHeaderFontSize: 13,
	}

	const renderItem = useCallback(
		({ item }: { item: any }) => (
			<AgendaItem item={item} handleOpenAttendance={handleOpenAttendance} disabled={isHoliday} />
		),
		[handleOpenAttendance, isHoliday],
	)

	return (
		<CalendarProvider date={currentDate} onDateChanged={handleDayChange} onMonthChange={handleChangeMonth}>
			<ExpandableCalendar
				initialPosition={'open' as Positions}
				markedDates={markedDates}
				allowShadow={false}
				closeOnDayPress={false}
				hideArrows={false}
				animateScroll={true}
				monthFormat='MMM, yyyy'
				firstDay={1}
				theme={calendarTheme}
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
				<DateHeader
					currentDate={currentDate}
					role={role}
					handleAddHoliday={handleAddHoliday}
					isHoliday={isHoliday}
					loadingHoliday={loadingHoliday}
					disableHoliday={disableHoliday}
				/>

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
						{items?.length > 0 ? (
							<FlatList
								data={items}
								keyExtractor={(item) => String(item?.id)}
								showsVerticalScrollIndicator={false}
								renderItem={renderItem}
							/>
						) : (
							<EmptyState />
						)}
					</AgendaContainer>
				)}
			</Container>
		</CalendarProvider>
	)
}

export default React.memo(CalendarComponent)
