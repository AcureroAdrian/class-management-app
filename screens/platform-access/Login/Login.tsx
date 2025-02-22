import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ActivityIndicator, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import TextInputForm from '@/components/TextInputForm/TextInputForm'
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
	SafeAreaViewStyled,
	TextLinkContent,
} from '@/theme/styles'
import colors from '@/theme/colors'
import { LoginButton, LoginButtonText, LoginInputArea } from './login-styles'

const { darkLight, primary } = colors

const Login = () => {
	const dispatch = useAppDispatch()

	const [name, setName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [dob, setDob] = useState<Date>(new Date(2000, 0, 1))
	const [message, setMessage] = useState<string | null>(null)
	const [messageType, setMessageType] = useState<string | null>(null)
	const [showDatePicker, setShowDatePicker] = useState(false)

	const { loadingUserLogin, errorUserLogin } = useAppSelector((state: RootState) => state.userLogin)

	useEffect(() => {
		if (errorUserLogin) {
			handleMessage(errorUserLogin)
		}
	}, [errorUserLogin])

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
	const handleConfirm = (date: Date) => {
		const currentDate = date || dob
		setDob(currentDate)
		setShowDatePicker(false)
	}

	return (
		<>
			<ContainerWithoutHeader>
				<SafeAreaViewStyled>
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
								<TextInputForm
									label='Date of Birth'
									icon='calendar'
									placeholder='YYY - MM - DD'
									placeholderTextColor={darkLight}
									value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
									isDate={true}
									editable={false}
									showDatePicker={() => setShowDatePicker(true)}
								/>
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
				</SafeAreaViewStyled>
			</ContainerWithoutHeader>
			{showDatePicker && (
				<DateTimePickerModal
					isVisible={showDatePicker}
					mode='date'
					onConfirm={handleConfirm}
					onCancel={() => setShowDatePicker(false)}
					display='spinner'
					date={dob}
				/>
			)}
		</>
	)
}

export default Login
