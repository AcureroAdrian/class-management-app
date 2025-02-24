import { Reducer } from 'redux'
import * as types from '../constants/holidayConstants'

interface IRegisterHolidayByDateState {
	loadingRegisterHolidayByDate?: boolean
	successRegisterHolidayByDate?: boolean
	holidayByDateRegistered?: any
	errorRegisterHolidayByDate?: string
}
interface IDeleteHolidayByIdState {
	loadingDeleteHolidayById?: boolean
	successDeleteHolidayById?: boolean
	holidayDeleted?: { holidayId: string }
	errorDeleteHolidayById?: string
}

type TRegisterHolidayByDateReducer = Reducer<IRegisterHolidayByDateState, any>
type TDeleteHolidayByIdReducer = Reducer<IDeleteHolidayByIdState, any>

export const registerHolidayByDateReducer: TRegisterHolidayByDateReducer = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER_HOLIDAY_BY_DATE_REQUEST:
			return { loadingRegisterHolidayByDate: true }
		case types.REGISTER_HOLIDAY_BY_DATE_SUCCESS:
			return {
				loadingRegisterHolidayByDate: false,
				successRegisterHolidayByDate: true,
				holidayByDateRegistered: action.payload,
			}
		case types.REGISTER_HOLIDAY_BY_DATE_FAIL:
			return {
				loadingRegisterHolidayByDate: false,
				errorRegisterHolidayByDate: action.payload,
			}
		case types.REGISTER_HOLIDAY_BY_DATE_RESET:
			return {}
		default:
			return state
	}
}

export const deleteHolidayByIdReducer: TDeleteHolidayByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.DELETE_HOLIDAY_BY_ID_REQUEST:
			return { loadingDeleteHolidayById: true }
		case types.DELETE_HOLIDAY_BY_ID_SUCCESS:
			return {
				loadingDeleteHolidayById: false,
				successDeleteHolidayById: true,
				holidayDeleted: action.payload,
			}
		case types.DELETE_HOLIDAY_BY_ID_FAIL:
			return {
				loadingDeleteHolidayById: false,
				errorDeleteHolidayById: action.payload,
			}
		case types.DELETE_HOLIDAY_BY_ID_RESET:
			return {}
		default:
			return state
	}
}
