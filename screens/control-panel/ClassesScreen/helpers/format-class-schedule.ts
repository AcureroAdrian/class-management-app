import { format } from 'date-fns'
import { TDaysOfWeek, TUserRole } from '@/shared/common-types'
import { shortDaysOfWeek } from '@/shared/short-values'
import { getNextClassDate } from './get-next-class-date'
import { formatStartTime } from './format-start-time'
import getNumberOfWeekDay from './get-number-of-week-day'

const getNextWeekDay = (weekDays: TDaysOfWeek[]): TDaysOfWeek => {
	const today = new Date().getDay()
	
	// Convertir los días de la semana a números y ordenarlos
	const weekDayNumbers = weekDays.map(day => ({
		day,
		number: getNumberOfWeekDay(day)
	}))
	
	// Encontrar el próximo día después de hoy
	const nextDay = weekDayNumbers.find(({ number }) => number > today)
	
	// Si no hay días después de hoy en esta semana, tomar el primer día de la próxima semana
	return nextDay ? nextDay.day : weekDayNumbers.sort((a, b) => a.number - b.number)[0].day
}

export const formatClassSchedule = (
	weekDays: TDaysOfWeek[],
	startTime: { hour: number; minute: number },
	role: TUserRole
): string => {
	let daysToShow: TDaysOfWeek[]
	
	if (role === 'admin') {
		// Para admin, mostrar todos los días
		daysToShow = weekDays
	} else {
		// Para estudiantes, mostrar solo el próximo día
		daysToShow = [getNextWeekDay(weekDays)]
	}
	
	// Obtener los días cortos y ordenarlos
	const shortDays = daysToShow.map(day => shortDaysOfWeek[day]).join(', ')
	
	// Obtener la próxima fecha
	const nextDate = getNextClassDate(weekDays)
	const formattedDate = format(nextDate, 'MMM dd')
	
	// Obtener la hora formateada
	const formattedTime = formatStartTime(startTime)
	
	// Combinar todo en un formato conciso
	return `${shortDays} ${formattedDate} ${formattedTime}`
} 