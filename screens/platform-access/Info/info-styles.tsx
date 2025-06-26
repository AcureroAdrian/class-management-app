import colors from '@/theme/colors'
import styled from 'styled-components/native'

// Contenedor principal
export const InfoContainer = styled.View`
	flex: 1;
	background-color: ${colors.variants.secondary[5]};
`

// Tarjeta principal de información
export const InfoCard = styled.View`
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

// Sección del header
export const HeaderSection = styled.View`
	align-items: center;
	margin-bottom: 24px;
`

// Logo
export const InfoLogo = styled.Image`
	width: 100px;
	height: 70px;
	margin-bottom: 16px;
`

// Título principal del brand
export const BrandTitle = styled.Text`
	font-size: 24px;
	font-weight: 800;
	color: ${colors.variants.secondary[5]};
	text-align: center;
	letter-spacing: 1px;
`

// Subtítulo del brand
export const BrandSubtitle = styled.Text`
	font-size: 14px;
	font-weight: 500;
	color: ${colors.variants.primary[5]};
	text-align: center;
	margin-top: 4px;
`

// Símbolo de karate
export const KarateSymbol = styled.Text`
	font-size: 36px;
	color: ${colors.variants.primary[5]};
	text-align: center;
	margin-top: 12px;
	font-weight: 300;
`

// Título de bienvenida
export const WelcomeTitle = styled.Text`
	font-size: 22px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	text-align: center;
	margin-bottom: 8px;
`

// Subtítulo de bienvenida
export const WelcomeSubtitle = styled.Text`
	font-size: 16px;
	color: ${colors.variants.grey[4]};
	text-align: center;
	margin-bottom: 24px;
	line-height: 22px;
`

// Sección de contenido
export const ContentSection = styled.View`
	width: 100%;
`

// Tarjeta de sección
export const SectionCard = styled.View`
	background-color: ${colors.variants.grey[0]};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 16px;
	border-left-width: 4px;
	border-left-color: ${colors.variants.primary[5]};
`

// Título de sección
export const SectionTitle = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 12px;
`

// Texto de información
export const InfoText = styled.Text`
	font-size: 15px;
	color: ${colors.variants.grey[5]};
	line-height: 22px;
	margin-bottom: 8px;
`

// Texto destacado
export const HighlightText = styled.Text`
	font-weight: 600;
	color: ${colors.variants.primary[5]};
`

// Tarjeta de contacto
export const ContactCard = styled.View`
	background-color: ${colors.primary};
	border-radius: 12px;
	padding: 16px;
	margin-bottom: 12px;
	border-width: 1px;
	border-color: ${colors.variants.grey[1]};
`

// Título de ubicación
export const LocationTitle = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 12px;
`

// Fila de contacto
export const ContactRow = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 8px;
`

// Información de contacto
export const ContactInfo = styled.Text`
	font-size: 14px;
	color: ${colors.variants.grey[5]};
	margin-left: 8px;
	flex: 1;
	line-height: 20px;
`

// Sección de redes sociales
export const SocialSection = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 16px;
	gap: 16px;
`

// Botón de red social
export const SocialButton = styled.Pressable`
	background-color: ${colors.variants.primary[5]};
	border-radius: 12px;
	padding: 14px 18px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	min-width: 120px;
	shadow-color: ${colors.variants.primary[5]};
	shadow-offset: 0px 2px;
	shadow-opacity: 0.2;
	shadow-radius: 4px;
	elevation: 3;
`

// Texto de red social
export const SocialText = styled.Text`
	color: ${colors.primary};
	font-size: 14px;
	font-weight: 600;
	margin-left: 8px;
`

// Sección del footer
export const FooterSection = styled.View`
	margin-top: 24px;
	align-items: center;
`

// Divisor del footer
export const FooterDivider = styled.View`
	width: 60%;
	height: 1px;
	background-color: ${colors.variants.grey[1]};
	margin-bottom: 20px;
`

// Botón de regreso
export const BackButton = styled.View`
	background-color: ${colors.variants.secondary[5]};
	border-radius: 12px;
	padding: 12px 24px;
	flex-direction: row;
	align-items: center;
	shadow-color: ${colors.variants.secondary[5]};
	shadow-offset: 0px 4px;
	shadow-opacity: 0.3;
	shadow-radius: 8px;
	elevation: 6;
`

// Texto del botón de regreso
export const BackButtonText = styled.Text`
	color: ${colors.primary};
	font-size: 16px;
	font-weight: 600;
	margin-left: 8px;
` 