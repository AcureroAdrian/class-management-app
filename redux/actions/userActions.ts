import { Dispatch } from 'redux'
import parseJwt from '@/shared/parseJwt'
import * as types from '../constants/userConstants'
import { AppStore } from '../store'
import customAxios from '@/config/axios'

interface IDataLogin {
	userId: string
}

export const login = (dataLogin: IDataLogin) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.USER_LOGIN_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await customAxios.post('/api/auth/login', dataLogin, config)

		const decoded = parseJwt(data.token)

		const userSession = {
			...decoded,
			token: data.token,
		}

		dispatch({ type: types.USER_LOGIN_SUCCESS, payload: userSession })
	} catch (error: any) {
		dispatch({
			type: types.USER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getStudentUsers =
	(mode: 'teachers' | 'students') => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.GET_STUDENT_USERS_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState() as any

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.get(`/api/users?mode=${mode}`, config)

			dispatch({ type: types.GET_STUDENT_USERS_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.GET_STUDENT_USERS_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const registerStudents = (dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.REGISTER_STUDENTS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState() as any

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.post('/api/users', dataToSend, config)

		dispatch({ type: types.REGISTER_STUDENTS_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.REGISTER_STUDENTS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getStudentUserById = (studentId: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_STUDENT_USER_BY_ID_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState() as any

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.get('/api/users/' + studentId, config)

		dispatch({ type: types.GET_STUDENT_USER_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_STUDENT_USER_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const updateStudentUserById =
	(studentId: string, dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.UPDATE_STUDENT_USER_BY_ID_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState() as any

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.patch('/api/users/' + studentId, dataToSend, config)

			dispatch({ type: types.UPDATE_STUDENT_USER_BY_ID_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.UPDATE_STUDENT_USER_BY_ID_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const deleteStudentUserById =
	(studentId: string, scheduledDate?: Date) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.DELETE_STUDENT_USER_BY_ID_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState() as any

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const body = scheduledDate ? { scheduledDeletionDate: scheduledDate.toISOString() } : {}

			const { data } = await customAxios.post('/api/users/' + studentId, body, config)

			dispatch({ type: types.DELETE_STUDENT_USER_BY_ID_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.DELETE_STUDENT_USER_BY_ID_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const registerTrialStudent = (dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.REGISTER_TRIAL_STUDENT_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState() as any

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.post('/api/users/trial-student', dataToSend, config)

		dispatch({ type: types.REGISTER_TRIAL_STUDENT_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.REGISTER_TRIAL_STUDENT_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const adjustStudentRecoveryCredits =
	(studentId: string, adjustment: 1 | -1) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.ADJUST_RECOVERY_CREDITS_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState() as any

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.post(`/api/users/${studentId}/adjust-credits`, { adjustment }, config)

			dispatch({ type: types.ADJUST_RECOVERY_CREDITS_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.ADJUST_RECOVERY_CREDITS_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const getStudentCredits = (studentId: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_STUDENT_CREDITS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState() as any

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.get(`/api/users/${studentId}/credits`, config)

		dispatch({ type: types.GET_STUDENT_CREDITS_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_STUDENT_CREDITS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}