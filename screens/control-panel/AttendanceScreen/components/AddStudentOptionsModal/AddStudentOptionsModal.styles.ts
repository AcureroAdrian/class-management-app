import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalOverlay = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.6);
`

export const ModalContent = styled.View`
	background-color: ${colors.primary};
	border-radius: 15px;
	padding: 20px;
	width: 90%;
	max-width: 400px;
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.3;
	shadow-radius: 5px;
	elevation: 10;
	border-width: 1px;
	border-color: ${colors.variants.primary[5]};
`

export const HeaderContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`

export const HeaderTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: ${colors.variants.secondary[5]};
`

export const CloseButton = styled.TouchableOpacity`
	padding: 5px;
`

export const StudentName = styled.Text`
	font-size: 18px;
	color: ${colors.variants.grey[4]};
	margin-bottom: 20px;
	text-align: center;
	font-weight: 500;
`

export const OptionsContainer = styled.View`
	margin-bottom: 15px;
`

interface OptionButtonProps {
	selected: boolean
}

export const OptionButton = styled.TouchableOpacity<OptionButtonProps>`
	flex-direction: row;
	align-items: center;
	padding: 15px;
	border-radius: 10px;
	margin-bottom: 10px;
	background-color: ${(props: OptionButtonProps) =>
		props.selected ? colors.variants.primary[1] : 'transparent'};
	border-width: 1px;
	border-color: ${(props: OptionButtonProps) =>
		props.selected ? colors.variants.primary[5] : colors.variants.grey[2]};
`

export const OptionText = styled.Text<{ selected: boolean }>`
	font-size: 16px;
	margin-left: 15px;
	color: ${(props: { selected: boolean }) =>
		props.selected ? colors.variants.secondary[5] : colors.variants.grey[4]};
	font-weight: ${(props: { selected: boolean }) => (props.selected ? 'bold' : 'normal')};
` 