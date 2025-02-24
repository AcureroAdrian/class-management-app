import { Dispatch } from 'redux'
import * as types from '../constants/holidayConstants'
import { AppStore } from '../store'
import customAxios from '@/config/axios'

export const registerHolidayByDate =
	(dataToSend: any) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
		try {
			dispatch({ type: types.REGISTER_HOLIDAY_BY_DATE_REQUEST })

			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			}

			const { data } = await customAxios.post('/api/holidays', dataToSend, config)

			dispatch({ type: types.REGISTER_HOLIDAY_BY_DATE_SUCCESS, payload: data })
		} catch (error: any) {
			dispatch({
				type: types.REGISTER_HOLIDAY_BY_DATE_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			})
		}
	}

export const deleteHolidayById = (id: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.DELETE_HOLIDAY_BY_ID_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.delete('/api/holidays/' + id, config)

		dispatch({ type: types.DELETE_HOLIDAY_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.DELETE_HOLIDAY_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
