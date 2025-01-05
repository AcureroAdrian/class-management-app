import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Formik } from 'formik'
import { ActivityIndicator } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	SubTitle,
	StyledFormArea,
	Colors,
	StyledButton,
	ButtonText,
	MsgBox,
	Line,
	ExtraView,
	ExtraText,
	TextLinkContent,
} from '@/components/styles'
import TextInputForm from '@/components/TextInputForm/TextInputForm'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { ILoginValues } from './helpers/login-screen-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { login } from '@/redux/actions/userActions'

const { darkLight, primary } = Colors

const Login = () => {
	const dispatch = useAppDispatch()

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

	const onChangeDatePicker = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShowDate(false)
		setDate(currentDate)
		setDob(currentDate)
	}
	const showDatePicker = () => {
		setShowDate(true)
	}
	const handleMessage = (message: string | null, type = 'FAILED') => {
		setMessage(message)
		setMessageType(type)
	}
	const handleFormikSubmit = (values: ILoginValues) => {
		//VALIDATIONS
		if (!values.name.length || !values.lastName.length || !dob) {
			handleMessage('Please fill all the fields')
			return
		}
		handleMessage(null)

		dispatch(login({ name: values.name, lastName: values.lastName, dateOfBirth: dob }))
	}

	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style='auto' />
				<InnerContainer>
					<PageLogo resizeMode='contain' source={require('@/assets/img/logo.png')} />
					<PageTitle>MIYAGI KEN</PageTitle>
					<SubTitle>International Academy</SubTitle>
					<SubTitle>Account Login</SubTitle>

					{showDate && (
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode='date'
							is24Hour={true}
							display='default'
							onChange={onChangeDatePicker}
						/>
					)}

					<Formik initialValues={{ name: '', lastName: '', dateOfBirth: '' }} onSubmit={handleFormikSubmit}>
						{({ handleChange, handleBlur, handleSubmit, values }) => (
							<StyledFormArea>
								<TextInputForm
									label='Name'
									icon='person'
									placeholder='George'
									placeholderTextColor={darkLight}
									onChangeText={handleChange('name')}
									onBlur={handleBlur('name')}
									value={values.name}
								/>
								<TextInputForm
									label='Last Name'
									icon='person'
									placeholder='Smith'
									placeholderTextColor={darkLight}
									onChangeText={handleChange('lastName')}
									onBlur={handleBlur('lastName')}
									value={values.lastName}
								/>
								<TextInputForm
									label='Date of Birth'
									icon='calendar'
									placeholder='YYY - MM - DD'
									placeholderTextColor={darkLight}
									onChangeText={handleChange('dateOfBirth')}
									onBlur={handleBlur('dateOfBirth')}
									value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
									isDate={true}
									editable={false}
									showDatePicker={showDatePicker}
								/>
								<MsgBox type={messageType}>{message}</MsgBox>
								<StyledButton disabled={loadingUserLogin} onPress={(e) => handleSubmit(e)}>
									{loadingUserLogin ? (
										<ActivityIndicator size='large' color={primary} />
									) : (
										<ButtonText>Login</ButtonText>
									)}
								</StyledButton>
								<Line />
								<ExtraView>
									<ExtraText>Don't have and account already? </ExtraText>
									<Link href='/info' replace>
										<TextLinkContent>Singup</TextLinkContent>
									</Link>
								</ExtraView>
							</StyledFormArea>
						)}
					</Formik>
				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	)
}

export default Login
