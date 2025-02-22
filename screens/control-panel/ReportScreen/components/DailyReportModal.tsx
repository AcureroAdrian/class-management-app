import React, { useEffect, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { getDailyReportForAdmin } from '@/redux/actions/studentAttendanceActions'
import { GET_DAILY_REPORT_FOR_ADMIN_RESET } from '@/redux/constants/studentAttendanceConstants'
import { IDailyReport } from '../helpers/report-screen-interfaces'
import DailyReportDetailsModal from './DailyReportDetailsModal'

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
		<>
			<Modal visible={openModal} animationType='slide' onRequestClose={closeModal} statusBarTranslucent={true}>
				<KeyboardAvoidingWrapper>
					<View>
						<ScreenHeader label='Daily Report' showBackButton={true} handleBack={closeModal} />
						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text style={{ padding: 20, fontSize: 16, color: colors.brand }}>
								Select start and end dates for the report
							</Text>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='Start Time'
									placeholderTextColor={colors.darkLight}
									value={startDate ? format(new Date(startDate), 'MMMM dd, yyyy') : ''}
									editable={false}
									onPress={() => setShowStartDate(true)}
									style={{
										fontSize: 15,
									}}
								/>
							</View>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='End Time'
									placeholderTextColor={colors.darkLight}
									value={endDate ? format(new Date(endDate), 'MMMM dd, yyyy') : ''}
									editable={false}
									onPress={() => setShowEndDate(true)}
									style={{
										fontSize: 15,
									}}
								/>
							</View>
							<Pressable onPress={handleGetDailyReportForAdmin} disabled={loadingDailyReportForAdmin}>
								<View
									style={{
										paddingHorizontal: 20,
										paddingVertical: 10,
										backgroundColor: colors.brand,
										borderRadius: 10,
										marginTop: 20,
										height: 40,
										justifyContent: 'center',
										alignItems: 'center',
										width: 200,
									}}
								>
									{loadingDailyReportForAdmin ? (
										<ActivityIndicator size='small' color={colors.primary} />
									) : (
										<Text style={{ color: colors.primary }}>Generate Report</Text>
									)}
								</View>
							</Pressable>
							{errorMessage && (
								<Text
									style={{
										textAlign: 'center',
										fontSize: 13,
										color: 'red',
									}}
								>
									{errorMessage}
								</Text>
							)}
						</View>
					</View>
				</KeyboardAvoidingWrapper>
			</Modal>
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
					maximumDate={new Date()}
				/>
			)}
			{openDailyReportDetailsModal && (
				<DailyReportDetailsModal
					openModal={openDailyReportDetailsModal}
					closeModal={() => [setOpenDailyReportDetailsModal(false), setReports([])]}
					reports={reports}
				/>
			)}
		</>
	)
}

export default DailyReportModal
