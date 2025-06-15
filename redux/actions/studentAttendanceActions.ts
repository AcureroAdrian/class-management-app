import { Dispatch } from 'redux'
import * as types from '../constants/studentAttendanceConstants'
import { AppStore } from '../store'
import customAxios from '@/config/axios'

export const getStudentAttendanceByDay =
	(year: number, month: number, day: number) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.GET_STUDENT_ATTENDANCE_BY_DAY_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}
			const { data } = await customAxios.get(`/api/student-attendances?year=${year}&month=${month}&day=${day}`, config)

			dispatch({ type: types.GET_STUDENT_ATTENDANCE_BY_DAY_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.GET_STUDENT_ATTENDANCE_BY_DAY_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const registerStudentAttendance = (studentAttendance: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.REGISTER_STUDENT_ATTENDANCE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.post('/api/student-attendances/', studentAttendance, config)

		dispatch({ type: types.REGISTER_STUDENT_ATTENDANCE_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.REGISTER_STUDENT_ATTENDANCE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const updateStudentAttendanceById = (id: string, attendanceData: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.UPDATE_STUDENT_ATTENDANCE_BY_ID_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.patch('/api/student-attendances/' + id, attendanceData, config)

		dispatch({ type: types.UPDATE_STUDENT_ATTENDANCE_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.UPDATE_STUDENT_ATTENDANCE_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getDailyReportForAdmin =
	(startDate: string, endDate: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.GET_DAILY_REPORT_FOR_ADMIN_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.get(
				`/api/student-attendances/daily-report-admin?startDate=${startDate}&endDate=${endDate}`,
				config,
			)

			dispatch({ type: types.GET_DAILY_REPORT_FOR_ADMIN_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.GET_DAILY_REPORT_FOR_ADMIN_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const getClassReportByClassIdForAdmin =
	(id: string, startDate: string, endDate: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.get(
				`/api/student-attendances/class-report-admin/${id}?startDate=${startDate}&endDate=${endDate}`,
				config,
			)

			dispatch({ type: types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const getStudentReportForAdmin =
	(id: string, classId: string, startDate: string, endDate: string) =>
	async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.GET_STUDENT_REPORT_FOR_ADMIN_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.get(
				`/api/student-attendances/student-report-admin/${id}?classId=${classId}&startDate=${startDate}&endDate=${endDate}`,
				config,
			)

			dispatch({ type: types.GET_STUDENT_REPORT_FOR_ADMIN_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.GET_STUDENT_REPORT_FOR_ADMIN_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const addStudentToAttendance = (dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.ADD_STUDENT_TO_ATTENDANCE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.post('/api/student-attendances/add-student-to-attendance', dataToSend, config)

		dispatch({ type: types.ADD_STUDENT_TO_ATTENDANCE_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.ADD_STUDENT_TO_ATTENDANCE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
