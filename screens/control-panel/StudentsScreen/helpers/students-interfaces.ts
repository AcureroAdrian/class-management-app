import { TUserLevel } from '@/shared/common-types'

export interface IStudent {
	_id: string
	userId: string
	name: string
	lastName: string
	scheduledDeletionDate?: string
	isAdmin: boolean
	isTeacher: boolean
}

export interface IFullStudent extends Omit<IStudent, '_id'> {
	userId: string
	dateOfBirth?: {
		year: number
		month: number
		day: number
	}
	email?: string
	phone?: string
	notes?: string
	level?: TUserLevel
	avatar?: string
	isTeacher: boolean
	isAdmin: boolean
}
