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
