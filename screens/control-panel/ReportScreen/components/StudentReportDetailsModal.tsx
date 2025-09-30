import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, Modal, FlatList, Image, ScrollView, Pressable } from 'react-native'
import PieChart, { Slice } from 'react-native-pie-chart'
import { format } from 'date-fns'
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import ScreenHeader from '@/components/ScreenHeader/ScreenHeader'
import { IStudentReport } from '../helpers/report-screen-interfaces'
import capitalizeWords from '@/shared/capitalize-words'
import colors from '@/theme/colors'
import { TAttendanceStatus } from '@/shared/common-types'
import { isStudentPresent, getStatusColor, getStatusIcon } from '@/shared/attendance-helpers'
import styled from 'styled-components/native'

// Styled Components
const ModalContainer = styled.View`
	flex: 1;
	background-color: ${colors.primary};
`

const ContentContainer = styled.View`
	flex: 1;
	padding-horizontal: 20px;
	padding-top: 24px;
`

const StudentHeaderCard = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 16px;
	padding: 20px;
	margin-bottom: 24px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
`

const StudentInfoRow = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 12px;
`

const StudentAvatar = styled.Image`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	border-width: 2px;
	border-color: ${colors.variants.grey[1]};
	margin-right: 16px;
`

const StudentNameContainer = styled.View`
	flex: 1;
`

const StudentName = styled.Text`
	font-size: 20px;
	font-weight: 700;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 4px;
	letter-spacing: -0.3px;
`

const StudentLastName = styled.Text`
	font-size: 16px;
	font-weight: 500;
	color: ${colors.variants.grey[3]};
	letter-spacing: -0.2px;
`

const BadgesRow = styled.View`
	flex-direction: row;
	margin-top: 8px;
	gap: 6px;
`

const ChartSection = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 16px;
	padding: 24px;
	margin-bottom: 20px;
	shadow-color: #000;
	shadow-offset: 0px 2px;
	shadow-opacity: 0.1;
	shadow-radius: 8px;
	elevation: 3;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
`

const ChartContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 40px;
`

const StatsContainer = styled.View`
	gap: 12px;
`

const StatRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;
`

const StatBadge = styled.View<{ color: string }>`
	background-color: ${(props: { color: string }) => props.color};
	width: 24px;
	height: 24px;
	border-radius: 12px;
	justify-content: center;
	align-items: center;
`

const StatBadgeText = styled.Text`
	color: ${colors.view.primary};
	font-size: 10px;
	font-weight: 700;
`

const StatLabel = styled.Text`
	font-size: 16px;
	font-weight: 500;
	color: ${colors.variants.secondary[5]};
`

const TotalText = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	text-align: center;
	margin-bottom: 16px;
`

const FilterSection = styled.View`
	margin-bottom: 20px;
`

const FilterContainer = styled.View`
	flex-direction: row;
	background-color: ${colors.variants.secondary[1]};
	padding: 12px;
	gap: 8px;
	border-radius: 16px;
	justify-content: center;
	flex-wrap: wrap;
`

const FilterButton = styled.Pressable<{ selected: boolean }>`
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background-color: ${(props: { selected: boolean }) =>
		props.selected ? colors.variants.secondary[2] : 'transparent'};
	border-radius: 20px;
`

const ReportsSection = styled.View`
	flex: 1;
`

const ReportsHeader = styled.View`
	background-color: ${colors.variants.secondary[5]};
	border-radius: 12px;
	padding: 12px 16px;
	margin-bottom: 16px;
	flex-direction: row;
	align-items: center;
`

const HeaderColumn = styled.View<{ width: number }>`
	width: ${(props: { width: number }) => props.width}px;
	align-items: center;
	justify-content: center;
`

const HeaderText = styled.Text`
	font-size: 12px;
	font-weight: 600;
	color: ${colors.view.primary};
	text-align: center;
`

const ReportItem = styled.View`
	background-color: ${colors.view.primary};
	border-radius: 12px;
	margin-bottom: 8px;
	shadow-color: #000;
	shadow-offset: 0px 1px;
	shadow-opacity: 0.1;
	shadow-radius: 4px;
	elevation: 2;
	border-width: 1px;
	border-color: ${colors.variants.secondary[1]};
`

const ReportRow = styled.View`
	flex-direction: row;
	align-items: stretch;
`

const ReportColumn = styled.View<{ width: number }>`
	width: ${(props: { width: number }) => props.width}px;
	align-items: center;
	justify-content: center;
	background-color: ${colors.variants.secondary[1]};
	padding: 12px 8px;
`

const ReportColumnMain = styled.View`
	flex: 1;
	align-items: flex-start;
	justify-content: center;
	background-color: ${colors.variants.secondary[1]};
	padding: 12px;
`

const DateText = styled.Text`
	font-size: 12px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	text-align: center;
`

