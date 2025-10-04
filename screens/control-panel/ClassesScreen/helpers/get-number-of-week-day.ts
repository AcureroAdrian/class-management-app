import { TDaysOfWeek } from '@/shared/common-types'
import { Day } from 'date-fns'

const weekDayNumber: Record<TDaysOfWeek, number> = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
}

const getNumberOfWeekDay = (day: TDaysOfWeek) => {
	return weekDayNumber[day] as Day
}

export default getNumberOfWeekDay
