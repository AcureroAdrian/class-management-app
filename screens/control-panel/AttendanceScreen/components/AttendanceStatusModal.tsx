import React from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { TAttendanceStatus } from '@/shared/common-types'
import { getStatusColor, getStatusText } from '@/shared/attendance-helpers'
import colors from '@/theme/colors'

interface AttendanceStatusModalProps {
	visible: boolean
	onClose: () => void
	onSelectStatus: (status: TAttendanceStatus) => void
	onAddNote: () => void
	currentStatus: TAttendanceStatus
	studentName: string
}

const AttendanceStatusModal: React.FC<AttendanceStatusModalProps> = ({
	visible,
	onClose,
	onSelectStatus,
	onAddNote,
	currentStatus,
	studentName,
}) => {
	const statusOptions: Array<{
		status: TAttendanceStatus
		icon: React.ReactNode
		label: string
	}> = [
		{
			status: 'present',
			icon: <AntDesign name='check' size={30} color={getStatusColor('present')} />,
			label: 'Asistió',
		},
		{
			status: 'good-behavior',
			icon: <AntDesign name='smile-circle' size={30} color={getStatusColor('good-behavior')} />,
			label: 'Buen Comportamiento',
		},
		{
			status: 'bad-behavior',
			icon: <AntDesign name='frown' size={30} color={getStatusColor('bad-behavior')} />,
			label: 'Mal Comportamiento',
		},
		{
			status: 'late',
			icon: <AntDesign name='exclamation' size={30} color={getStatusColor('late')} />,
			label: 'Tardanza',
		},
		{
			status: 'absent',
			icon: <AntDesign name='close' size={30} color={getStatusColor('absent')} />,
			label: 'No Asistió',
		},
		{
			status: 'sick',
			icon: <FontAwesome name='plus-square' size={30} color={getStatusColor('sick')} />,
			label: 'Enfermo',
		},
	]

	return (
		<Modal visible={visible} transparent={true} animationType='fade' onRequestClose={onClose}>
			<Pressable
				style={{
					flex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				onPress={onClose}
			>
				<Pressable
					style={{
						backgroundColor: colors.view.primary,
						borderRadius: 20,
						padding: 20,
						width: '90%',
						maxWidth: 400,
						shadowColor: '#000',
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5,
					}}
					onPress={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<View style={{ alignItems: 'center', marginBottom: 20 }}>
						<Text style={{ fontSize: 18, fontWeight: '600', color: colors.view.black, textAlign: 'center' }}>
							{studentName}
						</Text>
						<Text style={{ fontSize: 14, color: colors.variants.grey[4], marginTop: 4 }}>
							Estado actual: {getStatusText(currentStatus)}
						</Text>
					</View>

					{/* Status Options Grid */}
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							gap: 10,
						}}
					>
						{statusOptions.map((option) => (
							<Pressable
								key={option.status}
								onPress={() => {
									onSelectStatus(option.status)
									onClose()
								}}
								style={{
									width: '48%',
									aspectRatio: 1,
									backgroundColor:
										currentStatus === option.status ? colors.variants.secondary[1] : colors.variants.grey[0],
									borderRadius: 15,
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: 10,
									borderWidth: currentStatus === option.status ? 2 : 1,
									borderColor:
										currentStatus === option.status ? getStatusColor(option.status) : colors.variants.grey[1],
								}}
							>
								{option.icon}
								<Text
									style={{
										fontSize: 10,
										fontWeight: '600',
										color: colors.view.black,
										textAlign: 'center',
										marginTop: 5,
									}}
									numberOfLines={2}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>

					{/* Add Note Button */}
					<Pressable
						onPress={() => {
							onAddNote()
							onClose()
						}}
						style={{
							backgroundColor: colors.variants.primary[4],
							paddingVertical: 12,
							paddingHorizontal: 20,
							borderRadius: 25,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 10,
						}}
					>
						<MaterialCommunityIcons name='pencil' size={20} color={colors.view.primary} />
						<Text
							style={{
								color: colors.view.primary,
								fontSize: 16,
								fontWeight: '500',
							}}
						>
							Añadir Nota
						</Text>
					</Pressable>
				</Pressable>
			</Pressable>
		</Modal>
	)
}

export default AttendanceStatusModal
