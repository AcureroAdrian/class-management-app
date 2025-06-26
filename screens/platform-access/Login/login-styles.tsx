import colors from '@/theme/colors'
import styled from 'styled-components/native'

// Contenedor principal con gradiente
export const LoginContainer = styled.View`
	flex: 1;
	background-color: ${colors.variants.secondary[5]};
`

// Tarjeta principal de login
export const LoginCard = styled.View`
	background-color: ${colors.primary};
	border-radius: 24px;
	padding: 32px 24px;
	margin: 20px;
	shadow-color: #000;
	shadow-offset: 0px 8px;
	shadow-opacity: 0.15;
	shadow-radius: 16px;
	elevation: 8;
`

// Contenedor del logo
export const LogoContainer = styled.View`
	align-items: center;
	margin-bottom: 16px;
`

// Logo
export const LoginLogo = styled.Image`
	width: 120px;
	height: 80px;
	margin-bottom: 16px;
`

// Contenedor del branding
export const BrandContainer = styled.View`
	align-items: center;
	margin-bottom: 8px;
`

// Título principal
export const MainTitle = styled.Text`
	font-size: 28px;
	font-weight: 800;
	color: ${colors.variants.secondary[5]};
	text-align: center;
	letter-spacing: 1px;
`

// Subtítulo
export const SubTitle = styled.Text`
	font-size: 16px;
	font-weight: 500;
	color: ${colors.variants.primary[5]};
	text-align: center;
	margin-top: 4px;
`

// Símbolo de karate
export const KarateSymbol = styled.Text`
	font-size: 48px;
	color: ${colors.variants.primary[5]};
	text-align: center;
	margin-bottom: 24px;
	font-weight: 300;
`

// Contenedor del formulario
export const FormContainer = styled.View`
	width: 100%;
	margin-bottom: 24px;
`

// Botón de login
export const LoginButton = styled.Pressable<{ disabled?: boolean }>`
	background-color: ${colors.variants.secondary[5]};
	border-radius: 16px;
	padding: 16px;
	align-items: center;
	justify-content: center;
	margin-top: 24px;
	min-height: 56px;
	shadow-color: ${colors.variants.secondary[5]};
	shadow-offset: 0px 4px;
	shadow-opacity: 0.3;
	shadow-radius: 8px;
	elevation: 6;
	${(props: { disabled?: boolean }) => props.disabled && `
		background-color: ${colors.variants.grey[2]};
		shadow-opacity: 0.1;
	`}
`

// Texto del botón de login
export const LoginButtonText = styled.Text`
	color: ${colors.primary};
	font-size: 18px;
	font-weight: 600;
	letter-spacing: 0.5px;
`

// Mensaje de error
export const ErrorMessage = styled.Text`
	color: ${colors.variants.primary[5]};
	font-size: 14px;
	text-align: center;
	margin-top: 12px;
	padding: 8px 16px;
	background-color: ${colors.variants.primary[0]};
	border-radius: 8px;
	border-left-width: 4px;
	border-left-color: ${colors.variants.primary[5]};
`

// Contenedor del divisor
export const DividerContainer = styled.View`
	flex-direction: row;
	align-items: center;
	margin: 20px 0;
`

// Línea del divisor
export const DividerLine = styled.View`
	flex: 1;
	height: 1px;
	background-color: ${colors.variants.grey[1]};
`

// Texto del divisor
export const DividerText = styled.Text`
	margin: 0 16px;
	color: ${colors.variants.grey[3]};
	font-size: 14px;
	font-weight: 500;
`

// Contenedor del footer
export const FooterContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px;
`

// Texto del footer
export const FooterText = styled.Text`
	color: ${colors.variants.grey[4]};
	font-size: 15px;
	font-weight: 400;
`

// Link del footer
export const FooterLink = styled.Text`
	color: ${colors.variants.secondary[5]};
	font-size: 15px;
	font-weight: 600;
	text-decoration-line: underline;
`
