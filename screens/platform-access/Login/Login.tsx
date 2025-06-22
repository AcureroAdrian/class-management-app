import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
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
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

const { darkLight, primary } = colors

const Login = () => {
	const dispatch = useAppDispatch()

	const [userId, setUserId] = useState<string>('')
	const [message, setMessage] = useState<string | null>(null)
	const [messageType, setMessageType] = useState<string | null>(null)

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
		if (!userId.length) {
			handleMessage('Please enter your User ID')
			return
		}
		if (userId.length < 6) {
			handleMessage('User ID must be at least 6 characters long')
			return
		}
		if (!/^[A-Za-z0-9]+$/.test(userId)) {
			handleMessage(`User ID ${userId} must contain only letters and numbers`)
			return
		}
		handleMessage(null)

		dispatch(login({ userId: userId.toUpperCase() }))
	}

	return (
		<>
			<ContainerWithoutHeader style={{ padding: 0 }}>
				<SafeAreaViewStyled>
					<StatusBar style='auto' />
					<ScrollView showsVerticalScrollIndicator={false}>
					<KeyboardAvoidingWrapper>

						<CenterAlignContainer>
								<LoginLogo resizeMode='contain' source={require('@/assets/img/logo.png')} />
								<LoginTitle>MIYAGI KEN</LoginTitle>
								<Text style={{ color: colors.variants.primary[5], marginTop: 5, fontWeight: 500, fontSize: 18 }}>
									International Academy
								</Text>

								<LoginSubTitle>Account Login</LoginSubTitle>
								<LoginInputArea>
									<CustomInputForm
										label='User ID'
										icon='account-key'
										placeholder='Enter your User ID'
										onChangeText={(value) => setUserId(value.trim().toUpperCase())}
										value={userId}
										autoCapitalize='characters'
										maxLength={20}
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
						</KeyboardAvoidingWrapper>
					</ScrollView>
				</SafeAreaViewStyled>
			</ContainerWithoutHeader>
		</>
	)
}

export default Login
