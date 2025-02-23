import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView, Pressable } from 'react-native'
import PieChart, { Slice } from 'react-native-pie-chart'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IStudentReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'

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
				label: { text: `${(presents / total) * 100}%`, fill: '#fff', fontSize: 15 },
			})
		}

		if (absents) {
			result.push({
				value: absents,
				color: 'red',
				label: { text: `${(absents / total) * 100}%`, fill: '#fff', fontSize: 15 },
			})
		}

		return result
	}, [presents, absents, total])

	return (
		<>
			<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
				<View style={{ flex: 1 }}>
					<ScreenHeader
						label='Reports'
						showBackButton={true}
						handleBack={closeModal}
						handleOnPress={() => setShowChart(!showChart)}
						iconName='piechart'
					/>
					<View style={{ width: '100%', alignItems: 'center', paddingBottom: 20, flex: 1 }}>
						<View
							style={{
								width: '100%',
								padding: 10,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 10,
								height: 60,
							}}
						>
							<Image
								source={require('@/assets/img/default-avatar.png')}
								style={{ width: 40, height: 40, borderRadius: 30 }}
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
								<Text style={{ fontWeight: 400, fontSize: 12 }}>
									{capitalizeWords(studentReports?.[0]?.student?.name)}
								</Text>
								<Text style={{ fontSize: 12 }}>{capitalizeWords(studentReports?.[0]?.student?.lastName)}</Text>
							</View>
						</View>
						{showChart && (
							<View style={{ margin: 20 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
									<PieChart widthAndHeight={180} series={series} />
									<View style={{ gap: 5 }}>
										<Text>Total: {total}</Text>
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
												<Text>Present</Text>
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
												<Text>Absent</Text>
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
									backgroundColor: 'skyblue',
									padding: 5,
									gap: 10,
									borderRadius: 5,
								}}
							>
								<Pressable onPress={() => setFilter('all')}>
									<View
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											height: 30,
											width: 40,
											backgroundColor: filter === 'all' ? '#fff' : '',
											borderRadius: 5,
										}}
									>
										<Text>ALL</Text>
									</View>
								</Pressable>
								<Pressable onPress={() => setFilter('present')}>
									<View
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											height: 30,
											width: 40,
											backgroundColor: filter === 'present' ? '#fff' : '',
											borderRadius: 5,
										}}
									>
										<AntDesign name='check' size={20} color='green' />
									</View>
								</Pressable>
								<Pressable onPress={() => setFilter('absent')}>
									<View
										style={{
											alignItems: 'center',
											justifyContent: 'center',
											height: 30,
											width: 40,
											backgroundColor: filter === 'absent' ? '#fff' : '',
											borderRadius: 5,
										}}
									>
										<AntDesign name='close' size={30} color='red' />
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
									backgroundColor: 'lightgrey',
									paddingVertical: 5,
								}}
							>
								<View style={{ width: 80, alignItems: 'center', justifyContent: 'center' }}>
									<Text style={{ fontSize: 12 }}>Date</Text>
								</View>
								<View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
									<Text style={{ fontSize: 12 }}>Status</Text>
								</View>
								<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
									<Text style={{ fontSize: 12 }}>Class</Text>
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
										<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
											<View
												style={{
													width: 80,
													alignItems: 'center',
													justifyContent: 'center',
													backgroundColor: 'lightgrey',
													height: 30,
													marginTop: 5,
												}}
											>
												<Text style={{ fontSize: 12 }}>
													{format(new Date(item.date.year, item.date.month - 1, item.date.day), 'MM.dd.yy')}
												</Text>
											</View>
											<View
												style={{
													width: 50,
													alignItems: 'center',
													justifyContent: 'center',
													backgroundColor: 'lightgrey',
													height: 30,
													marginTop: 5,
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
													alignItems: 'center',
													flexDirection: 'row',
													flex: 1,
													backgroundColor: 'lightgrey',
													height: 30,
													marginTop: 5,
													paddingLeft: 5,
												}}
											>
												<Text style={{ fontSize: 12 }}>{item.karateClassName}</Text>
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
		</>
	)
}

export default StudentReportDetailsModal
