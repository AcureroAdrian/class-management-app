import React, { useEffect, useMemo, useState } from 'react'
import { View, Modal, Image, Text, FlatList, Pressable, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import capitalizeWords from '@/shared/capitalize-words'
import { registerStudentAttendance, updateStudentAttendanceById } from '@/redux/actions/studentAttendanceActions'
import {
	REGISTER_STUDENT_ATTENDANCE_RESET,
	UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET,
} from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'

const AttendanceEditModal = ({
	openModal,
	closeModal,
	attendanceData,
}: {
	openModal: boolean
	closeModal: () => void
	attendanceData: any
}) => {
	const dispatch = useAppDispatch()

	const [attendance, setAttendance] = useState<any[]>([])
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const { loadingRegisterStudentAttendance, errorRegisterStudentAttendance } = useAppSelector(
		(state) => state.registerStudentAttendance,
	)
	const { loadingUpdateStudentAttendanceById, errorUpdateStudentAttendanceById } = useAppSelector(
		(state) => state.updateStudentAttendanceById,
	)

	useEffect(() => {
		return () => {
			dispatch({ type: REGISTER_STUDENT_ATTENDANCE_RESET })
			dispatch({ type: UPDATE_STUDENT_ATTENDANCE_BY_ID_RESET })
			closeModal()
		}
	}, [])
	useEffect(() => {
		if (attendanceData) {
			if (!attendanceData?.students?.length) {
				setErrorMessage('No students found')
				return
			}

			const newAttendance = attendanceData?.students?.map((student: any) => {
				const existsAttendance = attendanceData?.attendance?.find((item: any) => item?.student === student?._id)
				return {
					student: student?._id,
					name: student?.name,
					lastName: student?.lastName,
					attendanceStatus: 'present',
					...(existsAttendance || {}),
				}
			})

			setAttendance(newAttendance)
		}
	}, [attendanceData])

	const handleSaveAtendance = () => {
		if (!attendance?.length) {
			setErrorMessage('No attendance found')
			return
		}
		const validAttendance = attendance?.map((e) => ({
			student: e?.student,
			attendanceStatus: e?.attendanceStatus,
		}))
		const studentAttendance = {
			karateClass: attendanceData?.karateClass?._id,
			date: attendanceData?.date,
			attendance: validAttendance,
		}

		if (attendanceData?._id) {
			dispatch(updateStudentAttendanceById(attendanceData?._id, { attendance: validAttendance }))
		} else {
			dispatch(registerStudentAttendance(studentAttendance))
		}
	}
	const handleSelectStudent = (studentId: string) => {
		setAttendance((prev) =>
			prev.map((item) => {
				if (item?.student === studentId) {
					item.attendanceStatus = item.attendanceStatus === 'present' ? 'absent' : 'present'
				}
				return item
			}),
		)
	}
	//MEMORIZE CONSTANTS
	const { presents, absents, late } = useMemo(() => {
		const presents = attendance?.filter((student) => student?.attendanceStatus === 'present')?.length
		const absents = attendance?.filter((student) => student?.attendanceStatus === 'absent')?.length
		const late = attendance?.filter((student) => student?.attendanceStatus === 'late')?.length

		return { presents, absents, late }
	}, [attendance])

	return (
		<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
			{(loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById) && (
				<CustomBackdrop
					openBackdrop={Boolean(loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById)}
					label='Loading ...'
				/>
			)}
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-start',
				}}
			>
				<ScreenHeader
					label={attendanceData?.karateClass?.name}
					labelButton='Save'
					iconName='save'
					disabledButton={loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
					handleOnPress={handleSaveAtendance}
					showBackButton={true}
					handleBack={closeModal}
				/>
				<View
					style={{
						width: '100%',
						backgroundColor: '#E5E7EB',
						padding: 10,
						height: 50,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ flexDirection: 'row', gap: 10 }}>
						{Boolean(presents) && (
							<View
								style={{
									backgroundColor: 'green',
									padding: 5,
									width: 30,
									height: 30,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '50%',
								}}
							>
								<Text style={{ color: 'white' }}>{presents}</Text>
							</View>
						)}
						{Boolean(absents) && (
							<View
								style={{
									backgroundColor: 'red',
									padding: 5,
									width: 30,
									height: 30,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '50%',
								}}
							>
								<Text style={{ color: 'white' }}>{absents}</Text>
							</View>
						)}
						{Boolean(late) && (
							<View
								style={{
									backgroundColor: 'skyblue',
									padding: 5,
									width: 30,
									height: 30,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '50%',
								}}
							>
								<Text style={{ color: 'white' }}>{late}</Text>
							</View>
						)}
					</View>
					<Text>Total: {attendance?.length}</Text>
				</View>
				{(errorMessage || errorRegisterStudentAttendance || errorUpdateStudentAttendanceById) && (
					<Text
						style={{
							textAlign: 'center',
							fontSize: 13,
							color: 'red',
						}}
					>
						{errorMessage || errorRegisterStudentAttendance || errorUpdateStudentAttendanceById}
					</Text>
				)}
				<ScrollView>
					<FlatList
						nestedScrollEnabled={true}
						scrollEnabled={false}
						data={attendance.sort((a, b) => a?.name?.localeCompare(b?.name))}
						renderItem={({ item }) => (
							<Pressable
								onPress={() => handleSelectStudent(item.student)}
								disabled={loadingRegisterStudentAttendance || loadingUpdateStudentAttendanceById}
							>
								<View
									style={{
										flex: 1,
										paddingLeft: 15,
										paddingRight: 15,
										paddingTop: 15,
										alignItems: 'flex-start',
									}}
								>
									<View
										style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
									>
										<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
											<Image
												source={require('@/assets/img/default-avatar.png')}
												style={{ width: 50, height: 50, borderRadius: 50 }}
												resizeMode='contain'
											/>
											<View
												style={{
													justifyContent: 'center',
													alignItems: 'flex-start',
													width: '100%',
													flexDirection: 'column',
												}}
											>
												<Text style={{ fontWeight: 400, fontSize: 16 }}>{capitalizeWords(item.name)}</Text>
												<Text style={{ fontSize: 15, color: 'grey' }}>{capitalizeWords(item?.lastName)}</Text>
											</View>
										</View>
										{item.attendanceStatus === 'present' && <AntDesign name='check' size={24} color='green' />}
										{item.attendanceStatus === 'absent' && <AntDesign name='close' size={24} color='red' />}
										{/* {item.attendanceStatus === 'late' && <AntDesign name='hourglass' size={24} color='skyblue' />}*/}
									</View>
									<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
								</View>
							</Pressable>
						)}
						keyExtractor={(item) => item.student}
					/>
				</ScrollView>
			</View>
		</Modal>
	)
}

export default AttendanceEditModal
