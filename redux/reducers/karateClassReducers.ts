import { Reducer } from 'redux'
import * as types from '../constants/karateClassConstants'

interface IGetKarateClassesByAdminState {
	loadingKarateClassesByAdmin?: boolean
	successKarateClassesByAdmin?: boolean
	karateClassesByAdminList?: any[]
	errorKarateClassesByAdmin?: string
}
interface IRegisterKarateClassState {
	loadingRegisterKarateClass?: boolean
	successRegisterKarateClass?: boolean
	karateClassRegistered?: any
	errorRegisterKarateClass?: string
}
interface IGetKarateClassByIdState {
	loadingGetKarateClassById?: boolean
	successGetKarateClassById?: boolean
	karateClassById?: any
	errorGetKarateClassById?: string
}
interface IUpdateKarateClassByIdState {
	loadingUpdateKarateClassById?: boolean
	successUpdateKarateClassById?: boolean
	karateClassByIdUpdated?: any
	errorUpdateKarateClassById?: string
}
interface IGetKarateClassesToAdminAttendanceState {
	loadingGetKarateClassesToAdminAttendance?: boolean
	successGetKarateClassesToAdminAttendance?: boolean
	karateClassesToAdminAttendance?: any
	errorGetKarateClassesToAdminAttendance?: string
}
interface IDeleteKarateClassByIdState {
	loadingDeleteKarateClassById?: boolean
	successDeleteKarateClassById?: boolean
	karateClassDeleted?: { karateClassId: string }
	errorDeleteKarateClassById?: string
}
interface IGetKarateClassesForStudentState {
	loadingKarateClassesForStudent?: boolean
	successKarateClassesForStudent?: boolean
	karateClassesForStudentList?: { karateClasses: any[]; absents: any[] }
	errorKarateClassesForStudent?: string
}
interface IGetKarateClassesByStudentIdState {
	loadingKarateClassesByStudentId?: boolean
	successKarateClassesByStudentId?: boolean
	karateClassesByStudentIdList?: any[]
	errorKarateClassesByStudentId?: string
}
interface IBookingRecoveryClassByIdState {
	loadingBookingRecoveryClassById?: boolean
	successBookingRecoveryClassById?: boolean
	recoveryClassBooked?: any
	errorBookingRecoveryClassById?: string
}

type TGetKarateClassesByAdminReducer = Reducer<IGetKarateClassesByAdminState, any>
type TRegisterKarateClassReducer = Reducer<IRegisterKarateClassState, any>
type TGetKarateClassByIdReducer = Reducer<IGetKarateClassByIdState, any>
type TUpdateKarateClassByIdReducer = Reducer<IUpdateKarateClassByIdState, any>
type TGetKarateClassesToAdminAttendanceReducer = Reducer<IGetKarateClassesToAdminAttendanceState, any>
type TDeleteKarateClassByIdReducer = Reducer<IDeleteKarateClassByIdState, any>
type TGetKarateClassesForStudentReducer = Reducer<IGetKarateClassesForStudentState, any>
type TGetKarateClassesByStudentIdReducer = Reducer<IGetKarateClassesByStudentIdState, any>
type TBookingRecoveryClassByIdReducer = Reducer<IBookingRecoveryClassByIdState, any>

export const getKarateClassesByAdminReducer: TGetKarateClassesByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_KARATE_CLASS_BY_ADMIN_REQUEST:
			return { loadingKarateClassesByAdmin: true }
		case types.GET_KARATE_CLASS_BY_ADMIN_SUCCESS:
			return {
				loadingKarateClassesByAdmin: false,
				successKarateClassesByAdmin: true,
				karateClassesByAdminList: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ADMIN_FAIL:
			return {
				loadingKarateClassesByAdmin: false,
				errorKarateClassesByAdmin: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ADMIN_RESET:
			return {}
		default:
			return state
	}
}

export const registerKarateClassReducer: TRegisterKarateClassReducer = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER_KARATE_CLASS_REQUEST:
			return { loadingRegisterKarateClass: true }
		case types.REGISTER_KARATE_CLASS_SUCCESS:
			return {
				loadingRegisterKarateClass: false,
				successRegisterKarateClass: true,
				karateClassRegistered: action.payload,
			}
		case types.REGISTER_KARATE_CLASS_FAIL:
			return {
				loadingRegisterKarateClass: false,
				errorRegisterKarateClass: action.payload,
			}
		case types.REGISTER_KARATE_CLASS_RESET:
			return {}
		default:
			return state
	}
}

