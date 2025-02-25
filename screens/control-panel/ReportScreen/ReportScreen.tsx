import React, { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import DailyReportModal from './components/DailyReportModal'
import StudentReportModal from './components/StudentReportModal'
import ClassReportModal from './components/ClassReportModal'
import { TUserRole } from '@/shared/common-types'
import { getkarateClassesByAdmin, getkarateClassesByStudentId } from '@/redux/actions/karateClassActions'
import { getStudentUsers } from '@/redux/actions/userActions'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import colors from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ReportScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()

	const [openDailyReportModal, setOpenDailyReportModal] = useState<boolean>(false)
	const [openClassReportModal, setOpenClassReportModal] = useState<boolean>(false)
	const [openStudentReportModal, setOpenStudentReportModal] = useState<boolean>(false)

	const { userInfo } = useAppSelector((state) => state.userLogin)

	useEffect(() => {
		if (role === 'admin') {
			dispatch(getkarateClassesByAdmin())
			dispatch(getStudentUsers('students'))
		} else if (role === 'student') {
			dispatch(getkarateClassesByStudentId(userInfo?._id || ''))
		}
	}, [])

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
				<ScreenHeader label='Reports' />
				<View
					style={{ width: '100%', flex: 1, alignItems: 'center', gap: 20, paddingHorizontal: 20, paddingVertical: 20 }}
				>
					{role === 'admin' && (
						<View
							style={{
								width: '100%',
								padding: 20,
								backgroundColor: colors.variants.secondary[0],
								borderRadius: 20,
							}}
						>
							<Pressable onPress={() => setOpenDailyReportModal(true)}>
								<Text style={{ fontSize: 25, fontWeight: 500, color: colors.variants.secondary[5] }}>Daily Report</Text>
								<Text style={{ fontSize: 15, color: colors.variants.secondary[4], paddingVertical: 20 }}>
									Grouped and sorted by days.
								</Text>
								<MaterialCommunityIcons name='arrow-right' size={24} color={colors.view.tertiary} />
							</Pressable>
						</View>
					)}
					<View
						style={{
							width: '100%',
							padding: 20,
							backgroundColor: colors.variants.secondary[0],
							borderRadius: 20,
						}}
					>
						<Pressable onPress={() => setOpenStudentReportModal(true)}>
							<Text style={{ fontSize: 25, fontWeight: 500, color: colors.variants.secondary[5] }}>Student Report</Text>
							<Text style={{ fontSize: 15, color: colors.variants.secondary[4], paddingVertical: 20 }}>
								Attendance information for a student.
							</Text>
							<MaterialCommunityIcons name='arrow-right' size={24} color={colors.view.tertiary} />
						</Pressable>
					</View>
					{role === 'admin' && (
						<View
							style={{
								width: '100%',
								padding: 20,
								backgroundColor: colors.variants.secondary[0],
								borderRadius: 20,
							}}
						>
							<Pressable onPress={() => setOpenClassReportModal(true)}>
								<Text style={{ fontSize: 25, fontWeight: 500, color: colors.variants.secondary[5] }}>Class Report</Text>
								<Text style={{ fontSize: 15, color: colors.variants.secondary[4], paddingVertical: 20 }}>
									Grouped by classes.
								</Text>
								<MaterialCommunityIcons name='arrow-right' size={24} color={colors.view.tertiary} />
							</Pressable>
						</View>
					)}
				</View>
			</View>
			{openDailyReportModal && (
				<DailyReportModal openModal={openDailyReportModal} closeModal={() => setOpenDailyReportModal(false)} />
			)}
			{openStudentReportModal && (
				<StudentReportModal
					openModal={openStudentReportModal}
					closeModal={() => setOpenStudentReportModal(false)}
					role={role}
				/>
			)}
			{openClassReportModal && (
				<ClassReportModal openModal={openClassReportModal} closeModal={() => setOpenClassReportModal(false)} />
			)}
		</>
	)
}

export default ReportScreen
