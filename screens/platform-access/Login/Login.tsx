import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ActivityIndicator, ScrollView, Text } from 'react-native'
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
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'

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
			<ContainerWithoutHeader style={{ padding: 0 }}>
				<SafeAreaViewStyled>
					<StatusBar style='auto' />
					<ScrollView showsVerticalScrollIndicator={false}>
						<CenterAlignContainer>
							<LoginLogo resizeMode='contain' source={require('@/assets/img/logo.png')} />
							<LoginTitle>MIYAGI KEN</LoginTitle>
							<Text style={{ color: colors.variants.primary[5], marginTop: 5, fontWeight: 500, fontSize: 18 }}>
								International Academy
							</Text>
							<LoginSubTitle>Account Login</LoginSubTitle>
							<LoginInputArea>
								<CustomInputForm label='Name' icon='account' placeholder='George' onChangeText={setName} value={name} />
								<CustomInputForm
									label='Last Name'
									icon='account'
									placeholder='Smith'
									onChangeText={setLastName}
									value={lastName}
								/>
								<CustomInputForm
									label='Date of Birth'
									icon='calendar'
									placeholder='YYY - MM - DD'
									value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
									editable={false}
									onPress={() => setShowDatePicker(true)}
								/>
							</LoginInputArea>
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
