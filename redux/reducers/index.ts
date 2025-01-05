import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getKarateClassesByAdminReducer } from './karateClassReducers'
import { getStudentUsersReducer, userLoginReducer } from './userReducers'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	// whitelist: ['userLogin'],
}

export default combineReducers({
	userLogin: persistReducer(persistConfig, userLoginReducer),
	getKarateClassesByAdmin: getKarateClassesByAdminReducer,
	getStudentUsers: getStudentUsersReducer,
})
