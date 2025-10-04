import colors from '@/theme/colors'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${colors.primary};
`

export const Content = styled.View`
	padding-top: 24px;
	padding-bottom: 40px;
`

export const HeaderSection = styled.View`
	margin-bottom: 32px;
	padding-horizontal: 20px;
`

export const HeaderTitle = styled.Text`
	font-size: 28px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 8px;
	letter-spacing: -0.5px;
`

export const HeaderSubtitle = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[4]};
	line-height: 22px;
	letter-spacing: -0.2px;
`

export const CardWrapper = styled.View`
	padding-horizontal: 20px;
	padding-bottom: 16px;
`

export const SettingsCard = styled.Pressable`
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
	border-left-color: ${colors.variants.primary[3]};
`

export const LogoutCard = styled.Pressable`
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
	border-left-color: ${colors.red};
`

export const CardContent = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const CardLeft = styled.View`
	flex-direction: row;
	align-items: center;
	flex: 1;
`

export const IconContainer = styled.View`
	background-color: ${colors.variants.secondary[1]};
	padding: 8px;
	border-radius: 8px;
	margin-right: 16px;
`

export const LogoutIconContainer = styled.View`
	background-color: ${colors.red};
	padding: 8px;
	border-radius: 8px;
	margin-right: 16px;
`

export const CardTitle = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	letter-spacing: -0.2px;
	flex: 1;
`

export const LogoutTitle = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	letter-spacing: -0.2px;
	flex: 1;
`
