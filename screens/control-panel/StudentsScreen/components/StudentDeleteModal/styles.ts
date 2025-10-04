import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalOverlay = styled.View`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.5);
	justify-content: center;
	align-items: center;
`

export const ModalContainer = styled.View`
	background-color: #fff;
	width: 85%;
	max-height: 600px;
	height: auto;
	padding: 20px;
	border-radius: 8px;
`

export const Title = styled.Text`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 10px;
`

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.variants.grey[0]};
	margin: 10px 0;
`

export const Description = styled.Text`
	font-size: 16px;
	margin-bottom: 20px;
	line-height: 22px;
`

export const InputContainer = styled.View`
	margin-bottom: 20px;
`

export const ClearDateButton = styled.Pressable`
	margin-top: 8px;
	align-self: flex-start;
`

export const ClearDateText = styled.Text`
	color: ${colors.brand};
	font-size: 14px;
	text-decoration-line: underline;
`

export const ScheduledDateContainer = styled.View`
	background-color: ${colors.variants.secondary[0]};
	padding: 12px;
	border-radius: 6px;
	margin-bottom: 15px;
`

export const ScheduledDateText = styled.Text`
	font-size: 14px;
	color: ${colors.variants.secondary[4]};
	text-align: center;
`

export const ErrorText = styled.Text`
	color: ${colors.variants.primary[5]};
	margin-bottom: 15px;
	font-size: 14px;
`

export const ButtonsContainer = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	gap: 10px;
`

export const CancelButton = styled.View`
	padding: 12px 20px;
	border-color: ${colors.brand};
	border-width: 1px;
	border-radius: 6px;
`

export const CancelButtonText = styled.Text`
	color: ${colors.brand};
	font-size: 16px;
`

export const ConfirmButton = styled.View<{ scheduled: boolean }>`
	padding: 12px 20px;
	background-color: ${(props: { scheduled: boolean }) => (props.scheduled ? colors.variants.secondary[4] : colors.brand)};
	border-radius: 6px;
	min-width: 120px;
	align-items: center;
`

export const ConfirmButtonText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
` 