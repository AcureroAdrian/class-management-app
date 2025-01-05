import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ActivityIndicator, ScrollView, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSegments } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { InnerContainer } from '@/components/styles'
import { IStudent } from './helpers/students-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getStudentUsers } from '@/redux/actions/userActions'

const StudentsScreen = () => {
	const insets = useSafeAreaInsets()
	const dispatch = useAppDispatch()
	const segments: string[] = useSegments()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [students, setStudents] = useState<IStudent[]>([])

	const { loadingGetStudentUsers, studentUsersList, successGetStudentUsers, errorGetStudentUsers } = useAppSelector(
		(state: RootState) => state.getStudentUsers,
	)

	useEffect(() => {
		if (segments[1] === 'students') {
			dispatch(getStudentUsers())
		}
	}, [segments])
	useEffect(() => {
		if (successGetStudentUsers && studentUsersList) {
			setStudents(studentUsersList)
		}
	}, [successGetStudentUsers])
	useEffect(() => {
		if (errorGetStudentUsers) {
			handleMessageError(errorGetStudentUsers)
		}
	}, [errorGetStudentUsers])

	const handleMessageError = (message: string | null) => {
		setErrorMessage(message)
	}

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'flex-start',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					backgroundColor: '#D93B3D',
					width: '100%',
					paddingTop: insets.top + 10,
					paddingBottom: 5,
					paddingLeft: 15,
					paddingRight: 15,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text style={{ color: 'white', fontSize: 24 }}>Students</Text>
				<Pressable onPress={() => console.log('press add')} disabled={loadingGetStudentUsers}>
					<AntDesign name='plus' size={24} color='white' style={{ opacity: loadingGetStudentUsers ? 0.5 : 1 }} />
				</Pressable>
			</View>
			<InnerContainer>
				{loadingGetStudentUsers ? (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
							height: '100%',
							flexDirection: 'column',
							gap: 10,
						}}
					>
						<ActivityIndicator size={'large'} />
						<Text>Loading data...</Text>
					</View>
				) : (
					<ScrollView>
						{errorMessage ? (
							<Text>{errorMessage}</Text>
						) : (
							<ScrollView>
								{students.map((student) => (
									<View
										style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, alignItems: 'flex-start' }}
										key={student._id}
									>
										<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
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
												<Text style={{ fontWeight: 400, fontSize: 16 }}>{student.name}</Text>
												<Text style={{ fontSize: 15, color: 'grey' }}>{student?.lastName}</Text>
											</View>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
									</View>
								))}
							</ScrollView>
						)}
					</ScrollView>
				)}
			</InnerContainer>
		</View>
	)
}

export default StudentsScreen
