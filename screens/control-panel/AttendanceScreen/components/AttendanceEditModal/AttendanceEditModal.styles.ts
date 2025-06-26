import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: flex-start;
	background-color: ${colors.primary};
`

export const HeaderInfoContainer = styled.View`
	width: 100%;
	padding: 16px 24px;
	align-items: center;
	background-color: ${colors.primary};
`

export const ClassName = styled.Text`
	font-size: 20px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	text-align: center;
	letter-spacing: -0.3px;
	margin-bottom: 4px;
`

export const DayWeekText = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[3]};
	text-transform: capitalize;
	font-weight: 500;
	letter-spacing: -0.2px;
`

export const SummaryContainer = styled.View`
	width: 100%;
	padding: 0 24px 20px 24px;
`

export const SummaryBar = styled.View`
	width: 100%;
	background-color: ${colors.variants.secondary[0]};
	padding: 20px;
	border-radius: 20px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
	shadow-color: #000;
	shadow-offset: 0px 4px;
	shadow-opacity: 0.08;
	shadow-radius: 12px;
	elevation: 3;
`

export const SummaryBadges = styled.View`
	flex-direction: row;
	gap: 12px;
`

export const SummaryBadge = styled.View<{ type: 'present' | 'absent' | 'late' }>`
	background-color: ${(props: { type: 'present' | 'absent' | 'late' }) => {
		switch (props.type) {
			case 'present':
				return '#4CAF50'
			case 'absent':
				return '#F44336'
			case 'late':
				return '#2196F3'
			default:
				return colors.variants.grey[3]
		}
	}};
	padding: 8px;
	min-width: 36px;
	height: 36px;
	justify-content: center;
	align-items: center;
	border-radius: 18px;
`

export const SummaryBadgeText = styled.Text`
	color: ${colors.primary};
	font-size: 14px;
	font-weight: 700;
`

export const TotalText = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-size: 18px;
	font-weight: 600;
	letter-spacing: -0.2px;
`

export const ErrorMessage = styled.Text`
	text-align: center;
	font-size: 14px;
	color: ${colors.variants.primary[5]};
	margin: 0 24px 16px 24px;
	padding: 12px;
	background-color: ${colors.variants.primary[0]};
	border-radius: 12px;
	border-width: 1px;
	border-color: ${colors.variants.primary[2]};
`

export const StudentListItem = styled.Pressable`
	background-color: ${colors.primary};
`

export const StudentListItemContainer = styled.View`
	width: 100%;
	padding: 16px 24px;
	align-items: flex-start;
`

export const StudentListItemContent = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const StudentInfoContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	gap: 16px;
`

export const StudentAvatar = styled.Image`
	width: 52px;
	height: 52px;
	border-radius: 26px;
	border-width: 2px;
	border-color: ${colors.variants.grey[0]};
`

export const StudentTextContainer = styled.View`
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	flex-direction: column;
	gap: 2px;
`

export const StudentName = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	letter-spacing: -0.2px;
`

export const StudentLastName = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[3]};
	font-weight: 500;
	letter-spacing: -0.1px;
`

export const StudentBadgesContainer = styled.View`
	flex-direction: row;
	margin-top: 8px;
	gap: 6px;
`

export const StudentActionsContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 12px;
`

export const NotesIndicator = styled.View`
	padding: 8px;
	border-radius: 12px;
	background-color: ${colors.variants.primary[0]};
	border-width: 1px;
	border-color: ${colors.variants.primary[2]};
`

export const MoreOptionsButton = styled.Pressable<{ disabled?: boolean }>`
	padding: 8px;
	border-radius: 12px;
	background-color: ${colors.variants.grey[0]};
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
	opacity: ${(props: { disabled?: boolean }) => (props.disabled ? 0.5 : 1)};
`

export const Separator = styled.View`
	width: 100%;
	align-items: center;
	padding: 0 24px;
`

export const SeparatorLine = styled.View`
	width: 100%;
	height: 1px;
	background-color: ${colors.variants.grey[0]};
`

export const FloatingButtonContainer = styled.View`
	align-items: center;
	padding: 32px 0;
`

export const FloatingButton = styled.Pressable`
	background-color: ${colors.variants.secondary[5]};
	width: 64px;
	height: 64px;
	border-radius: 32px;
	justify-content: center;
	align-items: center;
	shadow-color: #000;
	shadow-offset: 0px 8px;
	shadow-opacity: 0.15;
	shadow-radius: 16px;
	elevation: 8;
`

export const FloatingButtonText = styled.Text`
	margin-top: 12px;
	font-size: 13px;
	color: ${colors.variants.grey[3]};
	text-align: center;
	font-weight: 500;
	letter-spacing: -0.1px;
` 