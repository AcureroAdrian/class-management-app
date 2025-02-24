import { DateData } from 'react-native-calendars'

export interface CalendarComponentProps {
	role: 'admin' | 'teacher' | 'student'
	currentDate: string
	handleDayChange: (date: string) => void
	handleChangeMonth: (date: DateData) => void
	markedDates: Record<string, any>
	loadingGetKarateClassesToAdminAttendance?: boolean
	loadingStudentAttendanceByDay?: boolean
	generatingMarkDates: boolean
	errorStudentAttendanceByDay?: string
	items: { id: number; [key: string]: any }[]
	handleOpenAttendance: (attendance: any) => void
	handleAddHoliday: () => void
	isHoliday: boolean
	loadingHoliday?: boolean
	errorHoliday?: string
	disableHoliday?: boolean
}