export const getKarateClassByIdReducer: TGetKarateClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_KARATE_CLASS_BY_ID_REQUEST:
			return { loadingGetKarateClassById: true }
		case types.GET_KARATE_CLASS_BY_ID_SUCCESS:
			return {
				loadingGetKarateClassById: false,
				successGetKarateClassById: true,
				karateClassById: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ID_FAIL:
			return {
				loadingGetKarateClassById: false,
				errorGetKarateClassById: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}

export const updateKarateClassByIdReducer: TUpdateKarateClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.UPDATE_KARATE_CLASS_BY_ID_REQUEST:
			return { loadingUpdateKarateClassById: true }
		case types.UPDATE_KARATE_CLASS_BY_ID_SUCCESS:
			return {
				loadingUpdateKarateClassById: false,
				successUpdateKarateClassById: true,
				karateClassByIdUpdated: action.payload,
			}
		case types.UPDATE_KARATE_CLASS_BY_ID_FAIL:
			return {
				loadingUpdateKarateClassById: false,
				errorUpdateKarateClassById: action.payload,
			}
		case types.UPDATE_KARATE_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}

export const getKarateClassesToAdminAttendanceReducer: TGetKarateClassesToAdminAttendanceReducer = (
	state = {},
	action,
) => {
	switch (action.type) {
		case types.GET_CLASSES_TO_ADMIN_ATTENDANCE_REQUEST:
			return { loadingGetKarateClassesToAdminAttendance: true }
		case types.GET_CLASSES_TO_ADMIN_ATTENDANCE_SUCCESS:
			return {
				loadingGetKarateClassesToAdminAttendance: false,
				successGetKarateClassesToAdminAttendance: true,
				karateClassesToAdminAttendance: action.payload,
			}
		case types.GET_CLASSES_TO_ADMIN_ATTENDANCE_FAIL:
			return {
				loadingGetKarateClassesToAdminAttendance: false,
				errorGetKarateClassesToAdminAttendance: action.payload,
			}
		case types.GET_CLASSES_TO_ADMIN_ATTENDANCE_RESET:
			return {}
		default:
			return state
	}
}

export const deleteKarateClassByIdReducer: TDeleteKarateClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.DELETE_KARATE_CLASS_BY_ID_REQUEST:
			return { loadingDeleteKarateClassById: true }
		case types.DELETE_KARATE_CLASS_BY_ID_SUCCESS:
			return {
				loadingDeleteKarateClassById: false,
				successDeleteKarateClassById: true,
				karateClassDeleted: action.payload,
			}
		case types.DELETE_KARATE_CLASS_BY_ID_FAIL:
			return {
				loadingDeleteKarateClassById: false,
				errorDeleteKarateClassById: action.payload,
			}
		case types.DELETE_KARATE_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}

export const getKarateClassesForStudentReducer: TGetKarateClassesForStudentReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_KARATE_CLASSES_FOR_STUDENT_REQUEST:
			return { loadingKarateClassesForStudent: true }
		case types.GET_KARATE_CLASSES_FOR_STUDENT_SUCCESS:
			return {
				loadingKarateClassesForStudent: false,
				successKarateClassesForStudent: true,
				karateClassesForStudentList: action.payload,
			}
		case types.GET_KARATE_CLASSES_FOR_STUDENT_FAIL:
			return {
				loadingKarateClassesForStudent: false,
				errorKarateClassesForStudent: action.payload,
			}
		case types.GET_KARATE_CLASSES_FOR_STUDENT_RESET:
			return {}
		default:
			return state
	}
}

export const getKarateClassesByStudentIdReducer: TGetKarateClassesByStudentIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_KARATE_CLASSES_BY_STUDENT_ID_REQUEST:
			return { loadingKarateClassesByStudentId: true }
		case types.GET_KARATE_CLASSES_BY_STUDENT_ID_SUCCESS:
			return {
				loadingKarateClassesByStudentId: false,
				successKarateClassesByStudentId: true,
				karateClassesByStudentIdList: action.payload,
			}
		case types.GET_KARATE_CLASSES_BY_STUDENT_ID_FAIL:
			return {
				loadingKarateClassesByStudentId: false,
				errorKarateClassesByStudentId: action.payload,
			}
		case types.GET_KARATE_CLASSES_BY_STUDENT_ID_RESET:
			return {}
		default:
			return state
	}
}

export const bookingRecoveryClassByIdReducer: TBookingRecoveryClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.BOOKING_RECOVERY_CLASS_BY_ID_REQUEST:
			return { loadingBookingRecoveryClassById: true }
		case types.BOOKING_RECOVERY_CLASS_BY_ID_SUCCESS:
			return {
				loadingBookingRecoveryClassById: false,
				successBookingRecoveryClassById: true,
				recoveryClassBooked: action.payload,
			}
		case types.BOOKING_RECOVERY_CLASS_BY_ID_FAIL:
			return {
				loadingBookingRecoveryClassById: false,
				errorBookingRecoveryClassById: action.payload,
			}
		case types.BOOKING_RECOVERY_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}
