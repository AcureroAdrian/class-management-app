import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSegments } from 'expo-router'
import { InnerContainer } from '@/components/styles'
import HeaderScreen from '@/components/HeaderScreen/HeaderScreen'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import ClassRegisterModal from './components/ClassRegisterModal'
import { IClass } from './helpers/karate-classes-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getkarateClassesByAdmin } from '@/redux/actions/karateClassActions'

const ClassesScreen = () => {
	const dispatch = useAppDispatch()
	const segments = useSegments()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [karateClasses, setKarateClasses] = useState<IClass[]>([])
	const [openClassRegisterModal, setOpenClassRegisterModal] = useState<boolean>(false)

	const {
		loadingKarateClassesByAdmin,
		successKarateClassesByAdmin,
		karateClassesByAdminList,
		errorKarateClassesByAdmin,
	} = useAppSelector((state: RootState) => state.getKarateClassesByAdmin)
	const { successRegisterKarateClass, karateClassRegistered } = useAppSelector(
		(state: RootState) => state.registerKarateClass,
	)

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
	useEffect(() => {
		if (successRegisterKarateClass) {
			setKarateClasses((prev) => [...prev, karateClassRegistered])
			setOpenClassRegisterModal(false)
		}
	}, [successRegisterKarateClass])

	const handleMessageError = (message: string | null) => {
		setErrorMessage(message)
	}

	return (
		<>
			{loadingKarateClassesByAdmin && (
				<CustomBackdrop openBackdrop={loadingKarateClassesByAdmin} label='Loading data ...' />
			)}
			<KeyboardAvoidingWrapper>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<HeaderScreen
						label='Classes'
						labelButton='Add'
						handleOnPress={() => setOpenClassRegisterModal(true)}
						disabledButton={loadingKarateClassesByAdmin}
						iconName='plus'
					/>
					<InnerContainer>
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
						{/* )} */}
					</InnerContainer>
				</View>
			</KeyboardAvoidingWrapper>
			{openClassRegisterModal && (
				<ClassRegisterModal openModal={openClassRegisterModal} closeModal={() => setOpenClassRegisterModal(false)} />
			)}
		</>
	)
}

export default ClassesScreen
