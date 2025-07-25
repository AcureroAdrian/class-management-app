import { TDaysOfWeek, IStartTime } from '@/shared/common-types'
import { IHoliday } from '@/redux/reducers/holidayReducers'
import { isSameDay, addWeeks, set } from 'date-fns'
import getNumberOfWeekDay from './get-number-of-week-day'

export const getNextClassDate = (
	weekDays: TDaysOfWeek[],
	startTime: IStartTime,
	holidays: IHoliday[] = [],
): Date => {
	if (!weekDays || weekDays.length === 0 || !startTime) {
		return new Date(9999, 11, 31) // Return a distant future date
	}

	const now = new Date()
	let potentialDates: Date[] = []

	// 1. Generate initial potential dates for all specified week days
	weekDays.forEach((day) => {
		const weekDayNumber = getNumberOfWeekDay(day)
		let nextDate = set(now, {
			hours: startTime.hour,
			minutes: startTime.minute,
			seconds: 0,
			milliseconds: 0,
		})

		const currentDay = now.getDay()
		const daysUntilNext = (weekDayNumber - currentDay + 7) % 7

		if (daysUntilNext === 0) {
			// If it's today, check if class time has passed
			if (nextDate.getTime() <= now.getTime()) {
				// If passed, schedule for next week
				nextDate = addWeeks(nextDate, 1)
			}
		} else {
			nextDate.setDate(now.getDate() + daysUntilNext)
		}
		potentialDates.push(nextDate)
	})

	// 2. Sort dates to always check the soonest one first
	potentialDates.sort((a, b) => a.getTime() - b.getTime())

	// 3. Find the first valid date that is not a holiday
	for (let i = 0; i < potentialDates.length; i++) {
		let date = potentialDates[i]

		// Check if the date is a holiday
		let isHoliday = holidays.some((holiday) =>
			isSameDay(date, new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day)),
		)

		// If it's a holiday, advance it by one week until it's not a holiday
		while (isHoliday) {
			date = addWeeks(date, 1)
			isHoliday = holidays.some((holiday) =>
				isSameDay(date, new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day)),
			)
		}
		potentialDates[i] = date
	}
	
	// 4. Re-sort the dates after adjustments
	potentialDates.sort((a, b) => a.getTime() - b.getTime())

	// 5. Return the soonest valid date
	return potentialDates[0] || new Date(9999, 11, 31)
} 