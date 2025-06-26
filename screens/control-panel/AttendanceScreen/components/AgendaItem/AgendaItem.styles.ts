import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ItemContainer = styled.View`
	padding: 0px 20px 16px 20px;
`

export const CardContainer = styled.View<{ borderColor: string }>`
	background-color: ${colors.primary};
	padding: 20px;
	border-radius: 12px;
	elevation: 1;
	shadow-color: ${colors.variants.grey[4]};
	shadow-offset: 0px 1px;
	shadow-opacity: 0.1;
	shadow-radius: 3px;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 4px;
	border-top-color: ${colors.variants.grey[1]};
	border-right-color: ${colors.variants.grey[1]};
	border-bottom-color: ${colors.variants.grey[1]};
	border-left-color: ${(props: { borderColor: string }) => props.borderColor};
`

export const PressableArea = styled.Pressable`
	flex: 1;
`

export const TopRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 12px;
`

export const TimeContainer = styled.View`
	background-color: ${colors.variants.secondary[1]};
	padding: 6px 12px;
	border-radius: 6px;
`

export const TimeText = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-size: 12px;
	font-weight: 600;
`

export const StudentsContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 4px;
`

export const StudentsIcon = styled.View``

export const StudentsCountText = styled.Text`
	color: ${colors.variants.grey[4]};
	font-size: 12px;
	font-weight: 500;
`

export const ContentContainer = styled.View`
	margin-bottom: 12px;
`

export const NameText = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 4px;
	line-height: 20px;
`

export const DescriptionText = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[4]};
	line-height: 18px;
`

export const BottomRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;
`

export const AttendanceButton = styled.View`
	background-color: ${colors.variants.grey[0]};
	padding: 8px 12px;
	border-radius: 8px;
	flex-direction: row;
	align-items: center;
	gap: 6px;
`

export const AttendanceText = styled.Text`
	color: ${colors.variants.grey[5]};
	font-size: 12px;
	font-weight: 500;
`

export const AttendanceCount = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-size: 12px;
	font-weight: 600;
`

export const ArrowIcon = styled.View`
	margin-left: auto;
` 