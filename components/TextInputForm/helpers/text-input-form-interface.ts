import { ComponentProps } from 'react'
import { Octicons } from '@expo/vector-icons'
import { Dispatch, SetStateAction } from 'react'
import { TextInputProps } from 'react-native'

export interface ITextInputFormProps extends TextInputProps {
	label: string
	icon: ComponentProps<typeof Octicons>['name']
	isPassword?: boolean
	hidePassword?: boolean
	setHidePassword?: Dispatch<SetStateAction<boolean>>
	isDate?: boolean
	showDatePicker?: () => void
}
