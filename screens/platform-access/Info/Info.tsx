import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import {
	StyledContainer,
	InnerContainer,
	PageTitle,
	SubTitle,
	Line,
	ExtraView,
	ExtraText,
	TextLinkContent,
	PageLogo,
	StyledParagraph,
} from '@/components/styles'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'

const Info = () => {
	return (
		<KeyboardAvoidingWrapper>
			<StyledContainer>
				<StatusBar style='auto' />
				<InnerContainer>
					<PageLogo resizeMode='contain' source={require('../../../assets/img/logo.png')} />
					<PageTitle>MIYAGI KEN</PageTitle>
					<SubTitle>International Academy</SubTitle>
					<SubTitle>Account Sign Up</SubTitle>

					<StyledParagraph>To register, please contact Miyagi Ken International directly.</StyledParagraph>
					<StyledParagraph>
						Registration is handled exclusively through our official channels to ensure a smooth enrollment process.
					</StyledParagraph>
					<StyledParagraph></StyledParagraph>
					<StyledParagraph>You can reach us at any of our locations:</StyledParagraph>
					<StyledParagraph></StyledParagraph>
					<StyledParagraph>Spring Location</StyledParagraph>
					<StyledParagraph>22936 Kuykendahl Rd, Suite A, Spring TX 77389</StyledParagraph>
					<StyledParagraph>Email: dojo.miyagiken@gmail.com</StyledParagraph>
					<StyledParagraph>Phone: (936) 217-3081</StyledParagraph>
					<StyledParagraph></StyledParagraph>
					<StyledParagraph>Katy Location</StyledParagraph>
					<StyledParagraph>5206 E 3rd St, Katy, TX 77493</StyledParagraph>
					<StyledParagraph>Email: info@miyagikeninternational.com</StyledParagraph>
					<StyledParagraph>Phone: (936) 217-3155</StyledParagraph>
					<StyledParagraph></StyledParagraph>
					<StyledParagraph>Stay connected with us on social media:</StyledParagraph>
					<StyledParagraph>Instagram | Facebook</StyledParagraph>
					<StyledParagraph></StyledParagraph>
					<StyledParagraph>We look forward to welcoming you!</StyledParagraph>
					<Line />
					<ExtraView>
						<ExtraText>Already have an account? </ExtraText>
						<Link href='/' replace>
							<TextLinkContent>Login</TextLinkContent>
						</Link>
					</ExtraView>
				</InnerContainer>
			</StyledContainer>
		</KeyboardAvoidingWrapper>
	)
}

export default Info
