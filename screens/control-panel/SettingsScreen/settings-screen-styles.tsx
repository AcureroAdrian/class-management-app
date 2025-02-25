import colors from '@/theme/colors'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	width: 100%;
`

export const Content = styled.View`
	flex: 1;
	width: 100%;
	padding: 20px;
	gap: 20px;
`

export const PressableContainer = styled.View`
	padding-horizontal: 40px;
	padding-vertical: 20px;
	gap: 20px;
	align-items: center;
	background-color: ${colors.variants.secondary[0]};
	border-radius: 20px;
`

export const TextBold = styled.Text`
	font-weight: 500;
	font-size: 25px;
	text-align: center;
	color: ${colors.variants.secondary[5]};
`
