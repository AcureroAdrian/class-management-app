import { Dispatch, SetStateAction } from 'react'
import { TextInputProps } from 'react-native'

export interface ITextInputFormProps extends TextInputProps {
	label: string
	icon: string
	isPassword?: boolean
	hidePassword?: boolean
	setHidePassword?: Dispatch<SetStateAction<boolean>>
	isDate?: boolean
	showDatePicker?: () => void
}
