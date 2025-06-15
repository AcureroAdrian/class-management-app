import { nextDay } from 'date-fns'
import { TDaysOfWeek } from '@/shared/common-types'
import getNumberOfWeekDay from './get-number-of-week-day'

export const getNextClassDate = (weekDays: TDaysOfWeek[]): Date => {
	const nextDayForWeekDay = weekDays.map((weekDay) => {
		const weekDayNumber = getNumberOfWeekDay(weekDay)
		return nextDay(new Date(), weekDayNumber)
	})

	nextDayForWeekDay.sort((a: Date, b: Date) => {
		return a > b ? 1 : -1
	})

	return nextDayForWeekDay[0]
} 