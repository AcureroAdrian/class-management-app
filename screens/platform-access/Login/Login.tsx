import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ActivityIndicator, Platform, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker'
import TextInputForm from '@/components/TextInputForm/TextInputForm'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { ILoginValues } from './helpers/login-screen-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { login } from '@/redux/actions/userActions'
import {
	CenterAlignContainer,
	CenterTextConcated,
	ConcatTextContainer,
	ContainerWithoutHeader,
	ErrorMsgBox,
	Line,
	LoginLogo,
	LoginSubTitle,
	LoginTitle,
	TextLinkContent,
} from '@/theme/styles'
import colors from '@/theme/colors'
import { DateActionsButton, DateActionsButtonText, LoginButton, LoginButtonText, LoginInputArea } from './login-styles'
import { TextInputFormLabel } from '@/components/TextInputForm/text-input-form-styles'

const { darkLight, primary } = colors

const Login = () => {
	const dispatch = useAppDispatch()

	const [name, setName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [showDate, setShowDate] = useState<boolean>(false)
	const [date, setDate] = useState(new Date(2000, 0, 1))
	const [dob, setDob] = useState<Date | null>(null)
	const [message, setMessage] = useState<string | null>(null)
	const [messageType, setMessageType] = useState<string | null>(null)

	const { loadingUserLogin, errorUserLogin } = useAppSelector((state: RootState) => state.userLogin)

	useEffect(() => {
		if (errorUserLogin) {
			handleMessage(errorUserLogin)
		}
	}, [errorUserLogin])

	const onChangeDatePickerAndroid = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShowDate(false)
		setDate(currentDate)
		setDob(currentDate)
	}
	const onChangeDatePickerIOS = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setDate(currentDate)
	}
	const showDatePicker = () => {
		setShowDate(true)
	}

	const confirmIOSDate = () => {
		setShowDate(false)
		setDob(date)
	}

	const handleMessage = (message: string | null, type = 'FAILED') => {
		setMessage(message)
		setMessageType(type)
	}
	const handleLogin = () => {
		//VALIDATIONS
		if (!name.length || !lastName.length || !dob) {
			handleMessage('Please fill all the fields')
			return
		}
		handleMessage(null)

		dispatch(login({ name: name, lastName: lastName, dateOfBirth: dob }))
	}

	return (
		<>
			{/* <KeyboardAvoidingWrapper> */}
			<ContainerWithoutHeader>
				<StatusBar style='auto' />
				<ScrollView showsVerticalScrollIndicator={false}>
					<CenterAlignContainer>
						<LoginLogo resizeMode='contain' source={require('@/assets/img/logo.png')} />
						<LoginTitle>MIYAGI KEN</LoginTitle>
						<LoginSubTitle>International Academy</LoginSubTitle>
						<LoginSubTitle>Account Login</LoginSubTitle>
						<LoginInputArea>
							<TextInputForm
								label='Name'
								icon='person'
								placeholder='George'
								placeholderTextColor={darkLight}
								onChangeText={setName}
								value={name}
							/>
							<TextInputForm
								label='Last Name'
								icon='person'
								placeholder='Smith'
								placeholderTextColor={darkLight}
								onChangeText={setLastName}
								value={lastName}
							/>
							{showDate && (
								<>
									{Platform.OS === 'ios' && <TextInputFormLabel>Date of Birth</TextInputFormLabel>}
									<DateTimePicker
										testID='dateTimePicker'
										value={date}
										mode='date'
										is24Hour={true}
										display='spinner'
										onChange={Platform.OS === 'ios' ? onChangeDatePickerIOS : onChangeDatePickerAndroid}
										style={styles.pickerSpinner}
										maximumDate={new Date()}
									/>
									{Platform.OS === 'ios' && (
										<View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15 }}>
											<DateActionsButton backgroundColor='red' onPress={() => setShowDate(false)}>
												<DateActionsButtonText>Cancel</DateActionsButtonText>
											</DateActionsButton>
											<DateActionsButton onPress={confirmIOSDate}>
												<DateActionsButtonText color={primary}>Confirm</DateActionsButtonText>
											</DateActionsButton>
										</View>
									)}
								</>
							)}
							{(!showDate || Platform.OS === 'android') && (
								<TextInputForm
									label='Date of Birth'
									icon='calendar'
									placeholder='YYY - MM - DD'
									placeholderTextColor={darkLight}
									value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
									isDate={true}
									editable={false}
									showDatePicker={showDatePicker}
									onPressIn={showDatePicker}
								/>
							)}
							<ErrorMsgBox type={messageType}>{message}</ErrorMsgBox>
							<LoginButton disabled={loadingUserLogin} onPress={handleLogin}>
								{loadingUserLogin ? (
									<ActivityIndicator size='large' color={primary} />
								) : (
									<LoginButtonText>Login</LoginButtonText>
								)}
							</LoginButton>
							<Line />
							<ConcatTextContainer>
								<CenterTextConcated>Don't have and account already? </CenterTextConcated>
								<Link href='/info' replace>
									<TextLinkContent>Singup</TextLinkContent>
								</Link>
							</ConcatTextContainer>
						</LoginInputArea>
					</CenterAlignContainer>
				</ScrollView>
			</ContainerWithoutHeader>
			{/* </KeyboardAvoidingWrapper> */}
		</>
	)
}

const styles = StyleSheet.create({
	pickerSpinner: {
		height: 100,
	},
})

export default Login
