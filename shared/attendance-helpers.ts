import { TAttendanceStatus } from './common-types'

// Determine macro status (present or absent)
export function getMacroStatus(status: TAttendanceStatus): 'present' | 'absent' {
	const presentStates: TAttendanceStatus[] = ['present', 'good-behavior', 'bad-behavior', 'late']
	return presentStates.includes(status) ? 'present' : 'absent'
}

// Get color by status
export function getStatusColor(status: TAttendanceStatus): string {
	switch (status) {
		case 'present':
			return 'green'
		case 'absent':
			return 'red'
		case 'late':
			return 'blue'
		case 'good-behavior':
			return '#FFA500' // orange/yellow
		case 'bad-behavior':
			return '#8B4513' // brown
		case 'sick':
			return 'purple'
		default:
			return 'gray'
	}
}

// Get icon by status (for AntDesign)
export function getStatusIcon(status: TAttendanceStatus): string {
	switch (status) {
		case 'present':
			return 'check'
		case 'absent':
			return 'close'
		case 'late':
			return 'exclamation'
		case 'good-behavior':
			return 'smileo'
		case 'bad-behavior':
			return 'frown'
		case 'sick':
			return 'plus-square'
		default:
			return 'question'
	}
}

// Get icon info (library + name)
export function getStatusIconInfo(status: TAttendanceStatus): { library: 'AntDesign' | 'FontAwesome'; name: string } {
	switch (status) {
		case 'present':
			return { library: 'AntDesign', name: 'check' }
		case 'absent':
			return { library: 'AntDesign', name: 'close' }
		case 'late':
			return { library: 'AntDesign', name: 'exclamation' }
		case 'good-behavior':
			return { library: 'AntDesign', name: 'smileo' }
		case 'bad-behavior':
			return { library: 'AntDesign', name: 'frown' }
		case 'sick':
			return { library: 'FontAwesome', name: 'plus-square' }
		default:
			return { library: 'AntDesign', name: 'question' }
	}
}

// Get descriptive text by status
export function getStatusText(status: TAttendanceStatus): string {
	switch (status) {
		case 'present':
			return 'Attended'
		case 'absent':
			return 'Did Not Attend'
		case 'late':
			return 'Late'
		case 'good-behavior':
			return 'Good Behavior'
		case 'bad-behavior':
			return 'Bad Behavior'
		case 'sick':
			return 'Sick'
		default:
			return 'Unknown'
	}
}

// Check if a student is present (macro status)
export function isStudentPresent(status: TAttendanceStatus): boolean {
	return getMacroStatus(status) === 'present'
}

// Toggle between basic statuses (for main toggle)
export function toggleBasicAttendance(status: TAttendanceStatus): TAttendanceStatus {
	return getMacroStatus(status) === 'present' ? 'absent' : 'present'
} 