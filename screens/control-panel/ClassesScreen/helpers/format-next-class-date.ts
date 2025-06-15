import { format } from 'date-fns'
import { TDaysOfWeek } from '@/shared/common-types'
import { getNextClassDate } from './get-next-class-date'

export const formatNextClassDate = (weekDays: TDaysOfWeek[]): string => {
	const nextDate = getNextClassDate(weekDays)
	return format(nextDate, 'MMM dd')
} 