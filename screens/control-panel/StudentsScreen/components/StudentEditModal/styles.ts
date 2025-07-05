import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
`

export const LoaderContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	width: 100%;
`

export const ContentContainer = styled.View`
	flex: 1;
	width: 100%;
	padding-bottom: 25px;
`

export const ErrorText = styled.Text`
	text-align: center;
	font-size: 13px;
	color: red;
`

export const SwitchContainer = styled.View`
	width: 100%;
	flex-direction: row;
	gap: 40px;
	justify-content: center;
`

export const SwitchOption = styled.View`
	flex-direction: row;
	justify-content: flex-start;
	gap: 5px;
	align-items: center;
	margin-top: 10px;
`

export const SwitchLabel = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-weight: 500;
`

export const CreditsContainer = styled.View`
	width: 100%;
	border: 1px solid ${colors.view.tertiary};
	border-radius: 8px;
	padding: 16px;
	background-color: ${colors.darkLight};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const CreditsInfoContainer = styled.View`
	gap: 8px;
`

export const CreditsInfo = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;
`

export const CreditsLabel = styled.Text`
	color: ${colors.view.primary};
	font-weight: bold;
	font-size: 16px;
`

export const CreditsValue = styled.Text`
	color: ${colors.view.primary};
	font-size: 16px;
`

export const CreditsActions = styled.View`
	flex-direction: row;
	gap: 16px;
` 