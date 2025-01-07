import { Text, TextInput } from 'react-native'
import styled from 'styled-components'
import { Colors } from '@/components/styles'

export const StyledCustomInputlabel = styled(Text)`
	color: ${Colors.primary};
	font-size: 13px;
	text-align: left;
	font-weight: 400;
	margin-top: 10px;
	background-color: ${Colors.brand};
`

export const StyledCustomTextInput = styled(TextInput)`
	background-color: ${Colors.primary};
	padding: 5px;
	font-size: 16px;
	height: 30px;
	margin-vertical: 5px;
	color: ${Colors.tertiary};
`
