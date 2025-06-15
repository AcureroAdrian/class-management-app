import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView, Pressable } from 'react-native'
import PieChart, { Slice } from 'react-native-pie-chart'
import { format } from 'date-fns'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IStudentReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'

const StudentReportDetailsModal = ({
	openModal,
	closeModal,
	studentReports = [],
}: {
	openModal: boolean
	closeModal: () => void
	studentReports: IStudentReport[]
}) => {
	const [showChart, setShowChart] = useState<boolean>(true)
	const [filter, setFilter] = useState('all')
	const [reportsFiltered, setReportsFiltered] = useState<IStudentReport[]>([])

	useEffect(() => {
		let result: IStudentReport[] = []
		if (filter === 'all') {
			result = studentReports
		} else {
			result = studentReports.filter((report) => report.attendanceStatus === filter)
		}
		setReportsFiltered(result)
	}, [filter, studentReports])
	const presents = useMemo(() => {
		return studentReports?.filter((report) => report.attendanceStatus === 'present')?.length
	}, [])
	const absents = useMemo(() => {
		return studentReports?.filter((report) => report.attendanceStatus === 'absent')?.length
	}, [])
	const total = useMemo(() => {
		return studentReports?.length || 0
	}, [])
	const series = useMemo(() => {
		let result: Slice[] = []

		if (presents) {
			result.push({
				value: presents,
				color: 'green',
				label: { text: `${Math.round((presents / total) * 100)}%`, fill: colors.view.primary, fontSize: 18 },
			})
		}

		if (absents) {
			result.push({
				value: absents,
				color: 'red',
				label: { text: `${Math.round((absents / total) * 100)}%`, fill: colors.view.primary, fontSize: 18 },
			})
		}

		return result
	}, [presents, absents, total])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<View style={{ flex: 1, width: '100%' }}>
				<ScreenHeader
					label='Reports'
					showBackButton={true}
					handleBack={closeModal}
					handleOnPress={() => setShowChart(!showChart)}
					labelButton='Chart'
					iconName='chart-pie'
				/>
				<View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
					<View
						style={{
							width: '100%',
							padding: 20,
							flexDirection: 'row',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<Image
							source={require('@/assets/img/default-avatar.png')}
							style={{ width: 50, height: 50, borderRadius: 30 }}
							resizeMode='contain'
						/>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'flex-start',
								width: '100%',
								flexDirection: 'column',
							}}
						>
							<Text style={{ fontWeight: 500, fontSize: 16, color: colors.view.black }}>
								{capitalizeWords(studentReports?.[0]?.student?.name)}
							</Text>
							<Text style={{ fontSize: 14, color: colors.variants.grey[4] }}>
								{capitalizeWords(studentReports?.[0]?.student?.lastName)}
							</Text>
							
							{/* Student Badges */}
							<View style={{ flexDirection: 'row', marginTop: 4, gap: 4 }}>
								{studentReports?.[0]?.student?.isTrial && (
									<View style={{ 
										backgroundColor: '#FFF3CD', 
										paddingHorizontal: 6, 
										paddingVertical: 2, 
										borderRadius: 6 
									}}>
										<Text style={{ color: '#856404', fontSize: 10, fontWeight: '600' }}>ESTUDIANTE TRIAL</Text>
									</View>
								)}
							</View>
						</View>
					</View>
					<View style={{ width: '100%', paddingHorizontal: 20, alignItems: 'center' }}>
						<View style={{ width: '100%', height: 1, backgroundColor: colors.variants.grey[2] }} />
					</View>
					{showChart && (
						<View style={{ margin: 20 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
								<PieChart widthAndHeight={180} series={series} />
								<View style={{ gap: 5 }}>
									<Text style={{ fontSize: 16 }}>Total: {total}</Text>
									{Boolean(presents) && (
										<View style={{ flexDirection: 'row', gap: 5 }}>
											<View
												style={{
													backgroundColor: 'green',
													padding: 5,
													width: 24,
													height: 24,
													justifyContent: 'center',
													alignItems: 'center',
													borderRadius: '50%',
												}}
											>
												<Text style={{ color: 'white', fontSize: 10 }}>{presents}</Text>
											</View>
											<Text style={{ fontSize: 16 }}>Present</Text>
										</View>
									)}
									{Boolean(absents) && (
										<View style={{ flexDirection: 'row', gap: 5 }}>
											<View
												style={{
													backgroundColor: 'red',
													padding: 5,
													width: 24,
													height: 24,
													justifyContent: 'center',
													alignItems: 'center',
													borderRadius: '50%',
												}}
											>
												<Text style={{ color: 'white', fontSize: 10 }}>{absents}</Text>
											</View>
											<Text style={{ fontSize: 16 }}>Absent</Text>
										</View>
									)}
								</View>
							</View>
						</View>
					)}
					<View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
						<View
							style={{
								flexDirection: 'row',
								backgroundColor: colors.variants.secondary[1],
								padding: 10,
								gap: 20,
								borderRadius: 40,
							}}
						>
							<Pressable onPress={() => setFilter('all')}>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										height: 40,
										width: 40,
										backgroundColor: filter === 'all' ? colors.variants.secondary[2] : '',
										borderRadius: 20,
									}}
								>
									<Text style={{ fontSize: 14, fontWeight: 500, color: colors.variants.secondary[5] }}>ALL</Text>
								</View>
							</Pressable>
							<Pressable onPress={() => setFilter('present')}>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										height: 40,
										width: 40,
										backgroundColor: filter === 'present' ? colors.variants.secondary[2] : '',
										borderRadius: 20,
									}}
								>
									<MaterialCommunityIcons name='check' size={30} color='green' />
								</View>
							</Pressable>
							<Pressable onPress={() => setFilter('absent')}>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										height: 40,
										width: 40,
										backgroundColor: filter === 'absent' ? colors.variants.secondary[2] : '',
										borderRadius: 20,
									}}
								>
									<MaterialCommunityIcons name='close' size={30} color='red' />
								</View>
							</Pressable>
						</View>
					</View>
					<View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: colors.variants.secondary[5],
								paddingVertical: 5,
							}}
						>
							<View style={{ width: 80, alignItems: 'center', justifyContent: 'center' }}>
								<Text style={{ fontSize: 12, textAlign: 'center', color: colors.view.primary }}>Date</Text>
							</View>
							<View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
								<Text style={{ fontSize: 12, textAlign: 'center', color: colors.view.primary }}>Status</Text>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
								<Text style={{ fontSize: 12, textAlign: 'center', color: colors.view.primary }}>Class</Text>
							</View>
						</View>
					</View>
					<View style={{ width: '100%', flex: 1 }}>
						<ScrollView>
							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								style={{ width: '100%', paddingHorizontal: 20 }}
								data={reportsFiltered}
								renderItem={({ item }) => (
									<View style={{ width: '100%', marginTop: 8 }}>
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
											<View
												style={{
													width: 80,
													alignItems: 'center',
													justifyContent: 'center',
													backgroundColor: colors.variants.secondary[1],
													minHeight: 30,
													paddingVertical: 5,
												}}
											>
												<Text style={{ fontSize: 12, color: colors.variants.secondary[5], fontWeight: 500 }}>
													{format(new Date(item.date.year, item.date.month - 1, item.date.day), 'MM.dd.yy')}
												</Text>
											</View>
											<View
												style={{
													width: 50,
													alignItems: 'center',
													justifyContent: 'center',
													backgroundColor: colors.variants.secondary[1],
													minHeight: 30,
													paddingVertical: 5,
												}}
											>
												{item.attendanceStatus === 'present' ? (
													<AntDesign name='check' size={20} color='green' />
												) : (
													<AntDesign name='close' size={20} color='red' />
												)}
											</View>
											<View
												style={{
													alignItems: 'flex-start',
													flexDirection: 'column',
													flex: 1,
													backgroundColor: colors.variants.secondary[1],
													minHeight: 30,
													paddingVertical: 5,
													paddingHorizontal: 8,
												}}
											>
												<Text style={{ fontSize: 12, color: colors.variants.secondary[5], fontWeight: 500 }}>
													{item.karateClassName}
												</Text>
												
												{/* Badges */}
												<View style={{ flexDirection: 'row', marginTop: 2, gap: 3 }}>
													{item.student.isTrial && (
														<View style={{ 
															backgroundColor: '#FFF3CD', 
															paddingHorizontal: 4, 
															paddingVertical: 1, 
															borderRadius: 4 
														}}>
															<Text style={{ color: '#856404', fontSize: 8, fontWeight: '600' }}>TRIAL</Text>
														</View>
													)}
													{item.isDayOnly && (
														<View style={{ 
															backgroundColor: '#E1F5FE', 
															paddingHorizontal: 4, 
															paddingVertical: 1, 
															borderRadius: 4 
														}}>
															<Text style={{ color: '#01579B', fontSize: 8, fontWeight: '600' }}>DAY</Text>
														</View>
													)}
												</View>
												
												{/* Observations */}
												{item.observations && (
													<View style={{ 
														marginTop: 4, 
														padding: 4, 
														backgroundColor: colors.variants.secondary[0], 
														borderRadius: 4,
														borderLeftWidth: 2,
														borderLeftColor: colors.variants.primary[4]
													}}>
														<Text style={{ fontSize: 10, color: colors.variants.secondary[4], fontStyle: 'italic' }}>
															"Nota: {item.observations}"
														</Text>
													</View>
												)}
											</View>
										</View>
									</View>
								)}
								keyExtractor={(item) => item._id}
							/>
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default StudentReportDetailsModal
