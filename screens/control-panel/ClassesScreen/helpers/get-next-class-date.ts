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

// Función para obtener la próxima fecha de una clase específica
export const getNextClassDateForSorting = (weekDays: TDaysOfWeek[]): Date => {
	if (!weekDays || weekDays.length === 0) {
		// Si no hay días de la semana, retornar una fecha muy lejana
		return new Date(9999, 11, 31)
	}
	
	const nextDayForWeekDay = weekDays.map((weekDay) => {
		const weekDayNumber = getNumberOfWeekDay(weekDay)
		return nextDay(new Date(), weekDayNumber)
	})

	nextDayForWeekDay.sort((a: Date, b: Date) => {
		return a > b ? 1 : -1
	})

	return nextDayForWeekDay[0]
} 