import axios from 'axios'
import {
	RESET_ATTENDANCE_SYSTEM_REQUEST,
	RESET_ATTENDANCE_SYSTEM_SUCCESS,
	RESET_ATTENDANCE_SYSTEM_FAIL,
	RESET_ATTENDANCE_SYSTEM_RESET,
} from '../constants/systemConstants'

export const resetAttendanceSystem = (confirmationText: string) => async (dispatch: any, getState: any) => {
	try {
		dispatch({ type: RESET_ATTENDANCE_SYSTEM_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}/api/system/reset-attendance-system`,
			{ confirmationText },
			config
		)

		dispatch({
			type: RESET_ATTENDANCE_SYSTEM_SUCCESS,
			payload: data,
		})
	} catch (error: any) {
		dispatch({
			type: RESET_ATTENDANCE_SYSTEM_FAIL,
			payload: error.response?.data?.message || error.message,
		})
	}
}

export const resetAttendanceSystemReset = () => (dispatch: any) => {
	dispatch({ type: RESET_ATTENDANCE_SYSTEM_RESET })
} 