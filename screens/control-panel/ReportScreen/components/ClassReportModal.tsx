import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import ClassReportByClassIdDetailsModal from './ClassReportByClassIdDetailsModal'
import { IClassReport } from '../helpers/report-screen-interfaces'
import SelectClassModal from './SelectClassModal'
import { getClassReportByClassIdForAdmin } from '@/redux/actions/studentAttendanceActions'
import { GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_RESET } from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ClassReportModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [classId, setClassId] = useState<string>('all')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showStartDate, setShowStartDate] = useState<boolean>(false)
	const [showEndDate, setShowEndDate] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date>(new Date())
	const [endDate, setEndDate] = useState<Date>(new Date())
	const [openClassesModal, setOpenClassesModal] = useState<boolean>(false)
	const [classReportByClassId, setClassReportByClassId] = useState<IClassReport[]>([])
	const [openClassReportByClassIdModal, setOpenClassReportByClassIdModal] = useState<boolean>(false)

	const { karateClassesByAdminList } = useAppSelector((state) => state.getKarateClassesByAdmin)
	const {
		loadingClassReportByClassIdForAdmin,
		successClassReportByClassIdForAdmin,
		classReportByClassIdForAdminList,
		errorClassReportByClassIdForAdmin,
	} = useAppSelector((state) => state.getClassReportByClassIdForAdmin)

	useEffect(() => {
		if (successClassReportByClassIdForAdmin) {
			setClassReportByClassId(classReportByClassIdForAdminList || [])
			setOpenClassReportByClassIdModal(true)
			dispatch({ type: GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_RESET })
		}
	}, [successClassReportByClassIdForAdmin])
	useEffect(() => {
		if (errorClassReportByClassIdForAdmin) {
			setErrorMessage(errorClassReportByClassIdForAdmin)
			dispatch({ type: GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_RESET })
		}
	}, [errorClassReportByClassIdForAdmin])

	const onChangeStartDate = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || startDate
		setStartDate(currentDate)
		setShowStartDate(false)
	}
	const onChangeEndDate = (date: Date) => {
		setErrorMessage(null)
		const currentDate = date || endDate
		setEndDate(currentDate)
		setShowEndDate(false)
	}
	const selectClass = (classId: string) => {
		setClassId(classId)
		setOpenClassesModal(false)
	}
	const handleGenerateClassReport = () => {
		if (!startDate || !endDate) {
			setErrorMessage('Please select start and end dates.')
			return
		}

		dispatch(
			getClassReportByClassIdForAdmin(
				classId,
				format(new Date(startDate), 'yyyy-MM-dd'),
				format(new Date(endDate), 'yyyy-MM-dd'),
			),
		)
	}
	const classSelected = useMemo(() => {
		let result = 'All classes'
		if (classId !== 'all') {
			const karateClass = karateClassesByAdminList?.find((karateClass) => karateClass._id === classId)
			result = karateClass?.name
		}
		return result
	}, [karateClassesByAdminList, classId])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='Class Report' showBackButton={true} handleBack={closeModal} />
				
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
					showsVerticalScrollIndicator={false}
				>
					{/* Header Section */}
					<View style={{ marginBottom: 32 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
							<View style={{ 
								backgroundColor: colors.brand,
								borderRadius: 12,
								padding: 8,
								marginRight: 12
							}}>
								<MaterialCommunityIcons name="google-classroom" size={24} color={colors.view.primary} />
							</View>
							<Text style={{ 
								fontSize: 24, 
								fontWeight: '700', 
								color: colors.variants.secondary[5],
								flex: 1,
								letterSpacing: -0.5
							}}>
								Class Report
							</Text>
						</View>
						<Text style={{ 
							fontSize: 16, 
							color: colors.variants.grey[4],
							lineHeight: 22,
							marginLeft: 52,
							letterSpacing: -0.2
						}}>
							Select class and date range to generate the report
						</Text>
					</View>

					{/* Form Section */}
					<View style={{ 
						backgroundColor: colors.view.primary,
						borderRadius: 16,
						padding: 20,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.1,
						shadowRadius: 8,
						elevation: 3,
						borderWidth: 1,
						borderColor: colors.variants.secondary[1],
						marginBottom: 24
					}}>
						<Text style={{ 
							fontSize: 16, 
							fontWeight: '600', 
							color: colors.variants.secondary[5],
							marginBottom: 20,
							letterSpacing: -0.3
						}}>
							Report Configuration
						</Text>
						
						<View style={{ gap: 20 }}>
							{/* Class Selection */}
							<View>
								<Text style={{ 
									fontSize: 14, 
									fontWeight: '500', 
									color: colors.variants.secondary[4],
									marginBottom: 8,
									letterSpacing: -0.2
								}}>
									Class
								</Text>
								<CustomInputForm
									label=''
									value={classSelected}
									editable={false}
									onPress={() => !loadingClassReportByClassIdForAdmin && setOpenClassesModal(true)}
									icon='google-classroom'
								/>
							</View>

							{/* Date Range */}
							<View>
								<Text style={{ 
									fontSize: 14, 
									fontWeight: '500', 
									color: colors.variants.secondary[4],
									marginBottom: 8,
									letterSpacing: -0.2
								}}>
									Date Range
								</Text>
								<View style={{ flexDirection: 'row', gap: 12 }}>
									<View style={{ flex: 1 }}>
										<CustomInputForm
											label=''
											value={startDate ? format(new Date(startDate), 'MM/dd/yyyy') : ''}
											editable={false}
											onPress={() => !loadingClassReportByClassIdForAdmin && setShowStartDate(true)}
											icon='calendar-start'
										/>
									</View>
									<View style={{ flex: 1 }}>
										<CustomInputForm
											label=''
											value={endDate ? format(new Date(endDate), 'MM/dd/yyyy') : ''}
											editable={false}
											onPress={() => !loadingClassReportByClassIdForAdmin && setShowEndDate(true)}
											icon='calendar-end'
										/>
									</View>
								</View>
							</View>
						</View>
					</View>

					{/* Generate Button */}
					<Pressable 
						onPress={handleGenerateClassReport}
						disabled={loadingClassReportByClassIdForAdmin}
						style={({ pressed }) => [
							{
								backgroundColor: colors.brand,
								borderRadius: 12,
								paddingVertical: 16,
								paddingHorizontal: 24,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								shadowColor: colors.brand,
								shadowOffset: { width: 0, height: 4 },
								shadowOpacity: 0.3,
								shadowRadius: 8,
								elevation: 8,
								opacity: loadingClassReportByClassIdForAdmin ? 0.7 : 1,
								transform: [{ scale: pressed ? 0.98 : 1 }],
								marginBottom: 24
							}
						]}
					>
						{loadingClassReportByClassIdForAdmin ? (
							<>
								<ActivityIndicator size='small' color={colors.view.primary} style={{ marginRight: 8 }} />
								<Text style={{ 
									color: colors.view.primary, 
									fontSize: 16, 
									fontWeight: '600',
									letterSpacing: -0.2
								}}>
									Generating...
								</Text>
							</>
						) : (
							<>
								<MaterialCommunityIcons name="file-document-outline" size={20} color={colors.view.primary} style={{ marginRight: 8 }} />
								<Text style={{ 
									color: colors.view.primary, 
									fontSize: 16, 
									fontWeight: '600',
									letterSpacing: -0.2
								}}>
									Generate Report
								</Text>
							</>
						)}
					</Pressable>

					{/* Error Message */}
					{errorMessage && (
						<View style={{ 
							backgroundColor: '#FFF5F5',
							borderRadius: 12,
							padding: 16,
							borderLeftWidth: 4,
							borderLeftColor: colors.variants.primary[5],
							marginBottom: 24
						}}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<MaterialCommunityIcons name="alert-circle" size={20} color={colors.variants.primary[5]} />
								<Text style={{ 
									fontSize: 14, 
									color: colors.variants.primary[5],
									marginLeft: 8,
									fontWeight: '500'
								}}>
									{errorMessage}
								</Text>
							</View>
						</View>
					)}

					{/* Info Section */}
					<View style={{
						position: 'relative',
						overflow: 'hidden'
					}}>
						{/* Accent Element */}
						<View style={{
							position: 'absolute',
							top: 0,
							right: 0,
							width: 60,
							height: 60,
							backgroundColor: colors.variants.secondary[1],
							borderBottomLeftRadius: 30,
							opacity: 0.4,
							zIndex: 0
						}} />
						
						{/* Main Card */}
						<View style={{
							backgroundColor: colors.variants.secondary[0],
							padding: 18,
							borderRadius: 16,
							elevation: 0,
							shadowColor: colors.variants.secondary[2],
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.06,
							shadowRadius: 8,
							borderWidth: 1,
							borderColor: colors.variants.secondary[1],
							position: 'relative',
							zIndex: 1
						}}>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, position: 'relative', zIndex: 1 }}>
								<MaterialCommunityIcons name="information" size={18} color={colors.brand} />
								<Text style={{ 
									fontSize: 15, 
									fontWeight: '600', 
									color: colors.variants.secondary[5],
									marginLeft: 8,
									letterSpacing: -0.2
								}}>
									Report Information
								</Text>
							</View>
							<Text style={{ 
								fontSize: 13, 
								color: colors.variants.secondary[4],
								lineHeight: 18,
								letterSpacing: -0.1,
								position: 'relative',
								zIndex: 1
							}}>
								This report shows attendance statistics organized by specific classes with student details
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>

			{/* Date Pickers */}
			{showStartDate && (
				<DateTimePickerModal
					key='start-date-picker'
					isVisible={showStartDate}
					mode='date'
					onConfirm={onChangeStartDate}
					onCancel={() => setShowStartDate(false)}
					display='spinner'
					date={startDate}
					maximumDate={new Date()}
				/>
			)}
			{showEndDate && (
				<DateTimePickerModal
					key='end-date-picker'
					isVisible={showEndDate}
					mode='date'
					onConfirm={onChangeEndDate}
					onCancel={() => setShowEndDate(false)}
					display='spinner'
					date={endDate}
					// maximumDate={new Date()}
				/>
			)}
			{openClassesModal && (
				<SelectClassModal
					openModal={openClassesModal}
					closeModal={() => setOpenClassesModal(false)}
					selectClass={selectClass}
				/>
			)}
			{openClassReportByClassIdModal && (
				<ClassReportByClassIdDetailsModal
					openModal={openClassReportByClassIdModal}
					closeModal={() => {
						setOpenClassReportByClassIdModal(false)
						setClassReportByClassId([])
					}}
					classReports={classReportByClassId}
				/>
			)}
		</Modal>
	)
}

export default ClassReportModal
