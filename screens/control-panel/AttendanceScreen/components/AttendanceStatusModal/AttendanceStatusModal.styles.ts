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

export const HeaderContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;
	position: relative;
`

export const HeaderTitle = styled.Text`
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

export const OptionsContainer = styled.View`
	gap: 12px;
	margin-bottom: 24px;
`

export const OptionButton = styled.Pressable<{ selected?: boolean; status?: string }>`
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px 16px;
	border-radius: 16px;
	background-color: ${(props: { selected?: boolean; status?: string }) => {
		if (props.selected) {
			switch (props.status) {
				case 'present':
					return '#E8F5E8'
				case 'good-behavior':
					return '#FFF3E0'
				case 'bad-behavior':
					return '#FFEBEE'
				case 'late':
					return '#E3F2FD'
				case 'absent':
					return '#FFEBEE'
				case 'sick':
					return '#F3E5F5'
				default:
					return colors.variants.grey[0]
			}
		}
		return colors.variants.grey[0]
	}};
	border-width: ${(props: { selected?: boolean }) => (props.selected ? '2px' : '1px')};
	border-color: ${(props: { selected?: boolean; status?: string }) => {
		if (props.selected) {
			switch (props.status) {
				case 'present':
					return '#4CAF50'
				case 'good-behavior':
					return '#FF9800'
				case 'bad-behavior':
					return '#F44336'
				case 'late':
					return '#2196F3'
				case 'absent':
					return '#F44336'
				case 'sick':
					return '#9C27B0'
				default:
					return colors.variants.grey[2]
			}
		}
		return colors.variants.grey[1]
	}};
	min-height: 90px;
	transition: all 0.2s ease;
`

export const OptionText = styled.Text<{ selected?: boolean }>`
	font-size: 14px;
	font-weight: ${(props: { selected?: boolean }) => (props.selected ? '600' : '500')};
	color: ${(props: { selected?: boolean }) => 
		props.selected ? colors.variants.secondary[5] : colors.variants.grey[4]};
	margin-top: 8px;
	text-align: center;
	letter-spacing: -0.1px;
`

export const AddNoteButton = styled.Pressable`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 12px;
	padding: 16px 20px;
	border-radius: 16px;
	background-color: ${colors.variants.secondary[0]};
	border-width: 1px;
	border-color: ${colors.variants.secondary[2]};
	margin-top: 8px;
`

export const AddNoteText = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	letter-spacing: -0.2px;
` 