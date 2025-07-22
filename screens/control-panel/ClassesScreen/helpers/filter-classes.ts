import { IClass } from '../helpers/karate-classes-interfaces'
import { TDaysOfWeek, TLocation } from '@/shared/common-types'

export const filterClassesByDays = (classes: IClass[], selectedDays: TDaysOfWeek[]): IClass[] => {
	if (selectedDays.length === 0) return classes
	return classes.filter((classItem) => {
		return classItem.weekDays.some((day) => selectedDays.includes(day))
	})
}

export const filterClassesByTimeRange = (classes: IClass[], timeRange: string): IClass[] => {
	if (timeRange === 'all') return classes
	return classes.filter((classItem) => {
		const hour = classItem.startTime.hour
		switch (timeRange) {
			case 'morning':
				return hour >= 6 && hour < 12
			case 'afternoon':
				return hour >= 12 && hour < 18
			case 'evening':
				return hour >= 18 || hour < 6
			default:
				return true
		}
	})
}

export const filterClassesByLocation = (classes: IClass[], location: TLocation | 'all'): IClass[] => {
	if (location === 'all') return classes
	return classes.filter((classItem) => classItem.location === location)
}

export const applyFilters = (
	classes: IClass[],
	selectedDays: TDaysOfWeek[],
	selectedTimeRange: string,
	selectedLocation: TLocation | 'all'
): IClass[] => {
	let filteredClasses = classes
	filteredClasses = filterClassesByDays(filteredClasses, selectedDays)
	filteredClasses = filterClassesByTimeRange(filteredClasses, selectedTimeRange)
	filteredClasses = filterClassesByLocation(filteredClasses, selectedLocation)
	return filteredClasses
} 