const ClassNameText = styled.Text`
	font-size: 12px;
	font-weight: 600;
	color: ${colors.variants.secondary[5]};
	margin-bottom: 4px;
`

const BadgeRow = styled.View`
	flex-direction: row;
	gap: 4px;
	margin-bottom: 4px;
`

const StatusBadge = styled.View<{ variant?: 'trial' | 'overflow' | 'downgrade' }>`
	background-color: ${(props: { variant?: 'trial' | 'overflow' | 'downgrade' }) => {
		switch (props.variant) {
			case 'overflow':
				return '#fce4ec'
			case 'downgrade':
				return '#e8f5e9'
			default:
				return '#fff3cd'
		}
	}};
	padding-horizontal: 4px;
	padding-vertical: 2px;
	border-radius: 4px;
	border-width: 1px;
	border-color: ${(props: { variant?: 'trial' | 'overflow' | 'downgrade' }) => {
		switch (props.variant) {
			case 'overflow':
				return '#f8bbd0'
			case 'downgrade':
				return '#c8e6c9'
			default:
				return '#f0e68c'
		}
	}};
`

const StatusBadgeText = styled.Text<{ variant?: 'trial' | 'overflow' | 'downgrade' }>`
	color: ${(props: { variant?: 'trial' | 'overflow' | 'downgrade' }) => {
		switch (props.variant) {
			case 'overflow':
				return '#ad1457'
			case 'downgrade':
				return '#2e7d32'
			default:
				return '#856404'
		}
	}};
	font-size: 8px;
	font-weight: 700;
`

const DayBadge = styled.View`
	background-color: #e1f5fe;
	padding-horizontal: 4px;
	padding-vertical: 2px;
	border-radius: 4px;
	border-width: 1px;
	border-color: #b3e5fc;
`

const DayBadgeText = styled.Text`
	color: #01579b;
	font-size: 8px;
	font-weight: 700;
`

const ObservationCard = styled.View`
	margin-top: 8px;
	padding: 8px;
	background-color: ${colors.variants.secondary[0]};
	border-radius: 8px;
	border-left-width: 3px;
	border-left-color: ${colors.brand};
`

