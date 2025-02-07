import { Reducer } from 'redux'
import * as types from '../constants/studentAttendanceConstants'

interface IGetStudentAttendanceByDayState {
	loadingStudentAttendanceByDay?: boolean
	successStudentAttendanceByDay?: boolean
	studentAttendanceByDayList?: any[]
	errorStudentAttendanceByDay?: string
}
interface IRegisterStudentAttendanceState {
	loadingRegisterStudentAttendance?: boolean
	successRegisterStudentAttendance?: boolean
	studentAttendanceRegistered?: any
	errorRegisterStudentAttendance?: string
}
interface IUpdateStudentAttendanceByIdState {
	loadingUpdateStudentAttendanceById?: boolean
	successUpdateStudentAttendanceById?: boolean
	studentAttendanceByIdUpdated?: any
	errorUpdateStudentAttendanceById?: string
}

type TGetStudentAttendanceByDayReducer = Reducer<IGetStudentAttendanceByDayState, any>
type TRegisterStudentAttendanceReducer = Reducer<IRegisterStudentAttendanceState, any>
type TUpdateStudentAttendanceByIdReducer = Reducer<IUpdateStudentAttendanceByIdState, any>

export const getStudentAttendanceByDayReducer: TGetStudentAttendanceByDayReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_STUDENT_ATTENDANCE_BY_DAY_REQUEST:
			return { loadingStudentAttendanceByDay: true }
		case types.GET_STUDENT_ATTENDANCE_BY_DAY_SUCCESS:
			return {
				loadingStudentAttendanceByDay: false,
				successStudentAttendanceByDay: true,
				studentAttendanceByDayList: action.payload,
			}
		case types.GET_STUDENT_ATTENDANCE_BY_DAY_FAIL:
			return {
				loadingStudentAttendanceByDay: false,
				errorStudentAttendanceByDay: action.payload,
			}
		case types.GET_STUDENT_ATTENDANCE_BY_DAY_RESET:
			return {}
		default:
			return state
	}
}

export const registerStudentAttendanceReducer: TRegisterStudentAttendanceReducer = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER_STUDENT_ATTENDANCE_REQUEST:
			return { loadingRegisterStudentAttendance: true }
		case types.REGISTER_STUDENT_ATTENDANCE_SUCCESS:
			return {
				loadingRegisterStudentAttendance: false,
				successRegisterStudentAttendance: true,
				studentAttendanceRegistered: action.payload,
			}
		case types.REGISTER_STUDENT_ATTENDANCE_FAIL:
			return {
				loadingRegisterStudentAttendance: false,
				errorRegisterStudentAttendance: action.payload,
			}
		case types.REGISTER_STUDENT_ATTENDANCE_RESET:
			return {}
		default:
			return state
	}
}

export const updateStudentAttendanceByIdReducer: TUpdateStudentAttendanceByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.UPDATE_STUDENT_ATTENDANCE_BY_ID_REQUEST:
			return { loadingUpdateStudentAttendanceById: true }
		case types.UPDATE_STUDENT_ATTENDANCE_BY_ID_SUCCESS:
			return {
				loadingUpdateStudentAttendanceById: false,
				successUpdateStudentAttendanceById: true,
				studentAttendanceByIdUpdated: action.payload,
			}
		case types.UPDATE_STUDENT_ATTENDANCE_BY_ID_FAIL:
			return {
				loadingUpdateStudentAttendanceById: false,
				errorUpdateStudentAttendanceById: action.payload,
			}
		case types.UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET:
			return {}
		default:
			return state
	}
}
