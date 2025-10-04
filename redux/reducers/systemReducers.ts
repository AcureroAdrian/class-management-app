import {
	RESET_ATTENDANCE_SYSTEM_REQUEST,
	RESET_ATTENDANCE_SYSTEM_SUCCESS,
	RESET_ATTENDANCE_SYSTEM_FAIL,
	RESET_ATTENDANCE_SYSTEM_RESET,
} from '../constants/systemConstants'

interface IResetAttendanceSystemState {
	loadingResetAttendanceSystem?: boolean
	successResetAttendanceSystem?: boolean
	resetAttendanceSystemResponse?: any
	errorResetAttendanceSystem?: string
}

export const resetAttendanceSystemReducer = (
	state: IResetAttendanceSystemState = {},
	action: any
): IResetAttendanceSystemState => {
	switch (action.type) {
		case RESET_ATTENDANCE_SYSTEM_REQUEST:
			return { loadingResetAttendanceSystem: true }
		case RESET_ATTENDANCE_SYSTEM_SUCCESS:
			return {
				loadingResetAttendanceSystem: false,
				successResetAttendanceSystem: true,
				resetAttendanceSystemResponse: action.payload,
			}
		case RESET_ATTENDANCE_SYSTEM_FAIL:
			return {
				loadingResetAttendanceSystem: false,
				errorResetAttendanceSystem: action.payload,
			}
		case RESET_ATTENDANCE_SYSTEM_RESET:
			return {}
		default:
			return state
	}
} 