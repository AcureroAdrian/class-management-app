import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalContainer = styled.View`
	flex: 1;
	background-color: ${colors.primary};
`

export const HeaderContainer = styled.View`
	padding-top: 50px;
	padding-horizontal: 20px;
	padding-bottom: 20px;
	background-color: ${colors.variants.primary[4]};
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const HeaderTitle = styled.Text`
	font-size: 20px;
	font-weight: 600;
	color: ${colors.primary};
	flex: 1;
`

export const CloseButton = styled.Pressable`
	padding: 8px;
	border-radius: 8px;
	background-color: rgba(255, 255, 255, 0.2);
`

export const SearchBarContainer = styled.View`
	padding-horizontal: 20px;
	padding-vertical: 15px;
`

export const SearchInput = styled.TextInput`
	color: ${colors.variants.secondary[5]};
	border-radius: 10px;
	padding-horizontal: 15px;
	padding-vertical: 12px;
	font-size: 16px;
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
`

export const CreateTrialButtonContainer = styled.View`
	padding-horizontal: 20px;
	padding-bottom: 15px;
`

export const CreateTrialButton = styled.Pressable`
	background-color: ${colors.variants.secondary[2]};
	padding-vertical: 15px;
	padding-horizontal: 20px;
	border-radius: 10px;
	flex-direction: row;
	align-items: center;
	gap: 10px;
`

export const CreateTrialButtonText = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.primary};
`

export const StudentListItemContainer = styled.View`
	padding-horizontal: 20px;
	padding-vertical: 10px;
	border-bottom-width: 1px;
	border-bottom-color: ${colors.variants.grey[1]};
`

export const StudentListItemContent = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 15px;
`

export const StudentAvatar = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: 25px;
`

export const StudentInfoContainer = styled.View`
	flex: 1;
`

export const StudentName = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.view.black};
`

export const BadgesContainer = styled.View`
	flex-direction: row;
	margin-top: 4px;
	gap: 4px;
`

export const ActionButtonsContainer = styled.View`
	gap: 8px;
`

export const ActionButton = styled.Pressable<{ permanent?: boolean; makeup?: boolean; disabled?: boolean }>`
	background-color: ${(props: { permanent?: boolean; makeup?: boolean }) =>
		props.permanent ? colors.variants.primary[4] : props.makeup ? colors.variants.secondary[5] : colors.variants.secondary[3]};
	padding-horizontal: 15px;
	padding-vertical: 8px;
	border-radius: 8px;
	opacity: ${(props: { disabled?: boolean }) => (props.disabled ? 0.7 : 1)};
`

export const ActionButtonText = styled.Text`
	color: ${colors.primary};
	font-size: 12px;
	font-weight: 600;
	text-align: center;
`

export const EmptyListContainer = styled.View`
	padding: 40px;
	align-items: center;
`

export const EmptyListText = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[4]};
	text-align: center;
	margin-top: 10px;
`

export const ErrorMessage = styled.Text`
	color: ${colors.variants.primary[5]};
	background-color: ${colors.variants.primary[0]};
	padding: 12px;
	margin: 0 20px 15px;
	border-radius: 10px;
	text-align: center;
	font-weight: 500;
	font-size: 14px;
`

// Styles for Trial Student Form
export const FormScrollView = styled.ScrollView.attrs({
	contentContainerStyle: { padding: 20 },
})`
	flex: 1;
`

export const FormTitle = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 20px;
	text-align: center;
`

export const InputContainer = styled.View`
	gap: 15px;
`

export const InputWrapper = styled.View``

export const InputLabel = styled.Text`
	font-size: 14px;
	font-weight: 600;
	color: ${colors.variants.secondary[4]};
	margin-bottom: 5px;
`

export const FormTextInput = styled.TextInput`
	background-color: ${colors.variants.secondary[1]};
	border-radius: 10px;
	padding-horizontal: 15px;
	padding-vertical: 12px;
	font-size: 16px;
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
`

export const NotesTextInput = styled(FormTextInput)`
	min-height: 80px;
	text-align-vertical: top;
`

export const ErrorText = styled.Text`
	color: #c62828;
	font-size: 12px;
	margin-top: 2px;
`
export const FormActionButtonsContainer = styled.View`
	flex-direction: row;
	gap: 10px;
	margin-top: 30px;
	margin-bottom: 20px;
`

export const FormButton = styled.Pressable<{ cancel?: boolean; disabled?: boolean }>`
	flex: 1;
	background-color: ${(props: { cancel?: boolean }) =>
		props.cancel ? colors.variants.grey[2] : colors.variants.primary[4]};
	padding-vertical: 15px;
	border-radius: 10px;
	align-items: center;
	opacity: ${(props: { disabled?: boolean }) => (props.disabled ? 0.7 : 1)};
`

export const FormButtonText = styled.Text<{ cancel?: boolean }>`
	color: ${(props: { cancel?: boolean }) => (props.cancel ? colors.variants.grey[5] : colors.primary)};
	font-size: 16px;
	font-weight: 600;
` 