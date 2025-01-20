import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
import { useSegments } from 'expo-router'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomBackdrop from '@/components/CustmBackdrop/CustomBackdrop'
import ClassRegisterModal from './components/ClassRegisterModal'
import ClassEditModal from './components/ClassEditModal'
import { IClass } from './helpers/karate-classes-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getkarateClassesByAdmin } from '@/redux/actions/karateClassActions'

const ClassesScreen = () => {
	const dispatch = useAppDispatch()
	const segments = useSegments()

	const [karateClasses, setKarateClasses] = useState<IClass[]>([])
	const [openClassRegisterModal, setOpenClassRegisterModal] = useState<boolean>(false)
	const [openClassEditModal, setOpenClassEditModal] = useState<boolean>(false)
	const [classIdSelected, setClassIdSelected] = useState<string>('')
	const [classNameSelected, setClassNameSelected] = useState<string>('')

	const {
		loadingKarateClassesByAdmin,
		successKarateClassesByAdmin,
		karateClassesByAdminList,
		errorKarateClassesByAdmin,
	} = useAppSelector((state: RootState) => state.getKarateClassesByAdmin)
	const { successRegisterKarateClass, karateClassRegistered } = useAppSelector(
		(state: RootState) => state.registerKarateClass,
	)
	const { successUpdateKarateClassById, karateClassByIdUpdated } = useAppSelector(
		(state: RootState) => state.updateKarateClassById,
	)

	useEffect(() => {
		if (segments?.length < 2) {
			setKarateClasses([])
			dispatch(getkarateClassesByAdmin())
		}
	}, [segments])
	useEffect(() => {
		if (successKarateClassesByAdmin && karateClassesByAdminList) {
			setKarateClasses(karateClassesByAdminList)
		}
	}, [successKarateClassesByAdmin])
	useEffect(() => {
		if (successRegisterKarateClass) {
			setKarateClasses((prev) => [...prev, karateClassRegistered])
			setOpenClassRegisterModal(false)
		}
	}, [successRegisterKarateClass])
	useEffect(() => {
		if (successUpdateKarateClassById) {
			setKarateClasses((prev) =>
				prev.map((karateClass) => {
					if (karateClass._id === karateClassByIdUpdated._id) {
						karateClass.name = karateClassByIdUpdated.name
						karateClass.description = karateClassByIdUpdated.description
						karateClass.students = karateClassByIdUpdated.students
					}
					return karateClass
				}),
			)
			setOpenClassEditModal(false)
		}
	}, [successUpdateKarateClassById])

	const handleClassSelect = (classId: string, className: string) => {
		setClassIdSelected(classId)
		setClassNameSelected(className)
		setOpenClassEditModal(true)
	}

	return (
		<>
			{loadingKarateClassesByAdmin && (
				<CustomBackdrop openBackdrop={loadingKarateClassesByAdmin} label='Loading data ...' />
			)}
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<ScreenHeader
					label='Classes'
					labelButton='Add'
					handleOnPress={() => setOpenClassRegisterModal(true)}
					disabledButton={loadingKarateClassesByAdmin}
					iconName='plus'
				/>
				<View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
					<ScrollView>
						{errorKarateClassesByAdmin && !karateClasses?.length ? (
							<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
								<Text style={{ fontSize: 16, color: 'red' }}>{errorKarateClassesByAdmin}</Text>
							</View>
						) : (
							<FlatList
								data={karateClasses}
								keyExtractor={(item) => item._id}
								nestedScrollEnabled={true}
								scrollEnabled={false}
								renderItem={({ item }) => (
									<Pressable key={item._id} onPress={() => handleClassSelect(item._id, item.name)}>
										<View
											style={{
												width: '100%',
												flex: 1,
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<View style={{ flex: 1, padding: 10, paddingHorizontal: 15, alignItems: 'flex-start' }}>
												<Text numberOfLines={1} style={{ fontWeight: 400, fontSize: 16 }}>
													{item.name}
												</Text>
												<Text numberOfLines={1} style={{ fontSize: 15, color: 'grey' }}>
													{item?.description}
												</Text>
											</View>
											<View
												style={{
													flexDirection: 'row',
													alignItems: 'center',
													padding: 10,
													paddingHorizontal: 15,
												}}
											>
												<Text style={{ color: item.students.length ? '' : 'red' }}>
													{item.students.length} student{item.students.length ? 's' : ''}
												</Text>
											</View>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
									</Pressable>
								)}
							/>
						)}
					</ScrollView>
				</View>
			</View>
			{openClassRegisterModal && (
				<ClassRegisterModal openModal={openClassRegisterModal} closeModal={() => setOpenClassRegisterModal(false)} />
			)}
			{openClassEditModal && (
				<ClassEditModal
					openModal={openClassEditModal}
					closeModal={() => [setOpenClassEditModal(false), setClassIdSelected('')]}
					classId={classIdSelected}
					className={classNameSelected}
				/>
			)}
		</>
	)
}

export default ClassesScreen
