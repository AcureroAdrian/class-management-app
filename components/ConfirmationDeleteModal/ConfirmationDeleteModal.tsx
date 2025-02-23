import React, { useEffect } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import { IConfirmationDeleteModalProps } from './helpers/confirmation-delete-modal-interfaces'
import colors from '@/theme/colors'

const ConfirmationDeleteModal = ({
	openModal,
	closeModal,
	title = '',
	handleConfirm = () => {},
	loadingDelete,
	errorDelete,
}: IConfirmationDeleteModalProps) => {
	useEffect(() => {
		return () => {
			closeModal()
		}
	}, [])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} transparent statusBarTranslucent={true}>
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						backgroundColor: '#fff',
						width: '80%',
						maxHeight: 600,
						height: 'auto',
						padding: 20,
						borderRadius: 3,
					}}
				>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Delete</Text>
					<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginVertical: 10 }} />
					<Text>{title}</Text>
					{errorDelete && <Text style={{ color: 'red', marginTop: 10 }}>{errorDelete}</Text>}
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 10 }}>
						<Pressable onPress={closeModal} disabled={loadingDelete}>
							<View
								style={{
									paddingVertical: 10,
									paddingHorizontal: 20,
									borderColor: colors.brand,
									borderWidth: 1,
									borderRadius: 4,
								}}
							>
								<Text style={{ color: colors.brand }}>Cancel</Text>
							</View>
						</Pressable>
						<Pressable onPress={handleConfirm} disabled={loadingDelete}>
							<View
								style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: colors.brand, borderRadius: 4 }}
							>
								{loadingDelete ? (
									<ActivityIndicator size={'small'} color={'#fff'} />
								) : (
									<Text style={{ color: '#fff' }}>Delete</Text>
								)}
							</View>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default ConfirmationDeleteModal
