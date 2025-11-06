import { applyMiddleware, createStore } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import rootReducer from './reducers'
import {
	userLoginReducer,
	getStudentUsersReducer,
	registerStudentsReducer,
	registerTrialStudentReducer,
	getStudentUserByIdReducer,
	updateStudentUserByIdReducer,
	deleteStudentUserByIdReducer,
} from './reducers/userReducers'
import {
	getKarateClassesByAdminReducer,
	getKarateClassesByStudentIdReducer,
	getKarateClassesForStudentReducer,
	getKarateClassesToAdminAttendanceReducer,
} from './reducers/karateClassReducers'
import {
	getStudentAttendanceByDayReducer,
	registerStudentAttendanceReducer,
	updateStudentAttendanceByIdReducer,
	addStudentToAttendanceReducer,
	getDailyReportForAdminReducer,
	getClassReportByClassIdForAdminReducer,
	getStudentReportForAdminReducer,
} from './reducers/studentAttendanceReducers'
import { registerHolidayByDateReducer, deleteHolidayByIdReducer } from './reducers/holidayReducers'

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStore = typeof store

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
