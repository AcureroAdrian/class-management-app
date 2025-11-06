import { format } from 'date-fns'
// Usamos la API legacy para evitar el warning y error en SDK 54
import * as FileSystem from 'expo-file-system/legacy'
import * as Sharing from 'expo-sharing'
import { Alert } from 'react-native'
import { IDailyReport, IStudentReport, IClassReport } from '@/screens/control-panel/ReportScreen/helpers/report-screen-interfaces'

/**
 * Convierte un array de datos a formato CSV
 */
const arrayToCSV = (data: any[][]): string => {
	return data
		.map((row) =>
			row
				.map((cell) => {
					// Escapar comillas y envolver en comillas si contiene comas o saltos de línea
					const cellStr = String(cell || '')
					if (cellStr.includes(',') || cellStr.includes('\n') || cellStr.includes('"')) {
						return `"${cellStr.replace(/"/g, '""')}"`
					}
					return cellStr
				})
				.join(',')
		)
		.join('\n')
}

/**
 * Exporta el Daily Report a CSV
 */
export const exportDailyReportToCSV = async (reports: IDailyReport[]): Promise<void> => {
	try {
		// Preparar los datos del CSV
		const csvData: any[][] = [
			['Date', 'Class Name', 'Student Name', 'Student Last Name', 'Status', 'Trial', 'Day Only', 'Recovery', 'Observations']
		]

		reports.forEach((report) => {
			const reportDate = format(new Date(report._id), 'MM/dd/yyyy')
			
			report.karateClasses.forEach((karateClass) => {
				karateClass.attendance.forEach((student) => {
					csvData.push([
						reportDate,
						karateClass.karateClassName,
						student.student.name,
						student.student.lastName,
						student.attendanceStatus,
						student.student.isTrial ? 'Yes' : 'No',
						student.isDayOnly ? 'Yes' : 'No',
						student.isRecovery ? 'Yes' : 'No',
						student.observations || ''
					])
				})
			})
		})

		// Generar el CSV
		const csvContent = arrayToCSV(csvData)
		
		// Crear el nombre del archivo con fecha y hora
		const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm')
		const fileName = `daily-report-${timestamp}.csv`
		// @ts-ignore - API de expo-file-system
		const fileUri = (FileSystem.documentDirectory || '') + fileName

		// Guardar el archivo
		// @ts-ignore - API de expo-file-system
		await FileSystem.writeAsStringAsync(fileUri, csvContent, {
			encoding: 'utf8' as any,
		})

		// Verificar si el dispositivo permite compartir
		const isSharingAvailable = await Sharing.isAvailableAsync()
		
		if (isSharingAvailable) {
			await Sharing.shareAsync(fileUri, {
				mimeType: 'text/csv',
				dialogTitle: 'Guardar Daily Report',
				UTI: 'public.comma-separated-values-text',
			})
			
			// Mostrar mensaje de éxito
			Alert.alert(
				'¡Éxito!',
				`Reporte generado exitosamente: ${fileName}`,
				[{ text: 'OK' }]
			)
		} else {
			Alert.alert('Error', 'No se puede compartir archivos en este dispositivo')
		}
	} catch (error) {
		console.error('Error exporting daily report:', error)
		Alert.alert('Error', 'No se pudo generar el reporte. Por favor intenta de nuevo.')
	}
}

/**
 * Exporta el Student Report a CSV
 */
