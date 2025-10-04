import { TDaysOfWeek, TLocation } from '@/shared/common-types'

export interface IClass {
	_id: string
	name: string
	description?: string
	startTime: { hour: number; minute: number }
	weekDays: TDaysOfWeek[]
	location?: TLocation
	students: string[]
	recoveryClass?: {
		_id: string
		karateClass: string
		student: string
		attendance: string
		date: {
			year: number
			month: number
			day: number
			hour: number
			minute: number
		}
	}
}

export interface IStudent {
	_id: string
	name: string
	lastName: string
}

export interface IReserveRecoveryClassModalProps {
	openModal: boolean
	closeModal: () => void
	startTime: { hour: number; minute: number }
	weekDays: TDaysOfWeek[]
	location: TLocation
	karateClassId: string
	karateClassName: string
	attendanceId: string
	nextClassDate: Date
}