const ObservationText = styled.Text`
	font-size: 10px;
	color: ${colors.variants.secondary[4]};
	font-style: italic;
	line-height: 14px;
`

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
	const [filter, setFilter] = useState<'all' | 'present' | 'absent' | TAttendanceStatus>('all')
	const [reportsFiltered, setReportsFiltered] = useState<IStudentReport[]>([])

	useEffect(() => {
		let result: IStudentReport[] = []
		if (filter === 'all') {
			result = studentReports
		} else if (filter === 'present') {
			result = studentReports.filter((report) => isStudentPresent(report.attendanceStatus))
		} else if (filter === 'absent') {
			result = studentReports.filter((report) => !isStudentPresent(report.attendanceStatus))
		} else {
			result = studentReports.filter((report) => report.attendanceStatus === filter)
		}

		setReportsFiltered(result)
	}, [filter, studentReports])
	const presents = useMemo(() => {
		return studentReports?.filter((report) => isStudentPresent(report.attendanceStatus))?.length
	}, [studentReports])
	const absents = useMemo(() => {
		return studentReports?.filter((report) => !isStudentPresent(report.attendanceStatus))?.length
	}, [studentReports])
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

	useEffect(() => {
		console.log('studentReports', studentReports)
	}, [studentReports])

	return (
		<Modal visible={openModal} animationType='fade' onRequestClose={closeModal} statusBarTranslucent={true}>
			<ModalContainer>
				<ScreenHeader
					label='Student Report'
					showBackButton={true}
					handleBack={closeModal}
					handleOnPress={() => setShowChart(!showChart)}
					labelButton='Chart'
					iconName='chart-pie'
				/>
				<ContentContainer>
					<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
						{/* Student Header Card */}
						<StudentHeaderCard>
							<StudentInfoRow>
								<StudentAvatar source={require('@/assets/img/default-avatar.png')} resizeMode='contain' />
								<StudentNameContainer>
									<StudentName>{capitalizeWords(studentReports?.[0]?.student?.name)}</StudentName>
									<StudentLastName>{capitalizeWords(studentReports?.[0]?.student?.lastName)}</StudentLastName>
								</StudentNameContainer>
							</StudentInfoRow>

							{/* Student Badges */}
							<BadgesRow>
								{studentReports?.[0]?.student?.isTrial && (
									<StatusBadge variant='trial'>
										<StatusBadgeText variant='trial'>TRIAL STUDENT</StatusBadgeText>
									</StatusBadge>
								)}
							</BadgesRow>
						</StudentHeaderCard>
						{/* Chart Section */}
						{showChart && (
							<ChartSection>
								<TotalText>Total: {total}</TotalText>
								<ChartContainer>
									<PieChart widthAndHeight={160} series={series} />
									<StatsContainer>
										{Boolean(presents) && (
											<StatRow>
												<StatBadge color='#4CAF50'>
													<StatBadgeText>{presents}</StatBadgeText>
												</StatBadge>
												<StatLabel>Present</StatLabel>
											</StatRow>
										)}
										{Boolean(absents) && (
											<StatRow>
												<StatBadge color='#F44336'>
													<StatBadgeText>{absents}</StatBadgeText>
												</StatBadge>
												<StatLabel>Absent</StatLabel>
											</StatRow>
										)}
									</StatsContainer>
								</ChartContainer>
							</ChartSection>
						)}
						{/* Filter Section */}
						<FilterSection>
							<FilterContainer>
								<FilterButton selected={filter === 'all'} onPress={() => setFilter('all')}>
									<Text style={{ fontSize: 10, fontWeight: '600', color: colors.variants.secondary[5] }}>ALL</Text>
								</FilterButton>
								<FilterButton selected={filter === 'present'} onPress={() => setFilter('present')}>
									<AntDesign name='check' size={24} color={getStatusColor('present')} />
								</FilterButton>
								<FilterButton selected={filter === 'good-behavior'} onPress={() => setFilter('good-behavior')}>
									<AntDesign name='smile' size={24} color={getStatusColor('good-behavior')} />
								</FilterButton>
								<FilterButton selected={filter === 'bad-behavior'} onPress={() => setFilter('bad-behavior')}>
									<AntDesign name='frown' size={24} color={getStatusColor('bad-behavior')} />
								</FilterButton>
								<FilterButton selected={filter === 'late'} onPress={() => setFilter('late')}>
									<AntDesign name='exclamation' size={24} color={getStatusColor('late')} />
								</FilterButton>
								<FilterButton selected={filter === 'absent'} onPress={() => setFilter('absent')}>
									<AntDesign name='close' size={24} color={getStatusColor('absent')} />
								</FilterButton>
								<FilterButton selected={filter === 'sick'} onPress={() => setFilter('sick')}>
									<FontAwesome name='plus-square' size={20} color={getStatusColor('sick')} />
								</FilterButton>
							</FilterContainer>
						</FilterSection>
						{/* Reports Section */}
						<ReportsSection>
							<ReportsHeader>
								<HeaderColumn width={80}>
									<HeaderText>Date</HeaderText>
								</HeaderColumn>
								<HeaderColumn width={50}>
									<HeaderText>Status</HeaderText>
								</HeaderColumn>
								<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
									<HeaderText>Class</HeaderText>
								</View>
							</ReportsHeader>

							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								data={reportsFiltered}
								renderItem={({ item }) => (
									<ReportItem>
										<ReportRow>
											<ReportColumn width={80}>
												<DateText>
													{format(new Date(item.date.year, item.date.month - 1, item.date.day), 'MM.dd.yy')}
												</DateText>
											</ReportColumn>
											<ReportColumn width={50}>
												{item.attendanceStatus != 'sick' ? (
													<AntDesign
														name={getStatusIcon(item.attendanceStatus) as any}
														size={20}
														color={getStatusColor(item.attendanceStatus)}
													/>
												) : (
													<FontAwesome
														name={getStatusIcon(item.attendanceStatus) as any}
														size={20}
														color={getStatusColor(item.attendanceStatus)}
													/>
												)}
											</ReportColumn>
											<ReportColumnMain>
												<ClassNameText>{item.karateClassName}</ClassNameText>

												{/* Badges */}
												<BadgeRow>
													{item.student.isTrial && (
														<StatusBadge>
															<StatusBadgeText>TRIAL</StatusBadgeText>
														</StatusBadge>
													)}
													{item.isDayOnly && (
														<DayBadge>
															<DayBadgeText>DAY</DayBadgeText>
														</DayBadge>
													)}
													{item.isRecovery && (
														<StatusBadge>
															<StatusBadgeText>RECOVERY</StatusBadgeText>
														</StatusBadge>
													)}
													{item.isOverflowAbsence && (
														<StatusBadge variant={item.overflowReason === 'plan-downgrade' ? 'downgrade' : 'overflow'}>
															<StatusBadgeText
																variant={item.overflowReason === 'plan-downgrade' ? 'downgrade' : 'overflow'}
															>
																{item.overflowReason === 'plan-downgrade' ? 'NOT COUNTED DUE TO PLAN' : 'OVERFLOW'}
															</StatusBadgeText>
														</StatusBadge>
													)}
												</BadgeRow>

												{/* Observations */}
												{item.observations && (
													<ObservationCard>
														<ObservationText>"Note: {item.observations}"</ObservationText>
													</ObservationCard>
												)}
											</ReportColumnMain>
										</ReportRow>
									</ReportItem>
								)}
								keyExtractor={(item) => item._id}
							/>
						</ReportsSection>
					</ScrollView>
				</ContentContainer>
			</ModalContainer>
		</Modal>
	)
}

export default StudentReportDetailsModal
