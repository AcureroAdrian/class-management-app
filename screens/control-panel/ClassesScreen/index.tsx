import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, FlatList, Pressable } from 'react-native'
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
import * as S from './styles'

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
			<S.ScreenContainer>
				<ScreenHeader
					label='Classes'
					labelButton={role === 'admin' ? 'Add' : undefined}
					handleOnPress={() => [setOpenClassRegisterModal(true), setDeleteId('')]}
					disabledButton={loadingKarateClassesByAdmin || loadingKarateClassesForStudent}
					iconName={role === 'admin' ? 'plus' : undefined}
				/>
				<S.ContentContainer>
					{loadingKarateClassesByAdmin || loadingKarateClassesForStudent ? (
						<S.LoaderContainer>
							<Loader text='Loading classes' />
						</S.LoaderContainer>
					) : (errorKarateClassesByAdmin || errorKarateClassesForStudent) && !karateClasses?.length ? (
						<S.ErrorContainer>
							<S.ErrorText>
								{errorKarateClassesByAdmin || errorKarateClassesForStudent}
							</S.ErrorText>
						</S.ErrorContainer>
					) : (
						<>
							{role === 'student' && (
								<S.StudentInfoContainer>
									<S.RecoveryCreditsText>
										You have {recoveryClassCredits} absences to recover in the following classes
									</S.RecoveryCreditsText>
									<S.ReservedInfoContainer>
										<S.ReservedText>Reserved: </S.ReservedText>
										<MaterialCommunityIcons name='star' size={20} color={colors.view.tertiary} />
									</S.ReservedInfoContainer>
								</S.StudentInfoContainer>
							)}
							<S.ListContainer>
								<ScrollView>
									<FlatList
										data={karateClasses}
										keyExtractor={(item) => item._id}
										nestedScrollEnabled={true}
										scrollEnabled={false}
										renderItem={({ item, index }) => (
											<>
												<S.ClassItem
													key={item._id}
													onPress={() => [handleClassSelect(item._id), setDeleteId('')]}
													onLongPress={() => role === 'admin' && handleSelectDeleteClass(item._id)}
												>
													<S.ClassInfo>
														<S.ClassName>
															{item.name?.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
														</S.ClassName>
														<S.ClassDescription>
															{item.description
																? item?.description?.length > 20
																	? item.description.substring(0, 20) + '...'
																	: item.description
																: 'No description'}
														</S.ClassDescription>
													</S.ClassInfo>
													<S.ClassDetails>
														<S.ClassDetailsInfo>
															<S.StudentsCount hasStudents={Boolean(item.students.length)}>
																{item.students.length} student{item.students.length ? 's' : ''}
															</S.StudentsCount>
															{item.weekDays && item.weekDays.length > 0 && item.startTime && (
																<S.ScheduleText>
																	{formatClassSchedule(item.weekDays, item.startTime, role)}
																</S.ScheduleText>
															)}
															{item.location && (
																<S.LocationText location={item.location}>
																	{item.location === 'spring'
																		? 'Spring'
																		: item.location === 'katy'
																			? 'Katy'
																			: item.location}
																</S.LocationText>
															)}
															
														</S.ClassDetailsInfo>
														{item._id === deleteId && (
															<S.DeleteButtonContainer onPress={handleShowConfirmationModal}>
																<MaterialCommunityIcons name='delete' size={24} color={colors.view.secondary} />
															</S.DeleteButtonContainer>
														)}
														{role === 'student' && item?.recoveryClass && (
															<S.StarContainer>
																<MaterialCommunityIcons name='star' size={24} color={colors.view.tertiary} />
															</S.StarContainer>
														)}
													</S.ClassDetails>
												</S.ClassItem>
												{karateClasses?.length !== index + 1 && (
													<S.Separator/>
												)}
											</>
										)}
									/>
								</ScrollView>
							</S.ListContainer>
						</>
					)}
				</S.ContentContainer>
			</S.ScreenContainer>
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
