import axios from 'axios'
import { Dispatch } from 'redux'
import parseJwt from '@/shared/parseJwt'
import * as types from '../constants/userConstants'
import { AppStore } from '../store'

interface IDataLogin {
	name: string
	lastName: string
	dateOfBirth: Date
}

export const login = (dataLogin: IDataLogin) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.USER_LOGIN_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post('/api/auth/login', dataLogin, config)

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

export const getStudentUsers = () => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.GET_STUDENT_USERS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await axios.get('/api/users', config)

		dispatch({ type: types.GET_STUDENT_USERS_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.GET_STUDENT_USERS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
