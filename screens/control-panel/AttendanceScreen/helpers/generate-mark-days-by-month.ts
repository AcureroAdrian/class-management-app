import { TDaysOfWeek } from '@/shared/common-types'
import { addDays, format, subDays } from 'date-fns'

const weekdaysMap: Record<TDaysOfWeek, number> = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
}

interface IMarkDateValue {
	marked: boolean
}

type TMarkDates = Record<string, IMarkDateValue>

const generateMarkDatesByMonth = (month: number, year: number, weekDays: TDaysOfWeek[] = []) => {
	console.log('weekDays', weekDays)
	console.log('month', month)
	console.log('year', year)
	const startDayToIterate = subDays(new Date(year, month - 1, 1), 10)

	const validDaysNumber = weekDays.map((e) => weekdaysMap[e])

	const markDates: TMarkDates = {}
	//'2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},

	for (let i = 0; i < 50; i++) {
		const dateSelected = addDays(startDayToIterate, i)

		if (validDaysNumber.includes(dateSelected.getDay())) {
			const keyDate = format(dateSelected, 'yyyy-MM-dd')

			markDates[keyDate] = {
				marked: true,
			}
		}
	}

	return markDates
}

export default generateMarkDatesByMonth
