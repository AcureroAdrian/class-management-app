interface IKarateClass {
	name: string
	levels: string[]
	weekDays: string[]
	startTime: { hour: number; minute: number }
	students: string[]
	description: string
}

const compareArrays = (array1: string[], array2: string[]) => {
	if (array1.length !== array2.length) {
		return false
	}
	array1.sort()
	array2.sort()

	for (let i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) {
			return false
		}
	}
	return true
}

const getDataToUpdate = (oldData: IKarateClass, newData: IKarateClass) => {
	const dataToUpdate: { [key: string]: any } = {}

	if (oldData.name !== newData.name) {
		dataToUpdate.name = newData.name
	}
	if (oldData.description !== newData.description) {
		dataToUpdate.description = newData.description
	}

	if (!compareArrays(oldData.weekDays, newData.weekDays)) {
		dataToUpdate.weekDays = newData.weekDays
	}

	if (!compareArrays(oldData.levels, newData.levels)) {
		dataToUpdate.levels = newData.levels
	}

	if (oldData.startTime.hour !== newData.startTime.hour || oldData.startTime.minute !== newData.startTime.minute) {
		dataToUpdate.startTime = newData.startTime
	}

	if (!compareArrays(oldData.students, newData.students)) {
		dataToUpdate.students = newData.students
	}

	return { needUpdate: Boolean(Object.keys(dataToUpdate).length), dataToUpdate }
}

export default getDataToUpdate
