import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import DailyReportDetailsModal from './DailyReportDetailsModal'
import { IDailyReport } from '../helpers/report-screen-interfaces'
import { getDailyReportForAdmin } from '@/redux/actions/studentAttendanceActions'
import { GET_DAILY_REPORT_FOR_ADMIN_RESET } from '@/redux/constants/studentAttendanceConstants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const DailyReportModal = ({ openModal, closeModal }: { openModal: boolean; closeModal: () => void }) => {
	const dispatch = useAppDispatch()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [showStartDate, setShowStartDate] = useState<boolean>(false)
	const [showEndDate, setShowEndDate] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date>(new Date())
	const [endDate, setEndDate] = useState<Date>(new Date())
	const [reports, setReports] = useState<IDailyReport[]>([])
	const [openDailyReportDetailsModal, setOpenDailyReportDetailsModal] = useState<boolean>(false)

	const { loadingDailyReportForAdmin, successDailyReportForAdmin, dailyReportForAdminList, errorDailyReportForAdmin } =
		useAppSelector((state) => state.getDailyReportForAdmin)

	useEffect(() => {
		if (successDailyReportForAdmin) {
			setReports(dailyReportForAdminList || [])
			dispatch({ type: GET_DAILY_REPORT_FOR_ADMIN_RESET })
			setOpenDailyReportDetailsModal(true)
		}
	}, [successDailyReportForAdmin])
	useEffect(() => {
		if (errorDailyReportForAdmin) {
			setErrorMessage(errorDailyReportForAdmin)
			dispatch({ type: GET_DAILY_REPORT_FOR_ADMIN_RESET })
		}
	}, [errorDailyReportForAdmin])

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
	const handleGetDailyReportForAdmin = () => {
		if (!startDate || !endDate) {
			setErrorMessage('Please select start and end dates.')
			return
		}

		dispatch(getDailyReportForAdmin(format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')))
	}

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='Daily Report' showBackButton={true} handleBack={closeModal} />
				
				<View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
					{/* Header Section */}
					<View style={{ marginBottom: 32 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
							<View style={{ 
								backgroundColor: colors.brand,
								borderRadius: 12,
								padding: 8,
								marginRight: 12
							}}>
								<MaterialCommunityIcons name="calendar-check" size={24} color={colors.view.primary} />
							</View>
							<Text style={{ 
								fontSize: 24, 
								fontWeight: '700', 
								color: colors.variants.secondary[5],
								flex: 1,
								letterSpacing: -0.5
							}}>
								Daily Report
							</Text>
						</View>
						<Text style={{ 
							fontSize: 16, 
							color: colors.variants.grey[4],
							lineHeight: 22,
							marginLeft: 52,
							letterSpacing: -0.2
						}}>
							Select date range to generate the report
						</Text>
					</View>

					{/* Date Selection Section */}
					<View style={{ marginBottom: 32 }}>
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
							marginBottom: 20
						}}>
							<Text style={{ 
								fontSize: 16, 
								fontWeight: '600', 
								color: colors.variants.secondary[5],
								marginBottom: 16,
								letterSpacing: -0.3
							}}>
								Date Range
							</Text>
							
							<View style={{ gap: 16 }}>
								<CustomInputForm
									label='Start Date'
									value={startDate ? format(new Date(startDate), 'MM/dd/yyyy') : ''}
									editable={false}
									onPress={() => !loadingDailyReportForAdmin && setShowStartDate(true)}
									icon='calendar-start'
								/>
								<CustomInputForm
									label='End Date'
									value={endDate ? format(new Date(endDate), 'MM/dd/yyyy') : ''}
									editable={false}
									onPress={() => !loadingDailyReportForAdmin && setShowEndDate(true)}
									icon='calendar-end'
								/>
							</View>
						</View>

						{/* Generate Button */}
						<Pressable 
							onPress={handleGetDailyReportForAdmin} 
							disabled={loadingDailyReportForAdmin}
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
									opacity: loadingDailyReportForAdmin ? 0.7 : 1,
									transform: [{ scale: pressed ? 0.98 : 1 }],
								}
							]}
						>
							{loadingDailyReportForAdmin ? (
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
					</View>

					{/* Error Message */}
					{errorMessage && (
						<View style={{ 
							backgroundColor: '#FFF5F5',
							borderRadius: 12,
							padding: 16,
							borderLeftWidth: 4,
							borderLeftColor: colors.variants.primary[5],
							marginBottom: 20
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
						backgroundColor: colors.variants.secondary[1],
						borderRadius: 12,
						padding: 16,
						borderLeftWidth: 4,
						borderLeftColor: colors.brand
					}}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
							<MaterialCommunityIcons name="information" size={18} color={colors.brand} />
							<Text style={{ 
								fontSize: 14, 
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
							color: colors.variants.secondary[3],
							lineHeight: 18,
							letterSpacing: -0.1
						}}>
							This report displays attendance for all students grouped by days within the selected date range
						</Text>
					</View>
				</View>
			</View>

			{/* Date Pickers */}
			{showStartDate && (
				<DateTimePickerModal
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
					isVisible={showEndDate}
					mode='date'
					onConfirm={onChangeEndDate}
					onCancel={() => setShowEndDate(false)}
					display='spinner'
					date={endDate}
					// maximumDate={new Date()}
				/>
			)}
			{openDailyReportDetailsModal && (
				<DailyReportDetailsModal
					openModal={openDailyReportDetailsModal}
					closeModal={() => [setOpenDailyReportDetailsModal(false), setReports([])]}
					reports={reports}
				/>
			)}
		</Modal>
	)
}

export default DailyReportModal
