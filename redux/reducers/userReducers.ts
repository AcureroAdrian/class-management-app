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
	scheduledDeletionDate?: string
	isTrial?: boolean
}
interface IStudent {
	_id: string
	userId: string
	name: string
	lastName: string
	scheduledDeletionDate?: string
	isAdmin: boolean
	isTeacher: boolean
	isTrial: boolean
}

interface IUserLogin {
	_id: string
	userId: string
	avatar: string
	name: string
	lastName: string
	email: string
	level: string
	dateOfBirth: {
		year: number
		month: number
		day: number
	}
	createdAt: string
	isSuper: boolean
	isAdmin: boolean
	isTeacher: boolean
	token: string
}

interface IUserLoginState {
	loadingUserLogin?: boolean
	userInfo?: IUserLogin
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
	studentRegistered?: IUser
	errorRegisterStudents?: string
}
interface IRegisterTrialStudentState {
	loadingRegisterTrialStudent?: boolean
	successRegisterTrialStudent?: boolean
	trialStudentRegistered?: IUser
	errorRegisterTrialStudent?: string
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

type TUserLoginReducer = Reducer<IUserLoginState, any>
type TGetStudentUsersReducer = Reducer<IGetStudentUsersState, any>
type TRegisterStudentsReducer = Reducer<IRegisterStudentsState, any>
type TRegisterTrialStudentReducer = Reducer<IRegisterTrialStudentState, any>
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

export const registerTrialStudentReducer: TRegisterTrialStudentReducer = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER_TRIAL_STUDENT_REQUEST:
			return { loadingRegisterTrialStudent: true }
		case types.REGISTER_TRIAL_STUDENT_SUCCESS:
			return {
				loadingRegisterTrialStudent: false,
				successRegisterTrialStudent: true,
				trialStudentRegistered: action.payload,
			}
		case types.REGISTER_TRIAL_STUDENT_FAIL:
			return {
				loadingRegisterTrialStudent: false,
				errorRegisterTrialStudent: action.payload,
			}
		case types.REGISTER_TRIAL_STUDENT_RESET:
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
