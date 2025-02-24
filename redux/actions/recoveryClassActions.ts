import { Dispatch } from 'redux'
import * as types from '../constants/recoveryClassConstants'
import { AppStore } from '../store'
import customAxios from '@/config/axios'

export const deleteRecoveryClassById = (id: string) => async (dispatch: Dispatch, getState: AppStore['getState']) => {
	try {
		dispatch({ type: types.DELETE_RECOVERY_CLASS_BY_ID_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`,
			},
		}

		const { data } = await customAxios.delete('/api/recovery-classes/' + id, config)

		dispatch({ type: types.DELETE_RECOVERY_CLASS_BY_ID_SUCCESS, payload: data })
	} catch (error: any) {
		dispatch({
			type: types.DELETE_RECOVERY_CLASS_BY_ID_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
