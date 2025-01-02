import { isDate } from 'date-fns'
import { validEmail } from '../../../../shared/validators/input-validators'

type TLevel = 'novice' | 'beginner' | 'intermediate' | 'elite'

export interface ISignUpValues {
	name: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	dateOfBirth: Date | null
	level: TLevel
}

const validateSignupFields = (values: ISignUpValues) => {
	const result = {
		error: true,
		message: 'Please fill all the fields',
	}

	if (!values) return result

	const { name, lastName, email, dateOfBirth, level, password, confirmPassword } = values

	if (!name || name?.length < 3) {
		result.message = 'Please enter a valid name'
		return result
	}
	if (!lastName || lastName?.length < 3) {
		result.message = 'Please enter a valid last name'
		return result
	}
	if (!email || !validEmail(email)) {
		result.message = 'Please enter a valid email'
		return result
	}
	if (!dateOfBirth || !isDate(new Date(dateOfBirth))) {
		result.message = 'Please enter a valid date of birth'
		return result
	}
	if (!level || !['novice', 'beginner', 'intermediate', 'elite'].includes(level)) {
		result.message = 'Please select a correct student level'
		return result
	}
	if (!password || password?.length < 6) {
		result.message = 'Please enter a valid password'
		return result
	}
	if (password !== confirmPassword) {
		result.message = 'Password and confirm password does not match'
		return result
	}

	result.error = false
	return result
}

export default validateSignupFields
