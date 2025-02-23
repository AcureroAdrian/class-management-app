import React, { useEffect, useMemo } from 'react'
import { View, Modal, Text } from 'react-native'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import capitalizeWords from '@/shared/capitalize-words'
import { useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'

const MyProfileModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
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
				<ScreenHeader label='My Profile' showBackButton={true} handleBack={closeModal} />
				{userInfo ? (
					<>
						<View style={{ flex: 1, width: '100%', padding: 20 }}>
							<CustomInputForm
								label='First Name'
								placeholder='Manuel'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo?.name)}
								editable={false}
							/>
							<CustomInputForm
								label='Last Name'
								placeholder='Smith'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo?.lastName)}
								editable={false}
							/>
							<CustomInputForm
								label='Date of Birth'
								placeholder='YYY - MM - DD'
								placeholderTextColor={colors.darkLight}
								value={dob ? format(new Date(dob), 'yyyy - MM - dd') : ''}
								editable={false}
							/>
							<CustomInputForm
								label='Level'
								placeholder='novice'
								placeholderTextColor={colors.darkLight}
								value={capitalizeWords(userInfo.level || '')}
								editable={false}
							/>
							<CustomInputForm
								label='Email'
								placeholder='manuel@gmail.com'
								placeholderTextColor={colors.darkLight}
								value={userInfo.email}
								editable={false}
							/>
							<CustomInputForm
								label='Phone'
								placeholder='+506 1234 5678'
								placeholderTextColor={colors.darkLight}
								value={userInfo.phone}
								editable={false}
							/>
							<CustomInputForm
								label='Notes'
								placeholder='This student has 3 brothers...'
								placeholderTextColor={colors.darkLight}
								value={userInfo.notes}
								editable={false}
							/>
						</View>
					</>
				) : (
					<View>
						<Text>You are not logged in</Text>
					</View>
				)}
			</View>
		</Modal>
	)
}

export default MyProfileModal
