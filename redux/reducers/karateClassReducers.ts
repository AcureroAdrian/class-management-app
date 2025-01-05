import { Reducer } from 'redux'
import * as types from '../constants/karateClassConstants'

interface IKarateClassesByAdminState {
	loadingKarateClassesByAdmin?: boolean
	successKarateClassesByAdmin?: boolean
	karateClassesByAdminList?: any[]
	errorKarateClassesByAdmin?: string
}

type TGetKarateClassesByAdminReducer = Reducer<IKarateClassesByAdminState, any>

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
