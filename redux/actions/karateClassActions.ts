import axios from 'axios'
import { Dispatch } from 'redux'
import * as types from '../constants/karateClassConstants'
import { AppStore } from '../store'

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

		const { data } = await axios.get('/api/karate-classes', config)

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

		const { data } = await axios.post('/api/karate-classes', dataToSend, config)

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

		const { data } = await axios.get('/api/karate-classes/' + id, config)

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

			const { data } = await axios.patch('/api/karate-classes/' + id, dataToSend, config)

			dispatch({ type: types.UPDATE_KARATE_CLASS_BY_ID_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.UPDATE_KARATE_CLASS_BY_ID_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}
