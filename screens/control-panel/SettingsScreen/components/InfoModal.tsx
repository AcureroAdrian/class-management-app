import React, { useEffect, useMemo } from 'react'
import { View, Modal, Text } from 'react-native'
import { Link } from 'expo-router'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { useAppSelector } from '@/redux/store'
import { CenterAlignContainer, LoginLogo, LoginSubTitle, LoginTitle, SimpleTextLine } from '@/theme/styles'

const InfoModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const { userInfo } = useAppSelector((state) => state.userLogin)

	useEffect(() => {
		return () => {
			closeModal()
		}
	}, [])

	const dob = useMemo(() => {
		if (!userInfo?.dateOfBirth) return null

		const { year, month, day } = userInfo.dateOfBirth

		return new Date(year, month - 1, day, 12, 0, 0)
	}, [userInfo])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
				<ScreenHeader label='Info' showBackButton={true} handleBack={closeModal} />
				<View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 20 }}>
					<CenterAlignContainer>
						<LoginLogo resizeMode='contain' source={require('../../../../assets/img/logo.png')} />
						<LoginTitle>MIYAGI KEN</LoginTitle>
						<LoginSubTitle>International Academy</LoginSubTitle>
						<LoginSubTitle>Information</LoginSubTitle>

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
					</CenterAlignContainer>
				</View>
			</View>
		</Modal>
	)
}

export default InfoModal
