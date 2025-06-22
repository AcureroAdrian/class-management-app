import styled from 'styled-components/native'
import colors from '@/theme/colors'
import {
	ConfirmationButtonProps,
	ModalContainerProps,
} from './helpers/custom-options-modal-interfaces'

export const ModalBackdrop = styled.View`
	flex: 1;
	background-color: rgba(0, 0, 0, 0.5);
	justify-content: center;
	align-items: center;
`
export const ModalContainer = styled.View<ModalContainerProps>`
	background-color: ${colors.view.primary};
	width: 85%;
	max-height: 600px;
	border-radius: 8px;
	padding: 24px;
	elevation: 5;
	shadow-color: #000;
	shadow-opacity: 0.25;
	shadow-radius: 4px;
	shadow-offset: 0px 2px;
	height: ${(props: ModalContainerProps) => (props.height ? props.height : 'auto')};
`

export const ModalTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: ${colors.view.tertiary};
	margin-bottom: 16px;
`

export const OptionsContainer = styled.ScrollView`
	max-height: 400px;
	margin-vertical: 10px;
`

export const OptionItem = styled.Pressable`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-vertical: 12px;
	border-bottom-width: 1px;
	border-bottom-color: ${colors.secondary};
`
export const EmptyListText = styled.Text`
	font-size: 16px;
	color: ${colors.view.grey};
	text-align: center;
	padding: 20px;
`
export const OptionText = styled.Text`
	font-size: 16px;
	color: ${colors.view.tertiary};
`

export const ActionsContainer = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	padding-top: 24px;
	gap: 20px;
`
export const ConfirmationButton = styled.TouchableOpacity<ConfirmationButtonProps>`
	background-color: ${(props: ConfirmationButtonProps) =>
		props.disabled ? colors.variants.grey[1] : colors.variants.primary[5]};
	padding: 10px 20px;
	border-radius: 5px;
`
export const CancelButton = styled.TouchableOpacity`
	background-color: ${colors.secondary};
	padding: 10px 20px;
	border-radius: 5px;
`
export const ButtonText = styled.Text`
	color: ${colors.view.primary};
	font-weight: bold;
	font-size: 16px;
` 