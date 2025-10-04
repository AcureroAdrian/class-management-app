import { Reducer } from 'redux'
import * as types from '../constants/holidayConstants'

export interface IHoliday {
	_id: string
	date: {
		year: number
		month: number
		day: number
	}
	user: string
	status: string
}

export interface IRegisterHolidayByDateState {
	loadingRegisterHolidayByDate: boolean
	successRegisterHolidayByDate: boolean
	holidayRegistered: IHoliday
	errorRegisterHolidayByDate: string | null
}

export interface IDeleteHolidayByIdState {
	loadingDeleteHolidayById: boolean
	successDeleteHolidayById: boolean
	holidayDeleted: { holidayId: string } | null
	errorDeleteHolidayById: string | null
}

export interface IGetHolidaysState {
	loadingGetHolidays: boolean
	successGetHolidays: boolean
	holidays: IHoliday[]
	errorGetHolidays: string | null
}

const registerHolidayByDateInitialState: IRegisterHolidayByDateState = {
	loadingRegisterHolidayByDate: false,
	successRegisterHolidayByDate: false,
	holidayRegistered: {} as IHoliday,
	errorRegisterHolidayByDate: null,
}

const deleteHolidayByIdInitialState: IDeleteHolidayByIdState = {
	loadingDeleteHolidayById: false,
	successDeleteHolidayById: false,
	holidayDeleted: null,
	errorDeleteHolidayById: null,
}

const getHolidaysInitialState: IGetHolidaysState = {
	loadingGetHolidays: false,
	successGetHolidays: false,
	holidays: [],
	errorGetHolidays: null,
}

type TRegisterHolidayByDateReducer = Reducer<IRegisterHolidayByDateState, any>
type TDeleteHolidayByIdReducer = Reducer<IDeleteHolidayByIdState, any>

export const registerHolidayByDateReducer = (
	state = registerHolidayByDateInitialState,
	action: { type: string; payload: any },
) => {
	switch (action.type) {
		case types.REGISTER_HOLIDAY_BY_DATE_REQUEST:
			return { ...state, loadingRegisterHolidayByDate: true, successRegisterHolidayByDate: false }
		case types.REGISTER_HOLIDAY_BY_DATE_SUCCESS:
			return {
				...state,
				loadingRegisterHolidayByDate: false,
				successRegisterHolidayByDate: true,
				holidayRegistered: action.payload,
			}
		case types.REGISTER_HOLIDAY_BY_DATE_FAIL:
			return { ...state, loadingRegisterHolidayByDate: false, errorRegisterHolidayByDate: action.payload }
		case types.REGISTER_HOLIDAY_BY_DATE_RESET:
			return { ...registerHolidayByDateInitialState }
		default:
			return state
	}
}

export const deleteHolidayByIdReducer = (
	state = deleteHolidayByIdInitialState,
	action: { type: string; payload: any },
) => {
	switch (action.type) {
		case types.DELETE_HOLIDAY_BY_ID_REQUEST:
			return { ...state, loadingDeleteHolidayById: true, successDeleteHolidayById: false }
		case types.DELETE_HOLIDAY_BY_ID_SUCCESS:
			return {
				...state,
				loadingDeleteHolidayById: false,
				successDeleteHolidayById: true,
				holidayDeleted: action.payload,
			}
		case types.DELETE_HOLIDAY_BY_ID_FAIL:
			return { ...state, loadingDeleteHolidayById: false, errorDeleteHolidayById: action.payload }
		case types.DELETE_HOLIDAY_BY_ID_RESET:
			return { ...deleteHolidayByIdInitialState }
		default:
			return state
	}
}

export const getHolidaysReducer = (state = getHolidaysInitialState, action: { type: string; payload: any }) => {
	switch (action.type) {
		case types.GET_HOLIDAYS_REQUEST:
			return { ...state, loadingGetHolidays: true, successGetHolidays: false }
		case types.GET_HOLIDAYS_SUCCESS:
			return {
				...state,
				loadingGetHolidays: false,
				successGetHolidays: true,
				holidays: action.payload,
			}
		case types.GET_HOLIDAYS_FAIL:
			return { ...state, loadingGetHolidays: false, errorGetHolidays: action.payload }
		case types.GET_HOLIDAYS_RESET:
			return { ...getHolidaysInitialState }
		default:
			return state
	}
}
