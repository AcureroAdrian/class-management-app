import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
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

	const ReportCard = ({ 
		title, 
		description, 
		icon, 
		onPress, 
		gradient = false 
	}: {
		title: string
		description: string
		icon: string
		onPress: () => void
		gradient?: boolean
	}) => (
		<Pressable 
			onPress={onPress}
			style={({ pressed }) => [
				{
					width: '100%',
					backgroundColor: gradient ? colors.brand : colors.view.primary,
					borderRadius: 16,
					padding: 20,
					marginBottom: 16,
					shadowColor: '#000',
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.1,
					shadowRadius: 8,
					elevation: 3,
					borderWidth: 1,
					borderColor: gradient ? 'transparent' : colors.variants.secondary[1],
					transform: [{ scale: pressed ? 0.98 : 1 }],
				}
			]}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<View style={{ flex: 1 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
						<View style={{ 
							backgroundColor: gradient ? 'rgba(255,255,255,0.2)' : colors.variants.secondary[1],
							borderRadius: 12,
							padding: 10,
							marginRight: 16
						}}>
							<MaterialCommunityIcons 
								name={icon as any} 
								size={24} 
								color={gradient ? colors.view.primary : colors.brand} 
							/>
						</View>
						<Text style={{ 
							fontSize: 18, 
							fontWeight: '700', 
							color: gradient ? colors.view.primary : colors.variants.secondary[5],
							flex: 1,
							letterSpacing: -0.3
						}}>
							{title}
						</Text>
					</View>
					<Text style={{ 
						fontSize: 14, 
						color: gradient ? 'rgba(255,255,255,0.85)' : colors.variants.grey[4],
						lineHeight: 20,
						marginLeft: 50,
						letterSpacing: -0.1
					}}>
						{description}
					</Text>
				</View>
				<MaterialCommunityIcons 
					name='chevron-right' 
					size={20} 
					color={gradient ? 'rgba(255,255,255,0.6)' : colors.variants.grey[3]} 
				/>
			</View>
		</Pressable>
	)

	return (
		<>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='Reports' />
				
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingHorizontal: 20,
						paddingTop: 24,
						paddingBottom: 40,
					}}
					showsVerticalScrollIndicator={false}
				>
					{/* Header Section */}
					<View style={{ marginBottom: 32 }}>
						<Text style={{ 
							fontSize: 28, 
							fontWeight: '700', 
							color: colors.variants.secondary[5],
							marginBottom: 8,
							letterSpacing: -0.5
						}}>
							Analytics & Reports
						</Text>
						<Text style={{ 
							fontSize: 16, 
							color: colors.variants.grey[4],
							lineHeight: 22,
							letterSpacing: -0.2
						}}>
							Access detailed information about attendance and performance
						</Text>
					</View>

					{/* Report Cards */}
					<View>
						{role === 'admin' && (
							<ReportCard
								title="Daily Report"
								description="View attendance grouped by days with detailed metrics"
								icon="calendar-check"
								onPress={() => setOpenDailyReportModal(true)}
								gradient={true}
							/>
						)}
						
						<ReportCard
							title="Student Report"
							description="Complete attendance information and individual progress"
							icon="account-search"
							onPress={() => setOpenStudentReportModal(true)}
						/>
						
						{role === 'admin' && (
							<ReportCard
								title="Class Report"
								description="Attendance statistics organized by specific classes"
								icon="google-classroom"
								onPress={() => setOpenClassReportModal(true)}
							/>
						)}
					</View>

					{/* Footer Info */}
					<View style={{
						marginTop: 32,
						padding: 20,
						backgroundColor: colors.variants.secondary[1],
						borderRadius: 12,
						borderLeftWidth: 4,
						borderLeftColor: colors.brand
					}}>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
							<MaterialCommunityIcons name="information" size={20} color={colors.brand} />
							<Text style={{ 
								fontSize: 14, 
								fontWeight: '600', 
								color: colors.variants.secondary[5],
								marginLeft: 8,
								letterSpacing: -0.2
							}}>
								Information
							</Text>
						</View>
						<Text style={{ 
							fontSize: 13, 
							color: colors.variants.secondary[3],
							lineHeight: 18,
							letterSpacing: -0.1
						}}>
							Reports are generated in real-time based on recorded attendance data
						</Text>
					</View>
				</ScrollView>
			</View>

			{/* Modals */}
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
