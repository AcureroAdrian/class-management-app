import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	background-color: ${colors.variants.grey[0]};
`

export const LoaderContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	width: 100%;
`

export const ContentContainer = styled.View`
	flex: 1;
	width: 100%;
	padding-bottom: 25px;
`

export const ErrorText = styled.Text`
	text-align: center;
	font-size: 14px;
	color: ${colors.variants.primary[5]};
	background-color: ${colors.variants.primary[0]};
	padding: 12px 16px;
	margin: 0 20px;
	border-radius: 8px;
	border-left-width: 4px;
	border-left-color: ${colors.variants.primary[5]};
`

// Contenedor para agrupar campos relacionados
export const FormSection = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 12px;
	padding: 20px;
	margin: 0 20px 20px 20px;
	shadow-color: ${colors.variants.grey[7]};
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
`

export const SectionTitle = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 20px;
`

export const FormGroup = styled.View`
	gap: 24px;
`

export const SwitchContainer = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 12px;
	padding: 20px;
	margin: 0 20px 20px 20px;
	shadow-color: ${colors.variants.grey[7]};
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
`

export const SwitchOption = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	background-color: ${colors.variants.grey[0]};
	border-radius: 8px;
	margin-bottom: 12px;
	border: 1px solid ${colors.variants.grey[1]};
`

export const SwitchInfo = styled.View`
	flex: 1;
`

export const SwitchLabel = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-weight: 600;
	font-size: 16px;
`

export const SwitchDescription = styled.Text`
	color: ${colors.variants.grey[4]};
	font-size: 14px;
	margin-top: 2px;
`

export const CreditsContainer = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 12px;
	padding: 20px;
	margin: 0 20px 20px 20px;
	shadow-color: ${colors.variants.grey[7]};
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
`

export const CreditsHeader = styled.View`
	margin-bottom: 16px;
`

export const CreditsTitle = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 4px;
`

export const CreditsSubtitle = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[4]};
`

export const CreditsContent = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const CreditsInfoContainer = styled.View`
	flex: 1;
`

export const CreditsInfo = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 8px;
`

export const CreditsLabel = styled.Text`
	color: ${colors.variants.grey[4]};
	font-weight: 500;
	font-size: 14px;
	min-width: 80px;
`

export const CreditsValue = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-weight: 700;
	font-size: 18px;
	margin-left: 8px;
`

export const CreditsActions = styled.View`
	flex-direction: row;
	gap: 12px;
	padding-left: 20px;
`

export const CreditButton = styled.TouchableOpacity`
	width: 44px;
	height: 44px;
	border-radius: 22px;
	justify-content: center;
	align-items: center;
	shadow-color: ${colors.variants.grey[7]};
	shadow-offset: 0px 2px;
	shadow-opacity: 0.15;
	shadow-radius: 4px;
	elevation: 2;
`

export const CreditButtonMinus = styled(CreditButton)`
	background-color: ${colors.variants.primary[0]};
	border: 1px solid ${colors.variants.primary[2]};
`

export const CreditButtonPlus = styled(CreditButton)`
	background-color: ${colors.variants.secondary[0]};
	border: 1px solid ${colors.variants.secondary[2]};
` 