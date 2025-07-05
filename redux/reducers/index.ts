import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	bookingRecoveryClassByIdReducer,
	deleteKarateClassByIdReducer,
	getKarateClassByIdReducer,
	getKarateClassesByAdminReducer,
	getKarateClassesByStudentIdReducer,
	getKarateClassesForStudentReducer,
	getKarateClassesToAdminAttendanceReducer,
	registerKarateClassReducer,
	updateKarateClassByIdReducer,
} from './karateClassReducers'
import {
	adjustRecoveryCreditsReducer,
	deleteStudentUserByIdReducer,
	getStudentUserByIdReducer,
	getStudentUsersReducer,
	registerStudentsReducer,
	registerTrialStudentReducer,
	updateStudentUserByIdReducer,
	userLoginReducer,
} from './userReducers'
import {
	addStudentToAttendanceReducer,
	getClassReportByClassIdForAdminReducer,
	getDailyReportForAdminReducer,
	getStudentAttendanceByDayReducer,
	getStudentReportForAdminReducer,
	registerStudentAttendanceReducer,
	updateStudentAttendanceByIdReducer,
} from './studentAttendanceReducers'
import { deleteRecoveryClassByIdReducer } from './recoveryClassReducers'
import { deleteHolidayByIdReducer, registerHolidayByDateReducer } from './holidayReducers'
import { resetAttendanceSystemReducer } from './systemReducers'

const loginPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['userInfo'],
}

export default combineReducers({
	adjustRecoveryCredits: adjustRecoveryCreditsReducer,
	addStudentToAttendance: addStudentToAttendanceReducer,
	bookingRecoveryClassById: bookingRecoveryClassByIdReducer,
	deleteHolidayById: deleteHolidayByIdReducer,
	deleteKarateClassById: deleteKarateClassByIdReducer,
	deleteRecoveryClassById: deleteRecoveryClassByIdReducer,
	deleteStudentUserById: deleteStudentUserByIdReducer,
	getClassReportByClassIdForAdmin: getClassReportByClassIdForAdminReducer,
	getDailyReportForAdmin: getDailyReportForAdminReducer,
	getKarateClassById: getKarateClassByIdReducer,
	getKarateClassesByAdmin: getKarateClassesByAdminReducer,
	getKarateClassesByStudentId: getKarateClassesByStudentIdReducer,
	getKarateClassesForStudent: getKarateClassesForStudentReducer,
	getKarateClassesToAdminAttendance: getKarateClassesToAdminAttendanceReducer,
	getStudentAttendanceByDay: getStudentAttendanceByDayReducer,
	getStudentReportForAdmin: getStudentReportForAdminReducer,
	getStudentUserById: getStudentUserByIdReducer,
	getStudentUsers: getStudentUsersReducer,
	registerHolidayByDate: registerHolidayByDateReducer,
	registerKarateClass: registerKarateClassReducer,
	registerStudentAttendance: registerStudentAttendanceReducer,
	registerStudents: registerStudentsReducer,
	registerTrialStudent: registerTrialStudentReducer,
	resetAttendanceSystem: resetAttendanceSystemReducer,
	updateKarateClassById: updateKarateClassByIdReducer,
	updateStudentAttendanceById: updateStudentAttendanceByIdReducer,
	updateStudentUserById: updateStudentUserByIdReducer,
	userLogin: persistReducer(loginPersistConfig, userLoginReducer),
})
