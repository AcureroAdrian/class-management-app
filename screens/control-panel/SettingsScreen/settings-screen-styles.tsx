import colors from '@/theme/colors'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	width: 100%;
	background-color: ${colors.primary};
`

export const Content = styled.View`
	flex: 1;
	width: 100%;
	padding: 20px;
	gap: 16px;
`

export const HeaderSection = styled.View`
	margin-bottom: 32px;
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

export const SettingsCard = styled.Pressable`
	background-color: ${colors.view.primary};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 16px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
`

export const CardContent = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const CardLeft = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`

export const IconContainer = styled.View`
	background-color: ${colors.variants.secondary[1]};
	border-radius: 12px;
	padding: 10px;
	margin-right: 16px;
`

export const CardTitle = styled.Text`
	font-size: 18px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	flex: 1;
	letter-spacing: -0.3px;
`

export const LogoutCard = styled.Pressable`
	background-color: ${colors.variants.primary[5]};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 16px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.primary[3]};
`

export const LogoutIconContainer = styled.View`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	padding: 10px;
	margin-right: 16px;
`

export const LogoutTitle = styled.Text`
	font-size: 18px;
	font-weight: 700;
	color: ${colors.view.primary};
	flex: 1;
	letter-spacing: -0.3px;
`
