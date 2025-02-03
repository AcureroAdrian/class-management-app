import styled from 'styled-components/native'
import Constants from 'expo-constants'
import colors from './colors'

const StatusBarHeight = Constants.statusBarHeight

const { primary, secondary, tertiary, darkLight, brand, green, red, link } = colors

export const ContainerWithoutHeader = styled.View`
	flex: 1;
	padding: 25px;
	padding-top: ${StatusBarHeight + 30}px;
	background-color: ${primary};
	min-height: 100%;
`
export const CenterAlignContainer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
`
export const ErrorMsgBox = styled.Text`
	text-align: center;
	font-size: 13px;
	color: red;
`
export const Line = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${darkLight};
	margin-top: 10px;
	margin-bottom: 10px;
`
export const ConcatTextContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;
`
export const CenterTextConcated = styled.Text`
	justify-content: center;
	align-items: center;
	color: ${tertiary};
	font-size: 15px;
`
export const TextLinkContent = styled.Text`
	color: ${link};
	font-size: 15px;
	font-weight: bold;
`
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
export const SimpleTextLine = styled.Text`
	color: ${tertiary};
	font-size: 15px;
	text-align: flex-start;
	width: 100%;
`
export const CenterContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`
