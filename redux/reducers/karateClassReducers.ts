import { Reducer } from 'redux'
import * as types from '../constants/karateClassConstants'

interface IKarateClassesByAdminState {
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

type TGetKarateClassesByAdminReducer = Reducer<IKarateClassesByAdminState, any>
type TRegisterKarateClassReducer = Reducer<IRegisterKarateClassState, any>

export const getKarateClassesByAdminReducer: TGetKarateClassesByAdminReducer = (
	state: IKarateClassesByAdminState = {},
	action,
) => {
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

export const registerKarateClassReducer: TRegisterKarateClassReducer = (
	state: IRegisterKarateClassState = {},
	action,
) => {
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
