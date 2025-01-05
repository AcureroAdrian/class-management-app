import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSegments } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { InnerContainer } from '@/components/styles'
import { IClass } from './helpers/karate-classes-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getkarateClassesByAdmin } from '@/redux/actions/karateClassActions'

const ClassesScreen = () => {
	const insets = useSafeAreaInsets()
	const dispatch = useAppDispatch()
	const segments = useSegments()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [karateClasses, setKarateClasses] = useState<IClass[]>([])

	const {
		loadingKarateClassesByAdmin,
		successKarateClassesByAdmin,
		karateClassesByAdminList,
		errorKarateClassesByAdmin,
	} = useAppSelector((state: RootState) => state.getKarateClassesByAdmin)

	useEffect(() => {
		if (segments?.length < 2) {
			dispatch(getkarateClassesByAdmin())
		}
	}, [segments])
	useEffect(() => {
		if (successKarateClassesByAdmin && karateClassesByAdminList) {
			setKarateClasses(karateClassesByAdminList)
		}
	}, [successKarateClassesByAdmin])
	useEffect(() => {
		if (errorKarateClassesByAdmin) {
			handleMessageError(errorKarateClassesByAdmin)
		}
	}, [errorKarateClassesByAdmin])

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
				<Text style={{ color: 'white', fontSize: 24 }}>Classes</Text>
				<Pressable onPress={() => console.log('press add')} disabled={loadingKarateClassesByAdmin}>
					<AntDesign name='plus' size={24} color='white' style={{ opacity: loadingKarateClassesByAdmin ? 0.5 : 1 }} />
				</Pressable>
			</View>
			<InnerContainer>
				{loadingKarateClassesByAdmin ? (
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
								{karateClasses.map((karateClass) => (
									<View
										style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, alignItems: 'flex-start' }}
										key={karateClass._id}
									>
										<View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
											<Text style={{ fontWeight: 400, fontSize: 16 }}>{karateClass.name}</Text>
											<Text style={{ color: karateClass.students.length ? '' : 'red' }}>
												{karateClass.students.length} student{karateClass.students.length ? 's' : ''}
											</Text>
										</View>
										<Text style={{ fontSize: 15, color: 'grey' }}>{karateClass?.description}</Text>
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

export default ClassesScreen
