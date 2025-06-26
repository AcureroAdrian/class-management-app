import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	background-color: ${colors.variants.primary[5]};
	padding: 10px 20px;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const HeaderText = styled.Text`
	font-size: 18px;
	font-weight: 500;
	color: ${colors.primary};
`

export const HolidayButton = styled.Pressable`
	flex-direction: row;
	align-items: center;
	gap: 10px;
	height: 100%;
	padding: 10px 15px;
	border-radius: 20px;
	background-color: ${colors.variants.primary[1]};
`

export const HolidayButtonText = styled.Text`
	color: ${colors.variants.primary[5]};
	font-weight: 500;
	font-size: 16px;
`

export const HolidayInfoText = styled.Text`
	color: ${colors.variants.primary[5]};
	font-size: 16px;
	font-weight: bold;
	width: 100%;
	text-align: center;
	padding: 10px 20px;
`

export const ErrorText = styled.Text`
	color: ${colors.variants.primary[5]};
	width: 100%;
	text-align: center;
	padding: 10px 20px;
`

export const AgendaContainer = styled.View`
	flex: 1;
	width: 100%;
` 