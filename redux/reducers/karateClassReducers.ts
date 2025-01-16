import { Reducer } from 'redux'
import * as types from '../constants/karateClassConstants'

interface IGetKarateClassesByAdminState {
	loadingKarateClassesByAdmin?: boolean
	successKarateClassesByAdmin?: boolean
	karateClassesByAdminList?: any[]
	errorKarateClassesByAdmin?: string
}
interface IRegisterKarateClassState {
	loadingRegisterKarateClass?: boolean
	successRegisterKarateClass?: boolean
	karateClassRegistered?: any
	errorRegisterKarateClass?: string
}
interface IGetKarateClassByIdState {
	loadingGetKarateClassById?: boolean
	successGetKarateClassById?: boolean
	karateClassById?: any
	errorGetKarateClassById?: string
}
interface IUpdateKarateClassByIdState {
	loadingUpdateKarateClassById?: boolean
	successUpdateKarateClassById?: boolean
	karateClassByIdUpdated?: any
	errorUpdateKarateClassById?: string
}

type TGetKarateClassesByAdminReducer = Reducer<IGetKarateClassesByAdminState, any>
type TRegisterKarateClassReducer = Reducer<IRegisterKarateClassState, any>
type TGetKarateClassByIdReducer = Reducer<IGetKarateClassByIdState, any>
type TUpdateKarateClassByIdReducer = Reducer<IUpdateKarateClassByIdState, any>

export const getKarateClassesByAdminReducer: TGetKarateClassesByAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_KARATE_CLASS_BY_ADMIN_REQUEST:
			return { loadingKarateClassesByAdmin: true }
		case types.GET_KARATE_CLASS_BY_ADMIN_SUCCESS:
			return {
				loadingKarateClassesByAdmin: false,
				successKarateClassesByAdmin: true,
				karateClassesByAdminList: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ADMIN_FAIL:
			return {
				loadingKarateClassesByAdmin: false,
				errorKarateClassesByAdmin: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ADMIN_RESET:
			return {}
		default:
			return state
	}
}

export const registerKarateClassReducer: TRegisterKarateClassReducer = (state = {}, action) => {
	switch (action.type) {
		case types.REGISTER_KARATE_CLASS_REQUEST:
			return { loadingRegisterKarateClass: true }
		case types.REGISTER_KARATE_CLASS_SUCCESS:
			return {
				loadingRegisterKarateClass: false,
				successRegisterKarateClass: true,
				karateClassRegistered: action.payload,
			}
		case types.REGISTER_KARATE_CLASS_FAIL:
			return {
				loadingRegisterKarateClass: false,
				errorRegisterKarateClass: action.payload,
			}
		case types.REGISTER_KARATE_CLASS_RESET:
			return {}
		default:
			return state
	}
}

export const getKarateClassByIdReducer: TGetKarateClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.GET_KARATE_CLASS_BY_ID_REQUEST:
			return { loadingGetKarateClassById: true }
		case types.GET_KARATE_CLASS_BY_ID_SUCCESS:
			return {
				loadingGetKarateClassById: false,
				successGetKarateClassById: true,
				karateClassById: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ID_FAIL:
			return {
				loadingGetKarateClassById: false,
				errorGetKarateClassById: action.payload,
			}
		case types.GET_KARATE_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}

export const updateKarateClassByIdReducer: TUpdateKarateClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.UPDATE_KARATE_CLASS_BY_ID_REQUEST:
			return { loadingUpdateKarateClassById: true }
		case types.UPDATE_KARATE_CLASS_BY_ID_SUCCESS:
			return {
				loadingUpdateKarateClassById: false,
				successUpdateKarateClassById: true,
				karateClassByIdUpdated: action.payload,
			}
		case types.UPDATE_KARATE_CLASS_BY_ID_FAIL:
			return {
				loadingUpdateKarateClassById: false,
				errorUpdateKarateClassById: action.payload,
			}
		case types.UPDATE_KARATE_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}
