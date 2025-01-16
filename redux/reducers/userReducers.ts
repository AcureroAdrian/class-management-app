import { Reducer } from 'redux'
import * as types from '../constants/userConstants'

interface IUser {
	_id: string
	name: string
	lastName: string
	dateOfBirth?: string
	level?: string
	email?: string
	avatar?: string
	isAdmin: boolean
	createdAt: string
	token: string
}
interface IStudent {
	_id: string
	name: string
	lastName: string
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
	studentRegisteredList?: IStudent[]
	errorRegisterStudents?: string
}

type TUserLoginReducer = Reducer<ILoginState, any>
type TGetStudentUsersReducer = Reducer<IGetStudentUsersState, any>
type TRegisterStudentsReducer = Reducer<IRegisterStudentsState, any>

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
				studentRegisteredList: action.payload,
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
