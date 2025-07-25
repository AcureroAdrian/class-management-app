import { Dispatch } from 'redux'
import {
	DELETE_HOLIDAY_BY_ID_FAIL,
	DELETE_HOLIDAY_BY_ID_REQUEST,
	DELETE_HOLIDAY_BY_ID_SUCCESS,
	GET_HOLIDAYS_FAIL,
	GET_HOLIDAYS_REQUEST,
	GET_HOLIDAYS_SUCCESS,
	REGISTER_HOLIDAY_BY_DATE_FAIL,
	REGISTER_HOLIDAY_BY_DATE_REQUEST,
	REGISTER_HOLIDAY_BY_DATE_SUCCESS,
} from '../constants/holidayConstants'
import { AppStore, AppDispatch } from '../store'
import api from '@/config/axios'

export const registerHolidayByDate =
	(year: number, month: number, day: number) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: REGISTER_HOLIDAY_BY_DATE_REQUEST })

			const {
				userLogin: { userInfo } = {},
			} = getState()

			console.log({ year, month, day })

			const { data } = await api.post(
				'/api/holidays',
				{ year, month, day },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.token}`,
					},
				},
			)

			dispatch({ type: REGISTER_HOLIDAY_BY_DATE_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: REGISTER_HOLIDAY_BY_DATE_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const deleteHolidayById = (holidayId: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: DELETE_HOLIDAY_BY_ID_REQUEST })

		const {
			userLogin: { userInfo } = {},
		} = getState()

		const { data } = await api.delete(`/api/holidays/${holidayId}`, {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		})

		dispatch({ type: DELETE_HOLIDAY_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: DELETE_HOLIDAY_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getHolidays = () => async (dispatch: AppDispatch) => {
	try {
		dispatch({ type: GET_HOLIDAYS_REQUEST })

		const { data } = await api.get('/api/holidays')

		dispatch({ type: GET_HOLIDAYS_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: GET_HOLIDAYS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
