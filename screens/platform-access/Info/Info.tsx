import React from 'react'
import { Text, View, ScrollView, Linking } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import colors from '@/theme/colors'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import {
	InfoContainer,
	InfoCard,
	HeaderSection,
	InfoLogo,
	BrandTitle,
	BrandSubtitle,
	WelcomeTitle,
	WelcomeSubtitle,
	ContentSection,
	SectionCard,
	SectionTitle,
	InfoText,
	ContactCard,
	LocationTitle,
	ContactRow,
	ContactInfo,
	SocialSection,
	SocialButton,
	SocialText,
	FooterSection,
	FooterDivider,
	BackButton,
	BackButtonText,
	KarateSymbol,
	HighlightText
} from './info-styles'

const Info = () => {
	const openSocialLink = (url: string) => {
		Linking.openURL(url).catch(err => console.error('Error opening link:', err))
	}

	return (
		<InfoContainer>
			<StatusBar style='light' />
			<KeyboardAvoidingWrapper>
				<ScrollView 
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					<View style={{ flex: 1, padding: 20 }}>
						<InfoCard>
							{/* Header with logo and branding */}
							<HeaderSection>
								<InfoLogo 
									resizeMode='contain' 
									source={require('../../../assets/img/logo.png')} 
								/>
								<BrandTitle>MIYAGI KEN</BrandTitle>
								<BrandSubtitle>International Academy</BrandSubtitle>
								<KarateSymbol>道</KarateSymbol>
							</HeaderSection>

							{/* Welcome title */}
							<WelcomeTitle>Join Our Academy!</WelcomeTitle>
							<WelcomeSubtitle>
								Discover the art of karate with us
							</WelcomeSubtitle>

							{/* Information section */}
							<ContentSection>
								<SectionCard>
									<SectionTitle>📝 Registration Process</SectionTitle>
									<InfoText>
										To register, please contact 
										<HighlightText> Miyagi Ken International</HighlightText> directly.
									</InfoText>
									<InfoText>
										Registration is handled exclusively through our official channels 
										to ensure a smooth enrollment process.
									</InfoText>
								</SectionCard>

								{/* Locations */}
								<SectionCard>
									<SectionTitle>📍 Our Locations</SectionTitle>
									
									<ContactCard>
										<LocationTitle>Spring Location</LocationTitle>
										<ContactRow>
											<Ionicons name="location" size={16} color={colors.variants.primary[5]} />
											<ContactInfo>22936 Kuykendahl Rd, Suite A, Spring TX 77389</ContactInfo>
										</ContactRow>
										<ContactRow>
											<Ionicons name="mail" size={16} color={colors.variants.primary[5]} />
											<ContactInfo>dojo.miyagiken@gmail.com</ContactInfo>
										</ContactRow>
										<ContactRow>
											<Ionicons name="call" size={16} color={colors.variants.primary[5]} />
											<ContactInfo>(936) 217-3081</ContactInfo>
										</ContactRow>
									</ContactCard>

									<ContactCard>
										<LocationTitle>Katy Location</LocationTitle>
										<ContactRow>
											<Ionicons name="location" size={16} color={colors.variants.primary[5]} />
											<ContactInfo>5206 E 3rd St, Katy, TX 77493</ContactInfo>
										</ContactRow>
										<ContactRow>
											<Ionicons name="mail" size={16} color={colors.variants.primary[5]} />
											<ContactInfo>info@miyagikeninternational.com</ContactInfo>
										</ContactRow>
										<ContactRow>
											<Ionicons name="call" size={16} color={colors.variants.primary[5]} />
											<ContactInfo>(936) 217-3155</ContactInfo>
										</ContactRow>
									</ContactCard>
								</SectionCard>

								{/* Social media */}
								<SectionCard>
									<SectionTitle>🌐 Follow Us on Social Media</SectionTitle>
									<SocialSection>
										<SocialButton onPress={() => openSocialLink('https://www.instagram.com/miyagikeninternational/')}>
											<Ionicons name="logo-instagram" size={24} color={colors.primary} />
											<SocialText>Instagram</SocialText>
										</SocialButton>
										<SocialButton onPress={() => openSocialLink('https://www.facebook.com/MiyagiKenInternational/')}>
											<Ionicons name="logo-facebook" size={24} color={colors.primary} />
											<SocialText>Facebook</SocialText>
										</SocialButton>
									</SocialSection>
								</SectionCard>

								<InfoText style={{ textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>
									We look forward to welcoming you soon! 🥋
								</InfoText>
							</ContentSection>

							{/* Footer */}
							<FooterSection>
								<FooterDivider />
								<Link href='/' replace>
									<BackButton>
										<Ionicons name="arrow-back" size={20} color={colors.primary} />
										<BackButtonText>Back to Login</BackButtonText>
									</BackButton>
								</Link>
							</FooterSection>
						</InfoCard>
					</View>
				</ScrollView>
			</KeyboardAvoidingWrapper>
		</InfoContainer>
	)
}

export default Info
