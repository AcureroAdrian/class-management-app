import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import {
	CenterAlignContainer,
	CenterTextConcated,
	ConcatTextContainer,
	ContainerWithoutHeader,
	Line,
	LoginLogo,
	LoginSubTitle,
	LoginTitle,
	TextLinkContent,
	SimpleTextLine,
	SafeAreaViewStyled,
} from '@/theme/styles'

const Info = () => {
	return (
		<ContainerWithoutHeader>
			<SafeAreaViewStyled>
				<StatusBar style='auto' />
				<CenterAlignContainer>
					<LoginLogo resizeMode='contain' source={require('../../../assets/img/logo.png')} />
					<LoginTitle>MIYAGI KEN</LoginTitle>
					<LoginSubTitle>International Academy</LoginSubTitle>
					<LoginSubTitle>Account Sign Up</LoginSubTitle>

					<SimpleTextLine>To register, please contact Miyagi Ken International directly.</SimpleTextLine>
					<SimpleTextLine>
						Registration is handled exclusively through our official channels to ensure a smooth enrollment process.
					</SimpleTextLine>
					<SimpleTextLine></SimpleTextLine>
					<SimpleTextLine>You can reach us at any of our locations:</SimpleTextLine>
					<SimpleTextLine></SimpleTextLine>
					<SimpleTextLine>Spring Location</SimpleTextLine>
					<SimpleTextLine>22936 Kuykendahl Rd, Suite A, Spring TX 77389</SimpleTextLine>
					<SimpleTextLine>Email: dojo.miyagiken@gmail.com</SimpleTextLine>
					<SimpleTextLine>Phone: (936) 217-3081</SimpleTextLine>
					<SimpleTextLine></SimpleTextLine>
					<SimpleTextLine>Katy Location</SimpleTextLine>
					<SimpleTextLine>5206 E 3rd St, Katy, TX 77493</SimpleTextLine>
					<SimpleTextLine>Email: info@miyagikeninternational.com</SimpleTextLine>
					<SimpleTextLine>Phone: (936) 217-3155</SimpleTextLine>
					<SimpleTextLine></SimpleTextLine>
					<SimpleTextLine>Stay connected with us on social media:</SimpleTextLine>
					<SimpleTextLine>Instagram | Facebook</SimpleTextLine>
					<SimpleTextLine></SimpleTextLine>
					<SimpleTextLine>We look forward to welcoming you!</SimpleTextLine>
					<Line />
					<ConcatTextContainer>
						<CenterTextConcated>Already have an account? </CenterTextConcated>
						<Link href='/' replace>
							<TextLinkContent>Login</TextLinkContent>
						</Link>
					</ConcatTextContainer>
				</CenterAlignContainer>
			</SafeAreaViewStyled>
		</ContainerWithoutHeader>
	)
}

export default Info
