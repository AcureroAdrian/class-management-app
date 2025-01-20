import { Text, TextInput } from 'react-native'
import styled from 'styled-components'
import colors from '@/theme/colors'

export const StyledCustomInputlabel = styled(Text)`
	color: ${colors.primary};
	font-size: 13px;
	text-align: left;
	font-weight: 400;
	margin-top: 10px;
	background-color: ${colors.brand};
`

export const StyledCustomTextInput = styled(TextInput)`
	background-color: ${colors.primary};
	padding: 5px;
	font-size: 16px;
	height: 30px;
	margin-vertical: 5px;
	color: ${colors.tertiary};
`
