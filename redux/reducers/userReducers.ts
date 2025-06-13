import { Reducer } from 'redux'
import * as types from '../constants/userConstants'
import { TUserLevel } from '@/shared/common-types'

interface IUser {
	_id: string
	userId: string
	name: string
	lastName: string
	dateOfBirth?: {
		year: number
		month: number
		day: number
	}
	level?: TUserLevel
	email?: string
	phone?: string
	notes?: string
	avatar?: string
	isSuper: boolean
	isAdmin: boolean
	isTeacher: boolean
	createdAt: string
	token: string
}
interface IStudent {
	_id: string
	name: string
	lastName: string
	scheduledDeletionDate?: string
	isAdmin: boolean
	isTeacher: boolean
}

interface ILoginState {
	loadingUserLogin?: boolean
	successUserLogin?: boolean
	userInfo?: IUser
	errorUserLogin?: string
}
interface IGetStudentUsersState {
	loadingGetStudentUsers?: boolean
	successGetStudentUsers?: boolean
	studentUsersList?: IStudent[]
	errorGetStudentUsers?: string
}
interface IRegisterStudentsState {
	loadingRegisterStudents?: boolean
	successRegisterStudents?: boolean
	studentRegistered?: IStudent
	errorRegisterStudents?: string
}
interface IGetStudentUserByIdState {
	loadingGetStudentUserById?: boolean
	successGetStudentUserById?: boolean
	studentUserById?: Omit<IUser, 'token | createdAt | isAdmin'>
	errorGetStudentUserById?: string
}
interface IUpdateStudentUserByIdState {
	loadingUpdateStudentUserById?: boolean
	successUpdateStudentUserById?: boolean
	studentUserByIdUpdated?: Omit<IUser, 'token | createdAt | isAdmin'>
	errorUpdateStudentUserById?: string
}
interface IDeleteStudentUserByIdState {
	loadingDeleteStudentUserById?: boolean
	successDeleteStudentUserById?: boolean
	studentUserDeleted?: { 
		studentId: string
		message?: string
		scheduledDeletionDate?: string
	}
	errorDeleteStudentUserById?: string
}

type TUserLoginReducer = Reducer<ILoginState, any>
type TGetStudentUsersReducer = Reducer<IGetStudentUsersState, any>
type TRegisterStudentsReducer = Reducer<IRegisterStudentsState, any>
type TGetStudentUserByIdReducer = Reducer<IGetStudentUserByIdState, any>
type TUpdateStudentUserByIdReducer = Reducer<IUpdateStudentUserByIdState, any>
type TDeleteStudentUserByIdReducer = Reducer<IDeleteStudentUserByIdState, any>

export const userLoginReducer: TUserLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case types.USER_LOGIN_REQUEST:
			return { loadingUserLogin: true }
		case types.USER_LOGIN_SUCCESS:
			return {
				loadingUserLogin: false,
				successUserLogin: true,
				userInfo: action.payload,
			}
		case types.USER_LOGIN_FAIL:
			return {
				loadingUserLogin: false,
				errorUserLogin: action.payload,
			}
		case types.USER_LOGOUT:
			return {}
		default:
			return state
	}
}

export const getStudentUsersReducer: TGetStudentUsersReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_STUDENT_USERS_REQUEST:
			return { loadingGetStudentUsers: true }
		case types.GET_STUDENT_USERS_SUCCESS:
			return {
				loadingGetStudentUsers: false,
				successGetStudentUsers: true,
				studentUsersList: action.payload,
			}
		case types.GET_STUDENT_USERS_FAIL:
			return {
				loadingGetStudentUsers: false,
				errorGetStudentUsers: action.payload,
			}
		case types.GET_STUDENT_USERS_RESET:
			return {}
		default:
			return state
	}
}

export const registerStudentsReducer: TRegisterStudentsReducer = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER_STUDENTS_REQUEST:
			return { loadingRegisterStudents: true }
		case types.REGISTER_STUDENTS_SUCCESS:
			return {
				loadingRegisterStudents: false,
				successRegisterStudents: true,
				studentRegistered: action.payload,
			}
		case types.REGISTER_STUDENTS_FAIL:
			return {
				loadingRegisterStudents: false,
				errorRegisterStudents: action.payload,
			}
		case types.REGISTER_STUDENTS_RESET:
			return {}
		default:
			return state
	}
}

export const getStudentUserByIdReducer: TGetStudentUserByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_STUDENT_USER_BY_ID_REQUEST:
			return { loadingGetStudentUserById: true }
		case types.GET_STUDENT_USER_BY_ID_SUCCESS:
			return {
				loadingGetStudentUserById: false,
				successGetStudentUserById: true,
				studentUserById: action.payload,
			}
		case types.GET_STUDENT_USER_BY_ID_FAIL:
			return {
				loadingGetStudentUserById: false,
				errorGetStudentUserById: action.payload,
			}
		case types.GET_STUDENT_USER_BY_ID_RESET:
			return {}
		default:
			return state
	}
}

export const updateStudentUserByIdReducer: TUpdateStudentUserByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.UPDATE_STUDENT_USER_BY_ID_REQUEST:
			return { loadingUpdateStudentUserById: true }
		case types.UPDATE_STUDENT_USER_BY_ID_SUCCESS:
			return {
				loadingUpdateStudentUserById: false,
				successUpdateStudentUserById: true,
				studentUserByIdUpdated: action.payload,
			}
		case types.UPDATE_STUDENT_USER_BY_ID_FAIL:
			return {
				loadingUpdateStudentUserById: false,
				errorUpdateStudentUserById: action.payload,
			}
		case types.UPDATE_STUDENT_USER_BY_ID_RESET:
			return {}
		default:
			return state
	}
}

export const deleteStudentUserByIdReducer: TDeleteStudentUserByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.DELETE_STUDENT_USER_BY_ID_REQUEST:
			return { loadingDeleteStudentUserById: true }
		case types.DELETE_STUDENT_USER_BY_ID_SUCCESS:
			return {
				loadingDeleteStudentUserById: false,
				successDeleteStudentUserById: true,
				studentUserDeleted: action.payload,
			}
		case types.DELETE_STUDENT_USER_BY_ID_FAIL:
			return {
				loadingDeleteStudentUserById: false,
				errorDeleteStudentUserById: action.payload,
			}
		case types.DELETE_STUDENT_USER_BY_ID_RESET:
			return {}
		default:
			return state
	}
}
