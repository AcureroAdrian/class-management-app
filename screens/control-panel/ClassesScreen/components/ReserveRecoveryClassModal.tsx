import React, { useEffect, useMemo } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import { getNextClassDate } from '../helpers/get-next-class-date'
import { IReserveRecoveryClassModalProps } from '../helpers/karate-classes-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { bookingRecoveryClassById } from '@/redux/actions/karateClassActions'
import { BOOKING_RECOVERY_CLASS_BY_ID_RESET } from '@/redux/constants/karateClassConstants'

const ReserveRecoveryClassModal = ({
	openModal,
	closeModal,
	startTime,
	weekDays,
	location,
	karateClassId,
	karateClassName,
	attendanceId,
}: IReserveRecoveryClassModalProps) => {
	const dispatch = useAppDispatch()

	const { userInfo } = useAppSelector((state) => state.userLogin)
	const { loadingBookingRecoveryClassById, errorBookingRecoveryClassById } = useAppSelector(
		(state) => state.bookingRecoveryClassById,
	)

	useEffect(() => {
		return () => {
			closeModal()
			dispatch({ type: BOOKING_RECOVERY_CLASS_BY_ID_RESET })
		}
	}, [])

	const handleBookingRecoveryClass = () => {
		dispatch(
			bookingRecoveryClassById(karateClassId, {
				studentId: userInfo?._id,
				attendanceId,
				date: {
					day: nextDayForClass.getDate(),
					month: nextDayForClass.getMonth() + 1,
					year: nextDayForClass.getFullYear(),
					hour: startTime.hour,
					minute: startTime.minute,
				},
			}),
		)
	}
	const nextDayForClass = useMemo(() => {
		return getNextClassDate(weekDays)
	}, [weekDays])

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
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Booking Recovery Class</Text>
					<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[0] }} />
					<Text style={{ fontSize: 14, fontWeight: 'bold' }}>Booking details:</Text>
					<View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
						<Text style={{ fontWeight: 'bold' }}>Class:</Text>
						<Text>{karateClassName}</Text>
					</View>
					<View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
						<Text style={{ fontWeight: 'bold' }}>Date:</Text>
						<Text>{format(nextDayForClass, 'MMMM dd, EEEE ')}</Text>
					</View>
					<View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
						<Text style={{ fontWeight: 'bold' }}>Start Time:</Text>
						<Text>{format(new Date(2025, 1, 1, startTime.hour, startTime.minute, 0), 'HH:mm aaaa')}</Text>
					</View>
					<View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
						<Text style={{ fontWeight: 'bold' }}>Location:</Text>
						<Text>{capitalizeWords(location)}</Text>
					</View>
					<Text>Are you sure you want to book this class?</Text>
					{errorBookingRecoveryClassById && (
						<Text style={{ color: 'red', marginTop: 10 }}>{errorBookingRecoveryClassById}</Text>
					)}
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 10 }}>
						<Pressable onPress={closeModal} disabled={loadingBookingRecoveryClassById}>
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
						<Pressable onPress={handleBookingRecoveryClass} disabled={loadingBookingRecoveryClassById}>
							<View
								style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: colors.brand, borderRadius: 4 }}
							>
								{loadingBookingRecoveryClassById ? (
									<ActivityIndicator size={'small'} color={'#fff'} />
								) : (
									<Text style={{ color: '#fff' }}>Book</Text>
								)}
							</View>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default ReserveRecoveryClassModal
