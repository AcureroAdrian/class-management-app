import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { login } from '@/redux/actions/userActions'
import colors from '@/theme/colors'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { 
	LoginContainer, 
	LoginCard, 
	LogoContainer, 
	LoginLogo, 
	BrandContainer,
	MainTitle, 
	SubTitle, 
	FormContainer, 
	LoginButton, 
	LoginButtonText, 
	ErrorMessage,
	FooterContainer,
	FooterText,
	FooterLink,
	DividerContainer,
	DividerLine,
	DividerText,
	KarateSymbol
} from './login-styles'

const Login = () => {
	const dispatch = useAppDispatch()

	const [userId, setUserId] = useState<string>('')
	const [message, setMessage] = useState<string | null>(null)

	const { loadingUserLogin, errorUserLogin } = useAppSelector((state: RootState) => state.userLogin)

	useEffect(() => {
		if (errorUserLogin) {
			setMessage(errorUserLogin)
		}
	}, [errorUserLogin])

	const handleLogin = () => {
		// VALIDATIONS
		if (!userId.length) {
			setMessage('Please enter your User ID')
			return
		}
		if (userId.length < 6) {
			setMessage('User ID must be at least 6 characters long')
			return
		}
		if (!/^[A-Za-z0-9]+$/.test(userId)) {
			setMessage(`User ID ${userId} must contain only letters and numbers`)
			return
		}
		setMessage(null)

		dispatch(login({ userId: userId.toUpperCase() }))
	}

	return (
		<LoginContainer>
			<StatusBar style='light' />
			<KeyboardAvoidingWrapper>
				<ScrollView 
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
						<LoginCard>
							{/* Logo and Branding */}
							<LogoContainer>
								<LoginLogo 
									resizeMode='contain' 
									source={require('@/assets/img/logo.png')} 
								/>
								<BrandContainer>
									<MainTitle>MIYAGI KEN</MainTitle>
									<SubTitle>International Academy</SubTitle>
								</BrandContainer>
							</LogoContainer>

							{/* Karate Symbol */}
							<KarateSymbol>道</KarateSymbol>

							{/* Form */}
							<FormContainer>
								<Text style={{ 
									fontSize: 24, 
									fontWeight: '600', 
									color: colors.variants.secondary[5],
									marginBottom: 8,
									textAlign: 'center'
								}}>
									Welcome
								</Text>
								<Text style={{ 
									fontSize: 16, 
									color: colors.variants.grey[4],
									marginBottom: 32,
									textAlign: 'center'
								}}>
									Sign in to your account to continue
								</Text>

								<CustomInputForm
									label='User ID'
									icon='account-key'
									placeholder='Enter your User ID'
									onChangeText={(value) => setUserId(value.trim().toUpperCase())}
									value={userId}
									autoCapitalize='characters'
									maxLength={20}
								/>

								{message && (
									<ErrorMessage>{message}</ErrorMessage>
								)}

								<LoginButton disabled={loadingUserLogin} onPress={handleLogin}>
									{loadingUserLogin ? (
										<ActivityIndicator size='small' color={colors.primary} />
									) : (
										<LoginButtonText>Sign In</LoginButtonText>
									)}
								</LoginButton>
							</FormContainer>

							{/* Divider */}
							<DividerContainer>
								<DividerLine />
								<DividerText>or</DividerText>
								<DividerLine />
							</DividerContainer>

							{/* Footer */}
							<FooterContainer>
								<FooterText>Don't have an account? </FooterText>
								<Link href='/info' replace>
									<FooterLink>Sign Up</FooterLink>
								</Link>
							</FooterContainer>
						</LoginCard>
					</View>
				</ScrollView>
			</KeyboardAvoidingWrapper>
		</LoginContainer>
	)
}

export default Login
