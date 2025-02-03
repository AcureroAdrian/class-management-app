import { Reducer } from 'redux'
import * as types from '../constants/studentAttendanceConstants'

interface IGetStudentAttendanceByDayState {
	loadingStudentAttendanceByDay?: boolean
	successStudentAttendanceByDay?: boolean
	studentAttendanceByDayList?: any[]
	errorStudentAttendanceByDay?: string
}

type TGetStudentAttendanceByDayReducer = Reducer<IGetStudentAttendanceByDayState, any>

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
