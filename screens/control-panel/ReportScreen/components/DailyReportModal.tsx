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
			<View style={{ flex: 1, width: '100%', justifyContent: 'flex-start' }}>
				<ScreenHeader label='Daily Report' showBackButton={true} handleBack={closeModal} />
				<View style={{ width: '100%', alignItems: 'center' }}>
					<Text style={{ padding: 20, fontSize: 16, color: colors.brand }}>
						Select start and end dates for the report
					</Text>
					<View style={{ width: '100%', paddingHorizontal: 20, gap: 40 }}>
						<CustomInputForm
							label='Start Time'
							value={startDate ? format(new Date(startDate), 'MMMM dd, yyyy') : ''}
							editable={false}
							onPress={() => !loadingDailyReportForAdmin && setShowStartDate(true)}
							icon='calendar'
						/>
						<CustomInputForm
							label='End Time'
							value={endDate ? format(new Date(endDate), 'MMMM dd, yyyy') : ''}
							editable={false}
							onPress={() => !loadingDailyReportForAdmin && setShowEndDate(true)}
							icon='calendar'
						/>
					</View>
					<Pressable onPress={handleGetDailyReportForAdmin} disabled={loadingDailyReportForAdmin}>
						<View
							style={{
								paddingHorizontal: 40,
								paddingVertical: 10,
								backgroundColor: colors.variants.secondary[5],
								borderRadius: 10,
								marginTop: 40,
								height: 40,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{loadingDailyReportForAdmin ? (
								<ActivityIndicator size='small' color={colors.view.primary} />
							) : (
								<Text style={{ color: colors.view.primary, fontSize: 16, fontWeight: 500 }}>Generate Report</Text>
							)}
						</View>
					</Pressable>
					{errorMessage && (
						<View style={{ marginTop: 40, width: '100%', alignItems: 'center' }}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 16,
									color: colors.variants.primary[5],
								}}
							>
								{errorMessage}
							</Text>
						</View>
					)}
				</View>
			</View>
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
