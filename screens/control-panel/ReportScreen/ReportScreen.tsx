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
import { SafeAreaViewStyled } from '@/theme/styles'

const ReportScreen = ({ role }: { role: TUserRole }) => {
	const dispatch = useAppDispatch()

	const [openDailyReportModal, setOpenDailyReportModal] = useState<boolean>(false)
	const [openClassReportModal, setOpenClassReportModal] = useState<boolean>(false)
	const [openStudentReportModal, setOpenStudentReportModal] = useState<boolean>(false)

	const { userInfo } = useAppSelector((state) => state.userLogin)

	useEffect(() => {
		if (role === 'admin') {
			dispatch(getkarateClassesByAdmin())
			dispatch(getStudentUsers())
		} else if (role === 'student') {
			dispatch(getkarateClassesByStudentId(userInfo?._id || ''))
		}
	}, [])

	return (
		<>
			<SafeAreaViewStyled>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<ScreenHeader label='Reports' />
					<View style={{ width: '100%', alignItems: 'center', padding: 20, gap: 30 }}>
						{role === 'admin' && (
							<View
								style={{
									width: '100%',
									padding: 15,
									backgroundColor: 'skyblue',
									borderRadius: 5,
									boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
								}}
							>
								<Pressable onPress={() => setOpenDailyReportModal(true)}>
									<Text style={{ marginBottom: 5 }}>Daily Report</Text>
									<Text style={{ fontSize: 12, color: '#373535' }}>
										Daily report for all classes grouped and sorted by dayes in descending order.
									</Text>
								</Pressable>
							</View>
						)}
						<View
							style={{
								width: '100%',
								padding: 15,
								backgroundColor: 'skyblue',
								borderRadius: 5,
								boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
								cursor: 'pointer',
							}}
						>
							<Pressable onPress={() => setOpenStudentReportModal(true)}>
								<Text style={{ marginBottom: 5 }}>Student Report</Text>
								<Text style={{ fontSize: 12, color: '#373535' }}>
									Reveals full attendance information for a student of your choice.
								</Text>
							</Pressable>
						</View>
						{role === 'admin' && (
							<View
								style={{
									width: '100%',
									padding: 15,
									backgroundColor: 'skyblue',
									borderRadius: 5,
									boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
									cursor: 'pointer',
								}}
							>
								<Pressable onPress={() => setOpenClassReportModal(true)}>
									<Text style={{ marginBottom: 5 }}>Class Report</Text>
									<Text style={{ fontSize: 12, color: '#373535' }}>
										Reveals full attendance information for a single class or all classes combined.
									</Text>
								</Pressable>
							</View>
						)}
					</View>
				</View>
			</SafeAreaViewStyled>
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
