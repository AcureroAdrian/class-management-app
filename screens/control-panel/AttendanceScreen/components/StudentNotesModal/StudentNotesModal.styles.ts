import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalOverlay = styled.View`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.6);
	justify-content: center;
	align-items: center;
	padding: 24px;
`

export const ModalContent = styled.View`
	background-color: ${colors.primary};
	border-radius: 24px;
	padding: 32px 24px;
	width: 100%;
	max-width: 420px;
	shadow-color: #000;
	shadow-offset: 0px 12px;
	shadow-opacity: 0.15;
	shadow-radius: 24px;
	elevation: 8;
`

export const Header = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;
	position: relative;
`

export const Title = styled.Text`
	font-size: 22px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	text-align: center;
	letter-spacing: -0.3px;
`

export const CloseButton = styled.Pressable`
	position: absolute;
	right: 0;
	top: -4px;
	padding: 8px;
	border-radius: 20px;
	background-color: ${colors.variants.grey[0]};
`

export const StudentName = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[3]};
	text-align: center;
	margin-bottom: 32px;
	font-weight: 500;
	letter-spacing: -0.2px;
`

export const NotesInput = styled.TextInput`
	background-color: ${colors.variants.grey[0]};
	border-radius: 16px;
	padding: 20px;
	min-height: 140px;
	text-align-vertical: top;
	font-size: 16px;
	color: ${colors.variants.secondary[5]};
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
	font-weight: 400;
	line-height: 24px;
	letter-spacing: -0.1px;
`

export const ButtonsContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 32px;
	gap: 16px;
`

export const ActionButton = styled.Pressable<{ cancel?: boolean }>`
	flex: 1;
	background-color: ${(props: { cancel?: boolean }) =>
		props.cancel ? colors.variants.grey[0] : colors.variants.secondary[5]};
	padding: 16px 20px;
	border-radius: 16px;
	align-items: center;
	justify-content: center;
	border-width: ${(props: { cancel?: boolean }) => (props.cancel ? '1px' : '0px')};
	border-color: ${colors.variants.grey[2]};
	min-height: 52px;
`

export const ActionButtonText = styled.Text<{ cancel?: boolean }>`
	color: ${(props: { cancel?: boolean }) => 
		props.cancel ? colors.variants.grey[4] : colors.primary};
	font-size: 16px;
	font-weight: 600;
	letter-spacing: -0.2px;
` 