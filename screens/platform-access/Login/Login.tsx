import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Formik, FormikHelpers } from 'formik'
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
} from '@/components/styles'
import TextInputForm from '@/components/TextInputForm/TextInputForm'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import { useAuth } from '@/contexts/AuthContext'
import { ILoginValues } from './helpers/login-screen-interfaces'

const { darkLight, primary } = Colors

const Login = () => {
	const { onLogin } = useAuth()

	const [hidePassword, setHidePassword] = useState(true)
	const [message, setMessage] = useState<string | null>(null)
	const [messageType, setMessageType] = useState<string | null>(null)

	const handleMessage = (message: string | null, type = 'FAILED') => {
		setMessage(message)
		setMessageType(type)
	}
	const handleFormikSubmit = (values: ILoginValues, { setSubmitting }: FormikHelpers<ILoginValues>) => {
		//VALIDATIONS
		if (!values.email.length || !values.password.length) {
			handleMessage('Please fill all the fields')
			setSubmitting(false)
			return
		}

		handleMessage(null)

		onLogin!(values.email, values.password)
			.then((result) => {
				if (result.error) {
					handleMessage(result.message)
				}
			})
			.catch((error) => {
				const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
				handleMessage(errorMessage || 'An error occurred. Please try again.')
			})
			.finally(() => {
				setSubmitting(false)
			})
	}

	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style='auto' />
				<InnerContainer>
					<PageLogo resizeMode='contain' source={require('../../../assets/img/karate-logo.webp')} />
					<PageTitle>Karate Academy</PageTitle>
					<SubTitle>Account Login</SubTitle>

					<Formik initialValues={{ email: '', password: '' }} onSubmit={handleFormikSubmit}>
						{({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
							<StyledFormArea>
								<TextInputForm
									label='Email Address'
									icon='mail'
									placeholder='andyyj@gmail.com'
									placeholderTextColor={darkLight}
									onChangeText={handleChange('email')}
									onBlur={handleBlur('email')}
									value={values.email}
									keyboardType='email-address'
								/>
								<TextInputForm
									label='Password'
									icon='lock'
									placeholder='********'
									placeholderTextColor={darkLight}
									onChangeText={handleChange('password')}
									onBlur={handleBlur('password')}
									value={values.password}
									secureTextEntry={hidePassword}
									isPassword={true}
									hidePassword={hidePassword}
									setHidePassword={setHidePassword}
								/>
								<MsgBox type={messageType}>{message}</MsgBox>
								<StyledButton disabled={isSubmitting} onPress={(e) => handleSubmit(e)}>
									{isSubmitting ? <ActivityIndicator size='large' color={primary} /> : <ButtonText>Login</ButtonText>}
								</StyledButton>
								{/* <Line />
								<ExtraView>
									<ExtraText>Don't have and account already? </ExtraText>
									<Link href='/signup' replace>
										<TextLinkContent>Singup</TextLinkContent>
									</Link>
								</ExtraView> */}
							</StyledFormArea>
						)}
					</Formik>
				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	)
}

export default Login
