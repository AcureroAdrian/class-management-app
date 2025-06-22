import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
import { useSegments } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ConfirmationDeleteModal from '@/components/ConfirmationDeleteModal/ConfirmationDeleteModal'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import Loader from '@/components/Loader/Loader'
import ClassRegisterModal from './components/ClassRegisterModal'
import ClassEditModal from './components/ClassEditModal'
import { IClass } from './helpers/karate-classes-interfaces'
import { TUserRole } from '@/shared/common-types'
import {
	deletekarateClassById,
	getkarateClassesByAdmin,
	getkarateClassesForStudent,
} from '@/redux/actions/karateClassActions'
import {
	DELETE_KARATE_CLASS_BY_ID_RESET,
	GET_KARATE_CLASS_BY_ADMIN_RESET,
	GET_KARATE_CLASSES_FOR_STUDENT_RESET,
} from '@/redux/constants/karateClassConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import ReserveRecoveryClassModal from './components/ReserveRecoveryClassModal'
import DeleteRecoveryClassModal from './components/DeleteRecoveryClassModal'
import { deleteRecoveryClassById } from '@/redux/actions/recoveryClassActions'
import { DELETE_RECOVERY_CLASS_BY_ID_RESET } from '@/redux/constants/recoveryClassConstants'
import { formatClassSchedule } from './helpers/format-class-schedule'

const ClassesScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()
	const segments = useSegments()

	const [karateClasses, setKarateClasses] = useState<IClass[]>([])
	const [openClassRegisterModal, setOpenClassRegisterModal] = useState<boolean>(false)
	const [openClassEditModal, setOpenClassEditModal] = useState<boolean>(false)
	const [classIdSelected, setClassIdSelected] = useState<string>('')
	const [deleteId, setDeleteId] = useState<string>('')
	const [openConfirmationDeleteModal, setOpenConfirmationDeleteModal] = useState<boolean>(false)
	const [recoveryClasses, setRecoveryClasses] = useState<any[]>([])
	const [openReserveRecoveryClassModal, setOpenReserveRecoveryClassModal] = useState<boolean>(false)
	const [openDeleteRecoveryClassModal, setOpenDeleteRecoveryClassModal] = useState<boolean>(false)
	const [recoveryClassIdSelected, setRecoveryClassIdSelected] = useState<string>('')

	const {
		loadingKarateClassesByAdmin,
		successKarateClassesByAdmin,
		karateClassesByAdminList,
		errorKarateClassesByAdmin,
	} = useAppSelector((state) => state.getKarateClassesByAdmin)
	const {
		loadingKarateClassesForStudent,
		successKarateClassesForStudent,
		karateClassesForStudentList,
		errorKarateClassesForStudent,
	} = useAppSelector((state) => state.getKarateClassesForStudent)
	const { successRegisterKarateClass, karateClassRegistered } = useAppSelector((state) => state.registerKarateClass)
	const { successUpdateKarateClassById, karateClassByIdUpdated } = useAppSelector(
		(state) => state.updateKarateClassById,
	)
	const { loadingDeleteKarateClassById, successDeleteKarateClassById, karateClassDeleted, errorDeleteKarateClassById } =
		useAppSelector((state) => state.deleteKarateClassById)
	const { successBookingRecoveryClassById, recoveryClassBooked } = useAppSelector(
		(state) => state.bookingRecoveryClassById,
	)
	const {
		loadingDeleteRecoveryClassById,
		successDeleteRecoveryClassById,
		recoveryClassDeleted,
		errorDeleteRecoveryClassById,
	} = useAppSelector((state) => state.deleteRecoveryClassById)

	useEffect(() => {
		if (segments?.length < 2) {
			setKarateClasses([])
			if (role === 'admin') {
				dispatch(getkarateClassesByAdmin())
			} else if (role === 'student') {
				dispatch(getkarateClassesForStudent())
			}
		}
		return () => {
			dispatch({ type: GET_KARATE_CLASS_BY_ADMIN_RESET })
			dispatch({ type: GET_KARATE_CLASSES_FOR_STUDENT_RESET })
		}
	}, [segments])

	useEffect(() => {
		if (successKarateClassesByAdmin && karateClassesByAdminList) {
			setDeleteId('')
			setKarateClasses(karateClassesByAdminList)
		}
	}, [successKarateClassesByAdmin])

	useEffect(() => {
		if (successKarateClassesForStudent && karateClassesForStudentList) {
			setDeleteId('')
			setKarateClasses(karateClassesForStudentList.karateClasses)
			setRecoveryClasses(karateClassesForStudentList.absents)
		}
	}, [successKarateClassesForStudent])

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

	useEffect(() => {
		if (successBookingRecoveryClassById) {
			setRecoveryClasses((prev) =>
				prev.map((recoveryClass) => {
					if (recoveryClass._id === recoveryClassBooked.attendance) {
						recoveryClass.recoveryClass = recoveryClassBooked
					}
					return recoveryClass
				}),
			)
			setKarateClasses((prev) =>
				prev.map((karateClass) => {
					if (karateClass._id === recoveryClassBooked.karateClass) {
						karateClass.recoveryClass = recoveryClassBooked
					}
					return karateClass
				}),
			)
			setOpenReserveRecoveryClassModal(false)
		}
	}, [successBookingRecoveryClassById])

	useEffect(() => {
		if (successDeleteRecoveryClassById) {
			setRecoveryClasses((prev) =>
				prev.map((recoveryClass) => {
					if (recoveryClass?.recoveryClass?._id === recoveryClassDeleted?.recoveryClassId) {
						recoveryClass.recoveryClass = undefined
					}
					return recoveryClass
				}),
			)
			setKarateClasses((prev) =>
				prev.map((karateClass) => {
					if (karateClass?.recoveryClass?._id === recoveryClassDeleted?.recoveryClassId) {
						karateClass.recoveryClass = undefined
					}
					return karateClass
				}),
			)
			setOpenDeleteRecoveryClassModal(false)
		}
	}, [successDeleteRecoveryClassById])

	const handleClassSelect = (classId: string) => {
		setClassIdSelected(classId)
		if (role === 'admin') {
			setOpenClassEditModal(true)
		} else if (role === 'student') {
			const classSelected = karateClasses.find((karateClass) => karateClass._id === classId)
			if (classSelected?.recoveryClass) {
				setRecoveryClassIdSelected(classSelected?.recoveryClass?._id)
				setOpenDeleteRecoveryClassModal(true)
			} else if (recoveryClassCredits) {
				setOpenReserveRecoveryClassModal(true)
			}
		}
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
	const handleDeleteRecoveryClass = () => {
		dispatch(deleteRecoveryClassById(recoveryClassIdSelected))
	}
	const karateClassSelected = useMemo(() => {
		if (!classIdSelected) return null

		const classSelected = karateClasses.find((karateClass) => karateClass._id === classIdSelected)
		return classSelected
	}, [classIdSelected])
	const recoveryClassCredits = useMemo(() => {
		return (recoveryClasses || []).filter((e) => !e?.recoveryClass)?.length
	}, [recoveryClasses])

	return (
		<>
			<View
				style={{
					flex: 1,
					width: '100%',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<ScreenHeader
					label='Classes'
					labelButton={role === 'admin' ? 'Add' : undefined}
					handleOnPress={() => [setOpenClassRegisterModal(true), setDeleteId('')]}
					disabledButton={loadingKarateClassesByAdmin || loadingKarateClassesForStudent}
					iconName={role === 'admin' ? 'plus' : undefined}
				/>
				<View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
					{loadingKarateClassesByAdmin || loadingKarateClassesForStudent ? (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
							<Loader text='Loading classes' />
						</View>
					) : (errorKarateClassesByAdmin || errorKarateClassesForStudent) && !karateClasses?.length ? (
						<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
							<Text style={{ fontSize: 16, color: 'red' }}>
								{errorKarateClassesByAdmin || errorKarateClassesForStudent}
							</Text>
						</View>
					) : (
						<>
							{role === 'student' && (
								<View style={{ width: '100%', alignItems: 'flex-start', marginVertical: 10, paddingHorizontal: 20 }}>
									<Text style={{ fontSize: 16, fontWeight: 500, color: colors.red }}>
										You have {recoveryClassCredits} absences to recover in the following classes
									</Text>
									<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
										<Text style={{ fontSize: 16, fontWeight: 500 }}>Reserved: </Text>
										<MaterialCommunityIcons name='star' size={20} color={colors.view.tertiary} />
									</View>
								</View>
							)}
							<View style={{ width: '100%', flex: 1, alignItems: 'center', paddingVertical: 1 }}>
								<ScrollView>
									<FlatList
										data={karateClasses}
										keyExtractor={(item) => item._id}
										nestedScrollEnabled={true}
										scrollEnabled={false}
										renderItem={({ item, index }) => (
											<>
												<Pressable
													key={item._id}
													onPress={() => [handleClassSelect(item._id), setDeleteId('')]}
													onLongPress={() => role === 'admin' && handleSelectDeleteClass(item._id)}
													style={{
														width: '100%',
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'space-between',
														padding: 20,
													}}
												>
													<View style={{ width: '60%', alignItems: 'flex-start', gap: 10 }}>
														<Text style={{ fontSize: 18, color: colors.view.black }}>
															{item.name?.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
														</Text>
														<Text style={{ fontSize: 16, color: colors.variants.grey[4] }}>
															{item.description
																? item?.description?.length > 20
																	? item.description.substring(0, 20) + '...'
																	: item.description
																: 'No description'}
														</Text>
													</View>
													<View
														style={{
															flexDirection: 'row',
															justifyContent: 'flex-end',
															alignItems: 'center',
															width: '40%',
														}}
													>
														<View
															style={{
																alignItems: 'flex-end',
																paddingVertical: 10,
															}}
														>
															<Text style={{ color: item.students.length ? '' : colors.view.secondary }}>
																{item.students.length} student{item.students.length ? 's' : ''}
															</Text>
															{item.weekDays && item.weekDays.length > 0 && item.startTime && (
																<Text style={{ fontSize: 12, marginTop: 2, color: colors.view.grey[5] }}>
																	{formatClassSchedule(item.weekDays, item.startTime, role)}
																</Text>
															)}
															{item.location && (
																<Text
																	style={{
																		fontSize: 12,
																		marginTop: 2,
																		color:
																			item.location === 'spring'
																				? colors.variants.primary[4]
																				: item.location === 'katy'
																					? colors.variants.secondary[2]
																					: colors.variants.grey[5],
																		fontWeight: '500',
																	}}
																>
																	{item.location === 'spring'
																		? 'Spring'
																		: item.location === 'katy'
																			? 'Katy'
																			: item.location}
																</Text>
															)}
															
														</View>
														{item._id === deleteId && (
															<Pressable onPress={handleShowConfirmationModal}>
																<View
																	style={{
																		width: 40,
																		height: 50,
																		justifyContent: 'center',
																		alignItems: 'center',
																	}}
																>
																	<MaterialCommunityIcons name='delete' size={24} color={colors.view.secondary} />
																</View>
															</Pressable>
														)}
														{role === 'student' && item?.recoveryClass && (
															<View
																style={{
																	width: 40,
																	justifyContent: 'center',
																	alignItems: 'center',
																}}
															>
																<MaterialCommunityIcons name='star' size={24} color={colors.view.tertiary} />
															</View>
														)}
													</View>
												</Pressable>
												{karateClasses?.length !== index + 1 && (
													<View
														style={{
															width: '90%',
															alignSelf: 'center',
															height: 1,
															backgroundColor: colors.variants.grey[1],
														}}
													/>
												)}
											</>
										)}
									/>
								</ScrollView>
							</View>
						</>
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
			{openReserveRecoveryClassModal && (
				<ReserveRecoveryClassModal
					openModal={openReserveRecoveryClassModal}
					closeModal={() => [setOpenReserveRecoveryClassModal(false), setClassIdSelected('')]}
					startTime={karateClassSelected?.startTime!}
					weekDays={karateClassSelected?.weekDays!}
					location={karateClassSelected?.location!}
					karateClassId={karateClassSelected?._id!}
					karateClassName={karateClassSelected?.name || ''}
					attendanceId={recoveryClasses?.[0]?._id}
				/>
			)}
			{openDeleteRecoveryClassModal && (
				<DeleteRecoveryClassModal
					openModal={openDeleteRecoveryClassModal}
					closeModal={() => [
						setOpenDeleteRecoveryClassModal(false),
						setRecoveryClassIdSelected(''),
						dispatch({ type: DELETE_RECOVERY_CLASS_BY_ID_RESET }),
					]}
					handleDeleteRecoveryClass={handleDeleteRecoveryClass}
					loadingDelete={loadingDeleteRecoveryClassById}
					errorDelete={errorDeleteRecoveryClassById}
				/>
			)}
		</>
	)
}

export default ClassesScreen
