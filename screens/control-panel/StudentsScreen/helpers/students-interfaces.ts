import { TUserLevel } from '@/shared/common-types'

export interface IStudent {
	_id: string
	name: string
	lastName: string
}

export interface IFullStudent extends Omit<IStudent, '_id'> {
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
}
