import colors from '@/theme/colors'
import styled from 'styled-components/native'

export const LoginLogo = styled.Image`
	width: 250px;
	height: 150px;
`
export const LoginTitle = styled.Text`
	font-size: 30px;
	text-align: center;
	font-weight: bold;
	color: ${colors.brand};
`
export const LoginSubTitle = styled.Text`
	font-size: 18px;
	margin-bottom: 20px;
	letter-spacing: 1px;
	font-weight: bold;
	color: ${colors.tertiary};
`
export const LoginInputArea = styled.View`
	width: 90%;
`
export const LoginButton = styled.Pressable`
	padding: 15px;
	background-color: ${colors.brand};
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-top: 5px;
	margin-bottom: 5px;
	height: 60px;
`
export const LoginButtonText = styled.Text`
	color: ${colors.primary};
	font-size: 16px;
`
