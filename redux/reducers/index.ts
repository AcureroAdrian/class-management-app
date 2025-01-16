import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	getKarateClassByIdReducer,
	getKarateClassesByAdminReducer,
	registerKarateClassReducer,
	updateKarateClassByIdReducer,
} from './karateClassReducers'
import { getStudentUsersReducer, registerStudentsReducer, userLoginReducer } from './userReducers'

const loginPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['userInfo'],
}

export default combineReducers({
	getKarateClassById: getKarateClassByIdReducer,
	getKarateClassesByAdmin: getKarateClassesByAdminReducer,
	getStudentUsers: getStudentUsersReducer,
	registerKarateClass: registerKarateClassReducer,
	registerStudents: registerStudentsReducer,
	updateKarateClassById: updateKarateClassByIdReducer,
	userLogin: persistReducer(loginPersistConfig, userLoginReducer),
})
