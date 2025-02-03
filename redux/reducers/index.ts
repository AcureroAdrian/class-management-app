import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	getKarateClassByIdReducer,
	getKarateClassesByAdminReducer,
	getKarateClassesToAdminAttendanceReducer,
	registerKarateClassReducer,
	updateKarateClassByIdReducer,
} from './karateClassReducers'
import {
	getStudentUserByIdReducer,
	getStudentUsersReducer,
	registerStudentsReducer,
	updateStudentUserByIdReducer,
	userLoginReducer,
} from './userReducers'
import { getStudentAttendanceByDayReducer } from './studentAttendanceReducers'

const loginPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['userInfo'],
}

export default combineReducers({
	getKarateClassById: getKarateClassByIdReducer,
	getKarateClassesByAdmin: getKarateClassesByAdminReducer,
	getKarateClassesToAdminAttendance: getKarateClassesToAdminAttendanceReducer,
	getStudentAttendanceByDay: getStudentAttendanceByDayReducer,
	getStudentUserById: getStudentUserByIdReducer,
	getStudentUsers: getStudentUsersReducer,
	registerKarateClass: registerKarateClassReducer,
	registerStudents: registerStudentsReducer,
	updateKarateClassById: updateKarateClassByIdReducer,
	updateStudentUserById: updateStudentUserByIdReducer,
	userLogin: persistReducer(loginPersistConfig, userLoginReducer),
})
