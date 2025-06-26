import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ItemContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	flex: 1;
	padding: 10px 20px;
	align-items: center;
`

export const TimeText = styled.Text`
	color: ${colors.variants.secondary[4]};
	margin-right: 15px;
	font-size: 14px;
	font-weight: 600;
`

export const CardContainer = styled.View`
	flex: 1;
	background-color: ${colors.variants.secondary[1]};
	padding: 20px;
	border-radius: 10px;
`

export const PressableArea = styled.Pressable`
	flex: 1;
`

export const InnerContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const TextContainer = styled.View`
	flex: 1;
	padding-right: 10px;
`

export const NameText = styled.Text`
	font-size: 14px;
	font-weight: 400;
`

export const DescriptionText = styled.Text`
	font-size: 12px;
	color: ${colors.variants.grey[4]};
`

export const BadgesContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 10px;
	margin-top: 5px;
`

export const Badge = styled.View<{ type: 'present' | 'absent' }>`
	background-color: ${(props: { type: 'present' | 'absent' }) => (props.type === 'present' ? 'green' : 'red')};
	padding: 5px;
	width: 30px;
	height: 30px;
	justify-content: center;
	align-items: center;
	border-radius: 15px; /* 50% for circle */
`

export const BadgeText = styled.Text`
	color: ${colors.primary};
`

export const StudentsContainer = styled.View`
	align-items: center;
`

export const StudentsCountText = styled.Text`
	color: ${colors.variants.secondary[5]};
` 