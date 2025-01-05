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

		// const { data } = await axios.get('/api/karate-classes', config)
		/* TEST */
		const promise = new Promise((response) => {
			setTimeout(() => {
				axios.get('/api/karate-classes', config).then((res) => {
					response(res.data)
				})
			}, 2000)
		})
		/* TEST */

		const data = await promise

		dispatch({ type: types.GET_KARATE_CLASS_BY_ADMIN_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_KARATE_CLASS_BY_ADMIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
