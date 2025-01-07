import React from 'react'
import { Modal, ActivityIndicator } from 'react-native'
import { Colors } from '@/components/styles'
import { BackdropContainer, BackdropLabel } from './styles/customBackdropStyles'

const CustomBackdrop = ({ openBackdrop, label = 'loading ...' }: { openBackdrop: boolean; label: string }) => {
	return (
		<Modal animationType='fade' transparent={true} visible={openBackdrop} statusBarTranslucent={true}>
			<BackdropContainer>
				<ActivityIndicator size={'large'} color={Colors.brand} />
				<BackdropLabel>{label}</BackdropLabel>
			</BackdropContainer>
		</Modal>
	)
}

export default CustomBackdrop
