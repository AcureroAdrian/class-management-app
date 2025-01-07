import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getKarateClassesByAdminReducer, registerKarateClassReducer } from './karateClassReducers'
import { getStudentUsersReducer, userLoginReducer } from './userReducers'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	// whitelist: ['userLogin'],
}

export default combineReducers({
	getKarateClassesByAdmin: getKarateClassesByAdminReducer,
	getStudentUsers: getStudentUsersReducer,
	registerKarateClass: registerKarateClassReducer,
	userLogin: persistReducer(persistConfig, userLoginReducer),
})
