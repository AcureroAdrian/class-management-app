import { TAttendanceStatus } from './common-types'

// Determinar macro-estado (presente o ausente)
export function getMacroStatus(status: TAttendanceStatus): 'present' | 'absent' {
	const presentStates: TAttendanceStatus[] = ['present', 'good-behavior', 'bad-behavior', 'late']
	return presentStates.includes(status) ? 'present' : 'absent'
}

// Obtener color por estado
export function getStatusColor(status: TAttendanceStatus): string {
	switch (status) {
		case 'present':
			return 'green'
		case 'absent':
			return 'red'
		case 'late':
			return 'blue'
		case 'good-behavior':
			return '#FFA500' // naranja/amarillo
		case 'bad-behavior':
			return '#8B4513' // marrón
		case 'sick':
			return 'purple'
		default:
			return 'gray'
	}
}

// Obtener icono por estado (para AntDesign)
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

// Obtener información del icono (librería + nombre)
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

// Obtener texto descriptivo por estado
export function getStatusText(status: TAttendanceStatus): string {
	switch (status) {
		case 'present':
			return 'Asistió'
		case 'absent':
			return 'No Asistió'
		case 'late':
			return 'Tardanza'
		case 'good-behavior':
			return 'Buen Comportamiento'
		case 'bad-behavior':
			return 'Mal Comportamiento'
		case 'sick':
			return 'Enfermo'
		default:
			return 'Desconocido'
	}
}

// Verificar si un estudiante está presente (macro-estado)
export function isStudentPresent(status: TAttendanceStatus): boolean {
	return getMacroStatus(status) === 'present'
}

// Alternar entre los estados básicos (para el toggle principal)
export function toggleBasicAttendance(status: TAttendanceStatus): TAttendanceStatus {
	return getMacroStatus(status) === 'present' ? 'absent' : 'present'
} 