import styled from 'styled-components/native'
import colors from '@/theme/colors'

export const ModalContainer = styled.View`
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	background-color: ${colors.variants.grey[0]};
`

export const ContentContainer = styled.View`
	flex: 1;
	width: 100%;
	padding-top: 20px;
`

export const ErrorText = styled.Text`
	text-align: center;
	font-size: 14px;
	color: ${colors.variants.primary[5]};
	background-color: ${colors.variants.primary[0]};
	padding: 12px 16px;
	margin: 0 20px 20px 20px;
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