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
		featured = false 
	}: {
		title: string
		description: string
		icon: string
		onPress: () => void
		featured?: boolean
	}) => (
		<View style={{ paddingHorizontal: 20, paddingBottom: 16 }}>
			<Pressable 
				onPress={onPress}
				style={({ pressed }) => [
					{
						backgroundColor: colors.primary,
						padding: 20,
						borderRadius: 12,
						elevation: 1,
						shadowColor: colors.variants.grey[4],
						shadowOffset: { width: 0, height: 1 },
						shadowOpacity: 0.1,
						shadowRadius: 3,
						borderTopWidth: 1,
						borderRightWidth: 1,
						borderBottomWidth: 1,
						borderLeftWidth: 4,
						borderTopColor: colors.variants.grey[1],
						borderRightColor: colors.variants.grey[1],
						borderBottomColor: colors.variants.grey[1],
						borderLeftColor: featured ? colors.brand : colors.variants.primary[3],
						transform: [{ scale: pressed ? 0.98 : 1 }],
					}
				]}
			>
				{/* Top Row */}
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
					<View style={{ 
						backgroundColor: featured ? colors.brand : colors.variants.secondary[1],
						padding: 8,
						borderRadius: 8,
					}}>
						<MaterialCommunityIcons 
							name={icon as any} 
							size={20} 
							color={featured ? colors.view.primary : colors.brand} 
						/>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
						<MaterialCommunityIcons 
							name='chart-line' 
							size={16} 
							color={colors.variants.grey[4]} 
						/>
						<Text style={{ 
							color: colors.variants.grey[4],
							fontSize: 12,
							fontWeight: '500'
						}}>
							Analytics
						</Text>
					</View>
				</View>

				{/* Content */}
				<View style={{ marginBottom: 12 }}>
					<Text style={{ 
						fontSize: 16, 
						fontWeight: '600', 
						color: colors.variants.secondary[5],
						marginBottom: 4,
						lineHeight: 20,
						letterSpacing: -0.2
					}}>
						{title}
					</Text>
					<Text style={{ 
						fontSize: 14, 
						color: colors.variants.grey[4],
						lineHeight: 18,
						letterSpacing: -0.1
					}}>
						{description}
					</Text>
				</View>

				{/* Bottom Row */}
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<View style={{
						backgroundColor: colors.variants.grey[0],
						padding: 8,
						paddingHorizontal: 12,
						borderRadius: 8,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 6
					}}>
						<MaterialCommunityIcons 
							name='circle' 
							size={8} 
							color={featured ? colors.brand : colors.variants.primary[3]} 
						/>
						<Text style={{ 
							color: colors.variants.grey[5],
							fontSize: 12,
							fontWeight: '500'
						}}>
							{featured ? 'Featured' : 'Available'}
						</Text>
					</View>
					<MaterialCommunityIcons 
						name='chevron-right' 
						size={20} 
						color={colors.variants.grey[3]} 
					/>
				</View>
			</Pressable>
		</View>
	)

	return (
		<>
			<View style={{ flex: 1, backgroundColor: colors.primary }}>
				<ScreenHeader label='Reports' />
				
				<ScrollView 
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingTop: 24,
						paddingBottom: 40,
					}}
					showsVerticalScrollIndicator={false}
				>
					{/* Header Section */}
					<View style={{ marginBottom: 32, paddingHorizontal: 20 }}>
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
								featured={true}
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
						marginTop: 16,
						marginHorizontal: 20,
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
