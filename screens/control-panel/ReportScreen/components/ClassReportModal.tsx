import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import KeyboardAvoidingWrapper from '@/components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import CustomInputForm from '@/components/CustomInputForm/CustomInputForm'
import ClassReportByClassIdDetailsModal from './ClassReportByClassIdDetailsModal'
import { IClassReport } from '../helpers/report-screen-interfaces'
import SelectClassModal from './SelectClassModal'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { getClassReportByClassIdForAdmin } from '@/redux/actions/studentAttendanceActions'
import { GET_CLASS_REPORT_BY_CLASS_ID_FOR_ADMIN_RESET } from '@/redux/constants/studentAttendanceConstants'
import colors from '@/theme/colors'

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
		<>
			<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
				<KeyboardAvoidingWrapper>
					<View>
						<ScreenHeader label='Class Report' showBackButton={true} handleBack={closeModal} />
						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text style={{ padding: 20, fontSize: 16, color: colors.brand }}>
								Select the class, start and end dates for the report
							</Text>
							<View style={{ width: '100%', paddingHorizontal: 20 }}>
								<CustomInputForm
									label='Class'
									placeholderTextColor={colors.darkLight}
									value={classSelected}
									editable={false}
									onPress={() => setOpenClassesModal(true)}
									style={{
										fontSize: 15,
									}}
								/>
							</View>
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
							<Pressable onPress={handleGenerateClassReport}>
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
									{loadingClassReportByClassIdForAdmin ? (
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
						closeModal={() => [setOpenClassReportByClassIdModal(false), setClassReportByClassId([])]}
						classReports={classReportByClassId}
					/>
				)}
			</Modal>
		</>
	)
}

export default ClassReportModal
