import React from 'react'
import { Text, View, ScrollView } from 'react-native'
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
				<ScrollView>
				<CenterAlignContainer style={{ padding: 20 }}>
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
					<View style={{ width: '100%', flexDirection: 'row', gap: 10, justifyContent: 'flex-start' }}>
						<Link href={'https://www.instagram.com/miyagikeninternational/'}>Instagram</Link>
						<Text>|</Text>
						<Link href={'https://www.facebook.com/MiyagiKenInternational/'}>Facebook</Link>
					</View>
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
				</ScrollView>
			</SafeAreaViewStyled>
		</ContainerWithoutHeader>
	)
}

export default Info
