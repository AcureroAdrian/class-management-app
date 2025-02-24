import { Reducer } from 'redux'
import * as types from '../constants/recoveryClassConstants'

interface IDeleteRecoveryClassByIdState {
	loadingDeleteRecoveryClassById?: boolean
	successDeleteRecoveryClassById?: boolean
	recoveryClassDeleted?: { recoveryClassId: string }
	errorDeleteRecoveryClassById?: string
}

type TDeleteRecoveryClassByIdReducer = Reducer<IDeleteRecoveryClassByIdState, any>

export const deleteRecoveryClassByIdReducer: TDeleteRecoveryClassByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case types.DELETE_RECOVERY_CLASS_BY_ID_REQUEST:
			return { loadingDeleteRecoveryClassById: true }
		case types.DELETE_RECOVERY_CLASS_BY_ID_SUCCESS:
			return {
				loadingDeleteRecoveryClassById: false,
				successDeleteRecoveryClassById: true,
				recoveryClassDeleted: action.payload,
			}
		case types.DELETE_RECOVERY_CLASS_BY_ID_FAIL:
			return {
				loadingDeleteRecoveryClassById: false,
				errorDeleteRecoveryClassById: action.payload,
			}
		case types.DELETE_RECOVERY_CLASS_BY_ID_RESET:
			return {}
		default:
			return state
	}
}
