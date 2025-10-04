import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const Container = styled.View`
	flex: 1;
	background-color: ${colors.variants.grey[0]};
`

export const HolidayInfoText = styled.Text`
	color: ${colors.variants.primary[4]};
	font-size: 15px;
	font-weight: 500;
	width: 100%;
	text-align: center;
	padding: 16px 24px;
	background-color: ${colors.variants.primary[0]};
	border-bottom-width: 1px;
	border-bottom-color: ${colors.variants.primary[1]};
`

export const ErrorText = styled.Text`
	color: ${colors.red};
	width: 100%;
	text-align: center;
	padding: 16px 24px;
	background-color: rgba(239, 68, 68, 0.05);
	font-weight: 500;
`

export const AgendaContainer = styled.View`
	flex: 1;
	width: 100%;
	padding-top: 8px;
` 