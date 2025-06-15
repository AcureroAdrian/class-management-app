import { TAttendanceStatus } from '@/shared/common-types'

export interface IStudent {
	_id: string
	name: string
	lastName: string
	isTrial?: boolean
}

export interface IDailyReport {
	_id: string
	karateClasses: {
		_id: string
		karateClassName: string
		date: {
			year: number
			month: number
			day: number
			hour: number
			minute: number
		}
		attendance: {
			student: IStudent
			attendanceStatus: TAttendanceStatus
			observations?: string
			isDayOnly?: boolean
		}[]
	}[]
}

export interface IClassReport {
	_id: string
	karateClassName: string
	attendances: {
		date: {
			year: number
			month: number
			day: number
			hour: number
			minute: number
		}
		attendance: {
			student: IStudent
			attendanceStatus: TAttendanceStatus
			observations?: string
			isDayOnly?: boolean
		}[]
	}[]
}

export interface IStudentReport {
	_id: string
	karateClassName: string
	date: {
		year: number
		month: number
		day: number
		hour: number
		minute: number
	}
	student: IStudent
	attendanceStatus: TAttendanceStatus
	observations?: string
	isDayOnly?: boolean
}
