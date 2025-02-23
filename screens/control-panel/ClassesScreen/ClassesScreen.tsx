import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
import { useSegments } from 'expo-router'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import ClassRegisterModal from './components/ClassRegisterModal'
import ClassEditModal from './components/ClassEditModal'
import { IClass } from './helpers/karate-classes-interfaces'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { deletekarateClassById, getkarateClassesByAdmin } from '@/redux/actions/karateClassActions'
import Loader from '@/components/Loader/Loader'
import { AntDesign } from '@expo/vector-icons'
import ConfirmationDeleteModal from '@/components/ConfirmationDeleteModal/ConfirmationDeleteModal'
import { DELETE_KARATE_CLASS_BY_ID_RESET } from '@/redux/constants/karateClassConstants'

const ClassesScreen = () => {
	const dispatch = useAppDispatch()
	const segments = useSegments()

	const [karateClasses, setKarateClasses] = useState<IClass[]>([])
	const [openClassRegisterModal, setOpenClassRegisterModal] = useState<boolean>(false)
	const [openClassEditModal, setOpenClassEditModal] = useState<boolean>(false)
	const [classIdSelected, setClassIdSelected] = useState<string>('')
	const [classNameSelected, setClassNameSelected] = useState<string>('')
	const [deleteId, setDeleteId] = useState<string>('')
	const [openConfirmationDeleteModal, setOpenConfirmationDeleteModal] = useState<boolean>(false)

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
	const { loadingDeleteKarateClassById, successDeleteKarateClassById, karateClassDeleted, errorDeleteKarateClassById } =
		useAppSelector((state: RootState) => state.deleteKarateClassById)

	useEffect(() => {
		if (segments?.length < 2) {
			setKarateClasses([])
			dispatch(getkarateClassesByAdmin())
		}
	}, [segments])
	useEffect(() => {
		if (successKarateClassesByAdmin && karateClassesByAdminList) {
			setDeleteId('')
			setKarateClasses(karateClassesByAdminList)
		}
	}, [successKarateClassesByAdmin])
	useEffect(() => {
		if (successRegisterKarateClass) {
			setDeleteId('')
			setKarateClasses((prev) => [...prev, karateClassRegistered])
			setOpenClassRegisterModal(false)
		}
	}, [successRegisterKarateClass])
	useEffect(() => {
		if (successUpdateKarateClassById) {
			setDeleteId('')
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
	useEffect(() => {
		if (successDeleteKarateClassById) {
			setDeleteId('')
			setKarateClasses((prev) => prev.filter((karateClass) => karateClass._id !== karateClassDeleted?.karateClassId))
			setOpenConfirmationDeleteModal(false)
		}
	}, [successDeleteKarateClassById])

	const handleClassSelect = (classId: string, className: string) => {
		setClassIdSelected(classId)
		setClassNameSelected(className)
		setOpenClassEditModal(true)
	}
	const handleSelectDeleteClass = (classId: string) => {
		setDeleteId(deleteId === classId ? '' : classId)
	}
	const handleShowConfirmationModal = () => {
		setOpenConfirmationDeleteModal(true)
	}
	const handleConfirmDeleteStudent = () => {
		dispatch(deletekarateClassById(deleteId))
	}

	return (
		<>
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
					handleOnPress={() => [setOpenClassRegisterModal(true), setDeleteId('')]}
					disabledButton={loadingKarateClassesByAdmin}
					iconName='plus'
				/>
				<View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
					{loadingKarateClassesByAdmin ? (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
							<Loader text='Loading classes' />
						</View>
					) : errorKarateClassesByAdmin && !karateClasses?.length ? (
						<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
							<Text style={{ fontSize: 16, color: 'red' }}>{errorKarateClassesByAdmin}</Text>
						</View>
					) : (
						<ScrollView>
							<FlatList
								data={karateClasses}
								keyExtractor={(item) => item._id}
								nestedScrollEnabled={true}
								scrollEnabled={false}
								renderItem={({ item }) => (
									<>
										<View
											style={{
												width: '100%',
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<Pressable
												key={item._id}
												onPress={() => [handleClassSelect(item._id, item.name), setDeleteId('')]}
												onLongPress={() => handleSelectDeleteClass(item._id)}
												style={{ width: '60%' }}
											>
												<View style={{ width: '100%', padding: 10, paddingHorizontal: 15, alignItems: 'flex-start' }}>
													<Text numberOfLines={1} style={{ fontWeight: 400, fontSize: 16 }}>
														{item.name?.length > 25 ? item.name.substring(0, 25) + '...' : item.name}
													</Text>
													<Text numberOfLines={1} style={{ fontSize: 15, color: 'grey' }}>
														{item?.description}
													</Text>
												</View>
											</Pressable>
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'flex-end',
													alignItems: 'center',
													padding: 15,
													width: '40%',
												}}
											>
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
												<View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
													<Pressable onPress={handleShowConfirmationModal}>
														{item._id === deleteId && <AntDesign name='delete' size={20} color='red' />}
													</Pressable>
												</View>
											</View>
										</View>
										<View style={{ width: '100%', height: 1, backgroundColor: 'lightgrey', marginTop: 10 }} />
									</>
								)}
							/>
						</ScrollView>
					)}
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
			{openConfirmationDeleteModal && (
				<ConfirmationDeleteModal
					openModal={openConfirmationDeleteModal}
					closeModal={() => [
						setOpenConfirmationDeleteModal(false),
						dispatch({ type: DELETE_KARATE_CLASS_BY_ID_RESET }),
					]}
					title='Are you sure you want to delete this class?'
					handleConfirm={handleConfirmDeleteStudent}
					loadingDelete={loadingDeleteKarateClassById}
					errorDelete={errorDeleteKarateClassById}
				/>
			)}
		</>
	)
}

export default ClassesScreen
