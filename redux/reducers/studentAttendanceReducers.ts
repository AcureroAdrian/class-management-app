import { Reducer } from 'redux'
import * as types from '../constants/studentAttendanceConstants'
import { TAttendanceStatus } from '@/shared/common-types'

interface IStudent {
	_id: string
	name: string
	lastName: string
}
interface IDailyReport {
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
		}[]
	}[]
}
interface IClassReport {
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
		}[]
	}[]
}
interface IStudentReport {
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
}

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
interface IGetDailyReportForAdminState {
	loadingDailyReportForAdmin?: boolean
	successDailyReportForAdmin?: boolean
	dailyReportForAdminList?: IDailyReport[]
	errorDailyReportForAdmin?: string
}
interface IGetDailyReportForAdminState {
	loadingClassReportByClassIdForAdmin?: boolean
	successClassReportByClassIdForAdmin?: boolean
	classReportByClassIdForAdminList?: IClassReport[]
	errorClassReportByClassIdForAdmin?: string
}
interface IGetStudentReportForAdminState {
	loadingStudentReportForAdmin?: boolean
	successStudentReportForAdmin?: boolean
	studentReportForAdminList?: IStudentReport[]
	errorStudentReportForAdmin?: string
}

type TGetStudentAttendanceByDayReducer = Reducer<IGetStudentAttendanceByDayState, any>
type TRegisterStudentAttendanceReducer = Reducer<IRegisterStudentAttendanceState, any>
type TUpdateStudentAttendanceByIdReducer = Reducer<IUpdateStudentAttendanceByIdState, any>
type TGetDailyReportForAdminReducer = Reducer<IGetDailyReportForAdminState, any>
type TGetClassReportByClassIdForAdminReducer = Reducer<IGetDailyReportForAdminState, any>
type TGetStudentReportForAdminReducer = Reducer<IGetStudentReportForAdminState, any>

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

export const getDailyReportForAdminReducer: TGetDailyReportForAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_DAILY_REPORT_FOR_ADMIN_REQUEST:
			return { loadingDailyReportForAdmin: true }
		case types.GET_DAILY_REPORT_FOR_ADMIN_SUCCESS:
			return {
				loadingDailyReportForAdmin: false,
				successDailyReportForAdmin: true,
				dailyReportForAdminList: action.payload,
			}
		case types.GET_DAILY_REPORT_FOR_ADMIN_FAIL:
			return {
				loadingDailyReportForAdmin: false,
				errorDailyReportForAdmin: action.payload,
			}
		case types.GET_DAILY_REPORT_FOR_ADMIN_RESET:
			return {}
		default:
			return state
	}
}

export const getClassReportByClassIdForAdminReducer: TGetClassReportByClassIdForAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_REQUEST:
			return { loadingClassReportByClassIdForAdmin: true }
		case types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_SUCCESS:
			return {
				loadingClassReportByClassIdForAdmin: false,
				successClassReportByClassIdForAdmin: true,
				classReportByClassIdForAdminList: action.payload,
			}
		case types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_FAIL:
			return {
				loadingClassReportByClassIdForAdmin: false,
				errorClassReportByClassIdForAdmin: action.payload,
			}
		case types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_RESET:
			return {}
		default:
			return state
	}
}

export const getStudentReportForAdminReducer: TGetStudentReportForAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_STUDENT_REPORT_FOR_ADMIN_REQUEST:
			return { loadingStudentReportForAdmin: true }
		case types.GET_STUDENT_REPORT_FOR_ADMIN_SUCCESS:
			return {
				loadingStudentReportForAdmin: false,
				successStudentReportForAdmin: true,
				studentReportForAdminList: action.payload,
			}
		case types.GET_STUDENT_REPORT_FOR_ADMIN_FAIL:
			return {
				loadingStudentReportForAdmin: false,
				errorStudentReportForAdmin: action.payload,
			}
		case types.GET_STUDENT_REPORT_FOR_ADMIN_RESET:
			return {}
		default:
			return state
	}
}
