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
import {
	getClassReportByClassIdForAdminReducer,
	getDailyReportForAdminReducer,
	getStudentAttendanceByDayReducer,
	registerStudentAttendanceReducer,
	updateStudentAttendanceByIdReducer,
} from './studentAttendanceReducers'

const loginPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['userInfo'],
}

export default combineReducers({
	getClassReportByClassIdForAdmin: getClassReportByClassIdForAdminReducer,
	getDailyReportForAdmin: getDailyReportForAdminReducer,
	getKarateClassById: getKarateClassByIdReducer,
	getKarateClassesByAdmin: getKarateClassesByAdminReducer,
	getKarateClassesToAdminAttendance: getKarateClassesToAdminAttendanceReducer,
	getStudentAttendanceByDay: getStudentAttendanceByDayReducer,
	getStudentUserById: getStudentUserByIdReducer,
	getStudentUsers: getStudentUsersReducer,
	registerKarateClass: registerKarateClassReducer,
	registerStudentAttendance: registerStudentAttendanceReducer,
	registerStudents: registerStudentsReducer,
	updateKarateClassById: updateKarateClassByIdReducer,
	updateStudentAttendanceById: updateStudentAttendanceByIdReducer,
	updateStudentUserById: updateStudentUserByIdReducer,
	userLogin: persistReducer(loginPersistConfig, userLoginReducer),
})
