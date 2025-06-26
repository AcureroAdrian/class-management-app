import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`

export const ContentContainer = styled.View`
	flex: 1;
	width: 100%;
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