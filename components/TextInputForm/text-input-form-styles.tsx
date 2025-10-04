import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const LeftIconContainer = styled.View`
	left: 15px;
	top: 38px;
	position: absolute;
	z-index: 1;
`
export const RightIconContainer = styled.Pressable`
	right: 15px;
	top: 38px;
	position: absolute;
	z-index: 1;
`
export const TextInputFormLabel = styled.Text`
	color: ${colors.tertiary};
	font-size: 13px;
	text-align: left;
`
export const TextInputFormInput = styled.TextInput`
	background-color: ${colors.secondary};
	padding: 15px;
	padding-left: 55px;
	padding-right: 55px;
	border-radius: 5px;
	font-size: 16px;
	height: 60px;
	margin-top: 3px;
	margin-bottom: 3px;
	margin-bottom: 10px;
	color: ${colors.tertiary};
`
