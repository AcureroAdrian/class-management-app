import { IFullStudent } from './students-interfaces'

const getStudentDataToUpdate = (oldStudent: IFullStudent, newStudent: IFullStudent) => {
	const dataToUpdate: { [key: string]: any } = {}

	if (oldStudent.userId?.trim()?.toUpperCase() !== newStudent.userId?.trim()?.toUpperCase()) {
		dataToUpdate.userId = newStudent.userId
	}

	if (oldStudent.name?.trim() !== newStudent.name?.toLowerCase()?.trim()) {
		dataToUpdate.name = newStudent.name
	}

	if (oldStudent.lastName?.trim() !== newStudent.lastName?.toLowerCase()?.trim()) {
		dataToUpdate.lastName = newStudent.lastName
	}

	if (
		(oldStudent.dateOfBirth?.day || '') !== (newStudent?.dateOfBirth?.day || '') ||
		(oldStudent.dateOfBirth?.month || '') !== (newStudent?.dateOfBirth?.month || '') ||
		(oldStudent.dateOfBirth?.year || '') !== (newStudent?.dateOfBirth?.year || '')
	) {
		dataToUpdate.dateOfBirth = newStudent.dateOfBirth
	}

	if ((oldStudent.email || '')?.trim() !== newStudent.email?.trim()) {
		dataToUpdate.email = newStudent.email
	}

	if ((oldStudent.phone || '')?.trim() !== newStudent.phone?.trim()) {
		dataToUpdate.phone = newStudent.phone
	}

	if ((oldStudent.notes || '')?.trim() !== newStudent.notes?.trim()) {
		dataToUpdate.notes = newStudent.notes
	}

	if ((oldStudent.level || '')?.trim() !== (newStudent.level || '')?.trim()) {
		dataToUpdate.level = newStudent.level
	}

	if (Boolean(oldStudent.isTeacher) !== Boolean(newStudent.isTeacher)) {
		dataToUpdate.isTeacher = Boolean(newStudent.isTeacher)
	}

	if (Boolean(oldStudent.isAdmin) !== Boolean(newStudent.isAdmin)) {
		dataToUpdate.isAdmin = Boolean(newStudent.isAdmin)
	}

	if (Boolean(oldStudent.isTrial) !== Boolean(newStudent.isTrial)) {
		dataToUpdate.isTrial = Boolean(newStudent.isTrial)
	}

	if (oldStudent.enrollmentPlan?.toLowerCase().trim() !== newStudent.enrollmentPlan?.toLowerCase().trim()) {
		dataToUpdate.enrollmentPlan = newStudent.enrollmentPlan
	}

	return { needUpdate: Boolean(Object.keys(dataToUpdate).length), dataToUpdate }
}

export default getStudentDataToUpdate
