import React, { useState } from 'react'
import { Text, View } from 'react-native'
// import { StatusBar } from 'expo-status-bar'
// import { Formik, FormikHelpers } from 'formik'
// import { format } from 'date-fns'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import {
// 	StyledContainer,
// 	InnerContainer,
// 	PageTitle,
// 	SubTitle,
// 	StyledFormArea,
// 	Colors,
// 	StyledButton,
// 	ButtonText,
// 	MsgBox,
// 	CustomDropdown,
// 	StyledInputLabel,
// } from '@/components/styles'
// import TextInputForm from '@/components/TextInputForm/TextInputForm'
// import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
// import validateSignupFields, { ISignUpValues } from './helpers/validate-signup-fields'
// import colors from '@/theme/colors'

const Signup = () => {
	// const [message, setMessage] = useState<string | null>(null)
	// const [messageType, setMessageType] = useState<string | null>(null)
	// const [hidePassword, setHidePassword] = useState<boolean>(true)
	// const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true)
	// const [show, setShow] = useState<boolean>(false)
	// const [date, setDate] = useState(new Date(2000, 0, 1))
	// const [dob, setDob] = useState<Date | null>(null)

	// const onChange = (event, selectedDate) => {
	// 	const currentDate = selectedDate || date
	// 	setShow(false)
	// 	setDate(currentDate)
	// 	setDob(currentDate)
	// }
	// const showDatePicker = () => {
	// 	setShow(true)
	// }
	// const handleMessage = (message: string | null, type: string = 'FAILED') => {
	// 	setMessage(message)
	// 	setMessageType(type)
	// }
	// const handleSubmit = (values: ISignUpValues, { setSubmitting }: FormikHelpers<ISignUpValues>) => {
	// 	handleMessage(null)
	// 	const credentials = { ...values, dateOfBirth: dob }
	// 	const { error, message } = validateSignupFields(credentials)

	// 	if (error) {
	// 		handleMessage(message)
	// 		return
	// 	}

	// 	const { name, lastName, email, dateOfBirth, level, password } = credentials

	// 	// onRegister!(name, lastName, email, password, dateOfBirth, level)
	// 	// 	.then((response) => {
	// 	// 		if (response.error) {
	// 	// 			handleMessage(response.message)
	// 	// 		}
	// 	// 	})
	// 	// 	.catch((error) => {
	// 	// 		const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
	// 	// 		handleMessage(errorMessage || 'An error occurred. Please try again.')
	// 	// 	})
	// 	// 	.finally(() => {
	// 	// 		setSubmitting(false)
	// 	// 	})
	// }
	return (
		<View>
			<Text>Algo</Text>
		</View>
		// <KeyboardAvoidingWrapper>
		// 	<StyledContainer>
		// 		<StatusBar style='auto' />
		// 		<InnerContainer>
		// 			<PageTitle>Karate Academy</PageTitle>
		// 			<SubTitle>Account Signup</SubTitle>

		// 			{show && (
		// 				<DateTimePicker
		// 					testID='dateTimePicker'
		// 					value={date}
		// 					mode='date'
		// 					is24Hour={true}
		// 					display='default'
		// 					onChange={onChange}
		// 				/>
		// 			)}

		// 			<Formik
		// 				initialValues={{
		// 					name: '',
		// 					lastName: '',
		// 					email: '',
		// 					level: '',
		// 					password: '',
		// 					confirmPassword: '',
		// 				}}
		// 				onSubmit={handleSubmit}
		// 			>
		// 				{({ handleChange, handleBlur, handleSubmit, values }) => (
		// 					<StyledFormArea>
		// 						<TextInputForm
		// 							label='Name'
		// 							icon='person'
		// 							placeholder='Richard'
		// 							placeholderTextColor={darkLight}
		// 							onChangeText={handleChange('name')}
		// 							onBlur={handleBlur('name')}
		// 							value={values.name}
		// 						/>
		// 						<TextInputForm
		// 							label='Last Name'
		// 							icon='person'
		// 							placeholder='Barnes'
		// 							placeholderTextColor={darkLight}
		// 							onChangeText={handleChange('lastName')}
		// 							onBlur={handleBlur('lastName')}
		// 							value={values.lastName}
		// 						/>
		// 						<TextInputForm
		// 							label='Email Address'
		// 							icon='mail'
		// 							placeholder='andyyj@gmail.com'
		// 							placeholderTextColor={darkLight}
		// 							onChangeText={handleChange('email')}
		// 							onBlur={handleBlur('email')}
		// 							value={values.email}
		// 							keyboardType='email-address'
		// 						/>
		// 						<TextInputForm
		// 							label='Date of Birth'
		// 							icon='calendar'
		// 							placeholder='YYY - MM - DD'
		// 							placeholderTextColor={darkLight}
		// 							onChangeText={handleChange('dateOfBirth')}
		// 							onBlur={handleBlur('dateOfBirth')}
		// 							value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
		// 							isDate={true}
		// 							editable={false}
		// 							showDatePicker={showDatePicker}
		// 						/>
		// 						<View>
		// 							<StyledInputLabel>Student Level</StyledInputLabel>
		// 							<CustomDropdown
		// 								data={[
		// 									{ label: 'Novice', value: 'novice' },
		// 									{ label: 'Beginner', value: 'beginner' },
		// 									{ label: 'Intermediate', value: 'intermediate' },
		// 									{ label: 'Elite', value: 'elite' },
		// 								]}
		// 								maxHeight={300}
		// 								labelField='label'
		// 								valueField='value'
		// 								placeholder='Select level'
		// 								value={values.level}
		// 								onChange={(item: unknown) => {
		// 									handleChange('level')(item?.value)
		// 								}}
		// 							/>
		// 						</View>
		// 						<TextInputForm
		// 							label='Password'
		// 							icon='lock'
		// 							placeholder='********'
		// 							placeholderTextColor={darkLight}
		// 							onChangeText={handleChange('password')}
		// 							onBlur={handleBlur('password')}
		// 							value={values.password}
		// 							secureTextEntry={hidePassword}
		// 							isPassword={true}
		// 							hidePassword={hidePassword}
		// 							setHidePassword={setHidePassword}
		// 						/>
		// 						<TextInputForm
		// 							label='Confirm Password'
		// 							icon='lock'
		// 							placeholder='********'
		// 							placeholderTextColor={darkLight}
		// 							onChangeText={handleChange('confirmPassword')}
		// 							onBlur={handleBlur('confirmPassword')}
		// 							value={values.confirmPassword}
		// 							secureTextEntry={hideConfirmPassword}
		// 							isPassword={true}
		// 							hidePassword={hideConfirmPassword}
		// 							setHidePassword={setHideConfirmPassword}
		// 						/>
		// 						<MsgBox type={messageType}>{message}</MsgBox>
		// 						<StyledButton onPress={handleSubmit}>
		// 							<ButtonText>Singup</ButtonText>
		// 						</StyledButton>
		// 					</StyledFormArea>
		// 				)}
		// 			</Formik>
		// 		</InnerContainer>
		// 	</StyledContainer>
		// </KeyboardAvoidingWrapper>
	)
}

export default Signup