export const exportStudentReportToCSV = async (studentReports: IStudentReport[]): Promise<void> => {
	try {
		if (studentReports.length === 0) {
			Alert.alert('Error', 'No hay datos para exportar')
			return
		}

		// Obtener el nombre del estudiante
		const studentName = `${studentReports[0].student.name}-${studentReports[0].student.lastName}`
		
		// Preparar los datos del CSV
		const csvData: any[][] = [
			['Date', 'Class Name', 'Status', 'Trial', 'Day Only', 'Recovery', 'Overflow', 'Overflow Reason', 'Observations']
		]

		studentReports.forEach((report) => {
			const reportDate = format(
				new Date(report.date.year, report.date.month - 1, report.date.day),
				'MM/dd/yyyy'
			)
			
			csvData.push([
				reportDate,
				report.karateClassName,
				report.attendanceStatus,
				report.student.isTrial ? 'Yes' : 'No',
				report.isDayOnly ? 'Yes' : 'No',
				report.isRecovery ? 'Yes' : 'No',
				report.isOverflowAbsence ? 'Yes' : 'No',
				report.overflowReason || '',
				report.observations || ''
			])
		})

		// Generar el CSV
		const csvContent = arrayToCSV(csvData)
		
		// Crear el nombre del archivo con fecha y hora
		const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm')
		const fileName = `student-report-${studentName}-${timestamp}.csv`
		// @ts-ignore - API de expo-file-system
		const fileUri = (FileSystem.documentDirectory || '') + fileName

		// Guardar el archivo
		// @ts-ignore - API de expo-file-system
		await FileSystem.writeAsStringAsync(fileUri, csvContent, {
			encoding: 'utf8' as any,
		})

		// Verificar si el dispositivo permite compartir
		const isSharingAvailable = await Sharing.isAvailableAsync()
		
		if (isSharingAvailable) {
			await Sharing.shareAsync(fileUri, {
				mimeType: 'text/csv',
				dialogTitle: 'Guardar Student Report',
				UTI: 'public.comma-separated-values-text',
			})
			
			// Mostrar mensaje de éxito
			Alert.alert(
				'¡Éxito!',
				`Reporte generado exitosamente: ${fileName}`,
				[{ text: 'OK' }]
			)
		} else {
			Alert.alert('Error', 'No se puede compartir archivos en este dispositivo')
		}
	} catch (error) {
		console.error('Error exporting student report:', error)
		Alert.alert('Error', 'No se pudo generar el reporte. Por favor intenta de nuevo.')
	}
}

/**
 * Exporta el Class Report a CSV
 */
export const exportClassReportToCSV = async (classReports: IClassReport[]): Promise<void> => {
	try {
		// Preparar los datos del CSV
		const csvData: any[][] = [
			['Class Name', 'Date', 'Student Name', 'Student Last Name', 'Status', 'Trial', 'Day Only', 'Recovery', 'Observations']
		]

		classReports.forEach((classReport) => {
			classReport.attendances.forEach((attendance) => {
				const attendanceDate = format(
					new Date(attendance.date.year, attendance.date.month - 1, attendance.date.day),
					'MM/dd/yyyy'
				)
				
				attendance.attendance.forEach((student) => {
					csvData.push([
						classReport.karateClassName,
						attendanceDate,
						student.student.name,
						student.student.lastName,
						student.attendanceStatus,
						student.student.isTrial ? 'Yes' : 'No',
						student.isDayOnly ? 'Yes' : 'No',
						student.isRecovery ? 'Yes' : 'No',
						student.observations || ''
					])
				})
			})
		})

		// Generar el CSV
		const csvContent = arrayToCSV(csvData)
		
		// Crear el nombre del archivo con fecha y hora
		const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm')
		const fileName = `class-report-${timestamp}.csv`
		// @ts-ignore - API de expo-file-system
		const fileUri = (FileSystem.documentDirectory || '') + fileName

		// Guardar el archivo
		// @ts-ignore - API de expo-file-system
		await FileSystem.writeAsStringAsync(fileUri, csvContent, {
			encoding: 'utf8' as any,
		})

		// Verificar si el dispositivo permite compartir
		const isSharingAvailable = await Sharing.isAvailableAsync()
		
		if (isSharingAvailable) {
			await Sharing.shareAsync(fileUri, {
				mimeType: 'text/csv',
				dialogTitle: 'Guardar Class Report',
				UTI: 'public.comma-separated-values-text',
			})
			
			// Mostrar mensaje de éxito
			Alert.alert(
				'¡Éxito!',
				`Reporte generado exitosamente: ${fileName}`,
				[{ text: 'OK' }]
			)
		} else {
			Alert.alert('Error', 'No se puede compartir archivos en este dispositivo')
		}
	} catch (error) {
		console.error('Error exporting class report:', error)
		Alert.alert('Error', 'No se pudo generar el reporte. Por favor intenta de nuevo.')
	}
}

