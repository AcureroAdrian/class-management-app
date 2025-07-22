import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, FlatList, Pressable, Modal, View, TouchableOpacity } from 'react-native'
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
import { getNextClassDateForSorting } from './helpers/get-next-class-date'
import { applyFilters } from './helpers/filter-classes'
import ClassFilters from './components/ClassFilters'
import { TDaysOfWeek, TLocation } from '@/shared/common-types'
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
	const [recoveryCreditsAdjustment, setRecoveryCreditsAdjustment] = useState<number>(0)
	const [openReserveRecoveryClassModal, setOpenReserveRecoveryClassModal] = useState<boolean>(false)
	const [openDeleteRecoveryClassModal, setOpenDeleteRecoveryClassModal] = useState<boolean>(false)
	const [recoveryClassIdSelected, setRecoveryClassIdSelected] = useState<string>('')
	
	// Filter states
	const [selectedDays, setSelectedDays] = useState<TDaysOfWeek[]>([])
	const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all')
	const [selectedLocation, setSelectedLocation] = useState<TLocation | 'all'>('all')
	const [showFiltersModal, setShowFiltersModal] = useState(false)

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
			setRecoveryCreditsAdjustment(karateClassesForStudentList.recoveryCreditsAdjustment || 0)
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
			if (role === 'student') {
				dispatch(getkarateClassesForStudent())
			}
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
			if (role === 'student') {
				dispatch(getkarateClassesForStudent())
			}
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

	// Filter handlers
	const handleDayToggle = (day: TDaysOfWeek) => {
		setSelectedDays((prev) => {
			if (prev.includes(day)) {
				return prev.filter((d) => d !== day)
			} else {
				return [...prev, day]
			}
		})
	}

	const handleTimeRangeChange = (range: string) => {
		setSelectedTimeRange(range)
	}

	const handleLocationChange = (location: TLocation | 'all') => {
		setSelectedLocation(location)
	}

	const handleClearFilters = () => {
		setSelectedDays([])
		setSelectedTimeRange('all')
		setSelectedLocation('all')
	}
	const karateClassSelected = useMemo(() => {
		if (!classIdSelected) return null

		const classSelected = karateClasses.find((karateClass) => karateClass._id === classIdSelected)
		return classSelected
	}, [classIdSelected])
	const recoveryClassCredits = useMemo(() => {
		const unbookedAbsences = (recoveryClasses || []).filter((e) => !e?.recoveryClass)?.length
		return unbookedAbsences + recoveryCreditsAdjustment
	}, [recoveryClasses, recoveryCreditsAdjustment])

	const attendanceIdToUse = useMemo(() => {
		const unbookedAbsences = (recoveryClasses || []).filter((e) => !e?.recoveryClass)
		if (unbookedAbsences.length > 0) {
			return unbookedAbsences[0]?._id
		}
		return undefined
	}, [recoveryClasses])

	// Aplicar filtros y ordenar las clases por fecha (más cercana primero)
	const filteredAndSortedKarateClasses = useMemo(() => {
		// Aplicar filtros
		const filteredClasses = applyFilters(karateClasses, selectedDays, selectedTimeRange, selectedLocation)
		
		// Ordenar por fecha
		return filteredClasses.sort((a, b) => {
			// Si una clase no tiene días de la semana, ponerla al final
			if (!a.weekDays || a.weekDays.length === 0) return 1
			if (!b.weekDays || b.weekDays.length === 0) return -1
			
			const dateA = getNextClassDateForSorting(a.weekDays)
			const dateB = getNextClassDateForSorting(b.weekDays)
			
			return dateA.getTime() - dateB.getTime()
		})
	}, [karateClasses, selectedDays, selectedTimeRange, selectedLocation])

	const renderClassCard = ({ item }: { item: IClass }) => (
		<S.ClassItemContainer>
			<S.ClassItem
				onPress={() => [handleClassSelect(item._id), setDeleteId('')]}
				onLongPress={() => role === 'admin' && handleSelectDeleteClass(item._id)}
				isSelected={deleteId === item._id}
			>
				{/* Header */}
				<S.ClassHeader>
					<S.ClassTitleContainer>
						<S.ClassName numberOfLines={1}>
							{item.name}
						</S.ClassName>
						<S.ClassDescription numberOfLines={2}>
							{item.description || 'No description'}
						</S.ClassDescription>
					</S.ClassTitleContainer>
					<S.ClassInfoBadge>
						<S.StudentsCount hasStudents={Boolean(item.students.length)}>
							{item.students.length} student{item.students.length !== 1 ? 's' : ''}
						</S.StudentsCount>
					</S.ClassInfoBadge>
				</S.ClassHeader>

				{/* Metadata */}
				<S.ClassMetadata>
					<S.ClassMetadataLeft>
						{item.weekDays && item.weekDays.length > 0 && item.startTime && (
							<S.MetadataItem>
								<MaterialCommunityIcons name='calendar-clock' size={14} color={colors.variants.grey[4]} />
								<S.ScheduleText>
									{formatClassSchedule(item.weekDays, item.startTime, role)}
								</S.ScheduleText>
							</S.MetadataItem>
						)}
						{item.location && (
							<S.LocationBadge location={item.location}>
								<S.LocationText location={item.location}>
									{item.location === 'spring' ? 'Spring' : item.location === 'katy' ? 'Katy' : item.location}
								</S.LocationText>
							</S.LocationBadge>
						)}
					</S.ClassMetadataLeft>
				</S.ClassMetadata>

				{/* Actions */}
				<S.ClassActions>
					<S.ActionBadges>
						{role === 'student' && item?.recoveryClass && (
							<S.ActionBadge variant="reserved">
								<MaterialCommunityIcons name='star' size={12} color={colors.variants.secondary[5]} />
								<S.ActionText variant="reserved">Reserved</S.ActionText>
							</S.ActionBadge>
						)}
						{deleteId === item._id && (
							<S.ActionBadge variant="delete">
								<MaterialCommunityIcons name='delete' size={12} color={colors.variants.primary[5]} />
								<S.ActionText variant="delete">Delete</S.ActionText>
							</S.ActionBadge>
						)}
					</S.ActionBadges>
					
					{deleteId === item._id ? (
						<S.DeleteButtonContainer onPress={handleShowConfirmationModal}>
							<MaterialCommunityIcons name='delete' size={20} color={colors.variants.primary[5]} />
						</S.DeleteButtonContainer>
					) : (
						<S.ChevronIcon>
							<MaterialCommunityIcons name='chevron-right' size={20} color={colors.variants.grey[3]} />
						</S.ChevronIcon>
					)}
				</S.ClassActions>
			</S.ClassItem>
		</S.ClassItemContainer>
	)

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
							{/* Modal de Filtros */}
							<Modal
								visible={showFiltersModal}
								animationType='fade'
								transparent={true}
								onRequestClose={() => setShowFiltersModal(false)}
							>
								<Pressable
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.18)' }}
									onPress={() => setShowFiltersModal(false)}
								>
									<View style={{ width: '92%', maxWidth: 420, borderRadius: 20, overflow: 'hidden', backgroundColor: 'transparent', alignItems: 'center' }} onStartShouldSetResponder={() => true}>
										{/* Botón de cerrar centrado */}
										<View style={{ width: '100%', alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
											<TouchableOpacity
												style={{
													width: 40,
													height: 40,
													borderRadius: 8,
													backgroundColor: colors.variants.secondary[1],
													justifyContent: 'center',
													alignItems: 'center',
													elevation: 2,
													shadowColor: colors.variants.secondary[4],
													shadowOffset: { width: 0, height: 2 },
													shadowOpacity: 0.12,
													shadowRadius: 4,
												}}
												onPress={() => setShowFiltersModal(false)}
											>
												<MaterialCommunityIcons name='close' size={24} color={colors.variants.secondary[5]} />
											</TouchableOpacity>
										</View>
										<ClassFilters
											selectedDays={selectedDays}
											selectedTimeRange={selectedTimeRange}
											selectedLocation={selectedLocation}
											onDayToggle={handleDayToggle}
											onTimeRangeChange={handleTimeRangeChange}
											onLocationChange={handleLocationChange}
											onClearFilters={handleClearFilters}
										/>
									</View>
								</Pressable>
							</Modal>

							{/* FAB de filtro */}
							<TouchableOpacity
								style={{
									position: 'absolute',
									bottom: 32,
									right: 28,
									backgroundColor: showFiltersModal || selectedDays.length > 0 || selectedTimeRange !== 'all' || selectedLocation !== 'all' ? colors.variants.primary[4] : colors.variants.secondary[2],
									borderRadius: 28,
									padding: 16,
									elevation: 4,
									shadowColor: colors.variants.secondary[2],
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.18,
									shadowRadius: 8,
									zIndex: 10,
								}}
								onPress={() => setShowFiltersModal(true)}
							>
								<MaterialCommunityIcons name='filter-variant' size={28} color={colors.primary} />
							</TouchableOpacity>

							{role === 'student' && (
								<S.StudentInfoContainer>
									<S.StudentInfoCard>
										<S.StudentInfoAccent />
										<S.StudentInfoHeader>
											<S.StudentInfoTitle>Recovery Classes</S.StudentInfoTitle>
											<S.RecoveryCreditsContainer>
												<MaterialCommunityIcons name='account-clock' size={16} color={colors.primary} />
												<S.RecoveryCreditsText>{recoveryClassCredits}</S.RecoveryCreditsText>
											</S.RecoveryCreditsContainer>
										</S.StudentInfoHeader>
										<S.StudentInfoDescription>
											You have {recoveryClassCredits} absences to recover in the following classes
										</S.StudentInfoDescription>
										<S.ReservedInfoContainer>
											<MaterialCommunityIcons name='star' size={16} color={colors.variants.secondary[5]} />
											<S.ReservedText>Reserved classes are marked with a star</S.ReservedText>
										</S.ReservedInfoContainer>
									</S.StudentInfoCard>
								</S.StudentInfoContainer>
							)}
							<S.ListContainer>
								<ScrollView 
									style={{ flex: 1 }}
									contentContainerStyle={{ paddingTop: 16, paddingBottom: 85 }}
									showsVerticalScrollIndicator={false}
								>
									<FlatList
										data={filteredAndSortedKarateClasses}
										keyExtractor={(item) => item._id}
										nestedScrollEnabled={true}
										scrollEnabled={false}
										renderItem={renderClassCard}
										ItemSeparatorComponent={() => null}
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
					attendanceId={attendanceIdToUse}
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
					loadingDelete={!!loadingDeleteRecoveryClassById}
					errorDelete={errorDeleteRecoveryClassById || ''}
				/>
			)}
		</>
	)
}

export default ClassesScreen
