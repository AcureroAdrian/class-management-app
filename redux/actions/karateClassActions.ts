import { Dispatch } from 'redux'
import * as types from '../constants/karateClassConstants'
import { AppStore } from '../store'
import customAxios from '@/config/axios'

export const getkarateClassesByAdmin = () => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_KARATE_CLASS_BY_ADMIN_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.get('/api/karate-classes', config)

		dispatch({ type: types.GET_KARATE_CLASS_BY_ADMIN_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_KARATE_CLASS_BY_ADMIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const registerKarateClass = (dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.REGISTER_KARATE_CLASS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.post('/api/karate-classes', dataToSend, config)

		dispatch({ type: types.REGISTER_KARATE_CLASS_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.REGISTER_KARATE_CLASS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getkarateClassById = (id: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_KARATE_CLASS_BY_ID_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.get('/api/karate-classes/' + id, config)

		dispatch({ type: types.GET_KARATE_CLASS_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_KARATE_CLASS_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const updatekarateClassById =
	(id: string, dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.UPDATE_KARATE_CLASS_BY_ID_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.patch('/api/karate-classes/' + id, dataToSend, config)

			dispatch({ type: types.UPDATE_KARATE_CLASS_BY_ID_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.UPDATE_KARATE_CLASS_BY_ID_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const getKarateClassesToAdminAttendance = () => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_CLASSES_TO_ADMIN_ATTENDANCE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		// const data = await new Promise((resolve, reject) => {
		// 	setTimeout(() => {
		// 		customAxios
		// 			.get('/api/karate-classes/admin/attendance', config)
		// 			.then((response) => {
		// 				resolve(response.data)
		// 			})
		// 			.catch((error) => {
		// 				reject(error)
		// 			})
		// 	}, 3000)
		// })
		const { data } = await customAxios.get('/api/karate-classes/admin/attendance', config)

		dispatch({ type: types.GET_CLASSES_TO_ADMIN_ATTENDANCE_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_CLASSES_TO_ADMIN_ATTENDANCE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const deletekarateClassById = (id: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.DELETE_KARATE_CLASS_BY_ID_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.delete('/api/karate-classes/' + id, config)

		dispatch({ type: types.DELETE_KARATE_CLASS_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.DELETE_KARATE_CLASS_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getkarateClassesForStudent = () => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_KARATE_CLASSES_FOR_STUDENT_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.get('/api/karate-classes/student', config)

		dispatch({ type: types.GET_KARATE_CLASSES_FOR_STUDENT_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_KARATE_CLASSES_FOR_STUDENT_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getkarateClassesByStudentId =
	(id: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.GET_KARATE_CLASSES_BY_STUDENT_ID_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.get('/api/karate-classes/student/' + id, config)

			dispatch({ type: types.GET_KARATE_CLASSES_BY_STUDENT_ID_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.GET_KARATE_CLASSES_BY_STUDENT_ID_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const bookingRecoveryClassById =
	(id: string, dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.BOOKING_RECOVERY_CLASS_BY_ID_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.put('/api/karate-classes/recovery-class/' + id, dataToSend, config)

			dispatch({ type: types.BOOKING_RECOVERY_CLASS_BY_ID_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.BOOKING_RECOVERY_CLASS_BY_ID_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}
